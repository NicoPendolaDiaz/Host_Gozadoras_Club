# Arquitectura integral completa de Gozadoras Club

## Documento maestro de arquitectura

**Version:** 1.0  
**Fecha:** 24 de septiembre de 2026  
**Fuente principal:** `gozadoras-club_HTML(Jules).html`  
**URL de validacion:** `http://localhost:8000/gozadoras-club.html`  
**Estado:** maqueta funcional de frontend, sin backend persistente.

> Este documento consolida la arquitectura existente de la maqueta y las variables faltantes necesarias para transformarla en una landing page y/o aplicacion funcional con recopilacion controlada de datos y gobernanza de privacidad.

---

## 1. Resumen ejecutivo

Gozadoras Club es una experiencia web interactiva de tipo cuestionario visual. Su concepto de interfaz es cuerpo-territorio: la persona recorre 8 capitulos y responde 40 preguntas mediante controles tactiles, mapas corporales, escalas, texto, colores y estados de captura simulada.

La implementacion actual es un documento HTML unico y autocontenido:

```text
HTML unico
├── Metadatos y recursos
├── CSS embebido
├── Estructura visual estatica
├── SVG embebido
└── JavaScript embebido
    ├── Modelo de capitulos
    ├── Modelo de preguntas
    ├── Mapa corporal
    ├── Estado de sesion en memoria
    ├── Renderizadores de controles
    ├── Navegacion
    ├── Resumen
    ├── Audio ambiental sintetico
    └── Hoja de privacidad visual
```

La maqueta ya resuelve la experiencia visual y la interaccion local. Aun no resuelve:

- Persistencia de usuarios y respuestas.
- Autenticacion.
- API.
- Base de datos.
- Consentimiento legal versionado.
- Derechos de titulares.
- Retencion y eliminacion.
- Seguridad de produccion.
- Analitica gobernada.
- Gestion real de foto y audio.

La arquitectura objetivo debe conservar la expresividad de la maqueta, pero separar claramente presentacion, dominio, persistencia, privacidad y operaciones.

---

# Parte I. Arquitectura existente

## 2. Alcance tecnico actual

### 2.1 Tipo de aplicacion

- Aplicacion web cliente.
- Single Page Application artesanal, sin framework declarado.
- Documento HTML monolitico.
- Renderizado dinamico mediante DOM API.
- Estado temporal en memoria del navegador.
- Sin servidor de aplicacion.
- Sin base de datos.
- Sin servicios externos observados.

### 2.2 Ejecucion

La maqueta se ejecuta correctamente servida por HTTP local:

```text
http://localhost:8000/gozadoras-club.html
```

El servidor local solo entrega el archivo. No forma parte de la arquitectura funcional de la aplicacion.

### 2.3 Tamano e inventario verificado

- Archivo fuente: 618 lineas.
- Tamano aproximado: 809857 bytes.
- Bloques `<style>`: 1.
- Bloques `<script>`: 1.
- Preguntas: 40.
- Capitulos: 8.
- Zonas corporales: 8.
- Pantallas principales: 4.
- Etiquetas SVG detectadas: 17.
- Dependencia de backend: ninguna en el estado actual.

---

## 3. Lenguajes y tecnologias utilizados

### 3.1 HTML5

Responsabilidades:

- Definir el documento.
- Declarar metadatos.
- Crear las pantallas base.
- Crear contenedores de renderizado.
- Declarar botones y acciones iniciales.
- Contener SVG y fragmentos visuales.
- Cargar el script de la aplicacion.

Elementos estructurales principales:

```text
html
├── head
│   ├── meta charset
│   ├── meta viewport
│   ├── meta theme-color
│   ├── meta description
│   ├── title
│   └── style
└── body
    └── .app
        ├── .screen
        ├── #veil
        ├── #s-sum
        ├── #scrim
        ├── #sheet
        └── script
```

### 3.2 CSS3

Responsabilidades:

- Sistema de tokens visuales.
- Layout mobile-first.
- Paneles y componentes.
- Estados activos e inactivos.
- Transiciones y animaciones.
- Adaptacion a viewport.
- Safe areas para dispositivos moviles.
- Presentacion de mapas, chips, tarjetas y controles.

Funciones CSS utilizadas:

- Variables CSS.
- Media queries.
- `clamp()`.
- `min()` y `max()`.
- `100dvh`.
- Gradientes radiales.
- Animaciones `@keyframes`.
- Selectores de estado `.active`, `.on`, `.done`.
- Pseudo-elementos de controles.
- Grid y flexbox.

