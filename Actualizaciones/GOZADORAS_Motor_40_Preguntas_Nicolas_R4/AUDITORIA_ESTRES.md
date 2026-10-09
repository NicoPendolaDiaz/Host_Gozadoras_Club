# Auditoría adversarial de estrés — Motor R4

## 1. Veredicto

PASS TÉCNICO en el alcance probado. El motor acepta el contrato de las 40 preguntas V4 y conserva la guía Word sin cambios. Se corrigieron los fallos reproducidos antes de preparar esta entrega. La aprobación de los títulos y descripciones y la entrega a participantes siguen pendientes: no se activó la devolución automática.

## 2. Fallos corregidos

| N.º | Fallo observado | Corrección comprobada |
| --- | --- | --- |
| 01 | Una llamada directa a `compose_session` aceptaba una identidad de sesión distinta dentro del snapshot. También podía eludir validaciones de versión que sí aplicaba el ejecutor. | CLI y API comparten la validación de solicitud, identidad, contexto, instrumento, reglas y registros. Una entrada incompatible no genera configuración. |
| 02 | Preguntas sin campo de texto aceptaban `text: ""`. | Exigen `text: null`. Los campos de texto reales conservan sus palabras; los estados sin respuesta no admiten contenido. |
| 03 | Unicode inválido en un texto producía un traceback al imprimir la salida. | Se valida antes de componer y se devuelve un error controlado. El Unicode válido, los acentos, espacios, saltos y signos se conservan literalmente. |
| 04 | Un número no finito en metadatos podía pasar el contrato. No había un límite explícito para el tamaño o anidamiento de la solicitud. | Validación del dominio JSON también en la API; rechazo de claves duplicadas, números no finitos, estructuras demasiado profundas y solicitudes demasiado grandes. Nunca se recorta un texto para aceptarlo. |
| 05 | La función de apertura podía activar un descendiente a partir de una respuesta residual en un padre oculto. El validador general ya rechazaba ese snapshot, pero el cálculo de ramas era incorrecto por separado. | Evaluación topológica desde padres activos. Se rechaza el dato residual y se mantienen las vías alternativas válidas de P18 y P32. |
| 06 | Los argumentos inválidos de la CLI se reflejaban en el mensaje predeterminado de argparse. | Error JSON con código fijo, sin repetir los argumentos recibidos. |

Además, se comprueba la integridad antes de importar el motor. Un archivo de ejecución, catálogo, contrato o guía que no coincide con el manifiesto bloquea la carga. Esto detecta daños o mezclas de versiones; el manifiesto no es una firma criptográfica frente a alguien que pueda reemplazar todo el paquete.

Se retiraron el catálogo histórico alternativo y las funciones de prueba que dependían de archivos no entregados. El ZIP contiene una sola versión ejecutable y las pruebas que se pueden correr con ella.

## 3. Cobertura ejecutada

| Prueba | Cantidad | Qué se comprobó |
| --- | ---: | --- |
| Comprobaciones del paquete | 54 | Inventario, huellas, CLI, UTF-8, rutas, versiones, sesión y errores controlados. |
| Compatibilidad de entrada V4 | 272 alternativas | 253 opciones de preguntas, 10 medicamentos y 9 zonas; estados y ejecución. |
| Regresiones de composición | 15 | Se conserva la salida de referencia; solo cambia la constante de versión. |
| Selecciones válidas de P01 | 22 | Todas las selecciones permitidas, incluida cada pareja de frases. |
| Selecciones válidas de P03 | 16.385 | Todos los subconjuntos de cambios y sus alternativas excluyentes. |
| Selecciones válidas de P07 | 470 | Todas las selecciones hasta el máximo y su alternativa excluyente. |
| Selecciones válidas de P12 | 43 | Todas las selecciones hasta el máximo y sus alternativas excluyentes. |
| Selecciones válidas de P20 | 176 | Todas las selecciones hasta el máximo y su alternativa excluyente. |
| Selecciones válidas de P22 | 471 | Todas las selecciones hasta el máximo y sus alternativas excluyentes. |
| Selecciones válidas de P24 | 1.942 | Todas las selecciones hasta el máximo y sus alternativas excluyentes. |
| Selecciones válidas de P33 | 34 | Todos los subconjuntos de restricciones y sus alternativas excluyentes. |
| Selecciones de medicamentos | 257 | Todos los subconjuntos de las ocho familias/otro y los dos estados excluyentes. |
| Selecciones de zonas | 511 | Todos los subconjuntos no vacíos de las nueve zonas. |
| Cruces completos P01 × P02 | 154 | Las 22 selecciones de P01 con las siete alternativas de P02. |
| Cruces con P34 escrito | 7 | P01 «Ninguna» con cada P02 y texto literal en su propio registro. |
| Combinaciones válidas P16–P18 | 109 | Todas las combinaciones de esa rama, contadas una sola vez; se excluyen respuestas de hijos que no se muestran. |
| Cruces del instrumento completo | 3.000 | Muestreo reproducible con semilla 20261008 y los tres contextos de pareja admitidos. |
| Reordenamientos de esos cruces | 3.000 | Invariancia ante el orden de preguntas, opciones y zonas. |

La auditoría de estrés verificó **26.597 composiciones**, contando las reejecuciones por orden. No son 26.597 configuraciones distintas: algunas entradas pueden producir la misma lectura. Se comprobaron conservación de respuestas, evidencia procedente de opciones realmente seleccionadas, exclusión de evidencia privada, estabilidad del resultado, estados y bloqueo de entrega. No se detectaron errores en la auditoría mecánica de composición de ese corpus.

También se probaron registros malformados, estados de privacidad e incertidumbre convertidos incorrectamente, exclusiones y máximos, omisiones necesarias, identidad y versiones, cadenas residuales, vías alternativas, texto literal y entradas que aparentan instrucciones, HTML o SQL. Los números finales de rechazos y verificaciones están en `verificacion_r4.json`. Cada caso inválido de API se rechaza tanto en `process_request` como en `compose_session`.

## 4. Alcance y límites

La enumeración es exhaustiva para las selecciones de cada múltiple y los cruces locales indicados. Cada selección se ejecuta dentro de un contexto de prueba válido; esto no enumera el producto global de las 40 preguntas, todos sus cruces simultáneos ni todos los textos libres posibles.

Las comprobaciones mecánicas no certifican que cada título sea editorialmente distinto, que toda descripción resulte clara para una mujer ni que todas las preguntas aporten a cada párrafo. Los textos libres se conservan como contenido literal y no se interpretan mediante IA para inventar una lectura. Las familias farmacológicas aportan contexto declarado y no se convierten en causas.

No se probó la interfaz desplegada de Nicolás, una base de datos, la importación al Sheet ni la capacidad de un servidor bajo usuarios concurrentes. La prueba es de estrés lógico y de entradas del motor local. La revisión editorial y las pruebas de uso de la interfaz siguen teniendo su propio alcance.

## 5. Reproducir antes de conectar

```bash
python3 verificar_paquete.py
python3 verificar_compatibilidad.py
python3 verificar_estres.py
```

Las tres deben terminar en PASS. Las pruebas usan exclusivamente entradas sintéticas y no escriben respuestas de participantes. Para guardar un nuevo informe de estrés, usar `--report` con una ruta fuera de la carpeta del paquete, sin modificar el inventario entregado.
