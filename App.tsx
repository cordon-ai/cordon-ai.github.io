
import React, { Suspense } from 'react';
import { HashRouter } from 'react-router-dom';
import Header from './components/Header';
import InteractiveDemo from './components/InteractiveDemo';
import ArchitectureStack from './components/ArchitectureStack';
import Features from './components/Features';
import Footer from './components/Footer';
import { ChevronRight } from 'lucide-react';

const OrbBackground = React.lazy(() => import('./components/OrbBackground'));
const Orb = React.lazy(() => import('./components/Orb'));

const App: React.FC = () => {
  return (
    <HashRouter>
      <div className="min-h-screen bg-slate-950 text-white selection:bg-cordon-500/30 selection:text-cordon-200 relative">
        <Suspense fallback={null}>
          <OrbBackground />
        </Suspense>
        
        <Header />

        <main>
          {/* Hero Section */}
          <section className="relative h-[800px] flex flex-col items-center justify-center text-center z-10 overflow-hidden">
            
            {/* Main Orb Behind Text */}
            <Suspense fallback={null}>
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] md:w-[900px] md:h-[900px] z-0 pointer-events-auto">
                <Orb hue={0} hoverIntensity={0.3} />
              </div>
            </Suspense>

            {/* Content Content - Pointer events none on container to let clicks pass to Orb where possible, auto on interactables */}
            <div className="relative z-10 flex flex-col items-center max-w-5xl mx-auto px-6 pointer-events-none">
              
              <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-b from-white to-slate-300 drop-shadow-2xl">
                Structure Your <br /> Enterprise Reality.
              </h1>
              
              <p className="text-lg md:text-xl text-slate-300 max-w-2xl mb-10 leading-relaxed drop-shadow-lg">
                Cordon captures, indexes, and monetizes the dormant data within your organization. 
                Turn emails, calls, and docs into a real-time AI knowledge base.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 pointer-events-auto">
                <button className="group relative px-8 py-4 bg-white text-slate-950 text-base font-bold rounded-lg hover:bg-slate-100 transition-all flex items-center gap-2 shadow-[0_0_20px_rgba(255,255,255,0.3)]">
                  Start Integration
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
                <button className="px-8 py-4 bg-slate-950/40 text-white border border-slate-600 hover:border-slate-400 hover:bg-slate-900/60 transition-all rounded-lg backdrop-blur-md">
                  Read Documentation
                </button>
              </div>
            </div>
          </section>

          {/* Demo Section */}
          <section className="py-20 px-4 relative z-20">
            <div className="max-w-4xl mx-auto text-center mb-10">
              <h2 className="text-2xl font-semibold text-white mb-2">Ask Your Data</h2>
              <p className="text-slate-400">Experience the power of semantic retrieval on our simulated dataset.</p>
            </div>
            <InteractiveDemo />
          </section>

          {/* Architecture Stack Section */}
          <ArchitectureStack />

          {/* Features Grid */}
          <Features />

        </main>
        
        <Footer />
      </div>
    </HashRouter>
  );
};

export default App;
