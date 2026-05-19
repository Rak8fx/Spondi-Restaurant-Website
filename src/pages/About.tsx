import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const timeline = [
  { year: '1987', title: 'Η Αρχή', desc: 'Ο Άγγελος Χατζηστυλλής ανοίγει τη Σπονδή στην καρδιά της Νάουσας, με όραμα να φέρει τις αυθεντικές γεύσεις της Μακεδονίας στο τραπέζι.' },
  { year: '1995', title: 'Αναγνώριση', desc: 'Η Σπονδή αναγνωρίζεται ως ένα από τα καλύτερα παραδοσιακά εστιατόρια της Κεντρικής Μακεδονίας. Ο κατάλογος κρασιών εμπλουτίζεται με σπάνιες ετικέτες Ξινόμαυρου.' },
  { year: '2005', title: 'Νέα Γενιά', desc: 'Η δεύτερη γενιά της οικογένειας αναλαμβάνει τα ηνία, φέρνοντας νέες ιδέες χωρίς να χάσει την ψυχή της παράδοσης.' },
  { year: '2015', title: 'Ανακαίνιση', desc: 'Ανανέωση του χώρου με σεβασμό στην παραδοσιακή αισθητική. Νέος κήπος για φαγητό κάτω από τα αστέρια.' },
  { year: 'Σήμερα', title: 'Η Σπονδή Ζει', desc: 'Πάνω από 35 χρόνια αργότερα, η Σπονδή συνεχίζει να σερβίρει αγάπη, παράδοση και αυθεντικές γεύσεις σε κάθε επισκέπτη.' },
];

const values = [
  { icon: '🌿', title: 'Τοπικά Υλικά', desc: 'Συνεργαζόμαστε με τοπικούς παραγωγούς της Ημαθίας για τα φρεσκότερα υλικά.' },
  { icon: '👨‍🍳', title: 'Παράδοση', desc: 'Οι συνταγές μας κρατούν ζωντανή την παράδοση της μακεδονικής κουζίνας.' },
  { icon: '🍷', title: 'Τοπικά Κρασιά', desc: 'Επιλεγμένα κρασιά Ξινόμαυρου από τους καλύτερους αμπελώνες της Νάουσας.' },
  { icon: '❤️', title: 'Αγάπη', desc: 'Κάθε πιάτο μαγειρεύεται με αγάπη, σαν να φτιάχνουμε φαγητό για την οικογένειά μας.' },
];

export default function About() {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.5 }}>
      {/* Header */}
      <section className="relative pt-40 pb-24 px-6 text-center overflow-hidden">
        <div className="absolute inset-0">
          <img src="/images/interior.jpg" alt="Σπονδή" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-[#0e0500]/80" />
        </div>
        <div className="relative z-10">
          <div className="text-[#d4a853] text-xs tracking-[0.4em] uppercase mb-4">Από το 1987</div>
          <h1 className="font-serif text-6xl md:text-7xl text-white mb-4" style={{ fontFamily: 'Georgia, serif' }}>Η Ιστορία μας</h1>
          <div className="w-16 h-px bg-[#d4a853] mx-auto" />
        </div>
      </section>

      {/* Story */}
      <section className="py-24 px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-20">
            <p className="text-white/70 text-xl leading-relaxed">
              Η <span className="text-[#d4a853]">Σπονδή</span> δεν είναι απλώς ένα εστιατόριο. Είναι ένας τόπος όπου η Νάουσα μοιράζεται τα μυστικά της κουζίνας της, όπου η παράδοση συναντά το πάθος και όπου κάθε γεύμα γίνεται ανάμνηση.
            </p>
          </motion.div>

          {/* Timeline */}
          <div className="relative">
            <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-px bg-[#d4a853]/20" />
            {timeline.map((item, i) => (
              <motion.div
                key={item.year}
                initial={{ opacity: 0, x: i % 2 === 0 ? -40 : 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.1 }}
                className={`relative flex items-start gap-8 mb-12 ${
                  i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                } pl-16 md:pl-0`}
              >
                <div className={`hidden md:block flex-1 ${i % 2 === 0 ? 'text-right pr-12' : 'pl-12'}`}>
                  {i % 2 === 0 ? (
                    <>
                      <div className="text-[#d4a853] font-serif text-2xl mb-2">{item.year}</div>
                      <h3 className="text-white text-xl font-medium mb-2">{item.title}</h3>
                      <p className="text-white/50 text-sm leading-relaxed">{item.desc}</p>
                    </>
                  ) : <div />}
                </div>
                <div className="absolute left-6 md:left-1/2 md:-translate-x-1/2 w-4 h-4 rounded-full bg-[#d4a853] border-2 border-[#0e0500] z-10" />
                <div className={`flex-1 md:block ${i % 2 === 0 ? 'md:hidden' : ''} ${i % 2 === 0 ? '' : 'md:pl-12'}`}>
                  <div className="text-[#d4a853] font-serif text-2xl mb-2">{item.year}</div>
                  <h3 className="text-white text-xl font-medium mb-2">{item.title}</h3>
                  <p className="text-white/50 text-sm leading-relaxed">{item.desc}</p>
                </div>
                {i % 2 !== 0 && <div className="hidden md:block flex-1" />}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-24 px-6 bg-[#140800]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="text-[#d4a853] text-xs tracking-[0.4em] uppercase mb-4">Οι Αξίες μας</div>
            <h2 className="font-serif text-4xl text-white" style={{ fontFamily: 'Georgia, serif' }}>Τι μας Κάνει Διαφορετικούς</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((v, i) => (
              <motion.div
                key={v.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center p-8 border border-[#d4a853]/10 hover:border-[#d4a853]/40 transition-colors"
              >
                <div className="text-5xl mb-4">{v.icon}</div>
                <h3 className="text-[#d4a853] font-medium mb-3 tracking-wide">{v.title}</h3>
                <p className="text-white/50 text-sm leading-relaxed">{v.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Chef photo section */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <motion.div initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
            <div className="text-[#d4a853] text-xs tracking-[0.4em] uppercase mb-4">Η Φιλοσοφία μας</div>
            <h2 className="font-serif text-4xl text-white mb-6" style={{ fontFamily: 'Georgia, serif' }}>
              Μαγειρεύουμε<br />με Καρδιά
            </h2>
            <div className="w-16 h-px bg-[#d4a853] mb-6" />
            <p className="text-white/60 leading-relaxed mb-4">
              Στη Σπονδή πιστεύουμε ότι το καλό φαγητό δεν είναι μόνο θέμα συνταγής — είναι θέμα αγάπης, σεβασμού στα υλικά και αφοσίωσης στην παράδοση.
            </p>
            <p className="text-white/60 leading-relaxed mb-4">
              Κάθε πρωί επιλέγουμε τα φρεσκότερα υλικά από τοπικούς παραγωγούς. Κάθε βράδυ σερβίρουμε πιάτα που φτιάχνονται με υπομονή και μεράκι.
            </p>
            <p className="text-white/60 leading-relaxed mb-8">
              Η Νάουσα μάς ενέπνευσε. Εμείς προσπαθούμε να την τιμήσουμε.
            </p>
            <Link to="/reservations"
              className="inline-flex items-center gap-3 text-[#d4a853] text-sm tracking-widest uppercase hover:gap-5 transition-all duration-300">
              Κάντε Κράτηση <span>→</span>
            </Link>
          </motion.div>
          <motion.div initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
            <img src="/images/food1.jpg" alt="Κουζίνα" className="w-full h-[500px] object-cover" />
          </motion.div>
        </div>
      </section>
    </motion.div>
  );
}
