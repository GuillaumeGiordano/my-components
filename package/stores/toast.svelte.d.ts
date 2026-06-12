export type ToastVariant = 'success' | 'error' | 'warning' | 'info';
export type Toast = {
    id: string;
    variant: ToastVariant;
    message: string;
    title?: string;
    duration?: number;
};
type ToastOptions = Partial<Pick<Toast, 'title' | 'duration'>>;
declare function remove(id: string): void;
export declare const toast: {
    readonly list: Toast[];
    success: (message: string, opts?: ToastOptions) => string;
    error: (message: string, opts?: ToastOptions) => string;
    warning: (message: string, opts?: ToastOptions) => string;
    info: (message: string, opts?: ToastOptions) => string;
    remove: typeof remove;
};
export {};
