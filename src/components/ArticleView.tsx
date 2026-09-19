import React, { useState, useEffect } from 'react';
import { 
  Clock, 
  Eye, 
  Bookmark, 
  Share2, 
  ArrowLeft, 
  Check, 
  Volume2, 
  VolumeX, 
  Play, 
  Pause, 
  MessageSquare, 
  ThumbsUp, 
  Send, 
  Printer, 
  MapPin, 
  ChevronRight,
  Sparkles,
  Quote
} from 'lucide-react';
import { Article, NewsComment } from '../types';
import { SAMPLE_COMMENTS } from '../data/newsData';

interface ArticleViewProps {
  article: Article;
  relatedArticles: Article[];
  onBack: () => void;
  onSelectArticle: (article: Article) => void;
  onToggleBookmark: (articleId: string) => void;
  isBookmarked: boolean;
}

export const ArticleView: React.FC<ArticleViewProps> = ({
  article,
  relatedArticles,
  onBack,
  onSelectArticle,
  onToggleBookmark,
  isBookmarked,
}) => {
  const [fontSize, setFontSize] = useState<'normal' | 'large' | 'xlarge'>('normal');
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [audioProgress, setAudioProgress] = useState(0);
  const [copiedLink, setCopiedLink] = useState(false);
  const [comments, setComments] = useState<NewsComment[]>(SAMPLE_COMMENTS);
  
  // Comment Form state
  const [authorName, setAuthorName] = useState('');
  const [authorLocation, setAuthorLocation] = useState('');
  const [commentText, setCommentText] = useState('');
  const [commentSuccess, setCommentSuccess] = useState(false);

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [article.id]);

  // Audio simulation timer
  useEffect(() => {
    let interval: any;
    if (isPlayingAudio) {
      interval = setInterval(() => {
        setAudioProgress((prev) => {
          if (prev >= 100) {
            setIsPlayingAudio(false);
            return 0;
          }
          return prev + 2;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isPlayingAudio]);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  const handleShareWhatsApp = () => {
    const text = encodeURIComponent(`${article.title}\n\nKa akhri BRENKNEWS: ${window.location.href}`);
    window.open(`https://api.whatsapp.com/send?text=${text}`, '_blank');
  };

  const handleShareTwitter = () => {
    const text = encodeURIComponent(`${article.title} via @BRENKNEWS`);
    window.open(`https://twitter.com/intent/tweet?text=${text}&url=${encodeURIComponent(window.location.href)}`, '_blank');
  };

  const handleShareFacebook = () => {
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`, '_blank');
  };

  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!authorName.trim() || !commentText.trim()) return;

    const newComment: NewsComment = {
      id: `c-${Date.now()}`,
      authorName: authorName.trim(),
      authorLocation: authorLocation.trim() || 'Soomaaliya',
      text: commentText.trim(),
      date: 'Hadda / Just now',
      likes: 1,
    };

    setComments([newComment, ...comments]);
    setAuthorName('');
    setAuthorLocation('');
    setCommentText('');
    setCommentSuccess(true);
    setTimeout(() => setCommentSuccess(false), 4000);
  };

  const handleLikeComment = (id: string) => {
    setComments(
      comments.map((c) => (c.id === id ? { ...c, likes: c.likes + 1 } : c))
    );
  };

  const textSizeClass = {
    normal: 'text-base sm:text-lg leading-relaxed',
    large: 'text-lg sm:text-xl leading-loose',
    xlarge: 'text-xl sm:text-2xl leading-loose',
  }[fontSize];

  return (
    <article className="py-6 sm:py-10 bg-white min-h-screen">
      {/* Top Breadcrumbs & Back Bar */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 mb-6">
        <div className="flex items-center justify-between gap-2 border-b border-gray-100 pb-3">
          <button
            id="article-back-btn"
            onClick={onBack}
            className="flex items-center gap-1.5 text-xs font-bold text-gray-700 hover:text-red-600 transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Ku noqo Wararka</span>
          </button>

          <nav aria-label="Jidka Bogga" className="flex items-center gap-1.5 text-xs text-gray-500 overflow-x-auto whitespace-nowrap">
            <span className="hover:text-red-600 cursor-pointer" onClick={onBack}>Hoyga</span>
            <ChevronRight className="w-3 h-3 text-gray-300" />
            <span className="font-semibold text-red-600 uppercase">{article.categoryLabel}</span>
            {article.subcategory && (
              <>
                <ChevronRight className="w-3 h-3 text-gray-300" />
                <span className="text-gray-700">{article.subcategory}</span>
              </>
            )}
          </nav>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        
        {/* Article Header */}
        <header className="mb-6 sm:mb-8">
          {/* Badges */}
          <div className="flex flex-wrap items-center gap-2 mb-3">
            <span className="bg-red-600 text-white font-extrabold text-xs uppercase tracking-wider px-2.5 py-1 rounded">
              {article.categoryLabel}
            </span>
            {article.isBreaking && (
              <span className="bg-black text-white text-xs font-bold px-2.5 py-1 rounded border border-red-500 flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-red-500 animate-ping"></span>
                WAR DEG DEG AH
              </span>
            )}
            <span className="text-xs text-gray-500 flex items-center gap-1 font-medium">
              <Clock className="w-3.5 h-3.5" />
              {article.publishedAt}
            </span>
          </div>

          {/* Headline */}
          <h1 className="font-serif-headline text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-gray-950 leading-tight">
            {article.title}
          </h1>

          {/* Subtitle / Dek */}
          <p className="mt-4 text-base sm:text-xl text-gray-600 font-medium leading-relaxed border-l-4 border-red-600 pl-4 py-1">
            {article.subtitle}
          </p>

          {/* Author & Action Bar */}
          <div className="mt-6 pt-5 pb-4 border-y border-gray-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            
            {/* Author Byline */}
            <div className="flex items-center gap-3">
              <img
                src={article.author.avatar}
                alt={article.author.name}
                className="w-12 h-12 rounded-full object-cover border-2 border-red-600"
              />
              <div>
                <div className="font-bold text-sm text-gray-900 flex items-center gap-1.5">
                  <span>{article.author.name}</span>
                </div>
                <div className="text-xs text-gray-500 flex items-center gap-2">
                  <span>{article.author.role}</span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-red-500" />
                    {article.author.location}
                  </span>
                </div>
              </div>
            </div>

            {/* Quick Actions (Font size, Bookmark, Listen) */}
            <div className="flex items-center gap-2 flex-wrap">
              {/* Text Size Control */}
              <div className="flex items-center bg-gray-100 p-1 rounded-lg border border-gray-200 text-xs">
                <span className="text-gray-500 text-[11px] px-1 font-semibold">Qoraalka:</span>
                <button
                  id="font-normal-btn"
                  onClick={() => setFontSize('normal')}
                  className={`px-2 py-0.5 rounded cursor-pointer ${fontSize === 'normal' ? 'bg-white font-bold text-red-600 shadow-2xs' : 'text-gray-700'}`}
                >
                  A
                </button>
                <button
                  id="font-large-btn"
                  onClick={() => setFontSize('large')}
                  className={`px-2 py-0.5 rounded cursor-pointer ${fontSize === 'large' ? 'bg-white font-bold text-red-600 shadow-2xs' : 'text-gray-700'}`}
                >
                  A+
                </button>
                <button
                  id="font-xlarge-btn"
                  onClick={() => setFontSize('xlarge')}
                  className={`px-2 py-0.5 rounded cursor-pointer ${fontSize === 'xlarge' ? 'bg-white font-bold text-red-600 shadow-2xs' : 'text-gray-700'}`}
                >
                  A++
                </button>
              </div>

              {/* Bookmark Button */}
              <button
                id={`article-bookmark-${article.id}`}
                onClick={() => onToggleBookmark(article.id)}
                className={`p-2 rounded-lg border transition-colors cursor-pointer flex items-center gap-1 text-xs font-semibold ${
                  isBookmarked
                    ? 'bg-red-600 text-white border-red-600'
                    : 'bg-white text-gray-700 border-gray-200 hover:border-red-600'
                }`}
                title="Keydi warkan"
              >
                <Bookmark className="w-4 h-4 fill-current" />
                <span className="hidden sm:inline">{isBookmarked ? 'Keydsan' : 'Keydi'}</span>
              </button>

              {/* Print Button */}
              <button
                id="article-print-btn"
                onClick={() => window.print()}
                className="p-2 rounded-lg border border-gray-200 hover:bg-gray-100 text-gray-700 transition-colors cursor-pointer hidden md:flex items-center gap-1 text-xs"
                title="Daabac warkan"
              >
                <Printer className="w-4 h-4" />
              </button>
            </div>

          </div>

          {/* Audio Listen Box ("Dhageyso Warka") */}
          <div className="mt-4 bg-red-50/60 border border-red-200 rounded-xl p-3.5 flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="flex items-center gap-3 w-full sm:w-auto">
              <button
                id="article-audio-play-btn"
                onClick={() => setIsPlayingAudio(!isPlayingAudio)}
                className="w-10 h-10 rounded-full bg-red-600 text-white flex items-center justify-center shrink-0 hover:bg-red-700 transition-colors cursor-pointer shadow-sm"
              >
                {isPlayingAudio ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-current ml-0.5" />}
              </button>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-gray-900">
                    Dhageyso Warka (Codka BRENKNEWS)
                  </span>
                  <span className="text-[10px] bg-red-600 text-white px-1.5 py-0.2 rounded uppercase font-bold">
                    Audio
                  </span>
                </div>
                <p className="text-[11px] text-gray-500">
                  {isPlayingAudio ? 'Wuu socdaa...' : 'Guji badhanka si aad u dhageysato warka oo cod ah'} • {article.audioDuration || '3:15'}
                </p>
              </div>
            </div>

            {/* Audio Progress Bar */}
            <div className="w-full sm:w-48 flex items-center gap-2">
              <div className="flex-1 bg-red-200 h-1.5 rounded-full overflow-hidden">
                <div 
                  className="bg-red-600 h-full transition-all duration-300"
                  style={{ width: `${audioProgress}%` }}
                ></div>
              </div>
              <span className="text-[10px] font-mono text-red-900 font-bold">
                {audioProgress}%
              </span>
            </div>
          </div>
        </header>

        {/* Featured Image */}
        <figure className="mb-8">
          <div className="rounded-2xl overflow-hidden border border-gray-200 shadow-md">
            <img
              src={article.imageUrl}
              alt={article.title}
              className="w-full h-auto max-h-[500px] object-cover"
            />
          </div>
          <figcaption className="mt-2.5 text-xs text-gray-500 flex flex-col sm:flex-row sm:items-center justify-between gap-1 px-1">
            <span>{article.imageCaption}</span>
            <span className="font-semibold text-gray-600 shrink-0">{article.imageCredit}</span>
          </figcaption>
        </figure>

        {/* Key Takeaways Box ("Qodobada Muhiimka ah") */}
        {article.keyPoints && article.keyPoints.length > 0 && (
          <div className="mb-8 bg-[#F8F9FA] rounded-xl p-5 border-l-4 border-red-600 border-y border-r border-gray-200">
            <h3 className="font-bold text-sm text-gray-900 uppercase tracking-wider mb-3 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-red-600" />
              <span>Qodobada Muhiimka ah ee Warkan</span>
            </h3>
            <ul className="space-y-2 text-sm text-gray-700">
              {article.keyPoints.map((point, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="text-red-600 font-bold text-base leading-none">•</span>
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Article Body Content */}
        <div className={`text-gray-800 font-serif-headline space-y-5 ${textSizeClass}`}>
          {article.content.map((paragraph, idx) => (
            <p key={idx} className={idx === 0 ? 'drop-cap leading-relaxed' : 'leading-relaxed'}>
              {paragraph}
            </p>
          ))}
        </div>

        {/* Pull Quote */}
        {article.quote && (
          <div className="my-8 py-6 px-6 bg-red-50/50 rounded-2xl border-y-2 border-red-600 flex gap-4">
            <Quote className="w-10 h-10 text-red-500 shrink-0 rotate-180 opacity-80" />
            <div>
              <blockquote className="font-serif-headline text-lg sm:text-xl italic font-bold text-gray-900 leading-snug">
                "{article.quote.text}"
              </blockquote>
              <div className="mt-3 text-xs font-sans text-gray-600">
                <strong className="text-gray-900">{article.quote.author}</strong> — {article.quote.role}
              </div>
            </div>
          </div>
        )}

        {/* Article Tags */}
        <div className="mt-8 pt-6 border-t border-gray-200">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-bold text-gray-500 uppercase tracking-wider mr-1">
              Mowduucyada:
            </span>
            {article.tags.map((tag, idx) => (
              <span
                key={idx}
                className="bg-gray-100 hover:bg-red-50 hover:text-red-600 text-gray-700 text-xs font-semibold px-3 py-1 rounded-full cursor-pointer transition-colors border border-gray-200"
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>

        {/* Social Share Ribbon */}
        <div className="mt-6 p-4 bg-gray-50 rounded-xl border border-gray-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <span className="font-bold text-xs uppercase tracking-wider text-gray-900">
            La wadaag asxaabtaada warkan:
          </span>
          <div className="flex items-center gap-2">
            {/* WhatsApp */}
            <button
              id="share-whatsapp-btn"
              onClick={handleShareWhatsApp}
              className="bg-[#25D366] hover:bg-[#20ba59] text-white text-xs font-bold px-3 py-1.5 rounded-lg flex items-center gap-1.5 cursor-pointer shadow-xs transition-colors"
            >
              <span>WhatsApp</span>
            </button>
            {/* Facebook */}
            <button
              id="share-facebook-btn"
              onClick={handleShareFacebook}
              className="bg-[#1877F2] hover:bg-[#166fe5] text-white text-xs font-bold px-3 py-1.5 rounded-lg flex items-center gap-1.5 cursor-pointer shadow-xs transition-colors"
            >
              <span>Facebook</span>
            </button>
            {/* X */}
            <button
              id="share-twitter-btn"
              onClick={handleShareTwitter}
              className="bg-black hover:bg-gray-800 text-white text-xs font-bold px-3 py-1.5 rounded-lg flex items-center gap-1.5 cursor-pointer shadow-xs transition-colors"
            >
              <span>X (Twitter)</span>
            </button>
            {/* Copy Link */}
            <button
              id="copy-article-link-btn"
              onClick={handleCopyLink}
              className="bg-white hover:bg-gray-100 border border-gray-300 text-gray-700 text-xs font-semibold px-3 py-1.5 rounded-lg flex items-center gap-1 cursor-pointer transition-colors"
            >
              {copiedLink ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Share2 className="w-3.5 h-3.5" />}
              <span>{copiedLink ? 'Waa la guriyay!' : 'Koobiyeey Link'}</span>
            </button>
          </div>
        </div>

        {/* Author Bio Box */}
        <div className="mt-8 p-6 bg-white rounded-2xl border border-gray-200 shadow-xs flex flex-col sm:flex-row items-center sm:items-start gap-4 text-center sm:text-left">
          <img
            src={article.author.avatar}
            alt={article.author.name}
            className="w-16 h-16 rounded-full object-cover border-2 border-red-600 shrink-0"
          />
          <div>
            <span className="text-[10px] font-bold text-red-600 uppercase tracking-wider">
              Qoraha Warbixintan
            </span>
            <h4 className="font-bold text-base text-gray-950 mt-0.5">
              {article.author.name}
            </h4>
            <p className="text-xs text-gray-500 mt-0.5">
              {article.author.role} — BRENKNEWS Bureau
            </p>
            <p className="text-xs text-gray-600 mt-2 leading-relaxed">
              Wuxuu wax ka qoraa arrimaha siyaasadda, amniga, iyo dib-u-dhiska Soomaaliya. Kala xiriir xafiiska wararka BRENKNEWS.
            </p>
          </div>
        </div>

        {/* Interactive Comments Section */}
        <section className="mt-10 pt-8 border-t-2 border-gray-900">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-red-600" />
              <h3 className="font-black text-xl text-gray-950 uppercase tracking-tight">
                Aragtida Dadweynaha ({comments.length})
              </h3>
            </div>
            <span className="text-xs text-gray-500">
              Fikirkaagu waa noo muhiim
            </span>
          </div>

          {/* Post Comment Form */}
          <form onSubmit={handleAddComment} className="bg-[#F8F9FA] rounded-2xl p-5 border border-gray-200 mb-8 shadow-xs">
            <h4 className="font-bold text-sm text-gray-900 mb-3">
              Kala dhiibo fikirkaaga warkan:
            </h4>

            {commentSuccess && (
              <div className="mb-4 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs p-3 rounded-lg flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Faalladaada si guul leh ayaa loo diiwaangeliyay! Waad ku mahadsan tahay aragtidaada.</span>
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Magacaaga *</label>
                <input
                  id="comment-author-name"
                  type="text"
                  required
                  placeholder="Tusaale: Axmed Cabdi"
                  value={authorName}
                  onChange={(e) => setAuthorName(e.target.value)}
                  className="w-full text-xs p-2.5 rounded-lg border border-gray-300 focus:outline-none focus:border-red-600 bg-white"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Magaalada / Dalka</label>
                <input
                  id="comment-author-city"
                  type="text"
                  placeholder="Tusaale: Muqdisho ama London"
                  value={authorLocation}
                  onChange={(e) => setAuthorLocation(e.target.value)}
                  className="w-full text-xs p-2.5 rounded-lg border border-gray-300 focus:outline-none focus:border-red-600 bg-white"
                />
              </div>
            </div>

            <div className="mb-3">
              <label className="block text-xs font-semibold text-gray-700 mb-1">Faalladaada *</label>
              <textarea
                id="comment-author-text"
                required
                rows={3}
                placeholder="Qor aragtidaada ku aaddan warkan..."
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                className="w-full text-xs p-2.5 rounded-lg border border-gray-300 focus:outline-none focus:border-red-600 bg-white"
              ></textarea>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-[11px] text-gray-400">
                Faallooyinka waxa lagu maamulaa xeerka asluubta saxaafadda
              </span>
              <button
                id="submit-comment-btn"
                type="submit"
                className="bg-red-600 hover:bg-red-700 text-white font-bold text-xs px-5 py-2.5 rounded-lg flex items-center gap-1.5 cursor-pointer shadow-xs transition-colors"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Dir Faallada</span>
              </button>
            </div>
          </form>

          {/* Comments List */}
          <div className="space-y-4">
            {comments.map((comm) => (
              <div key={comm.id} className="bg-white rounded-xl p-4 border border-gray-200 shadow-xs">
                <div className="flex items-center justify-between pb-2 border-b border-gray-100 mb-2">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-sm text-gray-900">{comm.authorName}</span>
                    <span className="text-[11px] text-gray-400">({comm.authorLocation})</span>
                  </div>
                  <span className="text-[11px] text-gray-400">{comm.date}</span>
                </div>
                <p className="text-xs sm:text-sm text-gray-700 leading-relaxed">
                  {comm.text}
                </p>
                <div className="mt-3 flex items-center justify-end">
                  <button
                    onClick={() => handleLikeComment(comm.id)}
                    className="flex items-center gap-1 text-[11px] text-gray-500 hover:text-red-600 cursor-pointer font-medium"
                  >
                    <ThumbsUp className="w-3.5 h-3.5" />
                    <span>Waxtar leh ({comm.likes})</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Related Articles Section */}
        {relatedArticles.length > 0 && (
          <section className="mt-12 pt-8 border-t-2 border-gray-900">
            <div className="flex items-center justify-between pb-3 mb-6 border-b border-gray-200">
              <h3 className="font-black text-xl text-gray-950 uppercase tracking-tight">
                Wararka La Xiriira
              </h3>
              <span className="text-xs text-red-600 font-bold hover:underline cursor-pointer" onClick={onBack}>
                Eeg Dhammaan Wararka &rarr;
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
              {relatedArticles.slice(0, 3).map((rel) => (
                <div
                  key={rel.id}
                  onClick={() => onSelectArticle(rel)}
                  className="bg-white rounded-xl overflow-hidden border border-gray-200 hover:shadow-md transition-all cursor-pointer group flex flex-col justify-between"
                >
                  <div>
                    <div className="relative aspect-16/10 overflow-hidden">
                      <img
                        src={rel.imageUrl}
                        alt={rel.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <span className="absolute top-2 left-2 bg-red-600 text-white text-[10px] font-bold px-2 py-0.5 rounded">
                        {rel.categoryLabel}
                      </span>
                    </div>
                    <div className="p-3.5">
                      <span className="text-[10px] text-gray-400 block mb-1">{rel.publishedAt.split(',')[0]}</span>
                      <h4 className="font-serif-headline text-xs sm:text-sm font-bold text-gray-900 group-hover:text-red-600 transition-colors line-clamp-2">
                        {rel.title}
                      </h4>
                    </div>
                  </div>
                  <div className="p-3.5 pt-0 text-[11px] text-red-600 font-bold">
                    Akhri Warkan &rarr;
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

      </div>
    </article>
  );
};
