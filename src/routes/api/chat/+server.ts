import { json, error } from '@sveltejs/kit';
import { GROQ_API_KEY, ANTHROPIC_API_KEY } from '$env/static/private';
import type { RequestHandler } from './$types';

type ChatMessage = { role: 'user' | 'assistant'; content: string };
type KnowledgeEntry = { question: string; answer: string };

function buildSystemPrompt(knowledge: KnowledgeEntry[]): string {
  const entries = knowledge
    .map((e) => `Q: ${e.question}\nR: ${e.answer}`)
    .join('\n\n');

  return `Tu es un assistant. Réponds UNIQUEMENT en te basant sur la base de connaissances ci-dessous.
Si la question ne correspond à aucune entrée, réponds poliment que tu n'as pas cette information.
Réponds dans la même langue que l'utilisateur. Sois concis et direct.

BASE DE CONNAISSANCES :
---
${entries}
---`;
}

// ─── Groq (actif) ────────────────────────────────────────────────────────────

async function callGroq(system: string, messages: ChatMessage[]): Promise<string> {
  const Groq = (await import('groq-sdk')).default;
  const client = new Groq({ apiKey: GROQ_API_KEY });

  const response = await client.chat.completions.create({
    model: 'llama-3.3-70b-versatile',
    max_tokens: 1024,
    messages: [{ role: 'system', content: system }, ...messages],
  });

  return response.choices[0].message.content ?? '';
}

// ─── Anthropic (réservé pour plus tard) ──────────────────────────────────────

async function callAnthropic(system: string, messages: ChatMessage[]): Promise<string> {
  const Anthropic = (await import('@anthropic-ai/sdk')).default;
  const client = new Anthropic({ apiKey: ANTHROPIC_API_KEY });

  const response = await client.messages.create({
    model: 'claude-opus-4-7',
    max_tokens: 1024,
    system,
    messages,
  });

  const content = response.content[0];
  if (content.type !== 'text') throw new Error('Réponse inattendue du modèle');
  return content.text;
}

// ─── Handler ─────────────────────────────────────────────────────────────────

export const POST: RequestHandler = async ({ request }) => {
  const body = await request.json();
  const messages: ChatMessage[] = body.messages ?? [];
  const knowledge: KnowledgeEntry[] = body.knowledge ?? [];

  const system = knowledge.length > 0
    ? buildSystemPrompt(knowledge)
    : 'Tu es un assistant utile et concis.';

  // Pour basculer sur Anthropic : remplacer callGroq par callAnthropic
  if (!GROQ_API_KEY) throw error(500, 'GROQ_API_KEY non configurée dans .env');

  const content = await callGroq(system, messages);
  return json({ content });
};
