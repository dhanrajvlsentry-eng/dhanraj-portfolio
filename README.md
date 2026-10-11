# Dhanraj V L – Personal Portfolio

A sleek, responsive personal portfolio website built with **React + Vite** showcasing academic background, skills, and projects in Computer Science & Data Science.

---

## 🚀 Tech Stack

| Layer      | Technology |
|------------|------------|
| Framework  | React 18 |
| Build Tool | Vite 6 |
| Language   | JavaScript (ES Modules) |
| Styling    | Vanilla CSS (Design system with CSS custom properties) |
| Fonts      | Google Fonts – Space Grotesk, Inter, JetBrains Mono |

---

## 📁 Project Structure

```
portfolio/
├── public/
│   ├── favicon.svg
│   ├── icons.svg
│   └── images/
│       └── profile.jpg         ← Profile portrait photo (65KB)
├── src/
│   ├── components/
│   │   ├── Navbar.jsx          ← Sticky nav, theme toggle, mobile menu
│   │   ├── Hero.jsx            ← Portrait, typing role animation, CTAs
│   │   ├── About.jsx           ← Bio, quick stats, spoken languages
│   │   ├── Skills.jsx          ← Skill cards, tech pills
│   │   ├── Projects.jsx        ← FinTech platform showcase
│   │   ├── Education.jsx       ← Academic timeline (BE CS & Data Science)
│   │   ├── Contact.jsx         ← Validated form, Formspree & mailto/tel CTAs
│   │   └── Footer.jsx          ← Quick links, copyright
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css               ← Full custom design system & animations
├── .env.example                ← Environment template
├── .gitignore                  ← Node modules, dist, secrets ignored
├── index.html
├── package.json
├── vite.config.js
└── README.md
```

---

## 🖥️ Setup & Installation

### 1. Prerequisites
- **Node.js**: v18.0.0 or higher
- **npm**: v9.0.0 or higher

### 2. Clone / Open Project
```bash
git clone <repository-url>
cd portfolio
```

### 3. Install Dependencies
```bash
npm install
```

### 4. Configure Environment Variables (Formspree Contact Form)
The contact form is pre-configured with endpoint ID `mqpebwnl`. To customize or change the Formspree endpoint:
1. Duplicate `.env.example` as `.env`:
   ```bash
   cp .env.example .env
   ```
2. Set your Formspree ID in `.env`:
   ```env
   VITE_FORMSPREE_ID=mqpebwnl
   ```
*(Note: Never commit `.env` containing private credentials to git. It is excluded in `.gitignore`.)*

### 5. Add / Replace Profile Picture
Ensure your photo is named `profile.jpg` and placed in:
```
public/images/profile.jpg
```
If the image file is missing, an initials fallback avatar (`DV`) will automatically display.

### 6. Run Development Server
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

### 7. Production Build
```bash
npm run build
```
Builds optimized production assets into the `dist/` directory.

### 8. Preview Production Build
```bash
npm run preview
```

---

## 🎨 Key Features & Design System

- **Curated Palette**: Midnight Navy (`#071426`), Electric Blue (`#1677FF`), Neon Cyan (`#42DDF5`), and Metallic Gold (`#D8AD55`).
- **Theme Toggle**: Switch between **Midnight Dark** (default) and **Light Mode** seamlessly from the navigation bar. Preferences persist across page refreshes via `localStorage`.
- **Fully Responsive**: Verified across mobile (320px, 375px), tablet (768px), desktop (1024px), and ultra-wide screens (1440px+).
- **Accessible**: Semantic HTML5 tags (`<header>`, `<nav>`, `<main>`, `<article>`, `<section>`, `<footer>`), ARIA attributes, keyboard navigation support, and visible focus rings.
- **Active Contact Flow**:
  - Direct "Email Me" (`mailto:`) and "Call Me" (`tel:`) buttons.
  - Interactive contact form with real-time field validation.
  - Direct Formspree delivery with submission spinner and confirmed server delivery state.

---

## 👤 Author

**Dhanraj V L**  
- **Course**: Computer Science and Data Science  
- **Institution**: Atria Institute of Technology, Bengaluru  
- **Year**: Third Year (2025–26) · CGPA: 8.88 · Expected Graduation: 2028  
- **Email**: [dhanrajvlgopi@gmail.com](mailto:dhanrajvlgopi@gmail.com)  
- **Phone**: [+91 9353427917](tel:+919353427917)  
- **Location**: Bengaluru, India  

---

## 📄 License

Personal portfolio. All rights reserved © 2026 Dhanraj V L.
