import React, { useState } from 'react';
import { Radio, X, Volume2, VolumeX, Play, Pause, Users, Send, MessageSquare, Headphones } from 'lucide-react';

interface LiveBroadcastModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const LiveBroadcastModal: React.FC<LiveBroadcastModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [liveComments, setLiveComments] = useState([
    { name: 'Jaamac (Kismaayo)', text: 'Codku aad buu u cad yahay, salaam dhallinyarada BRENKNEWS' },
    { name: 'Xaawo (Muqdisho)', text: 'Barnaamijkan aad baan u xiiseynaa maalin kasta' },
    { name: 'Cali (Minneapolis)', text: 'Qurbaha ayaan idinka dhageysaneynaa, horumar wacan' },
  ]);
  const [inputName, setInputName] = useState('');
  const [inputText, setInputText] = useState('');

  if (!isOpen) return null;

  const handleSendLiveMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputName.trim() || !inputText.trim()) return;
    setLiveComments([
      { name: inputName.trim(), text: inputText.trim() },
      ...liveComments,
    ]);
    setInputName('');
    setInputText('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
      <div 
        className="fixed inset-0"
        onClick={onClose}
      ></div>

      <div className="relative w-full max-w-xl bg-gray-950 text-white rounded-2xl shadow-2xl border border-gray-800 overflow-hidden z-10">
        
        {/* Header */}
        <div className="p-4 bg-red-600 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-white"></span>
            </span>
            <Radio className="w-5 h-5 text-white" />
            <h3 className="font-extrabold text-sm sm:text-base tracking-wide uppercase">
              BRENKNEWS FM & TV TOOS (LIVE)
            </h3>
          </div>
          <button
            id="close-live-modal-btn"
            onClick={onClose}
            className="p-1.5 text-white/80 hover:text-white rounded-lg hover:bg-red-700 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Radio Broadcast Player Area */}
        <div className="p-6 text-center border-b border-gray-800 bg-gradient-to-b from-gray-900 to-gray-950">
          <div className="inline-block px-3 py-1 bg-red-950/60 border border-red-800/60 rounded-full text-red-400 text-xs font-semibold mb-3">
            FM 88.5 Muqdisho • FM 91.2 Hargeysa • FM 89.0 Garoowe
          </div>

          <h4 className="text-lg sm:text-xl font-black text-white">
            Barnaamijka Tooska ah: Wararka Dalka & Falanqeynta
          </h4>
          <p className="text-xs text-gray-400 mt-1">
            Wariyeyaasha: Cabdiraxmaan Cali & Maryan Axmed Jimcaale
          </p>

          {/* Equalizer simulation animation */}
          <div className="flex items-end justify-center gap-1.5 h-12 my-6">
            {[40, 75, 90, 60, 100, 45, 80, 65, 95, 50, 70, 85, 30].map((height, idx) => (
              <span
                key={idx}
                className="w-1.5 bg-red-600 rounded-full transition-all duration-300"
                style={{
                  height: isPlaying ? `${height}%` : '15%',
                  opacity: isPlaying ? 1 : 0.4,
                }}
              ></span>
            ))}
          </div>

          {/* Controls */}
          <div className="flex items-center justify-center gap-4">
            <button
              id="live-mute-toggle-btn"
              onClick={() => setIsMuted(!isMuted)}
              className="p-3 bg-gray-800 hover:bg-gray-700 rounded-full text-gray-300 hover:text-white cursor-pointer transition-colors"
              title={isMuted ? 'Daar Codka' : 'Aamusii'}
            >
              {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
            </button>

            <button
              id="live-play-toggle-btn"
              onClick={() => setIsPlaying(!isPlaying)}
              className="p-4 bg-red-600 hover:bg-red-700 rounded-full text-white cursor-pointer transition-colors shadow-lg shadow-red-900/50"
              title={isPlaying ? 'Hakad' : 'Daar'}
            >
              {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6 fill-current ml-0.5" />}
            </button>

            <div className="flex items-center gap-1.5 bg-gray-900 border border-gray-800 px-3 py-2 rounded-full text-xs text-gray-300">
              <Users className="w-3.5 h-3.5 text-red-500" />
              <span className="font-mono font-bold">14,280</span>
              <span className="text-[10px] text-gray-500">Dhageystayaal</span>
            </div>
          </div>
        </div>

        {/* Live Chat / Shoutouts */}
        <div className="p-4 bg-gray-900">
          <div className="flex items-center gap-1.5 text-xs font-bold text-gray-400 mb-2 uppercase tracking-wider">
            <MessageSquare className="w-3.5 h-3.5 text-red-500" />
            <span>Fikradaha Tooska ah ee Dhageystayaasha</span>
          </div>

          {/* Comments scroll */}
          <div className="max-h-32 overflow-y-auto space-y-2 pr-1 text-xs mb-3">
            {liveComments.map((comm, idx) => (
              <div key={idx} className="bg-gray-950/80 p-2 rounded-lg border border-gray-800">
                <strong className="text-red-400">{comm.name}:</strong>{' '}
                <span className="text-gray-300">{comm.text}</span>
              </div>
            ))}
          </div>

          {/* Form */}
          <form onSubmit={handleSendLiveMessage} className="flex gap-2">
            <input
              id="live-chat-name"
              type="text"
              placeholder="Magacaaga (Magaalada)"
              value={inputName}
              onChange={(e) => setInputName(e.target.value)}
              className="w-1/3 bg-gray-950 border border-gray-800 text-white placeholder-gray-500 text-xs px-2.5 py-2 rounded-lg focus:outline-none focus:border-red-600"
            />
            <input
              id="live-chat-text"
              type="text"
              placeholder="Qor fariintaada tooska ah..."
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              className="flex-1 bg-gray-950 border border-gray-800 text-white placeholder-gray-500 text-xs px-2.5 py-2 rounded-lg focus:outline-none focus:border-red-600"
            />
            <button
              id="live-chat-send-btn"
              type="submit"
              className="bg-red-600 hover:bg-red-700 text-white text-xs font-bold px-3 py-2 rounded-lg cursor-pointer transition-colors"
            >
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>
        </div>

      </div>
    </div>
  );
};
