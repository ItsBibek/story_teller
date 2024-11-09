import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { prompt } = await req.json();

    const baseUrl = process.env.AI_BASE_URL;
    const apiKey = process.env.AI_API_KEY;

    if (!baseUrl || !apiKey) {
      throw new Error('Missing API configuration');
    }

    const response = await fetch(`${baseUrl}/chat/completions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        model: "grok-beta",
        messages: [
            {
                role: "system",
                content: "You are a master storyteller, skilled at crafting captivating stories in very simple words. No complicated words. Make it very interesting to read. Create tales with fascinating characters, imaginative settings, and rich emotions that draw readers in from the first word. Each story should have a unique voice, setting a memorable tone that makes the reader feel as if they're part of the world you've created. Keep the language simple but powerful, with a natural flow that keeps readers hooked until the end. Make each story something people want to revisit and share. No complicated words."
            },
            {
                role: "user",
                content: `Write a short, intense, and adult-themed story about: ${prompt}`
              }
        ],
        stream: false,
        temperature: 0.8,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
      console.error('API Error:', {
        status: response.status,
        statusText: response.statusText,
        errorData
      });
      throw new Error(`API call failed: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    
    if (!data.choices?.[0]?.message?.content) {
      console.error('Unexpected API response:', data);
      throw new Error('Invalid response format from API');
    }

    return NextResponse.json({ story: data.choices[0].message.content });
  } catch (error) {
    console.error('Full error object:', {
      message: error instanceof Error ? error.message : 'Unknown error',
      error
    });
    
    return NextResponse.json(
      { 
        error: 'Failed to generate story',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
} 