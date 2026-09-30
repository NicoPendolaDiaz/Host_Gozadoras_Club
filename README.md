# Gozadoras Club - MVP Mapa de la Vida Erótica

Este repositorio contiene la maqueta funcional y el MVP (Producto Mínimo Viable) del **Mapa de la Vida Erótica** para Gozadoras Club. 

## Descripción del Proyecto

El proyecto consiste en una aplicación web interactiva (Single-Page Application) diseñada para guiar a las usuarias a través de una batería de 39 preguntas cuidadosamente estructuradas, con el fin de explorar su vida erótica, autoconocimiento y límites, para finalmente entregar una de las 5 posibles rutas o "destinos" de exploración.

Todo el desarrollo de la interfaz de usuario y la lógica de ramificación (saltos lógicos) se ha empaquetado en una arquitectura sin dependencias externas (Vanilla JavaScript, HTML5 y CSS3), garantizando máxima privacidad, fluidez y facilidad de despliegue.

## Características Principales

- **Privacidad desde el Diseño:** No hay conexión a bases de datos ni backend. Toda la evaluación se ejecuta localmente en el dispositivo del usuario. No se solicitan fotografías corporales ni acceso a micrófonos.
- **Flujo Dinámico SPA:** Transiciones suaves entre pantallas (`s-splash`, `s-consent`, `s-q`, `s-sum`) sin recargar la página.
- **Motor de Preguntas Complejo:** Soporta múltiples tipos de inputs:
  - `single`: Selección única.
  - `multiple`: Selección múltiple con límites máximos (`max`) y opciones mutuamente excluyentes (`ex`).
  - `gradient`: Escalas de valoración.
  - `text`: Campos de texto libre.
- **Lógica de Saltos:** Ramificación de preguntas en tiempo real basada en las respuestas anteriores (por ejemplo, si responde "Otro", se despliega una pregunta de texto específica antes de continuar el flujo).
- **Algoritmo de Destinos:** Al finalizar la batería, se procesan las respuestas y se asignan destinos narrativos (Reconexión Corporal, Exploración Sensorial, Diálogo y Límites, Autocuidado Radical, Transición Consciente).

## Estructura del Repositorio

- `gozadoras-club.html`: El archivo central que contiene toda la estructura visual, estilos (CSS) y lógica del motor (JS). 
- `docs/`: (Opcional) Documentos de arquitectura y especificaciones del cliente.
- `README.md`: Este archivo.
- `ARCHITECTURE.md`: Documentación técnica detallada del motor en JavaScript.
- `CHANGELOG.md`: Registro de las iteraciones, errores corregidos y versiones.

## Despliegue (Deployment)

Dado que la aplicación es 100% estática del lado del cliente, puede ser desplegada en cualquier servidor web estándar o servicios como:
- **GitHub Pages** (Ver flujo en `.github/workflows`)
- **Vercel**
- **Netlify**
- **AWS S3 / CloudFront**

Para ejecutar localmente, simplemente haz doble clic en `gozadoras-club.html` o levanta un servidor local:
```bash
python -m http.server 8000
```
Y visita `http://localhost:8000/gozadoras-club.html`.
