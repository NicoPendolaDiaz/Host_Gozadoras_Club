# Changelog - Gozadoras Club

## [V1.0.0-Freeze] - 2026-10-01
### Added
- **Arquitectura Desacoplada**: Creación e integración de `engine.js` (motor de renderizado dinámico) y `data.js` (base de datos canónica de preguntas).
- **Componente *Density Scale* (P19 - Clima)**: Integración de una interfaz visual paramétrica que renderiza 5 densidades espaciales (20% al 80%) de forma estática y simultánea, sin afectar opacidades ni colores, cumpliendo con la solicitud técnica de interacción fluida.

Sistema de Excepciones: Implementación de lógica modular en engine.js para procesar excepciones sin caída del sistema (ej. renderizado seguro en ausencia de rutas válidas).
Control de Privacidad Funcional: Activación del panel modal de seguridad (Acuerdos y Código Biométrico) para interactividad táctil (Toggle switches en estado ON/OFF).
Changed
Lógica de Contexto (CTX00): Modificación de data.js para asegurar un flujo no restrictivo. Se eliminó el cierre abrupto (END_NO_ELIGIBLE) permitiendo que la usuaria avance libremente independientemente de su estado civil.
Auto-Guardado (Suspendido para Pruebas): Ajuste en la función startApp() para que, temporalmente y para facilitar la labor de QA, el cuestionario inicie siempre desde s-splash (pantalla de bienvenida) independientemente del localStorage.
Renderizado de Bloques de Información (s-info): Reestructuración total del CSS y contenedores flexibles en index.html para s-info y s-landscape, solucionando problemas de desbordamiento (overflow) y aplastamiento de texto, asegurando la accesibilidad del botón "Continuar".
Fixed
Visualización en Pantallas Textuales: Corrección crítica de flexbox en .hdr que rompía la maqueta en pantallas de introducción.
**Ciclo de Navegación: Se enlazó correctamente el objeto global window.startChapter para asegurar la transición de la pantalla de Acuerdos a las preguntas de fondo.


---

### 2. Reemplaza el contenido de `ARCHITECTURE.md`
Este archivo explica el funcionamiento bajo el capó de lo que diseñamos hoy, pensando en el backend propuesto.

```markdown
# Architecture Overview - Gozadoras Club

## Arquitectura V1.0 (Frontend Desacoplado)
El proyecto ha transicionado de una maqueta de HTML rígido a una Single Page Application (SPA) dinámica sin dependencias de frameworks externos (Vanilla JS puro), garantizando velocidad extrema y portabilidad.

### 1. Capa de Datos (`data.js`)
Actúa como un catálogo inmutable que expone la constante `QUESTIONS`. 
- Separa el contenido de la lógica de interfaz.
- Estructura agnóstica basada en JSON.
- Permite modificaciones por perfiles no técnicos (gestores de contenido) sin arriesgar la funcionalidad.

### 2. Motor de Visualización (`engine.js`)
Lógica central que lee `data.js` e inyecta dinámicamente HTML en el DOM.
- **Tipos de Renderizado Dinámico**: `single`, `multiple`, `carousel`, `landscape` y la recientemente añadida `density_scale`.
- **Manejo de Estado**: Implementa una variable en memoria temporal (`ans` y `historyArr`) que recolecta el estado del cuestionario en tiempo real.
- **Microinteracciones**: Control centralizado de clases CSS (`.on`, `fade`) para mantener la respuesta táctil sin código repetitivo.

### 3. Propuesta de Arquitectura Cloud (Escala Futura)
Para mantener la autonomía de GOZADORAS sobre los datos recolectados, la arquitectura propuesta es una topología Serverless basada en AWS:

Alojamiento del Frontend: Amazon S3 + CloudFront CDN (Garantiza entrega estática de ultra baja latencia a nivel global).
Recolección (API): AWS API Gateway para recibir el JSON Configuration Object generado en la pantalla COMPLETE.
Motor Lógico en la Nube: AWS Lambda. Funciones sin estado que procesarán la matriz matemática de las respuestas para calcular el perfil final de la usuaria.
Persistencia Segura: Amazon DynamoDB, con encriptación nativa en reposo mediante AWS KMS, asegurando que solo el cliente (GOZADORAS) controle el acceso a la base de datos íntima.