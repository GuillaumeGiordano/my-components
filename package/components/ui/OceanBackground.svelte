<script lang="ts">
	import type { Snippet } from 'svelte';
	import { onMount, onDestroy } from 'svelte';
	import { browser } from '$app/environment';

	const DEPTH_BG: Record<string, string> = {
		shallow: 'linear-gradient(to bottom, #0e7490 0%, #0c4a6e 55%, #083255 100%)',
		deep:    'linear-gradient(to bottom, #0c4a6e 0%, #082f49 55%, #0c1a35 100%)',
		abyss:   'linear-gradient(to bottom, #041020 0%, #020d18 55%, #010608 100%)',
	};

	let {
		children,
		depth          = 'deep' as 'shallow' | 'deep' | 'abyss',
		background,
		particleCount  = 50,
		enableRays     = true,
		enableCaustics = true,
	}: {
		children?:        Snippet;
		/** Profondeur prédéfinie — ignorée si background est fourni */
		depth?:           'shallow' | 'deep' | 'abyss';
		/** Surcharge complète du fond */
		background?:      string;
		particleCount?:   number;
		enableRays?:      boolean;
		enableCaustics?:  boolean;
	} = $props();

	const bg = $derived(background ?? DEPTH_BG[depth]);

	// Intensité des caustiques selon la profondeur
	const causticAlphaMax = $derived(
		depth === 'shallow' ? 0.22 :
		depth === 'deep'    ? 0.13 :
		                      0.05
	);

	type Particle = { x: number; y: number; r: number; vx: number; vy: number; bubble: boolean };

	let wrapEl:    HTMLDivElement;
	let canvas:    HTMLCanvasElement;
	let ctx:       CanvasRenderingContext2D;
	let particles: Particle[] = [];
	let animFrame: number;
	let W = 0, H = 0;
	let ro:        ResizeObserver;
	let t = 0;

	function mkParticle(scatter = false): Particle {
		const bubble = Math.random() > 0.4;
		return {
			x:      Math.random() * W,
			y:      scatter ? Math.random() * H : H + Math.random() * 60,
			r:      bubble ? (1.5 + Math.random() * 5) : (0.4 + Math.random() * 1.5),
			vx:     (Math.random() - 0.5) * 0.35,
			vy:     -(0.12 + Math.random() * 0.45),
			bubble,
		};
	}

	function init() {
		W = canvas.width  = wrapEl.offsetWidth;
		H = canvas.height = wrapEl.offsetHeight;
		particles = Array.from({ length: particleCount }, (_, i) =>
			mkParticle(i < particleCount * 0.8)
		);
	}

	// ── Rayons lumineux depuis la surface ─────────────────────────────────────
	function drawRays() {
		const count = 7;
		for (let i = 0; i < count; i++) {
			const baseX = W * (0.05 + (i / (count - 1)) * 0.9);
			const cx    = baseX + Math.sin(t * 0.35 + i * 1.7) * W * 0.04;
			const topW  = 6 + Math.sin(t * 0.2 + i) * 3;
			const botW  = W * 0.11 + Math.sin(t * 0.25 + i * 1.3) * W * 0.025;
			const alpha = 0.025 + Math.abs(Math.sin(t * 0.45 + i * 0.8)) * 0.04;

			const grad = ctx.createLinearGradient(0, 0, 0, H);
			grad.addColorStop(0,   `rgba(100, 210, 255, ${alpha})`);
			grad.addColorStop(0.6, `rgba(40, 140, 200, ${alpha * 0.35})`);
			grad.addColorStop(1,   'rgba(0, 0, 0, 0)');

			ctx.beginPath();
			ctx.moveTo(cx - topW, 0);
			ctx.lineTo(cx - botW, H);
			ctx.lineTo(cx + botW, H);
			ctx.lineTo(cx + topW, 0);
			ctx.fillStyle = grad;
			ctx.fill();
		}
	}

	// ── Caustiques — interférence de sinusoïdes projetée en spots lumineux ────
	function drawCaustics() {
		const step = 38;
		ctx.save();

		for (let gx = 0; gx <= W + step; gx += step) {
			for (let gy = 0; gy <= H * 0.72; gy += step) {
				// Interférence de trois ondes
				const v =
					Math.sin(gx * 0.026 + t * 1.15) *
					Math.sin(gy * 0.033 - t * 0.88) *
					Math.sin((gx - gy * 0.6) * 0.019 + t * 0.72);

				if (v > 0.38) {
					const r  = step * 0.56 * v;
					const a  = (v - 0.38) / 0.62 * causticAlphaMax;
					// Légère dérive pour l'effet ondulant
					const jx = gx + Math.sin(gy * 0.055 + t * 0.9) * 5;
					const jy = gy + Math.sin(gx * 0.042 - t * 0.7) * 4;

					ctx.globalAlpha = a;
					ctx.beginPath();
					ctx.arc(jx, jy, r, 0, Math.PI * 2);
					ctx.fillStyle = '#78e8ff';
					ctx.fill();
				}
			}
		}

		ctx.restore();
	}

	// ── Particules — bulles + débris ──────────────────────────────────────────
	function drawParticles() {
		for (const p of particles) {
			p.x += p.vx;
			p.y += p.vy;
			p.vx += (Math.random() - 0.5) * 0.018;
			p.vx  = Math.max(-0.6, Math.min(0.6, p.vx));

			if (p.y + p.r < 0) {
				const np = mkParticle(false);
				p.x = np.x; p.y = np.y; p.r = np.r; p.vx = np.vx; p.vy = np.vy;
			}

			if (p.bubble) {
				ctx.globalAlpha = 0.12 + Math.sin(t * 2.2 + p.x * 0.05) * 0.04;
				ctx.beginPath();
				ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
				ctx.strokeStyle = '#a0e8ff';
				ctx.lineWidth   = 0.8;
				ctx.stroke();
				// Reflet spéculaire
				ctx.beginPath();
				ctx.arc(p.x - p.r * 0.3, p.y - p.r * 0.3, p.r * 0.22, 0, Math.PI * 2);
				ctx.fillStyle   = '#ffffff';
				ctx.globalAlpha = 0.18;
				ctx.fill();
			} else {
				ctx.globalAlpha = 0.25;
				ctx.beginPath();
				ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
				ctx.fillStyle = '#6dd8ff';
				ctx.fill();
			}
		}

		ctx.globalAlpha = 1;
	}

	function draw() {
		t += 0.008;
		ctx.clearRect(0, 0, W, H);
		if (enableRays)     drawRays();
		if (enableCaustics) drawCaustics();
		drawParticles();
		animFrame = requestAnimationFrame(draw);
	}

	onMount(() => {
		ctx = canvas.getContext('2d')!;
		init();
		animFrame = requestAnimationFrame(draw);
		ro = new ResizeObserver(init);
		ro.observe(wrapEl);
	});

	onDestroy(() => {
		if (!browser) return;
		cancelAnimationFrame(animFrame);
		ro?.disconnect();
	});
</script>

<div class="ocean" bind:this={wrapEl} style="background:{bg}">
	<canvas bind:this={canvas} class="ocean-canvas" aria-hidden="true"></canvas>
	{#if children}
		<div class="ocean-content">{@render children()}</div>
	{/if}
</div>

<style>
	.ocean         { position: relative; overflow: hidden; }
	.ocean-canvas  { position: absolute; inset: 0; width: 100%; height: 100%; pointer-events: none; }
	.ocean-content { position: relative; z-index: 1; }
</style>
