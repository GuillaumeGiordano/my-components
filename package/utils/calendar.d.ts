export interface CalendarDay {
    date: Date;
    day: number;
    inMonth: boolean;
    isToday: boolean;
    isDisabled: boolean;
}
export declare const MONTHS_FR: string[];
export declare const WEEKDAYS_SHORT: string[];
export declare const WEEKDAYS_LONG: string[];
export declare function parseISO(iso: string): Date | null;
export declare function toISO(date: Date): string;
export declare function formatLong(date: Date): string;
export declare function formatShort(date: Date): string;
export declare function isSameDay(a: Date, b: Date): boolean;
export declare function stripTime(date: Date): Date;
/** Generate a 6-week grid (42 cells) for the given year/month. */
export declare function generateMonth(year: number, month: number, minDate?: Date | null, maxDate?: Date | null): CalendarDay[][];
/** Return [year, month] for the previous month. */
export declare function prevMonth(year: number, month: number): [number, number];
/** Return [year, month] for the next month. */
export declare function nextMonth(year: number, month: number): [number, number];
