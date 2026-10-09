# GOZADORAS CLUB — Motor de cartografía, entrega R4

8 de octubre de 2026. Compatible con las 40 preguntas de la guía de experiencia V4 incluida. Requiere Python 3.10 o posterior; sin dependencias externas ni claves de API.

## 1. Comprobar y ejecutar

Extraer el ZIP completo. En la carpeta principal:

```bash
python3 verificar_paquete.py
python3 verificar_compatibilidad.py
python3 verificar_estres.py
python3 ejecutar.py ejemplo_entrada.json
```

En Windows usar `py -3` en lugar de `python3`. Las verificaciones deben terminar en `PACKAGE_CHECKS_PASS`, `V4_INPUT_COMPATIBILITY_PASS` y `ADVERSARIAL_STRESS_PASS`. La prueba de estrés tarda aproximadamente dos minutos en el equipo utilizado; la duración puede variar.

El ejecutor también recibe JSON por stdin y puede llamarse desde otra carpeta mediante rutas completas. Escribe el resultado en stdout; los errores van a stderr, sin textos íntimos ni traceback. No guarda respuestas ni despliega un servicio web.

| Código | Significado |
| --- | --- |
| 0 | Entrada válida y completa; composición generada para revisión editorial. |
| 2 | Entrada inválida, incompleta o incompatible. No genera configuración. |
| 3 | Fallo del motor, integridad del paquete o escritura de salida. |

## 2. Conectar las respuestas

Usar `contrato_instrumento_v4.json` y los tres ejemplos de entrada. Copiar sus constantes vigentes de esquema, composición y huella. La aplicación debe enviar exactamente P01–P40 y P03_MICRO: 41 registros para 40 preguntas y el detalle interno de medicamentos.

Cada registro lleva `option_ids`, `zone_ids`, `state_code` y `text`. Los campos de texto tienen listas vacías; la opción que los abre permanece en su pregunta de origen. Solo P03_MICRO admite opciones junto con el nombre opcional de «Otro medicamento».

| Estado | Uso |
| --- | --- |
| `answered` | Respuesta concreta, «Depende», «No he tenido últimamente», «No sé todavía» o texto no vacío. |
| `dont_know` | «No sé». |
| `not_clear` | «No lo tengo claro». |
| `prefer_not_to_answer` | «Prefiero no responder». |
| `omitted` | Pregunta activa cuya omisión está permitida; sin contenido. |
| `not_shown` | Condición de apertura no cumplida; sin contenido. |

`omitted` y `not_shown` usan listas vacías y `text: null`. Las preguntas sin campo de texto también usan `text: null`; no enviar una cadena vacía. Un texto no vacío conserva literalmente sus espacios, saltos, acentos y signos. No recortar, interpretar ni convertir a entidades HTML al almacenar. El frontend debe mostrarlo como texto, sin ejecutarlo como HTML.

P08_O06, P10_O08 y P15_O07 mantienen la etiqueta breve «No he tenido últimamente». La ausencia no equivale a «Nunca» ni demuestra falta de deseo. P24_O17 conserva `answered` y su incertidumbre de significado. P03_MICRO es necesario cuando se elige P03_O04; las familias farmacológicas se conservan como contexto y no generan causas ni puntuaciones.

La identidad de sesión, la versión de instrumento y, si se incluye, `snapshot.rules_version`, se comprueban tanto en la CLI como en `composer.compose_session`. Para incrustar el motor en Python, usar `process_request` después de `load_engine`, que también comprueba la integridad de los archivos. No sustituir la entrada de integración por `compile_object` o `compose`, que son etapas internas.

## 3. Navegación e interfaz

La guía Word V4 gobierna las 40 pantallas y se conserva íntegra. Las preguntas con grupos múltiples mantienen una sola página vertical y un máximo global; no volver a dividirlas en subpantallas.

