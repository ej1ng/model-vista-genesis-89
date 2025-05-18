# SnapCAD

A web application that converts images to 3D models using AI.

## Setup

### Frontend

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

The frontend will be available at http://localhost:5173

### Backend

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install Python dependencies:
```bash
pip install -r requirements.txt
```

3. Run the Flask server:
```bash
python backend.py
```

The backend API will be available at http://localhost:5500

## Features

- Upload images or take photos with your camera
- Generate 3D models from images
- Download 3D models in GLB format
- Refine models with custom drawings

## Technologies

- Frontend: React, TypeScript, Vite, Three.js
- Backend: Flask, Hunyuan3D API
- 3D Rendering: Three.js

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/65f59b98-72ff-4ca1-bf40-09dc32ea180d) and click on Share -> Publish.

## Can I connect a custom domain to my Lovable project?

Yes, you can!

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/tips-tricks/custom-domain#step-by-step-guide)
