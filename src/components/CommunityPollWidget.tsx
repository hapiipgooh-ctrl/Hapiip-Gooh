import React, { useState } from 'react';
import { Vote, CheckCircle2, Users, BarChart2 } from 'lucide-react';
import { CommunityPoll } from '../types';

interface CommunityPollWidgetProps {
  poll: CommunityPoll;
  onVote: (optionId: string) => void;
}

export const CommunityPollWidget: React.FC<CommunityPollWidgetProps> = ({
  poll,
  onVote,
}) => {
  const [hasVoted, setHasVoted] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const handleCastVote = (optId: string) => {
    if (hasVoted) return;
    setSelectedOption(optId);
    setHasVoted(true);
    onVote(optId);
  };

  return (
    <div className="bg-white rounded-2xl p-5 border border-gray-200 shadow-xs">
      <div className="flex items-center justify-between pb-3 mb-3 border-b border-gray-100">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-red-50 text-red-600 flex items-center justify-center">
            <Vote className="w-4 h-4" />
          </div>
          <div>
            <h3 className="font-bold text-xs uppercase tracking-wider text-red-600">
              Aftida Dadweynaha (Poll)
            </h3>
            <span className="text-[10px] text-gray-400">Aragtida Shacabka Soomaaliyeed</span>
          </div>
        </div>
        <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
          Toos
        </span>
      </div>

      <h4 className="font-serif-headline text-sm font-bold text-gray-900 mb-3 leading-snug">
        {poll.question}
      </h4>

      <div className="space-y-2">
        {poll.options.map((opt) => {
          const percentage = poll.totalVotes > 0 ? Math.round((opt.votes / poll.totalVotes) * 100) : 0;
          const isSelected = selectedOption === opt.id;

          return (
            <div key={opt.id} className="relative">
              {hasVoted ? (
                <div className="p-2.5 rounded-xl border border-gray-200 bg-gray-50 overflow-hidden relative">
                  {/* Progress fill */}
                  <div
                    className={`absolute top-0 bottom-0 left-0 ${
                      isSelected ? 'bg-red-100' : 'bg-gray-200/70'
                    } transition-all duration-500`}
                    style={{ width: `${percentage}%` }}
                  ></div>

                  <div className="relative z-10 flex items-center justify-between text-xs">
                    <span className={`font-semibold ${isSelected ? 'text-red-700 font-bold' : 'text-gray-800'}`}>
                      {opt.text} {isSelected && '✓'}
                    </span>
                    <span className="font-mono font-bold text-gray-700">{percentage}%</span>
                  </div>
                </div>
              ) : (
                <button
                  onClick={() => handleCastVote(opt.id)}
                  className="w-full text-left p-2.5 rounded-xl border border-gray-200 hover:border-red-400 hover:bg-red-50/40 text-xs font-semibold text-gray-800 transition-all cursor-pointer flex items-center justify-between group"
                >
                  <span>{opt.text}</span>
                  <span className="text-[10px] text-gray-400 group-hover:text-red-600 font-bold uppercase">
                    Dhiibo Codka →
                  </span>
                </button>
              )}
            </div>
          );
        })}
      </div>

      <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between text-[11px] text-gray-400">
        <span className="flex items-center gap-1">
          <Users className="w-3 h-3 text-gray-400" />
          <strong className="text-gray-700 font-mono">{poll.totalVotes.toLocaleString()}</strong> qof ayaa codeeyay
        </span>
        {hasVoted && (
          <span className="text-emerald-600 font-bold flex items-center gap-1">
            <CheckCircle2 className="w-3 h-3" />
            Codkaagii waa la diiwaangeliyay
          </span>
        )}
      </div>
    </div>
  );
};
