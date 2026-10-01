# Códigos visuales y funcionales: Gozadoras Club

## 1. Alcance

Este documento separa los códigos que construyen la apariencia de los códigos que controlan el comportamiento. El código fuente completo permanece en:

`C:\Users\nicop\OneDrive\Desktop\TryRating\Nueva carpeta\gozadoras-club_HTML(Jules).html`

La maqueta está implementada como HTML, CSS y JavaScript embebidos en un solo archivo.

## 2. Código visual: tokens CSS

El lenguaje visual comienza en `:root`:

```css
:root {
  --bg: #0a1510;
  --bg-2: #0f1f17;
  --panel: #14291f;
  --panel-2: #1b3527;
  --line: #254333;
  --tawny: #c9963a;
  --amber: #e9b949;
  --rust: #8b3f24;
  --jade: #4a8f68;
  --lime: #d9553a;
  --moss: #2f6a4a;
  --brand: #b2341e;
  --cream: #efe6d6;
  --cream-2: #b7bfae;
  --ok: #8fae8b;
  --r-lg: 22px;
  --r-md: 14px;
  --r-sm: 10px;
  --tap: 48px;
}
```

Estos tokens controlan:

- Fondo y paneles.
- Contraste y líneas.
- Color de marca y estados activos.
- Tipografía secundaria.
- Radios de componentes.
- Tamaño táctil mínimo.

## 3. Código visual: tipografía

```css
@font-face {
  font-family: 'Bodoni Moda';
  font-style: normal;
  font-weight: 500;
  /* fuente embebida en el HTML */
}

@font-face {
  font-family: 'Figtree';
  font-style: normal;
  font-weight: 400;
  /* fuente embebida en el HTML */
}

body {
  font-family: 'Figtree', -apple-system, system-ui, sans-serif;
}

h1, h2, h3, .serif, .qtext {
  font-family: 'Bodoni Moda', 'Didot', Georgia, serif;
}
```

La combinación utiliza una serif expresiva para títulos y preguntas y una sans serif para controles, instrucciones y datos.

## 4. Código visual: contenedor responsive

```css
body {
  margin: 0;
  min-height: 100%;
  display: flex;
  justify-content: center;
  background: radial-gradient(
    120% 60% at 50% -10%,
    #173726 0%,
    var(--bg) 60%
  );
}

.app {
  width: 100%;
  max-width: 480px;
  min-height: 100dvh;
  position: relative;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

@media (min-width: 600px) {
  .app {
    min-height: 0;
    height: min(920px, 96dvh);
    margin: 2vh 0;
  }
}
```

## 5. Código visual: pantallas

```css
.screen {
  position: absolute;
  inset: 0;
  display: none;
  flex-direction: column;
  padding: var(--sat) 0 var(--sab);
}

.screen.active {
  display: flex;
  animation: scr-in .35s ease both;
}

@keyframes scr-in {
  from {
    opacity: 0;
    transform: translateY(8px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
```

Las pantallas se superponen dentro de `.app`; solo la pantalla con clase `active` se muestra.

## 6. Código visual: cabecera y progreso

```css
.hdr {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 14px 20px 8px;
}

.bubble {
  flex: 1;
  background: var(--panel);
  border: 1px solid var(--line);
  border-radius: var(--r-md);
  padding: 9px 13px;
  color: var(--cream-2);
}

.prog {
  padding: 6px 20px 0;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.chapters {
  display: flex;
  gap: 5px;
}

.chapters i {
  flex: 1;
  height: 4px;
  border-radius: 4px;
  background: var(--line);
}
```

## 7. Código visual: controles de selección

```css
.chips {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.chip {
  min-height: var(--tap);
  padding: 11px 18px;
  border-radius: 26px;
  border: 1px solid var(--line);
  background: transparent;
  color: var(--cream-2);
  cursor: pointer;
}

.chip.on {
  background: var(--brand);
  color: var(--cream);
  border-color: var(--brand-2);
}

.cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(130px, 1fr));
  gap: 10px;
}

.card {
  min-height: 92px;
  border-radius: var(--r-md);
  border: 1px solid var(--line);
  background: var(--panel);
}

.card.on {
  border-color: var(--lime);
  background: var(--panel-2);
}
```

## 8. Código visual: slider, paleta y mapa

```css
.slider {
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.slider .val {
  font-family: 'Bodoni Moda', Georgia, serif;
  font-size: 60px;
}

.sw {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 10px;
}

.palette {
  display: flex;
  gap: 14px;
  flex-wrap: wrap;
  justify-content: center;
}

.bmap {
  position: relative;
  width: min(230px, 60vw);
  margin: 4px auto;
  aspect-ratio: 2 / 3;
}

.hot {
  position: absolute;
  width: 38px;
  height: 38px;
  border-radius: 50%;
  transform: translate(-50%, -50%);
}
```

