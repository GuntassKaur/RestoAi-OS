"use client";
import React, { useState, useEffect, useRef } from 'react';
import { 
  Bot, 
  Send, 
  Trash2, 
  Sparkles, 
  Terminal, 
  TrendingUp, 
  Package, 
  Users, 
  AlertCircle 
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface Message {
  role: 'user' | 'assistant';
  content: string;
  tools?: string[];
}

export default function AIAgentPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Persistence
  useEffect(() => {
    const saved = sessionStorage.getItem('dineva_chat');
    if (saved) setMessages(JSON.parse(saved));
  }, []);

  useEffect(() => {
    sessionStorage.setItem('dineva_chat', JSON.stringify(messages));
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const sendMessage = async (presetQuery?: string) => {
    const text = presetQuery || input;
    if (!text.trim() || isLoading) return;

    const newMessages: Message[] = [...messages, { role: 'user', content: text }];
    setMessages(newMessages);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/agent/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: text, history: messages }),
      });

      if (!response.body) return;
      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      
      let assistantResponse = "";
      setMessages(prev => [...prev, { role: 'assistant', content: "" }]);

      while (true) {
        const { value, done } = await reader.read();
        if (done) break;
        
        const chunk = decoder.decode(value);
        const lines = chunk.split('\n');
        
        for (const line of lines) {
          if (line.startsWith('data: ')) {
            const rawData = line.slice(6);
            if (rawData === '[DONE]') break;
            try {
              const data = JSON.parse(rawData);
              assistantResponse += data.content;
              setMessages(prev => {
                const updated = [...prev];
                updated[updated.length - 1].content = assistantResponse;
                return updated;
              });
            } catch (e) {}
          }
        }
      }
    } catch (error) {
      console.error('Chat error:', error);
      setMessages(prev => [...prev, { role: 'assistant', content: "Error connecting to neural link. Please verify backend state." }]);
    } finally {
      setIsLoading(false);
    }
  };

  const clearChat = () => {
    setMessages([]);
    sessionStorage.removeItem('dineva_chat');
  };

  const presets = [
    { label: "Low Stock?", icon: Package, query: "What's low in stock?" },
    { label: "Revenue?", icon: TrendingUp, query: "How much did we make today?" },
    { label: "Staff on duty?", icon: Users, query: "Who is working right now?" },
    { label: "Pending?", icon: AlertCircle, query: "Show me all pending orders." },
  ];

  return (
    <div className="h-screen flex flex-col p-4 md:p-8 max-w-5xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-blue-600/20 border border-blue-500/30 flex items-center justify-center shadow-[inset_0_0_15px_rgba(37,99,235,0.2)]">
            <Bot className="w-6 h-6 text-blue-400" />
          </div>
          <div>
            <h1 className="text-2xl font-black text-white tracking-tight">Agent Core</h1>
            <p className="text-xs font-mono text-blue-400/60 uppercase tracking-widest">Autonomous Operations Engine</p>
          </div>
        </div>
        <button 
          onClick={clearChat}
          className="p-3 bg-white/5 hover:bg-rose-500/10 border border-white/10 hover:border-rose-500/20 rounded-xl text-slate-500 hover:text-rose-400 transition-all"
        >
          <Trash2 className="w-5 h-5" />
        </button>
      </div>

      {/* Chat Area */}
      <div 
        ref={scrollRef}
        className="flex-1 overflow-y-auto space-y-6 pr-2 custom-scrollbar scroll-smooth"
      >
        {messages.length === 0 && (
          <div className="h-full flex flex-col items-center justify-center text-center space-y-6 opacity-40">
            <Sparkles className="w-16 h-16 text-blue-500" />
            <div className="max-w-sm">
              <h3 className="text-xl font-bold text-white mb-2">Neural Synchronization Ready</h3>
              <p className="text-sm text-slate-400 leading-relaxed">Ask anything about your restaurant's inventory, staff schedules, or revenue insights.</p>
            </div>
          </div>
        )}

        {messages.map((m, i) => (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            key={i}
            className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div className={`max-w-[85%] rounded-2xl p-4 text-sm leading-relaxed shadow-xl border ${
              m.role === 'user' 
                ? 'bg-blue-600/10 border-blue-500/30 text-blue-100' 
                : 'bg-white/5 border-white/10 text-slate-200 backdrop-blur-md'
            }`}>
              <div className="flex items-center gap-2 mb-2 opacity-50">
                {m.role === 'user' ? (
                  <span className="text-[10px] font-black uppercase tracking-widest ml-auto">Operator</span>
                ) : (
                  <span className="text-[10px] font-black uppercase tracking-widest">DINEVA Insight</span>
                )}
              </div>
              <div className="font-medium whitespace-pre-wrap">{m.content}</div>
              {m.role === 'assistant' && i === messages.length - 1 && isLoading && (
                 <span className="inline-block w-1 h-4 bg-blue-400 animate-pulse ml-1" />
              )}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Presets */}
      <div className="flex flex-wrap gap-2">
        {presets.map((p, i) => (
          <button 
            key={i}
            onClick={() => sendMessage(p.query)}
            className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 hover:border-blue-500/30 hover:bg-blue-500/5 rounded-xl text-xs font-bold text-slate-400 hover:text-blue-400 transition-all"
          >
            <p.icon className="w-3.5 h-3.5" /> {p.label}
          </button>
        ))}
      </div>

      {/* Input */}
      <div className="relative group">
        <div className="absolute inset-0 bg-blue-600/20 blur-2xl opacity-0 group-focus-within:opacity-100 transition-opacity" />
        <div className="relative flex items-center bg-white/5 border border-white/10 rounded-2xl p-2 group-focus-within:border-blue-500/50 transition-all backdrop-blur-xl">
          <input 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
            placeholder="Query operational intelligence..."
            className="flex-1 bg-transparent border-none py-3 px-4 text-sm text-white placeholder-slate-600 focus:outline-none font-medium"
          />
          <button 
            onClick={() => sendMessage()}
            disabled={!input.trim() || isLoading}
            className="p-3 bg-blue-600 hover:bg-blue-500 disabled:bg-slate-700 disabled:opacity-50 text-white rounded-xl transition-all shadow-[0_0_15px_rgba(37,99,235,0.4)]"
          >
            {isLoading ? <RefreshCw className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />}
          </button>
        </div>
      </div>
    </div>
  );
}

function RefreshCw(props: any) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-refresh-cw"><path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8"/><path d="M21 3v5h-5"/><path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16"/><path d="M3 21v-5h5"/></svg>
  );
}
