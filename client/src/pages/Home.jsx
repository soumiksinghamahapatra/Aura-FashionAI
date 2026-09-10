import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Shirt, Palette, MessageSquare, Layers, ArrowRight, CheckCircle2 } from 'lucide-react';

const Home = () => {
  return (
    <div className="space-y-24 pb-20">
      {/* Hero Section */}
      <section className="relative pt-20 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto overflow-hidden">
        {/* Ambient Glows */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#EFE7D8]/60 rounded-full blur-3xl pointer-events-none -z-10" />

        <div className="text-center max-w-3xl mx-auto space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#DFD1B8] bg-white/60 backdrop-blur-sm text-xs font-semibold tracking-wider text-[#A27035] uppercase shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-[#A27035]" />
            Your AI-Powered Personal Stylist
          </div>

          <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-[#1F140B] leading-[1.1]">
            Dress with intention. Guided by AI.
          </h1>

          <p className="text-base sm:text-xl text-[#5C3826] leading-relaxed max-w-2xl mx-auto">
            Discover your 12-season color palette, catalog your digital closet, and unlock instant personalized outfit formulas curated for your skin tone, body shape, and lifestyle.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Link
              to="/color-analysis"
              className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-[#1F140B] text-[#FDFBF7] font-semibold hover:bg-[#3D2817] transition-all shadow-md flex items-center justify-center gap-2 group"
            >
              <span>Discover Your Season</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              to="/wardrobe"
              className="w-full sm:w-auto px-8 py-3.5 rounded-full border border-[#1F140B] text-[#1F140B] font-semibold hover:bg-[#F7F3EB] transition-all"
            >
              Explore Digital Closet
            </Link>
          </div>

          {/* Trust badges */}
          <div className="pt-8 flex flex-wrap items-center justify-center gap-6 text-xs text-[#8C503A] font-medium">
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-[#A27035]" />
              12-Season Scientific Color Draping
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-[#A27035]" />
              Smart Closet Cataloging & Mix-and-Match
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-[#A27035]" />
              24/7 Conversational AI Stylist
            </div>
          </div>
        </div>
      </section>

      {/* Feature Showcase Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <span className="text-xs font-bold uppercase tracking-widest text-[#A27035]">
            The Styling Suite
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#1F140B]">
            Everything you need to feel effortlessly polished
          </h2>
          <p className="text-sm sm:text-base text-[#5C3826]">
            Four core pillars designed to eliminate morning decision fatigue and curate your signature look.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Card 1: Color Analysis */}
          <div className="bg-white rounded-3xl p-6 border border-[#EFE7D8] shadow-sm hover:shadow-md transition-all space-y-4 flex flex-col justify-between group">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-[#F7F3EB] text-[#A27035] flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Palette className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-xl font-bold text-[#1F140B] mb-2">
                12-Season Color Analysis
              </h3>
              <p className="text-xs text-[#5C3826] leading-relaxed">
                Determine your exact seasonal palette (Warm Autumn, Deep Winter, etc.), undertones, and flattering jewel & neutral tones.
              </p>
            </div>
            <Link
              to="/color-analysis"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-[#A27035] hover:text-[#1F140B] uppercase tracking-wider pt-4"
            >
              Analyze Palette <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Card 2: Digital Closet */}
          <div className="bg-white rounded-3xl p-6 border border-[#EFE7D8] shadow-sm hover:shadow-md transition-all space-y-4 flex flex-col justify-between group">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-[#F7F3EB] text-[#A27035] flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Shirt className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-xl font-bold text-[#1F140B] mb-2">
                Digital Wardrobe
              </h3>
              <p className="text-xs text-[#5C3826] leading-relaxed">
                Upload photos of your clothes. Aura auto-categorizes your pieces and grades how well each item matches your seasonal palette.
              </p>
            </div>
            <Link
              to="/wardrobe"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-[#A27035] hover:text-[#1F140B] uppercase tracking-wider pt-4"
            >
              Open Closet <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Card 3: AI Consultation */}
          <div className="bg-white rounded-3xl p-6 border border-[#EFE7D8] shadow-sm hover:shadow-md transition-all space-y-4 flex flex-col justify-between group">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-[#F7F3EB] text-[#A27035] flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <MessageSquare className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-xl font-bold text-[#1F140B] mb-2">
                AI Stylist Chat
              </h3>
              <p className="text-xs text-[#5C3826] leading-relaxed">
                Chat in real-time with Aura for occasion dress codes, layering formulas, capsule checklists, and personalized styling briefs.
              </p>
            </div>
            <Link
              to="/consultation"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-[#A27035] hover:text-[#1F140B] uppercase tracking-wider pt-4"
            >
              Start Chat <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Card 4: Outfit Studio */}
          <div className="bg-white rounded-3xl p-6 border border-[#EFE7D8] shadow-sm hover:shadow-md transition-all space-y-4 flex flex-col justify-between group">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-[#F7F3EB] text-[#A27035] flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Layers className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-xl font-bold text-[#1F140B] mb-2">
                Mix-and-Match Studio
              </h3>
              <p className="text-xs text-[#5C3826] leading-relaxed">
                Build outfit collages, pair tops with bottoms and footwear, and get an AI harmony rating for every head-to-toe ensemble.
              </p>
            </div>
            <Link
              to="/studio"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-[#A27035] hover:text-[#1F140B] uppercase tracking-wider pt-4"
            >
              Build Looks <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Visual Showcase Callout */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#1F140B] text-[#FDFBF7] rounded-3xl p-8 sm:p-14 overflow-hidden relative shadow-xl">
          <div className="max-w-2xl space-y-6 relative z-10">
            <span className="px-3.5 py-1 rounded-full text-xs font-bold tracking-widest uppercase bg-[#3D2817] text-[#DFD1B8]">
              Ready to Test Instantly
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl font-bold leading-tight">
              Pre-seeded with Pro access. Try it right now.
            </h2>
            <p className="text-sm sm:text-base text-[#DFD1B8]/80 leading-relaxed">
              Log in with our instant demo credentials or create a personal account to begin auditing your closet and discovering your palette.
            </p>
            <div className="pt-2 flex flex-wrap gap-4">
              <Link
                to="/login"
                className="px-6 py-3 rounded-full bg-[#DFD1B8] text-[#1F140B] font-semibold hover:bg-white transition-all text-sm"
              >
                Sign In with 1-Click Demo
              </Link>
              <Link
                to="/pricing"
                className="px-6 py-3 rounded-full border border-[#DFD1B8]/40 text-[#FDFBF7] font-semibold hover:bg-[#3D2817] transition-all text-sm"
              >
                View Plans
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
