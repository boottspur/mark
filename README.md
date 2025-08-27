# MARK - Attention Microsite

A playful microsite that grabs Mark's attention with unique animated scenes on every page load.

## Features

- **Dynamic Scene Selection**: AI-generated scenes preferred, with fallback to predefined animations
- **Predefined Scenes**: Marquee, Radar Ping, Glitch, Emoji Rain, Spotlight
- **AI-Generated Content**: Unique HTML/CSS/JS snippets via OpenAI API
- **Scene Selector**: Footer interface to force specific scenes or test
- **URL Sharing**: Share specific scenes with query parameters
- **SEO Protection**: Prevents indexing by search engines
- **Debug Mode**: View load times and scene details with `?debug=true`

## Setup

1. Install dependencies:
```bash
npm install
```

2. Configure environment variables:
```bash
cp .env.example .env.local
# Add your OpenAI API key to .env.local
```

3. Run development server:
```bash
npm run dev
```

4. Visit http://localhost:3000/mmmaaaaarrrk (or /mark for redirect)

## Deployment

Deploy to Vercel:
```bash
vercel
```

Set environment variables in Vercel dashboard:
- `OPENAI_API_KEY`: Your OpenAI API key
- `MARK_SNIPPET_MODEL`: OpenAI model (default: gpt-4o-mini)

## URL Parameters

- `?scene=<id>`: Force a specific scene
- `?seed=<value>`: Seed for reproducible AI generation
- `?message=<text>`: Display a custom message to Mark (URL encoded)
- `?debug=true`: Show debug information

### Example URLs

- `/?message=Hey%20Mark%21%20Call%20me%20back` - Display a message with random scene
- `/?scene=glitch&message=Urgent%3A%20Need%20your%20input` - Message with specific scene
- `/?scene=ai-markup&message=Project%20deadline%20tomorrow&seed=123` - AI scene with message

## Scene IDs

- `ai-markup`: AI-generated HTML/CSS/JS
- `marquee`: Scrolling text
- `radar`: Radar ping with target lock
- `glitch`: TV static glitch effect
- `emoji-rain`: Falling emojis with bouncing text
- `spotlight`: Cursor reveals text

## Performance

- Target: <2s page load
- AI scenes cached for sharing
- Fallback snippets for instant loading
- Optimized for mobile and desktop