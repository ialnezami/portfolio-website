import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

// Portfolio data structure for chatbot context
const portfolioData = {
  name: 'Ibrahim Alnezami',
  title: 'Full Stack Developer',
  email: 'ibrahim.alnezami@gmail.com',
  location: 'Paris, Île-de-France, France',
  github: 'https://github.com/ialnezami',
  linkedin: 'https://linkedin.com/in/ialnezami',
  calendar: 'https://zeeg.me/ibrahimalnezami/30min',
  experience: [
    {
      role: 'Full Stack Developer',
      company: 'VIA UNiFi Information Technology',
      duration: 'Sep 2025 - Oct 2025',
      location: 'Dubai, UAE',
      highlights: ['ERP System', 'Reactjs & Node.js', 'Laravel']
    },
    {
      role: 'Full Stack Developer',
      company: 'Antidots - Positive Technologies',
      duration: 'Sep 2022 - Aug 2025',
      location: 'Aix-les-Bains, France',
      highlights: ['Vue.js, Nuxt.js, Nest.js', 'MongoDB & RESTful APIs', 'RESTful & SOAP API integrations']
    },
    {
      role: 'Software Engineer (Apprentice)',
      company: 'Lannion-Trégor Communauté',
      duration: 'Sep 2019 - Aug 2022',
      location: 'Lannion, France',
      highlights: ['Node.js & Express APIs', 'MySQL databases', 'PHPUnit & Cypress testing']
    }
  ],
  skills: {
    frontend: ['TypeScript', 'JavaScript', 'React', 'Next.js', 'Tailwind CSS', 'React Query', 'Vue.js', 'Nuxt.js'],
    backend: ['Node.js', 'Nest.js', 'Express', 'Firebase', 'Firebase Functions'],
    database: ['PostgreSQL', 'MongoDB'],
    ai: ['Python', 'FastAPI', 'Google Vertex AI', 'RAG'],
    other: ['Go', 'Docker', 'Git']
  },
  projects: [
    {
      name: 'AI Chatbot Assistant',
      description: 'Modern AI chatbot with real-time streaming, weather integration, and message editing.',
      tech: ['Next.js', 'TypeScript', 'React', 'Tailwind CSS', 'Google Gemini']
    },
    {
      name: 'Catalogue E-commerce',
      description: 'Modern e-commerce product catalog platform with elegant design.',
      tech: ['Next.js', 'TypeScript', 'React', 'Tailwind CSS']
    }
  ],
  languages: ['Arabic (Native)', 'French (Fluent)', 'English (Fluent)']
};

// Create system prompt with portfolio data
function createSystemPrompt(): string {
  return `You are a helpful portfolio assistant for ${portfolioData.name}, a ${portfolioData.title} based in ${portfolioData.location}.

Your role is to answer questions about Ibrahim's professional background, skills, experience, projects, and help visitors schedule meetings.

PORTFOLIO INFORMATION:

**Personal Information:**
- Name: ${portfolioData.name}
- Title: ${portfolioData.title}
- Location: ${portfolioData.location}
- Email: ${portfolioData.email}
- GitHub: ${portfolioData.github}
- LinkedIn: ${portfolioData.linkedin}
- Languages: ${portfolioData.languages.join(', ')}

**Professional Experience:**
${portfolioData.experience.map((exp, i) => `
${i + 1}. ${exp.role} at ${exp.company}
   - Duration: ${exp.duration}
   - Location: ${exp.location}
   - Key Highlights: ${exp.highlights.join(', ')}
`).join('')}

**Technical Skills:**
- Frontend: ${portfolioData.skills.frontend.join(', ')}
- Backend: ${portfolioData.skills.backend.join(', ')}
- Databases: ${portfolioData.skills.database.join(', ')}
- AI/ML: ${portfolioData.skills.ai.join(', ')}
- Other: ${portfolioData.skills.other.join(', ')}

**Notable Projects:**
${portfolioData.projects.map((proj, i) => `
${i + 1}. ${proj.name}: ${proj.description}
   Technologies: ${proj.tech.join(', ')}
`).join('')}

**Meeting Booking:**
- Calendar Link: ${portfolioData.calendar}
- Meeting Duration: 30 minutes

INSTRUCTIONS:
1. Answer questions naturally and conversationally based on the portfolio information above
2. Be friendly, professional, and helpful
3. If asked about scheduling a meeting, appointment, or booking (in any language: meeting, appointment, rdv, rendez-vous, schedule, book, calendar, available), respond positively and mention that a calendar booking link is available. Also indicate "BOOKING_INTENT" in your response.
4. Keep responses concise and relevant (2-3 sentences when possible)
5. If asked about something not in the portfolio data, politely say you don't have that information but can help with other questions
6. Respond in the same language as the user's question (English, French, or Arabic)
7. Always be helpful and encourage further questions or meeting scheduling

IMPORTANT: When you detect meeting/appointment booking intent, include "BOOKING_INTENT" somewhere in your response so the system can detect it.`;
}

