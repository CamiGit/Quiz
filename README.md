# Quizzler

A trivia quiz web app built with **React + TypeScript + Tailwind CSS**, powered by the [Open Trivia Database API](https://opentdb.com/).

Developed by **Forge/**

## 📸 Preview

| Start Screen | Quiz Screen | Results Screen |
|---|---|---|
| Blue landing with geometric pattern | Alternating light/dark themes per question | Split screen with score |

---

## ✨ Features

- 10 random multiple-choice trivia questions fetched from the Open Trivia Database
- Alternating light/dark theme per question for a dynamic visual experience
- Real-time feedback: correct answers highlighted in green, incorrect in red
- Randomized answer order using the Fisher-Yates shuffle algorithm
- Responsive design for mobile and desktop
- Clean score summary at the end with a replay option

---

## 🗂️ Project Structure

```
src/
├── components/
│   ├── StartScreen.tsx   # Landing page with start button
│   ├── QuizScreen.tsx    # Quiz logic, theming, and answer rendering
│   └── ResultScreen.tsx  # Final score display and restart option
├── App.tsx               # Main state manager and API call
├── typer.ts              # TypeScript type definitions
└── App.css
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js >= 18
- npm or yarn

### Installation

```bash
git clone https://github.com/your-username/quizzler.git
cd quizzler
npm install
```

### Run in development

```bash
npm run dev
```

### Build for production

```bash
npm run build
```

---

## 🔌 API

Questions are fetched from the [Open Trivia Database](https://opentdb.com/):

```
GET https://opentdb.com/api.php?amount=10&type=multiple
```

The app fetches 10 multiple-choice questions on each game start. No API key required.

---

## 🎨 Design

- **Color palette:** `#2431ca` / `#3444fb` (blue), `#2c2c2c` (dark), `#d5dce8` (light gray)
- **Typography:** Arial Black (uppercase headings)
- **Visual motifs:** Geometric SVG line patterns, Forge/ logo mark
- **Themes:** Questions alternate between a light (blue tones) and dark (white on dark gray) theme

---

## 🛠️ Tech Stack

| Tech | Purpose |
|---|---|
| React 18 | UI framework |
| TypeScript | Type safety |
| Tailwind CSS | Styling |
| Vite | Build tool |
| Open Trivia DB | Questions API |

---

## 📄 License

MIT — feel free to use, modify, and distribute.

---

<p align="center">Made with ♥ by <strong>Forge/</strong></p>
