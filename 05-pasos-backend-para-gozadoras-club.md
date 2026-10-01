# Pasos para entregar un backend a la maqueta Gozadoras Club

## 1. Punto de partida

La maqueta actual contiene:

- `CH`: capítulos.
- `Q`: 40 preguntas.
- `ZONES`: mapa corporal.
- `S.i`: índice de pregunta.
- `S.a`: respuestas en memoria.
- `render()`: renderizado dinámico.
- `next()`, `prev()`, `summary()`: flujo.
- Renderers para chips, multi, cards, slider, mapa, texto, foto y audio.

No contiene llamadas de red ni un contrato de API.

## 2. Decisiones previas

Antes de desarrollar hay que decidir:

1. ¿La experiencia será anónima por defecto?
2. ¿Se podrá usar sin entregar nombre, teléfono o correo?
3. ¿El resultado se guardará?
4. ¿Se guardarán respuestas sensibles identificadas?
5. ¿Se recogerán fotos o audios reales?
6. ¿Qué finalidad tendrá cada dato?
7. ¿Qué proveedor alojará el sistema?
8. ¿Habrá comunicaciones de marketing?
9. ¿Cuál es la edad mínima?
10. ¿Quién será el responsable de datos?

La recomendación técnica es separar la experiencia anónima del registro de contacto.

## 3. Contrato de dominio

Definir tipos estables para no enviar el DOM como modelo de datos:

```ts
type QuestionnaireSession = {
  id: string;
  schemaVersion: string;
  currentQuestion: number;
  status: 'active' | 'completed' | 'deleted';
  startedAt: string;
  completedAt?: string;
};

type Answer = {
  questionId: string;
  value: string | number | string[] | object;
  answeredAt: string;
};
```

Cada pregunta debe tener un `questionId` permanente. No conviene depender del índice `S.i` como identificador externo.

## 4. API mínima

### Sesiones

```text
POST   /api/v1/sessions
GET    /api/v1/sessions/:sessionId
PATCH  /api/v1/sessions/:sessionId
POST   /api/v1/sessions/:sessionId/complete
DELETE /api/v1/sessions/:sessionId
```

### Respuestas

```text
PUT    /api/v1/sessions/:sessionId/answers/:questionId
GET    /api/v1/sessions/:sessionId/answers
DELETE /api/v1/sessions/:sessionId/answers/:questionId
```

### Contacto

```text
POST   /api/v1/contacts
PATCH  /api/v1/contacts/:contactId
DELETE /api/v1/contacts/:contactId
```

El endpoint de contacto debe estar separado del endpoint de respuestas sensibles.

### Consentimientos

```text
POST   /api/v1/consents
GET    /api/v1/consents
POST   /api/v1/consents/:consentId/revoke
```

### Derechos

```text
POST   /api/v1/privacy/access
POST   /api/v1/privacy/rectification
POST   /api/v1/privacy/suppression
POST   /api/v1/privacy/opposition
POST   /api/v1/privacy/blocking
POST   /api/v1/privacy/portability
```

## 5. Modelo de datos recomendado

Separar identidad, respuestas y consentimiento:

```text
users
├── id
├── first_name
├── last_name
├── email
├── phone_country_code
├── phone_number
├── email_verified_at
├── phone_verified_at
└── created_at

questionnaire_sessions
├── id
├── user_id nullable
├── schema_version
├── status
├── started_at
└── completed_at

questionnaire_answers
├── id
├── session_id
├── question_id
├── value_encrypted
├── value_type
└── answered_at

consents
├── id
├── user_id/session_id
├── policy_version
├── purpose
├── affirmative_action
├── granted_at
├── revoked_at
└── evidence
```

La relación entre `users` y `questionnaire_answers` debe estar restringida mediante autorización, no solo mediante un identificador enviado por el cliente.

## 6. Flujo de integración frontend-backend

