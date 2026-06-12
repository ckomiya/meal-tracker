# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Documentación obligatoria

Antes de generar o modificar cualquier código, Claude Code debe consultar SIEMPRE primero el archivo de documentación relevante dentro del directorio `/docs`. El código generado debe seguir los estándares definidos en esos documentos:

- `docs/ui.md` — estándares para todo lo relacionado con la interfaz de usuario.
- `docs/data-fetching.md` — estándares para la obtención de datos y consultas a la base de datos.
- `docs/data-mutations.md` — estándares para mutaciones de datos mediante Server Actions.
- `docs/auth.md` — estándares para la autenticación de la aplicación.

## Project Status

This is a Next.js app freshly bootstrapped with `create-next-app` (App Router, TypeScript, Tailwind CSS). No custom features have been implemented yet — `src/app/page.tsx` still contains the default starter page.

## Commands

- `npm run dev` — start the dev server (http://localhost:3000)
- `npm run build` — production build
- `npm run start` — run the production build
- `npm run lint` — run ESLint

There is currently no test runner configured.

## Architecture

- **Framework**: Next.js 16 (App Router) with React 19 and TypeScript (strict mode).
- **Styling**: Tailwind CSS v4 via `@tailwindcss/postcss`.
- **Path alias**: `@/*` maps to `./src/*` (see `tsconfig.json`).
- **App structure**: `src/app/` holds route segments — `layout.tsx` is the root layout, `page.tsx` is the home route, `globals.css` contains global styles.
