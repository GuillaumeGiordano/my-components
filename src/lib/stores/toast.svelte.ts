export type ToastVariant = 'success' | 'error' | 'warning' | 'info';

export type Toast = {
	id: string;
	variant: ToastVariant;
	message: string;
	title?: string;
	duration?: number; // ms, 0 = persistent
};

type ToastOptions = Partial<Pick<Toast, 'title' | 'duration'>>;

let toasts = $state<Toast[]>([]);

function add(variant: ToastVariant, message: string, opts: ToastOptions = {}): string {
	const id = crypto.randomUUID();
	const duration = opts.duration ?? 4000;
	toasts = [...toasts, { id, variant, message, title: opts.title, duration }];
	if (duration > 0) {
		setTimeout(() => remove(id), duration);
	}
	return id;
}

function remove(id: string) {
	toasts = toasts.filter((t) => t.id !== id);
}

export const toast = {
	get list() { return toasts; },
	success: (message: string, opts?: ToastOptions) => add('success', message, opts),
	error:   (message: string, opts?: ToastOptions) => add('error',   message, opts),
	warning: (message: string, opts?: ToastOptions) => add('warning', message, opts),
	info:    (message: string, opts?: ToastOptions) => add('info',    message, opts),
	remove,
};
