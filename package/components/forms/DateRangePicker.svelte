<script lang="ts">
	import { CalendarDays, ChevronLeft, ChevronRight, X, ArrowRight } from '@lucide/svelte';
	import { AlertCircle } from '@lucide/svelte';
	import { uniqueId } from '../../utils/id';
	import {
		MONTHS_FR, WEEKDAYS_SHORT, WEEKDAYS_LONG,
		generateMonth, parseISO, toISO, formatShort, isSameDay,
		prevMonth, nextMonth, stripTime, type CalendarDay
	} from '../../utils/calendar';

	let {
		id: _id,
		name,
		label,
		startValue = $bindable(''),
		endValue   = $bindable(''),
		placeholder = ['Date de début', 'Date de fin'] as [string, string],
		hint       = '',
		error      = '',
		required   = false,
		disabled   = false,
		min        = '',
		max        = ''
	}: {
		id?:          string;
		name?:        string;
		label:        string;
		startValue?:  string;
		endValue?:    string;
		placeholder?: [string, string];
		hint?:        string;
		error?:       string;
		required?:    boolean;
		disabled?:    boolean;
		min?:         string;
		max?:         string;
	} = $props();

	const uid = uniqueId('daterange');
	const id = $derived(_id ?? name ?? uid);

	const hintId  = $derived(hint  ? `${id}-hint`  : undefined);
	const errorId = $derived(error ? `${id}-error` : undefined);
	const describedby = $derived([hintId, errorId].filter(Boolean).join(' ') || undefined);

	const today   = stripTime(new Date());
	const startDate = $derived(parseISO(startValue));
	const endDate   = $derived(parseISO(endValue));
	const minDate   = $derived(parseISO(min));
	const maxDate   = $derived(parseISO(max));

	let open         = $state(false);
	let selecting    = $state<'start' | 'end'>('start');
	let hoverDate    = $state<Date | null>(null);
	let viewYear     = $state(today.getFullYear());
	let viewMonth    = $state(today.getMonth());
	let containerEl  = $state<HTMLDivElement | null>(null);

	// Two months: current and next
	const month2Month = $derived((viewMonth + 1) % 12);
	const month2Year  = $derived(viewMonth === 11 ? viewYear + 1 : viewYear);

	const weeks1 = $derived(generateMonth(viewYear,   viewMonth,   minDate, maxDate));
	const weeks2 = $derived(generateMonth(month2Year, month2Month, minDate, maxDate));

	// Effective range end for hover preview
	const rangeEnd = $derived(
		selecting === 'end' && hoverDate ? hoverDate : endDate
	);

	function openDropdown() {
		if (disabled) return;
		const ref = startDate ?? today;
		viewYear  = ref.getFullYear();
		viewMonth = ref.getMonth();
		selecting = startValue ? 'end' : 'start';
		open = true;
	}

	function selectDay(day: CalendarDay) {
		if (day.isDisabled || !day.inMonth) return;

		if (selecting === 'start') {
			startValue = toISO(day.date);
			endValue   = '';
			selecting  = 'end';
			hoverDate  = null;
		} else {
			// Clicking before start → swap and restart
			if (startDate && day.date < startDate) {
				startValue = toISO(day.date);
				endValue   = '';
				selecting  = 'end';
				hoverDate  = null;
			} else {
				endValue  = toISO(day.date);
				hoverDate = null;
				open      = false;
			}
		}
	}

	function clearRange(e: MouseEvent) {
		e.stopPropagation();
		startValue = '';
		endValue   = '';
		selecting  = 'start';
	}

	function getDayState(day: CalendarDay) {
		const d = day.date;
		const isStart    = !!startDate && isSameDay(d, startDate);
		const isEnd      = !!rangeEnd  && isSameDay(d, rangeEnd);
		const inRange    = !!startDate && !!rangeEnd
			&& d > startDate && d < rangeEnd
			&& (startDate < rangeEnd);
		const isHover    = !!hoverDate && isSameDay(d, hoverDate) && selecting === 'end';
		return { isStart, isEnd, inRange, isHover };
	}

	function goPrev() { [viewYear, viewMonth] = prevMonth(viewYear, viewMonth); }
	function goNext() { [viewYear, viewMonth] = nextMonth(viewYear, viewMonth); }

	$effect(() => {
		function onOut(e: MouseEvent) {
			if (containerEl && !containerEl.contains(e.target as Node)) {
				open = false;
				hoverDate = null;
			}
		}
		document.addEventListener('mousedown', onOut);
		return () => document.removeEventListener('mousedown', onOut);
	});
