import React from 'react';
import Logo from './Logo';

const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-950 border-t border-slate-800 pt-16 pb-8 relative z-10">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
        <div className="col-span-1 md:col-span-1">
          <Logo className="h-8 mb-6" />
          <p className="text-slate-400 text-sm leading-relaxed">
            Transforming enterprise chaos into structured intelligence. The backbone of the AI-native organization.
          </p>
        </div>
        
        <div>
          <h4 className="text-white font-semibold mb-4">Product</h4>
          <ul className="space-y-2 text-sm text-slate-400">
            <li><a href="#" className="hover:text-cordon-300">Data Capture</a></li>
            <li><a href="#" className="hover:text-cordon-300">Knowledge Graph</a></li>
            <li><a href="#" className="hover:text-cordon-300">Fine-Tuning API</a></li>
            <li><a href="#" className="hover:text-cordon-300">Monetization</a></li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-semibold mb-4">Company</h4>
          <ul className="space-y-2 text-sm text-slate-400">
            <li><a href="#" className="hover:text-cordon-300">About</a></li>
            <li><a href="#" className="hover:text-cordon-300">Careers</a></li>
            <li><a href="#" className="hover:text-cordon-300">Security</a></li>
            <li><a href="#" className="hover:text-cordon-300">Contact</a></li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-semibold mb-4">Legal</h4>
          <ul className="space-y-2 text-sm text-slate-400">
            <li><a href="#" className="hover:text-cordon-300">Privacy Policy</a></li>
            <li><a href="#" className="hover:text-cordon-300">Terms of Service</a></li>
            <li><a href="#" className="hover:text-cordon-300">GDPR Compliance</a></li>
          </ul>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto px-6 border-t border-slate-900 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-slate-600">
        <p>&copy; {new Date().getFullYear()} Cordon AI, Inc. All rights reserved.</p>
        <p className="mt-2 md:mt-0">Designed for the future of work.</p>
      </div>
    </footer>
  );
};

export default Footer;