# MBTI Test Application - Deployment Guide

## Overview

This is a complete MBTI Step II personality test application built with React, TypeScript, and Vite. It includes 144 questions, detailed personality analysis, and sharing capabilities.

## Prerequisites

- Node.js 18+ and npm
- Vercel account (for deployment)
- GitHub account (for Vercel integration)

## Local Development

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run development server:
   ```bash
   npm run dev
   ```
4. Visit http://localhost:5173

## Running Tests

### Unit Tests
```bash
npm run test
```

### E2E Tests
```bash
npm run test:e2e
```

## Deployment to Vercel

### Step 1: Prepare Your Repository

1. Push your code to GitHub
2. Ensure your repository is public or accessible by Vercel

### Step 2: Deploy on Vercel

1. Go to [vercel.com](https://vercel.com) and log in
2. Click "Add New Project"
3. Import your GitHub repository
4. Configure the project:

**Framework Preset:** Vite

**Build Command:** `npm run build`

**Output Directory:** `dist`

**Install Command:** `npm install`

### Step 3: Configure Environment Variables

No environment variables are required for basic functionality. The app uses:
- Session storage for test answers
- Vercel KV for result sharing (auto-provisioned)

### Step 4: Enable Vercel KV

1. Go to your project Settings
2. Navigate to "Storage"
3. Create a new KV database:
   - Name: `mbti-results`
   - Region: Choose nearest to your users

### Step 5: Deploy

Click "Deploy" and wait for the build to complete. Your app will be live at:
`https://your-project.vercel.app`

## Post-Deployment Configuration

### Custom Domain (Optional)

1. Go to project Settings > Domains
2. Add your custom domain
3. Configure DNS according to Vercel instructions

### Environment Variables (Optional)

You may want to add:

- `KV_URL`: KV storage URL (auto-configured by Vercel)
- `KV_REST_API_URL`: KV REST API URL
- `KV_REST_API_TOKEN`: KV REST API Token

These are automatically set when using Vercel KV binding.

## Verification

After deployment, verify:

1. [ ] Home page loads correctly
2. [ ] Test flow works (can answer questions)
3. [ ] Results page displays after completion
4. [ ] Share link generation works
5. [ ] Shared results are accessible
6. [ ] PDF/Image export functions work

## Monitoring

Vercel provides:
- Analytics dashboard
- Function logs
- Error tracking
- Performance monitoring

Access these from your project dashboard.

## Troubleshooting

### Build Fails

- Check TypeScript compilation: `npm run build`
- Verify all dependencies are installed
- Check build logs in Vercel dashboard

### KV Storage Issues

- Verify KV database is created
- Check KV is properly bound to your project
- Review function logs for KV errors

### Tests Failing

- Run locally: `npm run test` and `npm run test:e2e`
- Check for console errors in browser DevTools
- Verify test data is properly mocked

## Performance Optimization

The app is optimized with:
- Code splitting via React Router
- Lazy loading of charts
- Image optimization (if images added)
- CDN caching via Vercel

For production, consider:
- Enable Vercel Analytics
- Set up proper caching headers
- Monitor Core Web Vitals

## Updates and Maintenance

To update the deployed app:

1. Make changes locally
2. Test thoroughly: `npm run test && npm run test:e2e`
3. Commit and push to GitHub
4. Vercel auto-deploys on push

## Support

For issues or questions:
- Check Vercel documentation: https://vercel.com/docs
- Review this project's issues on GitHub
- Contact the development team

## License

This project is open source and available under the MIT License.
