import React, { useState, useEffect, useRef } from 'react';
import { ArrowRight, Menu, X, Zap, Users, Code, Shield, CheckCircle, Play, ChevronRight, Cpu, Network, Layers, GitBranch, Lock, Terminal } from 'lucide-react';
import cordonLogo from './assets/cordon_logo.png';

const App = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const AgentCard = ({ title, description, icon: Icon }) => {
    return (
      <div className="group p-6 rounded-lg border border-gray-800 hover:border-cyan-500/50 transition-all duration-300 bg-gray-900/30 backdrop-blur-sm">
        <div className="flex items-start space-x-4">
          <div className="p-2 rounded border border-cyan-500/20 group-hover:border-cyan-500/50 transition-colors bg-gradient-to-br from-cyan-500/10 to-blue-500/10">
            <Icon className="w-5 h-5 text-cyan-400 group-hover:text-cyan-300 transition-colors" strokeWidth={1.5} />
          </div>
          <div className="flex-1">
            <h3 className="text-base font-light text-white mb-2 group-hover:text-cyan-300 transition-colors">
              {title}
            </h3>
            <p className="text-sm font-light text-gray-400 leading-relaxed">
              {description}
            </p>
          </div>
        </div>
      </div>
    );
  };

  const FeatureCard = ({ title, description, icon: Icon, metrics }) => {
    return (
      <div className="p-8 rounded-lg border border-gray-800 hover:border-cyan-500/30 transition-all duration-300 bg-gray-900/20 backdrop-blur-sm">
        <Icon className="w-8 h-8 text-cyan-500 mb-4" strokeWidth={1} />
        <h3 className="text-lg font-light text-white mb-3">{title}</h3>
        <p className="text-sm font-light text-gray-400 leading-relaxed mb-4">
          {description}
        </p>
        {metrics && (
          <div className="pt-4 border-t border-gray-800">
            <div className="text-2xl font-light text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">{metrics.value}</div>
            <div className="text-xs font-light text-gray-500 mt-1">{metrics.label}</div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
      {/* Animated background with colors */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-black" />
        
        {/* Floating orbs */}
        <div className="absolute w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl opacity-50 top-10 left-10 animate-pulse" />
        <div className="absolute w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-3xl opacity-50 top-60 right-10 animate-pulse" style={{ animationDelay: '2s' }} />
        <div className="absolute w-80 h-80 bg-purple-500/10 rounded-full blur-3xl opacity-50 bottom-20 left-20 animate-pulse" style={{ animationDelay: '4s' }} />
        
        {/* Grid pattern */}
        <div 
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(rgba(0, 255, 255, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 255, 255, 0.1) 1px, transparent 1px)`,
            backgroundSize: '100px 100px'
          }} 
        />
      </div>

      {/* Navigation */}
      <nav className="relative z-50 px-8 py-6 border-b border-gray-900">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="relative">
              <div className="absolute inset-0 bg-cyan-500/30 rounded-full blur-xl scale-150"></div>
              <img src={cordonLogo} alt="Cordon" className="relative w-16 h-16 rounded-full border border-cyan-500/40" />
            </div>
            <span className="text-lg font-light tracking-wide text-white">
              Cordon
            </span>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            <a href="#architecture" className="text-sm font-light text-gray-500 hover:text-white transition-colors">Architecture</a>
            <a href="#capabilities" className="text-sm font-light text-gray-500 hover:text-white transition-colors">Capabilities</a>
            <a href="#security" className="text-sm font-light text-gray-500 hover:text-white transition-colors">Security</a>
            <a href="#developers" className="text-sm font-light text-gray-500 hover:text-white transition-colors">Developers</a>
          </div>

          <div className="flex items-center space-x-4">
            <button className="hidden md:block px-5 py-2 text-sm font-light rounded border border-gray-800 text-gray-400 hover:text-white hover:border-gray-700 transition-all">
              Documentation
            </button>
            <button className="px-5 py-2 text-sm font-light rounded bg-white text-black hover:bg-gray-100 transition-all">
              Request Access
            </button>
            <button 
              className="md:hidden p-2"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="w-5 h-5" strokeWidth={1.5} /> : <Menu className="w-5 h-5" strokeWidth={1.5} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-black border-b border-gray-900">
            <div className="px-8 py-6 space-y-4">
              <a href="#architecture" className="block text-sm font-light text-gray-500 hover:text-white transition-colors">Architecture</a>
              <a href="#capabilities" className="block text-sm font-light text-gray-500 hover:text-white transition-colors">Capabilities</a>
              <a href="#security" className="block text-sm font-light text-gray-500 hover:text-white transition-colors">Security</a>
              <a href="#developers" className="block text-sm font-light text-gray-500 hover:text-white transition-colors">Developers</a>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="relative px-8 py-24 z-10">
        <div className="max-w-7xl mx-auto text-center">
          {/* Logo */}
          <div className="mb-12 flex justify-center">
            <div className="relative">
              <div className="absolute inset-0 bg-cyan-500/40 rounded-full blur-3xl scale-150" style={{ animation: 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite' }}></div>
              <div className="absolute inset-0 bg-blue-500/25 rounded-full blur-2xl scale-125" style={{ animation: 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite', animationDelay: '1s' }}></div>
              <div className="absolute inset-0 rounded-full border-2 border-cyan-500/70" style={{ animation: 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite', animationDelay: '0.5s' }}></div>
              <img src={cordonLogo} alt="Cordon" className="relative w-32 h-32 rounded-full border-2 border-cyan-500/50 shadow-2xl" />
            </div>
          </div>
            
          <h1 className="text-5xl md:text-7xl font-extralight leading-tight mb-6">
            The Operating System for<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600">
              Multi-Agent AI Systems
            </span>
          </h1>
          
          <p className="text-lg font-light text-gray-500 mb-12 max-w-3xl mx-auto leading-relaxed">
            Orchestrate autonomous agents, scale workflows, and deploy intelligence across software and hardware — with Cordon.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-8 py-4 rounded-lg text-sm font-medium bg-white text-black hover:bg-gray-100 transition-all flex items-center justify-center">
              Request Access
              <ArrowRight className="w-4 h-4 ml-2" strokeWidth={1.5} />
            </button>
            <button className="px-8 py-4 rounded-lg text-sm font-medium border border-gray-700 text-gray-400 hover:text-white hover:border-gray-600 transition-all flex items-center justify-center">
              <Terminal className="w-4 h-4 mr-2" strokeWidth={1.5} />
              Try SDK
            </button>
          </div>
        </div>
      </section>

      {/* Architecture Section */}
      <section id="architecture" className="relative px-8 py-20 z-10">
        <div className="max-w-7xl mx-auto">
          <div className="mb-16">
            <h2 className="text-3xl font-extralight mb-4">Modular Architecture</h2>
            <p className="text-lg font-light text-gray-500 max-w-3xl">
              A hierarchical orchestration system where a central AI coordinator manages specialized agents, each running in isolated sandboxes with controlled permissions.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            <AgentCard
              title="Orchestrator Layer"
              description="Central AI that interprets requests, maintains context, and coordinates agent workflows with intelligent routing and dependency management."
              icon={Network}
            />
            <AgentCard
              title="Agent Runtime"
              description="Sandboxed execution environment for specialized agents with resource limits, API access control, and secure inter-agent communication."
              icon={Layers}
            />
            <AgentCard
              title="Integration Layer"
              description="Extensible APIs, vector databases for memory, and standardized protocols for third-party agent integration and discovery."
              icon={GitBranch}
            />
          </div>

          {/* Technical Diagram with colors */}
          <div className="mt-16 p-8 rounded-lg border border-gray-800 bg-gray-900/30 backdrop-blur-sm">
            <div className="grid md:grid-cols-3 gap-8">
              <div>
                <h4 className="text-sm font-light text-cyan-400 mb-4">INPUT LAYER</h4>
                <div className="space-y-2">
                  <div className="p-3 rounded border border-cyan-500/20 bg-cyan-500/5 text-sm font-light text-gray-300">Natural Language API</div>
                  <div className="p-3 rounded border border-blue-500/20 bg-blue-500/5 text-sm font-light text-gray-300">REST/gRPC Interface</div>
                  <div className="p-3 rounded border border-purple-500/20 bg-purple-500/5 text-sm font-light text-gray-300">Event Streams</div>
                </div>
              </div>
              <div>
                <h4 className="text-sm font-light text-blue-400 mb-4">ORCHESTRATION</h4>
                <div className="space-y-2">
                  <div className="p-3 rounded border border-blue-500/20 bg-blue-500/5 text-sm font-light text-gray-300">Intent Analysis</div>
                  <div className="p-3 rounded border border-indigo-500/20 bg-indigo-500/5 text-sm font-light text-gray-300">Agent Selection</div>
                  <div className="p-3 rounded border border-purple-500/20 bg-purple-500/5 text-sm font-light text-gray-300">Workflow Execution</div>
                </div>
              </div>
              <div>
                <h4 className="text-sm font-light text-purple-400 mb-4">AGENT POOL</h4>
                <div className="space-y-2">
                  <div className="p-3 rounded border border-green-500/20 bg-green-500/5 text-sm font-light text-gray-300">Internal Agents</div>
                  <div className="p-3 rounded border border-yellow-500/20 bg-yellow-500/5 text-sm font-light text-gray-300">Third-Party Agents</div>
                  <div className="p-3 rounded border border-pink-500/20 bg-pink-500/5 text-sm font-light text-gray-300">Custom Agents</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Capabilities Section */}
      <section id="capabilities" className="relative px-8 py-20 z-10">
        <div className="max-w-7xl mx-auto">
          <div className="mb-16">
            <h2 className="text-3xl font-extralight mb-4">Platform Capabilities</h2>
            <p className="text-lg font-light text-gray-500 max-w-3xl">
              Built for enterprises requiring reliable, scalable AI orchestration across diverse domains.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <FeatureCard
              title="Adaptive Learning"
              description="Continuously improves performance by learning from client data, preferences, and workflows. Maintains persistent context across interactions."
              icon={Cpu}
              metrics={{ value: "10M+", label: "Agent Executions" }}
            />
            <FeatureCard
              title="Cross-Domain Integration"
              description="Extends from enterprise software to IoT devices and robotics. Unified control plane for digital and physical agent coordination."
              icon={Network}
              metrics={{ value: "500+", label: "Integrated Systems" }}
            />
            <FeatureCard
              title="Developer Ecosystem"
              description="Open SDK for third-party agent development. Revenue sharing model for contributed agents with automated discovery."
              icon={Code}
              metrics={{ value: "1000+", label: "Custom Agents" }}
            />
          </div>
        </div>
      </section>

      {/* Security Section */}
      <section id="security" className="relative px-8 py-20 z-10 border-t border-gray-900">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-extralight mb-6">Enterprise Security</h2>
              <p className="text-lg font-light text-gray-500 mb-8 leading-relaxed">
                Multi-layered security architecture ensuring data isolation, controlled access, and complete audit trails for regulatory compliance.
              </p>
              
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <Lock className="w-5 h-5 text-cyan-500 mt-0.5" strokeWidth={1.5} />
                  <div>
                    <h4 className="text-sm font-light text-white mb-1">Sandboxed Execution</h4>
                    <p className="text-sm font-light text-gray-500">Isolated containers with resource limits and network restrictions</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Shield className="w-5 h-5 text-blue-500 mt-0.5" strokeWidth={1.5} />
                  <div>
                    <h4 className="text-sm font-light text-white mb-1">Fine-Grained Permissions</h4>
                    <p className="text-sm font-light text-gray-500">Role-based access control with principle of least privilege</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" strokeWidth={1.5} />
                  <div>
                    <h4 className="text-sm font-light text-white mb-1">Compliance Ready</h4>
                    <p className="text-sm font-light text-gray-500">SOC 2 Type II, GDPR compliant with full audit logs</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-8 rounded-lg border border-gray-800 bg-gray-900/30 backdrop-blur-sm">
              <h3 className="text-lg font-light text-cyan-300 mb-6">Security Architecture</h3>
              <div className="space-y-3">
                <div className="p-4 rounded border border-green-500/20 bg-green-500/5 flex items-center justify-between">
                  <span className="text-sm font-light text-gray-300">Agent Authentication</span>
                  <span className="text-xs font-light text-green-400">Active</span>
                </div>
                <div className="p-4 rounded border border-green-500/20 bg-green-500/5 flex items-center justify-between">
                  <span className="text-sm font-light text-gray-300">End-to-End Encryption</span>
                  <span className="text-xs font-light text-green-400">Active</span>
                </div>
                <div className="p-4 rounded border border-green-500/20 bg-green-500/5 flex items-center justify-between">
                  <span className="text-sm font-light text-gray-300">Data Isolation</span>
                  <span className="text-xs font-light text-green-400">Active</span>
                </div>
                <div className="p-4 rounded border border-green-500/20 bg-green-500/5 flex items-center justify-between">
                  <span className="text-sm font-light text-gray-300">Audit Logging</span>
                  <span className="text-xs font-light text-green-400">Active</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Developer Section */}
      <section id="developers" className="relative px-8 py-20 z-10 border-t border-gray-900">
        <div className="max-w-7xl mx-auto">
          <div className="mb-16">
            <h2 className="text-3xl font-extralight mb-4">Agent Development Kit</h2>
            <p className="text-lg font-light text-gray-500 max-w-3xl">
              Build, deploy, and monetize custom agents with our comprehensive SDK and marketplace.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            <div>
              <div className="p-6 rounded-lg border border-gray-800 bg-gray-900/50 backdrop-blur-sm font-mono text-sm">
                <div className="text-green-400 mb-2"># Install Cordon SDK</div>
                <div className="text-gray-300 mb-4">pip install cordon-sdk</div>
                
                <div className="text-green-400 mb-2"># Create custom agent</div>
                <div className="text-cyan-400">from</div> <div className="text-white inline">cordon </div>
                <div className="text-cyan-400 inline">import</div> <div className="text-white inline"> Agent</div>
                <div className="mt-2"></div>
                <div className="text-cyan-400">class</div> <div className="text-yellow-400 inline"> FinancialAnalyst</div><div className="text-white inline">(Agent):</div>
                <div className="text-white ml-4">async <div className="text-blue-400 inline">def</div> <div className="text-yellow-300 inline">execute</div>(self, request):</div>
                <div className="text-gray-300 ml-8">data = await self.fetch_market_data()</div>
                <div className="text-gray-300 ml-8">return self.analyze(data)</div>
                <div className="mt-4"></div>
                <div className="text-green-400"># Deploy to marketplace</div>
                <div className="text-gray-300">cordon deploy --agent financial-analyst</div>
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-light text-white mb-3">Development Features</h3>
                <ul className="space-y-2 text-sm font-light text-gray-400">
                  <li className="flex items-center">
                    <ChevronRight className="w-4 h-4 mr-2 text-cyan-500" strokeWidth={1.5} />
                    Standardized agent interface with OpenAPI support
                  </li>
                  <li className="flex items-center">
                    <ChevronRight className="w-4 h-4 mr-2 text-blue-500" strokeWidth={1.5} />
                    Local testing environment with sandbox simulation
                  </li>
                  <li className="flex items-center">
                    <ChevronRight className="w-4 h-4 mr-2 text-purple-500" strokeWidth={1.5} />
                    Automatic agent discovery and intent matching
                  </li>
                  <li className="flex items-center">
                    <ChevronRight className="w-4 h-4 mr-2 text-green-500" strokeWidth={1.5} />
                    Revenue sharing for marketplace contributions
                  </li>
                </ul>
              </div>

              <div className="p-6 rounded-lg border border-gray-800 bg-gray-900/30 backdrop-blur-sm">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="text-sm font-light text-cyan-400">MARKETPLACE STATS</h4>
                  <span className="text-xs font-light text-green-400">Live</span>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="text-2xl font-light text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">1,247</div>
                    <div className="text-xs font-light text-gray-500">Available Agents</div>
                  </div>
                  <div>
                    <div className="text-2xl font-light text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-cyan-500">$2.4M</div>
                    <div className="text-xs font-light text-gray-500">Developer Revenue</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative px-8 py-20 z-10 border-t border-gray-900">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl font-extralight mb-6">
            Ready to build the future of AI orchestration?
          </h2>
          <p className="text-lg font-light text-gray-500 mb-10 max-w-2xl mx-auto">
            Join leading enterprises using Cordon to coordinate multi-agent systems at scale.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-6 py-3 rounded text-sm font-light bg-white text-black hover:bg-gray-100 transition-all">
              Request Enterprise Demo
            </button>
            <button className="px-6 py-3 rounded text-sm font-light border border-gray-800 text-gray-400 hover:text-white hover:border-gray-700 transition-all">
              Read Technical Docs
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative px-8 py-16 border-t border-gray-900 z-10">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-12">
            <div className="col-span-2">
              <div className="flex items-center space-x-3 mb-6">
                <div className="relative">
                  <img src={cordonLogo} alt="Cordon" className="w-10 h-10 rounded-full border border-gray-700" />
                </div>
                <span className="text-sm font-light">Cordon</span>
              </div>
              <p className="text-sm font-light text-gray-600 max-w-md leading-relaxed">
                Infrastructure for multi-agent AI systems. Secure orchestration, extensible architecture, enterprise-ready.
              </p>
            </div>

            <div>
              <h4 className="text-xs font-light text-gray-500 mb-4 uppercase tracking-wider">Product</h4>
              <div className="space-y-2">
                <a href="#" className="block text-sm font-light text-gray-600 hover:text-white transition-colors">Platform</a>
                <a href="#" className="block text-sm font-light text-gray-600 hover:text-white transition-colors">SDK</a>
                <a href="#" className="block text-sm font-light text-gray-600 hover:text-white transition-colors">Marketplace</a>
                <a href="#" className="block text-sm font-light text-gray-600 hover:text-white transition-colors">Enterprise</a>
              </div>
            </div>

            <div>
              <h4 className="text-xs font-light text-gray-500 mb-4 uppercase tracking-wider">Resources</h4>
              <div className="space-y-2">
                <a href="#" className="block text-sm font-light text-gray-600 hover:text-white transition-colors">Documentation</a>
                <a href="#" className="block text-sm font-light text-gray-600 hover:text-white transition-colors">API Reference</a>
                <a href="#" className="block text-sm font-light text-gray-600 hover:text-white transition-colors">Security</a>
                <a href="#" className="block text-sm font-light text-gray-600 hover:text-white transition-colors">Status</a>
              </div>
            </div>
          </div>

          <div className="pt-8 border-t border-gray-900">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="text-xs font-light text-gray-600 mb-4 md:mb-0">
                © 2025 Cordon AI All rights reserved.
              </div>
              <div className="flex space-x-6">
                <a href="#" className="text-xs font-light text-gray-600 hover:text-white transition-colors">Privacy</a>
                <a href="#" className="text-xs font-light text-gray-600 hover:text-white transition-colors">Terms</a>
                <a href="#" className="text-xs font-light text-gray-600 hover:text-white transition-colors">Security</a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;