import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.8, delay: i * 0.15, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] } }),
};

function ReviewCard({ review }: { review: any }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="bg-white/5 border border-[#d4a853]/20 p-8 rounded-sm flex flex-col gap-4"
    >
      <div className="flex gap-1">
        {Array.from({ length: review.rating }).map((_, i) => (
          <span key={i} className="text-[#d4a853] text-lg">★</span>
        ))}
      </div>
      <p className="text-white/70 text-sm leading-relaxed italic">"{review.text}"</p>
      <div className="mt-auto">
        <div className="text-[#d4a853] text-sm font-medium">{review.author}</div>
        <div className="text-white/30 text-xs">{review.origin}</div>
      </div>
    </motion.div>
  );
}

export default function Home() {
  const [reviews, setReviews] = useState<any[]>([]);
  const [featuredMenu, setFeaturedMenu] = useState<any[]>([]);
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetch('/api/reviews').then(r => r.json()).then(d => setReviews(Array.isArray(d) ? d.slice(0, 3) : []));
    fetch('/api/menu').then(r => r.json()).then(d => setFeaturedMenu(Array.isArray(d) ? d.filter((m: any) => m.featured).slice(0, 4) : []));
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (heroRef.current) {
        heroRef.current.style.transform = `translateY(${window.scrollY * 0.4}px)`;
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.5 }}>
      {/* HERO */}
      <section className="relative h-screen overflow-hidden flex items-center justify-center">
        <div ref={heroRef} className="absolute inset-0 will-change-transform">
          <img src="/images/hero-bg.jpg" alt="Νάουσα" className="w-full h-full object-cover scale-110" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#1a0a00]/70 via-[#1a0a00]/50 to-[#0e0500]" />
        </div>

        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
          <motion.div custom={0} variants={fadeUp} initial="hidden" animate="visible"
            className="text-[#d4a853]/80 text-xs tracking-[0.5em] uppercase mb-6">
            Από το 1987 · Νάουσα Ημαθίας
          </motion.div>
          <motion.h1 custom={1} variants={fadeUp} initial="hidden" animate="visible"
            className="font-serif text-7xl md:text-9xl text-white tracking-wider mb-6" style={{ fontFamily: 'Georgia, serif' }}>
            ΣΠΟΝΔΗ
          </motion.h1>
          <motion.div custom={2} variants={fadeUp} initial="hidden" animate="visible"
            className="w-24 h-px bg-[#d4a853] mx-auto mb-6" />
          <motion.p custom={3} variants={fadeUp} initial="hidden" animate="visible"
            className="text-white/70 text-lg md:text-xl leading-relaxed mb-10 max-w-2xl mx-auto">
            Αυθεντικές γεύσεις της Μακεδονίας, τοπικά κρασιά Ξινόμαυρου
            και παράδοση που ζει σε κάθε πιάτο.
          </motion.p>
          <motion.div custom={4} variants={fadeUp} initial="hidden" animate="visible" className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/reservations"
              className="px-10 py-4 bg-[#d4a853] text-[#1a0a00] text-sm tracking-widest uppercase font-semibold hover:bg-[#e8c06a] transition-all duration-300">
              Κράτηση Τραπεζιού
            </Link>
            <Link to="/menu"
              className="px-10 py-4 border border-white/40 text-white text-sm tracking-widest uppercase hover:border-[#d4a853] hover:text-[#d4a853] transition-all duration-300">
              Δείτε το Μενού
            </Link>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/30"
        >
          <div className="w-px h-12 bg-gradient-to-b from-transparent to-[#d4a853]/60" />
          <span className="text-[10px] tracking-widest uppercase">Scroll</span>
        </motion.div>
      </section>

      {/* INFO STRIP */}
      <section className="bg-[#d4a853] py-5">
        <div className="max-w-7xl mx-auto px-6 flex flex-wrap justify-center gap-8 md:gap-16">
          {[
            ['📍', 'Πλατεία Καρατάσου 17, Νάουσα'],
            ['📞', '+30 2332 022233'],
            ['🕐', 'Τετ–Κυρ: 12:00 – 00:00'],
            ['🍷', 'Τοπικά Κρασιά Ξινόμαυρου'],
          ].map(([icon, text]) => (
            <div key={text} className="flex items-center gap-2 text-[#1a0a00] text-sm font-medium">
              <span>{icon}</span><span>{text}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ABOUT TEASER */}
      <section className="py-28 px-6">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <motion.div initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
            <div className="relative">
              <img src="/images/interior.jpg" alt="Εσωτερικό" className="w-full h-[500px] object-cover" />
              <div className="absolute -bottom-6 -right-6 bg-[#d4a853] p-8 hidden md:block">
                <div className="font-serif text-4xl text-[#1a0a00] font-bold">35+</div>
                <div className="text-[#1a0a00]/70 text-xs tracking-widest uppercase">Χρόνια Παράδοσης</div>
              </div>
            </div>
          </motion.div>
          <motion.div initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
            <div className="text-[#d4a853] text-xs tracking-[0.4em] uppercase mb-4">Η Ιστορία μας</div>
            <h2 className="font-serif text-4xl md:text-5xl text-white mb-6 leading-tight" style={{ fontFamily: 'Georgia, serif' }}>
              Μια Ταβέρνα<br />με Ψυχή
            </h2>
            <div className="w-16 h-px bg-[#d4a853] mb-6" />
            <p className="text-white/60 leading-relaxed mb-4">
              Η Σπονδή γεννήθηκε από την αγάπη για τις αυθεντικές γεύσεις της Νάουσας. Από το 1987, η οικογένεια Χατζηστυλλή σερβίρει πιάτα που σέβονται την παράδοση και τιμούν τα τοπικά προϊόντα της Ημαθίας.
            </p>
            <p className="text-white/60 leading-relaxed mb-8">
              Κάθε πιάτο μαγειρεύεται με αγάπη, χρησιμοποιώντας φρέσκα υλικά από τοπικούς παραγωγούς. Συνοδεύεται από επιλεγμένα κρασιά Ξινόμαυρου — την περηφάνια της Νάουσας.
            </p>
            <Link to="/about"
              className="inline-flex items-center gap-3 text-[#d4a853] text-sm tracking-widest uppercase hover:gap-5 transition-all duration-300">
              Μάθετε Περισσότερα <span>→</span>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* FEATURED DISHES */}
      <section className="py-24 px-6 bg-[#140800]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              className="text-[#d4a853] text-xs tracking-[0.4em] uppercase mb-4">Επιλεγμένα Πιάτα</motion.div>
            <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}
              className="font-serif text-4xl md:text-5xl text-white" style={{ fontFamily: 'Georgia, serif' }}>
              Γεύσεις που Αγαπάμε
            </motion.h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredMenu.length > 0 ? featuredMenu.map((item: any, i: number) => (
              <motion.div key={item.id}
                initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group overflow-hidden"
              >
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={item.image_url || `/images/food${(i % 4) + 1}.jpg`}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0e0500] via-transparent to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <div className="text-[#d4a853] text-xs tracking-widest uppercase mb-1">{item.category}</div>
                    <div className="text-white font-medium">{item.name}</div>
                    <div className="text-[#d4a853] font-semibold mt-1">{item.price}€</div>
                  </div>
                </div>
              </motion.div>
            )) : [
              { name: 'Αρνάκι στη Λαδόκολλα', cat: 'Κυρίως', img: '/images/food2.jpg', price: '14' },
              { name: 'Μεζεδοπιατέλα', cat: 'Ορεκτικά', img: '/images/food3.jpg', price: '12' },
              { name: 'Κοκκινιστό Μοσχάρι', cat: 'Κυρίως', img: '/images/food4.jpg', price: '13' },
              { name: 'Κρασί Ξινόμαυρο', cat: 'Κρασιά', img: '/images/wine.jpg', price: '18' },
            ].map((item, i) => (
              <motion.div key={i}
                initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group overflow-hidden"
              >
                <div className="relative h-64 overflow-hidden">
                  <img src={item.img} alt={item.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0e0500] via-transparent to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <div className="text-[#d4a853] text-xs tracking-widest uppercase mb-1">{item.cat}</div>
                    <div className="text-white font-medium">{item.name}</div>
                    <div className="text-[#d4a853] font-semibold mt-1">{item.price}€</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          <div className="text-center mt-12">
            <Link to="/menu"
              className="inline-block px-10 py-4 border border-[#d4a853] text-[#d4a853] text-sm tracking-widest uppercase hover:bg-[#d4a853] hover:text-[#1a0a00] transition-all duration-300">
              Πλήρες Μενού
            </Link>
          </div>
        </div>
      </section>

      {/* WINE SECTION */}
      <section className="relative py-32 px-6 overflow-hidden">
        <div className="absolute inset-0">
          <img src="/images/wine.jpg" alt="Κρασί" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-[#1a0a00]/85" />
        </div>
        <div className="relative z-10 max-w-3xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
            <div className="text-[#d4a853] text-5xl mb-6">🍷</div>
            <div className="text-[#d4a853] text-xs tracking-[0.4em] uppercase mb-4">Τοπικά Κρασιά</div>
            <h2 className="font-serif text-4xl md:text-5xl text-white mb-6" style={{ fontFamily: 'Georgia, serif' }}>
              Το Ξινόμαυρο<br />της Νάουσας
            </h2>
            <div className="w-16 h-px bg-[#d4a853] mx-auto mb-6" />
            <p className="text-white/70 text-lg leading-relaxed mb-8">
              Η Νάουσα είναι η πατρίδα του Ξινόμαυρου — ενός από τα πιο ευγενή ελληνικά κόκκινα κρασιά. Στη Σπονδή, επιλέγουμε χειροποίητα κρασιά από τοπικά οινοποιεία που τιμούν αυτή την παράδοση.
            </p>
            <Link to="/menu"
              className="inline-block px-10 py-4 border border-[#d4a853] text-[#d4a853] text-sm tracking-widest uppercase hover:bg-[#d4a853] hover:text-[#1a0a00] transition-all duration-300">
              Κάρτα Κρασιών
            </Link>
          </motion.div>
        </div>
      </section>

      {/* REVIEWS */}
      {reviews.length > 0 && (
        <section className="py-24 px-6 bg-[#0e0500]">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <div className="text-[#d4a853] text-xs tracking-[0.4em] uppercase mb-4">Κριτικές</div>
              <h2 className="font-serif text-4xl text-white" style={{ fontFamily: 'Georgia, serif' }}>Τι Λένε οι Επισκέπτες</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {reviews.map((r: any) => <ReviewCard key={r.id} review={r} />)}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="py-24 px-6 bg-[#d4a853]">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="font-serif text-4xl md:text-5xl text-[#1a0a00] mb-4" style={{ fontFamily: 'Georgia, serif' }}>
              Κάντε Κράτηση Σήμερα
            </h2>
            <p className="text-[#1a0a00]/70 mb-8 text-lg">
              Ελάτε να γευτείτε την αυθεντική Νάουσα. Σας περιμένουμε.
            </p>
            <Link to="/reservations"
              className="inline-block px-12 py-5 bg-[#1a0a00] text-[#d4a853] text-sm tracking-widest uppercase hover:bg-[#2d1200] transition-all duration-300">
              Κράτηση Τραπεζιού
            </Link>
          </motion.div>
        </div>
      </section>
    </motion.div>
  );
}
