'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send, Calendar, Bot, Maximize2 } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export default function Chatbot() {
  const t = useTranslations('chatbot');
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // Initialize welcome message after component mounts or load from localStorage
  useEffect(() => {
    if (messages.length === 0) {
      const savedMessages = localStorage.getItem('chatbot-messages');
      if (savedMessages) {
        try {
          const parsed = JSON.parse(savedMessages);
          setMessages(parsed.map((msg: any) => ({
            ...msg,
            timestamp: new Date(msg.timestamp)
          })));
        } catch (e) {
          // If parsing fails, initialize with welcome message
          const welcomeText = t('welcome');
          setMessages([{
            id: '1',
            role: 'assistant',
            content: welcomeText,
            timestamp: new Date(),
          }]);
        }
      } else {
        const welcomeText = t('welcome');
        setMessages([{
          id: '1',
          role: 'assistant',
          content: welcomeText,
          timestamp: new Date(),
        }]);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Save messages to localStorage whenever they change
  useEffect(() => {
    if (messages.length > 0) {
      localStorage.setItem('chatbot-messages', JSON.stringify(messages));
    }
  }, [messages]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input.trim(),
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/chatbot', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: userMessage.content,
          conversationHistory: messages.map((m) => ({
            role: m.role,
            content: m.content,
          })),
        }),
      });

      const data = await response.json();

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: data.response || t('error'),
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, assistantMessage]);

      // If response contains appointment booking intent, show calendar button
      if (data.bookingIntent) {
        setTimeout(() => {
          const calendarMessage: Message = {
            id: (Date.now() + 2).toString(),
            role: 'assistant',
            content: t('bookingPrompt'),
            timestamp: new Date(),
          };
          setMessages((prev) => [...prev, calendarMessage]);
        }, 1000);
      }
    } catch (error) {
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: t('error'),
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleBooking = () => {
    window.open('https://zeeg.me/ibrahimalnezami/30min', '_blank');
  };

  const handleExpand = () => {
    // Save current messages to localStorage before navigating
    if (messages.length > 0) {
      localStorage.setItem('chatbot-messages', JSON.stringify(messages));
    }
    router.push('/chat');
  };

  return (
    <>
      {/* Floating Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 w-16 h-16 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 shadow-2xl flex items-center justify-center hover:scale-110 transition-transform"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        aria-label={t('openChat')}
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
            >
              <X className="w-6 h-6 text-white" />
            </motion.div>
          ) : (
            <motion.div
              key="open"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
            >
              <MessageCircle className="w-6 h-6 text-white" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-24 right-6 z-40 w-96 h-[600px] max-h-[80vh] glass rounded-2xl shadow-2xl flex flex-col border border-white/10"
          >
            {/* Header */}
            <div className="p-4 border-b border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 flex items-center justify-center">
                  <Bot className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-white">{t('title')}</h3>
                  <p className="text-xs text-gray-400">{t('subtitle')}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={handleExpand}
                  className="w-8 h-8 rounded-full hover:bg-white/10 flex items-center justify-center transition-colors"
                  aria-label={t('expandChat')}
                  title={t('expandChat')}
                >
                  <Maximize2 className="w-4 h-4 text-gray-400" />
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="w-8 h-8 rounded-full hover:bg-white/10 flex items-center justify-center transition-colors"
                  aria-label={t('closeChat')}
                >
                  <X className="w-4 h-4 text-gray-400" />
                </button>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] rounded-2xl px-4 py-2 ${
                      message.role === 'user'
                        ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white'
                        : 'glass text-gray-100'
                    }`}
                  >
                    <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                  </div>
                </motion.div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="glass rounded-2xl px-4 py-2">
                    <div className="flex gap-1">
                      <span className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                      <span className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                      <span className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Booking Button */}
            {messages.some((m) => m.content.includes(t('bookingPrompt'))) && (
              <div className="p-4 border-t border-white/10">
                <motion.button
                  onClick={handleBooking}
                  className="w-full px-4 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold hover:from-purple-700 hover:to-pink-700 transition-all flex items-center justify-center gap-2"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Calendar className="w-5 h-5" />
                  {t('bookMeeting')}
                </motion.button>
              </div>
            )}

            {/* Input */}
            <div className="p-4 border-t border-white/10">
              <div className="flex gap-2">
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder={t('placeholder')}
                  className="flex-1 px-4 py-3 rounded-xl glass border border-white/10 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  disabled={isLoading}
                />
                <motion.button
                  onClick={handleSend}
                  disabled={isLoading || !input.trim()}
                  className="w-12 h-12 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Send className="w-5 h-5 text-white" />
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

