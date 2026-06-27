<script lang="ts">
  import { onMount } from "svelte";
  import { theme } from "$lib/theme.svelte";
  import Toaster from "$lib/components/ui/Toaster.svelte";

  import "../app.css";

  let { children } = $props();

  onMount(() => theme.init());
</script>

<div>
  {@render children()}
</div>

<Toaster />
