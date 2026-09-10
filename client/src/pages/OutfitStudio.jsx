import React, { useState, useEffect } from 'react';
import { outfitAPI, wardrobeAPI } from '../services/api';
import { Layers, Plus, Trash2, Sparkles, Check, BookmarkCheck } from 'lucide-react';

const OCCASIONS = [
  'Weekend Brunch',
  'Office Workwear',
  'Date Night',
  'Travel & Airport',
  'Cocktail Party',
  'Casual Everyday',
];

const OutfitStudio = () => {
  const [outfits, setOutfits] = useState([]);
  const [wardrobe, setWardrobe] = useState([]);
  const [loading, setLoading] = useState(true);

  // Studio Selection Slots
  const [selectedTop, setSelectedTop] = useState(null);
  const [selectedBottom, setSelectedBottom] = useState(null);
  const [selectedShoes, setSelectedShoes] = useState(null);
  const [selectedOuterwear, setSelectedOuterwear] = useState(null);
  const [outfitTitle, setOutfitTitle] = useState('');
  const [occasion, setOccasion] = useState('Weekend Brunch');
  const [saving, setSaving] = useState(false);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [outfitsRes, wardrobeRes] = await Promise.all([
        outfitAPI.getOutfits(),
        wardrobeAPI.getItems(),
      ]);
      setOutfits(outfitsRes.data.data);
      const items = wardrobeRes.data.data;
      setWardrobe(items);

      // Pre-select defaults if items exist
      const top = items.find((i) => i.category === 'tops');
      const bottom = items.find((i) => i.category === 'bottoms');
      const shoes = items.find((i) => i.category === 'shoes');
      const outer = items.find((i) => i.category === 'outerwear');
      if (top) setSelectedTop(top);
      if (bottom) setSelectedBottom(bottom);
      if (shoes) setSelectedShoes(shoes);
      if (outer) setSelectedOuterwear(outer);
    } catch (err) {
      console.error('Failed to load studio data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSaveOutfit = async (e) => {
    e.preventDefault();
    setSaving(true);

    const items = [selectedTop, selectedBottom, selectedShoes, selectedOuterwear]
      .filter(Boolean)
      .map((i) => i._id);

    try {
      const res = await outfitAPI.createOutfit({
        name: outfitTitle || `${occasion} Ensemble`,
        occasion,
        items,
        aesthetic: 'Curated Minimalist',
      });
      setOutfits([res.data.data, ...outfits]);
      setOutfitTitle('');
      alert('Outfit ensemble saved to your lookbook!');
    } catch (err) {
      console.error('Save outfit error:', err);
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteOutfit = async (id) => {
    if (confirm('Delete this saved outfit?')) {
      try {
        await outfitAPI.deleteOutfit(id);
        setOutfits(outfits.filter((o) => o._id !== id));
      } catch (err) {
        console.error('Delete outfit error:', err);
      }
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#EFE7D8]">
        <div>
          <span className="text-xs font-bold uppercase tracking-widest text-[#A27035]">
            Styling Studio
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#1F140B] mt-1">
            Mix-and-Match Studio
          </h1>
          <p className="text-sm text-[#5C3826] mt-1">
            Assemble complete outfits from your digital closet and evaluate their styling synergy.
          </p>
        </div>
      </div>

      {/* Main Studio Interactive Canvas */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Canvas Left/Center: Visual Outfit Layout */}
        <div className="lg:col-span-2 bg-white rounded-3xl p-6 sm:p-8 border border-[#EFE7D8] shadow-sm space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#A27035]" />
              <h3 className="font-serif text-xl font-bold text-[#1F140B]">
                Outfit Collage Canvas
              </h3>
            </div>
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#1F140B] text-[#FDFBF7]">
              9.6 / 10 Synergy Rating
            </span>
          </div>

          {/* 4 Interactive Clothing Slots */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {/* Slot: Top */}
            <div className="flex flex-col gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-[#8C503A]">
                1. Top Layer
              </span>
              <div className="aspect-[3/4] rounded-2xl bg-[#F7F3EB] border border-[#DFD1B8] overflow-hidden p-2 flex flex-col items-center justify-center relative group">
                {selectedTop ? (
                  <>
                    <img
                      src={selectedTop.imageUrl}
                      alt={selectedTop.name}
                      className="w-full h-full object-cover rounded-xl"
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center p-2 text-center">
                      <span className="text-xs font-semibold text-white">
                        {selectedTop.name}
                      </span>
                    </div>
                  </>
                ) : (
                  <span className="text-xs text-gray-400">No Top Selected</span>
                )}
              </div>
              <select
                value={selectedTop?._id || ''}
                onChange={(e) =>
                  setSelectedTop(wardrobe.find((i) => i._id === e.target.value))
                }
                className="w-full text-xs px-2 py-1.5 rounded-lg border border-[#DFD1B8] bg-white text-[#1F140B]"
              >
                <option value="">Select Top...</option>
                {wardrobe
                  .filter((i) => i.category === 'tops')
                  .map((i) => (
                    <option key={i._id} value={i._id}>
                      {i.name}
                    </option>
                  ))}
              </select>
            </div>

            {/* Slot: Bottom */}
            <div className="flex flex-col gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-[#8C503A]">
                2. Bottom Piece
              </span>
              <div className="aspect-[3/4] rounded-2xl bg-[#F7F3EB] border border-[#DFD1B8] overflow-hidden p-2 flex flex-col items-center justify-center relative group">
                {selectedBottom ? (
                  <>
                    <img
                      src={selectedBottom.imageUrl}
                      alt={selectedBottom.name}
                      className="w-full h-full object-cover rounded-xl"
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center p-2 text-center">
                      <span className="text-xs font-semibold text-white">
                        {selectedBottom.name}
                      </span>
                    </div>
                  </>
                ) : (
                  <span className="text-xs text-gray-400">No Bottom Selected</span>
                )}
              </div>
              <select
                value={selectedBottom?._id || ''}
                onChange={(e) =>
                  setSelectedBottom(wardrobe.find((i) => i._id === e.target.value))
                }
                className="w-full text-xs px-2 py-1.5 rounded-lg border border-[#DFD1B8] bg-white text-[#1F140B]"
              >
                <option value="">Select Bottom...</option>
                {wardrobe
                  .filter((i) => i.category === 'bottoms')
                  .map((i) => (
                    <option key={i._id} value={i._id}>
                      {i.name}
                    </option>
                  ))}
              </select>
            </div>

            {/* Slot: Outerwear */}
            <div className="flex flex-col gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-[#8C503A]">
                3. Coat / Outerwear
              </span>
              <div className="aspect-[3/4] rounded-2xl bg-[#F7F3EB] border border-[#DFD1B8] overflow-hidden p-2 flex flex-col items-center justify-center relative group">
                {selectedOuterwear ? (
                  <>
                    <img
                      src={selectedOuterwear.imageUrl}
                      alt={selectedOuterwear.name}
                      className="w-full h-full object-cover rounded-xl"
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center p-2 text-center">
                      <span className="text-xs font-semibold text-white">
                        {selectedOuterwear.name}
                      </span>
                    </div>
                  </>
                ) : (
                  <span className="text-xs text-gray-400">Optional Coat</span>
                )}
              </div>
              <select
                value={selectedOuterwear?._id || ''}
                onChange={(e) =>
                  setSelectedOuterwear(wardrobe.find((i) => i._id === e.target.value))
                }
                className="w-full text-xs px-2 py-1.5 rounded-lg border border-[#DFD1B8] bg-white text-[#1F140B]"
              >
                <option value="">None / Select Coat...</option>
                {wardrobe
                  .filter((i) => i.category === 'outerwear')
                  .map((i) => (
                    <option key={i._id} value={i._id}>
                      {i.name}
                    </option>
                  ))}
              </select>
            </div>

            {/* Slot: Footwear */}
            <div className="flex flex-col gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-[#8C503A]">
                4. Footwear
              </span>
              <div className="aspect-[3/4] rounded-2xl bg-[#F7F3EB] border border-[#DFD1B8] overflow-hidden p-2 flex flex-col items-center justify-center relative group">
                {selectedShoes ? (
                  <>
                    <img
                      src={selectedShoes.imageUrl}
                      alt={selectedShoes.name}
                      className="w-full h-full object-cover rounded-xl"
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center p-2 text-center">
                      <span className="text-xs font-semibold text-white">
                        {selectedShoes.name}
                      </span>
                    </div>
                  </>
                ) : (
                  <span className="text-xs text-gray-400">No Footwear</span>
                )}
              </div>
              <select
                value={selectedShoes?._id || ''}
                onChange={(e) =>
                  setSelectedShoes(wardrobe.find((i) => i._id === e.target.value))
                }
                className="w-full text-xs px-2 py-1.5 rounded-lg border border-[#DFD1B8] bg-white text-[#1F140B]"
              >
                <option value="">Select Shoes...</option>
                {wardrobe
                  .filter((i) => i.category === 'shoes')
                  .map((i) => (
                    <option key={i._id} value={i._id}>
                      {i.name}
                    </option>
                  ))}
              </select>
            </div>
          </div>
        </div>

        {/* Studio Right: Save & Metadata Form */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#EFE7D8] shadow-sm space-y-5">
          <span className="text-xs font-bold uppercase tracking-widest text-[#A27035]">
            Save Look
          </span>
          <h3 className="font-serif text-2xl font-bold text-[#1F140B]">
            Catalog Ensemble
          </h3>

          <form onSubmit={handleSaveOutfit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#1F140B] mb-1">
                Outfit Name
              </label>
              <input
                type="text"
                value={outfitTitle}
                onChange={(e) => setOutfitTitle(e.target.value)}
                placeholder="e.g. Autumn City Gallery Walk"
                className="w-full px-4 py-2.5 rounded-xl border border-[#DFD1B8] focus:border-[#1F140B] focus:outline-none text-xs text-[#1F140B] bg-[#FDFBF7]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#1F140B] mb-1">
                Occasion
              </label>
              <select
                value={occasion}
                onChange={(e) => setOccasion(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-[#DFD1B8] focus:border-[#1F140B] focus:outline-none text-xs text-[#1F140B] bg-[#FDFBF7]"
              >
                {OCCASIONS.map((occ) => (
                  <option key={occ} value={occ}>
                    {occ}
                  </option>
                ))}
              </select>
            </div>

            <div className="p-4 rounded-2xl bg-[#F7F3EB] text-xs text-[#5C3826] space-y-1">
              <p>
                <strong>Proportion Rule:</strong> Fluid volume balanced by tailored anchors.
              </p>
              <p>
                <strong>Color Synergy:</strong> Warm harmonizing neutral palette.
              </p>
            </div>

            <button
              type="submit"
              disabled={saving}
              className="w-full py-3 rounded-full bg-[#1F140B] text-[#FDFBF7] font-semibold text-xs uppercase tracking-wider hover:bg-[#3D2817] transition-all flex items-center justify-center gap-2"
            >
              {saving ? (
                <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  <BookmarkCheck className="w-4 h-4" />
                  <span>Save to Lookbook</span>
                </>
              )}
            </button>
          </form>
        </div>
      </div>

      {/* Saved Outfits Lookbook */}
      <div className="pt-8 border-t border-[#EFE7D8] space-y-6">
        <h3 className="font-serif text-2xl font-bold text-[#1F140B]">
          Your Saved Looks ({outfits.length})
        </h3>

        {outfits.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {outfits.map((outfit) => (
              <div
                key={outfit._id}
                className="bg-white rounded-2xl border border-[#EFE7D8] p-5 shadow-sm space-y-4 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-[#F7F3EB] text-[#A27035]">
                      {outfit.occasion}
                    </span>
                    <span className="text-xs font-bold text-[#1F140B]">
                      ★ {outfit.aiRating}
                    </span>
                  </div>
                  <h4 className="font-serif text-lg font-bold text-[#1F140B]">
                    {outfit.name}
                  </h4>
                  {outfit.notes && (
                    <p className="text-xs text-[#5C3826] mt-1 leading-relaxed">
                      {outfit.notes}
                    </p>
                  )}
                </div>

                {/* Items Thumbnails */}
                <div className="flex items-center gap-2 py-3 border-t border-[#EFE7D8]">
                  {outfit.items?.map((piece, i) => (
                    <div
                      key={i}
                      className="w-12 h-12 rounded-lg bg-[#F7F3EB] border border-[#DFD1B8] overflow-hidden"
                      title={piece?.name}
                    >
                      <img
                        src={piece?.imageUrl || '/assets/brunch-top-DyVfbOn4.webp'}
                        alt="piece"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}
                </div>

                <div className="flex justify-end pt-2">
                  <button
                    onClick={() => handleDeleteOutfit(outfit._id)}
                    className="p-1.5 rounded-lg text-gray-400 hover:text-red-600 hover:bg-red-50 transition-colors"
                    title="Delete outfit"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-xs text-[#5C3826]">
            No outfits saved yet. Select pieces above to build your first head-to-toe ensemble.
          </p>
        )}
      </div>
    </div>
  );
};

export default OutfitStudio;
