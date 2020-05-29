---
layout: default
title: Adrian Self
---
# Adrian Self


---

## [Writeups](/writeups)
{% assign writeups_page = site.pages | where: "name", "writeups.md" %}
{{writeups_page[0]["description"]}}

---

## [Adrian Self On The Web](/ontheweb)
{% assign ontheweb_page = site.pages | where: "name", "ontheweb.md" %}
{{ontheweb_page[0]["description"]}}
