<<<<<<< HEAD
# sv

Everything you need to build a Svelte project, powered by [`sv`](https://github.com/sveltejs/cli).

## Creating a project

If you're seeing this, you've probably already done this step. Congrats!

```bash
# create a new project in the current directory
npx sv create

# create a new project in my-app
npx sv create my-app
```

## Developing

Once you've created a project and installed dependencies with `npm install` (or `pnpm install` or `yarn`), start a development server:

```bash
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

## Building

To create a production version of your app:

```bash
npm run build
```
=======
# Kekay Bundles — Hexagonal Architecture SvelteKit App

This project is a modern inventory & product bundling web app built with **SvelteKit**, using a clean **Hexagonal (Ports & Adapters)** architecture.

It integrates with:
- 🗄️ PostgreSQL (via Drizzle ORM)
- ☁️ Cloudinary (image uploads)
- 🔒 Secure Argon2 authentication
- 🎯 Modular domain logic

---

## 🧱 Folder Structure

```bash
src/
├── lib/
│   ├── core/                     # Business logic (pure, framework-agnostic)
│   │   ├── domain/entities/      # Product, Bundle, User, etc.
│   │   ├── ports/                # Interfaces (DB, Auth, Cloud, etc.)
│   │   └── use-cases/            # Business logic (register user, add product)
│   │
│   ├── infrastructure/           # Implementations of ports
│   │   ├── db/drizzle/           # Drizzle ORM + schema + repositories
│   │   └── auth/                 # SessionManager, Argon password hasher
│   │
│   ├── adapters/                 # External 3rd-party clients (e.g. Cloudinary)
│   └── shared/                   # (Optional) shared logic/helpers (e.g. config, utils)
│
├── routes/                       # SvelteKit UI layer
```
🧠 Hexagonal Principles Applied
✅ Core is pure — no direct import of SvelteKit, Drizzle, or Cloudinary

✅ Use-cases are testable — they only depend on ports

✅ Adapters are swappable — just implement the ports

✅ Domain-driven — entities are clean and well-typed

📦 Tech Stack
Frontend: SvelteKit (Svelte 5, Runes)

Backend: PostgreSQL via Drizzle ORM

Auth: Argon2 + Session Cookies

Image Upload: Cloudinary

Hosting: Vercel / SSR compatible

🚧 Coming Next
Check out the GitHub issues to see what’s being worked on.

✨ Author
Made with 💪 by Kevin Coto
@thekoto.dev
>>>>>>> bundles/master

You can preview the production build with `npm run preview`.

> To deploy your app, you may need to install an [adapter](https://svelte.dev/docs/kit/adapters) for your target environment.
