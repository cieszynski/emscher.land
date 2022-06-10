---
layout: layout-base.njk
title: "Page 1"
header: "header\nheader"
subheader: "subheader"
description: "description"
image: "assets/img/1920x1440.jpg"
imagetext: "alt ist kein text"
permalink: "{{ [tags | slugify, title | slugify ] | join('/') }}.html"
tags: thema 1
---
<article>
    <p>Page 1</p>
</article>