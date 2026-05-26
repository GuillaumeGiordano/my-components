import Anthropic from '@anthropic-ai/sdk';
import { json, error } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

type ChatMessage = { role: 'user' | 'assistant'; content: string };
type KnowledgeEntry = { question: string; answer: string };

const client = new Anthropic({ apiKey: import.meta.env.ANTHROPIC_API_KEY });

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

export const POST: RequestHandler = async ({ request }) => {
  const apiKey = import.meta.env.ANTHROPIC_API_KEY;
  if (!apiKey || apiKey.startsWith('sk-ant-REMPLACE')) {
    throw error(500, 'ANTHROPIC_API_KEY non configurée dans .env');
  }

  const body = await request.json();
  const messages: ChatMessage[] = body.messages ?? [];
  const knowledge: KnowledgeEntry[] = body.knowledge ?? [];

  const system = knowledge.length > 0
    ? buildSystemPrompt(knowledge)
    : 'Tu es un assistant utile et concis.';

  const response = await client.messages.create({
    model: 'claude-opus-4-7',
    max_tokens: 1024,
    system,
    messages,
  });

  const content = response.content[0];
  if (content.type !== 'text') throw error(500, 'Réponse inattendue du modèle');

  return json({ content: content.text });
};
