---
layout: default
title: Event Ledger
description: Acontecimientos que confirman, contradicen o modifican el Plano Global.
eyebrow: Registro causal · Fuente canónica en GitHub
agent_url: /agent/eventos.md
permalink: /eventos/
---

# Event Ledger

<p class="lead">Índice cronológico de los acontecimientos capaces de cambiar nuestra ubicación dentro del plano o la expresión del posicionamiento. Cada enlace abre el registro completo del día.</p>

{% assign event_days = site.pages | where: "event_day", true | sort: "event_date" | reverse %}

{% for event_day in event_days %}
## {{ event_day.event_date }}

{% for event_title in event_day.event_titles %}
- {{ event_title }}
{% endfor %}

[Leer registro completo del día]({{ event_day.url | relative_url }})

{% unless forloop.last %}---{% endunless %}
{% endfor %}
