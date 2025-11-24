import React from 'react';
import { Eye, Database, BrainCircuit, Lock, Network, DollarSign } from 'lucide-react';
import { Feature } from '../types';

const features: Feature[] = [
  {
    title: "Total Data Capture",
    description: "Ingest everything. Emails, Slack, Zoom calls, and even employee screen activity are structured into a unified vector database.",
    icon: <Eye className="text-cordon-400" size={28} />
  },
  {
    title: "Semantic Search",
    description: "Move beyond keywords. Our RAG (Retrieval-Augmented Generation) engine understands context, nuance, and intent.",
    icon: <BrainCircuit className="text-cordon-400" size={28} />
  },
  {
    title: "Enterprise Connectors",
    description: "Seamlessly integrates with Google Workspace, Microsoft 365, Salesforce, Jira, and 50+ other enterprise tools.",
    icon: <Network className="text-cordon-400" size={28} />
  },
  {
    title: "Fine-Tuning Ready",
    description: "Transform your raw data into clean, labeled datasets ready to fine-tune Llama 3, Gemini, or proprietary models.",
    icon: <Database className="text-cordon-400" size={28} />
  },
  {
    title: "Bank-Grade Security",
    description: "SOC 2 Type II compliant. Granular RBAC (Role-Based Access Control) ensures employees only see what they're authorized to.",
    icon: <Lock className="text-cordon-400" size={28} />
  },
  {
    title: "Asset Monetization",
    description: "Turn dormant knowledge into revenue. Anonymize and license your curated datasets to third parties securely.",
    icon: <DollarSign className="text-cordon-400" size={28} />
  }
];

const Features: React.FC = () => {
  return (
    <section className="py-24 px-6 md:px-12 max-w-7xl mx-auto relative z-10">
      <div className="mb-16">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
          The Operating System for <span className="text-cordon-400">Enterprise Intelligence</span>
        </h2>
        <p className="text-slate-400 text-lg max-w-2xl">
          Cordon bridges the gap between raw data silos and actionable AI models.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {features.map((feature, idx) => (
          <div 
            key={idx}
            className="group p-8 rounded-2xl bg-slate-900/40 border border-slate-800 hover:border-cordon-500/30 transition-all duration-300 hover:bg-slate-800/60 backdrop-blur-sm"
          >
            <div className="mb-6 p-3 bg-slate-950/50 rounded-lg w-fit border border-slate-800 group-hover:border-cordon-500/20 transition-colors">
              {feature.icon}
            </div>
            <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-cordon-300 transition-colors">{feature.title}</h3>
            <p className="text-slate-400 leading-relaxed">{feature.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Features;