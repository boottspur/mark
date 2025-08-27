'use client';

import { SceneProps } from '@/types/scene';
import { useState, useEffect } from 'react';
import { LoadingScene } from '../LoadingScene';

export function AIMarkupScene({ seed, message }: SceneProps) {
  const [htmlContent, setHtmlContent] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSnippet = async () => {
      try {
        setLoading(true);
        const params = new URLSearchParams();
        if (seed) params.append('seed', seed);
        if (message) params.append('message', message);
        
        const response = await fetch(`/api/mark-snippet${params.toString() ? `?${params.toString()}` : ''}`);
        
        if (!response.ok) {
          throw new Error(`Failed to fetch snippet: ${response.status}`);
        }
        
        const data = await response.json();
        setHtmlContent(data.html);
      } catch (err) {
        console.error('Error fetching AI snippet:', err);
        setError(err instanceof Error ? err.message : 'Failed to load AI content');
        // Fallback to a default snippet
        setHtmlContent(getDefaultSnippet(message));
      } finally {
        setLoading(false);
      }
    };

    fetchSnippet();
  }, [seed, message]);

  if (loading) {
    return <LoadingScene />;
  }

  if (error) {
    console.log('Using fallback due to error:', error);
  }

  return (
    <div className="fixed inset-0 bg-black">
      <iframe
        srcDoc={htmlContent}
        className="w-full h-full border-0"
        sandbox="allow-scripts"
        title="AI Generated Mark Scene"
      />
    </div>
  );
}

function getDefaultSnippet(message?: string) {
  const snippets = [
    // Pulsating neon
    `<!DOCTYPE html>
<html>
<head>
<style>
  body {
    margin: 0;
    background: #000;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
    overflow: hidden;
  }
  .mark {
    font-size: 20vw;
    font-weight: 900;
    color: #fff;
    text-shadow: 
      0 0 10px #ff00ff,
      0 0 20px #ff00ff,
      0 0 40px #ff00ff,
      0 0 80px #ff00ff;
    animation: pulse 2s infinite;
  }
  .message {
    position: fixed;
    bottom: 2rem;
    left: 50%;
    transform: translateX(-50%);
    color: #fff;
    text-align: center;
    font-size: 1.5rem;
    max-width: 80%;
    animation: fadeIn 1s 2s both;
  }
  @keyframes pulse {
    0%, 100% { transform: scale(1); opacity: 1; }
    50% { transform: scale(1.1); opacity: 0.8; }
  }
  @keyframes fadeIn {
    from { opacity: 0; transform: translateX(-50%) translateY(20px); }
    to { opacity: 1; transform: translateX(-50%) translateY(0); }
  }
</style>
</head>
<body>
  <div class="mark">MARK</div>
  ${message ? `<div class="message">${decodeURIComponent(message)}</div>` : ''}
</body>
</html>`,
    // Matrix rain effect
    `<!DOCTYPE html>
<html>
<head>
<style>
  body {
    margin: 0;
    background: #000;
    color: #0f0;
    font-family: monospace;
    overflow: hidden;
  }
  canvas { display: block; }
  .mark {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: 15vw;
    font-weight: bold;
    color: #fff;
    z-index: 10;
    text-shadow: 0 0 20px #0f0;
  }
</style>
</head>
<body>
  <canvas id="c"></canvas>
  <div class="mark">MARK</div>
  <script>
    const c = document.getElementById('c');
    const ctx = c.getContext('2d');
    c.width = window.innerWidth;
    c.height = window.innerHeight;
    const letters = 'MARK01'.split('');
    const fontSize = 16;
    const columns = c.width / fontSize;
    const drops = Array(Math.floor(columns)).fill(1);
    
    function draw() {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
      ctx.fillRect(0, 0, c.width, c.height);
      ctx.fillStyle = '#0f0';
      ctx.font = fontSize + 'px monospace';
      
      drops.forEach((y, i) => {
        const text = letters[Math.floor(Math.random() * letters.length)];
        ctx.fillText(text, i * fontSize, y * fontSize);
        if (y * fontSize > c.height && Math.random() > 0.975) drops[i] = 0;
        drops[i]++;
      });
    }
    setInterval(draw, 35);
  </script>
</body>
</html>`,
    // 3D rotating cube
    `<!DOCTYPE html>
<html>
<head>
<style>
  body {
    margin: 0;
    background: linear-gradient(45deg, #1a1a2e, #16213e);
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100vh;
    perspective: 1000px;
  }
  .cube {
    width: 200px;
    height: 200px;
    position: relative;
    transform-style: preserve-3d;
    animation: rotate 4s infinite linear;
  }
  .face {
    position: absolute;
    width: 200px;
    height: 200px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 48px;
    font-weight: bold;
    color: #fff;
    border: 2px solid #fff;
    background: rgba(255, 255, 255, 0.1);
  }
  .front { transform: translateZ(100px); }
  .back { transform: rotateY(180deg) translateZ(100px); }
  .right { transform: rotateY(90deg) translateZ(100px); }
  .left { transform: rotateY(-90deg) translateZ(100px); }
  .top { transform: rotateX(90deg) translateZ(100px); }
  .bottom { transform: rotateX(-90deg) translateZ(100px); }
  @keyframes rotate {
    from { transform: rotateX(0) rotateY(0); }
    to { transform: rotateX(360deg) rotateY(360deg); }
  }
</style>
</head>
<body>
  <div class="cube">
    <div class="face front">M</div>
    <div class="face back">A</div>
    <div class="face right">R</div>
    <div class="face left">K</div>
    <div class="face top">!</div>
    <div class="face bottom">!</div>
  </div>
</body>
</html>`,
  ];
  
  return snippets[Math.floor(Math.random() * snippets.length)];
}