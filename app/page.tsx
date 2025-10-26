'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useState, useEffect } from 'react';
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
  Sparkles
} from 'lucide-react';

export default function Home() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const { scrollY } = useScroll();

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const backgroundY = useTransform(scrollY, [0, 500], ['0%', '50%']);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  const skills = [
    { name: 'TypeScript', icon: '⚡', color: 'from-blue-500 to-blue-600' },
    { name: 'React', icon: '⚛️', color: 'from-cyan-500 to-cyan-600' },
    { name: 'Next.js', icon: '▲', color: 'from-gray-100 to-gray-300' },
    { name: 'Node.js', icon: '🟢', color: 'from-green-500 to-green-600' },
    { name: 'Python', icon: '🐍', color: 'from-yellow-500 to-yellow-600' },
    { name: 'PostgreSQL', icon: '🐘', color: 'from-blue-700 to-blue-800' },
  ];

  const experience = [
    {
      role: 'Full Stack Developer (AI-First)',
      company: 'VIA UNiFi Information Technology',
      duration: 'Sep 2025 - Oct 2025',
      location: 'Dubai, UAE',
      highlights: ['AI-integrated SaaS applications', 'Next.js & Node.js', 'Scalable APIs']
    },
    {
      role: 'Full Stack Developer',
      company: 'Antidots - Positive Technologies',
      duration: 'Sep 2022 - Aug 2025',
      location: 'Aix-les-Bains, France',
      highlights: ['Vue.js, Nuxt.js, Nest.js', 'MongoDB & RESTful APIs', 'Team collaboration']
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
            <div className="hidden md:flex gap-8">
              {['About', 'Experience', 'Skills', 'Contact'].map((item) => (
                <motion.a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className="hover:text-purple-400 transition-colors"
                  whileHover={{ scale: 1.1 }}
                >
                  {item}
                </motion.a>
              ))}
            </div>
          </div>
        </motion.nav>

        {/* Hero Section */}
        <section className="min-h-screen flex items-center justify-center px-6 pt-20">
          <div className="max-w-5xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <motion.span
                className="inline-block mb-4 px-4 py-2 rounded-full glass text-sm font-medium text-purple-300"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: 'spring' }}
              >
                🤖 AI-First Full Stack Developer
              </motion.span>

              <h1 className="text-6xl md:text-8xl font-bold mb-6">
                <span className="text-gradient">Ibrahim</span> Alnezami
              </h1>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="text-2xl md:text-3xl text-gray-300 mb-8"
              >
                Building <span className="text-gradient">faster</span>, shipping{' '}
                <span className="text-gradient">smarter</span> with AI
              </motion.p>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="text-lg text-gray-400 max-w-2xl mx-auto mb-12"
              >
                Next-generation engineer leveraging AI as a force multiplier. 
                Delivering production-ready code <strong className="text-purple-400">3x faster</strong> while 
                maintaining architecture, quality, and scalability.
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
                  Get in Touch <ArrowRight className="w-5 h-5" />
                </motion.a>
                <motion.a
                  href="mailto:ibrahim.alnezami@gmail.com"
                  className="px-8 py-4 rounded-full glass text-white font-semibold hover:bg-white/10 hover-lift flex items-center gap-2"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Download className="w-5 h-5" /> Download Resume
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
            </motion.div>
          </div>
        </section>

        {/* AI-First Philosophy Section */}
        <section id="about" className="py-32 px-6 relative">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-5xl font-bold mb-4 text-center">
                Why <span className="text-gradient">AI-First</span> is My Superpower
              </h2>
              <p className="text-xl text-gray-400 text-center mb-16 max-w-3xl mx-auto">
                I don't just write code—I collaborate with AI to build modern applications at unprecedented speed.
              </p>

              <div className="grid md:grid-cols-3 gap-8">
                {[
                  {
                    icon: Zap,
                    title: '3x Faster',
                    description: 'Development cycles without sacrificing architecture or quality',
                    color: 'from-yellow-500 to-orange-500',
                  },
                  {
                    icon: Brain,
                    title: 'Continuous Learning',
                    description: 'Discover new frameworks and best practices in real-time',
                    color: 'from-purple-500 to-pink-500',
                  },
                  {
                    icon: Rocket,
                    title: 'Ship Features',
                    description: 'Ready to deploy in days, not months',
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
              Professional <span className="text-gradient">Experience</span>
            </motion.h2>

            <div className="space-y-8">
              {experience.map((exp, i) => (
                <motion.div
                  key={exp.role}
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
              Tech <span className="text-gradient">Stack</span>
            </motion.h2>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
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

        {/* Contact Section */}
        <section id="contact" className="py-32 px-6">
          <div className="max-w-4xl mx-auto text-center">
            <motion.h2
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-5xl font-bold mb-8"
            >
              Let's Build <span className="text-gradient">Together</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-xl text-gray-400 mb-12"
            >
              Ready to ship features in <strong className="text-purple-400">3 days, not 3 weeks</strong>. 
              Let's build the future, faster.
            </motion.p>

            <motion.a
              href="mailto:ibrahim.alnezami@gmail.com"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="inline-block px-12 py-4 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 text-white text-lg font-semibold hover:from-purple-700 hover:to-pink-700 hover-lift glow"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Get In Touch
            </motion.a>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-12 px-6 border-t border-white/10">
          <div className="max-w-6xl mx-auto text-center text-gray-400">
            <p>© 2025 Ibrahim Alnezami. Built with Next.js, TypeScript, and AI assistance.</p>
          </div>
        </footer>
      </div>
    </div>
  );
}
