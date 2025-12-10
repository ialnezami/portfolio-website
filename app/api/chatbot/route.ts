import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

// Portfolio data structure for chatbot context - Complete information from info.md
const portfolioData = {
  // Personal Information
  name: 'Ibrahim Alnezami',
  title: 'Full Stack Developer',
  email: 'ibrahim.alnezami@gmail.com',
  phone: '0783837347',
  location: 'Paris, Île-de-France, France',
  github: 'https://github.com/ialnezami',
  linkedin: 'https://www.linkedin.com/in/ialnezami/',
  portfolio: 'ibrahimalnezami-portfolio.s3-website.eu-west-3.amazonaws.com',
  calendar: 'https://zeeg.me/ibrahimalnezami/30min',
  
  // Professional Summary
  summary: "I'm a next-generation engineer who leverages AI as a force multiplier to build faster, smarter, and more efficiently. With 7+ years of full-stack experience across JavaScript, Node.js, React, and Vue.js ecosystems, I've evolved beyond traditional coding patterns to embrace AI-assisted development as the future of software engineering.",
  superpower: "Using AI tools (like Cursor) to accelerate development 3x while maintaining code quality, architecture, and scalability.",
  
  // What I Build
  whatIBuild: [
    'Scalable SaaS applications with modern architectures (Next.js, Node.js, Firebase)',
    'RESTful APIs and integrations with complex third-party services',
    'Full-stack solutions from database design to frontend UX',
    'Cloud-native applications on AWS, Vercel, and serverless platforms'
  ],
  
  // My Approach
  approach: {
    speed: 'AI accelerates me, not replaces my critical thinking',
    architecture: 'I understand complex systems and make them better',
    learning: 'I embrace new tools, frameworks, and AI advancements',
    quality: 'I deliver production-ready code, fast'
  },
  
  // Professional Experience
  experience: [
    {
      role: 'Full Stack Developer',
      company: 'VIA UNiFi Information Technology',
      duration: 'Sep 2025 - Oct 2025',
      location: 'Dubai, UAE',
      highlights: [
        'Developed AI-integrated SaaS applications',
        'Implemented modern full-stack architectures with Next.js and Node.js',
        'Built scalable APIs with PostgreSQL and MongoDB',
        'Leveraged AI-assisted development tools (Cursor) for rapid iteration'
      ]
    },
    {
      role: 'Freelance Developer',
      company: 'Freelance',
      duration: 'Aug 2025 - Oct 2025',
      location: 'France',
      highlights: []
    },
    {
      role: 'Full Stack Developer',
      company: 'Antidots - Positive Technologies for All',
      duration: 'Sep 2022 - Aug 2025',
      location: 'Aix-les-Bains, Auvergne-Rhône-Alpes, France',
      highlights: [
        'Design and develop web applications using JavaScript, Vue.js, Nuxt.js, Nest.js, and Feathers.js',
        'Create and maintain RESTful APIs with Mongoose and Node.js',
        'Work with MongoDB to store and retrieve data efficiently',
        'Integrate web applications with both SOAP and RESTful APIs',
        'Test web applications using Cypress and Jest to ensure quality and performance',
        'Collaborate with a team of developers to ensure timely project completion',
        'Troubleshoot and debug web applications to resolve issues and improve functionality'
      ]
    },
    {
      role: 'Software Engineer (Apprentice)',
      company: 'Lannion-Trégor Communauté',
      duration: 'Sep 2019 - Aug 2022',
      location: 'Lannion, Bretagne, France',
      highlights: [
        'Create and maintain APIs using Node.js and Express',
        'Work with MySQL databases to store and retrieve data',
        'Test web applications using PHPUnit and Cypress',
        'Collaborate with development teams to ensure projects are completed on time',
        'Troubleshoot and debug web systems',
        'Communicate effectively with team members and stakeholders'
      ]
    },
    {
      role: 'Full Stack Developer',
      company: 'Lannion-Trégor Communauté',
      duration: 'Sep 2018 - Aug 2019',
      location: 'Lannion, Bretagne, France',
      highlights: [
        'Participate in technical and functional design of applications',
        'Build robust and scalable applications using modern technologies',
        'Create demonstrations of developed applications for stakeholders',
        'Collaborate with cross-functional teams including designers and backend developers',
        'Ensure code quality through clean, maintainable, and efficient code',
        'Conduct code reviews and implement improvements'
      ]
    }
  ],
  
  // Skills
  skills: {
    languages: ['JavaScript', 'TypeScript', 'Python', 'Go', 'PHP', 'Dart'],
    frontend: ['React', 'Next.js', 'Vue.js', 'Nuxt.js', 'HTML5', 'CSS3', 'Tailwind CSS'],
    backend: ['Node.js', 'Express.js', 'Nest.js', 'Feathers.js', 'FastAPI (Python)', 'Laravel'],
    stateManagement: ['React Query', 'TanStack Query'],
    databases: ['PostgreSQL', 'MongoDB', 'MySQL', 'Mongoose'],
    apis: ['RESTful APIs', 'SOAP APIs', 'Third-party API integrations', 'Firebase Functions', 'GraphQL'],
    cloud: ['AWS (S3, EC2, Lambda)', 'Vercel', 'Docker', 'Firebase', 'Serverless architectures'],
    testing: ['Jest', 'Cypress', 'PHPUnit', 'E2E testing', 'Test-driven development'],
    ai: ['Cursor IDE', 'Google Gemini / Vertex AI', 'AI-assisted development workflows', 'RAG', 'LLM integration'],
    other: ['System architecture design', 'API design & documentation', 'Code reviews & mentoring', 'Agile/Scrum', 'Git workflow optimization']
  },
  
  // Projects (All from website)
  projects: [
    {
      name: 'AI Chatbot Assistant',
      description: 'Modern AI chatbot with real-time streaming, weather integration, and message editing. Built for KS LAB technical test with Google Gemini Pro.',
      tech: ['Next.js', 'TypeScript', 'React', 'Tailwind CSS', 'Google Gemini', 'Streaming'],
      githubLink: 'https://github.com/ialnezami/KS',
      liveLink: 'https://ks-pink.vercel.app',
      features: ['Real-time streaming', 'Weather API integration', 'Message editing']
    },
    {
      name: 'Catalogue E-commerce',
      description: 'Modern e-commerce product catalog platform with elegant design. Full-stack application showcasing contemporary product management.',
      tech: ['Next.js', 'TypeScript', 'React', 'Tailwind CSS', 'E-commerce'],
      githubLink: 'https://github.com/ialnezami/catalogue',
      liveLink: 'https://catalogue-blue.vercel.app',
      features: ['Product catalog', 'Modern UI/UX']
    },
    {
      name: 'Flutter POS System',
      description: 'An open-source Flutter POS system designed for small restaurants and businesses. Complete Point of Sale solution with modern UI.',
      tech: ['Flutter', 'Dart', 'Mobile', 'POS'],
      link: 'https://github.com/ialnezami/flutter-pos-system',
      features: ['Point of Sale', 'Restaurant management', 'Modern UI']
    },
    {
      name: 'RAG Application',
      description: 'Retrieval-Augmented Generation system with vector databases. AI-powered application for accurate, context-aware responses.',
      tech: ['Python', 'RAG', 'Vector DB', 'AI/ML'],
      link: 'https://github.com/ialnezami/app-RAG',
      features: ['RAG system', 'Vector databases', 'AI-powered responses']
    },
    {
      name: 'React POS System',
      description: 'Modern Point of Sale system built with React, TypeScript, and Node.js. Full-featured restaurant and retail management.',
      tech: ['React', 'TypeScript', 'Node.js', 'POS'],
      link: 'https://github.com/ialnezami/POS-REACTJS',
      features: ['POS system', 'Restaurant management', 'Retail management']
    },
    {
      name: 'E-commerce API',
      description: 'Full-featured e-commerce backend API built with TypeScript. Complete RESTful API with authentication, products, and orders.',
      tech: ['TypeScript', 'Node.js', 'REST API', 'E-commerce'],
      link: 'https://github.com/ialnezami/e-commerce-api',
      features: ['RESTful API', 'Authentication', 'Product management', 'Order management']
    },
    {
      name: 'LinkedIn AI Agent',
      description: 'AI-powered LinkedIn agent built with Python. Automated LinkedIn interactions and intelligent responses.',
      tech: ['Python', 'AI Agent', 'LLM', 'Automation'],
      link: 'https://github.com/ialnezami/Linkedin-agent-ai',
      features: ['AI agent', 'LinkedIn automation', 'Intelligent responses']
    },
    {
      name: 'WikiBot',
      description: 'Intelligent Wikipedia chatbot with AI capabilities. Interactive bot for information retrieval and query responses.',
      tech: ['AI Bot', 'NLP', 'Chatbot', 'Wikipedia'],
      link: 'https://github.com/ialnezami/WikiBot',
      features: ['Wikipedia integration', 'NLP', 'Chatbot']
    },
    {
      name: 'Shop Inventory',
      description: 'Complete inventory management system built with TypeScript. Track products, sales, and stock levels.',
      tech: ['TypeScript', 'Node.js', 'Inventory', 'Backend'],
      link: 'https://github.com/ialnezami/shopInventory',
      features: ['Inventory management', 'Product tracking', 'Sales tracking']
    },
    {
      name: 'Docker CLI Tool',
      description: 'Modern Docker management CLI tool built with Go. Simplified Docker container and image management.',
      tech: ['Go', 'Docker', 'CLI', 'DevOps'],
      link: 'https://github.com/ialnezami/docker-cli-tool',
      features: ['Docker management', 'CLI tool', 'Container management']
    },
    {
      name: 'LeadGen360',
      description: 'AI-powered lead generation platform. Automated lead capture and management system with intelligent processing.',
      tech: ['Python', 'AI', 'Lead Generation', 'Automation'],
      link: 'https://github.com/ialnezami/LeadGen360',
      features: ['Lead generation', 'AI-powered', 'Automation']
    },
    {
      name: 'File Organizer',
      description: 'Smart file organization tool built with Go. Automatically categorizes and organizes files by type and content.',
      tech: ['Go', 'CLI', 'File Management', 'Automation'],
      link: 'https://github.com/ialnezami/file-organizer',
      features: ['File organization', 'Automation', 'Smart categorization']
    },
    {
      name: 'Barber App API',
      description: 'Professional appointment booking API for barber shops and salons. Complete backend with scheduling and customer management.',
      tech: ['TypeScript', 'Node.js', 'Booking', 'API'],
      link: 'https://github.com/ialnezami/barber-app-api',
      features: ['Appointment booking', 'Scheduling', 'Customer management']
    },
    {
      name: 'Contract Generator Pro',
      description: 'AI-powered contract generation system. Automatically creates professional contracts based on templates and requirements.',
      tech: ['PHP', 'AI', 'Contracts', 'Automation'],
      link: 'https://github.com/ialnezami/Contract-Generator-Pro',
      features: ['Contract generation', 'AI-powered', 'Automation']
    }
  ],
  
  // Education
  education: [
    {
      degree: 'Diplôme d\'ingénieur (Engineering Degree)',
      institution: 'ENSSAT - École Nationale Supérieure des Sciences Appliquées et de Technologie',
      duration: '2019 - 2022',
      field: 'Informatique, Multimédia et Réseau (Computer Science, Multimedia & Networks)',
      location: 'Lannion, France'
    },
    {
      degree: 'Diplôme universitaire de technologie (DUT)',
      institution: 'IUT Lannion',
      duration: 'September 2017 - August 2019',
      field: 'Informatique (Computer Science)',
      location: 'Lannion, France'
    },
    {
      degree: 'Diplôme d\'ingénieur (Engineering Degree)',
      institution: 'Damascus University',
      duration: '2013 - 2016',
      field: 'Informatique (Computer Science)',
      location: 'Damascus, Syria'
    }
  ],
  
  // Certifications
  certifications: [
    {
      name: 'Docker Fundamentals',
      holder: 'Ibrahim Alnezami'
    }
  ],
  
  // Languages
  languages: ['Arabic (Native)', 'English (Full Professional)', 'French (Full Professional)'],
  
  // AI-First Philosophy
  aiFirst: {
    why: 'I\'ve embraced the reality that AI-powered tools have fundamentally changed software development—and I\'ve made it my competitive advantage.',
    advantages: {
      speed: '3x faster development cycles without sacrificing architecture or quality',
      learning: 'Discover new frameworks, libraries, and techniques in real-time',
      problemSolving: 'AI helps explore multiple solutions quickly'
    },
    tools: {
      primary: 'Cursor IDE (AI-powered coding)',
      research: 'ChatGPT for architecture discussions, Claude for code reviews'
    }
  }
};

