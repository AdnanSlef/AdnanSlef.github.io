---
layout: default
title: Testing
permalink: /testing
description: Test page for running code
---

# Tests

{% for tag in site.tags %}
### {{ tag[0] }}
{% for post in tag[1] %}
  [{{post.title}}]({{post.url}})
  {{post.categories|first}}
{% endfor %}
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
{{writeups_page["title"]}}
{{writeups_page.url}}
