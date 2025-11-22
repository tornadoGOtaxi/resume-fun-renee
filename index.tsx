import React, { useState, useEffect, useRef } from 'react';
import { createRoot } from 'react-dom/client';
import { 
  Gamepad2, Trophy, Zap, Sword, Skull, Terminal, Save, Share2, 
  Code, Layout, Database, Server, Shield, Target, Cpu, Activity,
  ChevronDown, ChevronUp, Filter, Power, Star, Command, Settings, X,
  Printer, Search, Info
} from 'lucide-react';

// --- DATA ---

const RESUME_DATA = {
  profile: {
    name: "RENEE IKEMIRE",
    role: "SENIOR SOLUTIONS ARCHITECT",
    subRole: "ENTERPRISE SYSTEMS | DATA | AUTOMATION",
    contact: {
      phone: "217.986.0863",
      email: "r.ikemire@outlook.com",
      web: "reneeikemire.vercel.app"
    },
    summary: "Senior technology leader specializing in enterprise modernization, data-driven architecture, and full-lifecycle program delivery across government and public-sector environments. Proven ability to architect scalable solutions, streamline data ecosystems, and drive high-impact transformation initiatives."
  },
  stats: [
    { label: "Arch & Systems", value: 98, color: "bg-cyan-500" },
    { label: "Data Engineering", value: 95, color: "bg-blue-500" },
    { label: "Automation & AI", value: 90, color: "bg-purple-500" },
    { label: "Full-Stack Dev", value: 85, color: "bg-green-500" },
    { label: "Cloud & Integ", value: 88, color: "bg-indigo-500" },
    { label: "Leadership", value: 92, color: "bg-yellow-500" },
    { label: "Process Opt", value: 89, color: "bg-pink-500" }
  ],
  skills: [
    { 
      category: "Programming & Scripting", 
      items: [
        { name: "SQL", proficiency: "Expert", exp: 10, recency: "Current" },
        { name: "HTML / CSS", proficiency: "Expert", exp: 10, recency: "Current" },
        { name: "PowerShell", proficiency: "Expert", exp: 7, recency: "Current" },
        { name: ".NET Framework", proficiency: "Advanced", exp: 8, recency: "Current" },
        { name: "VBA / VBScript", proficiency: "Advanced", exp: 8, recency: "Used Recently" },
        { name: "JavaScript", proficiency: "Advanced", exp: 7, recency: "Current" },
        { name: "C#", proficiency: "Advanced", exp: 6, recency: "Used Recently" },
        { name: "Python", proficiency: "Advanced", exp: 6, recency: "Current" },
        { name: "ASP.NET", proficiency: "Advanced", exp: 6, recency: "Used Recently" },
        { name: "Google Apps Script", proficiency: "Advanced", exp: 3, recency: "Current" },
        { name: "Java", proficiency: "Intermediate", exp: 4, recency: "Occasional" },
        { name: "Shell (Bash)", proficiency: "Intermediate", exp: 3, recency: "Occasional" },
        { name: "TypeScript", proficiency: "Intermediate", exp: 2, recency: "Occasional" }
      ]
    },
    { 
      category: "Databases", 
      items: [
        { name: "SQL Server", proficiency: "Expert", exp: 10, recency: "Current" },
        { name: "MS Access", proficiency: "Expert", exp: 10, recency: "Current" },
        { name: "DB Design", proficiency: "Expert", exp: 10, recency: "Current" },
        { name: "DB Migrations", proficiency: "Expert", exp: 10, recency: "Current" },
        { name: "Oracle", proficiency: "Intermediate", exp: 4, recency: "Occasional" },
        { name: "MySQL / MariaDB", proficiency: "Intermediate", exp: 4, recency: "Occasional" },
        { name: "PostgreSQL", proficiency: "Intermediate", exp: 3, recency: "Occasional" },
        { name: "MongoDB", proficiency: "Intermediate", exp: 3, recency: "Occasional" },
        { name: "Cosmos DB", proficiency: "Intermediate", exp: 2, recency: "Used Recently" },
        { name: "Snowflake", proficiency: "Beginner", exp: 1, recency: "Occasional" }
      ]
    },
    { 
      category: "Cloud & DevOps", 
      items: [
        { name: "Azure", proficiency: "Advanced", exp: 5, recency: "Current" },
        { name: "AWS", proficiency: "Intermediate", exp: 3, recency: "Occasional" },
        { name: "GCP", proficiency: "Intermediate", exp: 2, recency: "Occasional" },
        { name: "FinOps", proficiency: "Intermediate", exp: 2, recency: "Used Recently" }
      ]
    },
    { 
      category: "BI & Analytics", 
      items: [
        { name: "Power BI", proficiency: "Advanced", exp: 5, recency: "Current" },
        { name: "Tableau", proficiency: "Intermediate", exp: 3, recency: "Occasional" },
        { name: "Pandas / NumPy", proficiency: "Intermediate", exp: 3, recency: "Used Recently" }
      ]
    },
    { 
      category: "Architecture", 
      items: [
        { name: "Solution Arch", proficiency: "Expert", exp: 10, recency: "Current" },
        { name: "System Arch", proficiency: "Expert", exp: 10, recency: "Current" },
        { name: "Legacy Mod", proficiency: "Expert", exp: 10, recency: "Current" },
        { name: "Automation", proficiency: "Expert", exp: 10, recency: "Current" },
        { name: "Data Governance", proficiency: "Advanced", exp: 6, recency: "Used Recently" }
      ]
    },
    { 
      category: "Leadership", 
      items: [
        { name: "Business Analysis", proficiency: "Expert", exp: 10, recency: "Current" },
        { name: "Project Mgmt", proficiency: "Expert", exp: 10, recency: "Current" },
        { name: "Training", proficiency: "Expert", exp: 10, recency: "Current" },
        { name: "Stakeholder Comm", proficiency: "Expert", exp: 10, recency: "Current" },
        { name: "Change Mgmt", proficiency: "Advanced", exp: 8, recency: "Current" },
        { name: "Process Imp", proficiency: "Advanced", exp: 8, recency: "Current" },
        { name: "Product Mgmt", proficiency: "Advanced", exp: 5, recency: "Used Recently" }
      ]
    },
    { 
      category: "Tools & Frameworks", 
      items: [
        { name: "Visual Studio", proficiency: "Expert", exp: 10, recency: "Current" },
        { name: "Agile/Scrum", proficiency: "Expert", exp: 10, recency: "Current" },
        { name: "Lean", proficiency: "Advanced", exp: 8, recency: "Current" },
        { name: "GitHub", proficiency: "Advanced", exp: 6, recency: "Current" },
        { name: "SharePoint", proficiency: "Advanced", exp: 6, recency: "Used Recently" },
        { name: "JIRA", proficiency: "Advanced", exp: 5, recency: "Current" },
        { name: "Ent. Arch (TOGAF)", proficiency: "Advanced", exp: 5, recency: "Used Recently" },
        { name: "Power Platform", proficiency: "Advanced", exp: 4, recency: "Current" },
        { name: "Adobe Suite", proficiency: "Intermediate", exp: 4, recency: "Occasional" },
        { name: "ITIL", proficiency: "Intermediate", exp: 4, recency: "Used Recently" },
        { name: "Smartsheet", proficiency: "Advanced", exp: 3, recency: "Current" }
      ]
    },
    { 
      category: "Security & AI", 
      items: [
        { name: "Cybersecurity", proficiency: "Intermediate", exp: 4, recency: "Used Recently" },
        { name: "Compliance", proficiency: "Intermediate", exp: 3, recency: "Occasional" },
        { name: "ML / AI Tools", proficiency: "Intermediate", exp: 3, recency: "Used Recently" },
        { name: "NLP", proficiency: "Intermediate", exp: 3, recency: "Used Recently" },
        { name: "SOC 2", proficiency: "Intermediate", exp: 2, recency: "Occasional" }
      ]
    },
    {
      category: "Enterprise Apps",
      items: [
        { name: "Salesforce", proficiency: "Intermediate", exp: 3, recency: "Occasional" },
        { name: "ServiceNow", proficiency: "Intermediate", exp: 3, recency: "Occasional" },
        { name: "SAP", proficiency: "Beginner", exp: 1, recency: "Not Recent" },
        { name: "Informatica", proficiency: "Beginner", exp: 1, recency: "Not Recent" }
      ]
    }
  ],
  ultimateAbilities: [
    { name: "Enterprise Arch", desc: "Scalable Systems & Modernization" },
    { name: "Data Governance", desc: "Warehousing, Modeling, Migration" },
    { name: "Auto-Scripting", desc: "Process Automation (Python/PS)" },
    { name: "Strategic Ops", desc: "Stakeholder Alignment & Roadmapping" }
  ],
  bossFights: [
    {
      boss: "LEGACY CHAOS",
      context: "Ahava Services",
      victory: "Consolidated legacy data ecosystems, ensuring compliance and reducing variance across all database intake cycles.",
      icon: <Skull className="w-8 h-8 text-red-500 print:text-black" />
    },
    {
      boss: "ZERO BUDGET",
      context: "Savvy IT",
      victory: "Designed SMS platform with $0 recurring cost, eliminating third-party fees while increasing engagement.",
      icon: <Shield className="w-8 h-8 text-blue-400 print:text-black" />
    },
    {
      boss: "CRISIS MODE",
      context: "HOPE Outreach",
      victory: "Transitioned 27 chronically homeless individuals to housing; launched statewide Safe Parking Program.",
      icon: <Activity className="w-8 h-8 text-green-400 print:text-black" />
    },
    {
      boss: "FEDERAL AUDIT",
      context: "CO Dept of Education",
      victory: "Architected statewide Special Ed Data Collection system ensuring 100% federal funding compliance.",
      icon: <Target className="w-8 h-8 text-yellow-400 print:text-black" />
    }
  ],
  history: [
    {
      id: 1,
      company: "Intelligent Systems, Savvy IT",
      role: "Solutions Architect",
      date: "Feb 2024 – Present",
      tech: ["Python", "AWS", "Rest APIs", "SQL"],
      achievements: [
        "Designed & deployed standalone SMS notification platform automatically identifying tenants 60+ days past due.",
        "Eliminated all third-party messaging costs (reduced to $0).",
        "Led full digital launch of startup taxi service: branding, web design, and ad optimization.",
        "Defined technical architecture for internal transportation ops system (dispatch, fare tracking)."
      ]
    },
    {
      id: 2,
      company: "Ahava Services",
      role: "Technical Project Manager",
      date: "Sep 2023 – Feb 2024",
      tech: ["Azure", "Agile", "SQL", "PMO"],
      achievements: [
        "Directed 20+ member cross-functional transformation team for statewide rollout.",
        "Managed all documentation: technical procedures, user guides, and audit artifacts.",
        "Defined/monitored success metrics: conversion progress, data quality, stability.",
        "Coordinated statewide UAT execution & defect triage.",
        "Authored standardized migration playbooks & QA protocols."
      ]
    },
    {
      id: 3,
      company: "Ahava Services",
      role: "Data Integration & Modernization Lead",
      date: "Sep 2022 – Sep 2023",
      tech: ["ETL", "SSIS", "T-SQL", "Data Modeling"],
      achievements: [
        "Oversaw ETL & migration activities from legacy Access systems to modern platforms.",
        "Developed transformation documentation & advisory support for leadership.",
        "Directed optimization of SQL processes & stored procedures.",
        "Established enterprise data modeling standards & ER diagrams."
      ]
    },
    {
      id: 4,
      company: "Safe Passage Program, TPD",
      role: "TPM - Systems Design",
      date: "Jan 2022 – Jun 2022",
      tech: ["React", "Node.js", "UX/UI"],
      achievements: [
        "Architected centralized data infrastructure, consolidating fragmented legacy sources.",
        "Managed development of custom app platform with role-based interfaces.",
        "Developed UX/UI standards & SOPs improving accessibility."
      ]
    },
    {
      id: 5,
      company: "HOPE Homeless Outreach",
      role: "Program Founder / Director of Ops",
      date: "Jun 2020 – Sep 2021",
      tech: ["Strategic Ops", "Data Governance"],
      achievements: [
        "Designed & launched Colorado’s first Safe Parking Program (became national model).",
        "Authored all operational infrastructure: eligibility, workflows, compliance.",
        "Represented program in USA Today & The New Yorker."
      ]
    },
    {
      id: 6,
      company: "Conscious Action",
      role: "Full Stack Developer",
      date: "Aug 2015 – May 2020",
      tech: ["React", "Python", "SQL", "Rest APIs"],
      achievements: [
        "Designed end-to-end data/app infrastructure for small businesses.",
        "Built custom full-stack apps with secure auth & automated reporting.",
        "Integrated analytics tools to track user behavior across platforms."
      ]
    },
    {
      id: 7,
      company: "Colorado State University",
      role: "Director of Engagement",
      date: "Jun 2011 – Aug 2015",
      tech: ["Data Modeling", "Analytics"],
      achievements: [
        "Architected end-to-end publishing workflow for class schedules.",
        "Designed engagement analytics models to forecast demand."
      ]
    },
    {
      id: 8,
      company: "Colorado Dept of Education",
      role: "Solutions Architect",
      date: "Jun 2009 – May 2011",
      tech: ["T-SQL", "SSIS", "System Architecture"],
      achievements: [
        "Architected statewide Special Education End-of-Year Student Data Collection platform.",
        "Engineered data quality controls to ensure federal reporting accuracy."
      ]
    }
  ]
};

