# Plan integral de transformación, backend, recopilación y gobernanza

## Objetivo

Convertir la maqueta Gozadoras Club en una experiencia publicable que pueda:

- Presentarse como landing page.
- Ejecutar el cuestionario completo.
- Guardar progreso cuando la persona lo solicite.
- Administrar datos de contacto.
- Proteger respuestas potencialmente sensibles.
- Permitir derechos de titulares.
- Operar con trazabilidad y seguridad.

## Fase 0: definición y límites

- Confirmar público objetivo y edad mínima.
- Definir si el servicio será anónimo por defecto.
- Definir si habrá cuenta.
- Definir finalidades exactas.
- Clasificar preguntas y resultados.
- Decidir si foto/audio permanecen simulados.
- Nombrar responsable de datos.
- Revisar Ley 21.719 con asesoría chilena.

**Salida:** alcance aprobado, inventario de tratamientos y matriz de riesgos inicial.

## Fase 1: producto y contenido

- Separar landing de aplicación.
- Redactar propuesta de valor.
- Definir CTA.
- Redactar consentimiento y aviso de privacidad.
- Definir mensajes de no diagnóstico.
- Definir textos de error y ayuda.
- Validar lenguaje para personas adultas.

**Salida:** prototipo de contenido y política de privacidad versionada.

## Fase 2: refactor del frontend

- Extraer `CH`, `Q`, `ZONES` y `ELEM` a módulos versionados.
- Asignar `questionId` estable a cada pregunta.
- Crear store de sesión.
- Añadir estados de guardado y error.
- Mantener la maqueta responsive.
- Eliminar promesas de análisis que no existan.
- Añadir centro de privacidad.
- Implementar eliminación local y remota.

**Salida:** frontend preparado para API y sin dependencia exclusiva de `S.a` en memoria.

## Fase 3: backend base

- Crear API versionada.
- Crear sesiones anónimas.
- Crear persistencia de respuestas.
- Crear autenticación opcional.
- Crear contacto separado.
- Crear consentimiento versionado.
- Añadir validación de esquema.
- Añadir autorización por usuario.

**Salida:** API funcional con pruebas de integración.

## Fase 4: base de datos y seguridad

- Separar identidad de respuestas.
- Cifrar respuestas sensibles.
- Aplicar mínimo privilegio.
- Activar MFA administrativo.
- Proteger secretos.
- Configurar backups.
- Eliminar datos de logs.
- Implementar rate limiting.
- Preparar recuperación ante desastre.

**Salida:** ambiente de pruebas seguro y reproducible.

## Fase 5: recopilación controlada

- Usar sesión anónima por defecto.
- Pedir nombre, apellido, correo y teléfono solo al guardar o recuperar.
- Solicitar consentimientos independientes.
- Verificar correo/teléfono si es necesario.
- No recolectar marketing junto con servicio.
- Aplicar retención.
- Registrar evidencia de consentimientos.

**Salida:** recorrido de recopilación validado con datos de prueba.

## Fase 6: derechos de titulares

Implementar:

- Acceso.
- Rectificación.
- Supresión.
- Oposición.
- Bloqueo.
- Portabilidad.
- Revocación del consentimiento.

**Salida:** centro de privacidad operativo y procedimiento interno de atención.

## Fase 7: cumplimiento y riesgo

- Completar evaluación de impacto si corresponde.
- Revisar tratamiento de datos sensibles.
- Revisar transferencias internacionales.
- Firmar contratos con encargados.
- Crear plan de incidentes.
- Designar responsable o delegado.
- Capacitar al equipo.
- Ensayar una solicitud de eliminación.
- Ensayar una filtración simulada.

**Salida:** expediente de cumplimiento y aprobación para producción.

## Fase 8: publicación

- Dominio.
- HTTPS.
- CDN si corresponde.
- Variables de entorno.
- Despliegue separado para frontend y API.
- Monitoreo.
- Alertas.
- Backups.
- Runbook.
- Soporte.
- Revisión legal final.

## Arquitectura objetivo

```text
[Landing pública]
       │
       ▼
[Frontend cuestionario]
       │ HTTPS
       ▼
[API Gateway / Backend]
       ├── Autenticación
       ├── Sesiones
       ├── Respuestas
       ├── Consentimientos
       ├── Contactos
       ├── Centro de privacidad
       └── Auditoría sin contenido sensible
              │
              ├── Base identidad/contacto
              ├── Base respuestas cifradas
              ├── Almacenamiento de archivos, solo si se aprueba
              └── Servicio de correo/SMS bajo contrato
```

## Decisiones recomendadas

1. No obligar a entregar contacto para probar el cuestionario.
2. No almacenar foto/audio en el lanzamiento inicial.
3. Separar marketing del servicio.
4. Tratar respuestas como potencialmente sensibles.
5. Guardar el mínimo necesario.
6. Aplicar privacidad desde el diseño.
7. Preparar el producto para la vigencia del 1 de diciembre de 2026 indicada en la fuente normativa consultada.
8. No lanzar sin revisión jurídica chilena.

## Orden de implementación

```text
Definir finalidades
  ▼
Clasificar datos y riesgos
  ▼
Diseñar consentimiento y privacidad
  ▼
Versionar modelo de preguntas
  ▼
Construir API y base segura
  ▼
Integrar frontend
  ▼
Implementar derechos
  ▼
Probar seguridad y eliminación
  ▼
Evaluar impacto y proveedores
  ▼
Publicar
```

## Criterio de éxito

El proyecto estará listo cuando la experiencia sea técnicamente usable, jurídicamente explicable y operativamente gobernable: cada dato tendrá una finalidad, una base de licitud, un plazo, controles de acceso y una ruta clara para que su titular pueda ejercer sus derechos.