### 3.3 JavaScript moderno de navegador

Responsabilidades:

- Datos de la experiencia.
- Manipulacion DOM.
- Navegacion entre pantallas.
- Renderizado de preguntas.
- Registro de respuestas.
- Validacion de avance.
- Generacion del resumen.
- Animaciones via Web Animations API.
- Vibracion opcional.
- Audio mediante Web Audio API.

APIs del navegador observadas o utilizadas:

- `document.querySelectorAll`.
- `document.getElementById`.
- `document.createElement`.
- `document.createElementNS`.
- `classList`.
- `Element.animate`.
- `requestAnimationFrame`.
- `setTimeout`.
- `AudioContext`.
- `navigator.vibrate` cuando existe.

### 3.4 SVG

Se utiliza para:

- Jaguar.
- Silueta corporal.
- Elementos de los capitulos.
- Particulas.
- Iconografia.
- Hotspots visuales sobre el mapa.

Los SVG estan embebidos. No hay un sistema de iconos externo identificado.

### 3.5 Web Audio API

El sonido ambiental se genera en el cliente con:

- `AudioContext`.
- Buffer de ruido.
- `GainNode`.
- Filtros.
- Osciladores.
- Modulacion.

No se observa carga de archivos de audio externos.

---

## 4. Estructura visual completa

## 4.1 Contenedor raiz

```text
body
└── .app
```

`.app` centraliza la experiencia y se comporta como una pantalla movil dentro del navegador de escritorio.

Caracteristicas:

- Ancho completo hasta 480 px.
- Alto minimo del viewport.
- Overflow controlado.
- Flex column.
- Fondo ambiental oscuro.
- Marco limitado en viewport mayor.

## 4.2 Pantalla Splash: `#s-splash`

Objetivo: introduccion de marca y entrada a la experiencia.

Elementos:

- Jaguar o ilustracion principal.
- Marca Gozadoras Club.
- Concepto cuerpo-territorio.
- Texto introductorio.
- Boton `Comenzar`.

Transicion:

```text
Comenzar -> go('s-consent')
```

## 4.3 Pantalla Consentimiento: `#s-consent`

Objetivo: contextualizar la experiencia y presentar opciones de privacidad visual.

Elementos:

- Boton volver.
- Explicacion del proceso.
- Bloque de privacidad.
- Opciones de bloqueo, almacenamiento local, icono discreto y salida rapida.
- Boton `Entiendo, empezar`.

Transicion:

```text
Entiendo, empezar -> startChapter(0)
```

La pantalla actual es una interfaz de consentimiento conceptual. Para produccion debe transformarse en un consentimiento legal versionado, separado por finalidades.

## 4.4 Pantalla de preguntas: `#s-q`

Es la pantalla principal de la experiencia.

```text
#s-q
├── .hdr
│   ├── #avatar
│   ├── #bubble
│   └── #ambbtn
├── .prog
│   ├── #chapters
│   └── #plbl
├── #qbody
└── .ftr
    ├── boton anterior
    ├── #skip
    └── #nextbtn
```

Responsabilidades visuales:

- Mostrar contexto de la pregunta.
- Mostrar progreso.
- Mostrar una sola pregunta activa.
- Mostrar el renderer adecuado.
- Conservar una superficie tactil accesible.
- Permitir avanzar, retroceder u omitir.

## 4.5 Transicion de capitulos: `#veil`

La capa `#veil` separa capitulos y aporta narrativa visual.

```text
#veil
├── #veil-leo
├── #spark
├── #veil-txt
│   ├── #v-elem
│   ├── #v-num
│   ├── #v-title
│   └── #v-lead
```

La transicion:

1. Actualiza numero y textos.
2. Inserta el elemento SVG.
3. Activa la capa.
4. Genera particulas.
5. Ejecuta movimiento del jaguar.
6. Aplica haptic feedback.
7. Oculta la capa despues de un tiempo.
8. Deja lista la siguiente pregunta.

## 4.6 Pantalla de resumen: `#s-sum`

Objetivo: convertir respuestas en un mapa de lectura.

Elementos dinamicos:

- Titulo.
- Silueta.
- Etiquetas de zonas.
- Lista de valores clave.
- Numero de respuestas contestadas.
- Nota no diagnostica.
- Boton de reinicio.

## 4.7 Hoja de privacidad

```text
#scrim
└── #sheet
    ├── .grab
    ├── h3
    ├── .prow
    ├── .sw-toggle
    └── boton Listo
```

Actualmente es una capa visual. No persiste configuraciones ni gestiona juridicamente el consentimiento.

