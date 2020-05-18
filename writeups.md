---
layout: default
title: Writeups
permalink: /writeups
description: Explanations and solutions to CTF challenges
---

# Writeups

{% for tag in site.tags %}
### {{ tag[0] }}
{% for post in tag[1] %}
  [{{post.title}}]({{post.url}})
{% endfor %}
{% endfor %}