Al editar una respuesta, limpiar las ramas cerradas antes de evaluar sus descendientes. Un dato residual en un padre oculto no abre otro hijo y se rechaza al finalizar. P18 y P32 conservan sus vías alternativas de apertura. P28 y P29 deben completarse si pasan de opcionales a necesarias; una omisión anterior no basta.

Al quitar «Medicamento», limpiar P03_MICRO. Al quitar «Otro medicamento», limpiar su texto y conservar las demás familias. «No sé» y «Prefiero no responder» son excluyentes entre sí y con las familias. Las selecciones de privacidad o incertidumbre no prueban seguridad ni riesgo confirmado.

Una aplicación COMPLETE es de solo lectura en la aplicación; una reaplicación crea otra sesión. El motor valida un snapshot, pero el servidor debe implementar esa gestión y su almacenamiento. El Sheet de resultados se gestiona por separado y no forma parte de este ZIP.

## 4. Límites de transporte

El ejecutor admite solicitudes JSON UTF-8 de hasta 8 MiB y un anidamiento de hasta 64 niveles. Son límites técnicos de la solicitud completa, no límites nuevos por pregunta. Si se superan, rechaza la solicitud entera; nunca corta el texto para hacerla pasar. Un rechazo técnico debe resolverse en la integración y no registrarse como omisión de la mujer.

Se rechazan claves JSON duplicadas, números no finitos, Unicode inválido y registros malformados. Un daño o cambio en los archivos de ejecución, catálogo, contrato o guía bloquea la carga; no desactivar ese control para conectar versiones distintas.

## 5. Resultado y estado

La salida devuelve `output.configuration_name`, `output.summary`, sus evidencias y auditoría, además de todos los `response_records` sin modificación. Un COMPLETE indica que las respuestas pasaron el contrato de entrada; no acredita aprobación editorial ni la implementación de la web.

Los estados de composición son `DRAFT_EDITORIAL_REVIEW`, `EXTENDED_DRAFT_EDITORIAL_REVIEW` y `RECOMPOSITION_REQUIRED`. Este último señala un problema de composición; no pedir a la mujer más respuestas para compensarlo.

Esta entrega pasa la auditoría técnica de estrés especificada en `AUDITORIA_ESTRES.md`. `production_delivery` y `output.delivery_eligible` permanecen en false. La cartografía V16, el ajuste editorial B1 y los Destinos no se incorporan mediante esta revisión técnica.

## 6. Archivos

| Archivo | Uso |
| --- | --- |
| `motor/` | Un compositor vigente, validador y catálogos actuales. |
| `ejecutar.py` | Entrada de integración, versiones, integridad y errores controlados. |
| `contrato_instrumento_v4.json` | Preguntas, alternativas, estados y versiones de entrada. |
| Guía Word V4 | Experiencia de cada una de las 40 preguntas. |
| `ejemplo_*.json` | Tres entradas sintéticas y una salida reproducible. |
| `pruebas_regresion.json` | 15 composiciones de referencia; no se usan para decidir la salida real. |
| `verificar_*.py` | Pruebas reproducibles de paquete, compatibilidad y estrés. |
| `AUDITORIA_ESTRES.md`, `verificacion_r4.json` | Hallazgos corregidos, pruebas ejecutadas y alcance. |
| `compatibilidad_instrumento.json`, `manifest.json` | Inventario, compatibilidad y huellas. |

## 7. Instrucción para la IA de implementación

Implementa las 40 fichas V4 y conecta el contrato R4 completo. Conserva los IDs, estados y textos. No traduzcas la ausencia a Nunca, la privacidad a omisión ni P24_O17 a dont_know. Envía el detalle de medicamentos, recalcula dependencias en orden y exige las respuestas necesarias. Ejecuta las tres verificaciones antes de conectar respuestas reales. Guarda las aplicaciones y sus versiones en el sistema de resultados. La aprobación editorial y la prueba de la interfaz desplegada se comprueban por separado.
