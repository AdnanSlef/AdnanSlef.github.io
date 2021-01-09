---
layout: writeup
title: Comprehensive 2
description: Comprehensive, not comprehensible.
categories: [writeups]
tags: [TJCTF 2020, reversing, Featured]
---

# Comprehensive 2

## Description

*Written by __boomo__*

His power level increased... What do I do now??

[comprehensive_2.py]()

Output: `[1, 18, 21, 18, 73, 20, 65, 8, 8, 4, 24, 24, 9, 18, 29, 21, 3, 21, 14, 6, 18, 83, 2, 26, 86, 83, 5, 20, 27, 28, 85, 67, 5, 17, 2, 7, 12, 11, 17, 0, 2, 20, 12, 26, 26, 30, 15, 44, 15, 31, 0, 12, 46, 8, 28, 23, 0, 11, 3, 25, 14, 0, 65]`

## Solution

Let's take a look at comprehensive_2.py.

```python
m = '[?????]'
n = '[?????]'

a = 'abcdefghijklmnopqrstuvwxyz'
p = ' !"#$%&\'()*+,-./:;<=>?@[\\]^_`{|}~'

assert len(m) == 63 and set(m).issubset(set(a + p))
assert len(n) == 7  and set(n).issubset(set(a))
assert m.count('tjctf{') == 1 and m.count('}') == 1 and m.count(' ') == 5

print(str([x for z in [[[ord(m[i]) ^ ord(n[j // 3]) ^ ord(n[i - j - k]) ^ ord(n[k // 21]) for i in range(j + k, j + k + 3)] for j in range (0, 21, 3)] for k in range(0, len(m), 21)] for y in z for x in y])[1:-1])
```

Looking at the `assert` statements, `m` must be a 63-character message containing the flag, and `n` is a string of 7 lower-case letters.

Next, expand the last line of the code so it is more clear:

```python
m = '[?????]'
n = '[?????]'

a = 'abcdefghijklmnopqrstuvwxyz'
p = ' !"#$%&\'()*+,-./:;<=>?@[\\]^_`{|}~'

assert len(m) == 63 and set(m).issubset(set(a + p))
assert len(n) == 7  and set(n).issubset(set(a))
assert m.count('tjctf{') == 1 and m.count('}') == 1 and m.count(' ') == 5

l = []
h = 0
for k in [0, 1, 2]:
    for j in [0, 1, 2, 3, 4, 5, 6]:
        for i in [0, 1, 2]:
            l.append( ord(m[h]) ^ ord(n[i]) ^ ord(n[j]) ^  ord(n[k]) )
            h+=1

print(str(l)[1:-1])
```

There are multiple ways to solve the challenge from this point, but I chose to get some practice with the Z3 Theorem Prover in python, Z3Py. Here's the solve script:

```python
#!/usr/bin/env python3
from z3 import *
import argparse

parser = argparse.ArgumentParser(description='Solve with z3')
parser.add_argument('num_results', type=int, nargs='?', default=1000)
args = parser.parse_args()

output = bytes([1, 18, 21, 18, 73, 20, 65, 8, 8, 4, 24, 24, 9, 18, 29, 21, 3, 21, 14, 6, 18, 83, 2, 26, 86, 83, 5, 20, 27, 28, 85, 67, 5, 17, 2, 7, 12, 11, 17, 0, 2, 20, 12, 26, 26, 30, 15, 44, 15, 31, 0, 12, 46, 8, 28, 23, 0, 11, 3, 25, 14, 0, 65]) 

n = [BitVec(f'n{i}',8)for i in range(7)]
m = [BitVec(f'm{i}',8)for i in range(63)]

xor_constraints = []
h = 0
for k in [0,1,2]:
    for j in [0,1,2,3,4,5,6]:
        for i in [0,1,2]:
            xor_constraints.append(n[k] ^ n[j] ^ n[i] == m[h] ^ output[h])
            h+=1

n_charset_constraints = []
for ni in n:
    n_charset_constraints.append(And(ni>=ord('a'),ni<=ord('z')))

five_spaces = Sum([If(m[i]==ord(' '),1,0)for i in range(63)])==5

has_needed_chars = [(Sum([If(m[i]==ord(c),1,0)for i in range(63)])>=1) for c in 'tjctf{}']

flag_format = Sum(
        [
            If(
                And(
                    [m[j+i]==ord('tjctf{'[i])for i in range(6)]
                )
            ,1,0)
        for j in range(63-25)
        ]
    ) >= 1

slvr = Solver()
slvr.add(xor_constraints)
slvr.add(n_charset_constraints)
slvr.add(five_spaces)
slvr.add(has_needed_chars)
slvr.add(flag_format)

def my_results():
    global mdl
    slvr.check()
    mdl = slvr.model()
    
    key=''
    msg=''
    for d in sorted(mdl.decls(),key=(lambda x:int(x.name()[1:]))):
        if 'n' in d.name():
            key += chr(mdl[d].as_long())
        if 'm' in d.name():
            msg += chr(mdl[d].as_long())
    
    print(key)
    print(msg)

def one_result():
    global mdl
    my_results()
    block = []
    for d in mdl:
        block.append(d() != mdl[d])
    slvr.add(Or(block))

for i in range(args.num_results):
    try:
        one_result()
    except:
        break
```

This gives three possible solutions:

```
isacaps
hata o sagashiteim}oi ka? dozo, tjctf{siqumasen_flag_kudasaiua2
isacapo
hata o sagashiteimasu ka? dozo, tjctf{sumimasen_flag_kudasaii}.
isacapg
hata o sagashiteimi{} ka? dozo, tjctf{s}eamasen_flag_kudasaiau&
```

Only one follows the flag format, so the flag is `tjctf{sumimasen_flag_kudasaii}` and the key is `isacapo`.
