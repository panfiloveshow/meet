# Fathom Clone - Meeting Assistant

This repository contains a simplified architecture for a meeting assistant similar to [Fathom](https://fathom.video). The project is organized into multiple packages:

```
apps/
  api/    - Express based REST API
  web/    - React + Vite frontend
libs/
  ai/             - AI utilities (GPT, Whisper, etc.)
  integrations/   - Zoom/Google/Notion wrappers
  core/           - shared types and helpers
```

## Getting started

Install dependencies for the API and start the server. The API now requires a PostgreSQL database.

### Database setup

Create a PostgreSQL database and user. Then copy `.env.example` and adjust the connection variables:

```bash
cd apps/api
cp .env.example .env
```
The `.env` file should define variables like:

```
DB_HOST=localhost
DB_PORT=5432
DB_USER=<user>
DB_PASSWORD=<password>
DB_NAME=<database>
PORT=3001
```

Ensure a PostgreSQL instance is running and the credentials in `.env` are correct. After that install dependencies and start the server:

```bash
cd apps/api
npm install
npm start
```

Install dependencies and run the web app:

```bash
cd apps/web
npm install
npm run dev
```

The API exposes CRUD endpoints backed by PostgreSQL to store users, meetings and transcripts.
