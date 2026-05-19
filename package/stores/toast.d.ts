export type ToastVariant = 'success' | 'error' | 'warning' | 'info';
export type Toast = {
    id: string;
    variant: ToastVariant;
    message: string;
    title?: string;
    duration?: number;
};
type ToastOptions = Partial<Pick<Toast, 'title' | 'duration'>>;
export declare const toast: {
    subscribe: (this: void, run: import("svelte/store").Subscriber<Toast[]>, invalidate?: () => void) => import("svelte/store").Unsubscriber;
    success: (message: string, opts?: ToastOptions) => string;
    error: (message: string, opts?: ToastOptions) => string;
    warning: (message: string, opts?: ToastOptions) => string;
    info: (message: string, opts?: ToastOptions) => string;
    remove: (id: string) => void;
};
export {};
