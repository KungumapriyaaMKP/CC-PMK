import React from 'react';
import { Terminal } from 'lucide-react';

// SVGs for Tech Stack and Tools matching the reference design
const TechIcons = {
  nodejs: () => (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none">
      <path d="M12 2L3 7.2v10.4L12 22.8l9-5.2V7.2L12 2z" fill="#339933" />
      <path d="M12 4.5l6.5 3.8v7.4L12 19.5 5.5 15.7V8.3L12 4.5z" fill="#215732" />
      <path d="M10 8h4v8h-4V8z" fill="#FFFFFF" />
    </svg>
  ),
  ai: () => (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="#F59E0B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2a5 5 0 0 1 5 5v1a5 5 0 0 1-10 0V7a5 5 0 0 1 5-5z" />
      <path d="M8 15a6 6 0 0 0 8 0" />
      <line x1="12" y1="18" x2="12" y2="22" />
      <line x1="8" y1="22" x2="16" y2="22" />
      <circle cx="9" cy="7" r="1" fill="#F59E0B" />
      <circle cx="15" cy="7" r="1" fill="#F59E0B" />
    </svg>
  ),
  c: () => (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="10" fill="#00599C" />
      <path d="M15 8.5a5 5 0 1 0 0 7" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  ),
  datastructures: () => (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="#F97316" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="5" r="2.5" />
      <circle cx="6" cy="18" r="2.5" />
      <circle cx="18" cy="18" r="2.5" />
      <line x1="12" y1="7.5" x2="6" y2="15.5" />
      <line x1="12" y1="7.5" x2="18" y2="15.5" />
    </svg>
  ),
  css: () => (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none">
      <path d="M3 2l1.8 17.5L12 22l7.2-2.5L21 2H3z" fill="#1572B6" />
      <path d="M12 3.8v16.4l5.6-1.9 1.4-14.5H12z" fill="#33A9DC" />
      <path d="M7.5 7.5h9l-.2 2.5H12v2.5h3.8l-.3 3.8-3.5 1-3.5-1-.2-2h-2l.4 3.8L12 20.2l5.3-1.8.7-7.4H7.5V7.5z" fill="#FFFFFF" />
    </svg>
  ),
  python: () => (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none">
      <path d="M11.9 2c-3.1 0-5 1.5-5 3.5v2.5h5.1v1H4.5c-2 0-3.5 1.8-3.5 4.9 0 3.2 1.5 5.1 3.5 5.1h1.5v-2.3c0-2.4 2-4.4 4.4-4.4h4.4v-5.3c0-2-1.8-3.5-4.9-3.5h1.5zm-2.4 2a.8.8 0 1 1 0 1.6.8.8 0 0 1 0-1.6z" fill="#3776AB" />
      <path d="M12.1 22c3.1 0 5-1.5 5-3.5V16H12v-1h7.5c2 0 3.5-1.8 3.5-4.9 0-3.2-1.5-5.1-3.5-5.1H18v2.3c0 2.4-2 4.4-4.4 4.4H9.2v5.3c0 2 1.8 3.5 4.9 3.5h-2zm2.4-2a.8.8 0 1 1 0-1.6.8.8 0 0 1 0 1.6z" fill="#FFD43B" />
    </svg>
  ),
  dbms: () => (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="#F59E0B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <ellipse cx="12" cy="5" rx="8" ry="3" />
      <path d="M4 5v6c0 1.66 3.58 3 8 3s8-1.34 8-3V5" />
      <path d="M4 11v6c0 1.66 3.58 3 8 3s8-1.34 8-3v-6" />
    </svg>
  ),
  mysql: () => (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none">
      <rect width="24" height="24" rx="4" fill="#00618A" />
      <path d="M6 16c1.5-3.5 4-6 8-6 2 0 4 1 5 3-1.5-1-3-1.5-5-1.5-3 0-5.5 2-6.5 4.5H6z" fill="#E48E00" />
      <circle cx="16" cy="11" r="1" fill="#FFFFFF" />
    </svg>
  ),
  javascript: () => (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none">
      <rect width="24" height="24" rx="3" fill="#F7DF1E" />
      <path d="M7 17.5c.5.8 1.4 1.3 2.5 1.3 1.3 0 2.2-.7 2.2-2.1v-7.2h-2.2v7.2c0 .5-.3.8-.8.8-.4 0-.7-.2-.9-.6l-.8.6zm7.2-.1c.7.8 1.8 1.4 3.1 1.4 2 0 3.2-1 3.2-2.7 0-1.6-1-2.2-2.6-2.9l-.7-.3c-1-.4-1.4-.7-1.4-1.3 0-.6.5-1.1 1.3-1.1.8 0 1.3.3 1.7.9l1.7-1.1c-.8-1.2-1.9-1.6-3.4-1.6-2.1 0-3.4 1.2-3.4 2.8 0 1.5 1 2.3 2.5 2.9l.7.3c1.1.5 1.6.8 1.6 1.4 0 .7-.6 1.2-1.5 1.2-1.1 0-1.8-.5-2.3-1.4l-1.9 1.4z" fill="#000000" />
    </svg>
  ),
  java: () => (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none">
      <path d="M8.5 18.5c2.5.5 5.5.5 7 0 .5-.2 1.2-.5 1.2-.8 0-.4-.7-.7-1.5-.8-1.8-.2-4.5-.2-6.7 0-.9.1-1.5.4-1.5.8 0 .3.5.6 1.5.8zm-1-3c3 .6 7 .6 9 0 .8-.2 1.5-.6 1.5-1 0-.5-.8-.8-2-1-2.4-.3-6-.3-8.8 0-1.2.1-2 .5-2 1 0 .4.7.8 2.3 1zm3.5-5.5c-1 1-1.5 2.2-1.5 3.5 1.5-.5 3-1.5 3.5-3.5zm2-3c-1 1.5-1.5 3-1 4.5 1.5-.8 2.5-2.2 2.5-4.5-.5 0-1 0-1.5 0z" fill="#E76F00" />
      <path d="M5 20c4 1 10 1 14 0" stroke="#5382A1" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  ),
  oops: () => (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="#F97316" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="12 2 2 7 12 12 22 7 12 2" />
      <polyline points="2 17 12 22 22 17" />
      <polyline points="2 12 12 17 22 12" />
    </svg>
  ),
  deepface: () => (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="#F97316" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 7V4h3" />
      <path d="M20 7V4h-3" />
      <path d="M4 17v3h3" />
      <path d="M20 17v3h-3" />
      <circle cx="9" cy="10" r="1" fill="#F97316" />
      <circle cx="15" cy="10" r="1" fill="#F97316" />
      <path d="M9.5 15a3.5 3.5 0 0 0 5 0" />
    </svg>
  ),
  react: () => (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="2.2" fill="#00D8FF" />
      <ellipse cx="12" cy="12" rx="10" ry="4" stroke="#00D8FF" strokeWidth="1.2" transform="rotate(0 12 12)" />
      <ellipse cx="12" cy="12" rx="10" ry="4" stroke="#00D8FF" strokeWidth="1.2" transform="rotate(60 12 12)" />
      <ellipse cx="12" cy="12" rx="10" ry="4" stroke="#00D8FF" strokeWidth="1.2" transform="rotate(120 12 12)" />
    </svg>
  ),
  express: () => (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none">
      <rect width="24" height="24" rx="4" fill="#252525" />
      <text x="5" y="16" fill="#FFFFFF" fontSize="11" fontFamily="monospace" fontWeight="bold">ex</text>
    </svg>
  ),
  ml: () => (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="#F97316" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="4" y="4" width="16" height="16" rx="2" />
      <rect x="8" y="8" width="8" height="8" rx="1" />
      <line x1="2" y1="9" x2="4" y2="9" />
      <line x1="2" y1="15" x2="4" y2="15" />
      <line x1="20" y1="9" x2="22" y2="9" />
      <line x1="20" y1="15" x2="22" y2="15" />
      <line x1="9" y1="2" x2="9" y2="4" />
      <line x1="15" y1="2" x2="15" y2="4" />
      <line x1="9" y1="20" x2="9" y2="22" />
      <line x1="15" y1="20" x2="15" y2="22" />
    </svg>
  ),
  cpp: () => (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="10" fill="#00599C" />
      <path d="M12 9a4 4 0 1 0 0 6" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" />
      <path d="M14 11v2m-1-1h2m3-1v2m-1-1h2" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  ),
  html: () => (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none">
      <path d="M3 2l1.8 17.5L12 22l7.2-2.5L21 2H3z" fill="#E34F26" />
      <path d="M12 3.8v16.4l5.6-1.9 1.4-14.5H12z" fill="#EF652A" />
      <path d="M7.5 7.5h9l-.2 2.5H12v2.5h4.1l-.4 4.5L12 18.2l-3.7-1.2-.2-2.2H6l.4 4 5.6 1.8 5.6-1.8.8-8.9H7.5V7.5z" fill="#FFFFFF" />
    </svg>
  ),
  pyspark: () => (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="10" fill="#E25A1C" />
      <path d="M12 5l1.8 4.2 4.2 1.8-4.2 1.8L12 17l-1.8-4.2L6 11l4.2-1.8L12 5z" fill="#FFFFFF" />
    </svg>
  ),
  athena: () => (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none">
      <rect width="24" height="24" rx="4" fill="#232F3E" />
      <circle cx="12" cy="12" r="7" stroke="#FF9900" strokeWidth="2" fill="none" />
      <path d="M12 7v5l3 2" stroke="#FF9900" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  ),
  sql: () => (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="#38BDF8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 6h16M4 12h16M4 18h16" />
      <circle cx="8" cy="6" r="1.5" fill="#38BDF8" />
      <circle cx="8" cy="12" r="1.5" fill="#38BDF8" />
      <circle cx="8" cy="18" r="1.5" fill="#38BDF8" />
    </svg>
  ),

  // Tools
  vscode: () => (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none">
      <path d="M17.5 2.5L7.5 9.8 3.5 6.7 1.5 8.2v7.6l2 1.5 4-3.1 10 7.3 4.5-2.2V4.7L17.5 2.5z" fill="#007ACC" />
      <path d="M17.5 5.5l-8 6.5 8 6.5V5.5z" fill="#1F9CF0" />
    </svg>
  ),
  powerpoint: () => (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none">
      <rect x="2" y="3" width="20" height="18" rx="3" fill="#D24726" />
      <rect x="6" y="7" width="8" height="10" rx="1" fill="#FFFFFF" />
      <text x="8" y="15" fill="#D24726" fontSize="9" fontWeight="bold">P</text>
    </svg>
  ),
  jupyter: () => (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="6" stroke="#F37626" strokeWidth="2.5" fill="none" />
      <circle cx="7" cy="6" r="1.8" fill="#767676" />
      <circle cx="17" cy="18" r="1.8" fill="#F37626" />
      <circle cx="18" cy="7" r="1.2" fill="#767676" />
    </svg>
  ),
  n8n: () => (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="#EA4B71" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="6" cy="12" r="2.5" fill="#EA4B71" />
      <circle cx="18" cy="8" r="2.5" fill="#EA4B71" />
      <circle cx="18" cy="16" r="2.5" fill="#EA4B71" />
      <path d="M8.5 12h7m0 0l-2.5-3m2.5 3l-2.5 3" />
    </svg>
  ),
  github: () => (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="#FFFFFF">
      <path d="M12 2C6.48 2 2 6.5 2 12.03c0 4.43 2.87 8.18 6.84 9.5.5.09.68-.22.68-.48v-1.7c-2.78.6-3.37-1.34-3.37-1.34-.45-1.15-1.11-1.46-1.11-1.46-.91-.62.07-.61.07-.61 1 .07 1.53 1.03 1.53 1.03.89 1.53 2.34 1.09 2.91.83.09-.65.35-1.09.64-1.34-2.22-.25-4.56-1.11-4.56-4.94 0-1.09.39-1.99 1.03-2.69-.1-.25-.45-1.27.1-2.65 0 0 .84-.27 2.75 1.03a9.58 9.58 0 0 1 5 0c1.91-1.3 2.75-1.03 2.75-1.03.55 1.38.2 2.4.1 2.65.64.7 1.03 1.6 1.03 2.69 0 3.84-2.34 4.69-4.57 4.94.36.31.68.92.68 1.85v2.75c0 .27.18.58.69.48A10.02 10.02 0 0 0 22 12.03C22 6.5 17.52 2 12 2z" />
    </svg>
  ),
  canva: () => (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="10" fill="#00C4CC" />
      <path d="M14.5 9.5c-1-1-2.5-1.5-4-1.5-3 0-5 2.2-5 5s2 5 5 5c1.8 0 3.2-.8 4.2-2l-1.5-1c-.7.9-1.7 1.4-2.7 1.4-1.9 0-3.3-1.4-3.3-3.4 0-2 1.4-3.4 3.3-3.4 1 0 1.9.4 2.5 1.1l1.5-1.2z" fill="#FFFFFF" />
    </svg>
  ),
  excel: () => (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none">
      <rect x="2" y="3" width="20" height="18" rx="3" fill="#107C41" />
      <rect x="6" y="7" width="8" height="10" rx="1" fill="#FFFFFF" />
      <text x="8" y="15" fill="#107C41" fontSize="9" fontWeight="bold">X</text>
    </svg>
  ),
  blender: () => (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="13" r="5" fill="#EA7600" />
      <circle cx="12" cy="13" r="2.5" fill="#225B99" />
      <path d="M12 5l-2 5h4l-2-5zm7 5l-4.5 1.5 2 3.5 2.5-5zm-14 0l2.5 5 2-3.5L5 10z" fill="#EA7600" />
    </svg>
  ),
  workbench: () => (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none">
      <rect width="24" height="24" rx="4" fill="#00758F" />
      <path d="M6 14c2-4 5-6 9-5 2 .5 3 2 4 4-2-1.5-4-2-6-1.5-2.5.5-4.5 2-7 2.5z" fill="#F29111" />
      <circle cx="15" cy="10" r="1.2" fill="#FFFFFF" />
    </svg>
  ),
  omniverse: () => (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="10" fill="#76B900" />
      <path d="M7 12c0-2.8 2.2-5 5-5s5 2.2 5 5-2.2 5-5 5-5-2.2-5-5zm2.5 0c0 1.4 1.1 2.5 2.5 2.5s2.5-1.1 2.5-2.5-1.1-2.5-2.5-2.5-2.5 1.1-2.5 2.5z" fill="#000000" />
    </svg>
  ),
  analytics: () => (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none">
      <rect x="3" y="13" width="4" height="8" rx="1" fill="#F9AB00" />
      <rect x="10" y="8" width="4" height="13" rx="1" fill="#E37400" />
      <rect x="17" y="3" width="4" height="18" rx="1" fill="#EA4335" />
    </svg>
  ),
  notion: () => (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="#FFFFFF">
      <path d="M4.5 4.5l11.2-2.3c1.1-.2 2.1.6 2.3 1.7l1.8 13.5c.2 1.1-.6 2.1-1.7 2.3L6.9 22c-1.1.2-2.1-.6-2.3-1.7L2.8 6.8c-.2-1.1.6-2.1 1.7-2.3zm4 3.7v8.5l6-6.8v8.3h1.8V7.4l-6 6.8V6.4H8.5v1.8z" />
    </svg>
  ),
  meta: () => (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none">
      <path d="M16.5 6.5C14.7 6.5 13.2 7.4 12 8.8 10.8 7.4 9.3 6.5 7.5 6.5 4.5 6.5 2 9 2 12s2.5 5.5 5.5 5.5c2 0 3.7-1 4.5-2.5.8 1.5 2.5 2.5 4.5 2.5 3 0 5.5-2.5 5.5-5.5s-2.5-5.5-5.5-5.5zm-9 9c-1.9 0-3.5-1.6-3.5-3.5s1.6-3.5 3.5-3.5c1.4 0 2.6.8 3.1 2.1-.5.7-1 1.4-1.6 2.1-.5.9-1 1.6-1.5 2.8zm9 0c-.5-1.2-1-1.9-1.5-2.8-.6-.7-1.1-1.4-1.6-2.1.5-1.3 1.7-2.1 3.1-2.1 1.9 0 3.5 1.6 3.5 3.5s-1.6 3.5-3.5 3.5z" fill="#0081FB" />
    </svg>
  ),
};

