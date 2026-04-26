# MuAPI CLI Complete Tutorial

A comprehensive guide to using the **muapi-cli** - the official command-line interface for muapi.ai that lets you generate images, videos, and audio directly from your terminal.

## Table of Contents

1. [Introduction](#introduction)
2. [Installation](#installation)
3. [Authentication & Setup](#authentication--setup)
4. [Basic Commands](#basic-commands)
5. [Image Generation](#image-generation)
6. [Video Generation](#video-generation)
7. [Audio Creation](#audio-creation)
8. [Enhancement Tools](#enhancement-tools)
9. [Video Editing](#video-editing)
10. [Advanced Workflows](#advanced-workflows)
11. [MCP Server for AI Agents](#mcp-server-for-ai-agents)
12. [Tips & Best Practices](#tips--best-practices)

---

## Introduction

**MuAPI CLI** is a powerful command-line tool designed with an "agent-first" philosophy, meaning every command works seamlessly for both:
- **Humans**: Colored output, formatted tables, easy-to-read responses
- **AI Agents**: JSON output, jq filtering, semantic exit codes, MCP server mode

### Key Features
- Generate images, videos, and audio from text prompts
- Edit and enhance existing media files
- Upload and manage files
- Account and API key management
- Automation-friendly with JSON output and scripting support
- MCP server integration for AI agents (Claude, Cursor, etc.)

---

## Installation

### Option 1: npm (Recommended - No Python Required)

```bash
npm install -g muapi-cli
```

### Option 2: pip

```bash
pip install muapi-cli
```

### Option 3: Run Without Installing

```bash
npx muapi-cli --help
```

### Verify Installation

```bash
muapi --version
muapi --help
```

### Shell Completions (Optional)

For better terminal experience, install shell completions:

```bash
# Bash
muapi --install-completion bash

# Zsh
muapi --install-completion zsh

# Fish
muapi --install-completion fish
```

---

## Authentication & Setup

### Step 1: Create an Account (New Users)

Register with your email:

```bash
muapi auth register --email you@example.com --password "your-secure-password"
```

You'll receive an OTP (One-Time Password) via email. Verify it:

```bash
muapi auth verify --email you@example.com --otp 123456
```

### Step 2: Login

```bash
muapi auth login --email you@example.com --password "your-secure-password"
```

This automatically saves your API key locally.

### Alternative: Configure API Key Manually

If you already have an API key:

```bash
muapi auth configure --api-key "YOUR_API_KEY_HERE"
```

### Check Current Authentication

```bash
# See who's logged in (API key masked)
muapi auth whoami

# Check your credit balance
muapi account balance
```

### Password Recovery

Forgot your password?

```bash
# Request reset OTP
muapi auth forgot-password --email you@example.com

# Reset with OTP
muapi auth reset-password --email you@example.com --otp 123456 --password "new-password"
```

### Logout

```bash
muapi auth logout
```

---

## Basic Commands

### Help System

```bash
# General help
muapi --help

# Command-specific help
muapi image --help
muapi video generate --help
```

### Configuration

```bash
# Set default values
muapi config set model.image flux-dev
muapi config set model.video kling-master
muapi config set output json

# View configuration
muapi config get model.image
muapi config list

# Remove a config
muapi config unset model.image
```

### Environment Variables

Override settings with environment variables:

```bash
export MUAPI_API_KEY="your-api-key"
export MUAPI_BASE_URL="https://custom-api-url.com"
export NO_COLOR=true
```

---

## Image Generation

### Text-to-Image

Generate an image from a text prompt:

```bash
muapi image generate "a cyberpunk city at night, neon lights, rain"
```

Specify a model:

```bash
muapi image generate "a futuristic robot" --model flux-dev
```

Available models: `flux-dev`, `flux-schnell`, `flux-kontext-dev`, `flux-kontext-pro`, `flux-kontext-max`, `hidream-fast`, `hidream-dev`, `hidream-full`, `wan2.1`, `reve`, `gpt4o`, `midjourney`, `seedream`, `qwen`

### Image-to-Image Editing

Edit an existing image:

```bash
muapi image edit "make it look like a watercolor painting" --image "https://example.com/photo.jpg"
```

### List Available Models

```bash
muapi image models
```

### Download Results Automatically

```bash
muapi image generate "a mountain landscape" --download ./my-images
```

### Output as JSON (for scripting)

```bash
muapi image generate "a cat" --output-json
```

### Filter JSON Output with jq

```bash
# Get just the request ID
muapi image generate "a dog" --output-json --jq '.request_id'

# Get the image URL when complete
muapi predict wait <request_id> --output-json --jq '.outputs[0].url'
```

---

## Video Generation

### Text-to-Video

```bash
muapi video generate "a dog running on a beach at sunset"
```

Specify a model:

```bash
muapi video generate "a spaceship landing on Mars" --model kling-master
```

Available models: `veo3`, `veo3-fast`, `kling-master`, `kling-std`, `kling-pro`, `wan2.1`, `wan2.2`, `seedance-pro`, `seedance-lite`, `hunyuan`, `runway`, `pixverse`, `vidu`, `minimax-std`, `minimax-pro`

### Image-to-Video Animation

Animate a static image:

```bash
muapi video from-image "make the water flow and clouds move" --image "https://example.com/landscape.jpg"
```

### List Video Models

```bash
muapi video models
```

### Async Generation (Non-blocking)

Submit a job and get the request ID immediately:

```bash
REQUEST_ID=$(muapi video generate "a bird flying" --model kling-master --no-wait --output-json --jq '.request_id' | tr -d '"')
echo "Request ID: $REQUEST_ID"
```

Wait for completion later:

```bash
muapi predict wait "$REQUEST_ID" --download ./videos
```

---

## Audio Creation

### Generate Music with Suno

```bash
muapi audio create "upbeat lo-fi hip hop for studying, chill vibes"
```

### Generate Audio with MMAudio

```bash
muapi audio from-text "sound of rain and thunder"
```

### Add Audio to Video

```bash
muapi audio from-video "https://example.com/my-video.mp4"
```

### Remix Existing Song

```bash
muapi audio remix <song-id>
```

### Extend a Song

```bash
muapi audio extend <song-id>
```

---

## Enhancement Tools

MuAPI provides powerful AI enhancement capabilities:

### Upscale Images

```bash
muapi enhance upscale "https://example.com/low-res-image.jpg"
```

### Remove Background

```bash
muapi enhance bg-remove "https://example.com/photo-with-bg.jpg"
```

### Face Swap

```bash
muapi enhance face-swap --source "https://example.com/source-face.jpg" --target "https://example.com/target-photo.jpg"
```

### Skin Enhancement

```bash
muapi enhance skin "https://example.com/portrait.jpg"
```

### Colorize Black & White Photos

```bash
muapi enhance colorize "https://example.com/old-bw-photo.jpg"
```

### Apply Ghibli Anime Style

```bash
muapi enhance ghibli "https://example.com/photo.jpg"
```

### Anime Style Conversion

```bash
muapi enhance anime "https://example.com/photo.jpg"
```

### Extend/Outpaint Images

```bash
muapi enhance extend "https://example.com/partial-image.jpg"
```

### Create Professional Product Shots

```bash
muapi enhance product-shot "https://example.com/product.jpg"
```

### Remove Objects (Erase)

```bash
muapi enhance erase "https://example.com/photo.jpg" --mask "https://example.com/mask.png"
```

---

## Video Editing

### Apply Effects

```bash
muapi edit effects --video "https://example.com/video.mp4" --effect "cinematic"
```

Available effects vary by model - check documentation for full list.

### Lip Sync

Sync video to audio:

```bash
muapi edit lipsync --video "https://example.com/talking-head.mp4" --audio "https://example.com/audio.mp3"
```

### Make Person Dance

```bash
muapi edit dance --image "https://example.com/person.jpg" --video "https://example.com/dance-reference.mp4"
```

### Change Clothing

```bash
muapi edit dress --image "https://example.com/person.jpg"
```

### Extract Highlights

```bash
muapi edit clipping "https://example.com/long-video.mp4"
```

---

## Advanced Workflows

### Workflow 1: Complete Onboarding Automation

Automate account creation and setup:

```bash
#!/bin/bash

# Register
muapi auth register --email agent@example.com --password "secure-password"

# Verify (you'll need to get OTP from email)
muapi auth verify --email agent@example.com --otp 123456

# Login
muapi auth login --email agent@example.com --password "secure-password"

# Check balance
muapi account balance --output-json

# Top up credits (optional)
muapi account topup --amount 10 --output-json --no-open
```

### Workflow 2: Async Job Submission & Polling

Submit jobs without waiting, then poll when ready:

```bash
#!/bin/bash

# Submit video generation job
REQUEST_ID=$(muapi video generate "a dog on a beach" \
  --model kling-master \
  --no-wait \
  --output-json \
  --jq '.request_id' | tr -d '"')

echo "Job submitted. Request ID: $REQUEST_ID"

# Do other work...

# Wait for completion and download
muapi predict wait "$REQUEST_ID" --download ./outputs
```

### Workflow 3: Upload → Edit → Download Pipeline

Chain multiple operations:

```bash
#!/bin/bash

# Upload local file
URL=$(muapi upload file ./photo.jpg \
  --output-json \
  --jq '.url' | tr -d '"')

echo "Uploaded to: $URL"

# Edit the image
muapi image edit "make it look like an oil painting" \
  --image "$URL" \
  --model flux-kontext-pro \
  --download ./outputs
```

### Workflow 4: Rotate API Keys Programmatically

Automate key rotation for CI/CD:

```bash
#!/bin/bash

# Create new key
NEW_KEY=$(muapi keys create --name "ci-$(date +%Y%m%d)" \
  --output-json \
  --jq '.api_key' | tr -d '"')

echo "New API Key: $NEW_KEY"

# Get old key ID
OLD_ID=$(muapi keys list --output-json --jq '.[0].id' | tr -d '"')

# Delete old key (confirm with --yes)
muapi keys delete "$OLD_ID" --yes
```

### Workflow 5: Discover Available Endpoints

Explore the API programmatically:

```bash
# List all available endpoints
muapi docs openapi --jq '.paths | keys[]'

# Get specific endpoint details
muapi docs openapi --jq '.paths["/image/generate"]'
```

### File Upload

Upload local files to get hosted URLs:

```bash
muapi upload file ./my-image.jpg
muapi upload file ./my-video.mp4
```

Get just the URL:

```bash
muapi upload file ./file.jpg --output-json --jq '.url'
```

### API Key Management

```bash
# List all keys
muapi keys list

# Create new key
muapi keys create --name "my-project-key"

# Delete a key
muapi keys delete <key-id>
```

---

## MCP Server for AI Agents

MuAPI includes a Model Context Protocol (MCP) server for integration with AI agents like Claude Desktop, Cursor, and other MCP-compatible tools.

### Start MCP Server

```bash
muapi mcp serve
```

### Configure Claude Desktop

Add to your Claude Desktop config (`~/Library/Application Support/Claude/claude_desktop_config.json` on macOS):

```json
{
  "mcpServers": {
    "muapi": {
      "command": "muapi",
      "args": ["mcp", "serve"],
      "env": {
        "MUAPI_API_KEY": "your-api-key-here"
      }
    }
  }
}
```

### Available MCP Tools

The MCP server exposes 19 tools:
- `image_generate` - Generate images from text
- `image_edit` - Edit existing images
- `video_generate` - Generate videos from text
- `video_from_image` - Animate images
- `audio_create` - Create music with Suno
- `audio_from_text` - Generate audio with MMAudio
- `enhance_upscale` - Upscale images
- `enhance_bg_remove` - Remove backgrounds
- `enhance_face_swap` - Face swapping
- `enhance_ghibli` - Apply Ghibli style
- `edit_lipsync` - Lip sync videos
- `edit_clipping` - Extract highlights
- `predict_result` - Check job status
- `upload_file` - Upload files
- `keys_list` - List API keys
- `keys_create` - Create API keys
- `keys_delete` - Delete API keys
- `account_balance` - Check balance
- `account_topup` - Add credits

---

## Tips & Best Practices

### 1. Use JSON Output for Scripting

Always use `--output-json` when scripting:

```bash
muapi image generate "prompt" --output-json --jq '.request_id'
```

### 2. Understand Exit Codes

MuAPI uses semantic exit codes for error handling:

| Code | Meaning |
|------|---------|
| 0 | Success |
| 1 | General error |
| 3 | Authentication error |
| 4 | Rate limited |
| 5 | Not found |
| 6 | Billing error |
| 7 | Timeout |
| 8 | Validation error |

Example error handling:

```bash
#!/bin/bash
muapi image generate "prompt" --no-wait
case $? in
  0) echo "Success!" ;;
  3) echo "Auth failed - check your API key" ;;
  4) echo "Rate limited - wait and retry" ;;
  6) echo "Billing issue - check your balance" ;;
  *) echo "Unknown error" ;;
esac
```

### 3. Disable Colors for CI/CD

In automated environments:

```bash
export NO_COLOR=true
# or
muapi image generate "prompt" --no-color
```

### 4. Set Default Models

Avoid repeating model flags:

```bash
muapi config set model.image flux-dev
muapi config set model.video kling-master

# Now these use defaults
muapi image generate "prompt"
muapi video generate "prompt"
```

### 5. Batch Processing Example

Process multiple prompts:

```bash
#!/bin/bash

prompts=(
  "a serene mountain lake at dawn"
  "a bustling cyberpunk marketplace"
  "a peaceful forest with sunlight filtering through trees"
)

for prompt in "${prompts[@]}"; do
  echo "Generating: $prompt"
  muapi image generate "$prompt" --download ./batch-output
done
```

### 6. Monitor Balance

Check before heavy usage:

```bash
muapi account balance --output-json --jq '.credits'
```

### 7. Use Predict Wait for Long Jobs

For long-running tasks (especially video):

```bash
# Submit async
REQUEST_ID=$(muapi video generate "complex scene" --no-wait --output-json --jq '.request_id' | tr -d '"')

# Wait with timeout handling
timeout 300 muapi predict wait "$REQUEST_ID" --download ./outputs
if [ $? -eq 124 ]; then
  echo "Timeout! Job ID: $REQUEST_ID"
  echo "Check later with: muapi predict result $REQUEST_ID"
fi
```

---

## Troubleshooting

### Authentication Issues

```bash
# Clear and reconfigure
muapi auth logout
muapi auth configure --api-key "YOUR_KEY"
muapi auth whoami
```

### Rate Limiting

If you get exit code 4:
- Wait a few minutes before retrying
- Check your account tier and limits
- Consider batching requests with delays

### Billing Errors

```bash
# Check balance
muapi account balance

# Add credits
muapi account topup --amount 20
```

### Job Stuck in Pending

```bash
# Check status
muapi predict result <request_id>

# If stuck, the job may have failed - check response for details
```

---

## Additional Resources

- **Official Documentation**: `muapi docs open` (opens Swagger UI)
- **OpenAPI Spec**: `muapi docs openapi`
- **GitHub**: Check for updates and community examples
- **Support**: Contact muapi.ai support for assistance

---

## Conclusion

MuAPI CLI is a powerful tool for generating and manipulating AI-generated content directly from your terminal. Its agent-first design makes it perfect for both interactive use and automation workflows.

Start with simple commands, then gradually explore advanced features like async processing, MCP integration, and complex pipelines. The combination of human-friendly output and machine-readable JSON makes it versatile for any use case.

Happy creating! 🎨🎬🎵