async function generateResponseWithGemini(
  message: string,
  conversationHistory: any[]
): Promise<{ response: string; bookingIntent: boolean }> {
  const apiKey = process.env.GEMINI_API_KEY;
  
  if (!apiKey) {
    throw new Error('GEMINI_API_KEY is not configured');
  }

  const genAI = new GoogleGenerativeAI(apiKey);
  
  // Use the same model as KS project - try gemini-1.5-flash-latest or gemini-1.5-pro-latest

  // These are the correct model names for the v1beta API

  const model = genAI.getGenerativeModel({ model: 'gemini-flash-latest' });

  // Build conversation history
  const systemPrompt = createSystemPrompt();
  
  // Filter and format history for Gemini
  // Gemini requires: first message must be from user, and messages must alternate user/model
  const formattedHistory: Array<{ role: 'user' | 'model'; parts: Array<{ text: string }> }> = [];
  
  // Skip the welcome message (first assistant message) and start from first user message
  let startIndex = 0;
  if (conversationHistory.length > 0 && conversationHistory[0].role === 'assistant') {
    startIndex = 1; // Skip welcome message
  }
  
  for (let i = startIndex; i < conversationHistory.length; i++) {
    const msg = conversationHistory[i];
    formattedHistory.push({
      role: msg.role === 'user' ? 'user' : 'model',
      parts: [{ text: msg.content }],
    });
  }
  
  // Ensure we have valid alternating pattern (user -> model -> user -> model...)
  // Remove any consecutive messages of the same role
  const cleanedHistory: Array<{ role: 'user' | 'model'; parts: Array<{ text: string }> }> = [];
  for (let i = 0; i < formattedHistory.length; i++) {
    const current = formattedHistory[i];
    const previous = cleanedHistory[cleanedHistory.length - 1];
    
    // If first message is not user, skip it
    if (i === 0 && current.role !== 'user') {
      continue;
    }
    
    // If same role as previous, skip it
    if (previous && previous.role === current.role) {
      continue;
    }
    
    cleanedHistory.push(current);
  }

  try {
    // Build the prompt with system instruction and user message
    // Similar to KS project approach
    const fullPrompt = `${systemPrompt}\n\nUser: ${message}`;

    // If we have history, include it in the chat, otherwise start fresh
    let chat;
    if (cleanedHistory.length > 0) {
      chat = model.startChat({
        history: cleanedHistory,
      });
    } else {
      chat = model.startChat();
    }

    // Send the message with system prompt included
    const result = await chat.sendMessage(fullPrompt);
    const response = result.response;
    const text = response.text();

    // Detect booking intent
    const bookingIntent = text.includes('BOOKING_INTENT') || 
      /(meeting|appointment|rdv|rendez-vous|schedule|book|calendar|available)/i.test(message);

    // Clean up BOOKING_INTENT marker from response
    const cleanResponse = text.replace(/BOOKING_INTENT/gi, '').trim();

    return {
      response: cleanResponse,
      bookingIntent
    };
  } catch (error) {
    console.error('Gemini API error:', error);
    throw error;
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { message, conversationHistory } = body;

    if (!message || typeof message !== 'string') {
      return NextResponse.json(
        { error: 'Message is required' },
        { status: 400 }
      );
    }

    // Generate response using Gemini Flash
    const { response, bookingIntent } = await generateResponseWithGemini(
      message,
      conversationHistory || []
    );

    return NextResponse.json({
      response,
      bookingIntent
    });
  } catch (error: any) {
    console.error('Chatbot API error:', error);
    
    // Check if it's a missing API key error
    if (error.message?.includes('GEMINI_API_KEY')) {
      return NextResponse.json(
        { 
          error: 'API configuration error', 
          response: 'The chatbot service is not properly configured. Please contact the site administrator.' 
        },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { 
        error: 'Internal server error', 
        response: 'Sorry, I encountered an error. Please try again later.' 
      },
      { status: 500 }
    );
  }
}

