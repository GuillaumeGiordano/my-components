<script lang="ts">
	import { CalendarDays, ChevronLeft, ChevronRight, X } from '@lucide/svelte';
	import { AlertCircle } from '@lucide/svelte';
	import { uniqueId } from '../../utils/id';
	import {
		MONTHS_FR, WEEKDAYS_SHORT, WEEKDAYS_LONG,
		generateMonth, parseISO, toISO, formatLong, isSameDay,
		prevMonth, nextMonth, stripTime
	} from '../../utils/calendar';

	let {
		id: _id,
		name,
		label,
		value    = $bindable(''),
		placeholder = 'Sélectionner une date',
		hint     = '',
		error    = '',
		required = false,
		disabled = false,
		min      = '',
		max      = ''
	}: {
		id?:          string;
		name?:        string;
		label:        string;
		value?:       string;
		placeholder?: string;
		hint?:        string;
		error?:       string;
		required?:    boolean;
		disabled?:    boolean;
		min?:         string;
		max?:         string;
	} = $props();

	const id = _id ?? name ?? uniqueId('datepicker');

	const hintId    = hint  ? `${id}-hint`  : undefined;
	const errorId   = error ? `${id}-error` : undefined;
	const describedby = [hintId, errorId].filter(Boolean).join(' ') || undefined;

	const today      = stripTime(new Date());
	const selectedDate = $derived(parseISO(value));
	const minDate      = $derived(parseISO(min));
	const maxDate      = $derived(parseISO(max));
	const displayValue = $derived(selectedDate ? formatLong(selectedDate) : '');

	let open        = $state(false);
	let viewYear    = $state(today.getFullYear());
	let viewMonth   = $state(today.getMonth());
	let containerEl = $state<HTMLDivElement | null>(null);

	const weeks = $derived(generateMonth(viewYear, viewMonth, minDate, maxDate));

	function openCalendar() {
		if (disabled) return;
		const ref = selectedDate ?? today;
		viewYear  = ref.getFullYear();
		viewMonth = ref.getMonth();
		open = true;
	}

	function selectDay(day: { date: Date; isDisabled: boolean }) {
		if (day.isDisabled) return;
		value = toISO(day.date);
		open  = false;
	}

	function clearValue(e: MouseEvent) {
		e.stopPropagation();
		value = '';
	}

	function handleTriggerKey(e: KeyboardEvent) {
		if (e.key === 'Enter' || e.key === ' ' || e.key === 'ArrowDown') {
			e.preventDefault();
			openCalendar();
		}
	}

	function handleDayKey(e: KeyboardEvent, day: { date: Date; isDisabled: boolean }) {
		if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); selectDay(day); }
		if (e.key === 'Escape') open = false;
	}

	function goPrev() { [viewYear, viewMonth] = prevMonth(viewYear, viewMonth); }
	function goNext() { [viewYear, viewMonth] = nextMonth(viewYear, viewMonth); }

	$effect(() => {
		function onOut(e: MouseEvent) {
			if (containerEl && !containerEl.contains(e.target as Node)) open = false;
		}
		document.addEventListener('mousedown', onOut);
		return () => document.removeEventListener('mousedown', onOut);
	});
</script>

<input type="hidden" {name} {value} />