```text
Usuario inicia
   ▼
POST /sessions
   ▼
S.id = sessionId
   ▼
Usuario responde
   ▼
PUT /sessions/:id/answers/:questionId
   ▼
Frontend actualiza UI
   ▼
Usuario completa
   ▼
POST /sessions/:id/complete
   ▼
Backend genera o valida resumen
   ▼
Frontend muestra resultado
```

## 7. Implementación por etapas

### Etapa 1: contrato

- Definir OpenAPI.
- Nombrar preguntas con IDs permanentes.
- Definir esquema de respuestas.
- Definir códigos de error.
- Definir versión del cuestionario.

### Etapa 2: servicio de sesiones

- Crear sesión anónima o autenticada.
- Emitir identificador no predecible.
- Guardar estado y versión.
- Aplicar expiración a sesiones abandonadas.

### Etapa 3: servicio de respuestas

- Validar `questionId`.
- Validar tipo y rangos.
- Rechazar preguntas inexistentes.
- Evitar respuestas de otra sesión.
- Guardar timestamps.
- No registrar valores sensibles en logs.

### Etapa 4: identidad y contacto

- Registrar nombre, apellido, correo y teléfono solo con finalidad definida.
- Verificar correo o teléfono si la cuenta lo exige.
- Normalizar teléfono con código de país.
- Normalizar y validar correo.
- Evitar usar correo o teléfono como clave primaria visible.

### Etapa 5: resumen

- Construir resumen a partir de respuestas autorizadas.
- No convertirlo en diagnóstico.
- Definir si se conserva o se elimina al finalizar.
- Entregar exportación estructurada al usuario si corresponde.

### Etapa 6: privacidad

- Registrar versión del aviso informado.
- Registrar finalidad y acción afirmativa.
- Implementar revocación.
- Implementar solicitudes de derechos.
- Registrar fechas y resultado de cada solicitud.

### Etapa 7: seguridad y operación

- HTTPS obligatorio.
- Cifrado en tránsito y reposo.
- Gestión de secretos fuera del código.
- RBAC para administración.
- Rate limiting.
- Protección CSRF si corresponde.
- Validación de origen y sesión.
- Backups cifrados.
- Alertas de acceso anómalo.
- Plan de respuesta a incidentes.

## 8. Archivos de foto y audio

No deben habilitarse por defecto. Antes hay que decidir:

- Si se captura realmente desde el navegador.
- Si se almacena el archivo o solo una métrica derivada.
- Si la voz, rostro o rasgos permiten identificación.
- Qué proveedor procesa el archivo.
- Dónde se almacena.
- Por cuánto tiempo.
- Cómo se elimina.
- Qué consentimiento específico se obtiene.

Si una foto o voz permite identificar a la persona, el riesgo y las obligaciones aumentan. La opción preferida es procesar localmente y descartar el archivo, siempre que el producto lo permita.

## 9. Entornos

Separar:

- Desarrollo.
- Pruebas.
- Producción.

Nunca usar datos reales sensibles en desarrollo. Cada ambiente necesita secretos, bases de datos y accesos independientes.

## 10. Entrega técnica

El backend se puede entregar con:

- Código fuente.
- OpenAPI.
- Migraciones.
- Variables de entorno documentadas.
- Dockerfile o configuración de despliegue.
- Pruebas automatizadas.
- Política de backups.
- Runbook de incidentes.
- Matriz de roles y permisos.
- Registro de proveedores y transferencias internacionales.
- Documentación de privacidad.

## 11. Criterios de aceptación

- Un usuario no puede leer sesiones ajenas.
- Una respuesta inválida se rechaza en backend.
- Se puede guardar y reanudar una sesión.
- Se puede completar el cuestionario sin perder respuestas.
- La eliminación elimina o anonimiza lo que corresponda.
- La exportación contiene solo datos del titular.
- Los consentimientos tienen versión y evidencia.
- No aparecen respuestas sensibles en logs.
- Los endpoints tienen pruebas de autorización.
