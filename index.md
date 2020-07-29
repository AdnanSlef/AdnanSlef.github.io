---
layout: default
title: Adrian Self
---
# Adrian Self


---

## [Writeups](/writeups/)
{% assign writeups_page = site.pages | where: "name", "writeups.md" %}
{{ writeups_page[0]["description"] }}

---

## [Portfolio](/portfolio/)
{% assign portfolio_page = site.pages | where: "name", "portfolio.md" %}
{{ portfolio_page[0]["description"] }}

---

## [LinkedIn](/linkedin/)
{% assign linkedin_page = site.pages | where: "name", "linkedin.md" %}
{{ linkedin_page[0]["description"] }}

---

## [Resume](/resume/)
{% assign resume_page = site.pages | where: "name", "resume.md" %}
{{ resume_page[0]["description"] }}

---

## [Adrian Self On The Web](/ontheweb/)
{% assign ontheweb_page = site.pages | where: "name", "ontheweb.md" %}
{{ ontheweb_page[0]["description"] }}