// --- HOOKS ---

const useTypewriter = (text: string, speed = 30, startDelay = 0) => {
  const [displayedText, setDisplayedText] = useState('');
  
  useEffect(() => {
    if (!text) return;
    
    if (speed === 0) {
      setDisplayedText(text);
      return;
    }

    setDisplayedText('');
    const startTimeout = setTimeout(() => {
      let index = 0;
      const intervalId = setInterval(() => {
        setDisplayedText(text.slice(0, index + 1));
        index++;
        if (index > text.length) clearInterval(intervalId);
      }, speed);
      return () => clearInterval(intervalId);
    }, startDelay);
    
    return () => clearTimeout(startTimeout);
  }, [text, speed, startDelay]);
  
  return displayedText;
};

const useKonamiCode = (onUnlock: () => void) => {
  const [input, setInput] = useState<string[]>([]);
  const code = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
  
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const key = e.key.length === 1 ? e.key.toLowerCase() : e.key;
      
      setInput(prev => {
        const newInput = [...prev, key].slice(-code.length);
        
        const isMatch = newInput.length === code.length && newInput.every((k, i) => k === code[i]);
        
        if (isMatch) {
          onUnlock();
        }
        return newInput;
      });
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onUnlock]);
};

// --- COMPONENTS ---

const IntroScreen = ({ onStart }: { onStart: () => void }) => {
  const [blinking, setBlinking] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => setBlinking(b => !b), 800);
    return () => clearInterval(interval);
  }, []);

  return (
    <div 
      onClick={onStart}
      className="fixed inset-0 z-50 bg-gray-950 flex flex-col items-center justify-center cursor-pointer font-pixel select-none print:hidden"
    >
      <div className="text-center px-4 animate-pulse">
        <h1 className="text-4xl md:text-6xl text-green-500 mb-8 text-shadow-retro leading-tight">
          RENÉE IKEMIRE
        </h1>
        <div className="text-xl md:text-2xl text-green-700 mb-12">
          SOLUTIONS ARCHITECT
        </div>
        <div className={`text-2xl text-white ${blinking ? 'opacity-100' : 'opacity-0'} transition-opacity`}>
          [ PRESS START ]
        </div>
      </div>
      <div className="absolute bottom-8 text-gray-600 font-tech text-xs md:text-sm flex flex-col items-center gap-2">
        <span>© 1985-2024 INSERT COIN TO CONTINUE</span>
        <span className="text-gray-800">↑ ↑ ↓ ↓ ← → ← → B A</span>
      </div>
    </div>
  );
};

