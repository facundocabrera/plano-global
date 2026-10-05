---
layout: default
title: Inicio
description: Una hipótesis macroeconómica viva, contrastada contra eventos observables y traducida a posicionamiento.
eyebrow: 2025–2045+
agent_url: /agent/index.md
permalink: /
page_class: page--home
---

{% assign treasury = site.data.home.treasury_10y %}

# El mercado todavía manda. Los gobiernos ya intervienen.

<p class="lead home-lead">La deuda se encarece, la energía mantiene presión sobre los precios y aparecen respuestas oficiales. Todavía no alcanzan para controlar el costo del dinero a largo plazo.</p>

<div class="regime-sequence" aria-label="Secuencia central del Plano Global">
  <span>Deuda elevada</span><b aria-hidden="true">→</b><span>Tasas largas</span><b aria-hidden="true">→</b><span>Intervención</span><b aria-hidden="true">→</b><span>¿Control?</span>
</div>

<div class="home-dashboard">
  <section class="dashboard-panel regime-panel" aria-labelledby="regime-title">
    <div class="panel-heading">
      <h2 id="regime-title">¿Dónde estamos?</h2>
      <span>Corte mensual · 5 oct 2026</span>
    </div>
    <div class="regime-label"><strong>Phase 1C</strong><span>Stage 3 temprano</span></div>
    <p class="plain-reading">El sistema ya intenta defenderse, pero todavía no controla el precio del dinero.</p>
    <dl class="phase-scorecard">
      <div><dt><i class="signal signal--yes" aria-hidden="true"></i>Intervención repetida</dt><dd>Sí</dd></div>
      <div><dt><i class="signal signal--partial" aria-hidden="true"></i>Persistencia</dt><dd>Parcial</dd></div>
      <div><dt><i class="signal signal--no" aria-hidden="true"></i>Escala suficiente</dt><dd>No</dd></div>
      <div><dt><i class="signal signal--no" aria-hidden="true"></i>Control efectivo de tasas</dt><dd>No</dd></div>
    </dl>
    <a class="text-link" href="{{ '/estado/' | relative_url }}">Entender la clasificación →</a>
  </section>

  <section class="dashboard-panel chart-panel" aria-labelledby="treasury-title">
    <div class="panel-heading">
      <div>
        <h2 id="treasury-title">La presión que organiza el plano</h2>
        <p>Rendimiento del Treasury de EE.UU. a 10 años</p>
      </div>
      <span>Actualización semanal</span>
    </div>
    <div class="yield-chart" data-chart="treasury-10y" role="img" aria-label="El Treasury de Estados Unidos a 10 años subió desde 4,63% el 23 de julio hasta 5,34% el 1 de octubre de 2026."></div>
    <noscript><p>El gráfico requiere JavaScript. Los valores están disponibles debajo en “Ver datos y fuentes”.</p></noscript>
    <p class="chart-reading"><strong>Lectura:</strong> hubo intervención, pero el rendimiento siguió subiendo. Por ahora, el mercado continúa fijando el costo largo.</p>
    <details class="chart-data">
      <summary>Ver datos y fuentes</summary>
      <div class="table-scroll">
        <table>
          <thead><tr><th>Fecha</th><th>UST 10Y</th><th>Evidencia</th></tr></thead>
          <tbody>
          {% for point in treasury.points %}
            <tr><td>{{ point.display_date }}</td><td>{{ point.display_value }}</td><td><a href="{{ point.source | relative_url }}">Ledger</a></td></tr>
          {% endfor %}
          </tbody>
        </table>
      </div>
    </details>
  </section>
</div>

<section class="signal-section" aria-labelledby="signals-title">
  <div class="section-heading">
    <p class="section-kicker">Tres preguntas para seguir</p>
    <h2 id="signals-title">Los activos no dicen lo mismo</h2>
  </div>
  <div class="signal-grid">
    <a class="signal-card" href="{{ '/tracking/' | relative_url }}#desacople-del-oro">
      <span>Reserva monetaria</span><strong>Oro</strong><p>¿Sube incluso con dólar y tasas reales firmes?</p>
    </a>
    <a class="signal-card" href="{{ '/posicionamiento/' | relative_url }}#bitcoin">
      <span>Liquidez y riesgo</span><strong>Bitcoin</strong><p>¿Actúa como reserva o todavía como activo de riesgo?</p>
    </a>
    <a class="signal-card" href="{{ '/tracking/' | relative_url }}#ruptura-de-coordinacion-energetica">
      <span>Restricción física</span><strong>Energía</strong><p>¿Mantiene inflación alta aun con crecimiento débil?</p>
    </a>
  </div>
</section>

## Profundizar

<div class="reading-grid">
  <a href="{{ '/plano/' | relative_url }}"><strong>El plano</strong><span>La hipótesis estructural y sus fases.</span></a>
  <a href="{{ '/tracking/' | relative_url }}"><strong>Seguimiento</strong><span>Las variables que confirman o contradicen la tesis.</span></a>
  <a href="{{ '/eventos/' | relative_url }}"><strong>Event Ledger</strong><span>Los hechos que cambiaron nuestra interpretación.</span></a>
  <a href="{{ '/posicionamiento/' | relative_url }}"><strong>Posicionamiento</strong><span>Qué activos encajan y cuáles quedan fuera del núcleo.</span></a>
</div>

<p class="home-closing">Este sitio no presenta el futuro como un hecho consumado. Construye una historia contrastable y conserva también la evidencia que podría demostrar que está equivocada.</p>

<script id="treasury-10y-data" type="application/json">{{ treasury.points | jsonify }}</script>
<script src="{{ '/assets/js/home-chart.js' | relative_url }}" defer></script>
