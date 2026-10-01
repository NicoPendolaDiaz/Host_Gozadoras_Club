# Qué falta para transformar Gozadoras Club en landing page o app funcional

## Alcance

La maqueta actual es un prototipo web ejecutable en navegador. Es un HTML único con CSS, SVG y JavaScript embebidos. Tiene flujo visual, cuestionario, estado local en memoria, resumen y simulaciones de audio/foto, pero todavía no es un producto web completo.

## 1. Diferenciar los dos objetivos

### Landing page

Una landing page debe comunicar y convertir:

- Propuesta de valor.
- Público objetivo.
- Beneficios y límites del servicio.
- Llamado a la acción.
- Formulario mínimo de contacto o registro.
- Aviso de privacidad y consentimiento.
- Analítica configurada con base jurídica adecuada.
- Dominio, HTTPS y despliegue.

La landing no necesita incorporar necesariamente las 40 preguntas. Puede presentar la experiencia y derivar a la aplicación.

### App funcional

La aplicación debe permitir ejecutar el cuestionario de forma persistente, segura y operable:

- Crear o iniciar una sesión.
- Guardar progreso.
- Reanudar una sesión.
- Gestionar respuestas.
- Generar el mapa final.
- Administrar consentimiento.
- Permitir solicitudes sobre datos personales.
- Administrar usuarios y soporte.
- Monitorear errores y seguridad.

## 2. Faltantes funcionales actuales

1. No existe registro de usuario.
2. No existe inicio de sesión ni recuperación de cuenta.
3. No existe backend ni API.
4. No existe base de datos.
5. `S = { i: 0, a: {} }` vive únicamente en memoria del navegador.
6. Al recargar la página se pierde el progreso.
7. No existe sincronización entre dispositivos.
8. No existe persistencia del resumen.
9. Las capturas de foto y audio son estados visuales simulados, no capturas reales enviadas a un servicio.
10. No existe validación de servidor.
11. No existe control de abuso, rate limiting ni protección antifraude.
12. No existe consola administrativa.
13. No existe procedimiento automatizado para acceso, rectificación, supresión, oposición, bloqueo o portabilidad.
14. No existe política de privacidad implementada como documento vinculado y versionado.
15. No existe gestión real de edades ni mecanismo para impedir el ingreso de menores si el producto se orienta solo a personas adultas.

## 3. Faltantes de producto

Antes de programar el backend hay que definir:

- Si el cuestionario es anónimo o requiere cuenta.
- Si el resultado se almacena o solo se entrega en el dispositivo.
- Qué parte de las respuestas es necesaria para prestar el servicio.
- Si se recopilarán datos de contacto.
- Si se enviarán comunicaciones comerciales.
- Si habrá profesionales, comunidad, membresía o contenido personalizado.
- Si el mapa produce recomendaciones o solo una visualización.
- Si se aceptarán archivos de foto/audio reales.
- Edad mínima y control de acceso.
- Países donde se ofrecerá el servicio.
- Responsable legal del tratamiento.
- Proveedores tecnológicos que intervendrán.

## 4. Producto mínimo recomendado

### Fase A: landing

- Separar la presentación de la aplicación.
- Crear CTA `Comenzar mapa`.
- Añadir aviso de privacidad resumido.
- Añadir enlaces a política completa, términos y contacto.
- Conectar formulario de registro opcional.
- Implementar HTTPS, dominio y monitoreo básico.

### Fase B: aplicación sin cuenta obligatoria

- Mantener respuestas localmente cifradas o protegidas.
- Crear una opción explícita `Guardar mi mapa`.
- Pedir datos de contacto solo cuando sean necesarios para guardar o recuperar.
- Enviar el resultado solo con consentimiento específico.
- Permitir borrar el mapa desde la aplicación.

### Fase C: aplicación con cuenta

- Registro e inicio de sesión.
- Verificación de correo o teléfono.
- API de sesiones y respuestas.
- Base de datos con separación entre identidad y respuestas sensibles.
- Panel de derechos del titular.
- Auditoría y control de accesos.

## 5. Cambios técnicos en frontend

La maqueta debe pasar de llamadas directas y estado local a una capa de servicios:

```text
render()
  -> questionnaireStore
      -> apiClient
          -> API HTTPS
```

Cambios mínimos:

- Reemplazar persistencia exclusiva en `S.a` por un store de sesión.
- Guardar respuestas por lotes o al avanzar.
- Gestionar estados `idle`, `saving`, `saved`, `error` y `offline`.
- No incluir datos sensibles en URLs, logs del navegador ni mensajes de error.
- Separar datos de identidad de respuestas del cuestionario.
- Validar en servidor, incluso si ya se valida en el navegador.
- Añadir consentimiento versionado y timestamp.
- Añadir mecanismo de eliminación.
- Implementar captura real solo después de aprobar el análisis de riesgo.

## 6. Backend mínimo

- API HTTPS.
- Servicio de autenticación.
- Servicio de sesiones del cuestionario.
- Servicio de respuestas.
- Servicio de consentimiento.
- Servicio de derechos de titulares.
- Base de datos relacional o documental con cifrado.
- Almacenamiento separado para archivos, si se habilitan.
- Gestión de secretos.
- Logs sin contenido sensible.
- Backup y restauración.
- Monitoreo y alertas.

## 7. Calidad y operación

Antes de publicar:

- Pruebas unitarias de validación.
- Pruebas de integración API-base de datos.
- Pruebas de navegación completa.
- Pruebas responsive.
- Pruebas de accesibilidad.
- Pruebas de autorización y aislamiento entre usuarios.
- Pruebas de eliminación y exportación.
- Pruebas de incidentes.
- Revisión legal de textos y consentimientos.
- Revisión de seguridad independiente para datos sensibles.

## 8. Criterio de salida

La transformación puede considerarse lista cuando:

- La landing convierte sin recolectar más datos de los necesarios.
- La aplicación tiene una finalidad documentada.
- Cada dato tiene base de licitud y período de conservación.
- El usuario puede entender, consentir, retirar consentimiento y ejercer derechos.
- La API valida autorización por usuario.
- El sistema puede detectar, responder y registrar incidentes.
- Existe una persona o equipo responsable de privacidad.
- La experiencia no promete análisis que técnicamente no realiza.
