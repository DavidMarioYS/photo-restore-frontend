# AI Photo Restoration - Frontend (Next.js) ✨🖼️

This is the user interface for the AI Photo Restoration project. Built with Next.js (App Router) and Tailwind CSS, it provides a seamless and modern experience for users to upload degraded photos and view the AI-enhanced results.

## 🌟 Features

* **Interactive UI:** Clean, dark-themed interface built with Tailwind CSS.
* **Before/After Slider:** Utilizes `react-compare-slider` to let users interactively compare the original photo with the AI-restored version.
* **Smart Progress Bar:** A simulated progress indicator to provide excellent UX during the heavy AI processing phase.
* **Direct Download:** One-click button to download the high-resolution restored image directly to the device.
* **Hydration-Safe:** Configured to prevent hydration mismatch errors commonly caused by browser extensions.

## 🛠️ Tech Stack

* **Next.js 16** (App Router)
* **React**
* **TypeScript**
* **Tailwind CSS**
* **react-compare-slider**

## 💻 Local Development

1. **Clone the repository:**
   ```bash
   git clone https://github.com/yourusername/photo-restore-frontend.git
   cd photo-restore-frontend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Run the development server:**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 🚀 Production Build

To run the application in production mode (recommended to avoid development hydration warnings):
```bash
npm run build
npm start
```

## 🔗 Connecting to the Backend

By default, the application is configured to send requests to a local FastAPI server running at `http://127.0.0.1:8000`. Before deploying this frontend to a platform like Vercel, ensure you update the `fetch` URL in `src/app/page.tsx` to your production backend URL.