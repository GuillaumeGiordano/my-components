<script lang="ts">
	import type { Snippet } from 'svelte';
	import { browser } from '$app/environment';

	let {
		children,
		colors = ['#6366f1','#ec4899','#f97316','#22c55e','#f59e0b','#06b6d4','#a855f7'],
		count  = 80,
		spread = 360,
	}: {
		children?: Snippet;
		colors?:   string[];
		count?:    number;
		/** Angle d'éparpillement en degrés (360 = tous sens) */
		spread?:   number;
	} = $props();

	type Particle = {
		x: number; y: number;
		vx: number; vy: number;
		color: string;
		rot: number; vr: number;
		w: number; h: number;
		life: number;
		shape: 'rect' | 'circle';
	};

	let btnEl:     HTMLButtonElement;
	let canvas:    HTMLCanvasElement | null = null;
	let ctx:       CanvasRenderingContext2D | null = null;
	let particles: Particle[] = [];
	let frame:     number;

	function launch() {
		if (!browser) return;

		if (!canvas) {
			canvas       = document.createElement('canvas');
			canvas.style.cssText = 'position:fixed;inset:0;width:100%;height:100%;pointer-events:none;z-index:9999';
			document.body.appendChild(canvas);
			ctx = canvas.getContext('2d')!;
		}
		canvas.width  = window.innerWidth;
		canvas.height = window.innerHeight;

		const rect    = btnEl.getBoundingClientRect();
		const cx      = rect.left + rect.width  / 2;
		const cy      = rect.top  + rect.height / 2;
		const spreadR = (spread / 2) * (Math.PI / 180);

		for (let i = 0; i < count; i++) {
			const angle = -Math.PI / 2 + (Math.random() - 0.5) * spreadR * 2;
			const spd   = 4 + Math.random() * 9;
			particles.push({
				x: cx, y: cy,
				vx: Math.cos(angle) * spd,
				vy: Math.sin(angle) * spd - 2,
				color: colors[Math.floor(Math.random() * colors.length)],
				rot: Math.random() * 360,
				vr: (Math.random() - 0.5) * 10,
				w:  5 + Math.random() * 8,
				h:  3 + Math.random() * 5,
				life: 1,
				shape: Math.random() > 0.7 ? 'circle' : 'rect',
			});
		}

		cancelAnimationFrame(frame);
		animate();
	}

	function animate() {
		if (!ctx || !canvas) return;
		ctx.clearRect(0, 0, canvas.width, canvas.height);

		for (let i = particles.length - 1; i >= 0; i--) {
			const p = particles[i];
			p.x   += p.vx; p.y += p.vy;
			p.vy  += 0.18;  // gravity
			p.vx  *= 0.99;
			p.rot += p.vr;
			p.life -= 0.014;

			if (p.life <= 0 || p.y > canvas.height + 20) { particles.splice(i, 1); continue; }

			ctx.save();
			ctx.translate(p.x, p.y);
			ctx.rotate(p.rot * Math.PI / 180);
			ctx.globalAlpha = Math.min(1, p.life * 1.8);
			ctx.fillStyle   = p.color;
			if (p.shape === 'circle') {
				ctx.beginPath();
				ctx.arc(0, 0, p.w / 2, 0, Math.PI * 2);
				ctx.fill();
			} else {
				ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
			}
			ctx.restore();
		}

		if (particles.length > 0) frame = requestAnimationFrame(animate);
		else ctx.clearRect(0, 0, canvas.width, canvas.height);
	}
</script>

<button class="cfb" bind:this={btnEl} onclick={launch}>
	{#if children}{@render children()}{/if}
</button>

<style>
	.cfb {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		gap: 8px;
		padding: 10px 24px;
		border-radius: var(--radius-md);
		border: none;
		background: var(--primary);
		color: var(--primary-fg);
		font-size: 14px;
		font-weight: 600;
		font-family: var(--font-sans);
		cursor: pointer;
		transition: background 150ms ease, transform 150ms ease;

		&:hover  { background: var(--primary-hover); transform: translateY(-1px); }
		&:active { transform: translateY(0); }
	}
</style>