---

## 5. Tokens visuales

La paleta se define mediante variables CSS en `:root`.

```text
Fondos:
--bg, --bg-2, --panel, --panel-2

Lineas:
--line

Acentos:
--tawny, --amber, --rust, --jade, --lime, --moss

Marca:
--brand, --brand-2

Texto:
--cream, --cream-2, --ok

Geometria:
--r-lg, --r-md, --r-sm, --tap
```

Direccion visual:

- Verde bosque oscuro.
- Terracota y oxido como acento.
- Crema para texto.
- Dorado y lima para estados.
- Serif editorial para preguntas.
- Sans serif funcional para controles.
- Fondo radial ambiental.
- Bordes y paneles de bajo contraste.

---

## 6. Modelo de datos existente

## 6.1 `CH`: capitulos

`CH` contiene 8 objetos editoriales.

```js
const CH = [
  { t, lead, short, el },
  { t, lead, short, el },
  // total: 8 capitulos
];
```

Capitulos:

| Indice | Nombre | Tema | Clave visual |
|---:|---|---|---|
| 0 | Raiz | Historia y relacion con el cuerpo | `raiz` |
| 1 | Corteza | Piel y superficie | `corteza` |
| 2 | Dosel | Sensibilidad primaria | `dosel` |
| 3 | Manantial | Zona pelvica y genital | `agua` |
| 4 | Clima | Ritmo, respiracion y temperatura | `clima` |
| 5 | Semilla | Imaginario y deseo | `semilla` |
| 6 | Sendero | Vinculo y contexto | `sendero` |
| 7 | Estaciones | Cambios y adaptacion | `luna` |

## 6.2 `ELEM`: lenguaje SVG de capitulos

`ELEM` asocia una clave narrativa con un fragmento SVG.

```text
raiz, corteza, dosel, agua,
clima, semilla, sendero, luna
```

## 6.3 `Q`: preguntas

`Q` contiene 40 objetos, cinco por capitulo.

Campos principales:

| Campo | Funcion |
|---|---|
| `c` | Indice del capitulo |
| `t` | Texto de la pregunta |
| `b` | Texto de apoyo |
| `k` | Tipo de control |
| `o` | Opciones |
| `opt` | Pregunta opcional |
| `note` | Nota de captura |
| `lo` | Etiqueta minima de slider |
| `hi` | Etiqueta maxima de slider |
| `zones` | Zonas disponibles |
| `ph` | Placeholder de texto |

Tipos de control:

```text
chips, multi, cards, sw, palette, slider,
map, submap, rank, photo, audio, text
```

## 6.4 `ZONES`: mapa corporal

```text
rostro, cuello, pecho, abdomen,
pelvis, muslos, manos, espalda
```

Cada zona declara:

- `x`: posicion horizontal.
- `y`: posicion vertical.
- `l`: etiqueta visible.

## 6.5 `S`: estado de ejecucion

```js
const S = { i: 0, a: {} };
```

- `S.i`: pregunta activa.
- `S.a`: respuestas por indice.

Tipos de valores almacenados:

- String.
- Number.
- Array de strings.
- Valor hexadecimal.
- Orden de seleccion.
- Estado de captura simulado.

Limitacion principal: el estado desaparece al recargar la pagina.

---

## 7. Arquitectura funcional existente

## 7.1 Router de pantallas

```js
function go(id) {
  document.querySelectorAll('.screen')
    .forEach(s => s.classList.remove('active'));
  document.getElementById(id).classList.add('active');
}
```

Es un router interno por identificador DOM. No modifica la URL y no tiene navegacion entre documentos.

## 7.2 Funcion `startChapter(c)`

Responsabilidades:

- Mostrar numero de capitulo.
- Mostrar titulo y entradilla.
- Insertar SVG del capitulo.
- Activar el velo.
- Generar particulas.
- Aplicar vibracion.
- Ocultar la transicion.
- Continuar el cuestionario.

## 7.3 Funcion `render()`

Responsabilidades:

- Leer `Q[S.i]`.
- Actualizar `#bubble`.
- Actualizar contador.
- Calcular barras de progreso.
- Crear texto de pregunta.
- Crear metadata.
- Seleccionar renderer `R[q.k]`.
- Restaurar respuesta existente.
- Actualizar navegacion.

## 7.4 Tabla de renderizadores `R`

```text
R.chips
R.multi
R.cards
R.sw
R.palette
R.slider
R.map
R.submap
R.rank
R.photo
R.audio
R.text
```

