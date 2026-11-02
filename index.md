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
{% assign latest = treasury.points | last %}

# El mercado todavía manda. Los gobiernos ya intervienen.

<p class="lead home-lead">Las tasas largas cedieron desde el pico de octubre, mientras la energía sigue cara y las respuestas oficiales se multiplican. La baja del Treasury todavía no demuestra control del costo largo.</p>

<p class="home-cut">Cierre de octubre · evidencia hasta el 31 oct 2026 · <a href="{{ '/eventos/' | relative_url }}">Ver últimos eventos →</a></p>

<div class="regime-sequence" aria-label="Secuencia central del Plano Global">
  <span>Deuda elevada</span><b aria-hidden="true">→</b><span>Tasas largas</span><b aria-hidden="true">→</b><span>Intervención</span><b aria-hidden="true">→</b><span>¿Control?</span>
</div>

<div class="home-dashboard">
  <section class="dashboard-panel regime-panel" aria-labelledby="regime-title">
    <div class="panel-heading">
      <h2 id="regime-title">¿Dónde estamos?</h2>
      <span>Cierre mensual · 31 oct 2026</span>
    </div>
    <div class="regime-label"><strong>Phase 1C</strong><span>Stage 3 temprano</span></div>
    <p class="plain-reading">La intervención sigue fragmentada. El refugio privado puede bajar las tasas sin que el Estado controle su precio. Phase 2 continúa sin confirmar.</p>
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
      <span>{{ latest.display_date }}</span>
    </div>
    <p class="market-value">{{ latest.display_value }} <span>última observación registrada</span></p>
    <div class="yield-chart" data-chart="treasury-10y" role="img" aria-label="Treasury estadounidense a 10 años: observaciones fechadas, desde 4,63% el 23 de julio; pico registrado de 5,34% el 1 de octubre; última observación {{ latest.display_value }} el {{ latest.display_date }}."></div>
    <noscript><p>El gráfico requiere JavaScript. Los valores están disponibles debajo en “Ver datos y fuentes”.</p></noscript>
    <p class="chart-reading"><strong>Lectura mensual:</strong> las tasas bajaron y la energía siguió cara. En cierres oficiales comparables, el 10Y pasó de 5,24% el 1/10 a 4,94% el 30/10. El alivio no prueba control estatal de la curva. El gráfico reúne observaciones del Ledger —incluye datos intradiarios y aproximados—; la <a href="{{ '/revisiones/2026-10/' | relative_url }}">revisión mensual separa las comparaciones homogéneas</a>.</p>
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

<section class="signal-section" aria-labelledby="snapshot-title">
  <div class="section-heading">
    <p class="section-kicker">Última evidencia registrada</p>
    <h2 id="snapshot-title">Qué cambió y qué falta</h2>
  </div>
  <div class="signal-grid">
    <a class="signal-card" href="{{ '/eventos/2026-10-30/' | relative_url }}">
      <span>Brent · cierres 30 oct</span><strong>USD 113,43 · enero</strong><p>Diciembre vencía a USD 117,64. Son contratos distintos: la tensión energética persiste, pero no se mezclan sus precios.</p>
    </a>
    <a class="signal-card" href="{{ '/eventos/2026-10-28/' | relative_url }}">
      <span>Destilados EE.UU. · stock al 23 oct</span><strong>102,824 millones de barriles</strong><p>−1,462 millones semanales. Publicado el 28/10: la mejora de la semana anterior volvió a revertirse.</p>
    </a>
    <a class="signal-card" href="{{ '/revisiones/2026-10/' | relative_url }}">
      <span>Balance mensual · evaluado 2 nov</span><strong>Más intervención. Control pendiente.</strong><p>52 eventos de octubre consolidados: qué se confirma, qué se corrige y por qué no cambia la Phase.</p>
    </a>
  </div>
  <p class="chart-reading"><strong>Vigilancia de inventarios:</strong> recuperar flujos no equivale a reconstruir stocks. Seguir compras y devoluciones efectivas, crudo y combustibles, refinación y exportación, tránsito por Ormuz/Yanbu y respuesta de Brent, diésel, inflación esperada y tasas largas. Más oferta exportable, refinerías recuperadas o menor demanda pueden aliviar la presión. <a href="{{ '/eventos/2026-10-05/' | relative_url }}">Punto de partida: estimaciones de Nasser, no compras confirmadas →</a></p>
</section>

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

[Leer la evaluación mensual de octubre →]({{ '/revisiones/2026-10/' | relative_url }})

## Profundizar

<div class="reading-grid">
  <a href="{{ '/plano/' | relative_url }}"><strong>El plano</strong><span>La hipótesis estructural y sus fases.</span></a>
  <a href="{{ '/tracking/' | relative_url }}"><strong>Seguimiento</strong><span>Las variables que confirman o contradicen la tesis.</span></a>
  <a href="{{ '/eventos/' | relative_url }}"><strong>Event Ledger</strong><span>Los hechos que cambiaron nuestra interpretación.</span></a>
  <a href="{{ '/posicionamiento/' | relative_url }}"><strong>Posicionamiento</strong><span>Qué activos encajan y cuáles quedan fuera del núcleo.</span></a>
</div>

<p class="home-closing">Este sitio no presenta el futuro como un hecho consumado. Construye una historia contrastable y conserva también la evidencia que podría demostrar que está equivocada.</p>

<script id="treasury-10y-data" type="application/json">{{ treasury.points | jsonify }}</script>
<script src="{{ '/assets/js/home-chart.js' | relative_url }}?v={{ site.time | date: '%s' }}" defer></script>