// Create system prompt with portfolio data
function createSystemPrompt(): string {
  return `You are a helpful portfolio assistant for ${portfolioData.name}, a ${portfolioData.title} based in ${portfolioData.location}.

Your role is to answer questions about Ibrahim's professional background, skills, experience, projects, education, and help visitors schedule meetings.

PORTFOLIO INFORMATION:

**Personal Information:**
- Name: ${portfolioData.name}
- Title: ${portfolioData.title}
- Location: ${portfolioData.location}
- Email: ${portfolioData.email}
- Phone: ${portfolioData.phone}
- GitHub: ${portfolioData.github}
- LinkedIn: ${portfolioData.linkedin}
- Portfolio: ${portfolioData.portfolio}
- Languages: ${portfolioData.languages.join(', ')}

**Professional Summary:**
${portfolioData.summary}

**Superpower:** ${portfolioData.superpower}

**What I Build:**
${portfolioData.whatIBuild.map(item => `- ${item}`).join('\n')}

**My Approach:**
- Speed + Quality: ${portfolioData.approach.speed}
- Architecture-first: ${portfolioData.approach.architecture}
- Continuous Learning: ${portfolioData.approach.learning}
- No Compromises: ${portfolioData.approach.quality}

**Professional Experience:**
${portfolioData.experience.map((exp, i) => `
${i + 1}. ${exp.role} at ${exp.company}
   - Duration: ${exp.duration}
   - Location: ${exp.location}
   ${exp.highlights.length > 0 ? `- Key Highlights:\n${exp.highlights.map(h => `     • ${h}`).join('\n')}` : ''}
`).join('')}

**Technical Skills:**
- Languages: ${portfolioData.skills.languages.join(', ')}
- Frontend: ${portfolioData.skills.frontend.join(', ')}
- Backend: ${portfolioData.skills.backend.join(', ')}
- State Management: ${portfolioData.skills.stateManagement.join(', ')}
- Databases: ${portfolioData.skills.databases.join(', ')}
- APIs & Integrations: ${portfolioData.skills.apis.join(', ')}
- Cloud & DevOps: ${portfolioData.skills.cloud.join(', ')}
- Testing: ${portfolioData.skills.testing.join(', ')}
- AI & Modern Tools: ${portfolioData.skills.ai.join(', ')}
- Other Skills: ${portfolioData.skills.other.join(', ')}

**Projects (${portfolioData.projects.length} total):**
${portfolioData.projects.map((proj, i) => `
${i + 1}. ${proj.name}
   - Description: ${proj.description}
   - Technologies: ${proj.tech.join(', ')}
   ${proj.githubLink ? `- GitHub: ${proj.githubLink}` : proj.link ? `- GitHub: ${proj.link}` : ''}
   ${proj.liveLink ? `- Live Demo: ${proj.liveLink}` : ''}
   ${proj.features ? `- Features: ${proj.features.join(', ')}` : ''}
`).join('')}

**Education:**
${portfolioData.education.map((edu, i) => `
${i + 1}. ${edu.degree}
   - Institution: ${edu.institution}
   - Duration: ${edu.duration}
   - Field: ${edu.field}
   - Location: ${edu.location}
`).join('')}

**Certifications:**
${portfolioData.certifications.map(cert => `- ${cert.name}`).join('\n')}

**AI-First Development Philosophy:**
${portfolioData.aiFirst.why}

Key Advantages:
- Speed: ${portfolioData.aiFirst.advantages.speed}
- Learning: ${portfolioData.aiFirst.advantages.learning}
- Problem Solving: ${portfolioData.aiFirst.advantages.problemSolving}

Primary Tools: ${portfolioData.aiFirst.tools.primary}
Research Tools: ${portfolioData.aiFirst.tools.research}

**Meeting Booking:**
- Calendar Link: ${portfolioData.calendar}
- Meeting Duration: 30 minutes

INSTRUCTIONS:
1. Answer questions naturally and conversationally based on ALL the portfolio information above
2. Be friendly, professional, and helpful
3. If asked about scheduling a meeting, appointment, or booking (in any language: meeting, appointment, rdv, rendez-vous, schedule, book, calendar, available), respond positively and mention that a calendar booking link is available. Also indicate "BOOKING_INTENT" in your response.
4. Keep responses concise and relevant (2-3 sentences when possible)
5. If asked about something not in the portfolio data, politely say you don't have that information but can help with other questions
6. Respond in the same language as the user's question (English, French, or Arabic)
7. Always be helpful and encourage further questions or meeting scheduling
8. You can provide detailed information about any project, skill, experience, or education when asked

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

