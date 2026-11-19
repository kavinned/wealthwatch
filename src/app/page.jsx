import LoginForm from "./(components)/LoginForm";

export default function Home() {
  return (
    <div className="grid min-h-[100svh] lg:grid-cols-2">
      <section className="hidden bg-zinc-900 p-12 text-white lg:flex lg:flex-col lg:justify-between">
        <div className="flex items-center gap-2 text-sm font-semibold tracking-wide">
          <span className="h-2 w-2 rounded-full bg-emerald-400" />
          WealthWatch
        </div>
        <div className="max-w-md">
          <h1 className="text-4xl font-semibold tracking-tight">
            Know where your money goes.
          </h1>
          <p className="mt-4 text-zinc-400">
            Budgets, transactions, and market tracking in one calm dashboard.
          </p>
          <ul className="mt-8 space-y-3 text-sm text-zinc-300">
            <li>Set budget limits and watch spending against them.</li>
            <li>Log income and expenses by category.</li>
            <li>Track stocks with live quotes and history.</li>
          </ul>
        </div>
        <p className="text-xs text-zinc-500">
          A personal finance dashboard built with Next.js.
        </p>
      </section>

      <section className="flex items-center justify-center px-4 py-10">
        <div className="w-full max-w-md">
          <div className="mb-6 flex items-center gap-2 text-sm font-semibold text-ink lg:hidden">
            <span className="h-2 w-2 rounded-full bg-emerald-500" />
            WealthWatch
          </div>
          <div className="card-light p-6 md:p-8">
            <h2 className="text-xl font-semibold tracking-tight text-ink">
              Welcome back
            </h2>
            <p className="mt-1 text-sm text-muted">Log in to continue.</p>
            <div className="mt-6">
              <LoginForm />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
