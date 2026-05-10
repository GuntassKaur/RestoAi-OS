"use client";
import { useState, useRef, useEffect } from 'react';
import { Bot, Send, ChevronDown, Trash2, Maximize2 } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import Link from 'next/link';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export default function AIChatPanel() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (bottomRef.current) {
        bottomRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isLoading, isOpen]);

  const sendMessage = async () => {
    const text = input;
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
      console.error('Agent chat error:', error);
      setMessages(prev => [...prev, { role: 'assistant', content: "Neural link disrupted. Check platform status." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {!isOpen && (
        <motion.button
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 w-14 h-14 bg-gradient-to-tr from-blue-600 to-indigo-500 rounded-full flex items-center justify-center text-white shadow-[0_0_30px_rgba(37,99,235,0.5)] z-50 hover:shadow-[0_0_40px_rgba(37,99,235,0.8)] border border-white/10 transition-all cursor-pointer"
        >
          <Bot className="w-6 h-6" />
          <span className="absolute -top-1 -right-1 flex h-4 w-4">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-4 w-4 bg-blue-500 border-2 border-[#020617]"></span>
          </span>
        </motion.button>
      )}

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ y: 20, opacity: 0, scale: 0.95 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 20, opacity: 0, scale: 0.95 }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed bottom-6 right-6 w-[380px] h-[580px] max-h-[85vh] bg-[#020617]/90 backdrop-blur-2xl border border-white/10 rounded-2xl shadow-[0_0_50px_rgba(0,0,0,0.5)] z-[60] flex flex-col font-sans overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 bg-white/5 border-b border-white/10">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-blue-500/20 border border-blue-500/30 flex items-center justify-center">
                  <Bot className="w-5 h-5 text-blue-400" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white tracking-wide">Neural Assistant</h3>
                  <div className="flex items-center gap-1.5">
                    <span className="w-1 h-1 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="text-[10px] font-mono text-emerald-400 uppercase tracking-tighter">Live Sync</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <Link href="/ai-agent" onClick={() => setIsOpen(false)} className="p-2 hover:bg-white/10 rounded-lg text-slate-400 transition-colors">
                  <Maximize2 className="w-4 h-4" />
                </Link>
                <button onClick={() => setIsOpen(false)} className="p-2 hover:bg-white/10 rounded-lg text-slate-400 transition-colors">
                  <ChevronDown className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Chat Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gradient-to-b from-transparent to-black/20">
              {messages.length === 0 && (
                <div className="flex flex-col items-center justify-center h-full text-center space-y-3 opacity-30">
                  <Bot className="w-10 h-10 text-slate-500" />
                  <p className="text-xs font-medium text-slate-400">Ask about inventory,<br/>revenue, or staff.</p>
                </div>
              )}
              {messages.map((m, i) => (
                <div key={i} className={`flex ${m.role === 'user' ? "justify-end" : "justify-start"}`}>
                  <div className={`max-w-[85%] rounded-2xl px-4 py-3 text-xs leading-relaxed ${m.role === 'user' ? "bg-blue-600/20 text-blue-100 border border-blue-500/20 rounded-tr-sm" : "bg-white/5 text-slate-200 border border-white/10 rounded-tl-sm shadow-xl"}`}>
                    {m.content}
                  </div>
                </div>
              ))}
              {isLoading && messages[messages.length-1]?.role === 'user' && (
                <div className="flex justify-start">
                  <div className="bg-white/5 border border-white/10 rounded-2xl rounded-tl-sm px-4 py-3 flex gap-1">
                    <span className="w-1 h-1 bg-blue-400 rounded-full animate-bounce [animation-delay:-0.3s]" />
                    <span className="w-1 h-1 bg-blue-400 rounded-full animate-bounce [animation-delay:-0.15s]" />
                    <span className="w-1 h-1 bg-blue-400 rounded-full animate-bounce" />
                  </div>
                </div>
              )}
              <div ref={bottomRef} className="h-2" />
            </div>

            {/* Input */}
            <div className="p-4 bg-white/5 border-t border-white/10">
              <div className="relative flex items-center">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
                  placeholder="Ask DINEVA..."
                  className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-4 pr-12 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-blue-500/50 transition-all font-medium"
                />
                <button 
                  onClick={sendMessage}
                  disabled={!input.trim() || isLoading}
                  className="absolute right-1.5 top-1/2 -translate-y-1/2 w-9 h-9 rounded-lg bg-blue-600 flex items-center justify-center text-white hover:bg-blue-500 disabled:opacity-50 disabled:bg-slate-700 transition-all"
                >
                  <Send className="w-4 h-4 ml-0.5" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