La tabla es el principal punto de extension de la experiencia. Para agregar un tipo de pregunta se debe:

1. Agregar datos en `Q`.
2. Crear o extender un renderer.
3. Definir el tipo en `label()`.
4. Definir reglas de restauracion.
5. Definir serializacion de la respuesta.
6. Definir validacion.
7. Definir representacion en el resumen.

## 7.5 `setAnswer(v)`

```js
function setAnswer(v) {
  S.a[S.i] = v;
  updateNext();
}
```

## 7.6 `updateNext()`

Determina si la pregunta puede avanzar:

- Respuesta no indefinida.
- Texto no vacio.
- Array no vacio.
- Pregunta opcional permite omision.
- Ultima pregunta cambia CTA a `Ver mi mapa`.

## 7.7 `next(skip)`

Responsabilidades:

- Eliminar respuesta si se omite.
- Avanzar indice.
- Detectar cambio de capitulo.
- Lanzar transicion si corresponde.
- Renderizar la siguiente pregunta.
- Lanzar resumen al final.

## 7.8 `prev()` y `restart()`

- `prev()` conserva respuestas y retrocede.
- `restart()` borra estado y vuelve al splash.

## 7.9 `summary()`

Construye una salida agregada:

```text
S.a
├── zonas de mapa
├── zonas de submapa
├── escalas
├── preferencias
├── contexto
└── cambios observados
        ▼
Resumen visual
```

## 7.10 `capture()`

La funcion compartida por `photo` y `audio` presenta una captura simulada:

- Estado inicial.
- Estado de grabacion o analisis.
- Estado completado.
- Nota contextual.

No existe integracion real con camara, microfono, almacenamiento de objetos ni analisis de inteligencia artificial.

## 7.11 `toggleAmbient()`

Genera audio sintetico local y mantiene referencias de nodos para detenerlo.

## 7.12 Privacidad visual

`openSheet()` y `closeSheet()` controlan la hoja. No constituyen por si mismos un sistema de privacidad legal o tecnica.

---

# Parte II. Arquitectura faltante

## 8. Variable faltante A: evolucion a landing page o app

Documento relacionado: `04-que-falta-para-landing-o-app-gozadoras-club.md`.

## 8.1 Arquitectura de producto faltante

Hay que separar dos superficies:

```text
Landing page
├── propuesta de valor
├── beneficios
├── limites y confianza
├── CTA
├── registro opcional
└── privacidad

Aplicacion
├── splash
├── consentimiento
├── cuestionario
├── guardado
├── resumen
└── centro de privacidad
```

## 8.2 Variables nuevas de producto

```text
productMode:
  landing | questionnaire | account | admin

userEligibility:
  ageMinimum
  allowedCountries
  adultOnly

sessionMode:
  anonymous | authenticated

resultMode:
  ephemeral | saved | exportable

mediaMode:
  simulated | localOnly | uploaded

communicationMode:
  none | service | marketing
```

## 8.3 Brechas tecnicas

- Separar componentes y datos del HTML monolitico.
- Crear identidad estable de preguntas.
- Crear estado persistente.
- Crear API.
- Crear base de datos.
- Crear autenticacion.
- Crear mecanismo de recuperacion.
- Crear consola operativa.
- Crear analitica sin exponer respuestas.
- Crear pruebas y observabilidad.

## 8.4 Estado objetivo del frontend

```text
UI
├── components
│   ├── Splash
│   ├── Consent
│   ├── ChapterVeil
│   ├── QuestionRenderer
│   ├── Progress
│   ├── Summary
│   └── PrivacyCenter
├── domain
│   ├── questions
│   ├── chapters
│   ├── zones
│   └── answerRules
├── state
│   ├── sessionStore
│   ├── answerStore
│   └── consentStore
├── services
│   ├── apiClient
│   ├── authClient
│   └── analyticsClient
└── security
    ├── token handling
    ├── input sanitization
    └── privacy controls
```

## 8.5 Criterio de producto competitivo

Una version competitiva debe entregar:

- Experiencia emocional coherente.
- Carga rapida.
- Accesibilidad.
- Continuidad entre dispositivos si se solicita.
- Privacidad visible.
- Transparencia sobre lo que se analiza.
- Resultado comprensible.
- Soporte y recuperacion.
- Diferenciacion visual sin sacrificar seguridad.

---

## 9. Variable faltante B: backend

Documento relacionado: `05-pasos-backend-para-gozadoras-club.md`.

## 9.1 Arquitectura backend objetivo

