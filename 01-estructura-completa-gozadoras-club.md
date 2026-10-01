# Estructura completa de la maqueta: Gozadoras Club

## 1. Identificación

- Archivo fuente analizado: `gozadoras-club_HTML(Jules).html`
- Ubicación: `C:\Users\nicop\OneDrive\Desktop\TryRating\Nueva carpeta`
- Tipo: documento HTML único, autocontenido.
- Ejecución verificada: `http://localhost:8000/gozadoras-club.html`
- Dependencias externas de ejecución: navegador compatible con HTML, CSS, SVG, JavaScript, Web Audio API y `navigator.vibrate` opcional.
- Backend, base de datos y framework: no se observan.

## 2. Capas del documento

El archivo está organizado en estas capas:

1. `head`
   - Metadatos HTML5.
   - Viewport responsive.
   - Tema visual del navegador.
   - Título y descripción.
   - Fuentes embebidas mediante `@font-face`.
   - Bloque CSS principal.

2. `body`
   - Contenedor raíz `.app`.
   - Pantallas de la experiencia.
   - Ilustraciones SVG embebidas.
   - Controles de navegación.
   - Hoja de privacidad.
   - Un único bloque `<script>` con datos y comportamiento.

3. CSS
   - Variables de color, radios, dimensiones y safe areas.
   - Layout responsive mobile-first.
   - Estados de pantalla, botones, chips, tarjetas, slider, paleta y mapa corporal.
   - Animaciones de entrada, transición de capítulos, partículas y estados activos.

4. JavaScript
   - Modelo de capítulos y preguntas.
   - Modelo de zonas corporales.
   - Estado de respuestas.
   - Navegación.
   - Renderizado dinámico.
   - Captura simulada de foto/audio.
   - Resumen final.
   - Sonido ambiental generado con Web Audio API.
   - Hoja de privacidad.

## 3. Árbol estructural de la interfaz

```text
body
└── .app
    ├── #s-splash.screen.active
    │   ├── ilustración / jaguar SVG
    │   ├── identidad de marca
    │   ├── texto introductorio
    │   └── botón Comenzar
    │
    ├── #s-consent.screen
    │   ├── navegación Volver
    │   ├── explicación del consentimiento
    │   ├── filas de privacidad
    │   └── botón Entiendo, empezar
    │
    ├── #s-q.screen
    │   ├── header
    │   │   ├── #avatar
    │   │   ├── #bubble: instrucción contextual
    │   │   └── #ambbtn: sonido ambiente
    │   ├── #prog
    │   │   ├── #chapters: progreso por capítulo
    │   │   └── #plbl: Pregunta n de 40
    │   ├── #qbody: pregunta y control dinámico
    │   └── footer
    │       ├── Anterior
    │       ├── Omitir
    │       └── Siguiente / Ver mi mapa
    │
    ├── #veil
    │   ├── #veil-leo: transición de capítulo
    │   ├── #spark: partículas SVG
    │   ├── #v-elem: icono del capítulo
    │   ├── #v-num: número de capítulo
    │   ├── #v-title: título
    │   └── #v-lead: texto de entrada
    │
    ├── #s-sum.screen
    │   ├── #sum: resumen dinámico
    │   └── botón Volver al inicio
    │
    ├── #scrim: fondo de modal
    └── #sheet: hoja de privacidad
        ├── opciones de privacidad
        └── botón Listo
```

## 4. Pantallas principales

### 4.1 Splash: `#s-splash`

Es la entrada de la maqueta. Presenta la identidad Gozadoras Club, el concepto de cuerpo-territorio, una ilustración de jaguar y el botón `Comenzar`.

Acción principal:

```html
<button class="btn btn-primary" onclick="go('s-consent')">Comenzar</button>
```

### 4.2 Consentimiento: `#s-consent`

Explica el carácter local y privado de la experiencia. Incluye opciones visuales relacionadas con:

- Bloqueo con código o biometría.
- Almacenamiento solo local.
- Ícono discreto.
- Salida rápida.

Acción principal:

```html
<button class="btn btn-primary" onclick="startChapter(0)">
  Entiendo, empezar
</button>
```

### 4.3 Cuestionario: `#s-q`

Es la pantalla central. Su contenido no está escrito como 40 formularios independientes; se construye dinámicamente con la pregunta actual y el registro `S`.

Incluye:

- Avatar/ilustración.
- Mensaje contextual.
- Progreso de los 8 capítulos.
- Contador de pregunta.
- Enunciado.
- Tipo de respuesta.
- Navegación anterior, omitir y siguiente.
- Acceso a privacidad.
- Control de ambiente sonoro.

### 4.4 Resumen: `#s-sum`

Construye el mapa final de respuestas y zonas marcadas. Muestra:

