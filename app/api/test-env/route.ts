import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    baseUrl: process.env.AI_BASE_URL?.slice(0, 10) + '...',  // Only show part of it for security
    hasApiKey: !!process.env.AI_API_KEY,
  });
} 