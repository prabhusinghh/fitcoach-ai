# 💪 FitCoach AI — Workout Tracker with AI Motivation

FitCoach AI is a modern fitness tracking web application that allows users to log workouts, analyze performance, and receive personalized AI-driven motivation based on their activity patterns.

---

## 🚀 Live Demo

👉 *Add your deployed link here (after deployment)*

---

## 📌 Features

### 🏋️ Workout Logging

* Add workouts with:

  * Activity type (Running, Yoga, Boxing, etc.)
  * Duration (in minutes)
  * Date
* Data stored in Supabase (PostgreSQL)
* Real-time UI updates

---

### 📊 Stats Dashboard

* 🔥 Current streak tracking
* 📅 Weekly workout count
* 🏃 Most frequent activity
* ⏱ Total workout minutes
* Automatically recalculates on new entries

---

### 🤖 AI Motivation System

* Generates **personalized motivational messages**
* Uses:

  * Streak
  * Weekly activity
  * Total minutes
  * Preferred workout type
* Dynamic, rule-based AI logic (not static text)

---

### 💬 AI Chat (Basic)

* Chat interface for fitness-related queries
* Sends user messages to backend API
* Designed for future extension with LLM integration

---

### 🎨 UI/UX

* Built with Tailwind CSS
* Responsive design (mobile + desktop)
* Card-based layout
* Micro-interactions:

  * Hover effects
  * Button feedback
  * Loading states

---

## 🛠 Tech Stack

### Frontend

* Next.js (App Router)
* TypeScript
* Tailwind CSS

### Backend

* Next.js API Routes

### Database

* Supabase (PostgreSQL)

### Other

* Fetch API for client-server communication

---

## ⚙️ Setup Instructions

### 1. Clone the repository

```bash
git clone https://github.com/your-username/fitcoach-ai.git
cd fitcoach-ai
```

---

### 2. Install dependencies

```bash
npm install
```

---

### 3. Setup environment variables

Create a `.env.local` file:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_KEY=your_anon_key
```

---

### 4. Run the development server

```bash
npm run dev
```

---

### 5. Open in browser

```
http://localhost:3000
```

---

## 🧠 Design Decisions & Tradeoffs

### 1. Rule-based AI instead of LLM

* Implemented a **deterministic rule-based system**
* Ensures:

  * Fast responses
  * No API cost
  * Predictable outputs
* Tradeoff:

  * Less natural than full AI models

---

### 2. Supabase for backend

* Chosen for:

  * Easy setup
  * Built-in PostgreSQL
  * Real-time capabilities
* Tradeoff:

  * Limited control compared to custom backend

---

### 3. Client-side state management

* Used React hooks (`useState`, `useEffect`)
* Simple and sufficient for current scale
* Tradeoff:

  * Not ideal for large-scale apps

---

### 4. Minimal Chatbot Implementation

* Basic structure implemented for extensibility
* Tradeoff:

  * Not fully conversational AI yet

---

## 📈 Future Improvements

* 🔗 Full LLM integration (OpenAI / Gemini)
* 📊 Advanced analytics (graphs, trends)
* 👤 User authentication
* ☁️ Deployment optimizations
* 💬 Persistent chat history
* 🎯 Personalized fitness recommendations

---

## 📦 Deployment

This app can be deployed easily using:

* Vercel (recommended)

Steps:

1. Push code to GitHub
2. Import project into Vercel
3. Add environment variables
4. Deploy

---

## 🙌 Author

**Prabhu Singh**

---

## ⭐ Notes

This project demonstrates:

* Full-stack development
* API design
* State management
* UI/UX design
* Integration with external services (Supabase)
* AI-based feature implementation

---

👉 Designed as part of a technical assignment to showcase practical engineering skills.
