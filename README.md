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

pnpm run package && git add -A && git commit -m "maj" && git push origin main

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

# Exemple

git add -A && git commit -m "build: drop prepare script so git installs use the prebuilt package" && git tag v0.3.1 && git push origin main && git push origin v0.3.1

1. Publier la lib

Dans my-components (ton répertoire courant) :

git add -A
git commit -m "chore(release): v0.3.0"
git tag v0.3.0
git push origin main
git push origin v0.3.0

Vérifie ensuite que le tag est bien en ligne :
git ls-remote --tags origin v0.3.0

2. Épingler chaque projet au tag

pnpm add réécrit la ligne de dépendance et réinstalle en une commande. Lance, projet par projet :

cd "C:\Users\guigo\Projet Web\test_project_my_component\crevettes-shop"; pnpm add github:GuillaumeGiordano/my-components#v0.3.0
cd "C:\Users\guigo\Projet Web\test_project_my_component\devis-generator"; pnpm add github:GuillaumeGiordano/my-components#v0.3.0
cd "C:\Users\guigo\Projet Web\test_project_my_component\g2-erp"; pnpm add github:GuillaumeGiordano/my-components#v0.3.0
cd "C:\Users\guigo\Projet Web\test_project_my_component\g2-webdev"; pnpm add github:GuillaumeGiordano/my-components#v0.3.0

Après chaque install, la dépendance dans le package.json doit afficher ...my-components#v0.3.0.

Points à connaître

- Ordre obligatoire : push du tag avant le pnpm add des projets — sinon l'install échoue (le tag n'existe pas encore côté GitHub).
- git push origin main suffit pour la branche par défaut ; le master distant est obsolète. Tu peux nettoyer la ref périmée quand tu veux : git remote prune origin.
- Mises à jour futures : quand tu publieras v0.4.0, il suffira de relancer le pnpm add ...#v0.4.0 dans chaque projet (ou éditer la ligne puis pnpm install). Tant que la version est figée
  sur un tag, rien ne bouge tout seul — c'est l'intérêt.
- Si un pnpm add semble servir une version en cache, force le rafraîchissement : pnpm add github:GuillaumeGiordano/my-components#v0.3.0 --force.