// Data for Tech Stack (Row 1 moves left, Row 2 moves right)
const TECH_STACK_ROW_1 = [
  { name: 'Node.js', icon: TechIcons.nodejs },
  { name: 'Artificial Intelligence', icon: TechIcons.ai },
  { name: 'C', icon: TechIcons.c },
  { name: 'Data Structures', icon: TechIcons.datastructures },
  { name: 'CSS', icon: TechIcons.css },
  { name: 'Python', icon: TechIcons.python },
  { name: 'DBMS', icon: TechIcons.dbms },
  { name: 'MySQL', icon: TechIcons.mysql },
  { name: 'PySpark', icon: TechIcons.pyspark },
  { name: 'Amazon Athena', icon: TechIcons.athena },
];

const TECH_STACK_ROW_2 = [
  { name: 'JavaScript', icon: TechIcons.javascript },
  { name: 'Java', icon: TechIcons.java },
  { name: 'OOPS', icon: TechIcons.oops },
  { name: 'DeepFace', icon: TechIcons.deepface },
  { name: 'React.js', icon: TechIcons.react },
  { name: 'Express.js', icon: TechIcons.express },
  { name: 'Machine Learning', icon: TechIcons.ml },
  { name: 'C++', icon: TechIcons.cpp },
  { name: 'HTML', icon: TechIcons.html },
  { name: 'SQL', icon: TechIcons.sql },
];