const Scanlines = () => (
  <div className="scanlines fixed inset-0 pointer-events-none z-[9999] opacity-70 print:hidden"></div>
);

const CheatMenu = ({ 
  open, 
  onClose, 
  godMode, 
  setGodMode, 
  crtEnabled, 
  setCrtEnabled,
  instantText,
  setInstantText
}: any) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/80 backdrop-blur-sm print:hidden">
      <div className="bg-gray-900 border-4 border-yellow-500 p-6 w-full max-w-md shadow-[0_0_30px_rgba(234,179,8,0.4)] font-pixel">
        <div className="flex justify-between items-center mb-6 border-b-4 border-yellow-500/50 pb-2">
          <h2 className="text-yellow-400 text-xl">DEBUG MENU</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-white">
            <X className="w-6 h-6" />
          </button>
        </div>
        
        <div className="space-y-4 font-console text-lg">
          {/* God Mode Toggle */}
          <div className="flex items-center justify-between group cursor-pointer" onClick={() => setGodMode(!godMode)}>
            <span className={`group-hover:text-yellow-300 ${godMode ? 'text-yellow-400' : 'text-gray-400'}`}>
              &gt; GOD_MODE
            </span>
            <div className={`w-4 h-4 border ${godMode ? 'bg-yellow-400 border-yellow-400' : 'border-gray-600'}`}></div>
          </div>

          {/* CRT Filter Toggle */}
          <div className="flex items-center justify-between group cursor-pointer" onClick={() => setCrtEnabled(!crtEnabled)}>
            <span className={`group-hover:text-green-300 ${crtEnabled ? 'text-green-400' : 'text-gray-400'}`}>
              &gt; CRT_FILTER
            </span>
            <div className={`w-4 h-4 border ${crtEnabled ? 'bg-green-400 border-green-400' : 'border-gray-600'}`}></div>
          </div>

          {/* Type Speed Toggle */}
          <div className="flex items-center justify-between group cursor-pointer" onClick={() => setInstantText(!instantText)}>
            <span className={`group-hover:text-blue-300 ${instantText ? 'text-blue-400' : 'text-gray-400'}`}>
              &gt; INSTANT_TEXT
            </span>
            <div className={`w-4 h-4 border ${instantText ? 'bg-blue-400 border-blue-400' : 'border-gray-600'}`}></div>
          </div>
        </div>

        <div className="mt-8 pt-4 border-t border-gray-800 text-center text-xs text-gray-600 font-tech">
          DEV BUILD v0.9.9 // UNLOCKED VIA KONAMI
        </div>
      </div>
    </div>
  );
};

