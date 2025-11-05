# Create Simli App (ElevenLabs)
This starter is an example of how to create a composable Simli interaction that runs in a Next.js app.

## Environment setup
1. Скопіюйте `.env.example` у файл з назвою `.env.local` (для локального запуску) або `.env` (для Docker) і заповніть ключі: [SIMLI-API-KEY](https://www.simli.com/profile) та [ELEVENLABS-API-KEY](https://elevenlabs.io/app/settings/api-keys). Якщо вам потрібен доступ до API сторонніх сервісів, напишіть у [Discord](https://discord.gg/yQx49zNF4d) — ми допоможемо.

```bash
cp .env.example .env.local
# або для Docker Compose
cp .env.example .env
```

Після копіювання відредагуйте значення ключів у вибраному файлі.

```env
NEXT_PUBLIC_SIMLI_API_KEY="SIMLI-API-KEY"
ELEVENLABS_API_KEY="ELEVENLABS-API-KEY"
```

## Local development
1. Install packages

```bash
npm install
```

2. Run the development server

```bash
npm run dev
```

3. Customize your avatar's face and prompt by editing `app/page.tsx`. [Create your ElevenLabs agent](https://elevenlabs.io/app/conversational-ai/)

```ts
const avatar = {
  elevenlabs_agentid: "ELEVEN-LABS-AGENT-ID",
  simli_faceid: "5514e24d-6086-46a3-ace4-6a7264e5cb7c",
};
```

## Docker Compose deployment
1. Переконайтеся, що файл `.env` містить ваші ключі API (див. розділ вище).
2. Зберіть контейнер та запустіть застосунок:

```bash
docker compose up --build
```

Після успішного розгортання інтерфейс буде доступний на `http://localhost:3000`.

## Characters
You can swap out the character by finding one that you like in the [docs](https://docs.simli.com/introduction), or [create your own](https://app.simli.com/) 

![alt text](media/image.png) ![alt text](media/image-4.png) ![alt text](media/image-2.png) ![alt text](media/image-3.png) ![alt text](media/image-5.png) ![alt text](media/image-6.png)

## Deploy on Vercel
An easy way to deploy your avatar interaction to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme). 
