'use client';

import { useTranslations } from 'next-intl';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { 
  Github, 
  Linkedin, 
  Mail, 
  Download, 
  Code2, 
  Zap, 
  Rocket,
  Brain,
  ArrowRight,
  Sparkles,
  Cpu,
  Database,
  Cloud,
  Bot,
  ExternalLink,
  Menu,
  X
} from 'lucide-react';
import LanguageSwitcher from './components/LanguageSwitcher';
import Chatbot from './components/Chatbot';

export default function Home() {
  const t = useTranslations();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { scrollY } = useScroll();

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const backgroundY = useTransform(scrollY, [0, 500], ['0%', '50%']);

  const skills = [
    // Frontend
    { name: 'TypeScript', icon: '⚡', color: 'from-blue-500 to-blue-600' },
    { name: 'JavaScript', icon: '📜', color: 'from-yellow-500 to-yellow-600' },
    { name: 'React', icon: '⚛️', color: 'from-cyan-500 to-cyan-600' },
    { name: 'Next.js', icon: '▲', color: 'from-gray-100 to-gray-300' },
    { name: 'Tailwind CSS', icon: '🎨', color: 'from-teal-500 to-cyan-500' },
    { name: 'React Query', icon: '🔄', color: 'from-purple-500 to-pink-500' },
    { name: 'Vue.js', icon: '💚', color: 'from-green-400 to-green-500' },
    { name: 'Nuxt.js', icon: '🟢', color: 'from-green-600 to-green-700' },
    // Backend
    { name: 'Node.js', icon: '🟢', color: 'from-green-500 to-green-600' },
    { name: 'Nest.js', icon: '🐈', color: 'from-red-600 to-red-700' },
    { name: 'Express', icon: '🚂', color: 'from-gray-600 to-gray-700' },
    { name: 'Firebase', icon: '🔥', color: 'from-orange-500 to-yellow-500' },
    { name: 'Firebase Functions', icon: '⚡', color: 'from-orange-600 to-orange-700' },
    // Database
    { name: 'PostgreSQL', icon: '🐘', color: 'from-blue-700 to-blue-800' },
    { name: 'MongoDB', icon: '🍃', color: 'from-green-700 to-green-800' },
    // AI/ML & APIs
    { name: 'Python', icon: '🐍', color: 'from-yellow-500 to-yellow-600' },
    { name: 'FastAPI', icon: '🚀', color: 'from-green-500 to-teal-500' },
    { name: 'Google Vertex AI', icon: '🧠', color: 'from-blue-600 to-indigo-600' },
    { name: 'RAG', icon: '📚', color: 'from-purple-600 to-violet-600' },
  ];

  const experience = [
    {
      role: 'Full Stack Developer',
      company: 'VIA UNiFi Information Technology',
      duration: 'Sep 2025 - Oct 2025',
      location: 'Dubai, UAE',
      highlights: ['ERP System', 'Reactjs & Node.js', 'Laravel']
    },
    {
      role: 'Full Stack Developer',
      company: 'Antidots - Positive Technologies',
      duration: 'Sep 2022 - Aug 2025',
      location: 'Aix-les-Bains, France',
      highlights: ['Vue.js, Nuxt.js, Nest.js', 'MongoDB & RESTful APIs', 'RESTful & SOAP API integrations']
    },
    {
      role: 'Software Engineer ',
      company: 'Lannion-Trégor Communauté',
      duration: 'Sep 2019 - Aug 2022',
      location: 'Lannion, France',
      highlights: ['Node.js & Express APIs', 'MySQL databases', 'PHPUnit & Cypress testing']
    },
  ];

  const projects = [
    {
      name: 'AI Chatbot Assistant',
      description: 'Modern AI chatbot with real-time streaming, weather integration, and message editing. Built for KS LAB technical test with Google Gemini Pro.',
      tech: ['Next.js', 'TypeScript', 'React', 'Tailwind CSS', 'Google Gemini', 'Streaming'],
      githubLink: 'https://github.com/ialnezami/KS',
      liveLink: 'https://ks-pink.vercel.app'
    },
    {
      name: 'Catalogue E-commerce',
      description: 'Modern e-commerce product catalog platform with elegant design. Full-stack application showcasing contemporary product management.',
      tech: ['Next.js', 'TypeScript', 'React', 'Tailwind CSS', 'E-commerce'],
      githubLink: 'https://github.com/ialnezami/catalogue',
      liveLink: 'https://catalogue-blue.vercel.app'
    },
    {
      name: 'Flutter POS System',
      description: 'An open-source Flutter POS system designed for small restaurants and businesses. Complete Point of Sale solution with modern UI.',
      tech: ['Flutter', 'Dart', 'Mobile', 'POS'],
      link: 'https://github.com/ialnezami/flutter-pos-system'
    },
    {
      name: 'RAG Application',
      description: 'Retrieval-Augmented Generation system with vector databases. AI-powered application for accurate, context-aware responses.',
      tech: ['Python', 'RAG', 'Vector DB', 'AI/ML'],
      link: 'https://github.com/ialnezami/app-RAG'
    },
    {
      name: 'React POS System',
      description: 'Modern Point of Sale system built with React, TypeScript, and Node.js. Full-featured restaurant and retail management.',
      tech: ['React', 'TypeScript', 'Node.js', 'POS'],
      link: 'https://github.com/ialnezami/POS-REACTJS'
    },
    {
      name: 'E-commerce API',
      description: 'Full-featured e-commerce backend API built with TypeScript. Complete RESTful API with authentication, products, and orders.',
      tech: ['TypeScript', 'Node.js', 'REST API', 'E-commerce'],
      link: 'https://github.com/ialnezami/e-commerce-api'
    },
    {
      name: 'LinkedIn AI Agent',
      description: 'AI-powered LinkedIn agent built with Python. Automated LinkedIn interactions and intelligent responses.',
      tech: ['Python', 'AI Agent', 'LLM', 'Automation'],
      link: 'https://github.com/ialnezami/Linkedin-agent-ai'
    },
    {
      name: 'WikiBot',
      description: 'Intelligent Wikipedia chatbot with AI capabilities. Interactive bot for information retrieval and query responses.',
      tech: ['AI Bot', 'NLP', 'Chatbot', 'Wikipedia'],
      link: 'https://github.com/ialnezami/WikiBot'
    },
    {
      name: 'Shop Inventory',
      description: 'Complete inventory management system built with TypeScript. Track products, sales, and stock levels.',
      tech: ['TypeScript', 'Node.js', 'Inventory', 'Backend'],
      link: 'https://github.com/ialnezami/shopInventory'
    },
    {
      name: 'Docker CLI Tool',
      description: 'Modern Docker management CLI tool built with Go. Simplified Docker container and image management.',
      tech: ['Go', 'Docker', 'CLI', 'DevOps'],
      link: 'https://github.com/ialnezami/docker-cli-tool'
    },
    {
      name: 'LeadGen360',
      description: 'AI-powered lead generation platform. Automated lead capture and management system with intelligent processing.',
      tech: ['Python', 'AI', 'Lead Generation', 'Automation'],
      link: 'https://github.com/ialnezami/LeadGen360'
    },
    {
      name: 'File Organizer',
      description: 'Smart file organization tool built with Go. Automatically categorizes and organizes files by type and content.',
      tech: ['Go', 'CLI', 'File Management', 'Automation'],
      link: 'https://github.com/ialnezami/file-organizer'
    },
    {
      name: 'Barber App API',
      description: 'Professional appointment booking API for barber shops and salons. Complete backend with scheduling and customer management.',
      tech: ['TypeScript', 'Node.js', 'Booking', 'API'],
      link: 'https://github.com/ialnezami/barber-app-api'
    },
    {
      name: 'Contract Generator Pro',
      description: 'AI-powered contract generation system. Automatically creates professional contracts based on templates and requirements.',
      tech: ['PHP', 'AI', 'Contracts', 'Automation'],
      link: 'https://github.com/ialnezami/Contract-Generator-Pro'
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-purple-950/20 to-black text-white overflow-hidden">
      {/* Animated background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <motion.div 
          style={{ y: backgroundY }}
          className="absolute inset-0 bg-gradient-to-r from-purple-900/20 via-pink-900/20 to-blue-900/20"
        />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(147,51,234,0.15),transparent_70%)]" />
      </div>

      {/* Cursor follower */}
      <motion.div
        className="fixed w-96 h-96 rounded-full bg-gradient-to-r from-purple-500/20 to-pink-500/20 blur-3xl pointer-events-none z-0"
        animate={{
          x: mousePosition.x - 192,
          y: mousePosition.y - 192,
        }}
        transition={{ type: 'spring', stiffness: 50, damping: 20 }}
      />

      {/* Main content */}
      <div className="relative z-10">
        {/* Navigation */}
        <motion.nav 
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="fixed top-0 left-0 right-0 z-50 glass border-b border-white/10"
        >
          <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
            <motion.div 
              className="text-2xl font-bold text-gradient"
              whileHover={{ scale: 1.1 }}
            >
              IA
            </motion.div>
            
            {/* Desktop Menu */}
            <div className="hidden md:flex gap-8 items-center">
              {[
                t('nav.about'),
                t('nav.experience'),
                t('nav.projects'),
                t('nav.skills'),
                t('nav.contact')
              ].map((item) => (
                <motion.a
                  key={item}
                  href={`#${item.toLowerCase().replace(/\s+/g, '-')}`}
                  className="hover:text-purple-400 transition-colors"
                  whileHover={{ scale: 1.1 }}
                >
                  {item}
                </motion.a>
              ))}
              <LanguageSwitcher />
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center gap-3">
              <LanguageSwitcher />
              <motion.button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="w-10 h-10 rounded-lg glass hover:bg-white/10 active:bg-white/20 flex items-center justify-center transition-colors touch-manipulation"
                whileTap={{ scale: 0.95 }}
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? (
                  <X className="w-6 h-6 text-white" />
                ) : (
                  <Menu className="w-6 h-6 text-white" />
                )}
              </motion.button>
            </div>
          </div>

          {/* Mobile Menu */}
          <AnimatePresence>
            {mobileMenuOpen && (
              <>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[45] md:hidden"
                  onClick={() => setMobileMenuOpen(false)}
                />
                <motion.div
                  initial={{ x: '100%' }}
                  animate={{ x: 0 }}
                  exit={{ x: '100%' }}
                  transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                  className="fixed top-0 right-0 h-full w-80 max-w-[85vw] glass border-l border-white/10 z-[55] md:hidden overflow-y-auto"
                >
                  <div className="p-6">
                    <div className="flex justify-between items-center mb-8">
                      <h2 className="text-2xl font-bold text-gradient">Menu</h2>
                      <motion.button
                        onClick={() => setMobileMenuOpen(false)}
                        className="w-10 h-10 rounded-lg hover:bg-white/10 flex items-center justify-center"
                        whileTap={{ scale: 0.95 }}
                      >
                        <X className="w-6 h-6 text-white" />
                      </motion.button>
                    </div>
                    <nav className="flex flex-col gap-4">
                      {[
                        t('nav.about'),
                        t('nav.experience'),
                        t('nav.projects'),
                        t('nav.skills'),
                        t('nav.contact')
                      ].map((item, index) => (
                        <motion.a
                          key={item}
                          href={`#${item.toLowerCase().replace(/\s+/g, '-')}`}
                          onClick={() => setMobileMenuOpen(false)}
                          className="px-4 py-3 rounded-lg hover:bg-white/10 active:bg-white/20 transition-colors text-lg touch-manipulation"
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                        >
                          {item}
                        </motion.a>
                      ))}
                    </nav>
                  </div>
                </motion.div>
              </>
            )}
          </AnimatePresence>
        </motion.nav>

        {/* Hero Section */}
        <section className="min-h-screen flex items-center justify-center px-6 pt-20">
          <div className="max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              {/* Profile Photo */}
              <div className="flex justify-center mb-8">
                <motion.div
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.3, type: 'spring', stiffness: 200 }}
                  className="relative"
                >
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600 rounded-full blur-xl opacity-50 animate-pulse"
                    animate={{
                      scale: [1, 1.1, 1],
                      opacity: [0.5, 0.3, 0.5],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: 'easeInOut',
                    }}
                  />
                  <div className="relative w-48 h-48 md:w-64 md:h-64 rounded-full overflow-hidden border-4 border-white/20 ring-4 ring-purple-500/30">
                    <Image
                      src="/img/me/1760102538240.jpeg"
                      alt="Ibrahim Alnezami"
                      width={256}
                      height={256}
                      className="w-full h-full object-cover"
                      priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-br from-purple-600/20 via-pink-600/10 to-blue-600/20 mix-blend-overlay" />
                  </div>
                </motion.div>
              </div>

              <div className="text-center">
              <motion.span
                className="inline-block mb-4 px-4 py-2 rounded-full glass text-sm font-medium text-purple-300"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.4, type: 'spring' }}
              >
                {t('hero.badge')}
              </motion.span>

              <h1 className="text-6xl md:text-8xl font-bold mb-6">
                <span className="text-gradient">{t('hero.name')}</span>
              </h1>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="text-2xl md:text-3xl text-gray-300 mb-8"
              >
                {t('hero.title')}
              </motion.p>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="text-lg text-gray-400 max-w-2xl mx-auto mb-12"
              >
                {t('hero.subtitle')}
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                className="flex flex-wrap gap-4 justify-center mb-16"
              >
                <motion.a
                  href="#contact"
                  className="px-8 py-4 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold hover:from-purple-700 hover:to-pink-700 hover-lift glow flex items-center gap-2"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {t('hero.getInTouch')} <ArrowRight className="w-5 h-5" />
                </motion.a>
                <motion.a
                  href="/cv.pdf"
                  download="Ibrahim-Alnezami-Resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-8 py-4 rounded-full glass text-white font-semibold hover:bg-white/10 hover-lift flex items-center gap-2"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Download className="w-5 h-5" /> {t('hero.downloadResume')}
                </motion.a>
              </motion.div>

              {/* Social Links */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
                className="flex gap-6 justify-center"
              >
                {[
                  { icon: Github, href: 'https://github.com/ialnezami', label: 'GitHub' },
                  { icon: Linkedin, href: 'https://linkedin.com/in/ialnezami', label: 'LinkedIn' },
                  { icon: Mail, href: 'mailto:ibrahim.alnezami@gmail.com', label: 'Email' },
                ].map(({ icon: Icon, href, label }) => (
                  <motion.a
                    key={label}
                    href={href}
                    className="w-12 h-12 rounded-full glass flex items-center justify-center hover:bg-white/10 hover-lift"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    whileTap={{ scale: 0.9 }}
                    aria-label={label}
                  >
                    <Icon className="w-5 h-5" />
                  </motion.a>
                ))}
              </motion.div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="py-32 px-6 relative">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-5xl font-bold mb-4 text-center">
                {t('about.title')}
              </h2>
              <p className="text-xl text-gray-400 text-center mb-16 max-w-3xl mx-auto">
                {t('about.subtitle')}
              </p>

              <div className="grid md:grid-cols-3 gap-8">
                {[
                  {
                    icon: Zap,
                    title: t('about.speedTitle'),
                    description: t('about.speedDesc'),
                    color: 'from-yellow-500 to-orange-500',
                  },
                  {
                    icon: Brain,
                    title: t('about.learningTitle'),
                    description: t('about.learningDesc'),
                    color: 'from-purple-500 to-pink-500',
                  },
                  {
                    icon: Rocket,
                    title: t('about.shipTitle'),
                    description: t('about.shipDesc'),
                    color: 'from-blue-500 to-cyan-500',
                  },
                ].map(({ icon: Icon, title, description, color }, i) => (
                  <motion.div
                    key={title}
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.2 }}
                    className="glass rounded-2xl p-8 hover-lift group"
                  >
                    <div className={`w-14 h-14 rounded-xl bg-gradient-to-r ${color} flex items-center justify-center mb-6`}>
                      <Icon className="w-7 h-7 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold mb-3">{title}</h3>
                    <p className="text-gray-400">{description}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Experience Section */}
        <section id="experience" className="py-32 px-6 bg-white/5 backdrop-blur-sm">
          <div className="max-w-6xl mx-auto">
            <motion.h2
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-5xl font-bold mb-16 text-center"
            >
              {t('experience.title')}
            </motion.h2>

            <div className="space-y-8">
              {experience.map((exp, i) => (
                <motion.div
                  key={`${exp.company}-${i}`}
                  initial={{ opacity: 0, x: i % 2 === 0 ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.2 }}
                  className="glass rounded-2xl p-8 hover-lift"
                >
                  <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-4">
                    <div>
                      <h3 className="text-2xl font-bold mb-1">{exp.role}</h3>
                      <p className="text-xl text-purple-400">{exp.company}</p>
                    </div>
                    <div className="text-gray-400 mt-2 md:mt-0">
                      <p>{exp.duration}</p>
                      <p>{exp.location}</p>
                    </div>
                  </div>
                  <ul className="list-disc list-inside space-y-2 text-gray-300">
                    {exp.highlights.map((highlight, j) => (
                      <li key={j}>{highlight}</li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Skills Section */}
        <section id="skills" className="py-32 px-6">
          <div className="max-w-6xl mx-auto">
            <motion.h2
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-5xl font-bold mb-16 text-center"
            >
              {t('skills.title')}
            </motion.h2>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {skills.map((skill, i) => (
                <motion.div
                  key={skill.name}
                  initial={{ opacity: 0, scale: 0.5 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  whileHover={{ scale: 1.05, y: -5 }}
                  className="glass rounded-xl p-6 text-center hover-lift cursor-pointer"
                >
                  <div className="text-4xl mb-3">{skill.icon}</div>
                  <h3 className="font-semibold">{skill.name}</h3>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" className="py-32 px-6 bg-white/5 backdrop-blur-sm">
          <div className="max-w-6xl mx-auto">
            <motion.h2
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-5xl font-bold mb-16 text-center"
            >
              {t('projects.title')}
            </motion.h2>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {projects.map((project, i) => (
                <motion.div
                  key={`project-${i}-${project.name}`}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.2 }}
                  className="glass rounded-2xl p-8 hover-lift group"
                >
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-2xl font-bold">{project.name}</h3>
                    <Code2 className="w-6 h-6 text-purple-400" />
                  </div>
                  <p className="text-gray-400 mb-6">{project.description}</p>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.tech.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 rounded-full bg-purple-900/30 text-purple-300 text-sm"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  <div className="flex gap-4 flex-wrap">
                    {project.liveLink && (
                      <motion.a
                        href={project.liveLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-purple-400 hover:text-purple-300 transition-colors"
                        whileHover={{ x: 5 }}
                      >
                        <ExternalLink className="w-4 h-4" /> Live Demo
                      </motion.a>
                    )}
                    {project.githubLink && (
                      <motion.a
                        href={project.githubLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-purple-400 hover:text-purple-300 transition-colors"
                        whileHover={{ x: 5 }}
                      >
                        <Github className="w-4 h-4" /> GitHub
                      </motion.a>
                    )}
                    {project.link && !project.liveLink && !project.githubLink && (
                  <motion.a
                    href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-purple-400 hover:text-purple-300 transition-colors"
                    whileHover={{ x: 5 }}
                  >
                    View Project <ArrowRight className="w-4 h-4" />
                  </motion.a>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-32 px-6">
          <div className="max-w-4xl mx-auto text-center">
            <motion.h2
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-5xl font-bold mb-8"
            >
              {t('contact.title')}
            </motion.h2>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-xl text-gray-400 mb-8"
            >
              {t('contact.subtitle')}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="flex flex-col gap-6 justify-center items-center mb-8"
            >
              <motion.a
                href="https://zeeg.me/ibrahimalnezami/30min"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative overflow-hidden px-16 py-5 rounded-2xl bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600 text-white text-xl font-bold hover-lift glow flex items-center gap-3 shadow-2xl shadow-purple-500/50 transition-all duration-300"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Sparkles className="w-6 h-6 relative z-10 animate-pulse" />
                <span className="relative z-10">{t('contact.scheduleMeeting')}</span>
                <ArrowRight className="w-6 h-6 relative z-10 group-hover:translate-x-1 transition-transform" />
                <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
              </motion.a>
              
              <motion.a
                href="mailto:ibrahim.alnezami@gmail.com"
                className="px-12 py-4 rounded-full glass text-white text-lg font-semibold hover:bg-white/10 hover-lift flex items-center gap-2 border border-white/20"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                📧 {t('contact.emailMe')}
              </motion.a>
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6 }}
              className="text-sm text-gray-500"
            >
              👋 {t('contact.bookingNote')}
            </motion.p>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-12 px-6 border-t border-white/10">
          <div className="max-w-6xl mx-auto text-center text-gray-400">
            <p>{t('footer.copyright')}</p>
          </div>
        </footer>

        {/* Chatbot */}
        <Chatbot />
      </div>
    </div>
  );
}
