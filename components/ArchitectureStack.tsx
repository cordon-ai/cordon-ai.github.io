import React from 'react';
import ScrollStack, { ScrollStackItem } from './ScrollStack';
import { Database, Server, Cpu, Zap, Layers, FileJson, Lock, Bot, BarChart3, Search, MessageSquare, ShieldCheck } from 'lucide-react';

const ModuleBox: React.FC<{ label: string; icon?: React.ReactNode; active?: boolean }> = ({ label, icon, active }) => (
  <div className={`
    flex flex-col items-center justify-center gap-2 p-3 rounded-xl border text-center transition-all duration-300 h-full w-full
    ${active 
      ? 'bg-cordon-500/10 border-cordon-500/20 text-cordon-200 shadow-[0_0_15px_-3px_rgba(45,212,191,0.1)]' 
      : 'bg-slate-900/40 border-slate-800/50 text-slate-500'}
  `}>
    {icon && <span className={active ? 'text-cordon-400' : 'text-slate-600'}>{React.cloneElement(icon as React.ReactElement<any>, { size: 18 })}</span>}
    <span className="text-[10px] md:text-xs font-bold uppercase tracking-wider">{label}</span>
  </div>
);

interface StackCardProps {
    title: string;
    subtitle: string;
    description: string;
    icon: React.ReactNode;
    children: React.ReactNode;
}

const StackCard: React.FC<StackCardProps> = ({ title, subtitle, description, icon, children }) => (
    <div className="bg-slate-950 border border-slate-800 rounded-2xl overflow-hidden relative w-full flex flex-col md:flex-row shadow-2xl md:h-[360px]">
        
        {/* Header Side */}
        <div className="md:w-5/12 p-8 flex flex-col justify-center relative bg-slate-900/30">
            <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-cordon-500 to-cordon-900 opacity-50 hidden md:block"></div>
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cordon-500 to-cordon-900 opacity-50 md:hidden"></div>
            
            <div className="mb-6">
                <div className="w-10 h-10 rounded-lg bg-slate-900 flex items-center justify-center text-cordon-400 border border-slate-800 mb-4 shadow-inner">
                    {React.cloneElement(icon as React.ReactElement<any>, { size: 20 })}
                </div>
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-2 tracking-tight">{title}</h3>
                <span className="text-cordon-500 text-xs font-bold tracking-widest uppercase">{subtitle}</span>
            </div>
            
            <p className="text-slate-400 text-sm leading-relaxed max-w-sm">{description}</p>
        </div>

        {/* Content Side */}
        <div className="flex-1 p-6 md:p-8 bg-black/20 flex items-center justify-center border-t md:border-t-0 md:border-l border-slate-800/50">
            <div className="w-full h-full grid grid-cols-2 gap-3 md:gap-4">
                {children}
            </div>
        </div>
    </div>
);

const ArchitectureStack: React.FC = () => {
  return (
    <section className="relative min-h-[120vh] bg-slate-950 py-24 border-t border-slate-900">
      {/* Title Overlay */}
      <div className="text-center mb-20 relative z-10">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">The Enterprise Intelligence Stack</h2>
          <p className="text-slate-400 max-w-lg mx-auto">A unified architecture designed to transform raw chaos into structured, actionable intelligence.</p>
      </div>

      <div className="max-w-5xl mx-auto px-6">
        <ScrollStack 
            itemDistance={200} // Reduced for closer scroll feel
            itemStackDistance={12} // Reduced for tighter stacking
            itemScale={0.05} 
            stackPosition="15%" // Position from top
            blurAmount={4}
        >
            
            {/* LAYER 1: DATA */}
            <ScrollStackItem>
                <StackCard 
                    title="Enterprise Data" 
                    subtitle="Ingestion Layer"
                    description="We connect to your raw data sources, structured or unstructured, and normalize them for AI consumption."
                    icon={<Server />}
                >
                    <ModuleBox label="Email & Comms" icon={<MessageSquare />} />
                    <ModuleBox label="Documents" icon={<FileJson />} active />
                    <ModuleBox label="CRM & ERP" icon={<Database />} />
                    <ModuleBox label="Activity" icon={<Zap />} active />
                </StackCard>
            </ScrollStackItem>

            {/* LAYER 2: KNOWLEDGE */}
            <ScrollStackItem>
                <StackCard 
                    title="Knowledge" 
                    subtitle="Structure & Security"
                    description="Raw data is transformed into a semantic knowledge graph with bank-grade security and permissioning."
                    icon={<ShieldCheck />}
                >
                    <ModuleBox label="Vector Index" icon={<Database />} active />
                    <ModuleBox label="Graph Relations" icon={<Layers />} active />
                    <ModuleBox label="PII Redaction" icon={<Lock />} />
                    <ModuleBox label="RBAC Controls" icon={<ShieldCheck />} active />
                </StackCard>
            </ScrollStackItem>

            {/* LAYER 3: MODELS */}
            <ScrollStackItem>
                <StackCard 
                    title="Models" 
                    subtitle="Intelligence & Tuning"
                    description="Orchestrate state-of-the-art foundation models, optimized with your specific enterprise context."
                    icon={<Cpu />}
                >
                    <ModuleBox label="RLHF Alignment" icon={<Layers />} active />
                    <ModuleBox label="Context Window" icon={<FileJson />} />
                    <ModuleBox label="Fine-Tuning" icon={<Cpu />} active />
                    <ModuleBox label="Model Routing" icon={<Server />} />
                </StackCard>
            </ScrollStackItem>

            {/* LAYER 4: APPS */}
            <ScrollStackItem>
                <StackCard 
                    title="Applications" 
                    subtitle="Value Delivery"
                    description="The final layer where intelligence meets the user. Custom agents, dashboards, and automated workflows."
                    icon={<Zap />}
                >
                    <ModuleBox label="Semantic Search" icon={<Search />} active />
                    <ModuleBox label="Chat Assistant" icon={<MessageSquare />} active />
                    <ModuleBox label="Monetization" icon={<BarChart3 />} />
                    <ModuleBox label="Workflows" icon={<Bot />} active />
                </StackCard>
            </ScrollStackItem>

        </ScrollStack>
      </div>
    </section>
  );
};

export default ArchitectureStack;