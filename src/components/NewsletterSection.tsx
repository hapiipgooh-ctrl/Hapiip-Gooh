import React, { useState } from 'react';
import { Mail, CheckCircle2, ShieldCheck, Sparkles } from 'lucide-react';

interface NewsletterSectionProps {
  onSubscribe?: (email: string) => void;
}

export const NewsletterSection: React.FC<NewsletterSectionProps> = ({ onSubscribe }) => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) return;
    if (onSubscribe) {
      onSubscribe(email);
    }
    setSubmitted(true);
    setEmail('');
  };

  return (
    <section aria-label="Warsidaha BRENKNEWS" className="py-12 bg-gradient-to-br from-gray-950 via-[#111827] to-gray-900 text-white relative overflow-hidden border-t border-gray-800">
      {/* Decorative accent */}
      <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-red-600/15 blur-3xl pointer-events-none"></div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center relative z-10">
        <div className="inline-flex items-center gap-2 bg-red-600/20 border border-red-500/40 text-red-400 text-xs font-bold px-3 py-1 rounded-full mb-4">
          <Sparkles className="w-3.5 h-3.5" />
          <span>WARSIDAHA MAALINLAHA AH EE BRENKNEWS</span>
        </div>

        <h2 className="font-serif-headline text-2xl sm:text-3xl md:text-4xl font-black text-white leading-tight">
          Subax Kasta Ku Hel Wararka Xaqiiqda Ah Email-kaaga
        </h2>

        <p className="mt-3 text-sm sm:text-base text-gray-300 max-w-2xl mx-auto leading-relaxed">
          Ku biir in ka badan 85,000 oo qof oo ku xiran warsidaha BRENKNEWS. Waxaan kuu soo koobeynaa dhacdooyinka ugu waaweyn ee Soomaaliya iyo caalamka 7:00 subaxnimo.
        </p>

        {submitted ? (
          <div className="mt-8 bg-emerald-950/70 border border-emerald-500 text-emerald-300 p-4 rounded-xl max-w-lg mx-auto flex items-center justify-center gap-3 animate-fade-in">
            <CheckCircle2 className="w-6 h-6 text-emerald-400 shrink-0" />
            <div className="text-left text-xs sm:text-sm">
              <strong className="block font-bold">Waad ku guuleysatay diiwaangelinta!</strong>
              <span>Waxaan kuugu soo diri doonnaa xaqiijin email-kaaga. Waad ku mahadsan tahay ku xirnaanshahaaga BRENKNEWS.</span>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-8 max-w-lg mx-auto">
            <div className="flex flex-col sm:flex-row gap-2">
              <div className="relative flex-1">
                <Mail className="w-5 h-5 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  id="newsletter-email-input"
                  type="email"
                  required
                  placeholder="Gali email-kaaga (tusaale: magacaa@gmail.com)..."
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-gray-900 border border-gray-700 text-white placeholder-gray-400 text-sm pl-11 pr-4 py-3.5 rounded-xl focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 shadow-inner"
                />
              </div>
              <button
                id="newsletter-submit-btn"
                type="submit"
                className="bg-red-600 hover:bg-red-700 text-white font-bold text-sm px-6 py-3.5 rounded-xl cursor-pointer transition-colors shrink-0 shadow-lg shadow-red-900/30"
              >
                Is-Diiwaangeli
              </button>
            </div>

            <div className="mt-3 flex items-center justify-center gap-2 text-xs text-gray-400">
              <ShieldCheck className="w-3.5 h-3.5 text-gray-400" />
              <span>Email-kaagu waa ammaan. Ma dirno spam mana la wadaagno qolo saddexaad.</span>
            </div>
          </form>
        )}
      </div>
    </section>
  );
};
