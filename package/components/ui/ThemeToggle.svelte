<script lang="ts">
	import { Sun, Moon } from '@lucide/svelte';
	import { theme } from '../../theme.svelte';
	import Button from '../buttons/Button.svelte';
</script>

<Button
	variant="secondary"
	icon={theme.isDark ? Sun : Moon}
	onclick={theme.toggle}
	aria-label={theme.isDark ? 'Passer en mode clair' : 'Passer en mode sombre'}
/>
