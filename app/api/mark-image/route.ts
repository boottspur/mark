import { NextRequest, NextResponse } from 'next/server';

// Fallback SVG generator
function generateFallbackSVG(seed?: string): string {
  const colors = ['#ff006e', '#fb5607', '#ffbe0b', '#8338ec', '#3a86ff'];
  const seedNum = seed ? 
    Math.abs(seed.split('').reduce((a, c) => a + c.charCodeAt(0), 0)) : 
    Date.now();
  
  const color1 = colors[seedNum % colors.length];
  const color2 = colors[(seedNum + 1) % colors.length];
  
  const patterns = [
    // Gradient burst
    `<svg width="800" height="600" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="grad">
          <stop offset="0%" style="stop-color:${color1};stop-opacity:1" />
          <stop offset="100%" style="stop-color:${color2};stop-opacity:1" />
        </radialGradient>
      </defs>
      <rect width="800" height="600" fill="url(#grad)"/>
      <text x="400" y="300" font-family="Arial Black" font-size="120" font-weight="900" 
            fill="white" text-anchor="middle" dominant-baseline="middle">MARK</text>
      ${Array.from({length: 20}, (_, i) => 
        `<circle cx="${400 + Math.cos(i * Math.PI / 10) * 200}" 
                 cy="${300 + Math.sin(i * Math.PI / 10) * 200}" 
                 r="${20 + i * 2}" fill="none" stroke="white" stroke-width="2" opacity="${1 - i * 0.04}"/>`
      ).join('')}
    </svg>`,
    
    // Geometric pattern
    `<svg width="800" height="600" xmlns="http://www.w3.org/2000/svg">
      <rect width="800" height="600" fill="${color1}"/>
      ${Array.from({length: 10}, (_, i) => 
        `<rect x="${i * 80}" y="0" width="40" height="600" fill="${color2}" opacity="0.5"/>
         <rect x="0" y="${i * 60}" width="800" height="30" fill="${color2}" opacity="0.5"/>`
      ).join('')}
      <text x="400" y="300" font-family="Arial Black" font-size="140" font-weight="900" 
            fill="white" text-anchor="middle" dominant-baseline="middle" 
            stroke="${color2}" stroke-width="3">MARK</text>
    </svg>`,
    
    // Wave pattern
    `<svg width="800" height="600" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="wave" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" style="stop-color:${color1};stop-opacity:1" />
          <stop offset="100%" style="stop-color:${color2};stop-opacity:1" />
        </linearGradient>
      </defs>
      <rect width="800" height="600" fill="url(#wave)"/>
      ${Array.from({length: 5}, (_, i) => 
        `<path d="M 0 ${300 + i * 30} Q 200 ${250 + i * 30} 400 ${300 + i * 30} T 800 ${300 + i * 30}" 
               fill="none" stroke="white" stroke-width="3" opacity="${1 - i * 0.15}"/>`
      ).join('')}
      <text x="400" y="300" font-family="Arial Black" font-size="150" font-weight="900" 
            fill="white" text-anchor="middle" dominant-baseline="middle">MARK</text>
    </svg>`,
  ];
  
  return patterns[seedNum % patterns.length];
}

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const seed = searchParams.get('seed');
  
  // For now, always return SVG since image generation requires different API setup
  // This can be extended to use DALL-E or other image generation APIs
  const svg = generateFallbackSVG(seed || undefined);
  
  return new NextResponse(svg, {
    headers: {
      'Content-Type': 'image/svg+xml',
      'Cache-Control': 'public, max-age=3600',
    },
  });
}