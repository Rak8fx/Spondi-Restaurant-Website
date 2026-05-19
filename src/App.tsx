import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Home from './pages/Home';
import Menu from './pages/Menu';
import About from './pages/About';
import Reservations from './pages/Reservations';
import Contact from './pages/Contact';
import spondiLogo from './spondi-logo.png';

function NavBar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === '/';

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => { setMenuOpen(false); }, [location]);

  const links = [
    { to: '/', label: 'Αρχική' },
    { to: '/menu', label: 'Μενού' },
    { to: '/about', label: 'Ιστορία' },
    { to: '/reservations', label: 'Κράτηση' },
    { to: '/contact', label: 'Επικοινωνία' },
  ];

  const navBg = (!isHome || scrolled)
    ? 'bg-[#1a0a00]/95 backdrop-blur-md shadow-lg'
    : 'bg-transparent';

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${navBg}`}>
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between h-20">
        <Link to="/" className="flex items-center gap-3 group">
          <img src={spondiLogo} alt="Σπονδή" className="h-12 w-12 object-contain rounded-full bg-white/10 p-1" />
          <div>
            <div className="font-serif text-xl text-[#d4a853] tracking-widest">ΣΠΟΝΔΗ</div>
            <div className="text-[10px] text-[#d4a853]/60 tracking-[0.3em] uppercase">Νάουσα</div>
          </div>
        </Link>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-8">
          {links.map(l => (
            <Link
              key={l.to}
              to={l.to}
              className={`text-sm tracking-widest uppercase transition-colors duration-200 ${
                location.pathname === l.to
                  ? 'text-[#d4a853]'
                  : 'text-white/80 hover:text-[#d4a853]'
              }`}
            >
              {l.label}
            </Link>
          ))}
          <Link
            to="/reservations"
            className="ml-4 px-5 py-2 border border-[#d4a853] text-[#d4a853] text-xs tracking-widest uppercase hover:bg-[#d4a853] hover:text-[#1a0a00] transition-all duration-300"
          >
            Κράτηση Τραπεζιού
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-2"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Menu"
        >
          <span className={`block w-6 h-0.5 bg-[#d4a853] transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
          <span className={`block w-6 h-0.5 bg-[#d4a853] transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`} />
          <span className={`block w-6 h-0.5 bg-[#d4a853] transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-[#1a0a00]/98 border-t border-[#d4a853]/20"
          >
            <div className="flex flex-col py-6 px-6 gap-5">
              {links.map(l => (
                <Link
                  key={l.to}
                  to={l.to}
                  className={`text-sm tracking-widest uppercase py-2 border-b border-white/5 ${
                    location.pathname === l.to ? 'text-[#d4a853]' : 'text-white/80'
                  }`}
                >
                  {l.label}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

function Footer() {
  return (
    <footer className="bg-[#0e0500] border-t border-[#d4a853]/20 py-16 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">
        <div>
          <div className="font-serif text-2xl text-[#d4a853] tracking-widest mb-2">ΣΠΟΝΔΗ</div>
          <div className="text-[#d4a853]/50 text-xs tracking-[0.3em] uppercase mb-4">Ταβέρνα · Νάουσα</div>
          <p className="text-white/50 text-sm leading-relaxed">
            Παραδοσιακές γεύσεις της Νάουσας με αγάπη και σεβασμό στην τοπική παράδοση.
          </p>
        </div>
        <div>
          <div className="text-[#d4a853] text-xs tracking-widest uppercase mb-4">Επικοινωνία</div>
          <div className="space-y-2 text-white/60 text-sm">
            <p>📍 Πλατεία Καρατάσου 17, Νάουσα 59200</p>
            <p>📞 +30 2332 022233</p>
            <p>🕐 Τετ–Κυρ: 12:00 – 00:00</p>
            <p className="text-white/40">Κλειστά: Δευτέρα & Τρίτη</p>
          </div>
        </div>
        <div>
          <div className="text-[#d4a853] text-xs tracking-widest uppercase mb-4">Σύνδεσμοι</div>
          <div className="space-y-2">
            {[['/', 'Αρχική'], ['/menu', 'Μενού'], ['/about', 'Ιστορία'], ['/reservations', 'Κράτηση'], ['/contact', 'Επικοινωνία']].map(([to, label]) => (
              <div key={to}>
                <Link to={to} className="text-white/50 hover:text-[#d4a853] text-sm transition-colors">{label}</Link>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-white/5 text-center text-white/20 text-xs tracking-widest">
        © 2025 ΣΠΟΝΔΗ — Νάουσα Ημαθίας · Με αγάπη για την παράδοση
      </div>
    </footer>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-[#0e0500] text-white">
        <NavBar />
        <AnimatePresence mode="wait">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/menu" element={<Menu />} />
            <Route path="/about" element={<About />} />
            <Route path="/reservations" element={<Reservations />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </AnimatePresence>
        <Footer />
      </div>
    </BrowserRouter>
  );
}