```text
Frontend
   │ HTTPS
   ▼
API Gateway
   ├── Auth service
   ├── Session service
   ├── Answer service
   ├── Consent service
   ├── Contact service
   ├── Privacy rights service
   └── Audit service
        │
        ├── Identity database
        ├── Sensitive answers database
        ├── Consent ledger
        ├── Object storage, solo si se aprueba
        └── Email/SMS provider
```

## 9.2 Recursos de dominio

### Usuario

```text
User
├── id
├── firstName
├── lastName
├── email
├── phoneCountryCode
├── phoneNumber
├── emailVerifiedAt
├── phoneVerifiedAt
└── createdAt
```

### Sesion

```text
QuestionnaireSession
├── id
├── userId nullable
├── schemaVersion
├── status
├── currentQuestion
├── startedAt
├── completedAt
└── expiresAt
```

### Respuesta

```text
Answer
├── id
├── sessionId
├── questionId
├── encryptedValue
├── valueType
├── answeredAt
└── deletedAt nullable
```

### Consentimiento

```text
Consent
├── id
├── subjectId
├── purpose
├── policyVersion
├── affirmativeAction
├── grantedAt
├── revokedAt
└── evidence
```

## 9.3 API minima

```text
POST   /api/v1/sessions
GET    /api/v1/sessions/:id
PATCH  /api/v1/sessions/:id
DELETE /api/v1/sessions/:id
PUT    /api/v1/sessions/:id/answers/:questionId
GET    /api/v1/sessions/:id/answers
POST   /api/v1/sessions/:id/complete
POST   /api/v1/contacts
POST   /api/v1/consents
POST   /api/v1/consents/:id/revoke
POST   /api/v1/privacy/access
POST   /api/v1/privacy/rectification
POST   /api/v1/privacy/suppression
POST   /api/v1/privacy/opposition
POST   /api/v1/privacy/blocking
POST   /api/v1/privacy/portability
```

## 9.4 Contratos del backend

Cada endpoint debe definir:

- Autenticacion.
- Autorizacion.
- Entrada.
- Salida.
- Errores.
- Idempotencia.
- Rate limit.
- Auditoria.
- Retencion.

## 9.5 Integracion frontend-backend

```text
start
  ▼
POST /sessions
  ▼
store.sessionId
  ▼
answer event
  ▼
PUT /sessions/:id/answers/:questionId
  ▼
local UI update
  ▼
chapter complete
  ▼
server checkpoint
  ▼
questionnaire complete
  ▼
POST /sessions/:id/complete
  ▼
summary response
```

## 9.6 Seguridad backend

- HTTPS.
- Tokens de sesion no predecibles.
- Cookies seguras o mecanismo equivalente.
- Cifrado en reposo.
- Minimo privilegio.
- MFA para administracion.
- Rotacion de secretos.
- Validacion server-side.
- Rate limiting.
- Proteccion contra enumeracion.
- Logs sin respuestas.
- Backups cifrados.
- Pruebas de restauracion.
- Alertas de accesos anomalos.

## 9.7 Criterios de aceptacion

- Usuario A no puede consultar datos de usuario B.
- Preguntas inexistentes son rechazadas.
- Valores fuera de rango son rechazados.
- El cliente no puede cambiar `userId` para acceder a otra cuenta.
- La sesion puede reanudarse.
- La eliminacion se propaga a copias operativas.
- La exportacion devuelve solo datos autorizados.

---

## 10. Variable faltante C: recopilacion de datos de usuarios

Documento relacionado: `06-proceso-recopilacion-datos-usuarios-gozadoras-club.md`.

## 10.1 Principio rector

La recopilacion debe ser selectiva, explicada y proporcional. La maqueta puede operar sin identificar a la persona y pedir datos de contacto solo cuando exista una finalidad concreta.

## 10.2 Separacion de dominios

```text
Sesion anonima
├── progreso
├── respuestas
└── resumen temporal

Cuenta de usuario
├── nombre
├── apellido
├── email
└── telefono

Preferencias de comunicacion
├── servicio
├── novedades
└── marketing
```

No se debe mezclar todo en una unica tabla o un unico consentimiento.

## 10.3 Datos identificatorios solicitados

- Nombre.
- Apellido.
- Correo electronico.
- Codigo de pais.
- Numero de telefono.

Arquitectura recomendada:

- `phoneCountryCode` separado de `phoneNumber`.
- Normalizacion a formato internacional.
- Verificacion solo si el canal es necesario.
- No usar correo o telefono como identificador visible.
- No guardar datos de contacto en respuestas del cuestionario.

## 10.4 Flujo de recopilacion

