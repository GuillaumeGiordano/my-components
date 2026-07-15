import type { Handle } from "@sveltejs/kit";
// Direct module import (not the `$lib` barrel) to avoid pulling every component
// into the server bundle. The showroom uses the full studio script because it
// previews all themes at runtime; consumer apps use the slim THEME_INIT_SCRIPT.
import { THEME_STUDIO_INIT_SCRIPT } from "$lib/themes/studio.svelte";

// Inject the theme anti-flash script into <head> in place of the %theme.init%
// placeholder in app.html. Keeps a single source of truth instead of a
// hand-written inline copy.
export const handle: Handle = async ({ event, resolve }) =>
  resolve(event, {
    transformPageChunk: ({ html }) =>
      html.replace("%theme.init%", `<script>${THEME_STUDIO_INIT_SCRIPT}</script>`),
  });
