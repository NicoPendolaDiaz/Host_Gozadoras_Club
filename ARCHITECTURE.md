# Arquitectura Técnica v1.0 (FREEZE)

## 1. Patrones de Navegación y Sesión
- **Persistencia:** La sesión (`IN_PROGRESS`) se guarda en `localStorage.getItem('gozadoras_session')`. Si la usuaria refresca, la máquina de estados retoma la última vista de la última pregunta registrada.
- **Transiciones de Paisaje:** Las pantallas de transición (MIRADOR, MANANTIAL, SENDERO, CLIMA, HORIZONTE) se inyectan en el historial antes de las preguntas P01, P06, P13, P19 y P22.
- **Filtro CTX (Contexto):** Antes de iniciar la batería, las preguntas `CTX00` a `CTX05` filtran la elegibilidad (ej. estar en pareja) sin mezclarse con la numeración canónica `Pxx`.

## 2. Tipos de Controles (Componentes Reactivos Vanilla)
El motor de renderizado despacha el HTML basado en el `type` de la pregunta:
- `carousel`: Tarjetas deslizables de a una por vez (usado en P01).
- `gradient_spatial`: Gradiente de 5 puntos (usado en P02, P21, P26, P27, P30).
- `timeline_gradient`: SVG de tiempo y gradiente (usado en P08, P09).
- `body_map`: Componente SVG interactivo de 9 zonas (P11).
- `distance_pair`: Puntos que se separan dinámicamente (P13, P14).
- `density_field`: Fondo que altera su `opacity` o `stroke-density` en CSS según el gradiente elegido (P19).
- `views`: Arreglo de sub-pantallas para preguntas múltiples extensas (P03, P07, P20, P22, P24).

## 3. Resolución de Estados (Gate y Complete)
El array `historyArr` gestiona la ruta exacta. El motor avanza evaluando la regla `next(answers)` definida en el JSON de cada pregunta. Al llegar al nodo final, el estado pasa a `COMPLETE` y bloquea la edición de `localStorage`.