```text
Visita landing
  ▼
Inicia cuestionario anonimo
  ▼
Responde preguntas
  ▼
Elige continuar sin guardar o guardar mapa
  ▼
Se muestra aviso de privacidad
  ▼
Selecciona finalidades
  ▼
Entrega contacto minimo
  ▼
Verifica email/telefono, si aplica
  ▼
Se vincula userId con sessionId
  ▼
Se guarda resultado autorizado
```

## 10.5 Consentimientos separados

- Guardar respuestas para entregar y recuperar el mapa.
- Recibir comunicaciones operativas.
- Recibir marketing.
- Contribuir a estadisticas anonimizadas.
- Procesar foto/audio real.

Deben ser acciones afirmativas separadas y no preseleccionadas.

## 10.6 Datos potencialmente sensibles

El contenido de la maqueta puede revelar:

- Vida sexual.
- Orientacion sexual.
- Identidad de genero.
- Salud o cambios corporales.
- Sensibilidad.
- Preferencias intimas.
- Relaciones.
- Voz o rostro si se habilitan capturas.

Por ello, las respuestas deben clasificarse como potencialmente sensibles antes de almacenar identificadores junto a ellas.

## 10.7 Analitica

La analitica debe trabajar con:

- Eventos tecnicos.
- Conteos agregados.
- Abandono por capitulo.
- Duraciones agregadas.
- Version de cuestionario.

Debe evitar:

- Texto de respuestas.
- Tags de zonas asociados a email.
- Audio o imagen.
- Perfilamiento no informado.
- Envio automatico a terceros sin revision.

## 10.8 Foto y audio

En el lanzamiento inicial se recomienda conservar el modo simulado. Si se activa captura real:

- Definir finalidad.
- Informar proveedor.
- Obtener consentimiento especifico.
- Definir si hay biometria.
- Procesar localmente si es posible.
- Descartar originales si no son necesarios.
- Definir retencion.
- Aplicar evaluacion de impacto cuando corresponda.

---

## 11. Variable faltante D: gobernanza de datos y Ley 21.719

Documento relacionado: `07-gobernanza-datos-y-ley-21719-gozadoras-club.md`.

## 11.1 Referencia normativa

Fuente consultada:

