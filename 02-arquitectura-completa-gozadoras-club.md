# Arquitectura completa de la maqueta: Gozadoras Club

## 1. Resumen arquitectónico

La maqueta implementa una aplicación web cliente de una sola página dentro de un único archivo HTML. La arquitectura es declarativa en los datos y procedural en el renderizado.

```text
HTML único
├── Presentación estática
│   ├── pantallas
│   ├── navegación
│   ├── privacidad
│   └── contenedores de renderizado
├── Estilos CSS
│   ├── tokens visuales
│   ├── layout responsive
│   ├── componentes
│   └── animaciones
└── JavaScript
    ├── datos del cuestionario
    ├── estado de sesión
    ├── navegación
    ├── renderizado por tipo
    ├── captura simulada
    ├── resumen
    └── audio ambiente
```

## 2. Patrón de aplicación

El patrón central es un cuestionario data-driven:

1. `Q` contiene todas las preguntas.
2. `S.i` indica la pregunta actual.
3. `S.a` contiene las respuestas por índice.
4. `render()` lee `Q[S.i]`.
5. `R[q.k]` selecciona el renderer del control.
6. El control llama a `setAnswer()` cuando cambia.
7. `updateNext()` habilita o deshabilita la navegación.
8. `next()` avanza, cambia de capítulo o construye el resumen.

```text
Q[S.i]
   │
   ├── q.k ──► R[q.k]
   │             │
   │             └── control DOM
   │                     │ interacción
   │                     ▼
   └──────────────► setAnswer(v)
                         │
                         ▼
                      S.a[S.i]
                         │
                         ▼
                    updateNext()
```

## 3. Modelo de datos

### 3.1 Capítulos: `CH`

`CH` es una lista de 8 objetos. Cada capítulo contiene texto editorial y la clave de su elemento SVG.

```js
const CH = [
  { t, lead, short, el },
  { t, lead, short, el },
  // ... 8 capítulos
];
```

### 3.2 Elementos visuales: `ELEM`

`ELEM` es un diccionario de fragmentos SVG. `startChapter(c)` inserta el fragmento asociado en `#v-elem`.

Claves:

```js
raiz, corteza, dosel, agua,
clima, semilla, sendero, luna
```

### 3.3 Preguntas: `Q`

`Q` tiene 40 registros. Cada registro declara su capítulo, texto y renderer.

```js
const Q = [
  { c: 0, t: "...", b: "...", k: "chips", o: [...] },
  { c: 1, t: "...", b: "...", k: "slider", lo: "...", hi: "..." },
  // ... 40 preguntas
];
```

### 3.4 Mapa corporal: `ZONES`

`ZONES` separa la posición gráfica de la etiqueta que se muestra al usuario.

```js
const ZONES = {
  rostro: { x: 50, y: 9, l: "Rostro" },
  cuello: { x: 50, y: 21, l: "Cuello" },
  pecho: { x: 50, y: 33, l: "Pecho" },
  abdomen: { x: 50, y: 48, l: "Abdomen" },
  pelvis: { x: 50, y: 60, l: "Zona pélvica" },
  muslos: { x: 36, y: 74, l: "Muslos internos" },
  manos: { x: 14, y: 62, l: "Manos" },
  espalda: { x: 64, y: 74, l: "Espalda baja" }
};
```

## 4. Estado de ejecución

El estado es deliberadamente pequeño:

```js
const S = { i: 0, a: {} };
```

- `S.i`: índice de la pregunta activa.
- `S.a`: diccionario de respuestas; la clave es el índice de pregunta.
- Las respuestas pueden ser strings, números, arrays u objetos derivados del control.

No hay persistencia en servidor. La sesión existe en memoria mientras la página está abierta.

## 5. Navegación y routing interno

La función `go(id)` actúa como router de pantallas:

```js
function go(id) {
  document.querySelectorAll('.screen')
    .forEach(s => s.classList.remove('active'));
  document.getElementById(id).classList.add('active');
}
```

Rutas internas:

- `s-splash`
- `s-consent`
- `s-q`
- `s-sum`

No existe un router de URL ni navegación entre documentos.

## 6. Transición de capítulos

`startChapter(c)` controla la pantalla intermedia de capítulo:

1. Recupera el capítulo desde `CH`.
2. Actualiza número, título y texto.
3. Inserta el SVG desde `ELEM`.
4. Activa la capa `#veil`.
5. Genera partículas con `sparks()`.
6. Aplica vibración opcional.
7. Retira automáticamente la transición.
8. Renderiza el cuestionario.

```text
startChapter(c)
├── CH[c]
├── ELEM[CH[c].el]
├── #veil.on
├── sparks()
├── haptic(14)
└── render()
```

## 7. Renderizado de preguntas

`render()` es el controlador principal de la vista de preguntas.

Responsabilidades:

- Leer `Q[S.i]`.
- Actualizar el mensaje de `#bubble`.
- Actualizar `#plbl`.
- Calcular el avance de cada capítulo.
- Insertar el texto de la pregunta.
- Insertar metadatos y marca de opcionalidad.
- Seleccionar `R[q.k]`.
- Recuperar respuestas anteriores.
- Actualizar el botón siguiente.

