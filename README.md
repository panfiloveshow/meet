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

Install dependencies for the API and start the server:

```bash
cd apps/api
npm install
npm start
```

Install dependencies and run the web app:

```bash
cd apps/web
npm install
echo "VITE_API_URL=http://localhost:3001" > .env
npm run dev
```

The API exposes basic endpoints to store users, meetings and transcripts. These are temporary in-memory stores meant as a starting point for development.
