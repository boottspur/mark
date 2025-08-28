import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

// Helper function to load prompt files
async function loadPrompt(filename: string): Promise<string> {
  try {
    const filePath = path.join(process.cwd(), 'prompts', 'ai-scenes', filename);
    return await fs.readFile(filePath, 'utf-8');
  } catch (error) {
    console.error(`Error loading prompt file ${filename}:`, error);
    // Return fallback prompts if files can't be loaded
    if (filename === 'system.txt') {
      return 'You are an expert creative coder. Generate only valid HTML code without any markdown or explanation.';
    }
    if (filename === 'main-scene.txt') {
      return 'Create a creative, animated HTML page that prominently features the word "MARK".';
    }
    return '';
  }
}

const FALLBACK_SNIPPETS = [
  // Wave animation
  `<!DOCTYPE html>
<html>
<head>
<style>
  body {
    margin: 0;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100vh;
    overflow: hidden;
  }
  .wave {
    font-size: 15vw;
    font-weight: 900;
    color: white;
    display: flex;
  }
  .wave span {
    animation: wave 1.5s ease-in-out infinite;
    display: inline-block;
  }
  @keyframes wave {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-30px); }
  }
</style>
</head>
<body>
  <div class="wave">
    <span style="animation-delay: 0s">M</span>
    <span style="animation-delay: 0.1s">A</span>
    <span style="animation-delay: 0.2s">R</span>
    <span style="animation-delay: 0.3s">K</span>
  </div>
</body>
</html>`,
  // Particles
  `<!DOCTYPE html>
<html>
<head>
<style>
  body {
    margin: 0;
    background: #000;
    overflow: hidden;
  }
  canvas { display: block; }
  .text {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: 12vw;
    font-weight: 900;
    color: transparent;
    -webkit-text-stroke: 2px #fff;
  }
</style>
</head>
<body>
  <canvas id="canvas"></canvas>
  <div class="text">MARK</div>
  <script>
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    const particles = [];
    for(let i = 0; i < 100; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 2,
        vy: (Math.random() - 0.5) * 2,
        size: Math.random() * 3 + 1
      });
    }
    
    function animate() {
      ctx.fillStyle = 'rgba(0,0,0,0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      ctx.fillStyle = '#fff';
      particles.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;
        if(p.x < 0 || p.x > canvas.width) p.vx = -p.vx;
        if(p.y < 0 || p.y > canvas.height) p.vy = -p.vy;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      });
      requestAnimationFrame(animate);
    }
    animate();
  </script>
</body>
</html>`,
];

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const seed = searchParams.get('seed');
  const message = searchParams.get('message');
  
  // Check for API key
  const apiKey = process.env.OPENAI_API_KEY;
  const model = process.env.MARK_SNIPPET_MODEL || 'gpt-4o-mini';
  
  if (!apiKey) {
    // Return deterministic fallback based on seed
    const index = seed 
      ? Math.abs(seed.split('').reduce((a, c) => a + c.charCodeAt(0), 0)) % FALLBACK_SNIPPETS.length
      : Math.floor(Math.random() * FALLBACK_SNIPPETS.length);
    
    return NextResponse.json({ 
      html: FALLBACK_SNIPPETS[index],
      fallback: true 
    });
  }

  try {
    // Load prompts from files
    const [systemPrompt, mainScenePrompt, messageAddonPrompt, outputFormatPrompt, themeHintsPrompt] = await Promise.all([
      loadPrompt('system.txt'),
      loadPrompt('main-scene.txt'),
      loadPrompt('message-addon.txt'),
      loadPrompt('output-format.txt'),
      loadPrompt('theme-hints.txt'),
    ]);

    // Build the complete prompt
    let prompt = mainScenePrompt;

    if (message) {
      const decodedMessage = decodeURIComponent(message);
      const messagePrompt = messageAddonPrompt.replace('{MESSAGE}', decodedMessage);
      prompt += `\n\n${messagePrompt}`;
      
      // Add theme hints based on message content
      prompt += `\n\n${themeHintsPrompt}`;
      prompt += `\n\nMessage to display: "${decodedMessage}" - Use the theme hints above to style appropriately.`;
    }

    prompt += `\n\n${outputFormatPrompt}`;

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model,
        messages: [
          {
            role: 'system',
            content: systemPrompt,
          },
          {
            role: 'user',
            content: seed ? `${prompt}\n\nSeed for variation: ${seed}` : prompt,
          },
        ],
        temperature: 0.9,
        max_tokens: 2000,
      }),
    });

    if (!response.ok) {
      throw new Error(`OpenAI API error: ${response.status}`);
    }

    const data = await response.json();
    const html = data.choices[0].message.content
      .replace(/```html\n?/gi, '')
      .replace(/```\n?/gi, '')
      .trim();
    
    return NextResponse.json({ html });
  } catch (error) {
    console.error('Error generating AI snippet:', error);
    
    // Return fallback on error
    const index = Math.floor(Math.random() * FALLBACK_SNIPPETS.length);
    return NextResponse.json({ 
      html: FALLBACK_SNIPPETS[index],
      fallback: true,
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
}