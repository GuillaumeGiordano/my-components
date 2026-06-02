<script lang="ts">
  import { browser } from "$app/environment";
  import { ArrowUp } from "@lucide/svelte";

  let visible = $state(false);

  $effect(() => {
    if (!browser) return;

    function onScroll() {
      visible = window.scrollY > 300;
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  });

  function scrollTop() {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
</script>

{#if visible}
  <button class="scroll-top" onclick={scrollTop} aria-label="Retour en haut de page">
    <ArrowUp size={18} />
  </button>
{/if}

<style>
  .scroll-top {
    width: 52px;
    height: 52px;
    border-radius: 50%;
    background: var(--primary);
    color: var(--primary-fg);
    border: none;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: var(--shadow-lg);
    transition:
      opacity var(--transition-fast),
      transform var(--transition-fast),
      background var(--transition-fast);
    animation: fade-in 0.2s ease both;
  }

  .scroll-top:hover {
    transform: translateY(-2px);
    background: var(--primary-hover, var(--primary));
  }

  @keyframes fade-in {
    from {
      opacity: 0;
      transform: translateY(8px);
    }
    to {
      opacity: 1;
      transform: none;
    }
  }
</style>
