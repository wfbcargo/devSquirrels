# devSquirrels

A small graphics experiment: procedurally-drawn cartoon squirrels (shades included)
rendered with [PixiJS](https://pixijs.com/) inside React.

Each squirrel is built entirely from PixiJS primitives — no sprite sheets. The body,
head, ears, eyes, arms, legs, tail, and sunglasses are separate components composed
together (`src/components/animation/`), and their proportions are driven by a single
set of base dimensions in `src/definitions/DevSquirrelBaseDimensions.ts`. Because
everything is parametric, the same squirrel can be stamped out at any `scale`, which
is how the scene renders a whole row of them over a forest background.

## Stack

- **React 19** + **TypeScript**
- **PixiJS 8** via **@pixi/react** (`extend` + declarative `<pixiContainer>` / `<pixiSprite>`)
- **Vite** for dev/build

## Run it

```bash
npm install
npm run dev      # http://localhost:5173
```

Other scripts:

```bash
npm run build    # type-check + production build
npm run preview  # serve the production build
npm run lint     # eslint
```

## Layout

```
src/
  App.tsx                              Mounts the Pixi <Application>
  components/
    animationFrame.tsx                 Loads the background, lays out the squirrels
    animation/                         The squirrel, part by part (body, head, tail, shades, …)
  definitions/
    DevSquirrelBaseDimensions.ts       Colors + proportions every part reads from
  assets/                              Background art (forest, night club)
```

## Status

A personal sandbox for playing with procedural drawing and the @pixi/react bindings —
not a polished product. Have a poke around the `animation/` components to see how the
squirrel is assembled.
