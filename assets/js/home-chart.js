(() => {
  const container = document.querySelector('[data-chart="treasury-10y"]');
  const dataNode = document.getElementById('treasury-10y-data');
  if (!container || !dataNode) return;

  let points;
  try {
    points = JSON.parse(dataNode.textContent).map((point) => ({
      ...point,
      timestamp: Date.parse(`${point.date}T00:00:00Z`),
      value: Number(point.value),
    }));
  } catch (error) {
    container.textContent = 'No se pudo cargar el gráfico.';
    return;
  }

  if (points.length < 2 || points.some((point) => !Number.isFinite(point.timestamp) || !Number.isFinite(point.value))) {
    container.textContent = 'No hay suficientes datos para dibujar el gráfico.';
    return;
  }

  const svgNamespace = 'http://www.w3.org/2000/svg';
  const createSvgElement = (name, attributes = {}) => {
    const element = document.createElementNS(svgNamespace, name);
    Object.entries(attributes).forEach(([key, value]) => element.setAttribute(key, value));
    return element;
  };

  const formatPercent = (value) => `${value.toLocaleString('es-AR', { minimumFractionDigits: 1, maximumFractionDigits: 2 })}%`;
  const formatShortDate = (date) => new Intl.DateTimeFormat('es-AR', { day: 'numeric', month: 'short', timeZone: 'UTC' }).format(date).replace('.', '');

  const render = () => {
    const width = Math.max(300, Math.floor(container.getBoundingClientRect().width));
    const height = width < 520 ? 250 : 280;
    const margin = { top: width < 520 ? 24 : 38, right: 48, bottom: 38, left: 52 };
    const plotWidth = width - margin.left - margin.right;
    const plotHeight = height - margin.top - margin.bottom;
    const minTimestamp = Math.min(...points.map((point) => point.timestamp));
    const maxTimestamp = Math.max(...points.map((point) => point.timestamp));
    const minValue = Math.floor((Math.min(...points.map((point) => point.value)) - 0.08) * 10) / 10;
    const maxValue = Math.ceil((Math.max(...points.map((point) => point.value)) + 0.08) * 10) / 10;
    const x = (timestamp) => margin.left + ((timestamp - minTimestamp) / (maxTimestamp - minTimestamp)) * plotWidth;
    const y = (value) => margin.top + (1 - (value - minValue) / (maxValue - minValue)) * plotHeight;

    const svg = createSvgElement('svg', {
      viewBox: `0 0 ${width} ${height}`,
      width,
      height,
      'aria-hidden': 'true',
      focusable: 'false',
    });

    const tickCount = 4;
    for (let index = 0; index < tickCount; index += 1) {
      const value = minValue + ((maxValue - minValue) * index) / (tickCount - 1);
      const tickY = y(value);
      svg.appendChild(createSvgElement('line', { class: 'chart-gridline', x1: margin.left, y1: tickY, x2: width - margin.right, y2: tickY }));
      const label = createSvgElement('text', { class: 'chart-axis-label', x: margin.left - 10, y: tickY + 4, 'text-anchor': 'end' });
      label.textContent = formatPercent(value);
      svg.appendChild(label);
    }

    const pathPoints = points.map((point) => `${x(point.timestamp)},${y(point.value)}`);
    const linePath = `M${pathPoints.join(' L')}`;
    const areaPath = `${linePath} L${x(points.at(-1).timestamp)},${margin.top + plotHeight} L${x(points[0].timestamp)},${margin.top + plotHeight} Z`;
    svg.appendChild(createSvgElement('path', { class: 'chart-area', d: areaPath }));
    svg.appendChild(createSvgElement('path', { class: 'chart-line', d: linePath }));

    const tickIndexes = [...new Set([0, Math.floor((points.length - 1) / 2), points.length - 1])];
    tickIndexes.forEach((pointIndex) => {
      const point = points[pointIndex];
      const label = createSvgElement('text', { class: 'chart-axis-label', x: x(point.timestamp), y: height - 10, 'text-anchor': pointIndex === 0 ? 'start' : pointIndex === points.length - 1 ? 'end' : 'middle' });
      label.textContent = formatShortDate(new Date(point.timestamp));
      svg.appendChild(label);
    });

    points.forEach((point, index) => {
      const pointX = x(point.timestamp);
      const pointY = y(point.value);
      if (point.annotation && width >= 520) {
        svg.appendChild(createSvgElement('line', { class: 'chart-event-line', x1: pointX, y1: margin.top - 12, x2: pointX, y2: margin.top + plotHeight }));
        const annotation = createSvgElement('text', { class: 'chart-event-label', x: pointX, y: margin.top - 18, 'text-anchor': 'middle' });
        annotation.textContent = point.annotation;
        svg.appendChild(annotation);
      }
      const circle = createSvgElement('circle', { class: index === points.length - 1 ? 'chart-point chart-point--latest' : 'chart-point', cx: pointX, cy: pointY, r: index === points.length - 1 ? 5 : 4 });
      const title = createSvgElement('title');
      title.textContent = `${point.display_date}: ${point.display_value}`;
      circle.appendChild(title);
      svg.appendChild(circle);
    });

    const latest = points.at(-1);
    const latestLabel = createSvgElement('text', { class: 'chart-value-label', x: x(latest.timestamp) - 8, y: y(latest.value) - 12, 'text-anchor': 'end' });
    latestLabel.textContent = latest.display_value;
    svg.appendChild(latestLabel);

    container.replaceChildren(svg);
  };

  render();
  new ResizeObserver(render).observe(container);
})();
