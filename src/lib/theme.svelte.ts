// Theme store — persists preference in localStorage, applies .dark class on <html>

type Theme = 'light' | 'dark';

function createTheme() {
	// $state is reactive — reading it in a $derived or template is tracked
	let current = $state<Theme>('light');

	function init() {
		// Read stored preference, fallback to system preference
		const stored = localStorage.getItem('theme') as Theme | null;
		const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
		current = stored ?? (prefersDark ? 'dark' : 'light');
		apply(current);
	}

	function apply(theme: Theme) {
		if (theme === 'dark') {
			document.documentElement.classList.add('dark');
		} else {
			document.documentElement.classList.remove('dark');
		}
	}

	function toggle() {
		current = current === 'light' ? 'dark' : 'light';
		localStorage.setItem('theme', current);
		apply(current);
	}

	return {
		get current() {
			return current;
		},
		get isDark() {
			return current === 'dark';
		},
		init,
		toggle
	};
}

export const theme = createTheme();