Los hotspots del mapa se posicionan con porcentajes procedentes de `ZONES`.

## 9. Código visual: privacidad y transición

```css
.scrim {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, .5);
  opacity: 0;
  pointer-events: none;
}

.scrim.on {
  opacity: 1;
  pointer-events: auto;
}

.sheet {
  position: fixed;
  left: 50%;
  bottom: 0;
  width: min(480px, 100%);
  transform: translate(-50%, 100%);
  background: var(--panel);
  border-radius: var(--r-lg) var(--r-lg) 0 0;
}

.sheet.on {
  transform: translate(-50%, 0);
}
```

La transición de capítulo usa `#veil`, `#veil-leo`, `#spark`, `#v-elem`, `#v-num`, `#v-title` y `#v-lead`.

## 10. Código funcional: estado

```js
const S = { i: 0, a: {} };

function setAnswer(v) {
  S.a[S.i] = v;
  updateNext();
}
```

`S.i` identifica la pregunta activa y `S.a` guarda las respuestas por índice.

## 11. Código funcional: cambio de pantalla

```js
function go(id) {
  document.querySelectorAll('.screen')
    .forEach(s => s.classList.remove('active'));

  document.getElementById(id).classList.add('active');
}
```

Los botones del HTML llaman directamente a esta función con `onclick`.

## 12. Código funcional: validación del siguiente paso

```js
function updateNext() {
  const q = Q[S.i];
  const has = S.a[S.i] !== undefined
    && S.a[S.i] !== ''
    && !(Array.isArray(S.a[S.i]) && !S.a[S.i].length);

  document.getElementById('nextbtn').disabled = !has && !q.opt;
  document.getElementById('nextbtn').textContent =
    S.i === Q.length - 1 ? 'Ver mi mapa' : 'Siguiente';
}
```

Este bloque implementa la regla de obligatoriedad y el cambio del CTA final.

## 13. Código funcional: tabla de renderizadores

```js
const R = {
  chips(q) { /* selección única */ },
  multi(q) { /* selección múltiple */ },
  cards(q) { /* tarjetas */ },
  sw(q) { /* texturas */ },
  palette(q) { /* color */ },
  slider(q) { /* escala */ },
  map(q) { /* zonas corporales */ },
  submap(q) { /* mapa pélvico */ },
  rank(q) { /* orden */ },
  photo(q) { return capture(q, '◉', 'Capturar', 'Capturado'); },
  audio(q) { return capture(q, '♫', 'Grabar', 'Grabado', true); },
  text(q) { /* textarea */ }
};
```

La versión completa de cada renderer está dentro del bloque `<script>` del archivo HTML fuente.

## 14. Código funcional: renderizado principal

```js
function render() {
  const q = Q[S.i];
  const body = document.getElementById('qbody');

  body.innerHTML = '';
  document.getElementById('bubble').textContent = q.b;
  document.getElementById('plbl').textContent =
    `Pregunta ${S.i + 1} de 40`;

  const title = el('div', 'qtext', q.t);
  body.appendChild(title);

  const meta = el('div', 'qmeta');
  meta.innerHTML = q.opt
    ? '<span class="opt">Opcional</span>'
    : '';
  body.appendChild(meta);

  body.appendChild(R[q.k](q));
  updateNext();
}
```

La implementación real también actualiza los capítulos, restaura estados seleccionados y controla la etiqueta del tipo de respuesta.

## 15. Código funcional: navegación

```js
function next(skip) {
  const current = Q[S.i];
  const valid = S.a[S.i] !== undefined;

  if (!skip && !valid && !current.opt) return;
  if (S.i === Q.length - 1) {
    summary();
    return;
  }

  const previousChapter = current.c;
  S.i++;
  const nextChapter = Q[S.i].c;

  if (nextChapter !== previousChapter) {
    startChapter(nextChapter);
  } else {
    render();
  }
}

function prev() {
  if (S.i === 0) {
    go('s-consent');
    return;
  }
  S.i--;
  render();
}
```

## 16. Código funcional: selección múltiple

```js
function multi(q) {
  const wrap = el('div', 'chips');
  const current = S.a[S.i] || [];

  q.o.forEach(option => {
    const button = el('button', 'chip', option);
    if (current.includes(option)) button.classList.add('on');

    button.onclick = () => {
      button.classList.toggle('on');
      haptic();
      setAnswer([
        ...wrap.querySelectorAll('.chip.on')
      ].map(x => x.textContent));
    };

    wrap.appendChild(button);
  });

  return wrap;
}
```

