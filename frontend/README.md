# ClubBrain · Frontend

React 19 + Vite + TypeScript + Tailwind CSS v4 + React Query, organized with atomic design.

## Run

```bash
npm install
npm run dev     # proxies /api → http://localhost:8001 (vite.config.ts)
npm run build   # type-check + production build
```

Start the [backend](../backend) on port 8001 first.

## Layout

| Path | Responsibility |
|---|---|
| `src/components/atoms` | Pure UI: Avatar, CategoryBadge, Markdown, TypingIndicator, … |
| `src/components/molecules` | MessageRow, MemoryCard, MemoryDetectedCard, WelcomeModal, PersonaSwitcher, … |
| `src/components/organisms` | ChatView, MemoryTracePanel, MemoryBrowser, RightPanel, ConversationList, TopBar, … |
| `src/pages/Home.tsx` | Composes the app shell and tabs (chat / Club Memory) |
| `src/services/api.ts` | Every `/api` call |
| `src/hooks` | React Query hooks |
| `src/types` | Shared TypeScript types |
| `src/lib` | Personas and category styles |
