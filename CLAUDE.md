# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Cordon is an enterprise AI data platform landing page built with React, TypeScript, and Vite. The application showcases an interactive demo using Google's Gemini AI API and features WebGL-powered visual effects.

## Development Commands

### Prerequisites
**Node.js >= 20.0.0** is required. Several dependencies (`@google/genai`, `@vitejs/plugin-react`, `react-router-dom`) require Node.js 20 or higher.

If using nvm:
```bash
nvm install 20
nvm use 20
```

### Setup
```bash
npm install
```

### Environment Configuration
Create a `.env.local` file in the root directory:
```
GEMINI_API_KEY=your_gemini_api_key_here
```

### Development
```bash
npm run dev
```
Starts the dev server on `http://0.0.0.0:3000`

### Build
```bash
npm run build
```

### Preview Production Build
```bash
npm run preview
```

## Architecture

### Entry Point and Routing
- `index.html` - Main HTML file with Tailwind CDN, custom Cordon color theme, and ES module importmap configuration
- `index.tsx` - React app mount point
- `App.tsx` - Root component using HashRouter, organizing all page sections (Hero, Demo, Architecture, Features, Footer)

### Core Visual Components
- **Orb.tsx** - WebGL shader-based animated orb using the OGL library. Features:
  - Custom GLSL vertex/fragment shaders
  - Interactive hover detection with distortion effects
  - Hue adjustment via YIQ color space conversion
  - Simplex noise for organic animation
  - Rotation on hover interaction
  - Configurable hue, intensity, and rotation behavior

- **OrbBackground.tsx** - Background decorative orbs
- **ScrollStack.tsx** - Scroll-based stacking animation component for the architecture section
- **ArchitectureStack.tsx** - 4-layer enterprise stack visualization (Data → Knowledge → Models → Applications)

### Interactive Components
- **InteractiveDemo.tsx** - Chat interface component that:
  - Displays a terminal-style chat UI
  - Integrates with `geminiService.ts` for AI responses
  - Shows suggestion pills for first-time users
  - Auto-scrolls chat messages
  - Handles streaming states

### AI Service Integration
- **services/geminiService.ts** - Gemini API wrapper:
  - Uses `@google/genai` SDK
  - Model: `gemini-2.5-flash`
  - System instruction configured for enterprise data platform persona
  - API key injected via Vite's environment variable system (see `vite.config.ts`)

### Type Definitions
- **types.ts** - Shared TypeScript interfaces:
  - `ChatMessage` - role, text, isStreaming
  - `Feature` - title, description, icon

### Configuration Files
- **vite.config.ts** - Key details:
  - Loads `GEMINI_API_KEY` from `.env.local` and injects as `process.env.API_KEY` and `process.env.GEMINI_API_KEY`
  - Path alias `@/*` maps to project root
  - Dev server runs on port 3000 with host `0.0.0.0`

- **tsconfig.json** - TypeScript configuration:
  - Target: ES2022
  - JSX: react-jsx (new JSX transform)
  - Module resolution: bundler
  - Path alias `@/*` configured

### Styling
- Tailwind CSS via CDN (configured in `index.html`)
- Custom color palette: `cordon-{50-950}` based on teal/cyan (primary: `#2dd4bf`, `#0d9488`)
- Custom scrollbar styles
- Inter font from Google Fonts

## Key Implementation Notes

### Environment Variables
The project uses Vite's environment variable system with a custom setup:
- Variables are loaded from `.env.local` (not committed to git)
- The `GEMINI_API_KEY` is exposed as both `process.env.API_KEY` and `process.env.GEMINI_API_KEY`
- Values are injected at build time via Vite's `define` option in `vite.config.ts`

### WebGL/OGL Usage
The Orb component uses OGL (a lightweight WebGL library) with custom shaders. When modifying:
- Shader code is in GLSL (vertex and fragment shaders as template strings)
- Uniforms can be updated in real-time for animation
- Component cleans up WebGL context on unmount to prevent memory leaks
- Uses `requestAnimationFrame` for smooth 60fps rendering

### HashRouter
The app uses `HashRouter` instead of `BrowserRouter`, which is typical for GitHub Pages deployment where client-side routing needs to work without server configuration.

### Import Maps
The project uses ES module import maps (defined in `index.html`) for dependency resolution when running without a bundler, mapping packages to CDN URLs from `aistudiocdn.com`.