- [Ley N° 21.719 en la Biblioteca del Congreso Nacional](https://www.bcn.cl/leychile/navegar?idNorma=1209272)

La ficha consultada indica:

- Promulgacion: 25 de noviembre de 2024.
- Publicacion: 13 de diciembre de 2024.
- Vigencia diferida indicada: 1 de diciembre de 2026.
- Modificacion indicada en la ficha: Ley 21.806, 5 de febrero de 2026.

La fecha y reglamentos deben verificarse nuevamente antes del lanzamiento. Este documento no reemplaza asesoria legal.

## 11.2 Clasificacion legal inicial

La arquitectura debe asumir que las respuestas pueden ser datos personales sensibles por referirse a cuerpo, vida sexual, orientacion, identidad de genero, salud o biometria.

La clasificacion final debe ser realizada por asesor legal con el cuestionario definitivo y las operaciones reales de tratamiento.

## 11.3 Responsables

Definir formalmente:

```text
Responsable de datos
├── responsable legal del producto
├── delegado o punto de privacidad
├── equipo de tecnologia
├── equipo de seguridad
├── soporte de titulares
└── encargados contractuales
```

## 11.4 Registro de tratamientos

Cada tratamiento debe documentar:

- Finalidad.
- Datos.
- Titulares.
- Base de licitud.
- Destinatarios.
- Encargados.
- Transferencias.
- Conservacion.
- Riesgos.
- Medidas de seguridad.
- Derechos aplicables.

## 11.5 Principios traducidos a arquitectura

| Principio | Implementacion |
|---|---|
| Licitud y lealtad | evidencia de base juridica y consentimiento |
| Finalidad | purpose ID en cada tratamiento |
| Proporcionalidad | campos minimos y opcion anonima |
| Calidad | correccion y actualizacion de contacto |
| Responsabilidad | registros, politicas y controles |
| Seguridad | cifrado, RBAC, backups y monitoreo |
| Transparencia | politica clara, versionada y accesible |
| Confidencialidad | contratos, controles y secreto |

## 11.6 Consentimiento

El sistema debe registrar:

```text
ConsentLedger
├── subjectId
├── purposeId
├── policyVersion
├── textHash
├── affirmativeAction
├── timestamp
├── channel
├── ipOrEvidence, si es proporcional y autorizado
├── revokedAt
└── source
```

El diseño debe permitir demostrar que el consentimiento fue previo, informado, especifico e inequivoco; para datos sensibles debe operar con el estandar expreso que corresponda.

## 11.7 Derechos de los titulares

El producto debe permitir gestionar:

- Acceso.
- Rectificacion.
- Supresion.
- Oposicion.
- Bloqueo temporal.
- Portabilidad.
- Retiro del consentimiento.

Arquitectura:

```text
Privacy Center
├── nueva solicitud
├── verificacion de identidad
├── seguimiento
├── exportacion
├── rectificacion
├── eliminacion
├── oposicion
├── bloqueo
└── retiro de consentimiento
```

## 11.8 Retencion

Definir por categoria:

- Sesiones abandonadas.
- Respuestas completadas.
- Cuenta.
- Contacto.
- Consentimientos.
- Archivos multimedia.
- Logs.
- Backups.

La retencion debe ser necesaria, documentada y automatizada. Al vencer el plazo, eliminar o anonimizar segun corresponda.

## 11.9 Seguridad desde el diseno

- Separar identidad y respuestas.
- Cifrar valores sensibles.
- Pseudonimizar IDs.
- Aplicar minimo privilegio.
- Proteger administradores con MFA.
- Evitar respuestas en logs.
- Controlar subencargados.
- Monitorear accesos.
- Ensayar restauracion.
- Probar eliminacion.
- Revisar permisos periodicamente.

## 11.10 Incidentes

El plan debe cubrir:

1. Deteccion.
2. Contencion.
3. Clasificacion.
4. Evaluacion de riesgo.
5. Registro.
6. Comunicacion a autoridad cuando corresponda.
7. Comunicacion a titulares cuando corresponda.
8. Remediacion.
9. Prevencion de recurrencia.

## 11.11 Transferencias internacionales

Antes de usar nube, correo, SMS, analitica o almacenamiento externo:

- Identificar paises.
- Identificar proveedores y subencargados.
- Evaluar nivel de proteccion.
- Incorporar garantias contractuales.
- Informar al titular.
- Documentar finalidad y categorias.
- Controlar eliminacion y retorno.

## 11.12 Evaluacion de impacto

Debe evaluarse si el tratamiento puede producir alto riesgo. En este caso es especialmente prudente analizar:

- Tratamiento de datos potencialmente sensibles.
- Almacenamiento masivo.
- Perfilamiento.
- Analisis automatizado.
- Capturas de voz, rostro o imagen.
- Vinculacion de contacto con intimidad.

## 11.13 Programa de cumplimiento

Componentes:

- Responsable y delegado.
- Inventario.
- Politicas.
- Matriz de riesgos.
- Capacitacion.
- Gestion de solicitudes.
- Gestion de incidentes.
- Control de proveedores.
- Auditoria.
- Reportes.
- Medidas disciplinarias.

---

# Parte III. Arquitectura objetivo consolidada

## 12. Diagrama de alto nivel

```text
                         Internet
                            │
                            ▼
                  ┌──────────────────┐
                  │ Landing publica  │
                  └────────┬─────────┘
                           │
                           ▼
                  ┌──────────────────┐
                  │ Frontend app     │
                  │ cuestionario     │
                  └────────┬─────────┘
                           │ HTTPS
                           ▼
                  ┌──────────────────┐
                  │ API Gateway      │
                  └────────┬─────────┘
                           │
        ┌──────────────────┼──────────────────┐
        ▼                  ▼                  ▼
  Auth/Identity       Questionnaire       Privacy
        │              sessions/answers      rights
        │                  │                  │
        ▼                  ▼                  ▼
  DB identidad       DB respuestas       Ledger/legal
                           │
                           ▼
                    Analytics agregada
```

## 13. Separacion de datos

```text
Zona A: identidad
- nombre
- apellido
- correo
- telefono

Zona B: respuestas sensibles
- respuestas del cuestionario
- zonas corporales
- preferencias
- texto libre

Zona C: gobierno
- consentimientos
- solicitudes de derechos
- auditoria
- retencion

Zona D: operaciones
- metricas agregadas
- errores tecnicos
- alertas
```

La union entre zonas debe requerir autorizacion y quedar auditada.

## 14. Estados de la experiencia objetivo

```text
not_started
  ▼
consent_pending
  ▼
anonymous_active
  ▼
completed_anonymous
  │
  └── save_requested
          ▼
      contact_pending
          ▼
      contact_verified
          ▼
      linked_to_user
          ▼
      completed_saved
          ▼
      retained / anonymized / deleted
```

## 15. Matriz de brechas

| Area | Estado actual | Estado objetivo |
|---|---|---|
| Presentacion | HTML/CSS/SVG embebido | frontend modular versionado |
| Datos | arrays JS | catalogo versionado y IDs estables |
| Estado | memoria `S` | store persistente controlado |
| Navegacion | router DOM | rutas y estados de aplicacion |
| Backend | inexistente | API versionada |
| Persistencia | inexistente | bases separadas y cifradas |
| Usuario | inexistente | identidad opcional y verificada |
| Contacto | inexistente | modelo separado y gobernado |
| Consentimiento | visual | ledger versionado |
| Privacidad | hoja visual | Privacy Center operativo |
| Analitica | no definida | agregada y minimizada |
| Multimedia | simulada | local-only o servicio aprobado |
| Seguridad | navegador | controles end-to-end |
| Operacion | servidor local | CI/CD, monitoreo y backups |
| Cumplimiento | documental | procesos, evidencia y auditoria |

## 16. Orden recomendado de implementacion

```text
1. Aprobar producto, publico y finalidades
2. Clasificar datos y riesgos
3. Versionar preguntas y contratos
4. Separar frontend en modulos
5. Implementar sesion anonima
6. Implementar API de respuestas
7. Implementar cuenta y contacto opcionales
8. Implementar consentimiento versionado
9. Implementar Privacy Center
10. Implementar seguridad y observabilidad
11. Completar evaluacion de impacto
12. Probar eliminacion, exportacion e incidentes
13. Publicar landing y aplicacion
```

## 17. Criterios de calidad competitiva

### Experiencia

- Tiempo de carga bajo.
- Flujo tactil estable.
- Recuperacion ante error.
- Navegacion clara.
- Accesibilidad de teclado y lector.
- Mensajes no ambiguos.

### Producto

- Diferenciacion visual.
- Propiedad narrativa consistente.
- Resultado comprensible.
- Transparencia de limites.
- Modo anonimo.
- Valor claro para registro.

### Ingenieria

- Contratos API versionados.
- Pruebas automatizadas.
- Separacion de ambientes.
- Observabilidad.
- Backups.
- Recuperacion.
- Seguridad continua.

### Privacidad

- Minimizar datos.
- Separar finalidades.
- Consentimiento demostrable.
- Derechos ejercibles.
- Retencion automatizada.
- Proveedores gobernados.
- Tratamiento de sensibles con controles reforzados.

---

## 18. Entregables tecnicos requeridos

### Frontend

- Aplicacion modular.
- Catalogo de preguntas.
- Componentes de renderizado.
- Store de sesion.
- Cliente API.
- Centro de privacidad.
- Pruebas E2E.

### Backend

- API OpenAPI.
- Servicios de sesiones y respuestas.
- Autenticacion.
- Migraciones.
- Validadores.
- Autorizacion.
- Pruebas.

### Datos

- Esquema de identidad.
- Esquema de respuestas.
- Esquema de consentimiento.
- Tabla de retencion.
- Cifrado y llaves.
- Procedimientos de exportacion y borrado.

### Gobernanza

- Registro de tratamientos.
- Politica de privacidad.
- Matriz de consentimientos.
- Evaluacion de impacto.
- Contratos con encargados.
- Plan de incidentes.
- Procedimiento de derechos.
- Capacitacion.

---

## 19. Conclusion

La maqueta actual tiene una base visual y funcional solida: es un cuestionario narrativo, data-driven y responsive, con 8 capitulos, 40 preguntas, mapa corporal, renderizadores dinamicos, resumen y ambientacion sonora. Su principal limite no es la interfaz, sino la ausencia de una arquitectura de producto y datos para operar en produccion.

La transformacion competitiva requiere mantener el frontend expresivo y agregar una arquitectura por capas:

```text
Experiencia visual
  + dominio versionado
  + API segura
  + persistencia separada
  + consentimiento demostrable
  + derechos de titulares
  + seguridad operativa
  + gobernanza de datos
```

La recomendacion de mayor calidad es lanzar primero una experiencia anonima y de bajo riesgo, pedir datos de contacto solo cuando la persona solicite guardar o recuperar su mapa, mantener foto/audio en modo simulado hasta completar una evaluacion de impacto y preparar el sistema para la vigencia indicada de la Ley N° 21.719 el 1 de diciembre de 2026.

La revision legal chilena debe ocurrir antes de la puesta en produccion, especialmente por la posible presencia de datos sensibles relativos a sexualidad, cuerpo, salud, orientacion, identidad y biometria.
