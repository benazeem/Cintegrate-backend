# Cintegrate Backend

> Backend API powering **Cintegrate** — an AI-assisted video creation platform that transforms ideas into structured video projects through stories, scenes, narration, media assets, and rendering workflows.

## Overview

Cintegrate Backend provides the core infrastructure for the Cintegrate platform.

It manages authentication, projects, stories, scenes, narration, media assets, user accounts, credits, and video configuration while exposing a REST API consumed by the frontend application.

The backend is designed around a modular architecture so new AI providers, rendering pipelines, storage services, and media generation workflows can be integrated without major changes.

---

## Part of the Cintegrate Ecosystem

- **Frontend:** React application for creators
- **Backend:** REST API (this repository)
- **Database:** MongoDB
- **Storage:** AWS S3 compatible storage
- **Media Processing:** FFmpeg + Sharp

Frontend Repository

https://github.com/benazeem/Cintegrate-frontend

---

# Features

### Authentication

- Secure authentication
- JWT access & refresh tokens
- Cookie-based sessions
- Account verification
- Password reset
- Session management

---

### Project Management

- Create projects
- Update project metadata
- Organize creative workspaces
- Bookmark projects

---

### Story Pipeline

Create structured video scripts.

Each project can contain:

- Stories
- Context Profiles
- Scenes
- Narrations
- Audio Assets
- Scene Assets
- Video Configuration

---

### Scene Management

Manage video scenes independently.

Supports:

- Scene ordering
- Scene updates
- Ownership validation
- Asset linking

---

### Narration

Manage narration data for generated videos.

Supports:

- Narration profiles
- Voice configuration
- Timing metadata

---

### Media Assets

Supports media asset management including:

- Uploads
- Storage
- Image processing
- Audio assets
- Scene assets

---

### Video Configuration

Store rendering preferences such as:

- Resolution
- Aspect Ratio
- Output configuration

---

### Credits & Plans

Infrastructure for:

- Credits
- Plans
- Capability overrides
- Pricing configuration

---

## Security

The backend includes multiple security layers.

- JWT Authentication
- HTTP-only Cookies
- CSRF Protection
- Helmet
- CORS Configuration
- Password Hashing (bcrypt)
- Input Validation (Zod)
- Ownership Validation Middleware

---

## Technology Stack

### Runtime

- Node.js
- Express

### Database

- MongoDB
- Mongoose

### Validation

- Zod

### Authentication

- JWT
- bcrypt
- Cookie Parser

### Media

- FFmpeg
- Sharp

### Storage

- AWS S3 SDK

### Logging

- Pino

### Email

- Nodemailer

---

# Project Structure

```
src/

├── config/
├── constants/
├── db/
├── middleware/
├── models/
├── modules/
├── routes/
├── shared/
├── types/
├── utils/
├── validation/
├── validators/
└── server.ts
```

The application follows a modular architecture where every feature owns its routes, controllers, services, validation, and business logic.

---

# Local Development

## Requirements

- Node.js
- MongoDB
- npm
- Docker (optional)

---

Install dependencies

```bash
npm install
```

Copy environment variables

```bash
cp example.env .env
```

Run development server

```bash
npm run dev
```

---

## Docker

Development

```bash
docker compose -f docker-compose.dev.yml up
```

Production

```bash
docker compose -f docker-compose.prod.yml up
```

---

## Current Modules

- Authentication
- User
- Projects
- Stories
- Context Profiles
- Scenes
- Narration
- Audio
- Scene Assets
- Video Configuration
- Credits
- Plans
- Sessions

---

## Roadmap

- AI provider integrations
- Automated story generation
- Scene generation pipelines
- AI narration providers
- Image generation providers
- Video rendering pipeline
- Background job processing
- Webhooks
- Plugin architecture
- Public API
- SDK

---

## Status

🚧 Active Development

Cintegrate is currently under active development and the architecture continues to evolve as new AI workflows and media generation capabilities are added.

---

## Contributing

Contributions, discussions, bug reports, and feature requests are welcome.

If you'd like to contribute, please open an issue before submitting major changes.

---

## License

MIT License
