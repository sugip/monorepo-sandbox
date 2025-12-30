# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Language Preference

**IMPORTANT: Always respond in Japanese (日本語) when working in this repository.**

このリポジトリで作業する際は、必ず日本語で応答してください。

## Project Overview

This is a yarn workspaces monorepo containing a Next.js frontend, AWS Lambda serverless functions, and shared libraries. The project is configured for Asia/Tokyo timezone across all workspaces.

**Key workspaces:**
- `frontend/` - Next.js 16 application with React 19 and Tailwind CSS v4
- `lambda/sample-function1/` - AWS Lambda function with TypeScript
- `lambda/sample-function2/` - AWS Lambda function with TypeScript
- `shared/libs/` - Shared utilities workspace (date-utils, etc.)

## Development Commands

### Yarn Workspaces (at root)
```bash
yarn install      # Install dependencies for all workspaces
yarn workspace frontend <command>  # Run command in frontend workspace
yarn workspace sample-function1 <command>  # Run command in lambda workspace
```

### Frontend (in `frontend/`)
```bash
npm run dev       # Start Next.js development server
npm run build     # Build for production
npm start         # Start production server
npm run lint      # Run Biome linter
npm run format    # Format code with Biome
```

### Lambda Functions (in `lambda/sample-function1/` or `lambda/sample-function2/`)
```bash
npm run unit      # Run Jest unit tests
npm run test      # Compile TypeScript + run tests
npm run compile   # TypeScript compilation only
npm run check     # Run Biome linter
npm run check-fix # Run Biome linter with auto-fix
```

## Code Quality

All workspaces use **Biome** for linting and formatting:
- 2-space indentation
- Single quotes for JavaScript/TypeScript
- Import sorting enabled
- Root `biome.json` provides shared configuration

## Architecture Notes

### Shared Libraries

The `shared/libs/` workspace contains shared utilities used across all workspaces:
- **Date utilities:** `shared/libs/date-utils.ts` - Timezone-aware date formatting using dayjs with Asia/Tokyo timezone

All workspaces import from the shared-libs package:
```typescript
import { getNow } from 'shared-libs/date-utils';
```

This is managed through yarn workspaces, with each workspace declaring `"shared-libs": "*"` in their dependencies.

### Frontend Architecture

- **Framework:** Next.js 16 with App Router (not Pages Router)
- **React Compiler:** Enabled in `next.config.ts`
- **Styling:** Tailwind CSS v4 with PostCSS integration
- **TypeScript:** Target ES2017, bundler module resolution
- **Main directories:**
  - `src/app/` - App Router pages and layouts
  - `src/lib/` - Shared utilities

### Lambda Architecture

- **Runtime:** Node.js with TypeScript
- **Build tool:** esbuild for bundling
- **Testing:** Jest with ts-jest
- **TypeScript:** Target ES2020, node module resolution
- **Handler location:** `src/handlers/app.ts`
- **Utilities location:** `src/libs/`

Lambda functions follow AWS SAM conventions. The `lambda/templates/` directory contains SAM template structures.

## Technology Stack

- **Runtime:** Node.js
- **Language:** TypeScript (v5 for frontend, v4 for Lambda)
- **Frontend:** Next.js 16, React 19, Tailwind CSS v4
- **Backend:** AWS Lambda with AWS SAM
- **Date/Time:** dayjs with timezone plugin
- **Testing:** Jest 29 (Lambda functions only)
- **Code Quality:** Biome 2.x

## Important Patterns

1. **Yarn workspaces:** This project uses yarn workspaces to manage dependencies across all packages. Run `yarn install` at the root to install dependencies for all workspaces.

2. **Shared libraries:** Common utilities are maintained in `shared/libs/` and referenced as a workspace dependency. This ensures consistency across all workspaces.

3. **Timezone consistency:** All date formatting across frontend and Lambda functions uses Asia/Tokyo timezone through the shared date-utils.

4. **Biome over ESLint/Prettier:** This project uses Biome exclusively for linting and formatting. Do not introduce ESLint or Prettier.

5. **Lambda testing pattern:** Always run `npm run test` (which compiles TypeScript first) rather than `npm run unit` alone to catch compilation errors.
