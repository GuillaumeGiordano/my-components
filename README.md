# sv

Everything you need to build a Svelte project, powered by [`sv`](https://github.com/sveltejs/cli).

## Creating a project

If you're seeing this, you've probably already done this step. Congrats!

```sh
# create a new project
npx sv create my-app
```

To recreate this project with the same configuration:

```sh
# recreate this project
npx sv@0.15.0 create --template minimal --types ts --install npm .
```

## Developing

Once you've created a project and installed dependencies with `npm install` (or `pnpm install` or `yarn`), start a development server:

```sh
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

## Building

To create a production version of your app:

```sh
npm run build
```

You can preview the production build with `npm run preview`.

> To deploy your app, you may need to install an [adapter](https://svelte.dev/docs/kit/adapters) for your target environment.

# 1. Dans my-components — builder + versionner + pousser

cd "C:\Users\guigo\Projet Web\my-components"
npm run package
npm version patch
git push origin main --tags

# 2. Dans le projet consommateur — réinstaller

cd "C:\Users\guigo\Projet Web\test_project_my_component\crevettes-shop"
npm install github:GuillaumeGiordano/my-components

▎ Le npm version patch fait deux choses en une : il bumpe la version dans package.json et crée le git tag
▎ automatiquement. Le git push --tags pousse les deux (commit + tag).

Si tu n'as pas besoin de versionner à chaque itération (phase de dev active), tu peux simplifier à :

# my-components

pnpm run package && git add -A && git commit -m "add new components" && git push

# crevettes-shop

npm install github:GuillaumeGiordano/my-components

Le workflow mis en place

- my-components (GitHub) → librairie de composants versionnée, avec le dossier package/ commité pour les installs
  GitHub
- AquaShrimp (GitHub) → projet SvelteKit déployé sur Vercel, mis à jour automatiquement à chaque push sur main

Pour la suite, si tu modifies un composant dans my-components :

# Dans my-components

npm run package
git add -A && git commit -m "..." && git push

# Dans AquaShrimp (pour récupérer la nouvelle version)

pnpm install github:GuillaumeGiordano/my-components
git add pnpm-lock.yaml && git commit -m "chore: update @guillaumeg/ui" && git push
Vercel redéploie automatiquement dès que tu pushes sur main.
