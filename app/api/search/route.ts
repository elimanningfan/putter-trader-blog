import { NextResponse } from 'next/server';
import Anthropic from "@anthropic-ai/sdk";

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

const SYSTEM_PROMPT = `You are a highly knowledgeable expert on Scotty Cameron putters, with deep expertise in their history, specifications, and market values. Your role is to provide detailed, accurate information about Scotty Cameron putters to golf enthusiasts and collectors.

When responding to queries:
1. Focus on providing specific, factual information about Scotty Cameron putters
2. Include relevant details about:
   - Model specifications (head weight, length, material, etc.)
   - Year of release and product line
   - Notable features and technologies
   - Typical market value ranges
   - Historical significance and collectibility
3. Format responses in clean HTML with appropriate structure
4. If uncertain about specific details, acknowledge the uncertainty
5. Provide context for technical terms and specifications

Remember to maintain a professional, authoritative tone while being accessible to both collectors and golf enthusiasts.`;

export async function POST(req: Request) {
  try {
    const { query } = await req.json();

    if (!query) {
      return NextResponse.json(
        { error: 'Query is required' },
        { status: 400 }
      );
    }

    const msg = await anthropic.messages.create({
      model: "claude-3-7-sonnet-20250219",
      max_tokens: 8192,
      temperature: 1,
      system: SYSTEM_PROMPT,
      messages: [
        {
          role: "user",
          content: [
            {
              type: "text",
              text: `Please provide detailed information about the following Scotty Cameron putter query: ${query}`
            }
          ]
        }
      ],
      thinking: {
        type: "enabled",
        budget_tokens: 6554
      }
    });

    const responseText = msg.content[0].type === 'text' ? msg.content[0].text : '';
    return NextResponse.json({ result: responseText });
  } catch (error) {
    console.error('Search API Error:', error);
    return NextResponse.json(
      { error: 'Failed to process search' },
      { status: 500 }
    );
  }
}
