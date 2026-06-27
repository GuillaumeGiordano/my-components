import type { Handle } from "@sveltejs/kit";
// Direct module import (not the `$lib` barrel) to avoid pulling every component
// into the server bundle. Consumers import it from "@guillaumeg/ui" instead.
import { THEME_INIT_SCRIPT } from "$lib/theme.svelte";

// Inject the theme anti-flash script into <head> in place of the %theme.init%
// placeholder in app.html. Keeps a single source of truth (THEME_INIT_SCRIPT)
// instead of a hand-written inline copy.
export const handle: Handle = async ({ event, resolve }) =>
  resolve(event, {
    transformPageChunk: ({ html }) =>
      html.replace("%theme.init%", `<script>${THEME_INIT_SCRIPT}</script>`),
  });
