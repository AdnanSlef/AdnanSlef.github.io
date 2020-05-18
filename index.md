---
layout: default
title: Adrian Self
---
# Adrian Self


---

## [Writeups](/writeups)
{% assign writeups_page = site.pages | where: "name","writeups.md" %}
{{writeups_page[0]["description"]}}


---

Site last updated: {{ site.time | date_to_long_string }}
