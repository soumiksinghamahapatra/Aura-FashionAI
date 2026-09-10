# Deployment Guide for Aura AI Stylist

You can deploy the complete website, backend, and database using any of the following options.

---

## Option 1: Docker / Docker Compose (Any VPS / Cloud Server)

This is the most flexible option for deploying to DigitalOcean, AWS, Hetzner, Linode, or any Linux server.

### 1. Transfer files to your server
```bash
# Clone or upload your repository folder to your server
git clone <your-repo-url>
cd <repo-folder>
```

### 2. Run with Docker Compose
```bash
docker compose up -d --build
```

The website will be live at `http://<your-server-ip>:3000`.

- Data is automatically persisted in Docker volumes (`aura-db` and `aura-uploads`).
- To add a custom domain and SSL, configure Nginx or Caddy as a reverse proxy to port `3000`.

---

## Option 2: Render.com (Simple & Managed)

1. Push your code to a GitHub or GitLab repository.
2. Go to [render.com](https://render.com) and click **New → Blueprint**.
3. Select your repository. Render will detect `render.yaml` automatically.
4. Set your environment variables in the dashboard:
   - `JWT_SECRET`: (generated automatically)
   - `GEMINI_API_KEY` or `OPENAI_API_KEY`: *(Optional)*
5. Click **Apply**. Your app will deploy with a free SSL domain (e.g., `https://aura-stylist.onrender.com`).

---

## Option 3: Railway.app

1. Go to [railway.app](https://railway.app) and create a **New Project**.
2. Select **Deploy from GitHub repo** and choose this repository.
3. In project settings:
   - Railway will automatically detect the [`Procfile`](./Procfile) (`web: node server/index.js`).
   - Add a volume mount (Mount path: `/app/uploads`) to persist uploaded photos.
   - Set environment variable: `PORT=3000`.
4. Click **Deploy**. Generate a public domain under Settings → Domains.

---

## Option 4: Deploying to Supabase Cloud + Static Host (Vercel / Netlify)

If you prefer to host the database on Supabase Cloud and the frontend on Vercel:

1. **Database**:
   - Go to [supabase.com](https://supabase.com) and create a new project.
   - Open the **SQL Editor** and run the entire script in [`server/db/schema.sql`](./server/db/schema.sql).
2. **Frontend Config**:
   - In [`config.js`](./config.js), set:
     ```javascript
     window.__SUPABASE_URL__ = "https://<your-project-ref>.supabase.co";
     window.__SUPABASE_ANON_KEY__ = "<your-supabase-anon-key>";
     ```
3. **Deploy Frontend**:
   - Deploy this folder directly to [Vercel](https://vercel.com) using the included [`vercel.json`](./vercel.json).
