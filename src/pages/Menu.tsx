import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const categories = [
  { key: 'all', label: 'Όλα' },
  { key: 'Ορεκτικά', label: 'Ορεκτικά' },
  { key: 'Κυρίως', label: 'Κυρίως Πιάτα' },
  { key: 'Σαλάτες', label: 'Σαλάτες' },
  { key: 'Ψητά', label: 'Ψητά' },
  { key: 'Κρασιά', label: 'Κρασιά' },
  { key: 'Γλυκά', label: 'Γλυκά' },
];

export default function Menu() {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('all');

  useEffect(() => {
    setLoading(true);
    fetch(`/api/menu${activeCategory !== 'all' ? `?category=${activeCategory}` : ''}`)
      .then(r => r.json())
      .then(d => { setItems(Array.isArray(d) ? d : []); setLoading(false); })
      .catch(() => setLoading(false));
  }, [activeCategory]);

  const grouped = items.reduce((acc: any, item: any) => {
    if (!acc[item.category]) acc[item.category] = [];
    acc[item.category].push(item);
    return acc;
  }, {});

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.5 }}>
      {/* Header */}
      <section className="relative pt-40 pb-24 px-6 text-center overflow-hidden">
        <div className="absolute inset-0">
          <img src="/images/food1.jpg" alt="Μενού" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-[#0e0500]/85" />
        </div>
        <div className="relative z-10">
          <div className="text-[#d4a853] text-xs tracking-[0.4em] uppercase mb-4">Γεύσεις της Νάουσας</div>
          <h1 className="font-serif text-6xl md:text-7xl text-white mb-4" style={{ fontFamily: 'Georgia, serif' }}>Μενού</h1>
          <div className="w-16 h-px bg-[#d4a853] mx-auto" />
        </div>
      </section>

      {/* Category Filter */}
      <div className="sticky top-20 z-40 bg-[#140800]/95 backdrop-blur-md border-b border-[#d4a853]/20 py-4 px-6">
        <div className="max-w-7xl mx-auto flex gap-3 overflow-x-auto pb-1 scrollbar-hide">
          {categories.map(cat => (
            <button
              key={cat.key}
              onClick={() => setActiveCategory(cat.key)}
              className={`whitespace-nowrap px-5 py-2 text-xs tracking-widest uppercase transition-all duration-300 border ${
                activeCategory === cat.key
                  ? 'bg-[#d4a853] text-[#1a0a00] border-[#d4a853]'
                  : 'border-white/20 text-white/60 hover:border-[#d4a853] hover:text-[#d4a853]'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Menu Items */}
      <section className="py-16 px-6 min-h-screen">
        <div className="max-w-7xl mx-auto">
          {loading ? (
            <div className="flex justify-center py-24">
              <div className="w-10 h-10 border-2 border-[#d4a853]/30 border-t-[#d4a853] rounded-full animate-spin" />
            </div>
          ) : (
            <AnimatePresence mode="wait">
              <motion.div key={activeCategory} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }}>
                {Object.entries(grouped).map(([category, catItems]: [string, any]) => (
                  <div key={category} className="mb-16">
                    <div className="flex items-center gap-6 mb-8">
                      <div className="text-[#d4a853] text-xs tracking-[0.4em] uppercase">{category}</div>
                      <div className="flex-1 h-px bg-[#d4a853]/20" />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
                      {catItems.map((item: any, i: number) => (
                        <motion.div
                          key={item.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: i * 0.05 }}
                          className="flex items-start justify-between py-5 px-4 border-b border-white/5 hover:bg-white/3 transition-colors group"
                        >
                          <div className="flex-1 pr-8">
                            <div className="flex items-center gap-2 mb-1">
                              <span className="text-white font-medium group-hover:text-[#d4a853] transition-colors">{item.name}</span>
                              {item.featured && <span className="text-[10px] bg-[#d4a853]/20 text-[#d4a853] px-2 py-0.5 tracking-wider">★ ΣΕΦ</span>}
                            </div>
                            {item.description && (
                              <p className="text-white/40 text-sm leading-relaxed">{item.description}</p>
                            )}
                          </div>
                          <div className="text-[#d4a853] font-semibold whitespace-nowrap">{item.price}€</div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                ))}
                {Object.keys(grouped).length === 0 && (
                  <div className="text-center py-24 text-white/30">Δεν βρέθηκαν πιάτα</div>
                )}
              </motion.div>
            </AnimatePresence>
          )}
        </div>
      </section>
    </motion.div>
  );
}
