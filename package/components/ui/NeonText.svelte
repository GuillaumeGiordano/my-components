<script lang="ts">
	let {
		text,
		color   = 'var(--primary)',
		flicker = true,
		size    = 'inherit' as string | number,
	}: {
		text:     string;
		color?:   string;
		flicker?: boolean;
		size?:    string | number;
	} = $props();

	const fontSize = typeof size === 'number' ? `${size}px` : size;
</script>

<span
	class="nt"
	class:nt--flicker={flicker}
	style="color:{color};--nt-c:{color};font-size:{fontSize}"
>
	{text}
</span>

<style>
	.nt {
		display: inline-block;
		text-shadow:
			0 0 4px  #fff,
			0 0 8px  var(--nt-c),
			0 0 18px var(--nt-c),
			0 0 38px var(--nt-c),
			0 0 70px var(--nt-c);
		animation: nt-pulse 2.5s ease-in-out infinite alternate;
	}

	.nt--flicker {
		animation: nt-flicker 4s linear infinite;
	}

	@keyframes nt-pulse {
		from { text-shadow: 0 0 4px #fff, 0 0 8px var(--nt-c), 0 0 18px var(--nt-c); }
		to   { text-shadow: 0 0 4px #fff, 0 0 12px var(--nt-c), 0 0 30px var(--nt-c), 0 0 60px var(--nt-c), 0 0 100px var(--nt-c); }
	}

	@keyframes nt-flicker {
		0%, 18%, 20%, 50.1%, 60%, 65.1%, 80%, 90.1%, 92% {
			text-shadow: 0 0 4px #fff, 0 0 10px var(--nt-c), 0 0 22px var(--nt-c), 0 0 50px var(--nt-c);
		}
		19%, 21%, 50%, 60.5%, 65%, 80.1%, 90%, 92.1% {
			text-shadow: none;
			color: color-mix(in srgb, var(--nt-c) 50%, transparent);
		}
	}
</style>
