<script lang="ts">
	import { Upload, X, FileText } from '@lucide/svelte';
	import { AlertCircle } from '@lucide/svelte';
	import { uniqueId } from '$lib/utils/id';

	let {
		id: _id,
		name,
		label,
		hint = '',
		error = '',
		required = false,
		disabled = false,
		multiple = false,
		accept = ''
	}: {
		id?: string;
		name?: string;
		label: string;
		hint?: string;
		error?: string;
		required?: boolean;
		disabled?: boolean;
		multiple?: boolean;
		accept?: string;
	} = $props();

	const uid = uniqueId('file');
	const id = $derived(_id ?? name ?? uid);

	const hintId = $derived(hint ? `${id}-hint` : undefined);
	const errorId = $derived(error ? `${id}-error` : undefined);
	const describedby = $derived([hintId, errorId].filter(Boolean).join(' ') || undefined);

	let files = $state<File[]>([]);
	let inputEl = $state<HTMLInputElement | null>(null);
	let dragOver = $state(false);

	function handleChange(e: Event) {
		const input = e.target as HTMLInputElement;
		files = Array.from(input.files ?? []);
	}

	function handleDrop(e: DragEvent) {
		e.preventDefault();
		dragOver = false;
		if (disabled) return;
		const dropped = Array.from(e.dataTransfer?.files ?? []);
		files = multiple ? dropped : dropped.slice(0, 1);
	}

	function removeFile(index: number) {
		files = files.filter((_, i) => i !== index);
		if (inputEl) inputEl.value = '';
	}

	function formatSize(bytes: number): string {
		if (bytes < 1024) return `${bytes} o`;
		if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} Ko`;
		return `${(bytes / (1024 * 1024)).toFixed(1)} Mo`;
	}
</script>

<div class="field" class:has-error={!!error} class:is-disabled={disabled}>
	<label class="label" for={id}>
		{label}
		{#if required}
			<span class="required" aria-hidden="true" title="Champ obligatoire">*</span>
		{/if}
	</label>

	{#if hint}
		<p id={hintId} class="hint">{hint}</p>
	{/if}

	<!-- Hidden native input -->
	<input
		bind:this={inputEl}
		{id}
		{name}
		type="file"
		{multiple}
		{accept}
		{disabled}
		aria-required={required}
		aria-invalid={!!error}
		aria-describedby={describedby}
		class="native-input"
		onchange={handleChange}
	/>

	<!-- Drop zone -->
	<div
		class="dropzone"
		class:drag-over={dragOver}
		class:has-files={files.length > 0}
		role="button"
		tabindex={disabled ? -1 : 0}
		aria-disabled={disabled}
		ondragover={(e) => { e.preventDefault(); if (!disabled) dragOver = true; }}
		ondragleave={() => dragOver = false}
		ondrop={handleDrop}
		onclick={() => !disabled && inputEl?.click()}
		onkeydown={(e) => e.key === 'Enter' || e.key === ' ' ? inputEl?.click() : null}
	>
		<Upload size={20} class="upload-icon" />
		<div class="dropzone-text">
			<span class="dropzone-primary">
				{#if multiple}Choisir des fichiers{:else}Choisir un fichier{/if}
			</span>
			<span class="dropzone-secondary">ou glisser-déposer ici</span>
		</div>
		{#if accept}
			<span class="dropzone-accept">{accept}</span>
		{/if}
	</div>

	<!-- File list -->
	{#if files.length > 0}
		<ul class="file-list" aria-label="Fichiers sélectionnés">
			{#each files as file, i (i)}
				<li class="file-item">
					<FileText size={14} />
					<span class="file-name">{file.name}</span>
					<span class="file-size">{formatSize(file.size)}</span>
					<button
						type="button"
						class="remove-btn"
						aria-label="Retirer {file.name}"
						onclick={() => removeFile(i)}
					>
						<X size={14} />
					</button>
				</li>
			{/each}
		</ul>
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
		gap: 6px;
	}

	.label {
		font-size: 14px;
		font-weight: 500;
		color: var(--text-base);
		display: flex;
		align-items: center;
		gap: 3px;
	}

	.required {
		color: #dc2626;
		font-size: 16px;
		line-height: 1;
	}

	.hint {
		font-size: 13px;
		color: var(--text-subtle);
		margin: 0;
	}

	.native-input {
		position: absolute;
		width: 1px;
		height: 1px;
		opacity: 0;
		pointer-events: none;
	}

	.dropzone {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		gap: 8px;
		padding: 24px 16px;
		border: 2px dashed var(--border);
		border-radius: var(--radius-lg);
		background: var(--bg-subtle);
		cursor: pointer;
		transition:
			border-color var(--transition-fast),
			background var(--transition-fast);
		text-align: center;
	}

	.dropzone:hover:not([aria-disabled='true']),
	.dropzone:focus-visible {
		border-color: var(--primary);
		background: var(--primary-subtle);
		outline: none;
	}

	.dropzone.drag-over {
		border-color: var(--primary);
		background: var(--primary-subtle);
	}

	.dropzone[aria-disabled='true'] {
		cursor: not-allowed;
		opacity: 0.5;
	}

	.dropzone :global(.upload-icon) {
		color: var(--text-subtle);
	}

	.dropzone-text {
		display: flex;
		flex-direction: column;
		gap: 2px;
	}

	.dropzone-primary {
		font-size: 14px;
		font-weight: 500;
		color: var(--primary);
	}

	.dropzone-secondary {
		font-size: 13px;
		color: var(--text-subtle);
	}

	.dropzone-accept {
		font-size: 12px;
		color: var(--text-subtle);
		font-family: var(--font-mono);
	}

	.file-list {
		list-style: none;
		display: flex;
		flex-direction: column;
		gap: 4px;
	}

	.file-item {
		display: flex;
		align-items: center;
		gap: 8px;
		padding: 8px 10px;
		background: var(--bg-subtle);
		border: 1px solid var(--border);
		border-radius: var(--radius-md);
		font-size: 13px;
		color: var(--text-muted);
	}

	.file-name {
		flex: 1;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		color: var(--text-base);
	}

	.file-size {
		font-size: 12px;
		color: var(--text-subtle);
		flex-shrink: 0;
		font-variant-numeric: tabular-nums;
	}

	.remove-btn {
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 2px;
		background: transparent;
		border: none;
		cursor: pointer;
		color: var(--text-subtle);
		border-radius: var(--radius-sm);
		flex-shrink: 0;
		transition: color var(--transition-fast), background var(--transition-fast);
	}

	.remove-btn:hover {
		color: #dc2626;
		background: #fee2e2;
	}

	.remove-btn:focus-visible {
		outline: 2px solid var(--primary);
		outline-offset: 1px;
	}

	.has-error .dropzone {
		border-color: #dc2626;
	}

	.error-msg {
		display: flex;
		align-items: center;
		gap: 5px;
		font-size: 13px;
		color: #dc2626;
		margin: 0;
	}
</style>
