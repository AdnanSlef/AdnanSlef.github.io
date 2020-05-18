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


---
{{site.tags|inspect}}

{% for tag in site.tags %}
### {{ tag[0] }}
{% for post in tag[1] %}
  [{{post.title}}]({{post.url}})
{% endfor %}
{% endfor %}
