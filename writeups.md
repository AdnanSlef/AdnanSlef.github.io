---
layout: default
title: Writeups
permalink: /writeups/
description: Explanations and solutions for CTF challenges
---

# Writeups

{% for tag in site.tags %}
  {% assign is_writeup_tag = "false" %}
  {% for post in tag[1] %}
    {% assign cat = post.categories | first %}
    {% if cat == "writeups" %}
      {% assign is_writeup_tag = "true" %}
    {% endif %}
  {% endfor %}
  {% if tag[0] == "Featured" %}
### {{ tag[0] }}
    {% for post in tag[1] %}
      {% assign cat = post.categories | first %}
      {% if cat == "writeups" %}
[{{post.title}}]({{post.url}})
      {% endif %}
    {% endfor %}
  {% endif %}
{% endfor %}


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