La tabla de dispatch es:

```js
const R = {
  chips,
  multi,
  cards,
  sw,
  palette,
  slider,
  map,
  submap,
  rank,
  photo,
  audio,
  text
};
```

## 8. Renderers funcionales

### `chips(q)`

Selección única. Quita el estado activo de los hermanos, activa la opción pulsada y guarda un string.

### `multi(q)`

Selección múltiple. Alterna cada chip y guarda un array con las opciones activas.

### `cards(q)`

Presenta opciones como tarjetas con icono y etiqueta. Guarda la etiqueta elegida.

### `sw(q)`

Presenta texturas con color. Guarda la opción seleccionada.

### `palette(q)`

Presenta círculos de color. Guarda el valor hexadecimal elegido.

### `slider(q)`

Crea un `input[type=range]` dinámico, refleja su valor y guarda un número.

### `map(q)`

Genera silueta, hotspots y etiquetas. Guarda las claves de las zonas seleccionadas.

### `submap(q)`

Genera un mapa especializado de la región pélvica y guarda las selecciones de la lista local.

### `rank(q)`

Construye un orden de selección. Cada toque asigna una posición y solo guarda la respuesta cuando el orden está completo.

### `photo(q)` y `audio(q)`

Usan `capture()` para simular el registro. La maqueta muestra estados de captura/completado, pero no implementa subida de archivos ni almacenamiento remoto.

### `text(q)`

Crea un `textarea` dinámico, restaura el valor existente y guarda el texto recortado.

## 9. Validación de navegación

`setAnswer(v)` escribe la respuesta y llama a `updateNext()`.

`updateNext()` determina si la pregunta está contestada:

```js
const has = S.a[S.i] !== undefined
  && S.a[S.i] !== ''
  && !(Array.isArray(S.a[S.i]) && !S.a[S.i].length);

document.getElementById('nextbtn').disabled = !has && !q.opt;
```

Reglas:

- Pregunta obligatoria sin respuesta: siguiente deshabilitado.
- Pregunta opcional: se puede avanzar sin responder.
- Array vacío: se considera sin respuesta.
- Última pregunta: el CTA cambia a `Ver mi mapa`.

## 10. Avance y retroceso

`next(skip)`:

1. Comprueba si la respuesta es válida o si se omitió.
2. Avanza `S.i`.
3. Si cambia el capítulo, muestra `startChapter()`.
4. Si queda dentro del mismo capítulo, ejecuta `render()`.
5. Si termina el cuestionario, ejecuta `summary()`.

`prev()`:

- Retrocede una pregunta.
- Si está al inicio, vuelve a consentimiento.
- Conserva las respuestas ya registradas.

`restart()`:

```js
function restart() {
  S.i = 0;
  S.a = {};
  go('s-splash');
}
```

## 11. Resumen final

`summary()` transforma el estado en una vista legible:

- Calcula zonas a partir de respuestas de `map` y `submap`.
- Genera etiquetas con `ZONES`.
- Construye un diccionario de valores clave.
- Cuenta las respuestas presentes.
- Renderiza una nota de interpretación no diagnóstica.

```text
S.a
├── respuestas directas
├── zonas corporales
├── escala numérica
├── texto libre
└── estados de captura
       │
       ▼
#sum
├── silueta
├── tags
├── dl.kv
├── lead
└── terr-note
```

## 12. Audio ambiente

`toggleAmbient()` crea una escena sonora sintética con Web Audio API:

- `AudioContext`.
- `GainNode` maestro.
- Buffer de ruido en loop.
- Filtro low-pass.
- Osciladores para chirp y modulación.
- Estado `ambOn`.
- Lista `ambNodes` para detener y desconectar nodos.

No carga un archivo de audio externo.

## 13. Privacidad

`openSheet()` y `closeSheet()` controlan la hoja inferior:

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

La interfaz comunica privacidad local, pero el archivo no contiene una capa real de cifrado, autenticación ni persistencia segura.

## 14. Arquitectura de componentes visuales

```text
Tokens CSS
└── componentes base
    ├── .btn
    ├── .icon-btn
    ├── .chip
    ├── .card
    ├── .slider
    ├── .sw
    ├── .palette
    ├── .bmap
    ├── .sheet
    └── .screen
```

Los componentes no son clases JavaScript ni componentes de React; son patrones CSS y constructores DOM creados por las funciones del script.

## 15. Dependencias del navegador

- DOM API.
- CSS animations.
- SVG inline.
- `Element.animate` para partículas.
- `navigator.vibrate` opcional.
- Web Audio API para ambiente.
- `100dvh`, CSS variables y media queries.

## 16. Límites arquitectónicos

- No existe backend.
- No existe base de datos.
- No hay autenticación real.
- No hay persistencia entre recargas.
- La captura de foto/audio es una simulación de interacción.
- La interpretación de imagen/audio descrita por los textos no está conectada a un modelo de análisis.
- El cuestionario y el resumen viven completamente en el navegador.
