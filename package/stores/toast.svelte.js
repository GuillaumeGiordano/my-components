let toasts = $state([]);
function add(variant, message, opts = {}) {
    const id = crypto.randomUUID();
    const duration = opts.duration ?? 4000;
    toasts = [...toasts, { id, variant, message, title: opts.title, duration }];
    if (duration > 0) {
        setTimeout(() => remove(id), duration);
    }
    return id;
}
function remove(id) {
    toasts = toasts.filter((t) => t.id !== id);
}
export const toast = {
    get list() { return toasts; },
    success: (message, opts) => add('success', message, opts),
    error: (message, opts) => add('error', message, opts),
    warning: (message, opts) => add('warning', message, opts),
    info: (message, opts) => add('info', message, opts),
    remove,
};