<div class="field" class:has-error={!!error} bind:this={containerEl}>
	<label class="label" for={id}>
		{label}
		{#if required}<span class="required" aria-hidden="true" title="Champ obligatoire">*</span>{/if}
	</label>

	{#if hint}<p id={hintId} class="hint">{hint}</p>{/if}

	<!-- Trigger -->
	<button
		{id}
		type="button"
		role="combobox"
		aria-expanded={open}
		aria-haspopup="dialog"
		aria-required={required}
		aria-invalid={!!error}
		aria-describedby={describedby}
		{disabled}
		class="trigger"
		class:open
		onclick={openCalendar}
		onkeydown={handleTriggerKey}
	>
		<CalendarDays size={15} class="trigger-icon" />
		<span class="trigger-label" class:placeholder={!displayValue}>
			{displayValue || placeholder}
		</span>
		{#if value && !disabled}
			<span
				role="button"
				tabindex="0"
				aria-label="Effacer la date"
				class="clear-btn"
				onmousedown={(e) => { e.stopPropagation(); clearValue(e); }}
				onkeydown={(e) => e.key === 'Enter' && clearValue(e as unknown as MouseEvent)}
			><X size={13} /></span>
		{/if}
	</button>

	<!-- Calendar dropdown -->
	{#if open}
		<div class="dropdown" role="dialog" aria-label="Calendrier — {label}">
			<!-- Header -->
			<div class="cal-header">
				<button type="button" class="nav-btn" aria-label="Mois précédent" onclick={goPrev}>
					<ChevronLeft size={16} />
				</button>
				<span class="cal-title" aria-live="polite">
					{MONTHS_FR[viewMonth]} {viewYear}
				</span>
				<button type="button" class="nav-btn" aria-label="Mois suivant" onclick={goNext}>
					<ChevronRight size={16} />
				</button>
			</div>

			<!-- Weekday headers -->
			<div class="cal-grid" role="grid" aria-label="Calendrier">
				<div class="weekdays" role="row">
					{#each WEEKDAYS_SHORT as wd, i}
						<abbr
							role="columnheader"
							title={WEEKDAYS_LONG[i]}
							class="weekday"
						>{wd}</abbr>
					{/each}
				</div>

				<!-- Day rows -->
				{#each weeks as week, wi}
					<div class="week" role="row">
						{#each week as day, di}
							{@const isSelected = !!selectedDate && isSameDay(day.date, selectedDate)}
							<button
								type="button"
								role="gridcell"
								aria-label="{day.day} {MONTHS_FR[day.date.getMonth()]} {day.date.getFullYear()}{isSelected ? ', sélectionné' : ''}"
								aria-selected={isSelected}
								aria-disabled={day.isDisabled || !day.inMonth}
								tabindex={isSelected ? 0 : -1}
								class="day"
								class:in-month={day.inMonth}
								class:is-today={day.isToday}
								class:is-selected={isSelected}
								class:is-disabled={day.isDisabled || !day.inMonth}
								onclick={() => selectDay(day)}
								onkeydown={(e) => handleDayKey(e, day)}
							>
								{day.day}
							</button>
						{/each}
					</div>
				{/each}
			</div>

			<!-- Footer — today shortcut -->
			<div class="cal-footer">
				<button
					type="button"
					class="today-btn"
					onclick={() => selectDay({ date: today, isDisabled: false })}
				>
					Aujourd'hui
				</button>
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

<style>
	.field {
		display: flex;
		flex-direction: column;
		gap: 4px;
		position: relative;
	}

	.label {
		font-size: 14px;
		font-weight: 500;
		color: var(--text-base);
		display: flex;
		align-items: center;
		gap: 3px;
	}

	.required { color: #dc2626; font-size: 16px; line-height: 1; }
	.hint { font-size: 13px; color: var(--text-subtle); margin: 0; }

	/* ---- Trigger ---- */
	.trigger {
		display: flex;
		align-items: center;
		gap: 8px;
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

	.trigger:focus-visible, .trigger.open {
		border-color: var(--primary);
		box-shadow: 0 0 0 3px color-mix(in srgb, var(--primary) 20%, transparent);
		outline: none;
	}

	.has-error .trigger { border-color: #dc2626; }
	.has-error .trigger.open { box-shadow: 0 0 0 3px rgba(220,38,38,0.2); }
	.trigger:disabled { opacity: 0.5; cursor: not-allowed; }

	.trigger-label {
		flex: 1;
		font-size: 14px;
		color: var(--text-base);
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}
	.trigger-label.placeholder { color: var(--text-subtle); }

	.clear-btn {
		display: flex;
		align-items: center;
		justify-content: center;
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
		padding: 12px;
		width: 280px;
		user-select: none;
	}

	/* ---- Calendar header ---- */
	.cal-header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin-bottom: 12px;
	}

	.cal-title {
		font-size: 14px;
		font-weight: 600;
		color: var(--text-base);
	}

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
	.cal-grid { display: flex; flex-direction: column; gap: 2px; }

	.weekdays {
		display: grid;
		grid-template-columns: repeat(7, 1fr);
		margin-bottom: 4px;
	}

	.weekday {
		text-align: center;
		font-size: 11px;
		font-weight: 600;
		color: var(--text-subtle);
		text-decoration: none;
		padding: 4px 0;
		text-transform: uppercase;
		letter-spacing: 0.04em;
	}

	.week {
		display: grid;
		grid-template-columns: repeat(7, 1fr);
		gap: 2px;
	}

	/* ---- Day cell ---- */
	.day {
		position: relative;
		display: flex;
		align-items: center;
		justify-content: center;
		width: 100%;
		aspect-ratio: 1;
		font-size: 13px;
		font-family: var(--font-sans);
		color: var(--text-muted);
		background: transparent;
		border: none;
		border-radius: var(--radius-md);
		cursor: pointer;
		transition: background var(--transition-fast), color var(--transition-fast);
	}

	.day.in-month { color: var(--text-base); }
	.day:not(.in-month) { opacity: 0.25; pointer-events: none; }

	.day:hover:not(.is-disabled):not(.is-selected) {
		background: var(--bg-hover);
		color: var(--text-base);
	}

	.day:focus-visible {
		outline: 2px solid var(--primary);
		outline-offset: 1px;
	}

	.day.is-today:not(.is-selected) {
		font-weight: 700;
		color: var(--primary);
	}

	/* Dot under today */
	.day.is-today:not(.is-selected)::after {
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

	.day.is-selected {
		background: var(--primary);
		color: var(--primary-fg);
		font-weight: 600;
	}

	.day.is-disabled { opacity: 0.3; pointer-events: none; cursor: default; }

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
		padding: 4px 8px;
		border-radius: var(--radius-md);
		font-weight: 500;
		transition: background var(--transition-fast);
	}
	.today-btn:hover { background: var(--primary-subtle); }
	.today-btn:focus-visible { outline: 2px solid var(--primary); outline-offset: 1px; }

	/* ---- Error ---- */
	.error-msg {
		display: flex;
		align-items: center;
		gap: 5px;
		font-size: 13px;
		color: #dc2626;
		margin: 0;
	}
</style>