</script>

<input type="hidden" name="{name}[start]" value={startValue} />
<input type="hidden" name="{name}[end]"   value={endValue}   />

<div class="field" class:has-error={!!error} bind:this={containerEl}>
	<div class="label-row">
		<span class="label" id="{id}-label">
			{label}
			{#if required}<span class="required" aria-hidden="true" title="Champ obligatoire">*</span>{/if}
		</span>
	</div>

	{#if hint}<p id={hintId} class="hint">{hint}</p>{/if}

	<!-- Trigger double -->
	<button
		{id}
		type="button"
		aria-haspopup="dialog"
		aria-expanded={open}
		aria-labelledby="{id}-label"
		aria-describedby={describedby}
		{disabled}
		class="trigger"
		class:open
		onclick={openDropdown}
	>
		<CalendarDays size={15} class="trigger-icon" />

		<span class="trigger-segment" class:placeholder-text={!startValue} class:active={open && selecting === 'start'}>
			{startDate ? formatShort(startDate) : placeholder[0]}
		</span>

		<ArrowRight size={14} class="arrow-icon" />

		<span class="trigger-segment" class:placeholder-text={!endValue} class:active={open && selecting === 'end'}>
			{endDate ? formatShort(endDate) : placeholder[1]}
		</span>

		{#if (startValue || endValue) && !disabled}
			<span
				role="button"
				tabindex="0"
				aria-label="Effacer la période"
				class="clear-btn"
				onmousedown={(e) => { e.stopPropagation(); clearRange(e); }}
				onkeydown={(e) => e.key === 'Enter' && clearRange(e as unknown as MouseEvent)}
			><X size={13} /></span>
		{/if}
	</button>

	<!-- Calendar dropdown -->
	{#if open}
		<div class="dropdown" role="dialog" aria-label="Sélectionner une période">
			<!-- Instruction -->
			<p class="instruction" aria-live="polite">
				{selecting === 'start' ? 'Sélectionnez la date de début' : 'Sélectionnez la date de fin'}
			</p>

			<div class="months-wrap">
				<!-- Month 1 -->
				<div class="month-panel">
					<div class="cal-header">
						<button type="button" class="nav-btn" aria-label="Mois précédent" onclick={goPrev}>
							<ChevronLeft size={16} />
						</button>
						<span class="cal-title" aria-live="polite">{MONTHS_FR[viewMonth]} {viewYear}</span>
						<span class="nav-spacer"></span>
					</div>
					{@render calGrid(weeks1)}
				</div>

				<div class="month-divider"></div>

				<!-- Month 2 -->
				<div class="month-panel">
					<div class="cal-header">
						<span class="nav-spacer"></span>
						<span class="cal-title" aria-live="polite">{MONTHS_FR[month2Month]} {month2Year}</span>
						<button type="button" class="nav-btn" aria-label="Mois suivant" onclick={goNext}>
							<ChevronRight size={16} />
						</button>
					</div>
					{@render calGrid(weeks2)}
				</div>
			</div>

			<div class="cal-footer">
				<button type="button" class="today-btn" onclick={() => {
					const t = { date: today, isDisabled: false, day: today.getDate(), inMonth: true, isToday: true };
					selectDay(t);
				}}>Aujourd'hui</button>
			</div>
		</div>
	{/if}

	{#if error}
		<p id={errorId} class="error-msg" role="alert">
			<AlertCircle size={14} aria-hidden="true" />
			{error}
		</p>
	{/if}
</div>

{#snippet calGrid(weeks: CalendarDay[][])}
	<div class="cal-grid" role="grid">
		<div class="weekdays" role="row">
			{#each WEEKDAYS_SHORT as wd, i (i)}
				<span role="columnheader" class="weekday">
					<abbr title={WEEKDAYS_LONG[i]}>{wd}</abbr>
				</span>
			{/each}
		</div>

		{#each weeks as week, wi (wi)}
			<div class="week" role="row">
				{#each week as day, di (di)}
					{@const { isStart, isEnd, inRange, isHover } = getDayState(day)}
					<button
						type="button"
						role="gridcell"
						aria-label="{day.day} {MONTHS_FR[day.date.getMonth()]} {day.date.getFullYear()}"
						aria-selected={isStart || isEnd}
						aria-disabled={day.isDisabled || !day.inMonth}
						tabindex={(isStart || isEnd) ? 0 : -1}
						class="day"
						class:in-month={day.inMonth}
						class:is-today={day.isToday && !isStart && !isEnd}
						class:is-start={isStart}
						class:is-end={isEnd}
						class:in-range={inRange}
						class:is-hover={isHover && !isStart && !isEnd}
						class:is-disabled={day.isDisabled || !day.inMonth}
						onclick={() => selectDay(day)}
						onmouseenter={() => { if (selecting === 'end') hoverDate = day.date; }}
						onmouseleave={() => { hoverDate = null; }}
					>
						<span class="day-inner">{day.day}</span>
					</button>
				{/each}
			</div>
		{/each}
	</div>
{/snippet}

<style>
	.field {
		display: flex;
		flex-direction: column;
		gap: 4px;
		position: relative;
	}

	.label-row { display: flex; align-items: center; }

	.label {
		font-size: 14px;
		font-weight: 500;
		color: var(--text-base);
		display: flex;
		align-items: center;
		gap: 3px;
	}

	.required { color: var(--danger); font-size: 16px; line-height: 1; }
	.hint { font-size: 13px; color: var(--text-subtle); margin: 0; }

	/* ---- Trigger ---- */
	.trigger {
		display: flex;
		align-items: center;
		gap: 6px;
		width: 100%;
		height: 38px;
		padding: 0 10px 0 12px;
		background: var(--bg-base);
		border: 1px solid var(--border);
		border-radius: var(--radius-md);
		cursor: pointer;
		font-family: var(--font-sans);
		text-align: left;
		transition: border-color var(--transition-fast), box-shadow var(--transition-fast);
	}

	.trigger :global(.trigger-icon) { color: var(--text-subtle); flex-shrink: 0; }
	.trigger :global(.arrow-icon)   { color: var(--text-subtle); flex-shrink: 0; }

	.trigger:focus-visible, .trigger.open {
		border-color: var(--primary);
		box-shadow: 0 0 0 3px color-mix(in srgb, var(--primary) 20%, transparent);
		outline: none;
	}

	.has-error .trigger { border-color: var(--danger); }
	.trigger:disabled { opacity: 0.5; cursor: not-allowed; }

	.trigger-segment {
		font-size: 13px;
		color: var(--text-base);
		white-space: nowrap;
		padding: 2px 4px;
		border-radius: var(--radius-sm);
		transition: background var(--transition-fast);
	}

	.trigger-segment.placeholder-text { color: var(--text-subtle); }

	.trigger-segment.active {
		background: var(--primary-subtle);
		color: var(--primary-subtle-fg);
	}

	.clear-btn {
		display: flex;
		align-items: center;
		justify-content: center;
		margin-left: auto;
		padding: 2px;
		color: var(--text-subtle);
		border-radius: var(--radius-sm);
		cursor: pointer;
		transition: color var(--transition-fast);
	}
	.clear-btn:hover { color: var(--text-base); }

	/* ---- Dropdown ---- */
	.dropdown {
		position: absolute;
		top: calc(100% + 6px);
		left: 0;
		z-index: 50;
		background: var(--bg-base);
		border: 1px solid var(--border);
		border-radius: var(--radius-lg);
		box-shadow: var(--shadow-lg);
		padding: 14px;
		user-select: none;
	}

	.instruction {
		font-size: 12px;
		color: var(--text-muted);
		text-align: center;
		margin-bottom: 12px;
		font-weight: 500;
	}

	.months-wrap {
		display: flex;
		gap: 0;
	}

	.month-divider {
		width: 1px;
		background: var(--border);
		margin: 0 14px;
	}

	.month-panel { flex: 1; min-width: 240px; }

	/* ---- Header ---- */
	.cal-header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin-bottom: 10px;
		height: 28px;
	}

	.cal-title {
		font-size: 13px;
		font-weight: 600;
		color: var(--text-base);
	}

	.nav-spacer { width: 28px; }

	.nav-btn {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 28px;
		height: 28px;
		background: transparent;
		border: 1px solid var(--border);
		border-radius: var(--radius-md);
		cursor: pointer;
		color: var(--text-muted);
		transition: background var(--transition-fast), color var(--transition-fast);
	}
	.nav-btn:hover { background: var(--bg-hover); color: var(--text-base); }
	.nav-btn:focus-visible { outline: 2px solid var(--primary); outline-offset: 1px; }

	/* ---- Grid ---- */
	.cal-grid { display: flex; flex-direction: column; gap: 1px; }

	.weekdays {
		display: grid;
		grid-template-columns: repeat(7, 1fr);
		margin-bottom: 4px;
	}

	.weekday {
		text-align: center;
		font-size: 10px;
		font-weight: 700;
		color: var(--text-subtle);
		text-decoration: none;
		text-transform: uppercase;
		letter-spacing: 0.04em;
		padding: 3px 0;
	}

	.week {
		display: grid;
		grid-template-columns: repeat(7, 1fr);
	}

	/* ---- Day cell ---- */
	.day {
		position: relative;
		display: flex;
		align-items: center;
		justify-content: center;
		background: transparent;
		border: none;
		cursor: pointer;
		padding: 2px 0;
		font-family: var(--font-sans);
		/* Range background spans full cell width */
	}

	.day:not(.in-month) { opacity: 0.2; pointer-events: none; }
	.day.is-disabled    { opacity: 0.3; pointer-events: none; }

	/* Inner circle — for selected states */
	.day-inner {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 32px;
		height: 32px;
		border-radius: var(--radius-md);
		font-size: 13px;
		color: var(--text-base);
		position: relative;
		z-index: 1;
		transition: background var(--transition-fast), color var(--transition-fast);
	}

	.day:hover:not(.is-disabled) .day-inner,
	.day.is-hover .day-inner {
		background: var(--bg-hover);
	}

	.day.is-today .day-inner {
		font-weight: 700;
		color: var(--primary);
	}

	.day.is-today .day-inner::after {
		content: '';
		position: absolute;
		bottom: 3px;
		left: 50%;
		transform: translateX(-50%);
		width: 4px;
		height: 4px;
		border-radius: 50%;
		background: var(--primary);
	}

	/* Range band — behind the inner circle */
	.day.in-range::before,
	.day.is-start::before,
	.day.is-end::before {
		content: '';
		position: absolute;
		inset: 2px 0;
		background: var(--primary-subtle);
		z-index: 0;
	}

	/* Start: band only on right half */
	.day.is-start::before { left: 50%; border-radius: var(--radius-md) 0 0 var(--radius-md); }
	/* End: band only on left half */
	.day.is-end::before   { right: 50%; border-radius: 0 var(--radius-md) var(--radius-md) 0; }
	/* Same day start+end: no band */
	.day.is-start.is-end::before { display: none; }

	/* Selected endpoints */
	.day.is-start .day-inner,
	.day.is-end   .day-inner {
		background: var(--primary);
		color: var(--primary-fg);
		font-weight: 600;
	}

	.day:focus-visible .day-inner {
		outline: 2px solid var(--primary);
		outline-offset: 1px;
	}

	/* ---- Footer ---- */
	.cal-footer {
		margin-top: 10px;
		padding-top: 10px;
		border-top: 1px solid var(--border);
		display: flex;
		justify-content: center;
	}

	.today-btn {
		font-size: 12px;
		font-family: var(--font-sans);
		color: var(--primary);
		background: transparent;
		border: none;
		cursor: pointer;
		padding: 4px 10px;
		border-radius: var(--radius-md);
		font-weight: 500;
		transition: background var(--transition-fast);
	}
	.today-btn:hover { background: var(--primary-subtle); }

	/* ---- Error ---- */
	.error-msg {
		display: flex;
		align-items: center;
		gap: 5px;
		font-size: 13px;
		color: var(--danger);
		margin: 0;
	}
</style>