const TerminalWindow = ({ godMode }: { godMode: boolean }) => {
  const [history, setHistory] = useState<{type: 'in' | 'out', content: React.ReactNode}[]>([
    { type: 'out', content: "ARCH-OS v2.4.1 Initialized..." },
    { type: 'out', content: "Type 'help' for available commands." }
  ]);
  const [input, setInput] = useState('');
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const cmd = input.trim().toLowerCase();
    let response: React.ReactNode = '';

    switch (cmd) {
      case 'help':
        response = "COMMANDS: whoami, contact, skills, jobs, clear, cheat";
        break;
      case 'whoami':
        response = RESUME_DATA.profile.summary;
        break;
      case 'contact':
        response = `EMAIL: ${RESUME_DATA.profile.contact.email} | PHONE: ${RESUME_DATA.profile.contact.phone}`;
        break;
      case 'skills':
        response = (
          <div>
            <div className="mb-2">AVAILABLE CATEGORIES:</div>
            <ul className="grid grid-cols-1 gap-1 ml-2">
              {RESUME_DATA.skills.map(s => <li key={s.category}>- {s.category}</li>)}
            </ul>
            <div className="mt-2 text-xs opacity-70">Use search bar for full database</div>
          </div>
        );
        break;
      case 'jobs':
        response = (
          <ul className="list-none">
            {RESUME_DATA.history.map(h => <li key={h.id}>- {h.role} @ {h.company}</li>)}
          </ul>
        );
        break;
      case 'cheat':
        response = (
          <span className="text-pink-400 animate-pulse font-pixel text-xs">
            SECRET CODE: ↑ ↑ ↓ ↓ ← → ← → B A
          </span>
        );
        break;
      case 'sudo':
        response = godMode ? "ACCESS GRANTED: GOD MODE ACTIVE" : "PERMISSION DENIED. TRY KONAMI CODE.";
        break;
      case 'clear':
        setHistory([]);
        setInput('');
        return;
      default:
        response = `Unknown command: '${cmd}'. Type 'help'.`;
    }

    setHistory(prev => [...prev, { type: 'in', content: input }, { type: 'out', content: response }]);
    setInput('');
  };

  const textColor = godMode ? 'text-yellow-400' : 'text-green-400';
  const borderColor = godMode ? 'border-yellow-500' : 'border-green-500';

  return (
    <div className={`border-2 ${borderColor} bg-black p-4 font-console text-sm mb-8 shadow-[0_0_15px_rgba(0,0,0,0.5)] relative group print:hidden`}>
      <div className="absolute -top-3 left-4 bg-black px-2 font-pixel text-xs text-gray-400 flex items-center gap-2">
        <Terminal className="w-3 h-3" />
        TERMINAL_ACCESS
      </div>
      
      <div 
        className="h-48 overflow-y-auto mb-2 scrollbar-thin space-y-1"
        onClick={() => inputRef.current?.focus()}
      >
        {history.map((line, i) => (
          <div key={i} className={`${line.type === 'in' ? 'text-white' : textColor}`}>
            {line.type === 'in' && <span className="mr-2 opacity-50">&gt;</span>}
            {line.content}
          </div>
        ))}
        <div ref={bottomRef} />
      </div>

      <form onSubmit={handleCommand} className="flex items-center gap-2 border-t border-gray-800 pt-2">
        <span className={`${textColor} animate-pulse`}>&gt;</span>
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="bg-transparent border-none outline-none flex-1 text-white font-console placeholder-gray-700 uppercase"
          placeholder="ENTER COMMAND..."
          autoFocus
        />
      </form>
    </div>
  );
};

