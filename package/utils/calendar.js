// Shared calendar utilities for DatePicker and DateRangePicker
export const MONTHS_FR = [
    'Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin',
    'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'
];
export const WEEKDAYS_SHORT = ['Lu', 'Ma', 'Me', 'Je', 'Ve', 'Sa', 'Di'];
export const WEEKDAYS_LONG = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche'];
export function parseISO(iso) {
    if (!iso)
        return null;
    const d = new Date(iso + 'T00:00:00');
    return isNaN(d.getTime()) ? null : d;
}
export function toISO(date) {
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, '0');
    const d = String(date.getDate()).padStart(2, '0');
    return `${y}-${m}-${d}`;
}
export function formatLong(date) {
    return new Intl.DateTimeFormat('fr-FR', {
        day: 'numeric', month: 'long', year: 'numeric'
    }).format(date);
}
export function formatShort(date) {
    return new Intl.DateTimeFormat('fr-FR', {
        day: '2-digit', month: '2-digit', year: 'numeric'
    }).format(date);
}
export function isSameDay(a, b) {
    return a.getFullYear() === b.getFullYear()
        && a.getMonth() === b.getMonth()
        && a.getDate() === b.getDate();
}
export function stripTime(date) {
    const d = new Date(date);
    d.setHours(0, 0, 0, 0);
    return d;
}
/** Generate a 6-week grid (42 cells) for the given year/month. */
export function generateMonth(year, month, minDate, maxDate) {
    const today = stripTime(new Date());
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    // Monday-based offset: getDay() 0=Sun → we want 0=Mon
    const startOffset = (firstDay.getDay() + 6) % 7;
    const days = [];
    // Padding — previous month
    for (let i = startOffset - 1; i >= 0; i--) {
        const date = stripTime(new Date(year, month, -i));
        days.push({ date, day: date.getDate(), inMonth: false, isToday: false, isDisabled: true });
    }
    // Current month
    for (let d = 1; d <= lastDay.getDate(); d++) {
        const date = stripTime(new Date(year, month, d));
        const isDisabled = (minDate != null && date < minDate) ||
            (maxDate != null && date > maxDate);
        days.push({ date, day: d, inMonth: true, isToday: isSameDay(date, today), isDisabled });
    }
    // Padding — next month (fill to 42 cells)
    const remaining = 42 - days.length;
    for (let d = 1; d <= remaining; d++) {
        const date = stripTime(new Date(year, month + 1, d));
        days.push({ date, day: d, inMonth: false, isToday: false, isDisabled: true });
    }
    // Split into weeks
    const weeks = [];
    for (let i = 0; i < 42; i += 7)
        weeks.push(days.slice(i, i + 7));
    return weeks;
}
/** Return [year, month] for the previous month. */
export function prevMonth(year, month) {
    return month === 0 ? [year - 1, 11] : [year, month - 1];
}
/** Return [year, month] for the next month. */
export function nextMonth(year, month) {
    return month === 11 ? [year + 1, 0] : [year, month + 1];
}
