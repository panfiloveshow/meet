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

Create a `.env` file inside `apps/api` with your Zoom credentials:

```
ZOOM_CLIENT_ID=your_client_id
ZOOM_CLIENT_SECRET=your_client_secret
ZOOM_REDIRECT_URI=http://localhost:3001/zoom/callback
```

Install dependencies for the API and start the server:

```bash
cd apps/api
npm install
npm start
```

Install dependencies and run the web app (Tailwind is preconfigured):

```bash
cd apps/web
npm install
npm run dev
```

The API exposes endpoints to store users, meetings, transcripts and tasks. Zoom OAuth is stubbed via `/zoom/auth` and `/zoom/callback` routes. All data resides in memory and resets on restart.
