# Gozadoras Club - MVP Mapa de la Vida Erótica (v1.0 FREEZE)

Este repositorio contiene el Producto Mínimo Viable (MVP) avanzado del **Mapa de la Vida Erótica** para Gozadoras Club, alineado a las especificaciones metodológicas y de interfaz v1.0 (FREEZE).

## Descripción del Proyecto

Aplicación web interactiva (Single-Page Application) sin backend que implementa un sofisticado motor metodológico de 40 preguntas adaptativas, diseñado para guiar a las usuarias a través de su vida erótica, autoconocimiento y límites.

## Hitos Técnicos e Innovaciones UI (v1.0)
- **Máquina de Estados de Alta Complejidad:** Soporta saltos lógicos condicionales (Gate), variables de contexto (CTX) y persistencia en `localStorage` para recuperación de sesiones interrumpidas.
- **Componentes Visuales Paramétricos:**
  - *Mapa Corporal Interactivo (SVG):* Silueta con 9 zonas canónicas clickeables.
  - *Atmósfera de Densidad (P19):* Renderizado dinámico de 5 niveles de opacidad visual dependiente del estado del gradiente.
  - *Par Comparativo Espacial:* Elementos visuales que varían su distancia (gap) según el nivel de cercanía afectiva y erótica elegida.
  - *Vistas Paginadas:* Soporte para agrupar opciones de una misma pregunta en múltiples pantallas (views) manteniendo el estado global.
- **Privacidad y Accesibilidad Estricta:** Las opciones de "Omitir" y "Prefiero no responder" están mapeadas directamente al motor, asegurando confidencialidad. Los componentes táctiles respetan la regla de 44x44px de accesibilidad CSS.

## Estructura
- `index.html`: Core de la aplicación, empaquetando HTML, CSS y la lógica SPA.
- `ARCHITECTURE.md`: Definición técnica del motor y patrones UI.
- `CHANGELOG.md`: Histórico del proyecto y roadmap.