// Data for Tools (Row 1 moves left, Row 2 moves right)
const TOOLS_ROW_1 = [
  { name: 'VS Code', icon: TechIcons.vscode },
  { name: 'PowerPoint', icon: TechIcons.powerpoint },
  { name: 'Jupyter Notebook', icon: TechIcons.jupyter },
  { name: 'n8n', icon: TechIcons.n8n },
  { name: 'GitHub', icon: TechIcons.github },
  { name: 'Meta Business Suite', icon: TechIcons.meta },
  { name: 'Google Analytics', icon: TechIcons.analytics },
];

const TOOLS_ROW_2 = [
  { name: 'Canva', icon: TechIcons.canva },
  { name: 'Excel', icon: TechIcons.excel },
  { name: 'Blender', icon: TechIcons.blender },
  { name: 'MySQL Workbench', icon: TechIcons.workbench },
  { name: 'Omniverse', icon: TechIcons.omniverse },
  { name: 'Notion', icon: TechIcons.notion },
  { name: 'Jupyter Notebook', icon: TechIcons.jupyter },
];

function PillBadge({ item }) {
  const IconComp = item.icon;
  return (
    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-none bg-white border border-slate-200 hover:border-[#0F172A] hover:bg-slate-50 text-xs font-medium text-[#0F172A] transition-colors shrink-0 shadow-2xs group cursor-default select-none">
      <span className="shrink-0 group-hover:scale-110 transition-transform">
        <IconComp />
      </span>
      <span className="whitespace-nowrap tracking-wide">{item.name}</span>
    </div>
  );
}

function MarqueeRow({ items, direction = 'left', speed = '32s' }) {
  const animationClass =
    direction === 'right'
      ? 'animate-scroll-horizontal-reverse'
      : 'animate-scroll-horizontal';

  return (
    <div className="w-full overflow-hidden scroller-mask relative py-0.5">
      <div
        className={`flex ${animationClass}`}
        style={{ '--scroll-duration': speed }}
      >
        {/* Set 1 */}
        <div className="flex shrink-0 gap-2.5 pr-2.5">
          {items.map((item, idx) => (
            <PillBadge key={`a-${idx}`} item={item} />
          ))}
        </div>
        {/* Set 2 (identical duplicate with trailing padding for mathematical 100% seamless looping) */}
        <div className="flex shrink-0 gap-2.5 pr-2.5">
          {items.map((item, idx) => (
            <PillBadge key={`b-${idx}`} item={item} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default function TechStackMarquee() {
  return (
    <div className="w-full space-y-3.5 py-2">
      {/* Row 1 moving left */}
      <MarqueeRow items={TECH_STACK_ROW_1} direction="left" speed="28s" />

      {/* Row 2 moving right */}
      <MarqueeRow items={TECH_STACK_ROW_2} direction="right" speed="32s" />

      {/* Row 3 moving left */}
      <MarqueeRow items={TOOLS_ROW_1} direction="left" speed="26s" />

      {/* Row 4 moving right */}
      <MarqueeRow items={TOOLS_ROW_2} direction="right" speed="30s" />
    </div>
  );
}
