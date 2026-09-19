import React from 'react';
import { Megaphone, X } from 'lucide-react';
import { OwnerAnnouncement } from '../types';

interface OwnerAnnouncementBannerProps {
  announcement: OwnerAnnouncement;
  onDismiss?: () => void;
}

export const OwnerAnnouncementBanner: React.FC<OwnerAnnouncementBannerProps> = ({
  announcement,
  onDismiss,
}) => {
  if (!announcement.active || !announcement.message) return null;

  return (
    <div className="bg-gradient-to-r from-red-700 via-red-600 to-red-800 text-white text-xs py-2 px-4 shadow-md border-b border-red-900/30">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
        <div className="flex items-center gap-2 flex-1">
          <span className="bg-white text-red-700 text-[10px] font-black uppercase px-2 py-0.5 rounded shadow-xs shrink-0 flex items-center gap-1">
            <Megaphone className="w-3 h-3" />
            OGAYSIIS RASMI AH
          </span>
          <p className="font-medium text-white line-clamp-1">
            {announcement.message}
          </p>
        </div>
        {onDismiss && (
          <button
            onClick={onDismiss}
            className="text-white/80 hover:text-white p-1 rounded hover:bg-red-800/50 cursor-pointer"
            title="Xir ogaysiiskan"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        )}
      </div>
    </div>
  );
};
