# Riesgos sensibles de la propuesta TLL para Gozadoras Club

## Resumen ejecutivo

La propuesta técnica de THE LEGAL LEGION presenta una base sólida en términos de visión de producto, arquitectura conceptual y nivel de cuidado respecto de la privacidad y la experiencia de usuaria. Sin embargo, en su forma actual hay varios puntos sensibles que conviene resolver antes de aceptar la propuesta como entrega de MVP.

Los riesgos más relevantes no están en la idea del producto, sino en la ejecución, la operación real y la gobernanza del dato sensible. La herramienta trabaja con información sexual, relacional, corporal y subjetiva, por lo que la decisión no puede depender solo de la intención ética del equipo, sino también de la evidencia técnica, legal y operativa.

---

## 1) “Gratis” como promesa comercial: no es realmente cero costo

La propuesta comunica que el desarrollo, despliegue, QA y traspaso son “USD 0”. Aun así, la operación real del proyecto implica costos, responsabilidades y mantenimiento.

### Punto sensible
- El documento reconoce que Gozadoras debe asumir la operación en su cuenta AWS.
- La cuenta AWS puede requerir plan de pago en ciertos escenarios.
- Se mencionan también costos asociados a DeepSeek si Munay se activa.
- La infraestructura y la seguridad no son nulas: logs, WAF, MFA, DNS, CloudFront, almacenamiento, backups, IAM, políticas de acceso, alertas, etc.

### Riesgo
- La promesa de “gratis” puede crear una expectativa de costo cero cuando la operación real sigue teniendo costos y trabajo sostenido.
- Esto puede llevar a una inversión indirecta que no fue claramente explicada.

### Recomendación
- Definir explícitamente qué es “gratis” y qué no lo es.
- Separar claramente:
  - desarrollo
  - operación
  - mantenimiento
  - seguridad
  - IA
  - soporte posterior

---

## 2) Dependencia de la cuenta AWS de Gozadoras no está cerrada

La propuesta propone que la solución resida en la cuenta AWS de Gozadoras desde el primer día.

### Punto sensible
- La propuesta menciona que una cuenta nueva puede estar en plan Free y que, para operar 24 meses, se requiere pasar a Paid antes del mes 6.
- No queda totalmente claro quién configura la cuenta, quién paga, quién valida el MFA, quién define la región, y qué pasa si la cuenta no está lista a tiempo.

### Riesgo
- La ejecución del proyecto depende de un recurso externo y aún no operado por Gozadoras.
- Si la cuenta no está preparada, el cronograma puede retrasarse y la propuesta perder validez.

### Recomendación
- Definir antes del arranque:
  - quién es responsable de la cuenta AWS
  - qué plan está activo
  - quién gestiona costos y alertas
  - qué región se usará
  - qué checklist de activación debe completarse antes del despliegue

---

## 3) Protección de datos sensibles: hay intención, pero falta cierre operativo

La propuesta reconoce que el instrumento involucra datos referidos a la vida sexual, la sensibilidad corporal y la experiencia relacional.

### Punto sensible
- Se menciona la Ley 21.719 y la sensibilidad del tratamiento de datos.
- Se describe una arquitectura que parece prudente.
- Sin embargo, la propuesta aún no presenta un cierre operativo completo de:
  - consentimiento detallado
  - retención
  - eliminación
  - minimización de datos
  - acceso
  - control por usuaria
  - manejo de derechos de titular

### Riesgo
- La arquitectura puede ser correcta en intención, pero insuficiente en la práctica si no existe un protocolo operativo claro.
- El problema no es solo tecnológico; es también de proceso y responsabilidad.

### Recomendación
- Definir un protocolo de tratamiento de datos sensibles con:
  - finalidades de uso
  - retención máxima
  - eliminación segura
  - control de acceso
  - registro de actividades
  - procedimiento para ejercer derechos

---

## 4) Munay + DeepSeek es el punto más delicado de la propuesta

Este es probablemente el punto más crítico de la propuesta.

### Punto sensible
- La propuesta reconoce explícitamente que DeepSeek procesa y almacena datos personales en la República Popular China.
- Aun así, propone un flujo con IA opcional, que podría usarse sobre datos reales.
- Se indica que Munay está apagado por defecto y que solo debería activarse bajo condiciones específicas.

### Riesgo
- La empresa puede sentir que el riesgo está controlado por un apagado inicial, pero el diseño sigue suponiendo el uso de un proveedor externo con implicancias de soberanía de datos, reputación y cumplimiento.
- En un instrumento con información corporal, afectiva y sexual, este punto exige un nivel de rigor mayor que el presentado.

### Recomendación
- No asumir la IA como parte natural del MVP sin un acuerdo explícito sobre:
  - proveedor final
  - residencia de datos
  - retención
  - consentimiento específico
  - límites de uso
  - alternativa con modelo local o en entorno controlado

---

## 5) El cronograma es muy ajustado para la complejidad del MVP

La propuesta trabaja con una ventana muy corta para una solución con múltiples capas.

### Punto sensible
- El cronograma va desde el 22 de septiembre hasta el 5 de octubre.
- El plan incluye:
  - maqueta funcional
  - 48 preguntas
  - lógica adaptativa
  - versionado
  - exportación
  - QA
  - trazabilidad
  - validación con usuarias
  - posible activación de Munay

### Riesgo
- Hay mucha complejidad técnica y de validación para una ventana tan corta.
- El documento incluye un “plan B” con Jotform como respaldo, pero eso no elimina el riesgo de que el MVP no quede bien resuelto en tiempo.

