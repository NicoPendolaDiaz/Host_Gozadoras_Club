# Proceso de recopilación de datos de usuarios en Gozadoras Club

## 1. Es posible, pero debe ser selectivo

La maqueta puede recopilar datos porque el flujo ya produce respuestas estructuradas. Sin embargo, actualmente esas respuestas viven solo en `S.a` y no se envían a ningún servidor.

La recopilación debe diseñarse por finalidad. No conviene almacenar todo lo que el cuestionario pueda producir solo porque técnicamente es posible.

## 2. Clasificación de datos

### Identificación y contacto

- Nombre.
- Apellido.
- Correo electrónico.
- Código de país.
- Número de teléfono.

Son datos personales identificables.

### Datos derivados del cuestionario

Pueden revelar aspectos de:

- Cuerpo.
- Sensibilidad.
- Sexualidad.
- Deseo.
- Orientación o preferencias.
- Salud sexual o corporal.
- Estado emocional.
- Relaciones de pareja.
- Voz, rostro o imagen si se habilitan capturas.

Bajo la Ley 21.719, la información relativa a salud, vida sexual, orientación sexual, identidad de género y determinados datos biométricos puede ser dato personal sensible. La clasificación concreta debe ser validada jurídicamente según las preguntas finales y el tratamiento que se realice.

## 3. Principio de minimización

Separar tres productos de datos:

1. **Sesión de interacción**: progreso y respuestas necesarias para entregar el mapa.
2. **Cuenta de usuario**: datos mínimos para autenticación y recuperación.
3. **Comunicaciones**: datos y preferencias para enviar mensajes.

No mezclar automáticamente los tres conjuntos.

## 4. Flujo recomendado

```text
Landing
  │
  ├── Ver experiencia sin cuenta
  │       └── sesión local/anónima
  │
  └── Guardar mi mapa
          ├── aviso de privacidad
          ├── consentimiento para guardar respuestas
          ├── registro de contacto
          └── verificación de correo/teléfono
```

## 5. Paso a paso de recopilación

### Paso 1: informar antes de recolectar

Mostrar un aviso claro con:

- Quién es el responsable.
- Qué datos se recogerán.
- Para qué se usarán.
- Qué datos son opcionales.
- Qué destinatarios o encargados intervienen.
- Cuánto tiempo se conservarán.
- Si habrá transferencias internacionales.
- Cómo ejercer derechos.
- Cómo retirar consentimiento.
- Si existe perfilamiento o decisión automatizada.

### Paso 2: separar finalidades

Checkboxes independientes, no preseleccionados:

- `Necesario`: guardar y entregar el resultado solicitado.
- `Opcional`: recibir comunicaciones de servicio.
- `Opcional`: recibir marketing.
- `Opcional`: contribuir a estudios estadísticos anonimizados.
- `Opcional`: permitir análisis de foto/audio, si se habilita.

No agrupar consentimiento para marketing con consentimiento para prestar el servicio.

### Paso 3: crear sesión

Crear una sesión anónima antes de pedir contacto:

```json
{
  "sessionId": "id-no-predecible",
  "schemaVersion": "2026-01",
  "status": "active"
}
```

### Paso 4: guardar respuestas

Guardar solo las respuestas necesarias para la finalidad informada. Se puede:

- Guardar al avanzar.
- Guardar al finalizar cada capítulo.
- Guardar al completar.

La opción recomendada es guardar por capítulo para reducir pérdida de información, con cifrado y controles de acceso.

### Paso 5: pedir contacto solo cuando corresponda

Si la persona quiere guardar o recuperar el mapa:

- Nombre y apellido.
- Correo electrónico.
- Código de país.
- Número de teléfono, solo si cumple una finalidad concreta.

No pedir teléfono simplemente para aumentar el tamaño de la base.

### Paso 6: verificar canales

- Verificación de correo con enlace de un solo uso.
- Verificación de teléfono con código temporal si realmente se necesita.
- No almacenar códigos en texto plano.
- Registrar solo la evidencia necesaria de verificación.

### Paso 7: vincular identidad y sesión

Crear una relación protegida entre `userId` y `sessionId`. La base de datos de identidad debe estar separada de las respuestas sensibles, con acceso restringido.

### Paso 8: completar y entregar

Al completar:

- Validar que el resumen se construye con respuestas autorizadas.
- Informar que no es diagnóstico.
- Permitir descargar o visualizar el resultado.
- Informar el período de conservación.
- Mostrar cómo borrar la información.

## 6. Recopilación de métricas sin identificar

Para medir uso sin perfilar personas:

- Contar sesiones iniciadas y completadas.
- Medir tiempos agregados.
- Medir abandono por capítulo.
- Usar identificadores rotatorios.
- Evitar enviar el texto de respuestas a analítica.
- Aplicar agregación y anonimización antes de reportar.
- No combinar métricas con correo o teléfono sin una finalidad y base de licitud separadas.

## 7. Foto, audio y biometría

La maqueta actual simula `photo` y `audio`; no debe presentarse como análisis real hasta implementar esa capacidad.

Antes de habilitarla:

1. Definir si el archivo se guarda.
2. Definir si se extraen características faciales o de voz.
3. Determinar si el resultado permite identificar a la persona.
4. Obtener consentimiento expreso y específico cuando corresponda.
5. Informar sistema usado, finalidad, duración y ejercicio de derechos.
6. Procesar localmente y descartar el original cuando sea viable.
7. Aplicar evaluación de impacto si el tratamiento supone alto riesgo.

## 8. Datos que no deberían recogerse por defecto

- Cédula de identidad, si no es indispensable.
- Dirección física.
- Fecha exacta de nacimiento, si basta una comprobación de mayoría de edad menos intrusiva.
- Contactos de terceros.
- Ubicación precisa.
- Archivos originales de imagen o audio si no son necesarios.
- Respuestas completas para fines de marketing.

## 9. Estados del proceso

```text
not_started
  ▼
consent_pending
  ▼
active_anonymous_session
  ▼
contact_requested
  ▼
contact_verified
  ▼
completed
  ▼
retention_expired / deleted / anonymized
```

## 10. Eventos auditables

Registrar sin exponer respuestas:

- Inicio de sesión.
- Versión del aviso informado.
- Consentimiento otorgado.
- Consentimiento revocado.
- Sesión completada.
- Solicitud de acceso.
- Solicitud de eliminación.
- Exportación.
- Error de autorización.
- Incidente de seguridad.

## 11. Resultado recomendado

El mejor diseño inicial es:

- Uso anónimo por defecto.
- Registro opcional para guardar el mapa.
- Contacto separado de respuestas.
- Marketing separado.
- Sin foto/audio reales en el primer lanzamiento.
- Estadística solo agregada o anonimizada.
- Eliminación visible y sencilla.
