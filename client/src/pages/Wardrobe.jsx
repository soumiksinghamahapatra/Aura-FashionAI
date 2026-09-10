import React, { useState, useEffect } from 'react';
import { wardrobeAPI, colorAPI } from '../services/api';
import WardrobeItemCard from '../components/WardrobeItemCard';
import { Plus, Search, Filter, Sparkles, X, Upload, Check } from 'lucide-react';

const CATEGORIES = [
  { id: 'all', label: 'All Pieces' },
  { id: 'tops', label: 'Tops & Shirts' },
  { id: 'bottoms', label: 'Bottoms & Trousers' },
  { id: 'outerwear', label: 'Outerwear & Coats' },
  { id: 'dresses', label: 'Dresses' },
  { id: 'shoes', label: 'Footwear' },
  { id: 'accessories', label: 'Accessories' },
];

const Wardrobe = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [harmonyData, setHarmonyData] = useState(null);

  // Add Item Modal state
  const [modalOpen, setModalOpen] = useState(false);
  const [itemName, setItemName] = useState('');
  const [itemCategory, setItemCategory] = useState('tops');
  const [itemColor, setItemColor] = useState('Ivory');
  const [itemColorHex, setItemColorHex] = useState('#FFFFF0');
  const [itemAesthetic, setItemAesthetic] = useState('Quiet Luxury');
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const fetchWardrobe = async () => {
    try {
      setLoading(true);
      const res = await wardrobeAPI.getItems({
        category: selectedCategory !== 'all' ? selectedCategory : undefined,
        search: searchQuery || undefined,
      });
      setItems(res.data.data);

      // Fetch wardrobe harmony match
      const matchRes = await colorAPI.getWardrobeMatch();
      setHarmonyData(matchRes.data);
    } catch (err) {
      console.error('Failed to fetch wardrobe:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWardrobe();
  }, [selectedCategory, searchQuery]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleAddItem = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const formData = new FormData();
      formData.append('name', itemName);
      formData.append('category', itemCategory);
      formData.append('primaryColor', itemColor);
      formData.append('colorHex', itemColorHex);
      formData.append('aesthetic', itemAesthetic);

      if (imageFile) {
        formData.append('image', imageFile);
      } else {
        // Default sample preview
        formData.append('imageUrl', '/assets/brunch-top-DyVfbOn4.webp');
      }

      await wardrobeAPI.addItem(formData);
      setModalOpen(false);
      resetForm();
      fetchWardrobe();
    } catch (err) {
      console.error('Error adding wardrobe item:', err);
    } finally {
      setSubmitting(false);
    }
  };

  const handleDeleteItem = async (id) => {
    if (confirm('Are you sure you want to remove this piece from your closet?')) {
      try {
        await wardrobeAPI.deleteItem(id);
        setItems(items.filter((item) => item._id !== id));
      } catch (err) {
        console.error('Delete error:', err);
      }
    }
  };

  const resetForm = () => {
    setItemName('');
    setItemCategory('tops');
    setItemColor('Ivory');
    setItemColorHex('#FFFFF0');
    setItemAesthetic('Quiet Luxury');
    setImageFile(null);
    setImagePreview(null);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-[#EFE7D8]">
        <div>
          <span className="text-xs font-bold uppercase tracking-widest text-[#A27035]">
            Digital Wardrobe
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#1F140B] mt-1">
            Your Curated Closet
          </h1>
          <p className="text-sm text-[#5C3826] mt-1">
            {items.length} items cataloged • Graded against your seasonal palette
          </p>
        </div>

        <button
          onClick={() => setModalOpen(true)}
          className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-[#1F140B] text-[#FDFBF7] font-semibold text-sm hover:bg-[#3D2817] transition-all shadow-sm shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Add Wardrobe Piece</span>
        </button>
      </div>

      {/* Harmony Banner */}
      {harmonyData && (
        <div className="bg-white rounded-2xl p-5 border border-[#EFE7D8] shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-[#F7F3EB] flex items-center justify-center text-[#A27035] shrink-0">
              <Sparkles className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-[#1F140B]">
                Palette Harmony Score: {harmonyData.overallHarmony}%
              </h4>
              <p className="text-xs text-[#5C3826]">
                {harmonyData.matchingItemsCount} of {harmonyData.totalItems} pieces perfectly flatter your active season ({harmonyData.season}).
              </p>
            </div>
          </div>
          <div className="w-full sm:w-48 bg-[#F7F3EB] h-2.5 rounded-full overflow-hidden">
            <div
              className="bg-[#A27035] h-full rounded-full transition-all duration-700"
              style={{ width: `${harmonyData.overallHarmony}%` }}
            />
          </div>
        </div>
      )}

      {/* Category Pills & Search Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-none">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                selectedCategory === cat.id
                  ? 'bg-[#1F140B] text-[#FDFBF7] shadow-sm'
                  : 'bg-white border border-[#DFD1B8] text-[#5C3826] hover:border-[#1F140B]'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="relative w-full md:w-64">
          <Search className="w-4 h-4 text-[#8C503A] absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search clothes..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 rounded-full border border-[#DFD1B8] focus:border-[#1F140B] focus:outline-none text-xs text-[#1F140B] bg-white"
          />
        </div>
      </div>

      {/* Closet Items Grid */}
      {loading ? (
        <div className="py-20 flex justify-center items-center">
          <div className="w-8 h-8 border-4 border-[#DFD1B8] border-t-[#1F140B] rounded-full animate-spin"></div>
        </div>
      ) : items.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {items.map((item) => (
            <WardrobeItemCard
              key={item._id}
              item={item}
              onDelete={handleDeleteItem}
            />
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-3xl p-12 text-center border border-[#EFE7D8] space-y-4 max-w-md mx-auto">
          <div className="w-12 h-12 rounded-full bg-[#F7F3EB] text-[#A27035] flex items-center justify-center mx-auto">
            <Plus className="w-6 h-6" />
          </div>
          <h3 className="font-serif text-xl font-bold text-[#1F140B]">
            No clothes found
          </h3>
          <p className="text-xs text-[#5C3826]">
            Start building your digital capsule wardrobe by uploading tops, trousers, shoes, or outerwear.
          </p>
          <button
            onClick={() => setModalOpen(true)}
            className="px-6 py-2.5 rounded-full bg-[#1F140B] text-[#FDFBF7] text-xs font-semibold hover:bg-[#3D2817]"
          >
            Add First Piece
          </button>
        </div>
      )}

      {/* Add Item Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fadeIn">
          <div className="bg-[#FDFBF7] rounded-3xl max-w-lg w-full p-6 sm:p-8 border border-[#DFD1B8] shadow-2xl space-y-5 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-[#EFE7D8]">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-widest text-[#A27035]">
                  Digital Closet
                </span>
                <h3 className="font-serif text-2xl font-bold text-[#1F140B]">
                  Add Wardrobe Piece
                </h3>
              </div>
              <button
                onClick={() => setModalOpen(false)}
                className="p-1.5 rounded-full text-[#5C3826] hover:bg-[#F7F3EB]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddItem} className="space-y-4">
              {/* Photo Upload Box */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#1F140B] mb-2">
                  Piece Photo
                </label>
                <label className="flex flex-col items-center justify-center aspect-[16/9] rounded-2xl border-2 border-dashed border-[#DFD1B8] hover:border-[#1F140B] bg-white cursor-pointer overflow-hidden transition-colors relative group">
                  {imagePreview ? (
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="flex flex-col items-center gap-2 text-center p-4">
                      <Upload className="w-6 h-6 text-[#A27035]" />
                      <span className="text-xs font-semibold text-[#1F140B]">
                        Click to upload photo
                      </span>
                      <span className="text-[11px] text-[#8C503A]">
                        JPG, PNG, or WEBP up to 10MB
                      </span>
                    </div>
                  )}
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                  />
                </label>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#1F140B] mb-1">
                  Item Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Linen Tailored Trousers"
                  value={itemName}
                  onChange={(e) => setItemName(e.target.value)}
                  className="w-full px-4 py-2 rounded-xl border border-[#DFD1B8] focus:border-[#1F140B] focus:outline-none text-xs text-[#1F140B] bg-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#1F140B] mb-1">
                    Category
                  </label>
                  <select
                    value={itemCategory}
                    onChange={(e) => setItemCategory(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-[#DFD1B8] focus:border-[#1F140B] focus:outline-none text-xs text-[#1F140B] bg-white capitalize"
                  >
                    {CATEGORIES.filter((c) => c.id !== 'all').map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#1F140B] mb-1">
                    Aesthetic
                  </label>
                  <input
                    type="text"
                    value={itemAesthetic}
                    onChange={(e) => setItemAesthetic(e.target.value)}
                    placeholder="e.g. Minimalist"
                    className="w-full px-4 py-2 rounded-xl border border-[#DFD1B8] focus:border-[#1F140B] focus:outline-none text-xs text-[#1F140B] bg-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#1F140B] mb-1">
                    Primary Color Name
                  </label>
                  <input
                    type="text"
                    value={itemColor}
                    onChange={(e) => setItemColor(e.target.value)}
                    placeholder="e.g. Olive Green"
                    className="w-full px-4 py-2 rounded-xl border border-[#DFD1B8] focus:border-[#1F140B] focus:outline-none text-xs text-[#1F140B] bg-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#1F140B] mb-1">
                    Color HEX Tone
                  </label>
                  <div className="flex items-center gap-2">
                    <input
                      type="color"
                      value={itemColorHex}
                      onChange={(e) => setItemColorHex(e.target.value)}
                      className="w-9 h-9 rounded-lg border border-[#DFD1B8] cursor-pointer p-0 bg-white"
                    />
                    <input
                      type="text"
                      value={itemColorHex}
                      onChange={(e) => setItemColorHex(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl border border-[#DFD1B8] text-xs font-mono uppercase bg-white"
                    />
                  </div>
                </div>
              </div>

              <div className="pt-3">
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full py-3 rounded-full bg-[#1F140B] text-[#FDFBF7] font-semibold text-xs uppercase tracking-wider hover:bg-[#3D2817] transition-all flex items-center justify-center gap-2"
                >
                  {submitting ? (
                    <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <>
                      <Check className="w-4 h-4" />
                      <span>Save to Wardrobe</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Wardrobe;
