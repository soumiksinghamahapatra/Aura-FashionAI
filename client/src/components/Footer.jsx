import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Heart } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-[#1F140B] text-[#FDFBF7] pt-16 pb-12 border-t border-[#3D2817]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          {/* Brand Info */}
          <div className="space-y-4 md:col-span-1">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-[#DFD1B8] flex items-center justify-center text-[#1F140B]">
                <Sparkles className="w-4 h-4 text-[#1F140B]" />
              </div>
              <span className="font-serif text-2xl font-bold tracking-widest text-[#FDFBF7]">
                AURA
              </span>
            </div>
            <p className="text-sm text-[#DFD1B8]/80 leading-relaxed">
              Your AI-powered personal stylist. Harmonize your wardrobe, discover your 12-season palette, and unlock effortless daily confidence.
            </p>
          </div>

          {/* Features */}
          <div>
            <h4 className="font-serif text-base font-semibold mb-4 text-[#FDFBF7] tracking-wider uppercase">
              Styling Suite
            </h4>
            <ul className="space-y-2.5 text-sm text-[#DFD1B8]/80">
              <li>
                <Link to="/wardrobe" className="hover:text-white transition-colors">
                  Digital Wardrobe Closet
                </Link>
              </li>
              <li>
                <Link to="/color-analysis" className="hover:text-white transition-colors">
                  12-Season Color Analysis
                </Link>
              </li>
              <li>
                <Link to="/consultation" className="hover:text-white transition-colors">
                  AI Stylist Chat
                </Link>
              </li>
              <li>
                <Link to="/studio" className="hover:text-white transition-colors">
                  Mix-and-Match Outfit Studio
                </Link>
              </li>
              <li>
                <Link to="/analyzer" className="hover:text-white transition-colors">
                  Pinterest & Street Inspo Match
                </Link>
              </li>
            </ul>
          </div>

          {/* 12 Seasons */}
          <div>
            <h4 className="font-serif text-base font-semibold mb-4 text-[#FDFBF7] tracking-wider uppercase">
              Color Seasons
            </h4>
            <div className="grid grid-cols-2 gap-2 text-xs text-[#DFD1B8]/80">
              <span>Deep Autumn</span>
              <span>Warm Autumn</span>
              <span>Soft Autumn</span>
              <span>Deep Winter</span>
              <span>Cool Winter</span>
              <span>Clear Winter</span>
              <span>Light Spring</span>
              <span>Warm Spring</span>
              <span>Clear Spring</span>
              <span>Light Summer</span>
              <span>Cool Summer</span>
              <span>Soft Summer</span>
            </div>
          </div>

          {/* Technology & Stack */}
          <div>
            <h4 className="font-serif text-base font-semibold mb-4 text-[#FDFBF7] tracking-wider uppercase">
              Architecture
            </h4>
            <p className="text-xs text-[#DFD1B8]/80 leading-relaxed mb-4">
              Fullstack Production <strong>MERN</strong> Architecture (MongoDB, Express, React.js, Node.js).
            </p>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#3D2817] text-[#DFD1B8] text-xs">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              API & Engine Operational
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-[#3D2817] flex flex-col sm:flex-row items-center justify-between text-xs text-[#DFD1B8]/60 gap-4">
          <p>© {new Date().getFullYear()} Aura AI Fashion. All rights reserved.</p>
          <div className="flex items-center gap-1">
            <span>Crafted with</span>
            <Heart className="w-3.5 h-3.5 text-rose-400 fill-rose-400" />
            <span>for personal style perfection</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
