# Gobernanza de datos para Gozadoras Club y Ley 21.719

## Advertencia de alcance

Este documento es una guía técnica y de cumplimiento, no asesoría legal. Debe ser revisado por un abogado o especialista chileno antes de poner el servicio en producción.

Fuente normativa consultada:

- [Ley N° 21.719 en Biblioteca del Congreso Nacional](https://www.bcn.cl/leychile/navegar?idNorma=1209272)

La ficha consultada indica promulgación el 25 de noviembre de 2024, publicación el 13 de diciembre de 2024, última modificación indicada al 5 de febrero de 2026 y vigencia diferida al 1 de diciembre de 2026. La operación debe cumplir la normativa vigente durante la transición y quedar preparada para esa fecha.

## 1. Por qué el caso es de alto cuidado

La maqueta no solo recoge datos de contacto. Sus 40 preguntas tratan sobre cuerpo, sensibilidad, placer, zona pélvica, deseo, sexualidad, pareja, seguridad emocional y cambios asociados a la edad.

La Ley 21.719 define como sensibles, entre otros, datos relativos a salud, vida sexual, orientación sexual, identidad de género y datos biométricos. Por ello, las respuestas del cuestionario deben tratarse como potencialmente sensibles hasta realizar una clasificación jurídica definitiva.

## 2. Roles que deben definirse

### Responsable de datos

La entidad que decide las finalidades y medios del tratamiento. Debe identificarse en la política de privacidad.

### Encargados o terceros mandatarios

Proveedores que tratan datos por cuenta del responsable, por ejemplo:

- Hosting.
- Base de datos administrada.
- Servicio de correo.
- Servicio de SMS.
- Almacenamiento de archivos.
- Plataforma de soporte.
- Analítica.

Cada proveedor debe tener contrato y límites de tratamiento.

### Delegado de protección de datos

La Ley contempla la posibilidad de designarlo y exige autonomía, idoneidad, medios y contacto. Para una plataforma que trate datos sensibles, es recomendable designarlo aunque se evalúe jurídicamente si existe obligación específica según el tamaño y naturaleza del responsable.

## 3. Inventario de tratamientos

Crear un registro con esta estructura:

| Tratamiento | Datos | Finalidad | Base de licitud | Titulares | Conservación | Destinatarios |
|---|---|---|---|---|---|---|
| Sesión | respuestas del mapa | entregar experiencia | consentimiento o base aplicable | usuarios de la app | plazo definido | proveedor backend |
| Cuenta | nombre, apellido, correo, teléfono | guardar y recuperar mapa | consentimiento o contrato según diseño | usuarios registrados | plazo definido | autenticación |
| Soporte | contacto y solicitud | resolver requerimiento | gestión de solicitud | usuarios | plazo operativo | equipo de soporte |
| Marketing | correo/teléfono y preferencia | comunicaciones comerciales | consentimiento separado | suscritos | hasta revocación o plazo | proveedor autorizado |
| Estadística | datos agregados/anonimizados | medir uso | base documentada | usuarios | según diseño | analítica |

## 4. Principios que deben gobernar el sistema

La Ley consultada establece principios relevantes para esta solución:

- Licitud y lealtad.
- Finalidad.
- Proporcionalidad.
- Calidad.
- Responsabilidad.
- Seguridad.
- Transparencia e información.
- Confidencialidad.

Aplicación práctica:

- No reutilizar respuestas sexuales para marketing sin una finalidad y autorización separadas.
- No conservar datos indefinidamente.
- No pedir teléfono si no existe una finalidad concreta.
- Mantener datos exactos y actualizables.
- Poder demostrar la licitud del tratamiento.
- Limitar accesos internos.
- Informar lenguaje claro y permanentemente accesible.

## 5. Consentimiento

El consentimiento debe ser:

- Libre.
- Informado.
- Específico.
- Previo.
- Inequívoco.
- Expresado mediante declaración o acción afirmativa clara.

Debe existir evidencia de:

- Identidad o sesión.
- Fecha y hora.
- Versión del aviso.
- Finalidad aceptada.
- Texto presentado.
- Acción afirmativa.
- Canal.
- Revocación, si ocurre.

Para datos sensibles, la ley consultada establece una regla de consentimiento expreso, salvo excepciones legales. Por prudencia, las respuestas del cuestionario deben contar con un consentimiento expreso y específico para su tratamiento y almacenamiento.

## 6. Aviso de privacidad mínimo

Debe explicar:

1. Identidad y contacto del responsable.
2. Categorías de datos.
3. Finalidades.
4. Base de licitud.
5. Destinatarios y encargados.
6. Transferencias internacionales.
7. Plazo de conservación.
8. Medidas de seguridad de alto nivel.
9. Derechos de acceso, rectificación, supresión, oposición, bloqueo y portabilidad.
10. Cómo retirar consentimiento.
11. Canal para solicitudes.
12. Posible elaboración de perfiles o decisiones automatizadas.
13. Consecuencias de no entregar datos.
14. Restricción de edad.
15. Versión y fecha del aviso.

## 7. Derechos de titulares

La solución debe ofrecer mecanismos sencillos para:

- Acceso.
- Rectificación.
- Supresión.
- Oposición.
- Bloqueo temporal.
- Portabilidad.
- Retiro del consentimiento.

La ley consultada prevé solicitudes ante el responsable mediante correo, formulario o medio electrónico equivalente. Deben existir identidad verificable, trazabilidad, plazos y respuesta documentada.

La plataforma debe incluir:

- Centro de privacidad.
- Formulario de solicitud.
- Verificación de identidad proporcional.
- Estado de la solicitud.
- Exportación estructurada.
- Eliminación o anonimización.
- Registro de cumplimiento.

## 8. Conservación

Definir una tabla de retención antes de recolectar:

| Categoría | Regla propuesta |
|---|---|
| Sesión incompleta | eliminar o anonimizar tras un plazo corto documentado |
| Respuestas del mapa | conservar solo mientras sea necesario para la finalidad |
| Cuenta | hasta cierre o plazo justificado |
| Consentimiento | conservar como evidencia mientras pueda ser necesario acreditarlo |
| Marketing | hasta revocación o depuración periódica |
| Logs técnicos | plazo corto y sin contenido sensible |
| Backups | calendario, cifrado y expiración definidos |

La retención final debe aprobarla el responsable y su asesoría legal.

## 9. Seguridad desde el diseño

Aplicar protección desde diseño y por defecto:

- Minimización.
- Cifrado en tránsito y reposo.
- Seudonimización de respuestas.
- Separación de identidad y contenido sensible.
- RBAC y mínimo privilegio.
- MFA para administradores.
- Rotación de secretos.
- Backups cifrados.
- Restauración probada.
- Logs sin respuestas.
- Alertas y detección.
- Revisión periódica de permisos.
- Pruebas de penetración.

## 10. Incidentes

Crear un procedimiento para:

1. Detectar.
2. Contener.
3. Clasificar datos afectados.
4. Identificar titulares afectados.
5. Evaluar riesgo.
6. Registrar evidencia.
7. Notificar a la autoridad cuando corresponda.
8. Informar a titulares cuando corresponda, especialmente si se afectan datos sensibles.
9. Corregir causa raíz.
10. Ejecutar revisión posterior.

La Ley consultada regula el deber de reportar vulneraciones que impliquen riesgo razonable para derechos y libertades.

## 11. Proveedores y transferencias internacionales

Antes de contratar un proveedor:

- Identificar país y subencargados.
- Determinar si habrá transferencia internacional.
- Verificar nivel adecuado o garantías aplicables.
- Firmar contrato de encargo.
- Definir finalidad, duración, datos y titulares.
- Prohibir usos propios no autorizados.
- Exigir confidencialidad y seguridad.
- Regular devolución o eliminación.
- Exigir aviso de incidentes.

## 12. Evaluación de impacto

Debe evaluarse antes del tratamiento si existe alto riesgo. La Ley consultada contempla especialmente:

- Elaboración sistemática y exhaustiva de aspectos personales.
- Tratamiento masivo.
- Monitoreo sistemático.
- Tratamiento de datos sensibles en ciertos supuestos.

Por la naturaleza sexual/corporal de la maqueta, la evaluación de impacto es una medida prudente antes de almacenar respuestas identificadas o habilitar análisis automatizado de foto/audio.

Contenido mínimo:

- Descripción del tratamiento.
- Necesidad y proporcionalidad.
- Categorías de datos.
- Riesgos.
- Salvaguardas.
- Riesgo residual.
- Aprobación del responsable.

## 13. Programa de cumplimiento

La Ley contempla modelos de prevención de infracciones. El programa interno puede incluir:

- Delegado de protección de datos.
- Inventario de tratamientos.
- Matriz de riesgos.
- Protocolos de privacidad.
- Capacitación.
- Gestión de solicitudes.
- Gestión de incidentes.
- Control de proveedores.
- Auditorías.
- Medidas disciplinarias.
- Reportes internos.

## 14. Gobernanza operativa

### Comité o responsables

Definir responsables de:

- Producto.
- Tecnología.
- Seguridad.
- Privacidad/legal.
- Atención de titulares.
- Gestión de proveedores.

### Artefactos obligatorios del proyecto

- Registro de tratamientos.
- Política de privacidad.
- Matriz de consentimiento.
- Inventario de datos.
- Tabla de retención.
- Matriz de accesos.
- Registro de proveedores.
- Plan de incidentes.
- Evaluación de impacto.
- Registro de solicitudes de titulares.
- Registro de versiones del cuestionario.

## 15. Checklist antes de producción

- [ ] Responsable identificado.
- [ ] Finalidades aprobadas.
- [ ] Datos sensibles clasificados.
- [ ] Consentimientos separados.
- [ ] Política publicada y versionada.
- [ ] Derechos implementados.
- [ ] Retención definida.
- [ ] Proveedores contratados correctamente.
- [ ] Transferencias revisadas.
- [ ] Seguridad probada.
- [ ] Incidentes ensayados.
- [ ] Evaluación de impacto completada o descartada con justificación.
- [ ] Restricción de edad implementada.
- [ ] No se envían datos sensibles a analítica por defecto.
- [ ] Revisión legal final realizada.

## 16. Fecha crítica

La fuente consultada muestra entrada en vigencia diferida al 1 de diciembre de 2026. Dado que la fecha actual de este análisis es 24 de septiembre de 2026, el proyecto debe:

- Cumplir el régimen vigente durante el período de transición.
- Preparar desde ahora los controles exigidos por la Ley 21.719.
- Verificar cambios reglamentarios e instrucciones de la Agencia antes del lanzamiento.
- Actualizar este documento y la política cuando entren en vigor nuevas reglas.
