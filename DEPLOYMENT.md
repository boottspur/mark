# MARK Deployment Instructions

## Option 1: Subdomain Deployment (Recommended)

Deploy to `apps.chrismerchant.work/mmmaaaaarrrk`

### Step 1: Deploy to Vercel

```bash
# Install Vercel CLI if you haven't
npm i -g vercel

# Deploy from project root
vercel

# Follow prompts:
# - Set up and deploy? Y
# - Which scope? [your-username]
# - Found project? Y (if existing) or name it
# - Deploy to production? Y
```

### Step 2: Configure Custom Domain

1. In Vercel Dashboard → Project Settings → Domains
2. Add domain: `apps.chrismerchant.work`
3. Vercel will show DNS records needed

### Step 3: DNS Configuration

Add CNAME record to your DNS provider:
```
Type: CNAME
Name: apps
Value: cname.vercel-dns.com
```

### Step 4: Environment Variables

In Vercel Dashboard → Project Settings → Environment Variables:

```
OPENAI_API_KEY=your_openai_api_key_here
MARK_SNIPPET_MODEL=gpt-4o-mini
RATE_LIMIT_PER_MINUTE=10
```

Copy the values from your `.env.local` file.

### Step 5: Test Deployment

Visit:
- `https://apps.chrismerchant.work/` - Apps directory page
- `https://apps.chrismerchant.work/mmmaaaaarrrk` - Mark's main page
- `https://apps.chrismerchant.work/mark` - Redirect to Mark's page

## Option 2: Path-based Deployment

Deploy to existing `chrismerchant.work/mmmaaaaarrrk`

### Requirements:
- Access to main site deployment
- Configure routing to handle /mmmaaaaarrrk and /mark paths
- Ensure no conflicts with existing routes

## Post-Deployment Checklist

- [ ] All redirects working (`/` → `/mmmaaaaarrrk`, `/mark` → `/mmmaaaaarrrk`)
- [ ] AI scenes generating (check `/api/mark-snippet`)
- [ ] Scene selector footer functional
- [ ] Debug mode accessible (`?debug=true`)
- [ ] Mobile responsive
- [ ] SEO properly blocked (check robots.txt)
- [ ] Share URLs working (`?scene=glitch&seed=123`)

## Production Monitoring

Monitor these metrics:
- Page load time (<2s target)
- AI API success rate
- Error rates in scenes
- Mobile performance

## Troubleshooting

**AI scenes not working:**
- Verify OPENAI_API_KEY in Vercel env vars
- Check function logs in Vercel dashboard
- Test API endpoint directly

**Hydration errors:**
- Ensure client-side components are marked 'use client'
- Check for Math.random() or Date.now() in components

**Slow loading:**
- Check OpenAI API response times
- Verify function timeout settings (30s max)