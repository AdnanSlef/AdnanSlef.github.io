---
layout: default
title: On The Web
permalink: /ontheweb/
description: Find me on the web
---

# Find Me On The Web

{% for post in site.posts %}
  {% if post.categories contains 'ontheweb' %}
[{{post.title}}]({{post.url}})

{{post.description}}
  {% endif %}
{% enfor %}
