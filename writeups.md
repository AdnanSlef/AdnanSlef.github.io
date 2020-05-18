---
layout: default
title: Writeups
permalink: /writeups
description: Explanations and solutions to CTF challenges
---

# Writeups

{% for post in site.categories.writeups %}
  [{{post.title}}]({{post.url}})
{% endfor %}

{% for tag in site.tags %}
## {{ tag[0] }}
{% for post in tag %}
{{[1, 2, 3] contains 3}}
{% endfor %}
{% endfor %}
