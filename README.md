# Treino Musical

Responsive web app to practice reading piano sheet music for treble and bass clefs. Built with React, Vite and Tailwind CSS in a neomorphic style.

## Setup

```bash
npm install
npm run dev
```

If starting from scratch:

```bash
npm create vite@latest treino-musical -- --template react
cd treino-musical
npm i -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
# configure content paths; add @tailwind directives to index.css
npm run dev
```

## TODO
- Timed sessions
- Per-note analytics
- Lines-vs-spaces drill
- Interval mode
