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
{% endfor %}
{% endfor %}

{{site.pages|inspect}}

{% assign writeups_page = site.pages | where: "name","writeups.md" %}
{{writeups_page.description}}
