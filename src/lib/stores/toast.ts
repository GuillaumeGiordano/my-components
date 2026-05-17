import { writable } from 'svelte/store';

export type ToastVariant = 'success' | 'error' | 'warning' | 'info';

export type Toast = {
	id: string;
	variant: ToastVariant;
	message: string;
	title?: string;
	duration?: number; // ms, 0 = persistent
};

type ToastOptions = Partial<Pick<Toast, 'title' | 'duration'>>;

function createToastStore() {
	const { subscribe, update } = writable<Toast[]>([]);

	function add(variant: ToastVariant, message: string, opts: ToastOptions = {}): string {
		const id = crypto.randomUUID();
		const duration = opts.duration ?? 4000;
		update((list) => [...list, { id, variant, message, title: opts.title, duration }]);
		if (duration > 0) {
			setTimeout(() => remove(id), duration);
		}
		return id;
	}

	function remove(id: string) {
		update((list) => list.filter((t) => t.id !== id));
	}

	return {
		subscribe,
		success: (message: string, opts?: ToastOptions) => add('success', message, opts),
		error: (message: string, opts?: ToastOptions) => add('error', message, opts),
		warning: (message: string, opts?: ToastOptions) => add('warning', message, opts),
		info: (message: string, opts?: ToastOptions) => add('info', message, opts),
		remove,
	};
}

export const toast = createToastStore();
