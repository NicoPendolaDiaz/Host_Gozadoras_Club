# Host_Gozadoras_Club
Maqueta inicial lista para pruebas

Arquitectura Técnica del Motor SPA (Single-Page Application)

La maqueta actual se diseñó para operar en un entorno cerrado y seguro, procesando la lógica en el cliente para mantener la confidencialidad absoluta de las respuestas de las usuarias.

1. El DOM y las Pantallas (Screens)
2. El Motor de Preguntas (State Machine)
El Motor de Preguntas (State Machine)
Renderizado Dinámico (`renderQuestion`)
En lugar de tener 39 archivos HTML distintos, el motor toma el contenedor principal:
1. `bubble`: Inyecta el texto de la pregunta.
2. `qbody`: Inyecta el bloque de botones de opción (radio/checkboxes) o `textarea` según el `type`.
3. Re-evalúa en tiempo real si el botón `Siguiente` debe estar habilitado comprobando la variable de estado local `answers`.

### Gestión del Estado e Historial
- `answers = {}`: Un diccionario que almacena la respuesta actual ligada a la `id` de la pregunta.
- `historyArr = []`: Una pila (stack) que guarda la ruta exacta que tomó la usuaria. Esto permite que el botón "Volver" retroceda correctamente a la pregunta condicional previa sin romper el flujo, haciendo un `.pop()` del array.

## 3. Seguridad Estructural y Restricciones
Durante las iteraciones de diseño, se tomaron decisiones críticas de arquitectura para cumplir las directrices del negocio:
1. **Eliminación del Módulo de Audio:** Se removió la lógica de `window.AudioContext` y los botones asociados para evitar permisos innecesarios o sensaciones de monitoreo.
2. **Purgado de Funciones de Cámara:** Se eliminaron los nodos de interacción de "fotografías del entorno", transformando las solicitudes a variables basadas en texto o eliminándolas, asegurando la premisa "Toda la interacción es en la plataforma y anónima".
3. **Optimización CSS/DOM:** Se resolvieron conflictos de interpolación y renderización (`opacity: 0` atrapada por animaciones CSS conflictivas) para asegurar compatibilidad universal entre navegadores.

## 4. Algoritmo de Resultados
Alcanzar el nodo mágico `'END'` en la función `next()` dispara la transición a `s-sum`. En la etapa actual del MVP, `renderResults()` inyecta en el DOM las 5 tarjetas de destino narrativo establecidas por el equipo de negocio. A futuro, este bloque podrá conectarse a una matriz matemática que asigne pesos a las claves en `answers{}` para ordenar dinámicamente los destinos.
