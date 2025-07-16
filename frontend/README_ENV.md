# Environment Setup

## Required Environment Variables

Your frontend needs a `.env` file in the `frontend/` directory with the following variable:

```
VITE_API_URL=http://localhost:5000
```

## Setup Instructions

1. **Copy the template:**
   ```bash
   cp env.template .env
   ```

2. **For Development:**
   - Keep `VITE_API_URL=http://localhost:5000` (or whatever port your backend runs on)

3. **For Production:**
   - Change to your deployed API URL: `VITE_API_URL=https://api.yourdomain.com`

4. **Restart your dev server** after creating/modifying `.env`:
   ```bash
   npm run dev
   ```

## What Changed

- All hardcoded `http://localhost:5000` URLs in components have been replaced with environment variables
- Components now use the centralized `apiUrl()` helper function
- This makes deployment much easier - just change the `.env` file!

## Files Updated

- `frontend/api/index.jsx` - Added `apiUrl()` helper function
- `frontend/src/components/Chatbot.jsx` - Replaced hardcoded URLs
- `frontend/src/components/ExpandableCards.jsx` - Replaced hardcoded URLs
- `frontend/src/components/TextScratchpad.jsx` - No changes needed (uses ExpandableCards) 