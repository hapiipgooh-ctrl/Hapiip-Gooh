import React from 'react';
import { 
  ArrowUp, 
  Mail, 
  Phone, 
  MapPin, 
  Globe, 
  ShieldCheck, 
  Radio, 
  Share2, 
  Smartphone,
  ExternalLink
} from 'lucide-react';
import { CategoryId } from '../types';
import { CATEGORIES_LIST } from '../data/newsData';

interface FooterProps {
  onSelectCategory: (catId: CategoryId) => void;
  onGoHome: () => void;
  onOpenLive: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onSelectCategory,
  onGoHome,
  onOpenLive,
}) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#111827] text-white border-t border-gray-800 pt-12 pb-20 sm:pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Footer: Brand, Tagline, Social */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 pb-10 border-b border-gray-800">
          
          {/* Brand Info (Col span 2) */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-1.5 cursor-pointer" onClick={onGoHome}>
              <span className="font-brand text-3xl font-black text-white">
                BRENK<span className="text-red-600">NEWS</span>
              </span>
              <span className="w-2.5 h-2.5 rounded-full bg-red-600 mb-1"></span>
            </div>
            <p className="text-xs text-gray-400 mt-2 font-medium">
              Wakaaladda Wararka Madaxa-bannaan ee Soomaaliya
            </p>
            <p className="text-xs text-gray-400 mt-3 leading-relaxed max-w-sm">
              BRENKNEWS waa warbaahin qaran oo madax-bannaan, xarunteeduna tahay magaalada Muqdisho. Waxaan daaha ka rognaa xaqiiqooyinka dhabta ah ee Soomaaliya iyo caalamka annagoo dhowreyna anshaxa iyo madax-bannaanida saxaafadda.
            </p>

            {/* Social Media Links */}
            <div className="mt-5 flex items-center gap-2.5">
              <a 
                href="https://facebook.com" 
                target="_blank" 
                rel="noreferrer"
                className="w-8 h-8 rounded-full bg-gray-800 hover:bg-[#1877F2] text-gray-300 hover:text-white flex items-center justify-center transition-colors text-xs font-bold"
                aria-label="Facebook BRENKNEWS"
              >
                f
              </a>
              <a 
                href="https://twitter.com" 
                target="_blank" 
                rel="noreferrer"
                className="w-8 h-8 rounded-full bg-gray-800 hover:bg-black text-gray-300 hover:text-white flex items-center justify-center transition-colors text-xs font-bold"
                aria-label="X BRENKNEWS"
              >
                𝕏
              </a>
              <a 
                href="https://t.me" 
                target="_blank" 
                rel="noreferrer"
                className="w-8 h-8 rounded-full bg-gray-800 hover:bg-[#0088cc] text-gray-300 hover:text-white flex items-center justify-center transition-colors text-xs font-bold"
                aria-label="Telegram BRENKNEWS"
              >
                tg
              </a>
              <a 
                href="https://youtube.com" 
                target="_blank" 
                rel="noreferrer"
                className="w-8 h-8 rounded-full bg-gray-800 hover:bg-[#FF0000] text-gray-300 hover:text-white flex items-center justify-center transition-colors text-xs font-bold"
                aria-label="YouTube BRENKNEWS"
              >
                yt
              </a>
              <a 
                href="https://whatsapp.com" 
                target="_blank" 
                rel="noreferrer"
                className="w-8 h-8 rounded-full bg-gray-800 hover:bg-[#25D366] text-gray-300 hover:text-white flex items-center justify-center transition-colors text-xs font-bold"
                aria-label="WhatsApp Channel BRENKNEWS"
              >
                wa
              </a>
            </div>
          </div>

          {/* Quick Categories */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-red-500 mb-4 border-b border-gray-800 pb-1">
              Qeybaha Wararka
            </h4>
            <ul className="space-y-2 text-xs text-gray-400">
              {CATEGORIES_LIST.slice(1, 6).map((cat) => (
                <li key={cat.id}>
                  <button
                    onClick={() => onSelectCategory(cat.id as CategoryId)}
                    className="hover:text-red-400 transition-colors cursor-pointer"
                  >
                    • {cat.nameSo}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* More Categories & Multimedia */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-red-500 mb-4 border-b border-gray-800 pb-1">
              Barnaamijyada & Falanqeynta
            </h4>
            <ul className="space-y-2 text-xs text-gray-400">
              <li>
                <button
                  onClick={() => onSelectCategory('rayiga')}
                  className="hover:text-red-400 transition-colors cursor-pointer"
                >
                  • Falanqeynta Todobaadka
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectCategory('farsamada')}
                  className="hover:text-red-400 transition-colors cursor-pointer"
                >
                  • Tiknoolajiyadda & IT
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectCategory('cayaaraha')}
                  className="hover:text-red-400 transition-colors cursor-pointer"
                >
                  • Cayaaraha & Tartammada
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenLive}
                  className="hover:text-red-400 transition-colors cursor-pointer flex items-center gap-1 text-red-400 font-semibold"
                >
                  <Radio className="w-3 h-3" />
                  <span>• BRENKNEWS Toos / FM</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Bureaus & Contact */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-red-500 mb-4 border-b border-gray-800 pb-1">
              Xafiisyada BRENKNEWS
            </h4>
            <div className="space-y-2 text-xs text-gray-400">
              <div className="flex items-start gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-red-500 shrink-0 mt-0.5" />
                <span>KM4, Maka Al-Mukarama, Muqdisho</span>
              </div>
              <div className="flex items-start gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-red-500 shrink-0 mt-0.5" />
                <span>Hargeysa, Garoowe, Kismaayo</span>
              </div>
              <div className="flex items-center gap-1.5 pt-1">
                <Phone className="w-3.5 h-3.5 text-gray-500" />
                <span className="font-mono text-gray-300">+252 61 500 0000</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5 text-gray-500" />
                <span className="text-gray-300">wararka@brenknews.so</span>
              </div>
            </div>
          </div>

        </div>

        {/* Middle Footer: Mobile App Downloads Simulation */}
        <div className="py-6 border-b border-gray-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3 text-center sm:text-left">
            <Smartphone className="w-6 h-6 text-red-500 shrink-0" />
            <div>
              <h5 className="font-bold text-xs sm:text-sm text-white">
                Ku Soo Deji BRENKNEWS Taleefankaaga Gacanta
              </h5>
              <p className="text-[11px] text-gray-400">
                Ugu habboon taleefannada Android iyo iOS. Ku akhri wararka meel kasta xitaa offline.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="bg-gray-800 border border-gray-700 hover:border-gray-500 px-3 py-1.5 rounded-lg text-left cursor-pointer transition-colors">
              <span className="text-[9px] text-gray-400 block uppercase">Ka soo degso</span>
              <strong className="text-xs font-bold text-white">Google Play (Android)</strong>
            </div>
            <div className="bg-gray-800 border border-gray-700 hover:border-gray-500 px-3 py-1.5 rounded-lg text-left cursor-pointer transition-colors">
              <span className="text-[9px] text-gray-400 block uppercase">Ka soo degso</span>
              <strong className="text-xs font-bold text-white">Apple App Store</strong>
            </div>
          </div>
        </div>

        {/* Bottom Footer: Copyright & Legal */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-500">
          <p>
            &copy; {new Date().getFullYear()} BRENKNEWS Media Network. Dhammaan xuquuqda daabacaadda iyo faafintu way dhowran yihiin.
          </p>

          <div className="flex items-center gap-4">
            <button className="hover:text-gray-300 transition-colors cursor-pointer">
              Xeerka Saxaafadda
            </button>
            <span>•</span>
            <button className="hover:text-gray-300 transition-colors cursor-pointer">
              Ilaalinta Xogta
            </button>
            <span>•</span>
            <button className="hover:text-gray-300 transition-colors cursor-pointer">
              Nala Soo Xiriir
            </button>
            <button
              id="footer-back-to-top-btn"
              onClick={scrollToTop}
              className="p-2 rounded-full bg-gray-800 hover:bg-red-600 text-white transition-colors cursor-pointer ml-2"
              title="Kor ugu noqo"
              aria-label="Kor ugu noqo bogga"
            >
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
