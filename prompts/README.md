# AI Scene Generation Prompts

This directory contains all the prompts used for AI-generated scenes in the Mark attention microsite.

## Structure

### `/ai-scenes/`
Contains prompts for the AI scene generation via OpenAI API.

- **`system.txt`** - The system role prompt that defines the AI's expertise and behavior
- **`main-scene.txt`** - The main prompt for generating animated MARK scenes
- **`message-addon.txt`** - Additional prompt when a custom message is provided
- **`output-format.txt`** - Instructions for output formatting

## How to Edit

Simply edit any `.txt` file to modify the prompts. Changes will be picked up on the next API call.

### Adding Dynamic Variables

The following placeholders are replaced dynamically:
- `{MESSAGE}` - The user-provided message (URL decoded)
- `{SEED}` - The seed value for reproducible generation

## Tips for Better Results

1. **Be Explicit**: Specify exact CSS properties and values
2. **Mobile First**: Always emphasize responsive design
3. **Full Viewport**: Stress the importance of borderless, full-screen designs
4. **Avoid Containers**: Explicitly forbid fixed-size boxes or containers
5. **Use Examples**: Provide specific animation ideas to inspire variety

## Testing Prompts

After editing, test with:
```bash
# Test basic generation
curl http://localhost:3000/api/mark-snippet

# Test with message
curl "http://localhost:3000/api/mark-snippet?message=Test%20message"

# Test with seed
curl "http://localhost:3000/api/mark-snippet?seed=test-seed"
```