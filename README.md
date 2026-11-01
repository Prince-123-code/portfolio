# Modern Minimalist Developer Portfolio

A sleek, ultra-responsive, and minimalist developer portfolio built with **React 19**, **Vite**, **TypeScript**, **Tailwind CSS**, and **Framer Motion**.

---

## ⚡ Quick Start

```bash
# Navigate to the portfolio directory
cd portfolio

# Install dependencies (already installed)
npm install

# Start development server
npm run dev
```

Visit [http://localhost:5173](http://localhost:5173) in your browser.

---

## 🎨 How to Customize Your Portfolio

All personal information, social links, project showcases, job experience, and skills are organized inside a single, easy-to-edit file:

📁 **[`src/data/portfolioData.ts`](./src/data/portfolioData.ts)**

### 1. Update Personal Info & Social Links
Modify `personalInfo`:
```typescript
export const personalInfo = {
  name: "Your Name",
  headline: "Full-Stack Engineer / UI Specialist",
  subheadline: "Specializing in React, TypeScript, and modern web applications.",
  status: "Available for new projects & roles",
  bio: "Your personalized bio...",
  location: "City, Country / Remote",
  email: "your.email@example.com",
  socials: {
    github: "https://github.com/yourusername",
    linkedin: "https://linkedin.com/in/yourusername",
    twitter: "https://twitter.com/yourusername",
    email: "mailto:your.email@example.com",
  },
  stats: [
    { label: "Years Experience", value: "4+" },
    { label: "Shipped Projects", value: "25+" },
    ...
  ],
};
```

### 2. Add or Edit Projects
Add your project objects to the `projects` array:
```typescript
export const projects: Project[] = [
  {
    id: "1",
    title: "Project Name",
    tagline: "Short one-liner summary",
    description: "Detailed description of problems solved and technologies used.",
    category: "Full Stack", // Options: "Full Stack" | "Frontend" | "Mobile / Apps" | "Tools & Open Source"
    tags: ["React", "TypeScript", "Tailwind CSS"],
    featured: true, // Shows badge and prioritizes display
    image: "https://images.unsplash.com/...", // or local asset in /public
    liveUrl: "https://your-demo-url.com",
    githubUrl: "https://github.com/your-repo",
    metrics: "40% performance gain",
  },
];
```

### 3. Update Career Timeline & Skills
Edit `experiences` and `skillCategories` in `src/data/portfolioData.ts`.

---

## 📂 Project Architecture

```
portfolio/
├── index.html                   # HTML template with Google Fonts (Inter)
├── vite.config.ts               # Vite configuration with Tailwind CSS plugin
├── package.json                 # Dependencies & scripts
└── src/
    ├── main.tsx                 # Application entry point
    ├── App.tsx                  # Root component
    ├── index.css                # Tailwind CSS imports & base styles
    ├── context/
    │   └── ThemeContext.tsx     # Light / Dark mode state & localStorage persist
    ├── data/
    │   └── portfolioData.ts     # Centralized portfolio data (edit your info here!)
    └── components/
        ├── Navbar.tsx           # Sticky header with blurred backdrop & theme toggle
        ├── Hero.tsx             # Punchy headline, CTA buttons, metrics, and socials
        ├── About.tsx            # Value pillars & engineering philosophy
        ├── Projects.tsx         # Category filtering, responsive cards, external links
        ├── Experience.tsx       # Chronological career timeline & skills chips
        ├── Skills.tsx           # Grouped tech stack badges by domain
        ├── Contact.tsx          # Direct email copy button + interactive contact form
        ├── Footer.tsx           # Back to top button, social links & copyright
        └── Icons.tsx            # Clean SVGs for GitHub, LinkedIn, Twitter/X
```

---

## 🚀 Building for Production & Deployment

To generate an optimized production bundle:

```bash
npm run build
```

The output will be created in the `dist/` directory, ready to deploy to:
- **Vercel**: Import repository and deploy automatically with zero config.
- **Netlify**: Set build command to `npm run build` and publish directory to `dist`.
- **GitHub Pages**: Deploy the `dist` folder.
