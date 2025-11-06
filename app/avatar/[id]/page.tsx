import Link from "next/link";

const TRULIENCE_EMBED_BASE_URL = "https://www.trulience.com/avatar";
const IFRAME_ALLOW =
  "camera; microphone; fullscreen; accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture";

export default function AvatarIframePage() {
  const avatarId = process.env.NEXT_PUBLIC_TRULIENCE_AVATAR_ID;
  const token = process.env.NEXT_PUBLIC_TRULIENCE_TOKEN;

  const iframeSrc =
    avatarId && token
      ? `${TRULIENCE_EMBED_BASE_URL}/${encodeURIComponent(
          avatarId,
        )}?token=${encodeURIComponent(token)}`
      : null;

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-8 px-6 py-12">
        <Link
          href="/"
          className="text-sm font-medium text-sky-300 transition hover:text-sky-200"
        >
          ← Повернутися на головну
        </Link>

        <header className="space-y-3">
          <h1 className="text-3xl font-semibold text-center sm:text-4xl">
            Віртуальний пацієнт - Педіатрія
          </h1>
        </header>

        {!iframeSrc ? (
          <section className="space-y-6 rounded-3xl border border-red-500/40 bg-red-500/10 p-8">
            <h2 className="text-2xl font-semibold text-red-200">
              Налаштуйте змінні середовища
            </h2>
            <p className="text-slate-200">
              Щоб відобразити аватар, додайте значення змінних
              <code className="mx-2 rounded bg-slate-900 px-2 py-1 text-xs text-red-100">
                NEXT_PUBLIC_TRULIENCE_AVATAR_ID
              </code>
              та
              <code className="mx-2 rounded bg-slate-900 px-2 py-1 text-xs text-red-100">
                NEXT_PUBLIC_TRULIENCE_TOKEN
              </code>
              до файлу <code>.env.local</code>. Після цього перезапустіть
              Next.js-сервер.
            </p>
            <div className="rounded-2xl bg-slate-900/80 p-4 text-sm text-slate-200">
              <p className="font-semibold text-slate-100">Приклад налаштування:</p>
              <pre className="mt-3 overflow-x-auto rounded-xl bg-slate-950 p-4 text-xs text-slate-100">
{`NEXT_PUBLIC_TRULIENCE_AVATAR_ID=your-avatar-id
NEXT_PUBLIC_TRULIENCE_TOKEN=your-token`}
              </pre>
              <p className="mt-4 text-slate-300">
                Значення <code>your-avatar-id</code> та <code>your-token</code>
                можна отримати у кабінеті Trulience згідно з офіційною
                документацією.
              </p>
            </div>
          </section>
        ) : (
          <>
            <section className="space-y-4">
              <div className="overflow-hidden rounded-3xl border border-slate-800 bg-slate-900/40 shadow-xl">
                <iframe
                  src={iframeSrc}
                  title="Trulience Avatar"
                  allow={IFRAME_ALLOW}
                  frameBorder={0}
                  allowFullScreen
                  className="h-[600px] w-full bg-slate-950"
                />
              </div>
            </section>
          </>
        )}
      </div>
    </main>
  );
}

