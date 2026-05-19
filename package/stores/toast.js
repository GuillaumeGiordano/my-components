import { writable } from 'svelte/store';
function createToastStore() {
    const { subscribe, update } = writable([]);
    function add(variant, message, opts = {}) {
        const id = crypto.randomUUID();
        const duration = opts.duration ?? 4000;
        update((list) => [...list, { id, variant, message, title: opts.title, duration }]);
        if (duration > 0) {
            setTimeout(() => remove(id), duration);
        }
        return id;
    }
    function remove(id) {
        update((list) => list.filter((t) => t.id !== id));
    }
    return {
        subscribe,
        success: (message, opts) => add('success', message, opts),
        error: (message, opts) => add('error', message, opts),
        warning: (message, opts) => add('warning', message, opts),
        info: (message, opts) => add('info', message, opts),
        remove,
    };
}
export const toast = createToastStore();