- Título `Tu cuerpo-territorio hoy`.
- Silueta corporal SVG.
- Etiquetas de zonas seleccionadas.
- Datos resumidos del cuestionario.
- Número de respuestas completadas.
- Nota de que el resultado no es un diagnóstico.
- Botón para reiniciar.

## 5. Capítulos

La constante `CH` contiene 8 capítulos:

| Índice | Capítulo | Tema | Elemento SVG |
|---:|---|---|---|
| 0 | Raíz | Historia y relación con el cuerpo | `raiz` |
| 1 | Corteza | Piel y superficie | `corteza` |
| 2 | Dosel | Sensibilidad primaria | `dosel` |
| 3 | Manantial | Zona pélvica y genital | `agua` |
| 4 | Clima | Ritmo, respiración y temperatura | `clima` |
| 5 | Semilla | Imaginario y deseo | `semilla` |
| 6 | Sendero | Vínculo y contexto | `sendero` |
| 7 | Estaciones | Cambios y adaptación | `luna` |

Cada capítulo contiene:

- `t`: título.
- `lead`: texto introductorio.
- `short`: nombre corto.
- `el`: clave del elemento gráfico.

## 6. Preguntas

La constante `Q` contiene 40 registros, distribuidos en 8 capítulos de 5 preguntas cada uno.

Cada registro puede incluir:

```js
{
  c: 0,
  t: "Texto de la pregunta",
  b: "Texto de apoyo",
  k: "chips",
  o: ["Opción 1", "Opción 2"],
  opt: true,
  note: "Nota para una captura o audio",
  lo: "Mínimo",
  hi: "Máximo",
  zones: ["rostro", "cuello"],
  ph: "Placeholder"
}
```

Campos:

- `c`: índice del capítulo.
- `t`: texto principal.
- `b`: instrucción secundaria.
- `k`: tipo de control.
- `o`: opciones.
- `opt`: indica que la pregunta es opcional.
- `note`: explicación de captura o audio.
- `lo` y `hi`: extremos de un slider.
- `zones`: zonas disponibles para mapa.
- `ph`: placeholder de texto libre.

## 7. Tipos de pregunta

Los 12 tipos implementados son:

| Tipo | Presentación |
|---|---|
| `chips` | Selección única mediante chips |
| `multi` | Selección múltiple mediante chips |
| `cards` | Tarjetas con icono y etiqueta |
| `sw` | Texturas visuales |
| `palette` | Paleta de colores |
| `slider` | Escala deslizante |
| `map` | Mapa corporal con zonas |
| `submap` | Mapa específico de zona pélvica |
| `rank` | Ordenamiento secuencial |
| `photo` | Captura simulada de imagen |
| `audio` | Captura simulada de audio |
| `text` | Texto libre mediante textarea dinámico |

## 8. Zonas corporales

La constante `ZONES` define posición y etiqueta para el mapa corporal:

- `rostro`: Rostro.
- `cuello`: Cuello.
- `pecho`: Pecho.
- `abdomen`: Abdomen.
- `pelvis`: Zona pélvica.
- `muslos`: Muslos internos.
- `manos`: Manos.
- `espalda`: Espalda baja.

Cada zona usa coordenadas porcentuales `x`, `y` y una etiqueta `l`.

## 9. Recursos visuales

- SVG de jaguar.
- SVG de silueta corporal.
- SVG de elementos por capítulo.
- SVG de partículas.
- Iconos SVG embebidos.
- Ilustración de vegetación y ambientación.
- Fuentes Bodoni Moda y Figtree.
- Paleta oscura verde con acentos terracota, dorado, crema y verde.

## 10. Responsividad

- Mobile-first.
- `.app` ocupa el alto disponible en móvil.
- En pantallas de más de 600 px se limita el ancho y alto de la aplicación.
- Se utilizan `100dvh`, `clamp`, `min`, `max` y variables de safe area.
- Los controles tienen una dimensión táctil aproximada de 48 px.

## 11. Conteo estructural verificado

- 4 pantallas principales: splash, consentimiento, cuestionario y resumen.
- 8 capítulos.
- 40 preguntas.
- 8 zonas corporales configuradas.
- 1 bloque `<style>`.
- 1 bloque `<script>`.
- 17 etiquetas SVG detectadas en el documento.
- 10 botones declarados directamente en el HTML; otros controles se generan dinámicamente.

## 12. Flujo completo de pantallas

```text
s-splash
   │ Comenzar
   ▼
s-consent
   │ Entiendo, empezar
   ▼
veil del capítulo 1
   │ transición automática
   ▼
s-q
   │ responder / omitir / anterior / siguiente
   ├── veil al cambiar de capítulo
   └── resumen al terminar
       ▼
s-sum
   │ Volver al inicio
   └── s-splash
```
