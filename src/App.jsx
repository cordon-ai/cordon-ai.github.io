import React, { useState, useEffect, useRef } from 'react';
import { ArrowRight, Menu, X, Zap, Users, Code, Shield, CheckCircle, Play, Star, Github, Twitter, Linkedin, ChevronRight } from 'lucide-react';
import cordonLogo from './assets/cordon_logo.png';

const App = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [scrollY, setScrollY] = useState(0);
  const heroRef = useRef(null);
  const featuresRef = useRef(null);
  const architectureRef = useRef(null);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };

    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const ScaleGlowEffect = ({ children, className = "", intensity = 0.08 }) => {
    const [localMousePos, setLocalMousePos] = useState({ x: 0, y: 0 });
    const elementRef = useRef(null);

    const handleMouseMove = (e) => {
      if (elementRef.current) {
        const rect = elementRef.current.getBoundingClientRect();
        setLocalMousePos({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top
        });
      }
    };

    return (
      <div
        ref={elementRef}
        className={`relative ${className}`}
        onMouseMove={handleMouseMove}
        style={{
          background: `radial-gradient(800px circle at ${localMousePos.x}px ${localMousePos.y}px, rgba(0, 255, 255, ${intensity}), transparent 40%)`
        }}
      >
        {children}
      </div>
    );
  };

  const AgentCard = ({ title, description, icon: Icon, delay = 0 }) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
      <div
        className="relative p-6 rounded-xl border border-gray-800 bg-gray-900/50 backdrop-blur-sm transition-all duration-500 hover:border-cyan-500/50 hover:bg-gray-800/70 group cursor-pointer transform hover:scale-105 hover:shadow-2xl hover:shadow-cyan-500/20"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        style={{ animationDelay: `${delay}ms` }}
      >
        <div className="flex items-center mb-4">
          <div className="p-3 rounded-lg bg-gradient-to-br from-cyan-500/20 to-blue-500/20 border border-cyan-500/30 group-hover:from-cyan-500/30 group-hover:to-blue-500/30 transition-all">
            <Icon className="w-6 h-6 text-cyan-400 group-hover:text-cyan-300 transition-colors" />
          </div>
        </div>
        <h3 className="text-lg font-semibold text-white mb-3 group-hover:text-cyan-300 transition-colors">
          {title}
        </h3>
        <p className="text-sm text-gray-400 leading-relaxed group-hover:text-gray-300 transition-colors">
          {description}
        </p>
        <div className={`absolute inset-0 rounded-xl border transition-all duration-300 ${
          isHovered ? 'border-cyan-500/50 shadow-lg shadow-cyan-500/25' : 'border-transparent'
        }`} />
      </div>
    );
  };

  const InteractiveArchitecture = () => {
    const [activeSection, setActiveSection] = useState('orchestrator');

    const sections = [
      {
        id: 'orchestrator',
        title: 'Intelligent Orchestrator',
        description: 'Central command that analyzes requests and coordinates agent workflows with dynamic routing and load balancing.',
        icon: Users,
        color: 'from-blue-500 to-cyan-500'
      },
      {
        id: 'agents',
        title: 'Agent Ecosystem',
        description: 'Diverse collection of specialized AI workers running in secure sandboxes with real-time monitoring and scaling.',
        icon: Zap,
        color: 'from-purple-500 to-pink-500'
      },
      {
        id: 'infrastructure',
        title: 'Smart Infrastructure',
        description: 'Adaptive platform that provides tools, memory, APIs, and integrations with automatic resource optimization.',
        icon: Code,
        color: 'from-green-500 to-blue-500'
      }
    ];

    const ArchitectureVisual = ({ section }) => {
      const components = {
        orchestrator: (
          <div className="relative w-full h-full">
            {/* Central Brain */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center shadow-2xl shadow-blue-500/30 animate-pulse">
                <Users className="w-12 h-12 text-white" />
              </div>
              <div className="absolute inset-0 rounded-full border-4 border-blue-400/30 animate-ping" />
            </div>
            
            {/* Connection Lines */}
            {[0, 1, 2, 3, 4, 5].map((i) => (
              <div
                key={i}
                className="absolute top-1/2 left-1/2 w-20 h-0.5 bg-gradient-to-r from-blue-400 to-transparent origin-left animate-pulse"
                style={{
                  transform: `translate(-50%, -50%) rotate(${i * 60}deg)`,
                  animationDelay: `${i * 0.2}s`
                }}
              />
            ))}
            
            {/* Satellite Nodes */}
            {[0, 1, 2, 3, 4, 5].map((i) => (
              <div
                key={i}
                className="absolute w-8 h-8 rounded-full bg-blue-400/50 border-2 border-blue-300"
                style={{
                  top: '50%',
                  left: '50%',
                  transform: `translate(-50%, -50%) translate(${Math.cos(i * Math.PI / 3) * 80}px, ${Math.sin(i * Math.PI / 3) * 80}px)`
                }}
              />
            ))}
            
            <div className="absolute bottom-4 left-4 text-xs text-gray-400">
              Request Analysis & Routing
            </div>
          </div>
        ),
        agents: (
          <div className="relative w-full h-full">
            {/* Agent Grid */}
            <div className="grid grid-cols-3 gap-4 h-full p-8">
              {[
                { name: 'NLP Agent', status: 'active', color: 'bg-green-500' },
                { name: 'Vision Agent', status: 'idle', color: 'bg-yellow-500' },
                { name: 'Code Agent', status: 'active', color: 'bg-green-500' },
                { name: 'Data Agent', status: 'processing', color: 'bg-blue-500' },
                { name: 'API Agent', status: 'active', color: 'bg-green-500' },
                { name: 'Custom Agent', status: 'idle', color: 'bg-gray-500' },
              ].map((agent, i) => (
                <div
                  key={i}
                  className="relative p-4 rounded-lg border border-gray-700 bg-gray-800/50 hover:border-purple-500/50 transition-all group"
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className={`w-3 h-3 rounded-full ${agent.color} animate-pulse`} />
                    <Zap className="w-4 h-4 text-purple-400" />
                  </div>
                  <div className="text-xs text-white font-medium">{agent.name}</div>
                  <div className="text-xs text-gray-400 mt-1">{agent.status}</div>
                  
                  {agent.status === 'processing' && (
                    <div className="absolute inset-0 rounded-lg border-2 border-purple-500/50 animate-pulse" />
                  )}
                </div>
              ))}
            </div>
            
            <div className="absolute bottom-4 left-4 text-xs text-gray-400">
              Secure Sandboxed Execution
            </div>
          </div>
        ),
        infrastructure: (
          <div className="relative w-full h-full">
            {/* Infrastructure Layers */}
            <div className="space-y-4 p-8 h-full">
              {[
                { name: 'Memory Layer', items: ['Vector DB', 'Context Store', 'Session Cache'], color: 'border-green-500' },
                { name: 'Tool Layer', items: ['APIs', 'Integrations', 'Connectors'], color: 'border-blue-500' },
                { name: 'Security Layer', items: ['Sandbox', 'Auth', 'Monitoring'], color: 'border-red-500' },
                { name: 'Scale Layer', items: ['Load Balancer', 'Auto-scale', 'Health Check'], color: 'border-yellow-500' }
              ].map((layer, i) => (
                <div key={i} className={`p-4 rounded-lg border-2 ${layer.color} bg-gray-800/30 hover:bg-gray-700/50 transition-all`}>
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="text-sm font-semibold text-white">{layer.name}</h4>
                    <Code className="w-4 h-4 text-green-400" />
                  </div>
                  <div className="flex gap-2">
                    {layer.items.map((item, j) => (
                      <div key={j} className="px-2 py-1 text-xs bg-gray-700 rounded text-gray-300">
                        {item}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            
            <div className="absolute bottom-4 left-4 text-xs text-gray-400">
              Adaptive Resource Management
            </div>
          </div>
        )
      };

      return (
        <div className="w-full h-96 bg-gray-900/30 border border-gray-800 rounded-xl overflow-hidden relative">
          {components[section]}
        </div>
      );
    };

    return (
      <div className="grid lg:grid-cols-2 gap-12 items-start">
        {/* Left Side - Interactive Sections */}
        <div className="space-y-4">
          {sections.map((section) => {
            const Icon = section.icon;
            const isActive = activeSection === section.id;
            
            return (
              <div
                key={section.id}
                className={`p-6 rounded-xl border cursor-pointer transition-all duration-300 group ${
                  isActive 
                    ? 'border-cyan-500/50 bg-gray-800/70 shadow-lg shadow-cyan-500/20' 
                    : 'border-gray-800 bg-gray-900/50 hover:border-gray-700 hover:bg-gray-800/50'
                }`}
                onMouseEnter={() => setActiveSection(section.id)}
              >
                <div className="flex items-start space-x-4">
                  <div className={`p-3 rounded-lg bg-gradient-to-br ${section.color} opacity-90 group-hover:opacity-100 transition-opacity`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className={`text-lg font-semibold mb-2 transition-colors ${
                      isActive ? 'text-cyan-300' : 'text-white group-hover:text-cyan-300'
                    }`}>
                      {section.title}
                    </h3>
                    <p className={`text-sm leading-relaxed transition-colors ${
                      isActive ? 'text-gray-300' : 'text-gray-400 group-hover:text-gray-300'
                    }`}>
                      {section.description}
                    </p>
                  </div>
                  <div className={`transition-transform ${isActive ? 'rotate-90' : 'group-hover:translate-x-1'}`}>
                    <ArrowRight className="w-5 h-5 text-gray-400" />
                  </div>
                </div>
                
                {isActive && (
                  <div className="mt-4 pt-4 border-t border-gray-700">
                    <div className="flex items-center text-xs text-cyan-400">
                      <CheckCircle className="w-3 h-3 mr-2" />
                      <span>Active Component</span>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Right Side - Dynamic Visual */}
        <div className="lg:sticky lg:top-24">
          <ArchitectureVisual section={activeSection} />
          
          {/* Component Info */}
          <div className="mt-6 p-4 bg-gray-900/30 border border-gray-800 rounded-lg">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-semibold text-cyan-300">
                {sections.find(s => s.id === activeSection)?.title}
              </h4>
              <div className="flex items-center text-xs text-gray-400">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse" />
                Live Preview
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const CodeBlock = ({ children }) => (
    <div className="bg-black/80 border border-gray-800 rounded-lg p-4 font-mono text-xs overflow-x-auto backdrop-blur-sm">
      <pre className="text-cyan-300">{children}</pre>
    </div>
  );

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden relative font-sans">
      {/* Animated Background */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-black" />
        
        {/* Floating orbs */}
        <div className="absolute w-64 h-64 bg-cyan-500/20 rounded-full blur-3xl opacity-30 top-10 left-10 animate-pulse" />
        <div className="absolute w-96 h-96 bg-blue-500/20 rounded-full blur-3xl opacity-30 top-60 right-10 animate-pulse" style={{ animationDelay: '2s' }} />
        <div className="absolute w-48 h-48 bg-purple-500/20 rounded-full blur-3xl opacity-30 bottom-20 left-20 animate-pulse" style={{ animationDelay: '4s' }} />
        
        {/* Grid Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div 
            className="absolute inset-0" 
            style={{
              backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.1) 1px, transparent 1px)`,
              backgroundSize: '50px 50px'
            }} 
          />
        </div>
      </div>

      {/* Navigation */}
      <nav className="relative z-50 px-6 py-4 border-b border-gray-800/50 backdrop-blur-md bg-black/80 sticky top-0">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <img src={cordonLogo} alt="Cordon Logo" className="w-8 h-8 rounded-full border border-cyan-500/30" />
            <span className="text-xl font-semibold tracking-tight text-white">
              Cordon
            </span>
          </div>

          <div className="hidden md:flex items-center space-x-6">
            <a href="#how-it-works" className="text-sm text-gray-300 hover:text-white transition-colors font-medium">How It Works</a>
            <a href="#use-cases" className="text-sm text-gray-300 hover:text-white transition-colors font-medium">Use Cases</a>
            <a href="#developers" className="text-sm text-gray-300 hover:text-white transition-colors font-medium">Developers</a>
            <a href="#company" className="text-sm text-gray-300 hover:text-white transition-colors font-medium">Company</a>
          </div>

          <div className="flex items-center space-x-3">
            <button className="hidden md:block px-4 py-2 text-sm rounded-lg border border-gray-700 text-gray-300 hover:border-gray-600 hover:text-white transition-all font-medium">
              Sign In
            </button>
            <button className="px-4 py-2 text-sm rounded-lg bg-white text-black font-medium hover:bg-gray-100 transition-all">
              Request Access
            </button>
            <button 
              className="md:hidden p-2 rounded-lg hover:bg-gray-800 transition-colors"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-black/95 backdrop-blur-md border-b border-gray-800">
            <div className="px-6 py-4 space-y-3">
              <a href="#how-it-works" className="block text-sm text-gray-300 hover:text-white transition-colors">How It Works</a>
              <a href="#use-cases" className="block text-sm text-gray-300 hover:text-white transition-colors">Use Cases</a>
              <a href="#developers" className="block text-sm text-gray-300 hover:text-white transition-colors">Developers</a>
              <a href="#company" className="block text-sm text-gray-300 hover:text-white transition-colors">Company</a>
              <button className="w-full text-left px-4 py-2 border border-gray-700 rounded-lg text-gray-300 hover:border-gray-600 hover:text-white transition-all">
                Sign In
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <ScaleGlowEffect intensity={0.08}>
        <section ref={heroRef} className="relative px-6 py-20 md:py-24 z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-gray-900/60 border border-gray-800 text-xs text-cyan-400 mb-8 backdrop-blur-sm">
              <Zap className="w-3 h-3 mr-2" />
              Next-generation AI orchestration platform
              <span className="ml-2 px-2 py-1 text-xs bg-cyan-500/20 text-cyan-300 rounded-full">NEW</span>
            </div>
            
            {/* Hero Logo */}
            <div className="w-24 h-24 mx-auto mb-12 relative">
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-cyan-500/30 to-blue-600/30 blur-xl animate-pulse" />
              <img 
                src={cordonLogo} 
                alt="Cordon Logo" 
                className="relative w-full h-full rounded-full shadow-2xl shadow-cyan-500/25 border-2 border-cyan-500/50 hover:border-cyan-400/70 transition-all duration-500 hover:scale-105" 
              />
            </div>

            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              The Operating System for{' '}
              <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
                Multi-Agent AI Systems
              </span>
            </h1>
            
            <p className="text-lg md:text-xl text-gray-400 mb-12 max-w-3xl mx-auto leading-relaxed">
              Orchestrate autonomous agents, scale workflows, and deploy intelligence across software and hardware — with Cordon.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button className="px-8 py-4 rounded-lg bg-white text-black font-medium hover:bg-gray-100 transition-all">
                Request Access
                <ArrowRight className="w-4 h-4 ml-2 inline" />
              </button>
              <button className="px-8 py-4 rounded-lg border border-gray-700 text-gray-300 font-medium hover:border-gray-600 hover:text-white transition-all">
                <Play className="w-4 h-4 mr-2 inline" />
                See How It Works
              </button>
            </div>
          </div>
        </section>
      </ScaleGlowEffect>

      {/* Interactive Architecture Section - Scale AI Style */}
      <ScaleGlowEffect intensity={0.06}>
        <section className="relative px-6 py-20 z-10">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Full-Stack AI Orchestration</h2>
              <p className="text-lg text-gray-400 max-w-2xl mx-auto leading-relaxed">
                Experience how Cordon's modular architecture adapts to your workflow needs across every layer of AI automation.
              </p>
            </div>

            <InteractiveArchitecture />
          </div>
        </section>
      </ScaleGlowEffect>


      {/* How It Works Section */}
      <ScaleGlowEffect intensity={0.06}>
        <section id="how-it-works" ref={architectureRef} className="relative px-6 py-20 z-10">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">How It Works</h2>
              <p className="text-lg text-gray-400 max-w-2xl mx-auto leading-relaxed">
                Cordon acts as an intelligent control tower, understanding user intent and coordinating the right agents to solve complex problems.
              </p>
            </div>

            {/* Architecture Diagram */}
            <div className="grid md:grid-cols-3 gap-6 mb-16">
              <AgentCard
                title="Orchestrator"
                description="The central brain that interprets user requests, selects optimal agents, and coordinates complex workflows with intelligent routing."
                icon={Users}
                delay={0}
              />
              <AgentCard
                title="Agents"
                description="Specialized AI workers that handle specific tasks - from LLM-powered reasoning to code execution in secure sandboxes."
                icon={Zap}
                delay={100}
              />
              <AgentCard
                title="Tools"
                description="Extensible APIs, memory systems, and integrations that agents use to interact with the real world and learn over time."
                icon={Code}
                delay={200}
              />
            </div>

            {/* Process Flow */}
            <div className="bg-gray-900/30 border border-gray-800 rounded-xl p-8 backdrop-blur-sm">
              <h3 className="text-xl font-bold mb-8 text-center">Agent Orchestration Process</h3>
              <div className="grid md:grid-cols-5 gap-6 items-center">
                {[
                  { step: '1', title: 'Request Intake', desc: 'User sends high-level request', color: 'from-red-500 to-orange-500' },
                  { step: '2', title: 'Intent Analysis', desc: 'Orchestrator interprets context', color: 'from-orange-500 to-yellow-500' },
                  { step: '3', title: 'Agent Selection', desc: 'Best agents are discovered', color: 'from-yellow-500 to-green-500' },
                  { step: '4', title: 'Secure Execution', desc: 'Agents run in sandboxes', color: 'from-green-500 to-cyan-500' },
                  { step: '5', title: 'Result Delivery', desc: 'Output returned to user', color: 'from-cyan-500 to-blue-500' }
                ].map((item, index) => (
                  <div key={index} className="text-center group">
                    <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${item.color} text-white font-bold text-sm flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform shadow-lg`}>
                      {item.step}
                    </div>
                    <h4 className="font-semibold mb-2 text-sm text-cyan-300 group-hover:text-cyan-200 transition-colors">{item.title}</h4>
                    <p className="text-xs text-gray-400 group-hover:text-gray-300 transition-colors">{item.desc}</p>
                    {index < 4 && (
                      <ArrowRight className="w-5 h-5 text-gray-600 mx-auto mt-4 hidden md:block group-hover:text-gray-500 transition-colors" />
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </ScaleGlowEffect>

      {/* Use Cases Section */}
      <ScaleGlowEffect intensity={0.06}>
        <section id="use-cases" className="relative px-6 py-20 z-10">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Use Cases</h2>
              <p className="text-lg text-gray-400 max-w-2xl mx-auto leading-relaxed">
                From enterprise workflows to robotics coordination, Cordon adapts to any domain requiring intelligent automation.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  title: 'Enterprise Automation',
                  description: 'Automate document processing, financial analysis, and complex business workflows with intelligent agent coordination.',
                  gradient: 'from-purple-500 to-pink-500',
                  icon: '🏢'
                },
                {
                  title: 'Robotics Orchestration',
                  description: 'Coordinate physical robots and autonomous systems with software agents for comprehensive automation solutions.',
                  gradient: 'from-cyan-500 to-blue-500',
                  icon: '🤖'
                },
                {
                  title: 'AI Workflow Management',
                  description: 'Build sophisticated AI pipelines that adapt and scale automatically based on workload and requirements.',
                  gradient: 'from-green-500 to-teal-500',
                  icon: '⚡'
                },
                {
                  title: 'Control Systems',
                  description: 'Manage complex control systems with intelligent decision-making and real-time adaptation capabilities.',
                  gradient: 'from-orange-500 to-red-500',
                  icon: '🎛️'
                },
                {
                  title: 'Financial Analysis',
                  description: 'Deploy specialized agents for market analysis, risk assessment, and automated trading strategies.',
                  gradient: 'from-blue-500 to-indigo-500',
                  icon: '📊'
                },
                {
                  title: 'Custom Integrations',
                  description: 'Build tailored solutions with our extensible platform and comprehensive developer toolkit.',
                  gradient: 'from-teal-500 to-cyan-500',
                  icon: '🔧'
                }
              ].map((useCase, index) => (
                <div key={index} className="p-6 rounded-xl border border-gray-800 bg-gray-900/50 backdrop-blur-sm hover:border-gray-700 transition-all duration-300 group cursor-pointer transform hover:scale-105 hover:shadow-xl hover:shadow-cyan-500/10">
                  <div className="text-2xl mb-4 group-hover:scale-110 transition-transform">
                    {useCase.icon}
                  </div>
                  <h3 className="text-lg font-semibold mb-3 group-hover:text-cyan-300 transition-colors">
                    {useCase.title}
                  </h3>
                  <p className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors leading-relaxed">
                    {useCase.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </ScaleGlowEffect>
      {/* Why Cordon Section */}
      <ScaleGlowEffect intensity={0.06}>
        <section className="relative px-6 py-20 z-10">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Cordon</h2>
              <p className="text-lg text-gray-400 max-w-2xl mx-auto leading-relaxed">
                Built for enterprises that need reliable, secure, and scalable AI orchestration.
              </p>
            </div>

           <div className="grid md:grid-cols-3 gap-8">
             <div className="p-8 rounded-xl border border-gray-800 bg-gray-900/50 backdrop-blur-sm hover:border-gray-700 transition-all duration-300 group">
               <Shield className="w-12 h-12 text-cyan-400 mb-6 group-hover:scale-110 transition-transform" />
               <h3 className="text-xl font-bold mb-4 group-hover:text-cyan-300 transition-colors">Security First</h3>
               <p className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors leading-relaxed mb-6">
                 All agents run in secure sandboxes with controlled access to resources, ensuring enterprise-grade security and compliance.
               </p>
               <div className="space-y-2">
                 <div className="flex items-center text-xs text-cyan-400">
                   <CheckCircle className="w-3 h-3 mr-2" />
                   <span>End-to-end encryption</span>
                 </div>
                 <div className="flex items-center text-xs text-cyan-400">
                   <CheckCircle className="w-3 h-3 mr-2" />
                   <span>Isolated execution environments</span>
                 </div>
                 <div className="flex items-center text-xs text-cyan-400">
                   <CheckCircle className="w-3 h-3 mr-2" />
                   <span>SOC 2 Type II compliance</span>
                 </div>
               </div>
             </div>

             <div className="p-8 rounded-xl border border-gray-800 bg-gray-900/50 backdrop-blur-sm hover:border-gray-700 transition-all duration-300 group">
               <Zap className="w-12 h-12 text-cyan-400 mb-6 group-hover:scale-110 transition-transform" />
               <h3 className="text-xl font-bold mb-4 group-hover:text-cyan-300 transition-colors">Extensible Platform</h3>
               <p className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors leading-relaxed mb-6">
                 Upload custom agents and tools to create specialized workflows tailored to your specific business needs.
               </p>
               <div className="space-y-2">
                 <div className="flex items-center text-xs text-cyan-400">
                   <CheckCircle className="w-3 h-3 mr-2" />
                   <span>Custom agent marketplace</span>
                 </div>
                 <div className="flex items-center text-xs text-cyan-400">
                   <CheckCircle className="w-3 h-3 mr-2" />
                   <span>Plugin architecture</span>
                 </div>
                 <div className="flex items-center text-xs text-cyan-400">
                   <CheckCircle className="w-3 h-3 mr-2" />
                   <span>API-first integrations</span>
                 </div>
               </div>
             </div>

             <div className="p-8 rounded-xl border border-gray-800 bg-gray-900/50 backdrop-blur-sm hover:border-gray-700 transition-all duration-300 group">
               <Code className="w-12 h-12 text-cyan-400 mb-6 group-hover:scale-110 transition-transform" />
               <h3 className="text-xl font-bold mb-4 group-hover:text-cyan-300 transition-colors">Context-Aware</h3>
               <p className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors leading-relaxed mb-6">
                 Advanced memory and context systems enable agents to learn and adapt, providing personalized automation over time.
               </p>
               <div className="space-y-2">
                 <div className="flex items-center text-xs text-cyan-400">
                   <CheckCircle className="w-3 h-3 mr-2" />
                   <span>Persistent memory</span>
                 </div>
                 <div className="flex items-center text-xs text-cyan-400">
                   <CheckCircle className="w-3 h-3 mr-2" />
                   <span>Contextual learning</span>
                 </div>
                 <div className="flex items-center text-xs text-cyan-400">
                   <CheckCircle className="w-3 h-3 mr-2" />
                   <span>Adaptive workflows</span>
                 </div>
               </div>
             </div>
           </div>
         </div>
       </section>
     </ScaleGlowEffect>

     {/* Developer SDK Section */}
     <ScaleGlowEffect intensity={0.06}>
       <section id="developers" className="relative px-6 py-20 z-10">
         <div className="max-w-6xl mx-auto">
           <div className="text-center mb-16">
             <h2 className="text-3xl md:text-4xl font-bold mb-4">Developer SDK & Agent Store</h2>
             <p className="text-lg text-gray-400 max-w-2xl mx-auto leading-relaxed">
               Build, share, and monetize intelligent agents with our comprehensive development platform.
             </p>
           </div>

           <div className="grid lg:grid-cols-2 gap-12 items-center">
             <div>
               <h3 className="text-2xl font-bold mb-6">Upload Custom Agents</h3>
               <p className="text-gray-400 mb-8 leading-relaxed">
                 Create specialized agents for your domain and share them with the Cordon community. Our platform handles sandboxing, discovery, and execution.
               </p>
               
               <CodeBlock>
{`// Upload a custom agent
import { CordonAgent } from '@cordon/sdk';

class MarketAnalyst extends CordonAgent {
 async execute(request) {
   const data = await this.tools.fetchMarketData();
   const analysis = await this.analyze(data, request.parameters);
   
   return {
     insights: analysis.insights,
     recommendations: analysis.recommendations,
     confidence: analysis.confidence
   };
 }
}

// Register and deploy
await cordon.agents.upload(MarketAnalyst, {
 name: "Market Analyst Pro",
 description: "Advanced market analysis agent",
 category: "finance"
});`}
               </CodeBlock>

               <div className="mt-8 flex gap-4">
                 <button className="px-6 py-3 rounded-lg bg-white text-black font-medium hover:bg-gray-100 transition-all">
                   Get SDK Access
                 </button>
                 <button className="px-6 py-3 rounded-lg border border-gray-700 text-gray-300 font-medium hover:border-gray-600 hover:text-white transition-all">
                   View Documentation
                 </button>
               </div>
             </div>

             <div className="space-y-6">
               <div className="p-6 rounded-xl bg-gray-900/50 border border-gray-800 hover:border-gray-700 transition-all">
                 <div className="flex items-center mb-3">
                   <Shield className="w-6 h-6 text-cyan-400 mr-3" />
                   <h4 className="font-semibold text-cyan-300">Sandboxed Execution</h4>
                 </div>
                 <p className="text-sm text-gray-400">All agents run in secure, isolated environments with controlled resource access and monitoring.</p>
               </div>

               <div className="p-6 rounded-xl bg-gray-900/50 border border-gray-800 hover:border-gray-700 transition-all">
                 <div className="flex items-center mb-3">
                   <Star className="w-6 h-6 text-cyan-400 mr-3" />
                   <h4 className="font-semibold text-cyan-300">Auto Discovery</h4>
                 </div>
                 <p className="text-sm text-gray-400">Vector-based agent matching ensures the right agent is selected for each task automatically.</p>
               </div>

               <div className="p-6 rounded-xl bg-gray-900/50 border border-gray-800 hover:border-gray-700 transition-all">
                 <div className="flex items-center mb-3">
                   <Users className="w-6 h-6 text-cyan-400 mr-3" />
                   <h4 className="font-semibold text-cyan-300">Revenue Sharing</h4>
                 </div>
                 <p className="text-sm text-gray-400">Monetize your agents through our marketplace with transparent revenue sharing and analytics.</p>
               </div>
             </div>
           </div>
         </div>
       </section>
     </ScaleGlowEffect>

     {/* Stats Section */}
     <ScaleGlowEffect intensity={0.05}>
       <section className="relative px-6 py-20 z-10">
         <div className="max-w-6xl mx-auto">
           <div className="bg-gray-900/30 border border-gray-800 rounded-xl p-12 backdrop-blur-sm">
             <div className="grid md:grid-cols-4 gap-8 text-center">
               <div>
                 <div className="text-3xl font-bold text-cyan-400 mb-2">10M+</div>
                 <div className="text-sm text-gray-400">Agent Executions</div>
               </div>
               <div>
                 <div className="text-3xl font-bold text-cyan-400 mb-2">500+</div>
                 <div className="text-sm text-gray-400">Custom Agents</div>
               </div>
               <div>
                 <div className="text-3xl font-bold text-cyan-400 mb-2">99.9%</div>
                 <div className="text-sm text-gray-400">Uptime SLA</div>
               </div>
               <div>
                 <div className="text-3xl font-bold text-cyan-400 mb-2">24/7</div>
                 <div className="text-sm text-gray-400">Support</div>
               </div>
             </div>
           </div>
         </div>
       </section>
     </ScaleGlowEffect>

     {/* Trusted By Section */}
     <section className="relative px-6 py-20 z-10">
       <div className="max-w-6xl mx-auto text-center">
         <h2 className="text-lg font-semibold mb-12 text-gray-400">Trusted by AI-first companies</h2>
         <div className="grid grid-cols-2 md:grid-cols-5 gap-8 items-center opacity-50">
           {[1, 2, 3, 4, 5].map((i) => (
             <div key={i} className="h-12 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-gray-700 transition-all cursor-pointer">
               <div className="text-gray-500 font-bold text-sm">LOGO {i}</div>
             </div>
           ))}
         </div>
       </div>
     </section>

     {/* Testimonials */}
     <ScaleGlowEffect intensity={0.06}>
       <section className="relative px-6 py-20 z-10">
         <div className="max-w-6xl mx-auto">
           <div className="text-center mb-16">
             <h2 className="text-3xl md:text-4xl font-bold mb-4">What Our Users Say</h2>
           </div>
           
           <div className="grid md:grid-cols-3 gap-6">
             {[
               {
                 quote: "Cordon transformed our AI workflow from chaos to orchestrated precision. We've seen 300% improvement in task completion rates.",
                 author: "Sarah Chen",
                 role: "CTO at TechFlow AI",
                 avatar: "👩‍💼"
               },
               {
                 quote: "The agent marketplace is revolutionary. We've built custom financial analysis agents that generate $2M+ in insights monthly.",
                 author: "Marcus Rodriguez",
                 role: "Head of AI at FinanceCore",
                 avatar: "👨‍💻"
               },
               {
                 quote: "Security was our biggest concern with AI automation. Cordon's sandboxing gives us enterprise-grade confidence.",
                 author: "Dr. Emily Watson",
                 role: "CISO at SecureBank",
                 avatar: "👩‍🔬"
               }
             ].map((testimonial, index) => (
               <div key={index} className="p-6 rounded-xl border border-gray-800 bg-gray-900/50 backdrop-blur-sm hover:border-gray-700 transition-all">
                 <div className="text-3xl mb-4">"</div>
                 <p className="text-sm text-gray-300 mb-6 leading-relaxed italic">
                   {testimonial.quote}
                 </p>
                 <div className="flex items-center">
                   <div className="text-2xl mr-3">{testimonial.avatar}</div>
                   <div>
                     <div className="font-semibold text-white text-sm">{testimonial.author}</div>
                     <div className="text-xs text-gray-400">{testimonial.role}</div>
                   </div>
                 </div>
               </div>
             ))}
           </div>
         </div>
       </section>
     </ScaleGlowEffect>

     {/* CTA Section */}
     <ScaleGlowEffect intensity={0.08}>
       <section className="relative px-6 py-20 z-10">
         <div className="max-w-4xl mx-auto text-center">
           <div className="p-12 rounded-xl border border-gray-800 bg-gray-900/50 backdrop-blur-sm">
             <h2 className="text-3xl md:text-4xl font-bold mb-6">
               Ready to orchestrate the future?
             </h2>
             <p className="text-lg text-gray-400 mb-10 max-w-2xl mx-auto leading-relaxed">
               Join the next generation of AI automation. Request early access to Cordon and transform your workflows today.
             </p>
             <div className="flex flex-col sm:flex-row gap-4 justify-center">
               <button className="px-8 py-4 rounded-lg bg-white text-black font-medium hover:bg-gray-100 transition-all">
                 Request Early Access
                 <ArrowRight className="w-4 h-4 ml-2 inline" />
               </button>
               <button className="px-8 py-4 rounded-lg border border-gray-700 text-gray-300 font-medium hover:border-gray-600 hover:text-white transition-all">
                 Schedule Demo
               </button>
             </div>
             
             <div className="mt-8 text-sm text-gray-500">
               <p>🚀 Join 1000+ companies already on the waitlist</p>
             </div>
           </div>
         </div>
       </section>
     </ScaleGlowEffect>

     {/* Footer */}
     <footer className="relative px-6 py-16 border-t border-gray-800 z-10">
       <div className="max-w-6xl mx-auto">
         <div className="grid md:grid-cols-4 gap-8 mb-12">
           <div className="col-span-2">
             <div className="flex items-center space-x-3 mb-6">
               <img src={cordonLogo} alt="Cordon Logo" className="w-6 h-6 rounded-full" />
               <span className="text-lg font-semibold">Cordon</span>
             </div>
             <p className="text-sm text-gray-400 mb-6 max-w-md leading-relaxed">
               Cordon is a modular AI orchestration platform for next-gen agent systems. Build, deploy, and scale intelligent automation across any domain.
             </p>
             <div className="flex space-x-4">
               <a href="#" className="p-2 rounded-lg bg-gray-800 hover:bg-gray-700 transition-colors">
                 <Twitter className="w-4 h-4" />
               </a>
               <a href="#" className="p-2 rounded-lg bg-gray-800 hover:bg-gray-700 transition-colors">
                 <Github className="w-4 h-4" />
               </a>
               <a href="#" className="p-2 rounded-lg bg-gray-800 hover:bg-gray-700 transition-colors">
                 <Linkedin className="w-4 h-4" />
               </a>
             </div>
           </div>

           <div>
             <h4 className="font-semibold mb-4 text-sm">Product</h4>
             <div className="space-y-2">
               <a href="#" className="block text-sm text-gray-400 hover:text-white transition-colors">Platform</a>
               <a href="#" className="block text-sm text-gray-400 hover:text-white transition-colors">SDK</a>
               <a href="#" className="block text-sm text-gray-400 hover:text-white transition-colors">Agent Store</a>
               <a href="#" className="block text-sm text-gray-400 hover:text-white transition-colors">Pricing</a>
               <a href="#" className="block text-sm text-gray-400 hover:text-white transition-colors">Enterprise</a>
             </div>
           </div>

           <div>
             <h4 className="font-semibold mb-4 text-sm">Company</h4>
             <div className="space-y-2">
               <a href="#" className="block text-sm text-gray-400 hover:text-white transition-colors">About</a>
               <a href="#" className="block text-sm text-gray-400 hover:text-white transition-colors">Blog</a>
               <a href="#" className="block text-sm text-gray-400 hover:text-white transition-colors">Careers</a>
               <a href="#" className="block text-sm text-gray-400 hover:text-white transition-colors">Contact</a>
               <a href="#" className="block text-sm text-gray-400 hover:text-white transition-colors">Press</a>
             </div>
           </div>
         </div>

         <div className="pt-8 border-t border-gray-800">
           <div className="flex flex-col md:flex-row justify-between items-center">
             <div className="text-sm text-gray-400 mb-4 md:mb-0">
               © 2025 Cordon AI Systems. All rights reserved.
             </div>
             <div className="flex space-x-6">
               <a href="#" className="text-sm text-gray-400 hover:text-white transition-colors">Privacy Policy</a>
               <a href="#" className="text-sm text-gray-400 hover:text-white transition-colors">Terms of Service</a>
               <a href="#" className="text-sm text-gray-400 hover:text-white transition-colors">Security</a>
             </div>
           </div>
         </div>
       </div>
     </footer>
   </div>
 );
};

export default App;