const StatBar: React.FC<{ label: string, value: number, color: string, godMode: boolean }> = ({ label, value, color, godMode }) => {
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => setWidth(godMode ? 100 : value), 500);
    return () => clearTimeout(timer);
  }, [value, godMode]);

  const barColor = godMode ? 'bg-yellow-400 shadow-[0_0_10px_rgba(250,204,21,0.6)]' : color;
  const textColor = godMode ? 'text-yellow-400' : 'text-green-400';

  return (
    <div className="mb-4 group print:mb-2">
      <div className="flex justify-between text-sm font-console mb-1">
        <span className={`tracking-wider ${textColor} transition-colors duration-500 print:text-black print:font-bold`}>{label.toUpperCase()}</span>
        <span className="text-gray-400 print:text-black">{godMode ? 100 : value}%</span>
      </div>
      <div className="h-4 bg-gray-900 border border-gray-700 relative overflow-hidden print:bg-gray-200 print:border-black print:h-2">
        <div 
          className={`h-full ${barColor} transition-all duration-1000 ease-out relative print:bg-gray-600`}
          style={{ width: `${width}%` }}
        >
          {/* Shine effect */}
          <div className="absolute top-0 right-0 bottom-0 w-1 bg-white opacity-50 print:hidden"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-white/20 to-transparent print:hidden"></div>
        </div>
        {/* Grid lines */}
        <div className="absolute inset-0 grid grid-cols-10 pointer-events-none print:hidden">
          {[...Array(10)].map((_, i) => (
            <div key={i} className="border-r border-black/30 h-full"></div>
          ))}
        </div>
      </div>
    </div>
  );
};

const BossCard: React.FC<{ boss: any, godMode: boolean }> = ({ boss, godMode }) => (
  <div className={`bg-gray-900 p-4 border-2 ${godMode ? 'border-yellow-500/50 hover:border-yellow-400' : 'border-gray-700 hover:border-green-400'} transition-colors group relative overflow-hidden print:bg-white print:border-black print:text-black print:p-2`}>
    {godMode && <div className="absolute inset-0 bg-yellow-400/5 pointer-events-none animate-pulse print:hidden"></div>}
    <div className="flex items-center gap-4 mb-3">
      <div className={`p-2 bg-black border ${godMode ? 'border-yellow-500' : 'border-gray-600'} rounded-sm print:bg-white print:border-black`}>
        {boss.icon}
      </div>
      <div>
        <h3 className={`font-pixel text-sm ${godMode ? 'text-yellow-400' : 'text-red-400'} mb-1 print:text-black print:font-bold`}>{boss.boss}</h3>
        <p className="font-tech text-xs text-gray-400 print:text-gray-600">LOC: {boss.context.toUpperCase()}</p>
      </div>
    </div>
    <div className="font-console text-sm text-gray-300 leading-relaxed border-t border-gray-800 pt-3 print:text-black print:border-gray-300">
      <span className={`${godMode ? 'text-yellow-600' : 'text-green-600'} mr-2 print:text-black print:font-bold`}>VICTORY:</span>
      {boss.victory}
    </div>
    
    {/* Corner accents */}
    <div className={`absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 ${godMode ? 'border-yellow-500' : 'border-green-500'} opacity-0 group-hover:opacity-100 transition-opacity print:hidden`}></div>
    <div className={`absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 ${godMode ? 'border-yellow-500' : 'border-green-500'} opacity-0 group-hover:opacity-100 transition-opacity print:hidden`}></div>
  </div>
);