## 17. Código funcional: feedback háptico

```js
const haptic = ms => {
  try {
    navigator.vibrate && navigator.vibrate(ms || 8);
  } catch (e) {}
};
```

Es una mejora opcional para dispositivos compatibles; si el navegador no la soporta, la interacción continúa.

## 18. Código funcional: mapa corporal

El renderer `map(q)`:

1. Crea el contenedor `.bmap`.
2. Inserta la silueta SVG.
3. Recorre `q.zones`.
4. Consulta las coordenadas en `ZONES`.
5. Crea un hotspot `.hot` por zona.
6. Alterna la clase `.on` al tocar.
7. Guarda un array de claves seleccionadas.

```js
const zone = ZONES[key];
hot.style.left = `${zone.x}%`;
hot.style.top = `${zone.y}%`;
hot.setAttribute('aria-label', zone.l);
hot.onclick = () => {
  hot.classList.toggle('on');
  const selected = [...map.querySelectorAll('.hot.on')]
    .map(x => Object.keys(ZONES)
      .find(key => ZONES[key].l === x.getAttribute('aria-label')));
  setAnswer(selected);
};
```

## 19. Código funcional: captura simulada

```js
function capture(q, icon, label, done, isAudio) {
  const button = el('button', 'go', label);

  button.onclick = () => {
    haptic(12);
    button.closest('.cap').classList.add('rec');

    setTimeout(() => {
      setAnswer({
        type: isAudio ? 'audio' : 'photo',
        status: 'captured'
      });
      button.textContent = `✓ ${done}`;
      button.classList.add('done');
    }, 900);
  };

  return container;
}
```

La interfaz representa el estado de captura. No se observa envío a servidor ni almacenamiento persistente del archivo multimedia.

## 20. Código funcional: resumen

```js
function summary() {
  const sum = document.getElementById('sum');
  sum.innerHTML = '';

  const hits = new Set([
    ...(S.a[6] || []),
    ...(S.a[10] || [])
  ]);

  if ((S.a[15] || []).length) hits.add('pelvis');

  // Render de silueta, etiquetas, pares clave/valor y estado final.
  go('s-sum');
}
```

El resumen transforma respuestas en una salida visual, no en un diagnóstico médico.

## 21. Código funcional: audio ambiente

```js
function toggleAmbient() {
  if (ambOn) {
    ambNodes.forEach(node => {
      try {
        node.stop && node.stop();
        node.disconnect && node.disconnect();
      } catch (e) {}
    });
    ambNodes = [];
    ambOn = false;
    return;
  }

  AC = AC || new AudioContext();
  // Se crean buffer, filtros, osciladores y gain nodes.
  ambOn = true;
}
```

La implementación genera sonido ambiental sintético en el navegador y permite activarlo o detenerlo desde `#ambbtn`.

## 22. Código funcional: privacidad

```js
function openSheet() {
  document.getElementById('sheet').classList.add('on');
  document.getElementById('scrim').classList.add('on');
}

function closeSheet() {
  document.getElementById('sheet').classList.remove('on');
  document.getElementById('scrim').classList.remove('on');
}
```

El botón de privacidad y el fondo oscuro permiten abrir/cerrar la hoja inferior.

## 23. Inventario de eventos

| Evento | Controlador | Efecto |
|---|---|---|
| `onclick` | `go()` | Cambia de pantalla |
| `onclick` | `startChapter()` | Inicia capítulo y transición |
| `onclick` | `next()` | Avanza u obtiene resumen |
| `onclick` | `prev()` | Retrocede |
| `onclick` | `restart()` | Reinicia estado |
| `onclick` | renderers | Selecciona respuestas |
| `oninput` | `slider()` | Guarda valor numérico |
| `oninput` | `text()` | Guarda texto |
| `onclick` | `toggleAmbient()` | Activa/desactiva audio |
| `onclick` | `openSheet()` | Abre privacidad |
| `onclick` | `closeSheet()` | Cierra privacidad |

## 24. Conclusión técnica

La maqueta visual y funcional está contenida en un HTML de archivo único. El aspecto visual depende de CSS y SVG embebidos; el comportamiento depende de un modelo de datos `CH/Q/ZONES`, un estado `S`, la tabla de renderers `R` y funciones de navegación y resumen. La implementación es ejecutable sin backend y conserva la sesión únicamente en memoria del navegador.
