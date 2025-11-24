import React, { useState, useRef, useEffect } from 'react';
import { Send, Terminal, Loader2, Database, ShieldCheck, FileText } from 'lucide-react';
import { generateCordonResponse } from '../services/geminiService';
import { ChatMessage } from '../types';

const InteractiveDemo: React.FC = () => {
  const [query, setQuery] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'model', text: "Welcome to Cordon. I have indexed your organization's emails, Slack logs, and document repositories. How can I help you unlock this knowledge today?" }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim() || isLoading) return;

    const userText = query;
    setQuery('');
    setMessages(prev => [...prev, { role: 'user', text: userText }]);
    setIsLoading(true);

    const responseText = await generateCordonResponse(userText);

    setMessages(prev => [...prev, { role: 'model', text: responseText }]);
    setIsLoading(false);
  };

  const suggestionPills = [
    "Summarize Q3 Project Phoenix emails",
    "What is our policy on remote work?",
    "Find recent complaints about 'Login Flow'"
  ];

  return (
    <div className="w-full max-w-4xl mx-auto bg-slate-900/50 border border-slate-800 rounded-xl overflow-hidden backdrop-blur-md shadow-2xl">
      <div className="bg-slate-900/80 border-b border-slate-800 p-4 flex items-center justify-between">
        <div className="flex items-center gap-2 text-cordon-400">
          <Terminal size={18} />
          <span className="font-mono text-sm font-semibold tracking-wider">CORDON_INTELLIGENCE_ENGINE_V2.1</span>
        </div>
        <div className="flex gap-2">
          <div className="flex items-center gap-1 text-xs text-slate-400 bg-slate-800 px-2 py-1 rounded">
            <Database size={12} /> Live Index
          </div>
          <div className="flex items-center gap-1 text-xs text-slate-400 bg-slate-800 px-2 py-1 rounded">
            <ShieldCheck size={12} /> Encrypted
          </div>
        </div>
      </div>

      <div className="h-[400px] p-6 overflow-y-auto flex flex-col gap-4 relative" ref={scrollRef}>
        {messages.map((msg, idx) => (
          <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[80%] rounded-lg p-4 text-sm leading-relaxed ${
              msg.role === 'user' 
                ? 'bg-cordon-600 text-white' 
                : 'bg-slate-800 text-slate-200 border border-slate-700'
            }`}>
              {msg.role === 'model' && (
                <div className="mb-2 flex items-center gap-2 text-cordon-400 text-xs font-mono uppercase tracking-widest opacity-75">
                  <div className="w-2 h-2 rounded-full bg-cordon-400 animate-pulse"></div>
                  Answer Generated
                </div>
              )}
              {msg.text}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-slate-800 rounded-lg p-4 flex items-center gap-3 border border-slate-700">
              <Loader2 className="animate-spin text-cordon-400" size={20} />
              <span className="text-slate-400 text-sm">Analyzing disparate data sources...</span>
            </div>
          </div>
        )}
      </div>

      <div className="p-4 bg-slate-900/80 border-t border-slate-800">
        {messages.length < 3 && (
            <div className="flex flex-wrap gap-2 mb-4">
            {suggestionPills.map((sugg, i) => (
                <button 
                key={i}
                onClick={() => setQuery(sugg)}
                className="text-xs bg-slate-800 hover:bg-slate-700 text-cordon-200 px-3 py-1.5 rounded-full transition-colors border border-slate-700 hover:border-cordon-500/50"
                >
                {sugg}
                </button>
            ))}
            </div>
        )}
        <form onSubmit={handleSubmit} className="relative">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Ask your enterprise data..."
            className="w-full bg-slate-950 border border-slate-700 text-slate-100 rounded-lg pl-4 pr-12 py-3 focus:outline-none focus:border-cordon-500 focus:ring-1 focus:ring-cordon-500 transition-all placeholder:text-slate-600"
          />
          <button 
            type="submit"
            disabled={isLoading}
            className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-cordon-600 hover:bg-cordon-500 text-white rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Send size={16} />
          </button>
        </form>
      </div>
    </div>
  );
};

export default InteractiveDemo;