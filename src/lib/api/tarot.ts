export type TarotInterpretRequest = {
  question: string;
  cards: string[];
  language: string;
};

export type TarotInterpretResponse = {
  interpretation: string;
};

const API_BASE = import.meta.env.VITE_API_BASE_URL ?? '';
if (!API_BASE) {
  console.warn('⚠️ VITE_API_BASE_URL is not set. Using same-origin fallback.');
}

export async function interpretTarot(
  request: TarotInterpretRequest
): Promise<TarotInterpretResponse> {
  const response = await fetch(`${API_BASE}/api/Tarot/interpret`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(request)
  });

  // Handle rate limiting
  if (response.status === 429) {
    const data = await safeJson(response);
    throw new Error(data?.message || 'Too many requests. Please wait.');
  }

  // Handle validation errors (400)
  if (response.status === 400) {
    const data = await safeJson(response);
    throw new Error(data?.message || 'Invalid request');
  }

  // Handle server errors
  if (!response.ok) {
    throw new Error('Something went wrong while interpreting the cards.');
  }

  return response.json();
}

async function safeJson(response: Response) {
  try {
    return await response.json();
  } catch {
    return null;
  }
}