import Link from "next/link";

const avatarId = process.env.NEXT_PUBLIC_TRULIENCE_AVATAR_ID;
const token = process.env.NEXT_PUBLIC_TRULIENCE_TOKEN;
const isConfigured = Boolean(avatarId && token);

const avatarCards = [
  {
    id: "iframe",
    name: "Вбудований аватар через iFrame",
    description: isConfigured
      ? "Перейдіть на сторінку демо, щоб побачити вашого аватара Trulience у вікні iFrame."
      : "Додайте ідентифікатор аватара та токен у .env.local, щоб активувати демо.",
  },
];

export default function HomePage() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <div className="mx-auto flex max-w-4xl flex-col gap-12 px-6 py-16">
        <header className="space-y-6 text-center">
          <p className="text-sm uppercase tracking-widest text-slate-400">
            Trulience
          </p>
          <h1 className="text-4xl font-semibold sm:text-5xl">
            ОБ’ЄКТИВНИЙ СТРУКТУРОВАНИЙ ПРАКТИЧНИЙ (КЛІНІЧНИЙ) ІСПИТ.
            Розпитування. Спілкування із голосовим агентом - Human Digital Twin.
          </h1>
          <p className="text-base text-slate-300 sm:text-lg">
            Тернопільський національний медичний університет імені І. Я.
            Горбачевського
          </p>
        </header>

        <section className="grid gap-6 sm:grid-cols-2">
          {avatarCards.map((avatar) => (
            <Link
              key={avatar.id}
              href={`/avatar/${avatar.id}`}
              className="group rounded-2xl border border-slate-800 bg-slate-900/60 p-6 transition hover:border-sky-400/60 hover:bg-slate-900"
            >
              <div className="space-y-3">
                <h2 className="text-2xl font-medium text-white group-hover:text-sky-300">
                  {avatar.name}
                </h2>
                <p className="text-sm leading-relaxed text-slate-300">
                  {avatar.description}
                </p>
                <span className="inline-flex items-center gap-2 text-sm font-semibold text-sky-300">
                  Перейдіть на сторінку демо
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    className="h-4 w-4"
                  >
                    <path d="M7 17L17 7" />
                    <path d="M8 7h9v9" />
                  </svg>
                </span>
              </div>
            </Link>
          ))}
        </section>

        <footer className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 text-sm text-slate-400">
          <p>
            Перед запуском демо переконайтеся, що у файлі
            <code className="mx-1 rounded bg-slate-800 px-1.5 py-0.5 text-xs text-sky-200">
              .env.local
            </code>
            вказані значення змінних
            <code className="mx-1 rounded bg-slate-800 px-1.5 py-0.5 text-xs text-sky-200">
              NEXT_PUBLIC_TRULIENCE_AVATAR_ID
            </code>
            та
            <code className="mx-1 rounded bg-slate-800 px-1.5 py-0.5 text-xs text-sky-200">
              NEXT_PUBLIC_TRULIENCE_TOKEN
            </code>
            . Після зміни значень перезапустіть локальний сервер і надайте доступ
            до камери та мікрофона, коли браузер попросить про це.
          </p>
        </footer>
      </div>
    </main>
  );
}

