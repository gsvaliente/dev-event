# Agent Guidelines for Next.js DevEvents Project

## Commands
- **Build**: `pnpm build`
- **Dev server**: `pnpm dev`
- **Lint**: `pnpm lint`
- **Tests**: None configured

## Code Style
- **Imports**: Use `@/` path aliases, absolute imports from components/lib
- **Components**: Functional components with TypeScript interfaces
- **Naming**: camelCase for vars/functions, kebab-case for CSS classes
- **Client components**: Add "use client" directive when needed
- **Styling**: Tailwind CSS with custom CSS variables
- **Types**: Strict TypeScript, define interfaces for component props
- **Error handling**: Standard try/catch, no custom patterns observed