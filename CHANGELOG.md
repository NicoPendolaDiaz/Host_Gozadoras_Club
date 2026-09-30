# Registro de Variaciones y Procesos (Changelog)

Este documento recopila las iteraciones, errores críticos corregidos y variaciones ejecutadas en la maqueta original para alcanzar el MVP funcional requerido por la líder del proyecto.

## [1.1.0] - Estabilización Definitiva del Motor Lógico
### Añadido
- **Nueva Arquitectura de Lógica de Saltos:** Se integró un motor SPA robusto con 39 preguntas oficiales, derivadas del documento `"Instrumento_Mapa_Vida_Erotica_PRELIMINAR"`.
- **Botones Dinámicos de Flujo:** Reemplazo de la barra estática de navegación (`nav-bar` / `ftr`) por un inyector dinámico que evalúa en tiempo real si el botón debe decir "Siguiente" o "Omitir", y valida las opciones mutuamente excluyentes (`ex: true`).
- **Historial de Navegación (`historyArr`):** Implementación de una pila lógica para que el botón "Volver" funcione incluso con los saltos condicionales complejos.

### Eliminado (Requerimientos de Negocio)
- **Eliminación Total de "Captura de Fotografías":** Purgado de textos, APIs y lógicas asociadas a permisos de cámara.
- **Eliminación Total de Grabación/Sonido Ambiental:** Purgado del botón `<button id="ambbtn">` y todo su bloque lógico de `AudioContext` en JavaScript, previniendo malentendidos sobre monitoreo o escucha.

### Corregido (Debug)
- **Error del Contenedor Fantasma (Pantalla en Blanco):** En una iteración intermedia, la aplicación colapsaba en la "Página 3" porque el motor de renderizado estaba apuntando a un identificador CSS de contenedor (`#opts`) que no existía en el diseño visual original, en su lugar se reconstruyó el apuntador al ID real (`#qbody` y `#bubble`). Esto solucionó la parálisis total de la interacción.
- **Conflictos CSS (Elementos Invisibles):** Se limpiaron inyecciones experimentales previas que alteraban el flujo con `opacity: 0` y forzaban animaciones `@keyframes`, devolviendo a la plataforma su fluidez visual nativa e inmediata.
- **Textos de Consentimiento:** Se consolidó una sola versión final de los acuerdos de privacidad dejando sumamente explícito que el análisis es anónimo y textual.

## [1.0.0] - Maqueta Base (Diseño Visual Front-End)
- Creación de interfaz gráfica con estética "Gozadoras Club".
- Paleta de colores cálida/selvática, logotipo SVG animado.
- Pestaña inferior deslizable ("Privacidad").
- Modos "Splash", "Consentimiento", "Preguntas" y "Resumen".
- Arquitectura de componentes puramente visual sin la matriz matemática conectada.
