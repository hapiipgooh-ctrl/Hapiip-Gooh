import React, { useState } from 'react';
import { 
  CloudSun, 
  Clock, 
  TrendingUp, 
  Moon, 
  Sun, 
  Share2, 
  Radio, 
  ChevronDown, 
  Check, 
  Volume2
} from 'lucide-react';
import { CITY_WEATHERS, EXCHANGE_RATES, MOGADISHU_PRAYER_TIMES } from '../data/newsData';

interface TopUtilityBarProps {
  fontSize: 'sm' | 'md' | 'lg';
  setFontSize: (size: 'sm' | 'md' | 'lg') => void;
  onOpenLive: () => void;
}

export const TopUtilityBar: React.FC<TopUtilityBarProps> = ({
  fontSize,
  setFontSize,
  onOpenLive,
}) => {
  const [selectedCity, setSelectedCity] = useState(0);
  const [showPrayerModal, setShowPrayerModal] = useState(false);
  const [showRatesModal, setShowRatesModal] = useState(false);

  // Today in Somali
  const todaySomali = new Intl.DateTimeFormat('so-SO', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(new Date());

  const weather = CITY_WEATHERS[selectedCity];

  return (
    <aside aria-label="Xogta Cimilada iyo Sarifka" className="bg-[#111827] text-gray-300 text-xs border-b border-gray-800 hidden sm:block">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2">
        <div className="flex flex-wrap items-center justify-between gap-3">
          
          {/* Left: Date, City Weather & Prayer */}
          <div className="flex items-center space-x-4 rtl:space-x-reverse">
            <span className="font-medium text-gray-200 capitalize flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-red-500" />
              {todaySomali || 'Jimco, 18 Sebtembar 2026'}
            </span>

            <span className="text-gray-600">|</span>

            {/* Weather dropdown */}
            <div className="relative group">
              <button 
                id="weather-dropdown-btn"
                className="flex items-center gap-1.5 hover:text-white cursor-pointer transition-colors"
                onClick={() => setSelectedCity((prev) => (prev + 1) % CITY_WEATHERS.length)}
                title="Guji si aad u bedesho magaalada"
              >
                <CloudSun className="w-3.5 h-3.5 text-amber-400" />
                <span className="font-semibold text-gray-200">{weather.city}:</span>
                <span>{weather.temp}</span>
                <span className="text-gray-400 text-[11px]">({weather.condition})</span>
                <ChevronDown className="w-3 h-3 text-gray-400 group-hover:text-white" />
              </button>
            </div>

            <span className="text-gray-600">|</span>

            {/* Prayer Times Button */}
            <div className="relative">
              <button
                id="prayer-times-btn"
                onClick={() => setShowPrayerModal(!showPrayerModal)}
                className="flex items-center gap-1 hover:text-white transition-colors cursor-pointer text-gray-300"
              >
                <Moon className="w-3.5 h-3.5 text-red-400" />
                <span>Salaadda Xigta: <strong className="text-white">Duhur 12:02 PM</strong></span>
              </button>

              {/* Prayer Times Dropdown Popover */}
              {showPrayerModal && (
                <div 
                  className="absolute left-0 mt-2 w-64 bg-gray-900 border border-gray-700 rounded-lg shadow-xl p-3 z-50 text-gray-200"
                  onMouseLeave={() => setShowPrayerModal(false)}
                >
                  <div className="flex justify-between items-center pb-2 border-b border-gray-800 mb-2">
                    <span className="font-bold text-red-400">Jadwalka Salaadaha (Muqdisho)</span>
                    <span className="text-[10px] text-gray-400">Maanta</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-[11px]">
                    <div className="flex justify-between p-1 bg-gray-800/60 rounded"><span>Subax:</span> <strong>{MOGADISHU_PRAYER_TIMES.fajr}</strong></div>
                    <div className="flex justify-between p-1 bg-gray-800/60 rounded"><span>Qorrax:</span> <strong>{MOGADISHU_PRAYER_TIMES.sunrise}</strong></div>
                    <div className="flex justify-between p-1 bg-red-950/40 border border-red-800/40 rounded text-red-300"><span>Duhur:</span> <strong>{MOGADISHU_PRAYER_TIMES.dhuhr}</strong></div>
                    <div className="flex justify-between p-1 bg-gray-800/60 rounded"><span>Casar:</span> <strong>{MOGADISHU_PRAYER_TIMES.asr}</strong></div>
                    <div className="flex justify-between p-1 bg-gray-800/60 rounded"><span>Qorrax-dhac:</span> <strong>{MOGADISHU_PRAYER_TIMES.maghrib}</strong></div>
                    <div className="flex justify-between p-1 bg-gray-800/60 rounded"><span>Cisha:</span> <strong>{MOGADISHU_PRAYER_TIMES.isha}</strong></div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right: Exchange Rates, Text Size, Live Stream */}
          <div className="flex items-center space-x-4 rtl:space-x-reverse">
            {/* Currency Rates */}
            <div className="relative">
              <button 
                id="currency-rates-btn"
                onClick={() => setShowRatesModal(!showRatesModal)}
                className="flex items-center gap-1.5 hover:text-white transition-colors cursor-pointer"
                title="Sicirka Sarifka Lacagaha"
              >
                <TrendingUp className="w-3.5 h-3.5 text-emerald-400" />
                <span>USD/SOS:</span>
                <span className="font-mono text-emerald-400 font-semibold">26,200</span>
                <span className="text-[10px] text-gray-400 bg-gray-800 px-1 py-0.5 rounded">Bakaaraha</span>
              </button>

              {showRatesModal && (
                <div 
                  className="absolute right-0 mt-2 w-64 bg-gray-900 border border-gray-700 rounded-lg shadow-xl p-3 z-50 text-gray-200"
                  onMouseLeave={() => setShowRatesModal(false)}
                >
                  <div className="font-bold text-emerald-400 pb-1.5 border-b border-gray-800 mb-2">
                    Sicirka Sarifka Shillin Soomaaliga
                  </div>
                  <div className="space-y-1.5 text-[11px]">
                    {EXCHANGE_RATES.map((rate, idx) => (
                      <div key={idx} className="flex justify-between items-center py-1 border-b border-gray-800/50">
                        <span className="font-semibold text-gray-300">{rate.currency}</span>
                        <div className="text-right">
                          <span className="font-mono text-emerald-400 font-bold">{rate.buy.toLocaleString()}</span>
                          <span className="text-[10px] text-gray-400 ml-1.5">{rate.change}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <span className="text-gray-600">|</span>

            {/* Font Size Adjuster */}
            <div className="flex items-center gap-1 bg-gray-800 px-2 py-0.5 rounded text-[11px]">
              <span className="text-gray-400 mr-1">Qoraalka:</span>
              <button 
                id="font-size-sm"
                onClick={() => setFontSize('sm')}
                className={`px-1.5 py-0.5 rounded font-bold cursor-pointer ${fontSize === 'sm' ? 'bg-red-600 text-white' : 'hover:text-white'}`}
                title="Qoraal Caadi ah"
              >
                A-
              </button>
              <button 
                id="font-size-md"
                onClick={() => setFontSize('md')}
                className={`px-1.5 py-0.5 rounded font-bold cursor-pointer ${fontSize === 'md' ? 'bg-red-600 text-white' : 'hover:text-white'}`}
                title="Qoraal Dhexdhexaad ah"
              >
                A
              </button>
              <button 
                id="font-size-lg"
                onClick={() => setFontSize('lg')}
                className={`px-1.5 py-0.5 rounded font-bold cursor-pointer ${fontSize === 'lg' ? 'bg-red-600 text-white' : 'hover:text-white'}`}
                title="Qoraal Weyn"
              >
                A+
              </button>
            </div>

            {/* Live Radio / Broadcast Button */}
            <button
              id="live-radio-stream-btn"
              onClick={onOpenLive}
              className="flex items-center gap-1.5 bg-red-600 hover:bg-red-700 text-white font-bold px-2.5 py-1 rounded transition-colors shadow-sm cursor-pointer"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
              </span>
              <Radio className="w-3 h-3" />
              <span>TOOS / LIVE</span>
            </button>
          </div>

        </div>
      </div>
    </aside>
  );
};
