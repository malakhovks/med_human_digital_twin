# Trulience + ElevenLabs Integration

Next.js example integrating Trulience Avatars with ElevenLabs conversational AI.

## Setup

1. Copy the example environment file:
```bash
cp .env.local.example .env.local
```

2. Configure your `.env.local` with the required values:

```env
NEXT_PUBLIC_ELEVENLABS_AGENT_ID=your_elevenlabs_agent_id
NEXT_PUBLIC_TRULIENCE_SDK_URL=https://trulience.com/sdk/trulience.sdk.js
NEXT_PUBLIC_TRULIENCE_TOKEN=your_trulience_token
```

**Where to find these values:**
- **ElevenLabs Agent ID**: Get from your [ElevenLabs dashboard](https://elevenlabs.io/)
- **Trulience Token**: Available under *Account* at [trulience.com](https://www.trulience.com)

3. Install dependencies and run:

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

## What This Example Does

This integration connects a Trulience avatar with ElevenLabs conversational AI, allowing users to interact with an AI agent through a lifelike avatar interface.
