export interface Project {
  id: string;
  title: string;
  tagline: string;
  description: string;
  category: 'Full Stack' | 'Frontend' | 'Next.js' | 'UI / Performance';
  tags: string[];
  featured?: boolean;
  image: string;
  liveUrl?: string;
  githubUrl?: string;
  metrics?: string;
}

export interface Experience {
  id: string;
  role: string;
  company: string;
  location: string;
  period: string;
  description: string[];
  skills: string[];
}

export interface Education {
  degree: string;
  institution: string;
  location: string;
  period: string;
  score: string;
}

export interface SkillCategory {
  category: string;
  items: { name: string; level?: string }[];
}

export const personalInfo = {
  name: "Prince T",
  initials: "PT",
  badge: "TRAINEE WEB DEVELOPER",
  headline: "Frontend Developer | React.js & Next.js Developer",
  subheadline: "Specializing in React.js, Next.js, TypeScript, Tailwind CSS, and high-performance UI engineering.",
  status: "Available for new roles & projects",
  bio: "Results-driven Frontend Developer with 8 months of industry experience building responsive, user-friendly, and high-performance web applications using React.js, Next.js, and TypeScript. Experienced in RESTful API integration, responsive UI development with Tailwind CSS, and collaborating in Agile teams. Familiar with backend technologies including NestJS and Prisma ORM, with a strong commitment to optimizing Core Web Vitals to 90+ Google Lighthouse scores.",
  location: "Madurai, Tamil Nadu 625001, India",
  phone: "+91 7708302516",
  email: "princeprince12631@gmail.com",
  profileImage: "/prince-seamless.png",
  profileStudio: "/prince-polished-suit.png",
  resumeUrl: "/Prince_T_Resume.pdf",
  formspreeEndpoint: "", // Enter your Formspree Form ID here (e.g. "https://formspree.io/f/xyz") to receive direct emails
  socials: {
    github: "https://github.com/Prince-123-code",
    linkedin: "https://linkedin.com/in/prince-t-987725280",
    twitter: "https://twitter.com",
    email: "mailto:princeprince12631@gmail.com",
  },
  stats: [
    { label: "Lighthouse Score", value: "92+" },
    { label: "Production Sites", value: "33+" },
    { label: "Reusable Components", value: "25+" },
    { label: "Load Time Reduction", value: "28%" },
  ],
};

export const education: Education = {
  degree: "Bachelor of Engineering in Computer Science and Engineering",
  institution: "Kamaraj College of Engineering and Technology",
  location: "Virudhunagar, Tamil Nadu, India",
  period: "Expected Graduation: 2026",
  score: "CGPA: 8.1 / 10",
};

export const projects: Project[] = [
  {
    id: "1",
    title: "Embedded Ordering Platform",
    tagline: "End-to-end responsive catalog browsing, cart management & streamlined checkout for 50+ items",
    description: "Developed a responsive embedded ordering platform featuring product catalog browsing, cart management, and streamlined checkout for 50+ items. Built client-side instant search, category-based filtering, and dynamic product sorting, reducing user ordering drop-off rates by 30%. Connected RESTful APIs to manage product data, cart operations, and order workflows, ensuring smooth client-server communication. Structured reusable React components and application state using React Hooks, reducing code redundancy across modules. Optimized responsive layouts and frontend assets via Next.js code splitting and lazy loading, improving First Contentful Paint by 28%.",
    category: "Full Stack",
    tags: ["React.js", "Next.js", "TypeScript", "RESTful APIs", "Tailwind CSS", "React Hooks"],
    featured: true,
    image: "https://images.unsplash.com/photo-1556742049-0a67c5574f73?auto=format&fit=crop&w=1200&q=80",
    liveUrl: "https://github.com/Prince-123-code",
    githubUrl: "https://github.com/Prince-123-code",
    metrics: "28% improvement in First Contentful Paint",
  },
  {
    id: "2",
    title: "Business & Restaurant Websites",
    tagline: "High-uptime commercial web platforms, interactive navigation & 95+ SEO audits",
    description: "Designed and deployed responsive commercial business and restaurant websites using React.js and Next.js, maintaining 99.9% uptime. Converted complex Figma designs into responsive web pages while preserving visual consistency and 100% cross-device compatibility. Crafted interactive UI elements, smooth navigation menus, and animations using modern SCSS and Tailwind CSS to increase user session duration by 20%. Linked dynamic backend APIs to render live restaurant menus, booking forms, and customer inquiry modules with resilient error handling. Applied semantic HTML5, metadata, and Core Web Vitals best practices, elevating Google Lighthouse SEO audit scores to 95+.",
    category: "Frontend",
    tags: ["React.js", "Next.js", "TypeScript", "HTML5", "CSS3", "Tailwind CSS", "SCSS"],
    featured: true,
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80",
    liveUrl: "https://github.com/Prince-123-code",
    githubUrl: "https://github.com/Prince-123-code",
    metrics: "20% increase in user session duration",
  },
];

