import React, { useState, useEffect } from 'react';
import Logo from './Logo';
import { Menu, X } from 'lucide-react';

const Header: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Platform', href: '#' },
    { name: 'Solutions', href: '#' },
    { name: 'Customers', href: '#' },
    { name: 'Docs', href: '#' },
  ];

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-slate-950/80 backdrop-blur-lg border-b border-slate-800/50' : 'bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <div className="flex-shrink-0 cursor-pointer">
          <Logo className="h-10 w-auto" />
        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map(link => (
            <a key={link.name} href={link.href} className="text-sm font-medium text-slate-300 hover:text-cordon-300 transition-colors">
              {link.name}
            </a>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-4">
          <button className="text-sm font-medium text-white hover:text-cordon-300 transition-colors">Log In</button>
          <button className="text-sm font-semibold bg-white text-slate-950 px-5 py-2.5 rounded-full hover:bg-cordon-100 hover:text-cordon-900 transition-all shadow-[0_0_15px_rgba(255,255,255,0.2)]">
            Book Demo
          </button>
        </div>

        {/* Mobile Menu Toggle */}
        <button className="md:hidden text-slate-200" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          {mobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Nav */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-20 left-0 w-full bg-slate-950 border-b border-slate-800 p-6 flex flex-col gap-4 animate-in slide-in-from-top-2">
          {navLinks.map(link => (
            <a key={link.name} href={link.href} className="text-lg font-medium text-slate-300 py-2 border-b border-slate-800">
              {link.name}
            </a>
          ))}
          <div className="flex flex-col gap-3 mt-4">
            <button className="w-full text-center py-3 text-slate-200 bg-slate-900 rounded-lg">Log In</button>
            <button className="w-full text-center py-3 bg-cordon-600 text-white rounded-lg">Book Demo</button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;