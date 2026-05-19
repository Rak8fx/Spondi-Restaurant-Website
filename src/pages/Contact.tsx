import { useState } from 'react';
import { motion } from 'framer-motion';

export default function Contact() {
  const [form, setForm] = useState({ author: '', email: '', rating: '5', text: '', origin: 'Ιστοσελίδα' });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    try {
      const res = await fetch('/api/reviews', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, rating: parseInt(form.rating) }),
      });
      if (!res.ok) throw new Error('Σφάλμα αποστολής');
      setStatus('success');
      setForm({ author: '', email: '', rating: '5', text: '', origin: 'Ιστοσελίδα' });
    } catch {
      setStatus('error');
    }
  };

  const inputClass = "w-full bg-white/5 border border-white/10 text-white placeholder-white/30 px-4 py-3 focus:outline-none focus:border-[#d4a853] transition-colors text-sm";
  const labelClass = "block text-[#d4a853] text-xs tracking-widest uppercase mb-2";

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.5 }}>
      {/* Header */}
      <section className="relative pt-40 pb-24 px-6 text-center overflow-hidden">
        <div className="absolute inset-0">
          <img src="/images/food1.jpg" alt="Επικοινωνία" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-[#0e0500]/85" />
        </div>
        <div className="relative z-10">
          <div className="text-[#d4a853] text-xs tracking-[0.4em] uppercase mb-4">Μιλήστε μαζί μας</div>
          <h1 className="font-serif text-6xl md:text-7xl text-white mb-4" style={{ fontFamily: 'Georgia, serif' }}>Επικοινωνία</h1>
          <div className="w-16 h-px bg-[#d4a853] mx-auto" />
        </div>
      </section>

      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          {/* Contact Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
            {[
              { icon: '📍', title: 'Διεύθυνση', lines: ['Πλατεία Καρατάσου 17', 'Νάουσα 59200', 'Ημαθία, Κεντρική Μακεδονία'] },
              { icon: '📞', title: 'Τηλέφωνο', lines: ['+30 2332 022233', 'Δεχόμαστε κρατήσεις', 'Τηλεφωνικώς'] },
              { icon: '🕐', title: 'Ώρες', lines: ['Τετ–Κυρ: 12:00–00:00', 'Δευτ & Τρίτη: Κλειστά', 'Αργίες: Ανοικτά'] },
              { icon: '🚗', title: 'Πρόσβαση', lines: ['Κέντρο Νάουσας', 'Δωρεάν Parking', 'Εύκολη πρόσβαση'] },
            ].map((card, i) => (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="border border-[#d4a853]/20 p-8 text-center hover:border-[#d4a853]/50 transition-colors"
              >
                <div className="text-4xl mb-4">{card.icon}</div>
                <div className="text-[#d4a853] text-xs tracking-widest uppercase mb-3">{card.title}</div>
                {card.lines.map(line => (
                  <div key={line} className="text-white/50 text-sm mb-1">{line}</div>
                ))}
              </motion.div>
            ))}
          </div>

          {/* Map + Review Form */}
          <div className="grid md:grid-cols-2 gap-16">
            {/* Map */}
            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
              <div className="text-[#d4a853] text-xs tracking-[0.4em] uppercase mb-4">Βρείτε μας</div>
              <h2 className="font-serif text-3xl text-white mb-6" style={{ fontFamily: 'Georgia, serif' }}>Χάρτης</h2>
              <div className="w-full h-80 bg-white/5 border border-[#d4a853]/20 overflow-hidden">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3025.0!2d22.065!3d40.630!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14585a4d5c8b0001%3A0x1!2z0KHPgM6_YNGH4b2hIE5hb3Vzc2E!5e0!3m2!1sel!2sgr!4v1700000000000!5m2!1sel!2sgr"
                  width="100%" height="100%" style={{ border: 0, filter: 'invert(90%) hue-rotate(180deg)' }}
                  allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade"
                  title="Χάρτης Σπονδή"
                />
              </div>
              <a
                href="https://www.google.com/maps/search/Σπονδή+Νάουσα+Ημαθία"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 mt-4 text-[#d4a853] text-sm tracking-widest uppercase hover:gap-4 transition-all"
              >
                Άνοιγμα στο Google Maps <span>→</span>
              </a>
            </motion.div>

            {/* Review Form */}
            <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
              <div className="text-[#d4a853] text-xs tracking-[0.4em] uppercase mb-4">Η Γνώμη σας</div>
              <h2 className="font-serif text-3xl text-white mb-6" style={{ fontFamily: 'Georgia, serif' }}>Αφήστε Κριτική</h2>
              {status === 'success' ? (
                <div className="text-center py-12">
                  <div className="text-5xl mb-4">🙏</div>
                  <h3 className="text-white text-xl mb-3">Ευχαριστούμε!</h3>
                  <p className="text-white/50 text-sm">Η κριτική σας θα δημοσιευτεί μετά από έλεγχο.</p>
                  <button onClick={() => setStatus('idle')} className="mt-6 text-[#d4a853] text-sm tracking-widest uppercase underline">
                    Νέα Κριτική
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className={labelClass}>Όνομα *</label>
                    <input name="author" value={form.author} onChange={handleChange} required placeholder="Το όνομά σας" className={inputClass} />
                  </div>
                  <div>
                    <label className={labelClass}>Email</label>
                    <input name="email" type="email" value={form.email} onChange={handleChange} placeholder="email@example.com" className={inputClass} />
                  </div>
                  <div>
                    <label className={labelClass}>Βαθμολογία *</label>
                    <select name="rating" value={form.rating} onChange={handleChange} required className={inputClass}>
                      <option value="5">★★★★★ — Εξαιρετικό</option>
                      <option value="4">★★★★☆ — Πολύ Καλό</option>
                      <option value="3">★★★☆☆ — Καλό</option>
                      <option value="2">★★☆☆☆ — Μέτριο</option>
                      <option value="1">★☆☆☆☆ — Απογοητευτικό</option>
                    </select>
                  </div>
                  <div>
                    <label className={labelClass}>Κριτική *</label>
                    <textarea name="text" value={form.text} onChange={handleChange} required
                      rows={4} placeholder="Πείτε μας για την εμπειρία σας..."
                      className={inputClass + ' resize-none'} />
                  </div>
                  {status === 'error' && (
                    <div className="p-3 bg-red-900/30 border border-red-500/30 text-red-400 text-sm">
                      Σφάλμα αποστολής. Δοκιμάστε ξανά.
                    </div>
                  )}
                  <button
                    type="submit"
                    disabled={status === 'loading'}
                    className="w-full py-4 bg-[#d4a853] text-[#1a0a00] text-sm tracking-widest uppercase font-semibold hover:bg-[#e8c06a] transition-all disabled:opacity-50"
                  >
                    {status === 'loading' ? 'Αποστολή...' : 'Υποβολή Κριτικής'}
                  </button>
                </form>
              )}
            </motion.div>
          </div>
        </div>
      </section>
    </motion.div>
  );
}