### Recomendación
- Redefinir el cronograma con una línea de contingencia real, no solo un plan B conceptual.
- Asegurar que el MVP no dependa de un conjunto de tareas críticas todas a la vez en una sola semana.

---

## 6) La trazabilidad parece robusta en teoría, pero aún falta prueba de ejecución real

La propuesta presenta un modelo de trazabilidad muy bien pensado: versión del instrumento, session, response, route, variable, append-only, exportación JSONL y CSV.

### Punto sensible
- La lógica es clara en documento y en arquitectura conceptual.
- Sin embargo, no queda completamente resuelto cómo se validará la reconstrucción del recorrido, la integridad del dato y la separación entre evidencia original e inferencia en un entorno real.

### Riesgo
- Hay un diseño sólido en papel, pero aún no hay una prueba de operación que demuestre que cada escenario funciona y no se pierde información.
- En sistemas con datos sensibles, la auditoría no es opcional.

### Recomendación
- Definir y ejecutar una prueba de trazabilidad real con:
  - recorrido completo
  - corrección de respuesta
  - cambio de versión del instrumento
  - exportación
  - reconstrucción del recorrido
  - validación de integridad

---

## 7) La comparación con Jotform está sesgada

La propuesta compara la solución AWS con Jotform y concluye que AWS es mejor para este caso.

### Punto sensible
- La comparación pone en valor la personalización y la trazabilidad de AWS.
- Pero no se explicita de forma equivalente la complejidad operativa, la carga de mantenimiento y la necesidad de propiedad técnica real.

### Riesgo
- El documento puede sobrevalorar la propuesta propia y subvalorar la carga real de operación y soporte.
- Esto puede hacer que la decisión de escoger AWS se vea más “obvia” de lo que realmente es.

### Recomendación
- Presentar una comparación más equilibrada entre:
  - esfuerzo de operación
  - riesgo de mantenimiento
  - soporte y continuidad
  - propiedad del código e infraestructura
  - tiempo a producto

---

## 8) Entrega “as is” reduce cobertura y continuidad

La propuesta menciona que el entregable se entrega “as is”, sin garantía de funcionamiento continuo ni soporte posterior al traspaso.

### Punto sensible
- Esto puede ser aceptable en una demo o un MVP inicial, pero no en un sistema con datos sensibles y validación de usuarias.

### Riesgo
- Gozadoras puede recibir la base técnica, pero no la capacidad de operar y sostenerla en producción.
- Si la organización no tiene ya capacidad interna, la solución puede quedar a medio camino.

### Recomendación
- Definir un período de soporte explícito, aunque sea limitado.
- Especificar qué incluye la entrega y qué queda fuera.

---

## 9) Falta un plan de operación real en producción

La propuesta habla de traspaso, repositorio, runbook y eliminación de accesos, pero no muestra un modelo operativo completo para la fase real.

### Punto sensible
- No aparecen todavía definiciones claras sobre:
  - alertas
  - alertas de costo
  - monitoreo de errores
  - recuperación ante fallas
  - revisión de seguridad
  - procedimientos de incidentes
  - soporte de product owner y operación diaria

### Riesgo
- La propuesta parece más cercana a una entrega técnica puntual que a un sistema con sostenibilidad real.

### Recomendación
- Definir un modelo operativo mínimo viable con:
  - alertas
  - roles
  - monitorización
  - soporte y revisión
  - procedimiento de incidente
  - mantenimiento de la versión del instrumento

---

## 10) Hay demasiada narrativa de confianza y poca evidencia real de ejecución

La propuesta presenta una fuerte narrativa sobre ética, metodologías, cuidado, responsabilidad y credibilidad del equipo.

### Punto sensible
- Esa narrativa es útil, pero no reemplaza evidencia concreta de:
  - despliegues previos
  - validaciones técnicas reales
  - experiencia con datos sensibles
  - casos de uso comparables
  - diseño de auditoría y producción

### Riesgo
- La propuesta puede sentir más como una declaración de principios que como una prueba operativa de ejecución.

### Recomendación
- Acompañar la propuesta con evidencia tangible de:
  - casos previos
  - arquitecturas implementadas
  - patrones de seguridad reales
  - plan de gobernanza del dato

---

## Conclusión

Los puntos más sensibles de la propuesta no son la idea del producto ni la intención del equipo, sino los riesgos de ejecución y gobernanza. Los elementos críticos son:

- costo real del sistema
- dependencia de la cuenta AWS
- tratamiento de datos sensibles y cumplimiento
- activación de IA con DeepSeek
- cronograma apretado
- falta de cierre de operación real
- entrega limitada sin soporte sostenido

En otras palabras: la propuesta tiene una base buena, pero aún requiere una etapa de maduración antes de ser aceptada como entrega de producto final. Las decisiones más delicadas deben cerrarse con evidencia técnica, protocolos operativos y límites explícitos de uso de datos.

---

## Recomendación final

Antes de dar el OK final, conviene exigir una versión de la propuesta que incluya:

1. una hoja de costos reales y de operación
2. un protocolo de privacidad y tratamiento de datos sensibles
3. una decisión explícita sobre IA y proveedor externo
4. una planilla de riesgos con responsables y contingencias
5. una definición de soporte y continuidad post-entrega
6. una validación técnica real del flujo de trazabilidad y exportación

Esto permitiría convertir la propuesta en un documento de decisión más sólido y menos vulnerable a sorpresas operativas o regulatorias.
