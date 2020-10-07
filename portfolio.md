---
layout: default
title: Portfolio
permalink: /portfolio/
description: A collection of works by Adrian Self
---

<h3><a href="/">&lt; Return Home</a></h3>

# Portfolio

{% for tag in site.tags %}
  {% assign is_portfolio_tag = "false" %}
  {% for post in tag[1] %}
    {% assign cat = post.categories | first %}
    {% if cat == "portfolio" %}
      {% assign is_portfolio_tag = "true" %}
    {% endif %}
  {% endfor %}
  {% if is_portfolio_tag == "true" %}
### {{ tag[0] }}
    {% for post in tag[1] %}
      {% assign cat = post.categories | first %}
      {% if cat == "portfolio" %}
[{{post.title}}]({{post.url}})
      {% endif %}
    {% endfor %}
  {% endif %}
{% endfor %}
