// Generates unique IDs for form fields — works in both SSR and browser
let count = 0;
export function uniqueId(prefix = 'field'): string {
	return `${prefix}-${++count}`;
}
