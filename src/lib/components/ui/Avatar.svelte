<script lang="ts">
  type Size = "xs" | "sm" | "md" | "lg" | "xl";

  let {
    src,
    alt = "",
    name = "",
    size = "md",
    shape = "circle",
  }: {
    src?: string;
    alt?: string;
    name?: string;
    size?: Size;
    shape?: "circle" | "square";
  } = $props();

  function initials(n: string) {
    return n
      .split(" ")
      .slice(0, 2)
      .map((w) => w[0]?.toUpperCase() ?? "")
      .join("");
  }

  // deterministic color from name
  const colors = [
    ["#dbeafe", "#1d4ed8"],
    ["#dcfce7", "#15803d"],
    ["#fef9c3", "#a16207"],
    ["#fce7f3", "#be185d"],
    ["#ede9fe", "#7c3aed"],
    ["#ffedd5", "#c2410c"],
  ];
  const colorIndex = name
    .split("")
    .reduce((acc, c) => acc + c.charCodeAt(0), 0) % colors.length;
  const [bg, fg] = colors[colorIndex];
</script>

<span class="avatar size-{size} shape-{shape}" style="--av-bg:{bg};--av-fg:{fg}">
  {#if src}
    <img {src} {alt} class="avatar-img" />
  {:else}
    <span class="avatar-initials">{initials(name)}</span>
  {/if}
</span>

<style>
  .avatar {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    background: var(--av-bg, var(--bg-muted));
    color: var(--av-fg, var(--text-muted));
    font-family: var(--font-sans);
    font-weight: 600;
    flex-shrink: 0;
    overflow: hidden;
  }

  .shape-circle { border-radius: 50%; }
  .shape-square { border-radius: var(--radius-md); }

  .size-xs { width: 24px; height: 24px; font-size: 10px; }
  .size-sm { width: 32px; height: 32px; font-size: 12px; }
  .size-md { width: 40px; height: 40px; font-size: 14px; }
  .size-lg { width: 56px; height: 56px; font-size: 18px; }
  .size-xl { width: 72px; height: 72px; font-size: 24px; }

  .avatar-img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .avatar-initials {
    line-height: 1;
    user-select: none;
  }
</style>
