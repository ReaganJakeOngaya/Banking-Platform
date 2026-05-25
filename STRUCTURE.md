<!-- This is the complete folder structure -->

novapay/
├── apps/
│   ├── web/                          # Next.js 14 frontend
│   │   ├── app/
│   │   │   ├── layout.tsx
│   │   │   ├── page.tsx              # Landing page
│   │   │   ├── dashboard/
│   │   │   │   └── page.tsx
│   │   │   ├── api-docs/
│   │   │   │   └── page.tsx
│   │   │   └── auth/
│   │   │       ├── login/page.tsx
│   │   │       └── register/page.tsx
│   │   ├── components/
│   │   │   ├── ui/                   # Shared UI primitives
│   │   │   │   ├── Card3D.tsx
│   │   │   │   ├── Coin3D.tsx
│   │   │   │   ├── CodeBlock.tsx
│   │   │   │   └── Sparkline.tsx
│   │   │   ├── dashboard/
│   │   │   │   ├── StatCard.tsx
│   │   │   │   ├── BarChart.tsx
│   │   │   │   ├── TransactionRow.tsx
│   │   │   │   └── RegionBreakdown.tsx
│   │   │   ├── landing/
│   │   │   │   ├── Hero.tsx
│   │   │   │   ├── FeatureGrid.tsx
│   │   │   │   └── StatsBar.tsx
│   │   │   └── Nav.tsx
│   │   ├── hooks/
│   │   │   ├── useCounter.ts
│   │   │   ├── useTransactions.ts    # SWR/React Query hooks
│   │   │   └── useAnalytics.ts
│   │   ├── lib/
│   │   │   ├── api.ts                # API client (fetch wrapper)
│   │   │   └── constants.ts
│   │   ├── styles/
│   │   │   └── globals.css
│   │   ├── public/
│   │   ├── next.config.ts
│   │   ├── tailwind.config.ts
│   │   └── tsconfig.json
│   │
│   └── api/                          # Python FastAPI backend
│       ├── app/
│       │   ├── main.py               # FastAPI entry point
│       │   ├── core/
│       │   │   ├── config.py         # Settings (pydantic-settings)
│       │   │   ├── security.py       # JWT, API key hashing
│       │   │   └── database.py       # SQLAlchemy async engine
│       │   ├── api/
│       │   │   ├── v1/
│       │   │   │   ├── router.py     # Mounts all v1 routes
│       │   │   │   ├── transactions.py
│       │   │   │   ├── accounts.py
│       │   │   │   ├── analytics.py
│       │   │   │   └── webhooks.py
│       │   │   └── deps.py           # Shared dependencies (auth, db)
│       │   ├── models/
│       │   │   ├── transaction.py    # SQLAlchemy ORM models
│       │   │   ├── account.py
│       │   │   └── webhook.py
│       │   ├── schemas/
│       │   │   ├── transaction.py    # Pydantic request/response schemas
│       │   │   ├── account.py
│       │   │   └── analytics.py
│       │   ├── services/
│       │   │   ├── payment.py        # Core payment logic
│       │   │   ├── fraud.py          # AI fraud scoring
│       │   │   ├── settlement.py     # Settlement engine
│       │   │   └── webhook.py        # Webhook dispatch
│       │   └── workers/
│       │       ├── celery.py         # Celery app + task queue
│       │       └── tasks.py          # Async jobs (settlements, retries)
│       ├── alembic/                  # DB migrations
│       │   ├── versions/
│       │   └── env.py
│       ├── tests/
│       │   ├── test_transactions.py
│       │   └── test_analytics.py
│       ├── Dockerfile
│       ├── requirements.txt
│       └── pyproject.toml
│
├── packages/
│   └── sdk/                          # Optional: publishable JS/TS SDK
│       ├── src/
│       │   ├── index.ts
│       │   ├── transactions.ts
│       │   └── accounts.ts
│       └── package.json
│
├── infra/
│   ├── docker-compose.yml            # Local dev stack
│   ├── docker-compose.prod.yml
│   └── nginx/
│       └── nginx.conf                # Reverse proxy config
│
├── .env.example
├── .gitignore
└── README.md
