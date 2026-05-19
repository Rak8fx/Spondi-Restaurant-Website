import { useState } from 'react';
import { motion } from 'framer-motion';

const timeSlots = [
  '12:00', '12:30', '13:00', '13:30', '14:00', '14:30',
  '19:00', '19:30', '20:00', '20:30', '21:00', '21:30', '22:00', '22:30',
];

export default function Reservations() {
  const [form, setForm] = useState({
    name: '', email: '', phone: '', date: '', time: '', guests: '2', notes: '',
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMsg('');
    try {
      const res = await fetch('/api/reservations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, guests: parseInt(form.guests) }),
      });
      if (!res.ok) {
        const d = await res.json();
        throw new Error(d.error || 'Σφάλμα κράτησης');
      }
      setStatus('success');
      setForm({ name: '', email: '', phone: '', date: '', time: '', guests: '2', notes: '' });
    } catch (err: any) {
      setStatus('error');
      setErrorMsg(err.message);
    }
  };

  const inputClass = "w-full bg-white/5 border border-white/10 text-white placeholder-white/30 px-4 py-3 focus:outline-none focus:border-[#d4a853] transition-colors text-sm";
  const labelClass = "block text-[#d4a853] text-xs tracking-widest uppercase mb-2";

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.5 }}>
      {/* Header */}
      <section className="relative pt-40 pb-24 px-6 text-center overflow-hidden">
        <div className="absolute inset-0">
          <img src="/images/interior.jpg" alt="Κράτηση" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-[#0e0500]/85" />
        </div>
        <div className="relative z-10">
          <div className="text-[#d4a853] text-xs tracking-[0.4em] uppercase mb-4">Σας Περιμένουμε</div>
          <h1 className="font-serif text-6xl md:text-7xl text-white mb-4" style={{ fontFamily: 'Georgia, serif' }}>Κράτηση</h1>
          <div className="w-16 h-px bg-[#d4a853] mx-auto" />
        </div>
      </section>

      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16">
          {/* Info */}
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
            <div className="text-[#d4a853] text-xs tracking-[0.4em] uppercase mb-4">Πληροφορίες</div>
            <h2 className="font-serif text-3xl text-white mb-8" style={{ fontFamily: 'Georgia, serif' }}>
              Ελάτε να μας<br />Γνωρίσετε
            </h2>
            <div className="space-y-6">
              {[
                { icon: '📍', title: 'Διεύθυνση', text: 'Πλατεία Καρατάσου 17\nΝάουσα 59200, Ημαθία' },
                { icon: '📞', title: 'Τηλέφωνο', text: '+30 2332 022233' },
                { icon: '🕐', title: 'Ώρες Λειτουργίας', text: 'Τετάρτη – Κυριακή\n12:00 – 00:00\nΔευτέρα & Τρίτη: Κλειστά' },
                { icon: '🅿️', title: 'Parking', text: 'Δωρεάν parking στην πλατεία' },
              ].map(item => (
                <div key={item.title} className="flex gap-4">
                  <span className="text-2xl mt-1">{item.icon}</span>
                  <div>
                    <div className="text-[#d4a853] text-xs tracking-widest uppercase mb-1">{item.title}</div>
                    <div className="text-white/60 text-sm whitespace-pre-line">{item.text}</div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-12 p-6 border border-[#d4a853]/20 bg-white/3">
              <div className="text-[#d4a853] text-xs tracking-widest uppercase mb-3">Σημαντική Σημείωση</div>
              <p className="text-white/50 text-sm leading-relaxed">
                Για κρατήσεις πάνω από 8 άτομα ή ειδικές εκδηλώσεις, παρακαλούμε επικοινωνήστε μαζί μας τηλεφωνικά για καλύτερη εξυπηρέτηση.
              </p>
            </div>
          </motion.div>

          {/* Form */}
          <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
            {status === 'success' ? (
              <div className="flex flex-col items-center justify-center h-full text-center py-16">
                <div className="text-6xl mb-6">✅</div>
                <h3 className="font-serif text-3xl text-white mb-4" style={{ fontFamily: 'Georgia, serif' }}>Η Κράτηση σας Ελήφθη!</h3>
                <p className="text-white/60 mb-8">Θα επικοινωνήσουμε μαζί σας σύντομα για επιβεβαίωση. Σας ευχαριστούμε!</p>
                <button onClick={() => setStatus('idle')} className="px-8 py-3 border border-[#d4a853] text-[#d4a853] text-sm tracking-widest uppercase hover:bg-[#d4a853] hover:text-[#1a0a00] transition-all">
                  Νέα Κράτηση
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className={labelClass}>Όνομα *</label>
                    <input name="name" value={form.name} onChange={handleChange} required placeholder="Το όνομά σας" className={inputClass} />
                  </div>
                  <div>
                    <label className={labelClass}>Τηλέφωνο *</label>
                    <input name="phone" value={form.phone} onChange={handleChange} required placeholder="+30 69..." className={inputClass} />
                  </div>
                </div>
                <div>
                  <label className={labelClass}>Email *</label>
                  <input name="email" type="email" value={form.email} onChange={handleChange} required placeholder="email@example.com" className={inputClass} />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className={labelClass}>Ημερομηνία *</label>
                    <input name="date" type="date" value={form.date} onChange={handleChange} required
                      min={new Date().toISOString().split('T')[0]}
                      className={inputClass + ' [color-scheme:dark]'} />
                  </div>
                  <div>
                    <label className={labelClass}>Ώρα *</label>
                    <select name="time" value={form.time} onChange={handleChange} required className={inputClass}>
                      <option value="">Επιλέξτε ώρα</option>
                      {timeSlots.map(t => <option key={t} value={t}>{t}</option>)}
                    </select>
                  </div>
                </div>
                <div>
                  <label className={labelClass}>Αριθμός Ατόμων *</label>
                  <select name="guests" value={form.guests} onChange={handleChange} required className={inputClass}>
                    {[1,2,3,4,5,6,7,8].map(n => <option key={n} value={n}>{n} {n === 1 ? 'άτομο' : 'άτομα'}</option>)}
                  </select>
                </div>
                <div>
                  <label className={labelClass}>Σημειώσεις</label>
                  <textarea name="notes" value={form.notes} onChange={handleChange}
                    rows={3} placeholder="Ειδικές απαιτήσεις, αλλεργίες, αφορμή εορτασμού..."
                    className={inputClass + ' resize-none'} />
                </div>
                {status === 'error' && (
                  <div className="p-4 bg-red-900/30 border border-red-500/30 text-red-400 text-sm">
                    {errorMsg}
                  </div>
                )}
                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="w-full py-4 bg-[#d4a853] text-[#1a0a00] text-sm tracking-widest uppercase font-semibold hover:bg-[#e8c06a] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {status === 'loading' ? 'Αποστολή...' : 'Αποστολή Κράτησης'}
                </button>
                <p className="text-white/30 text-xs text-center">* Υποχρεωτικά πεδία. Η κράτηση επιβεβαιώνεται τηλεφωνικά.</p>
              </form>
            )}
          </motion.div>
        </div>
      </section>
    </motion.div>
  );
}
