---
layout: default
title: Senior Capstone Project
description: Breaking a Middle-Square Weyl Sequence PRNG to win a simulated lottery
categories: [portfolio]
tags: [Projects]
---

# Cybersecurity Senior Capstone Project

## Topic

Breaking the Middle Square Weyl Sequence PRNG

## Essential Question

How can a pseudorandom number generator (PRNG) be broken and what impacts could this have?

## Interview

Interviews were conducted with PhD students Abhiram Kothapalli (Carnegie Mellon) and Mike Specter (MIT).\
An interview summary is available \[[here](https://aself3-files.adrianself.me/Cybersecurity_Senior_Capstone/InterviewSummary.pdf)\], with topics including PRNGs, Zero-Knowledge Proofs, and Verifiable Computation.

## Paper

One element of my project was a semi-formal paper addressing the vulnerability.\
That document is availabe \[[here](https://aself3-files.adrianself.me/Cybersecurity_Senior_Capstone/Senior_Capstone_Finished.pdf)\] and included below.
<object data="https://aself3-files.adrianself.me/Cybersecurity_Senior_Capstone/Senior_Capstone_Finished.pdf" type="application/pdf" height="600px" width="100%">
    Oops! Your browser doesn't support PDF previews.<br>
    Please use the download link above.
</object>

## Product

[Click Here](/2020/10/16/capstone-demo.html) to access the target webpage, which is the simulated lottery to be attacked.
<br>
The solve script (attacker) is available below:
```python
#!/usr/bin/env python3

import gmpy2
import sys

shi = 0xb5ad4ece
slo = 0xda1ce2a9

t64 = 2**64
t32 = 2**32

def solve(r0,r1,r2,r3):
    answers = []
    for e0 in [0,1]:
        for e1 in [0,1]:
            for e2 in [0,1]:
                for e3 in [0,1]:
                    for e4 in [0,1]:
                        h0=(  2*r0          )%t32
                        h1=( (r0*r0)%(t32)  )%t32
                        h2=( (r0*r0) >> 32  )%t32
                        h3=(  2*r1          )%t32
                        h4=( (r1*r1)%(t32)  )%t32
                        h5=( (r1*r1) >> 32  )%t32
                        h7=(  2*r2          )%t32
                        h8=( (r2*r2)%(t32)  )%t32
                        h9=( (r2*r2) >> 32  )%t32
    
                        h6 =( h4+slo          )%t32
                        h10=( 2*shi + e1 + e3 )%t32
    
                        h11=( h7*h6 + h9 + h10 + e4     )%t32
                        h12=( h3*h1 + h5 + shi + e1 + e2)%t32
    
                        coeff = h7 - h3
                        product = r3 + h12 - r2 - h11
                        product = (product + t32) % t32
                        coeff = (coeff + t32) % t32
                        modulus = t32
                        
                        try:
                            d = gmpy2.divm(product, coeff, modulus)
                        except ZeroDivisionError as e:
                            break
                        d = (d%t32+t32)%t32
    
                        c = ((r2 - h3*d - h12)%t32 + t32)%t32
                        if c != ((r3 - h7*d - h11)%t32 + t32)%t32:
                            break
                        c = (c%t32+t32)%t32
                        
                        product = r1 - h2 - c - e0
                        coeff = h0
                        try:
                            a = gmpy2.divm(product, coeff, modulus)
                        except ZeroDivisionError as e:
                            break
                        a = (a%t32+t32)%t32
    
                        b = r0
    
                        x0 = a*t32+b
                        w1 = c*t32+d

                        answers.append((x0,w1))
    return answers

class weyl():
    def __init__(self, x=0x5a8dd3ad0756a93d,
                       w=0xed72b823b19dd877, off=0, s=0xb5ad4eceda1ce2a9):
        self.s = s
        self.off = off
        self.x = x
        self.w = ((w - (self.s * self.off))%t64 + t64)%t64

    def nextRand(self):
        self.w = (self.w + self.s)%t64
        self.x = (self.x**2 + self.w)%t64
        self.x = ((self.x << 32) + (self.x >> 32))%t64
        return (self.x)%t32

def post(x0, w1, r):
    #print("x0:",hex(x0))
    #print("w1:",hex(w1))
    
    gen = weyl(x = x0, w = w1, off=1)
    
    for i in range(4):
        gen.nextRand()
    for i in range(len(r)-5):
        if r[i+5] != gen.nextRand():
            return
    print("Future Winners:")
    for i in range(4):
        print(gen.nextRand())
    print()


def get_r():
    print("Past Winners:")
    #Copy-paste from website, ^D when finished
    r = [*map(int,sys.stdin.read().split())][::-1]
    print("Most recent winner:")
    #The value in the red box. ^D to submit
    r.append(int(sys.stdin.read().strip()))
    print()
    
    if len(r) < 6:
        print("Please provide more data")
        print("for a more reliable result.")
        print()
        return get_r()

    return r

if __name__ == "__main__":
    r = get_r()
    answers = solve(r[0],r[1],r[2],r[3])
    for x0, w1 in answers:
        post(x0, w1, r)
```

## Presentation

Presentation Slideshow is available \[[here](https://aself3-files.adrianself.me/Cybersecurity_Senior_Capstone/CapstoneSlides.pdf)\].\
Presentation was given in front of peers and an industry professional.

## Competencies

<table>
    <tr>
        <th>Overview</th>
        <td>Formal Cryptography, Cloud Computing, Scripting, Web Development</td>
    </tr>
    <tr>
		<th>Languages</th>
        <td>Python, Javascript, C, HTML, LaTeX, Jekyll, Markdown</td>
    </tr>
    <tr>
		<th>Theory</th>
        <td>Modular Arithmetic, Linear Congruences, Modular Multiplicative Inverses</td>
    </tr>
    <tr>
		<th>Tools</th>
        <td>GCP (Google Cloud Platform), Z3 Theorem Prover, Linux, SSH</td>
    </tr>
    <tr>
		<th>Skills</th>
        <td>Research, Conducting Interviews, Composing Reports, Presenting Product</td>
    </tr>
</table>

## Credits

Bernard Widynski - Creator of Weyl PRNG\
Warren Sunada-Wong - Inspiration\
Abhiram Kothapalli - Interview\
Mike Specter - Interview

## References

[Middle Square Weyl Sequence RNG - Bernard Widynski](https://arxiv.org/pdf/1704.00358.pdf)\
[Middle-Square Method - Wikipedia](https://en.wikipedia.org/wiki/Middle-square_method#Middle_Square_Weyl_Sequence_PRNG)\
[Attack of the Middle Square Weyl Sequence PRNG - Cryptography StackExchange](https://crypto.stackexchange.com/questions/62750/attack-of-the-middle-square-weyl-sequence-prng)\
[Weyl PRNG CTF Challenge - Warren Sunada-Wong](https://gitlab.com/nactf/challenges-2019/writeups/-/tree/master/cryptography/dr-js-group-test-randomizer-2-bbob)
