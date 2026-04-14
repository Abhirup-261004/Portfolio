# Portfolio Template App

This is a full-stack portfolio starter built with:

- React + Vite on the frontend
- Node.js + Express on the backend
- A simple API that serves your portfolio content

## Project structure

- `client/` React app
- `server/` Node backend

## Getting started

1. Install dependencies:

```bash
npm install
```

2. Add your environment variables:

```bash
cp .env.example .env
```

3. Start the backend:

```bash
npm run dev:server
```

4. Start the frontend in another terminal:

```bash
npm run dev:client
```

Or run both together:

```bash
npm run dev
```

## Production build

Build the frontend and serve it from the Express backend:

```bash
npm run build:all
npm run start
```

The backend will serve:

- API routes from `/api/*`
- project images from `/images/*`
- the built React app from `client/dist`

## Deployment

This repo now includes [render.yaml](/Users/abhirupnandi/Documents/New%20project/render.yaml) for deploying as a single Node web service on Render.

## Split deployment

If you want the backend on Render and the frontend on Vercel:

1. Deploy the `server/` folder on Render as a Node web service.
2. Copy the Render backend URL.
3. Open [client/vercel.json](/Users/abhirupnandi/Documents/New%20project/client/vercel.json).
4. Replace `https://YOUR-RENDER-BACKEND.onrender.com` with your actual Render backend URL.
5. Deploy the `client/` folder on Vercel as a Vite project.

The Vercel rewrites will forward:

- `/api/*` to your Render backend
- `/images/*` to your Render backend

## Where to edit your content

Update the portfolio data in:

- `server/src/data/portfolio.js`

## API

- `GET /api/portfolio`

The frontend fetches content from the backend, and the backend currently serves the portfolio data from the local source file.
