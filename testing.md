---
layout: default
title: Testing
permalink: /testing/
description: Test page for running code
---

# Tests

{% assign help_csv = site.static_files|where_exp: "f", "f.name contains 'jarvis-help'" %}
{{help_csv|inspect}}

site.static_files:
{{site.static_files|inspect}}

{% for tag in site.tags %}
  {% assign is_writeup_tag = "false" %}
  {% for post in tag[1] %}
    {% assign cat = post.categories | first %}
    {% if cat == "writeups" %}
      {% assign is_writeup_tag = "true" %}
    {% endif %}
  {% endfor %}
  {% if is_writeup_tag == "true" %}
### {{ tag[0] }}
    {% for post in tag[1] %}
      {% assign cat = post.categories | first %}
      {% if cat == "writeups" %}
[{{post.title}}]({{post.url}})
      {% endif %}
    {% endfor %}
  {% endif %}
{% endfor %}

---
{{site.pages|inspect}}

{%for p in site.pages%}
{{p.url}}
{%endfor%}

---
{% assign writeups_page = site.pages | where: "name","writeups.md" %}
{{writeups_page|inspect}}

---
{{writeups_page}}

---
{{writeups_page|inspect}}

---
{{writeups_page.name}}
{{writeups_page.dir}}

---
{{writeups_page.description}}

---
{{writeups_page[0]}}

---
{{writeups_page[0][description]}}

---
{{writeups_page[0]["description"]}}
