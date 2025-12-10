'use client';

import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Send, Calendar, Bot, ArrowLeft } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export default function ChatPage() {
  const t = useTranslations('chatbot');
  const router = useRouter();
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // Load messages from localStorage or initialize
  useEffect(() => {
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
  }, [t]);

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
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

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

  const clearChat = () => {
    const welcomeText = t('welcome');
    setMessages([{
      id: '1',
      role: 'assistant',
      content: welcomeText,
      timestamp: new Date(),
    }]);
    localStorage.removeItem('chatbot-messages');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-purple-950/20 to-black text-white">
      {/* Header */}
      <div className="sticky top-0 z-50 glass border-b border-white/10 backdrop-blur-lg">
        <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="w-10 h-10 rounded-full hover:bg-white/10 flex items-center justify-center transition-colors"
            >
              <ArrowLeft className="w-5 h-5 text-gray-400" />
            </Link>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 flex items-center justify-center">
                <Bot className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-white">{t('title')}</h1>
                <p className="text-sm text-gray-400">{t('subtitle')}</p>
              </div>
            </div>
          </div>
          <button
            onClick={clearChat}
            className="px-4 py-2 rounded-lg glass hover:bg-white/10 transition-colors text-sm"
          >
            {t('clearChat')}
          </button>
        </div>
      </div>

      {/* Chat Container */}
      <div className="max-w-4xl mx-auto px-6 py-8">
        <div className="flex flex-col h-[calc(100vh-120px)]">
          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-6 mb-4">
            {messages.map((message) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[70%] rounded-2xl px-6 py-4 ${
                    message.role === 'user'
                      ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white'
                      : 'glass text-gray-100'
                  }`}
                >
                  <p className="text-base whitespace-pre-wrap leading-relaxed">{message.content}</p>
                </div>
              </motion.div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="glass rounded-2xl px-6 py-4">
                  <div className="flex gap-2">
                    <span className="w-3 h-3 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                    <span className="w-3 h-3 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                    <span className="w-3 h-3 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Booking Button */}
          {messages.some((m) => m.content.includes(t('bookingPrompt'))) && (
            <div className="mb-4">
              <motion.button
                onClick={handleBooking}
                className="w-full px-6 py-4 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold hover:from-purple-700 hover:to-pink-700 transition-all flex items-center justify-center gap-3"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Calendar className="w-5 h-5" />
                {t('bookMeeting')}
              </motion.button>
            </div>
          )}

          {/* Input */}
          <div className="glass rounded-2xl p-4 border border-white/10">
            <div className="flex gap-3">
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder={t('placeholder')}
                className="flex-1 px-6 py-4 rounded-xl glass border border-white/10 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 text-base"
                disabled={isLoading}
              />
              <motion.button
                onClick={handleSend}
                disabled={isLoading || !input.trim()}
                className="w-14 h-14 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Send className="w-6 h-6 text-white" />
              </motion.button>
            </div>
            <p className="text-xs text-gray-500 mt-2 text-center">
              {t('inputHint')}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

