# Architecture Overview - Gozadoras Club

## Arquitectura V1.0 (Frontend Desacoplado)
El proyecto ha transicionado de una maqueta de HTML estático y rígido a una Single Page Application (SPA) dinámica sin dependencias de frameworks externos (Vanilla JS puro). Esto garantiza una velocidad extrema de carga, compatibilidad universal y máxima portabilidad.

1. Capa de Datos (data.js)

Actúa como un catálogo inmutable y base de datos local que expone la constante QUESTIONS.

Desacoplamiento total: Separa el contenido duro (textos, preguntas, rutas) de la lógica de interfaz visual.
Estructura agnóstica: Basada enteramente en la notación JSON.
Mantenibilidad escalable: Permite modificaciones por parte de perfiles no técnicos (gestores de contenido o PMs) sin arriesgar la funcionalidad visual del sistema.
2. Motor de Visualización (engine.js)

Es el corazón operativo del proyecto. Consiste en la lógica central que lee el archivo data.js e inyecta dinámicamente el HTML estructurado dentro del DOM (index.html).

Tipos de Renderizado Dinámico: Gestiona múltiples componentes visuales como single, multiple, carousel, landscape y la recientemente añadida density_scale (para representaciones paramétricas del Clima).
Manejo de Estado e Historial: Implementa una variable en memoria temporal (ans y historyArr) que recolecta las respuestas y el progreso del usuario en tiempo real, permitiendo navegar hacia atrás de forma segura.
Microinteracciones y UI: Control centralizado de clases CSS (.on, fade) e inyecciones de código en línea, manteniendo la respuesta táctil fluida y sofisticada sin saturar los archivos de hojas de estilo.
3. Propuesta de Arquitectura Cloud (Fase 2 / Escalabilidad)

Para mantener la autonomía, la seguridad absoluta de la información y la soberanía de GOZADORAS sobre los datos íntimos recolectados, la arquitectura propuesta para el ecosistema completo es una topología Serverless basada en AWS (Amazon Web Services):

Alojamiento del Frontend: Amazon S3 + CloudFront CDN. Garantiza la entrega de la aplicación estática (HTML/JS/CSS) con latencia ultra baja a nivel global y alta disponibilidad.
Recolección de Datos (API): Amazon API Gateway. Actuará como la puerta de entrada segura (HTTPS/TLS) para recibir el objeto JSON Configuration Object generado en la pantalla COMPLETE.
Motor Lógico Matemático: AWS Lambda. Funciones sin estado que procesarán la matriz matemática de las respuestas para calcular el perfil final de la usuaria, ejecutándose solo cuando sea necesario, lo que optimiza costos.
Persistencia Segura: Amazon DynamoDB. Una base de datos NoSQL ideal para almacenar JSONs flexibles. Todo estará asegurado con encriptación nativa en reposo mediante AWS KMS (Key Management Service), asegurando que el cliente (GOZADORAS) tenga control exclusivo y total sobre el cifrado de datos.