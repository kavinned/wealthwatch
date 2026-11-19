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
          <svg
            viewBox="0 0 420 280"
            fill="none"
            aria-hidden="true"
            className="mb-8 w-full max-w-md"
          >
            <defs>
              <radialGradient
                id="heroGlow"
                cx="0"
                cy="0"
                r="1"
                gradientUnits="userSpaceOnUse"
                gradientTransform="translate(300 70) rotate(90) scale(150)"
              >
                <stop stopColor="#10b981" stopOpacity="0.28" />
                <stop offset="1" stopColor="#10b981" stopOpacity="0" />
              </radialGradient>
              <linearGradient
                id="heroFill"
                x1="44"
                y1="120"
                x2="44"
                y2="210"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#10b981" stopOpacity="0.35" />
                <stop offset="1" stopColor="#10b981" stopOpacity="0" />
              </linearGradient>
              <linearGradient
                id="heroCard"
                x1="24"
                y1="56"
                x2="284"
                y2="226"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#27272a" />
                <stop offset="1" stopColor="#18181b" />
              </linearGradient>
            </defs>

            <circle cx="300" cy="70" r="150" fill="url(#heroGlow)" />

            {[40, 90, 140, 190, 240].map((y) => (
              <line
                key={`h${y}`}
                x1="0"
                x2="420"
                y1={y}
                y2={y}
                stroke="white"
                strokeOpacity="0.05"
              />
            ))}
            {[40, 100, 160, 220, 280, 340, 400].map((x) => (
              <line
                key={`v${x}`}
                x1={x}
                x2={x}
                y1="0"
                y2="280"
                stroke="white"
                strokeOpacity="0.05"
              />
            ))}

            <path
              d="M284 110 H310"
              stroke="#3f3f46"
              strokeDasharray="4 4"
            />
            <path
              d="M284 176 H292"
              stroke="#3f3f46"
              strokeDasharray="4 4"
            />

            <rect
              x="24"
              y="56"
              width="260"
              height="170"
              rx="18"
              fill="url(#heroCard)"
              stroke="white"
              strokeOpacity="0.12"
            />
            <text
              x="44"
              y="86"
              fill="#a1a1aa"
              fontSize="11"
              fontWeight="600"
              letterSpacing="0.08em"
            >
              NET WORTH
            </text>
            <text x="44" y="118" fill="white" fontSize="26" fontWeight="600">
              $24,860
            </text>
            <rect
              x="196"
              y="96"
              width="68"
              height="24"
              rx="12"
              fill="#10b981"
              fillOpacity="0.15"
            />
            <text
              x="230"
              y="112"
              fill="#34d399"
              fontSize="11"
              fontWeight="600"
              textAnchor="middle"
            >
              +12.4%
            </text>
            <path
              d="M44 196 L80 180 L112 188 L148 158 L184 168 L220 138 L264 146 L264 208 L44 208 Z"
              fill="url(#heroFill)"
            />
            <path
              d="M44 196 L80 180 L112 188 L148 158 L184 168 L220 138 L264 146"
              stroke="#34d399"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <circle
              cx="264"
              cy="146"
              r="4"
              fill="#34d399"
              stroke="#18181b"
              strokeWidth="2"
            />

            <g>
              <rect
                x="310"
                y="48"
                width="96"
                height="66"
                rx="12"
                fill="#18181b"
                stroke="white"
                strokeOpacity="0.12"
              />
              <text x="324" y="70" fill="#a1a1aa" fontSize="10" fontWeight="600">
                AAPL
              </text>
              <text x="324" y="92" fill="white" fontSize="16" fontWeight="600">
                $352.45
              </text>
              <text x="324" y="106" fill="#34d399" fontSize="10">
                +2.18%
              </text>
            </g>

            <g>
              <rect
                x="292"
                y="176"
                width="114"
                height="68"
                rx="12"
                fill="#18181b"
                stroke="white"
                strokeOpacity="0.12"
              />
              <text
                x="306"
                y="198"
                fill="#a1a1aa"
                fontSize="10"
                fontWeight="600"
                letterSpacing="0.08em"
              >
                GROCERIES
              </text>
              <text x="306" y="220" fill="white" fontSize="14" fontWeight="600">
                $420
              </text>
              <text x="344" y="220" fill="#71717a" fontSize="10">
                of $600
              </text>
              <rect x="306" y="230" width="86" height="5" rx="2.5" fill="#27272a" />
              <rect x="306" y="230" width="60" height="5" rx="2.5" fill="#34d399" />
            </g>

            <circle cx="28" cy="248" r="2" fill="#34d399" opacity="0.6" />
            <circle cx="140" cy="34" r="2" fill="#34d399" opacity="0.5" />
            <circle cx="404" cy="140" r="2" fill="#34d399" opacity="0.5" />
            <path
              d="M392 244 h12 M398 238 v12"
              stroke="#34d399"
              strokeOpacity="0.5"
              strokeLinecap="round"
            />
          </svg>
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
          A personal finance dashboard built with Next.js. For informational
          purposes only — not financial advice. Market data may be delayed or
          inaccurate.
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