const HistoryItem = ({ job, isActive, onClick, isFiltered, godMode }: any) => {
  const borderColor = godMode ? 'border-yellow-500' : isActive ? 'border-green-400' : 'border-gray-700';
  const titleColor = godMode ? 'text-yellow-400' : isActive ? 'text-green-400' : 'text-gray-300';
  const iconColor = godMode ? 'text-yellow-400' : isActive ? 'text-green-400' : 'text-gray-600';

  return (
    <div 
      className={`
        mb-6 transition-all duration-300
        ${isFiltered ? 'opacity-100 scale-[1.01]' : 'opacity-60 grayscale'}
        print:opacity-100 print:grayscale-0 print:mb-4
      `}
    >
      <div 
        onClick={onClick}
        className={`
          bg-gray-900 border-l-4 ${borderColor} p-4 cursor-pointer 
          hover:bg-gray-800 transition-colors relative
          print:bg-white print:border-black print:p-0 print:border-l-0 print:mb-2
        `}
      >
        <div className="flex justify-between items-start">
          <div>
            <h3 className={`font-pixel text-xs md:text-sm ${titleColor} mb-2 print:text-black print:font-bold print:text-lg`}>
              {job.role}
            </h3>
            <div className="font-tech text-sm text-purple-400 mb-1 print:text-gray-600">
              @{job.company.toUpperCase()}
            </div>
          </div>
          <div className="flex flex-col items-end">
            <span className="font-console text-xs text-gray-500 bg-black px-2 py-1 border border-gray-800 rounded print:bg-white print:text-black print:border-black">
              {job.date}
            </span>
            {isActive ? 
              <ChevronUp className={`w-5 h-5 mt-2 ${iconColor} print:hidden`} /> : 
              <ChevronDown className={`w-5 h-5 mt-2 ${iconColor} print:hidden`} />
            }
          </div>
        </div>
        
        {/* Tech Stack Mini-badges */}
        <div className="mt-2 flex flex-wrap gap-2">
          {job.tech?.map((t: string) => (
             <span key={t} className={`text-[10px] px-1 border ${godMode ? 'border-yellow-900 text-yellow-700' : 'border-gray-800 text-gray-600'} print:border-black print:text-black`}>
               {t}
             </span>
          ))}
        </div>
      </div>

      {/* Expanded Content - Always visible in print */}
      <div className={`
        bg-black border-l-4 border-dashed ${godMode ? 'border-yellow-900' : 'border-gray-800'} 
        ml-0 pl-4 pr-4 py-4 animate-in slide-in-from-top-2 duration-200
        ${isActive ? 'block' : 'hidden'} print:block
        print:bg-white print:text-black print:border-gray-300 print:pl-0 print:py-0
      `}>
        <ul className="space-y-3 print:space-y-1">
          {job.achievements.map((achievement: string, i: number) => (
            <li key={i} className="flex items-start gap-3 font-console text-sm md:text-base text-gray-300 print:text-black">
              <span className={`${godMode ? 'text-yellow-500' : 'text-green-500'} mt-1 print:text-black`}>➤</span>
              <span>{achievement}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

const CheatNotification = () => (
  <div className="fixed inset-0 pointer-events-none z-[100] flex items-center justify-center overflow-hidden print:hidden">
    {/* Flashing Text */}
    <div className="animate-bounce">
      <h1 className="font-pixel text-6xl md:text-9xl text-yellow-400 text-center drop-shadow-[0_0_15px_rgba(250,204,21,0.8)] animate-pulse">
        1-UP!
      </h1>
      <p className="text-center font-pixel text-xl text-white mt-4 bg-black p-2">
        GOD MODE ENABLED
      </p>
    </div>
    
    {/* Confetti/Particles effect simulated with CSS */}
    <div className="absolute inset-0 bg-yellow-500/10 mix-blend-overlay animate-pulse"></div>
  </div>
);

// --- MAIN APP ---

const App = () => {
  const [started, setStarted] = useState(false);
  const [activeJobId, setActiveJobId] = useState<number | null>(1);
  const [filterTech, setFilterTech] = useState<string | null>(null);
  const [skillSearch, setSkillSearch] = useState('');
  const [hoveredSkill, setHoveredSkill] = useState<any | null>(null);
  
  // Cheat / Settings State
  const [godMode, setGodMode] = useState(false);
  const [showCheatMenu, setShowCheatMenu] = useState(false);
  const [crtEnabled, setCrtEnabled] = useState(true);
  const [instantText, setInstantText] = useState(false);
  const [showCheatNotif, setShowCheatNotif] = useState(false);

  const typedSummary = useTypewriter(
    started ? RESUME_DATA.profile.summary : '', 
    instantText ? 0 : 15, 
    500
  );

  // Unlock God Mode & Menu via Konami
  useKonamiCode(() => {
    if (!showCheatMenu) {
      setGodMode(true);
      setShowCheatMenu(true);
      setShowCheatNotif(true);
      setTimeout(() => setShowCheatNotif(false), 3000);
    }
  });

  const handleTechClick = (tech: string) => {
    if (filterTech === tech) {
      setFilterTech(null);
    } else {
      setFilterTech(tech);
      // Auto expand first match
      const match = RESUME_DATA.history.find(h => h.tech?.includes(tech));
      if (match) setActiveJobId(match.id);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  if (!started) {
    return (
      <>
        {crtEnabled && <Scanlines />}
        <IntroScreen onStart={() => setStarted(true)} />
      </>
    );
  }

  const themeColor = godMode ? 'text-yellow-400' : 'text-green-400';
  const borderColor = godMode ? 'border-yellow-500' : 'border-green-500';

  return (
    <div className={`min-h-screen pb-20 selection:bg-green-900 selection:text-white ${godMode ? 'selection:bg-yellow-900' : ''} print:pb-0 print:bg-white print:text-black`}>
      
      {crtEnabled && <Scanlines />}
      {showCheatNotif && <CheatNotification />}
      <CheatMenu 
        open={showCheatMenu} 
        onClose={() => setShowCheatMenu(false)}
        godMode={godMode}
        setGodMode={setGodMode}
        crtEnabled={crtEnabled}
        setCrtEnabled={setCrtEnabled}
        instantText={instantText}
        setInstantText={setInstantText}
      />

      {/* Top Nav / Status Bar */}
      <header className="bg-black border-b border-gray-800 sticky top-0 z-40 bg-opacity-90 backdrop-blur-sm print:hidden">
        <div className="max-w-5xl mx-auto px-4 h-14 flex items-center justify-between font-tech">
          <div className="flex items-center gap-2">
            <Gamepad2 className={`w-5 h-5 ${themeColor}`} />
            <span className="text-white tracking-widest">PLAYER 1</span>
          </div>
          <div className="flex items-center gap-4 text-xs md:text-sm">
             <button 
               onClick={handlePrint}
               className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors border border-gray-700 px-2 py-1 rounded hover:bg-gray-800"
               title="Print Clean Resume"
             >
              <Printer className="w-4 h-4" />
              <span className="hidden sm:inline">PRINT RESUME</span>
            </button>
            <div className="hidden md:flex items-center gap-2 text-gray-400">
              <Activity className="w-4 h-4" />
              <span>SYSTEM: ONLINE</span>
            </div>
            <div className={`flex items-center gap-2 ${themeColor}`}>
              <Trophy className="w-4 h-4" />
              <span>LVL {new Date().getFullYear() - 2009}</span>
            </div>
            {godMode && (
               <button 
                 onClick={() => setShowCheatMenu(true)}
                 className="text-yellow-500 font-bold animate-pulse border border-yellow-500 px-2 rounded flex items-center gap-1 hover:bg-yellow-900/50"
               >
                 <Settings className="w-3 h-3" /> GOD MODE
               </button>
            )}
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-8 md:py-12 print:py-4 print:max-w-none">
        
        {/* Hero Section */}
        <div className={`border-2 ${borderColor} bg-gray-900/50 p-6 md:p-8 mb-12 relative overflow-hidden print:bg-white print:border-none print:p-0 print:mb-6`}>
          <div className="absolute top-0 left-0 bg-green-500 w-16 h-16 -translate-x-8 -translate-y-8 rotate-45 opacity-20 print:hidden"></div>
          <div className="relative z-10">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 print:mb-2">
              <div>
                <h1 className={`font-pixel text-2xl md:text-4xl ${themeColor} mb-2 text-shadow-neon print:text-black print:text-3xl print:font-bold`}>
                  {RESUME_DATA.profile.name}
                </h1>
                <h2 className="font-tech text-xl text-gray-300 tracking-widest print:text-gray-800">
                  {RESUME_DATA.profile.role}
                </h2>
              </div>
              <div className="mt-4 md:mt-0 flex gap-4 print:hidden">
                <a href={`mailto:${RESUME_DATA.profile.contact.email}`} className="bg-gray-800 p-2 hover:bg-gray-700 rounded transition-colors">
                   <Share2 className={`w-5 h-5 ${themeColor}`} />
                </a>
                <a href="#" className="bg-gray-800 p-2 hover:bg-gray-700 rounded transition-colors">
                   <Save className={`w-5 h-5 ${themeColor}`} />
                </a>
              </div>
            </div>
            
            <div className="font-console text-lg text-gray-300 leading-relaxed min-h-[80px] print:text-black print:min-h-0">
              <span className={`${themeColor} animate-pulse print:hidden`}>_</span> {RESUME_DATA.profile.summary}
            </div>

            <div className="mt-6 flex flex-wrap gap-4 font-tech text-sm text-gray-400 border-t border-gray-800 pt-4 print:text-black print:border-gray-300 print:mt-2 print:pt-2">
              <span>PHONE: {RESUME_DATA.profile.contact.phone}</span>
              <span className="print:text-gray-400">//</span>
              <span>EMAIL: {RESUME_DATA.profile.contact.email}</span>
              <span className="print:text-gray-400">//</span>
              <span>WEB: {RESUME_DATA.profile.contact.web}</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 print:gap-6">
          
          {/* Left Column: Stats & Loadout */}
          <div className="space-y-8 print:space-y-6">
            
            {/* Interactive Terminal */}
            <TerminalWindow godMode={godMode} />

            {/* Character Stats */}
            <section className="break-inside-avoid">
              <h3 className={`font-pixel text-lg ${themeColor} mb-6 flex items-center gap-3 print:text-black print:font-bold print:mb-3`}>
                <Activity className="w-5 h-5 print:hidden" /> STATS
              </h3>
              <div className="bg-black p-4 border border-gray-800 rounded shadow-lg print:bg-white print:border-none print:shadow-none print:p-0">
                {RESUME_DATA.stats.map(stat => (
                  <StatBar key={stat.label} {...stat} godMode={godMode} />
                ))}
              </div>
            </section>

            {/* Tech Loadout - Revised */}
            <section className="break-inside-avoid relative">
              <h3 className={`font-pixel text-lg ${themeColor} mb-4 flex items-center gap-3 print:text-black print:font-bold print:mb-3`}>
                <Cpu className="w-5 h-5 print:hidden" /> TECH LOADOUT
              </h3>
              
              {/* Skill Info Hover Panel - Absolute Positioned */}
              <div className={`
                absolute top-0 right-0 z-20 w-48 pointer-events-none transition-opacity duration-200 print:hidden
                ${hoveredSkill ? 'opacity-100' : 'opacity-0'}
              `}>
                 <div className={`bg-black border-2 ${borderColor} p-3 shadow-[0_0_20px_rgba(0,0,0,0.8)]`}>
                    <div className={`font-pixel text-xs ${themeColor} mb-1 border-b border-gray-800 pb-1`}>
                      ITEM INFO
                    </div>
                    {hoveredSkill && (
                      <div className="space-y-1 font-tech text-xs text-gray-300">
                        <div className="text-white font-bold">{hoveredSkill.name}</div>
                        <div className="flex justify-between"><span>EXP:</span> <span className="text-white">{hoveredSkill.exp} YRS</span></div>
                        <div className="flex justify-between"><span>LVL:</span> <span className={godMode ? "text-yellow-400" : "text-green-400"}>{hoveredSkill.proficiency}</span></div>
                        <div className="flex justify-between"><span>STS:</span> <span>{hoveredSkill.recency}</span></div>
                      </div>
                    )}
                 </div>
              </div>

              {/* Search Filter */}
              <div className="relative mb-4 group print:hidden">
                <input 
                  type="text" 
                  placeholder="SEARCH DATABASE..."
                  value={skillSearch}
                  onChange={(e) => setSkillSearch(e.target.value)}
                  className="w-full bg-gray-900 border border-gray-700 p-2 pl-8 text-sm font-tech text-white focus:border-green-500 outline-none transition-colors uppercase placeholder-gray-600"
                />
                <Search className="absolute left-2 top-2.5 w-4 h-4 text-gray-500" />
              </div>

              {/* Skill Grid */}
              <div className="space-y-6">
                {RESUME_DATA.skills.map((categoryGroup, idx) => {
                  // Filter items if search is active
                  const items = skillSearch 
                    ? categoryGroup.items.filter(i => i.name.toLowerCase().includes(skillSearch.toLowerCase()))
                    : categoryGroup.items;

                  if (items.length === 0) return null;

                  return (
                    <div key={idx} className="print:break-inside-avoid">
                      <h4 className="font-tech text-xs text-gray-500 mb-2 uppercase tracking-wider border-b border-gray-800 pb-1 print:text-gray-800 print:border-gray-300 print:font-bold">
                        {categoryGroup.category}
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {items.map(skill => (
                          <button
                            key={skill.name}
                            onClick={() => handleTechClick(skill.name)}
                            onMouseEnter={() => setHoveredSkill(skill)}
                            onMouseLeave={() => setHoveredSkill(null)}
                            className={`
                              font-tech text-xs px-2 py-1 border transition-all duration-200 text-left
                              ${filterTech === skill.name
                                ? `bg-${godMode ? 'yellow' : 'green'}-900 border-${godMode ? 'yellow' : 'green'}-400 text-white` 
                                : `border-gray-800 text-gray-400 hover:border-${godMode ? 'yellow' : 'green'}-400 hover:text-${godMode ? 'yellow' : 'green'}-400 bg-black`
                              }
                              print:bg-white print:text-black print:border-gray-300 print:px-0 print:py-0 print:mr-2 print:border-none
                            `}
                          >
                            {skill.name}
                            <span className="hidden print:inline">,</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
              
              {filterTech && (
                <div className="mt-4 text-xs text-gray-500 font-console cursor-pointer hover:text-white text-center border border-dashed border-gray-800 p-1 print:hidden" onClick={() => setFilterTech(null)}>
                  [ SYSTEM: CLEAR ACTIVE FILTERS ]
                </div>
              )}
            </section>

            {/* Ultimate Abilities */}
            <section className="break-inside-avoid">
              <h3 className={`font-pixel text-lg ${themeColor} mb-6 flex items-center gap-3 print:text-black print:font-bold print:mb-3`}>
                <Zap className="w-5 h-5 print:hidden" /> ULTIMATES
              </h3>
              <div className="space-y-4">
                {RESUME_DATA.ultimateAbilities.map(ability => (
                  <div key={ability.name} className={`border-l-2 ${godMode ? 'border-yellow-600' : 'border-purple-500'} pl-4 print:border-black`}>
                    <div className="font-pixel text-xs text-gray-300 mb-1 print:text-black print:font-bold">{ability.name}</div>
                    <div className="font-console text-sm text-gray-500 print:text-gray-700">{ability.desc}</div>
                  </div>
                ))}
              </div>
            </section>

          </div>

          {/* Right Column: History & Bosses */}
          <div className="lg:col-span-2 space-y-12 print:space-y-6">

            {/* Level Progression */}
            <section>
              <div className="flex items-center justify-between mb-8 print:mb-4">
                 <h3 className={`font-pixel text-lg ${themeColor} flex items-center gap-3 print:text-black print:font-bold`}>
                  <Sword className="w-5 h-5 print:hidden" /> LEVEL PROGRESSION
                </h3>
                {filterTech && (
                   <div className="px-3 py-1 bg-gray-800 text-xs font-tech text-green-400 border border-green-900 animate-pulse print:hidden">
                     FILTER: {filterTech}
                   </div>
                )}
              </div>
              
              <div className="relative">
                {/* Connecting Line */}
                <div className="absolute left-8 top-4 bottom-4 w-0.5 bg-gray-800 hidden md:block print:hidden"></div>
                
                <div className="space-y-2">
                  {RESUME_DATA.history.map((job) => {
                    // If filter is active, check if job matches
                    const isRelevant = !filterTech || job.tech?.includes(filterTech);
                    
                    return (
                      <HistoryItem 
                        key={job.id}
                        job={job} 
                        isActive={activeJobId === job.id}
                        onClick={() => setActiveJobId(activeJobId === job.id ? null : job.id)}
                        isFiltered={isRelevant}
                        godMode={godMode}
                      />
                    );
                  })}
                </div>
              </div>
            </section>

            {/* Boss Fights */}
            <section className="break-inside-avoid">
              <h3 className={`font-pixel text-lg ${themeColor} mb-8 flex items-center gap-3 print:text-black print:font-bold print:mb-4`}>
                <Skull className="w-5 h-5 print:hidden" /> BOSS FIGHTS
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {RESUME_DATA.bossFights.map((boss, idx) => (
                  <BossCard key={idx} boss={boss} godMode={godMode} />
                ))}
              </div>
            </section>

          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-800 bg-black py-8 mt-12 print:hidden">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <div className={`font-pixel text-xl ${themeColor} mb-4 animate-bounce`}>GAME OVER</div>
          <div className="font-console text-gray-500 space-x-4">
            <a href="#" className="hover:text-white transition-colors">[ RESTART ]</a>
            <a href="#" className="hover:text-white transition-colors">[ CREDITS ]</a>
            <a href="#" className="hover:text-white transition-colors">[ HIGH SCORES ]</a>
          </div>
          <div className="mt-8 font-tech text-xs text-gray-700">
            SYSTEM ID: 217-986-0863_IKEMIRE // END OF LINE
          </div>
        </div>
      </footer>
      
    </div>
  );
};

const container = document.getElementById('root');
if (container) {
  const root = createRoot(container);
  root.render(<App />);
}