# MBTI Personality Test Web Application

<div align="center">

![MBTI Test](https://img.shields.io/badge/MBTI-Step%20II-purple)
![React](https://img.shields.io/badge/React-18-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)
![Vite](https://img.shields.io/badge/Vite-5-orange)

A comprehensive MBTI Step II personality test application with detailed analysis, career recommendations, and result sharing.

[Live Demo](#) | [Features](#features) | [Deployment](#deployment)

</div>

## Overview

This is a full-featured MBTI (Myers-Briggs Type Indicator) Step II personality test web application that provides:

- **144 Questions** - Complete MBTI Step II questionnaire
- **22 Facets Analysis** - Deep insight into personality sub-dimensions
- **16 Personality Types** - Detailed descriptions for all types
- **Career Recommendations** - Job suggestions based on personality
- **Result Sharing** - Share results with a unique link (180-day validity)
- **PDF/Image Export** - Download results as PDF or PNG

## Features

### Test Experience
- Interactive question flow with progress tracking
- Smooth animations using Framer Motion
- Auto-advance after selecting answers
- Visual question indicators for navigation
- Mobile-responsive design

### Results Analysis
- **Dimension Charts** - Visual bar charts for E/I, S/N, T/F, J/P
- **Facet Radar** - Radar chart showing 22 facet scores
- **Personality Report** - Strengths, challenges, and growth advice
- **Career Guidance** - Recommended career paths

### Sharing & Export
- Unique shareable links with 180-day TTL
- PDF export using html2canvas and jsPDF
- PNG image export
- Vercel KV storage for shared results

## Tech Stack

- **Framework:** React 18 + TypeScript
- **Build Tool:** Vite 5
- **Styling:** Tailwind CSS
- **Routing:** React Router v6
- **Animations:** Framer Motion
- **Charts:** Recharts
- **Testing:** Vitest + Playwright
- **Deployment:** Vercel
- **Storage:** Vercel KV

## Project Structure

```
mbti-test/
├── api/                    # Vercel serverless functions
│   ├── save-result.ts      # Save results to KV storage
│   └── get-result.ts       # Retrieve shared results
├── src/
│   ├── api/                # API client functions
│   ├── components/          # React components
│   │   ├── common/          # Shared UI components
│   │   ├── result/          # Result display components
│   │   └── test/            # Test-taking components
│   ├── data/                # Question data and descriptions
│   │   ├── descriptions/    # Personality type descriptions
│   │   └── questions/       # 144 MBTI questions
│   ├── hooks/               # Custom React hooks
│   ├── lib/                 # Utility functions
│   ├── pages/               # Page components
│   ├── styles/              # Global styles
│   └── types/               # TypeScript type definitions
├── e2e/                     # Playwright E2E tests
├── docs/                    # Documentation
├── public/                  # Static assets
└── tests/                   # Vitest unit tests
```

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd mbti-test

# Install dependencies
npm install
```

### Development

```bash
# Start development server
npm run dev

# Run unit tests
npm run test

# Run E2E tests
npm run test:e2e
```

Visit [http://localhost:5173](http://localhost:5173)

### Building

```bash
# Build for production
npm run build

# Preview production build
npm run preview
```

## Testing

### Unit Tests
```bash
npm run test          # Run tests
npm run test:ui       # Run tests with UI
```

### E2E Tests
```bash
npm run test:e2e      # Run Playwright tests
npm run test:e2e:ui   # Run tests with UI
```

## Deployment

### Deploy to Vercel

1. Push code to GitHub
2. Import project in [Vercel](https://vercel.com)
3. Configure:
   - Framework: Vite
   - Build Command: `npm run build`
   - Output Directory: `dist`
4. Enable Vercel KV storage
5. Deploy!

See [DEPLOYMENT.md](docs/DEPLOYMENT.md) for detailed instructions.

## Environment Variables

None required for basic functionality. Vercel KV bindings are auto-configured.

## API Endpoints

### POST /api/save-result
Save test results to KV storage.

**Request:**
```json
{
  "result": {
    "id": "string",
    "type": "INTJ",
    "dimensions": [...],
    "facets": [...],
    "createdAt": "ISO string"
  }
}
```

**Response:**
```json
{
  "shareId": "abc123xyz"
}
```

### GET /api/get-result?shareId=abc123xyz
Retrieve shared results.

**Response:** Test result object or 404 if not found/expired

## License

MIT License - see LICENSE file for details.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## Support

For issues and questions, please open a GitHub issue.