export const experiences: Experience[] = [
  {
    id: "exp-1",
    role: "Trainee Web Developer",
    company: "Nerdylabs",
    location: "Madurai, Tamil Nadu, India",
    period: "February 2026 – Present",
    description: [
      "Engineered responsive and user-friendly web applications across 15+ views using React.js, Next.js, JavaScript, and TypeScript.",
      "Translated Figma designs into functional, responsive user interfaces using Tailwind CSS and 25+ reusable React components.",
      "Integrated 10+ RESTful API endpoints with Axios and Fetch API to establish reliable data synchronization and error handling.",
      "Architected component-based workflows and state logic using React Hooks, accelerating feature turnaround by 25%.",
      "Collaborated across Agile development sprints to troubleshoot frontend issues, implement core features, and deliver project milestones.",
      "Partnered with backend engineers on NestJS, Prisma ORM, and MySQL architectures to understand API workflows and support full-stack delivery.",
    ],
    skills: [
      "React.js",
      "Next.js",
      "TypeScript",
      "JavaScript (ES6+)",
      "Tailwind CSS",
      "RESTful APIs",
      "Axios & Fetch API",
      "React Hooks",
      "NestJS",
      "Prisma ORM",
      "MySQL",
      "Agile & Scrum",
      "Lighthouse",
    ],
  },
];

export const skillCategories: SkillCategory[] = [
  {
    category: "Frontend Development",
    items: [
      { name: "React.js", level: "Core" },
      { name: "Next.js", level: "Core" },
      { name: "React Hooks", level: "Expert" },
      { name: "Context API", level: "Advanced" },
      { name: "Redux", level: "Proficient" },
      { name: "Tailwind CSS", level: "Expert" },
      { name: "SCSS / SASS", level: "Advanced" },
      { name: "Responsive Web Design", level: "Expert" },
    ],
  },
  {
    category: "Programming Languages",
    items: [
      { name: "JavaScript (ES6+)", level: "Advanced" },
      { name: "TypeScript", level: "Advanced" },
      { name: "HTML5", level: "Expert" },
      { name: "CSS3", level: "Expert" },
    ],
  },
  {
    category: "Backend & API Integration",
    items: [
      { name: "Node.js", level: "Proficient" },
      { name: "NestJS", level: "Familiar" },
      { name: "RESTful APIs", level: "Advanced" },
      { name: "Axios & Fetch API", level: "Advanced" },
      { name: "JSON", level: "Expert" },
      { name: "Postman & Swagger", level: "Proficient" },
      { name: "Prisma ORM", level: "Familiar" },
      { name: "JWT Authentication", level: "Proficient" },
    ],
  },
  {
    category: "Databases & Cloud",
    items: [
      { name: "MySQL", level: "Proficient" },
      { name: "PostgreSQL", level: "Proficient" },
      { name: "MongoDB", level: "Proficient" },
      { name: "Supabase", level: "Proficient" },
      { name: "Firebase", level: "Proficient" },
    ],
  },
  {
    category: "Tools & Deployment",
    items: [
      { name: "Git & GitHub", level: "Daily" },
      { name: "GitHub Desktop", level: "Daily" },
      { name: "VS Code", level: "Daily" },
      { name: "npm", level: "Proficient" },
      { name: "Vercel", level: "Deployment" },
      { name: "Render", level: "Deployment" },
    ],
  },
  {
    category: "Performance & Methodologies",
    items: [
      { name: "Google Lighthouse", level: "92+ Score" },
      { name: "Core Web Vitals", level: "Optimization" },
      { name: "SEO Fundamentals", level: "Proficient" },
      { name: "Agile & Scrum", level: "Methodology" },
      { name: "Problem Solving & Debugging", level: "Advanced" },
      { name: "Teamwork & Sprints", level: "Collaborative" },
    ],
  },
];
