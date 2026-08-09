<div align="center">

# 💕 Wedding Digital Invitation

> A beautiful, modern digital wedding invitation website built with React, TypeScript, and Tailwind CSS

[![Vite](https://img.shields.io/badge/Vite-646CFF?style=flat-square&logo=vite&logoColor=white)](https://vitejs.dev)
[![React](https://img.shields.io/badge/React-61DAFB?style=flat-square&logo=react&logoColor=black)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white)](https://tailwindcss.com)

</div>

---

## ✨ Features

- 🎨 **Modern UI/UX** - Elegant design with smooth animations and glass-morphism effects
- 🎵 **Auto-play Music** - Background music that automatically starts when the invitation popup opens
- 📱 **Fully Responsive** - Perfect on mobile, tablet, and desktop devices
- 💌 **Interactive Invitation Popup** - Beautiful modal with automatic presentation
- 🎭 **Admin Panel** - Manage content and guest information easily
- 📊 **Google Sheets Integration** - Seamlessly connect with Google Sheets for data management
- ✨ **Smooth Animations** - Uses Motion library for delightful animations
- 🤖 **AI Powered** - Integrated with Google Gemini API for intelligent features
- 🌓 **Dark Mode Ready** - Modern color schemes and gradients

---

## 🚀 Quick Start

### Prerequisites
- **Node.js** (v18 or higher)
- **npm** or **yarn**

### Installation

1. **Clone and install dependencies:**
   ```bash
   npm install
   ```

2. **Set up environment variables:**
   Create a `.env.local` file in the root directory and add:
   ```env
   VITE_GEMINI_API_KEY=your_gemini_api_key_here
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```
   The app will be available at `http://localhost:3000`

---

## 📦 Build & Deploy

### Build for Production
```bash
npm run build
```

### Preview Production Build
```bash
npm run preview
```

### Clean Build Artifacts
```bash
npm run clean
```

### Lint TypeScript
```bash
npm run lint
```

---

## 🏗️ Project Structure

```
src/
├── components/          # Reusable React components
│   └── InvitationPopup.tsx    # Beautiful invitation modal
├── admin/              # Admin panel pages
├── hooks/              # Custom React hooks
├── services/           # API and external service integrations
│   └── sheetService.ts        # Google Sheets integration
├── foto/               # Photo assets and journey
├── App.tsx            # Main application component
└── main.tsx           # Application entry point
```

---

## 🛠️ Tech Stack

| Technology | Purpose |
|-----------|---------|
| **React 19** | UI framework |
| **TypeScript** | Type safety |
| **Vite 6** | Fast build tool |
| **Tailwind CSS** | Styling |
| **Motion** | Animations |
| **Lucide React** | Icons |
| **Google Genai** | AI features |
| **Express** | Backend server |

---

## 📋 Key Features Breakdown

### 💌 Invitation Popup
- Automatically displays when visitors open the site
- Smooth spring animations
- Background music control
- Elegant glass-morphism design
- Responsive across all devices

### 🎵 Music System
- Auto-play on popup open
- User-controlled playback
- Persistent background audio
- Smooth fade transitions

### 📱 Admin Panel
- Manage invitation content
- Control guest information
- Preview before publishing

### 📊 Data Integration
- Real-time Google Sheets sync
- Automatic data updates
- Secure API integration

---

## 🔧 Configuration

### Environment Variables
- `VITE_GEMINI_API_KEY` - Your Gemini API key for AI features

### Customize Theme
Edit the Tailwind CSS configuration in `tailwind.config.js` to match your wedding colors and style.

---

## 📝 Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server on port 3000 |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `npm run clean` | Remove build artifacts |
| `npm run lint` | Check TypeScript types |

---

## 🌐 View Online

View your app in AI Studio: https://ai.studio/apps/de0d3d97-a623-4a76-8721-13f2660a29cb

---

## 📖 Documentation

- [Vite Documentation](https://vitejs.dev)
- [React Documentation](https://react.dev)
- [Tailwind CSS](https://tailwindcss.com)
- [Google Gemini API](https://ai.google.dev)

---

## 💝 Made with Love

This beautiful invitation website is crafted with attention to detail and modern web technologies to create an unforgettable digital experience for your special day.

---

<div align="center">

**Happy Wedding! 🎉💕**

</div>
