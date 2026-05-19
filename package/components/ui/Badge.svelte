<script lang="ts">
  type Variant = "default" | "primary" | "success" | "warning" | "danger" | "info";
  type Size = "sm" | "md";

  let {
    label,
    variant = "default",
    size = "md",
    dot = false,
  }: {
    label: string;
    variant?: Variant;
    size?: Size;
    dot?: boolean;
  } = $props();
</script>

<span class="badge variant-{variant} size-{size}">
  {#if dot}<span class="dot"></span>{/if}
  {label}
</span>

<style>
  .badge {
    display: inline-flex;
    align-items: center;
    gap: 5px;
    font-family: var(--font-sans);
    font-weight: 500;
    border-radius: 999px;
    border: 1px solid transparent;
    white-space: nowrap;
  }

  .size-sm { padding: 1px 8px; font-size: 11px; }
  .size-md { padding: 2px 10px; font-size: 12px; }

  .dot {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    flex-shrink: 0;
    background: currentColor;
  }

  .variant-default {
    background: var(--bg-hover);
    color: var(--text-muted);
    border-color: var(--border);
  }
  .variant-primary {
    background: var(--primary-subtle);
    color: var(--primary);
    border-color: color-mix(in srgb, var(--primary) 30%, transparent);
  }
  .variant-success {
    background: #f0fdf4;
    color: #16a34a;
    border-color: #bbf7d0;
  }
  .variant-warning {
    background: #fffbeb;
    color: #d97706;
    border-color: #fde68a;
  }
  .variant-danger {
    background: #fef2f2;
    color: #dc2626;
    border-color: #fecaca;
  }
  .variant-info {
    background: #eff6ff;
    color: #2563eb;
    border-color: #bfdbfe;
  }
</style>
