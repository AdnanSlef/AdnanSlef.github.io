---
layout: writeup #temporary, used to remove footer
title: On The Web
permalink: /ontheweb/
description: Find me on the web
---

<a href="/"><h3>&lt; Return Home</h3></a>

# Find Me On The Web

{% for post in site.posts %}
  {% if post.categories contains 'ontheweb' %}

---
## [{{post.title}}]({{post.url}})

{{post.description}}

---
  {% endif %}
{% endfor %}
