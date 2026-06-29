# SoporteTech — Sistema de Gestión de Tickets IT

Sistema integrado para la gestión de tickets de soporte técnico institucional con entrada vía WhatsApp, automatización con n8n, backend en Spring Boot y panel web en React.

## Arquitectura

```
WhatsApp → Whapi.cloud → n8n → Backend (Spring Boot) → PostgreSQL (Supabase)
                                    ↕
                            Panel web (React + Vite)
```

### Componentes

| Carpeta | Tecnología | Función |
|---------|-----------|---------|
| `autoticket-gestor-bk/` | Java 17 + Spring Boot 3 | API REST, autenticación JWT, gestión de tickets, técnicos y evidencias |
| `soportech-panel/` | React + Vite + Tabler Icons | Panel administrativo web para técnicos y administradores |
| `n8n/` | n8n workflows | Automatización: recepción WhatsApp, clasificación con DeepSeek AI, notificaciones |

## Requisitos

- Java 17+
- Node.js 18+
- PostgreSQL (recomendado: Supabase)
- n8n (opcional, para flujos WhatsApp)
- Cuenta en Whapi.cloud (opcional, para WhatsApp API)
- API Key de DeepSeek (opcional, para clasificación AI)

## Configuración rápida

1. Copia los archivos de ejemplo y completa las variables:

```bash
cp autoticket-gestor-bk/src/main/resources/application.properties.example autoticket-gestor-bk/src/main/resources/application.properties
cp .env.example .env
```

2. Configura las variables en `.env` — todas son obligatorias:

```
DB_URL=jdbc:postgresql://host:5432/postgres
DB_USERNAME=postgres.user
DB_PASSWORD=tu_password
N8N_WEBHOOK_URL=http://localhost:5678/webhook-test/status_update
N8N_API_TOKEN=tu_token_n8n
JWT_SECRET=tu_clave_secreta_jwt
VITE_API_URL=http://localhost:8080
```

### Backend

```bash
cd autoticket-gestor-bk
./mvnw spring-boot:run
```

### Frontend

```bash
cd soportech-panel
npm install
npm run dev
```

## Funcionalidades

- **Recepción de tickets vía WhatsApp** — los usuarios reportan incidentes conversando con Sofía (asistente AI)
- **Clasificación automática** — DeepSeek clasifica el tipo de incidente y asigna prioridad
- **Panel web** — dashboard con tickets activos, asignación a técnicos, historial de cambios
- **Autenticación** — JWT con roles (admin / técnico)
- **Notificaciones** — webhook a n8n para notificar cambios de estado por WhatsApp
- **Evidencias** — registro de comentarios y seguimiento por ticket

## Stack

- **Backend**: Spring Boot 3, Spring Security, Spring Data JPA, PostgreSQL, JWT
- **Frontend**: React 19, Vite, Tabler Icons
- **Automation**: n8n, DeepSeek API, Whapi.cloud
- **Infra**: Supabase (PostgreSQL)
