import React, { useState, useEffect } from 'react';
import { TopUtilityBar } from './components/TopUtilityBar';
import { Header } from './components/Header';
import { BreakingNewsTicker } from './components/BreakingNewsTicker';
import { HeroNewsSection } from './components/HeroNewsSection';
import { TrendingSection } from './components/TrendingSection';
import { LatestNewsSection } from './components/LatestNewsSection';
import { CategoryShowcase } from './components/CategoryShowcase';
import { MultimediaSection } from './components/MultimediaSection';
import { ArticleView } from './components/ArticleView';
import { CategoryView } from './components/CategoryView';
import { SearchModal } from './components/SearchModal';
import { BookmarksDrawer } from './components/BookmarksDrawer';
import { NewsletterSection } from './components/NewsletterSection';
import { Footer } from './components/Footer';
import { AndroidMobileBar } from './components/AndroidMobileBar';
import { LiveBroadcastModal } from './components/LiveBroadcastModal';
import { AdminStudio } from './components/AdminStudio';
import { OwnerAnnouncementBanner } from './components/OwnerAnnouncementBanner';
import { CommunityPollWidget } from './components/CommunityPollWidget';

import { ARTICLES, BREAKING_NEWS_ITEMS } from './data/newsData';
import { Article, CategoryId, CommunityPoll, OwnerAnnouncement, Subscriber, BreakingItem } from './types';
import { Users, Megaphone, ShieldCheck, PenSquare } from 'lucide-react';

const DEFAULT_POLL: CommunityPoll = {
  id: 'poll-1',
  question: 'Miyaad taageersan tahay in dalka laga hirgeliyo nidaamka doorashada qof iyo cod ah sanadkan?',
  options: [
    { id: 'opt-1', text: 'Haa, waan taageersanahay', votes: 1420 },
    { id: 'opt-2', text: 'Maya, xilligan diyaar looma aha', votes: 310 },
    { id: 'opt-3', text: 'Weli ma hubo (Dhex-dhexaad)', votes: 95 },
  ],
  totalVotes: 1825,
  isActive: true,
};

const DEFAULT_ANNOUNCEMENT: OwnerAnnouncement = {
  id: 'ann-1',
  message: 'Ku soo dhawaada warbaahinta madaxa-bannaan ee BRENKNEWS! Xafiiska tifaftirka wuxuu heeganka ugu jiraa soo tebinta xaqiiqda.',
  active: true,
  date: '18 Sep 2026',
};

const DEFAULT_SUBSCRIBERS: Subscriber[] = [
  { id: 'sub-1', email: 'shacabka.xogdoon@gmail.com', date: 'Maanta' },
  { id: 'sub-2', email: 'jaamac.kismaayo@yahoo.com', date: 'Shalay' },
  { id: 'sub-3', email: 'hodan.muqdisho@outlook.com', date: '2 maalmood ka hor' },
  { id: 'sub-4', email: 'faarax.hargeisa@gmail.com', date: '3 maalmood ka hor' },
  { id: 'sub-5', email: 'deeqa.garowe@gmail.com', date: '4 maalmood ka hor' },
];

export default function App() {
  // Navigation & View state
  const [activeView, setActiveView] = useState<'home' | 'article' | 'category' | 'admin'>('home');
  const [currentCategory, setCurrentCategory] = useState<CategoryId>('dhammaan');
  const [currentSubcategory, setCurrentSubcategory] = useState<string | undefined>(undefined);

  // Articles state with localStorage persistence
  const [articles, setArticles] = useState<Article[]>(() => {
    try {
      const saved = localStorage.getItem('brenknews_articles');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
      return ARTICLES;
    } catch {
      return ARTICLES;
    }
  });

  const [selectedArticle, setSelectedArticle] = useState<Article>(() => articles[0] || ARTICLES[0]);

  // Announcement state with localStorage
  const [announcement, setAnnouncement] = useState<OwnerAnnouncement>(() => {
    try {
      const saved = localStorage.getItem('brenknews_announcement');
      return saved ? JSON.parse(saved) : DEFAULT_ANNOUNCEMENT;
    } catch {
      return DEFAULT_ANNOUNCEMENT;
    }
  });

  // Community Poll state with localStorage
  const [communityPoll, setCommunityPoll] = useState<CommunityPoll>(() => {
    try {
      const saved = localStorage.getItem('brenknews_poll');
      return saved ? JSON.parse(saved) : DEFAULT_POLL;
    } catch {
      return DEFAULT_POLL;
    }
  });

  // Subscribers state with localStorage
  const [subscribers, setSubscribers] = useState<Subscriber[]>(() => {
    try {
      const saved = localStorage.getItem('brenknews_subscribers');
      return saved ? JSON.parse(saved) : DEFAULT_SUBSCRIBERS;
    } catch {
      return DEFAULT_SUBSCRIBERS;
    }
  });

  // Modals & Drawers state
  const [searchModalOpen, setSearchModalOpen] = useState(false);
  const [bookmarksDrawerOpen, setBookmarksDrawerOpen] = useState(false);
  const [liveModalOpen, setLiveModalOpen] = useState(false);
  const [globalFontSize, setGlobalFontSize] = useState<'sm' | 'md' | 'lg'>('md');

  // Bookmarks state with localStorage
  const [bookmarkedIds, setBookmarkedIds] = useState<Set<string>>(() => {
    try {
      const saved = localStorage.getItem('brenknews_bookmarks');
      return saved ? new Set(JSON.parse(saved)) : new Set(['art-1', 'art-3']);
    } catch {
      return new Set(['art-1', 'art-3']);
    }
  });

  // Save changes to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('brenknews_articles', JSON.stringify(articles));
    } catch (e) {
      console.error(e);
    }
  }, [articles]);

  useEffect(() => {
    try {
      localStorage.setItem('brenknews_announcement', JSON.stringify(announcement));
    } catch (e) {
      console.error(e);
    }
  }, [announcement]);

  useEffect(() => {
    try {
      localStorage.setItem('brenknews_poll', JSON.stringify(communityPoll));
    } catch (e) {
      console.error(e);
    }
  }, [communityPoll]);

  useEffect(() => {
    try {
      localStorage.setItem('brenknews_subscribers', JSON.stringify(subscribers));
    } catch (e) {
      console.error(e);
    }
  }, [subscribers]);

  useEffect(() => {
    try {
      localStorage.setItem('brenknews_bookmarks', JSON.stringify(Array.from(bookmarkedIds)));
    } catch (e) {
      console.error(e);
    }
  }, [bookmarkedIds]);

  // Keyboard shortcut for search (Ctrl+K or Cmd+K)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        setSearchModalOpen(true);
      }
      if (e.key === 'Escape') {
        setSearchModalOpen(false);
        setBookmarksDrawerOpen(false);
        setLiveModalOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Handlers for Articles
  const handleAddArticle = (newArticle: Article) => {
    setArticles((prev) => [newArticle, ...prev]);
    setSelectedArticle(newArticle);
  };

  const handleUpdateArticle = (updated: Article) => {
    setArticles((prev) => prev.map((a) => (a.id === updated.id ? updated : a)));
    if (selectedArticle.id === updated.id) {
      setSelectedArticle(updated);
    }
  };

  const handleDeleteArticle = (articleId: string) => {
    setArticles((prev) => prev.filter((a) => a.id !== articleId));
  };

  const handleSetHeroArticle = (articleId: string) => {
    setArticles((prev) => {
      return prev.map((a) => ({
        ...a,
        isHero: a.id === articleId,
      }));
    });
  };

  const handleResetToDefaults = () => {
    if (window.confirm('Ma hubtaa inaad dib u soo celiso dhammaan wararkii asalka ahaa?')) {
      setArticles(ARTICLES);
      localStorage.removeItem('brenknews_articles');
    }
  };

  const handleToggleBookmark = (articleId: string) => {
    setBookmarkedIds((prev) => {
      const next = new Set(prev);
      if (next.has(articleId)) {
        next.delete(articleId);
      } else {
        next.add(articleId);
      }
      return next;
    });
  };

  const handleClearAllBookmarks = () => {
    setBookmarkedIds(new Set());
  };

  const handleSelectArticle = (article: Article) => {
    setSelectedArticle(article);
    setActiveView('article');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectArticleById = (articleId: string) => {
    const found = articles.find((a) => a.id === articleId);
    if (found) {
      handleSelectArticle(found);
    }
  };

  const handleSelectCategory = (catId: CategoryId, subcategory?: string) => {
    if (catId === 'dhammaan') {
      setCurrentCategory('dhammaan');
      setCurrentSubcategory(undefined);
      setActiveView('home');
    } else {
      setCurrentCategory(catId);
      setCurrentSubcategory(subcategory);
      setActiveView('category');
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleGoHome = () => {
    setCurrentCategory('dhammaan');
    setCurrentSubcategory(undefined);
    setActiveView('home');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenAdmin = () => {
    setActiveView('admin');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Community handlers
  const handleVotePoll = (optionId: string) => {
    setCommunityPoll((prev) => {
      const updatedOptions = prev.options.map((opt) =>
        opt.id === optionId ? { ...opt, votes: opt.votes + 1 } : opt
      );
      return {
        ...prev,
        options: updatedOptions,
        totalVotes: prev.totalVotes + 1,
      };
    });
  };

  const handleNewSubscriber = (email: string) => {
    const newSub: Subscriber = {
      id: `sub-${Date.now()}`,
      email,
      date: 'Hadda',
    };
    setSubscribers((prev) => [newSub, ...prev]);
  };

  // Derived datasets
  const heroArticle = articles.find((a) => a.isHero) || articles[0] || ARTICLES[0];
  const otherArticles = articles.filter((a) => a.id !== heroArticle.id);
  const subLeadArticles = [otherArticles[0] || articles[1], otherArticles[1] || articles[2]].filter(Boolean);
  const sideArticles = otherArticles.slice(2, 6);
  const trendingArticles = articles.filter((a) => a.isTrending);
  const bookmarkedArticles = articles.filter((a) => bookmarkedIds.has(a.id));
  const relatedArticles = articles.filter(
    (a) => a.id !== selectedArticle.id && (a.category === selectedArticle.category || a.isTrending)
  );

  // Dynamic breaking news ticker items
  const dynamicBreakingItems: BreakingItem[] = articles
    .filter((a) => a.isBreaking)
    .map((a) => ({
      id: `brk-${a.id}`,
      title: a.title,
      category: a.categoryLabel,
      time: a.publishedAt.split(',')[1]?.trim() || 'Hadda',
      articleId: a.id,
    }));

  const tickerItems = dynamicBreakingItems.length > 0 ? dynamicBreakingItems : BREAKING_NEWS_ITEMS;

  return (
    <div className={`min-h-screen flex flex-col bg-[#F8F9FA] text-[#111827] ${
      globalFontSize === 'sm' ? 'text-sm' : globalFontSize === 'lg' ? 'text-lg' : 'text-base'
    }`}>
      
      {/* Top Utility Information Bar */}
      <TopUtilityBar
        fontSize={globalFontSize}
        setFontSize={setGlobalFontSize}
        onOpenLive={() => setLiveModalOpen(true)}
      />

      {/* Main Header with Navigation */}
      <Header
        currentCategory={currentCategory}
        onSelectCategory={handleSelectCategory}
        onOpenSearch={() => setSearchModalOpen(true)}
        onOpenBookmarks={() => setBookmarksDrawerOpen(true)}
        onOpenLive={() => setLiveModalOpen(true)}
        onOpenAdmin={handleOpenAdmin}
        bookmarksCount={bookmarkedIds.size}
        onGoHome={handleGoHome}
      />

      {/* Owner Announcement Banner if enabled */}
      <OwnerAnnouncementBanner
        announcement={announcement}
        onDismiss={() => setAnnouncement((prev) => ({ ...prev, active: false }))}
      />

      {/* Breaking News Ticker with dynamic owner stories */}
      <BreakingNewsTicker 
        items={tickerItems}
        onSelectArticleById={handleSelectArticleById} 
      />

      {/* Main Content Area based on active view */}
      <main className="flex-1">
        
        {/* ADMIN STUDIO VIEW (MULKIILAHA) */}
        {activeView === 'admin' && (
          <AdminStudio
            articles={articles}
            onAddArticle={handleAddArticle}
            onUpdateArticle={handleUpdateArticle}
            onDeleteArticle={handleDeleteArticle}
            onSetHeroArticle={handleSetHeroArticle}
            onClose={handleGoHome}
            onViewArticle={handleSelectArticle}
            subscribers={subscribers}
            onAddSubscriber={handleNewSubscriber}
            announcement={announcement}
            onUpdateAnnouncement={setAnnouncement}
            poll={communityPoll}
            onUpdatePoll={setCommunityPoll}
            onResetToDefaults={handleResetToDefaults}
          />
        )}

        {/* HOME VIEW */}
        {activeView === 'home' && (
          <>
            {/* Hero News Section */}
            <HeroNewsSection
              heroArticle={heroArticle}
              subLeadArticles={subLeadArticles}
              sideArticles={sideArticles}
              onSelectArticle={handleSelectArticle}
              onToggleBookmark={handleToggleBookmark}
              bookmarkedIds={bookmarkedIds}
            />

            {/* Trending News Strip (Ugu Akhriska Badan) */}
            <TrendingSection
              trendingArticles={trendingArticles}
              onSelectArticle={handleSelectArticle}
              onOpenLive={() => setLiveModalOpen(true)}
            />

            {/* Community Voice & Audience Section (Shacabka & Aftida) */}
            <section className="py-6 bg-gray-100/70 border-y border-gray-200">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
                  
                  {/* Left: Community Poll (Span 7) */}
                  <div className="lg:col-span-7">
                    <CommunityPollWidget
                      poll={communityPoll}
                      onVote={handleVotePoll}
                    />
                  </div>

                  {/* Right: Owner Message & Reader Invitation Card (Span 5) */}
                  <div className="lg:col-span-5 bg-gradient-to-br from-gray-900 via-gray-950 to-red-950 text-white p-6 rounded-2xl shadow-md border border-gray-800 flex flex-col justify-between h-full space-y-4">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <span className="bg-red-600 text-white text-[10px] font-black uppercase px-2 py-0.5 rounded tracking-wider flex items-center gap-1">
                          <Megaphone className="w-3 h-3" />
                          CODSO SHACABKA
                        </span>
                        <span className="text-xs text-red-300 font-mono">BRENKNEWS Interactive</span>
                      </div>
                      <h3 className="font-serif-headline text-lg sm:text-xl font-black text-white leading-tight">
                        Waxaad Toos Ula Xiriirtaa Tifaftirka & Mulkiilaha BRENKNEWS
                      </h3>
                      <p className="text-xs text-gray-300 leading-relaxed">
                        Ma haysaa war, dhacdo xaqiiqo ah, ama talo aad la wadaageyso bahda BRENKNEWS? Qolka wararka wuxuu heeganka ugu jiraa dhageysiga codka shacabka Soomaaliyeed.
                      </p>
                    </div>

                    <div className="pt-3 border-t border-gray-800/80 flex flex-wrap items-center justify-between gap-3">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-red-600/30 text-red-400 flex items-center justify-center font-bold text-xs">
                          <Users className="w-4 h-4" />
                        </div>
                        <div>
                          <span className="text-[10px] text-gray-400 block uppercase font-bold">Shacabka Ku Xiran</span>
                          <strong className="text-xs font-mono font-bold text-white">
                            {(subscribers.length + 84500).toLocaleString()} Akhriste
                          </strong>
                        </div>
                      </div>

                      <button
                        onClick={handleOpenAdmin}
                        className="bg-red-600 hover:bg-red-700 text-white text-xs font-extrabold px-3.5 py-2 rounded-xl transition-all shadow-sm cursor-pointer flex items-center gap-1.5"
                      >
                        <PenSquare className="w-3.5 h-3.5" />
                        <span>Qolka Mulkiilaha</span>
                      </button>
                    </div>
                  </div>

                </div>
              </div>
            </section>

            {/* Latest News Feed with Filter pills */}
            <LatestNewsSection
              articles={articles}
              onSelectArticle={handleSelectArticle}
              onToggleBookmark={handleToggleBookmark}
              bookmarkedIds={bookmarkedIds}
              onSelectCategory={handleSelectCategory}
            />

            {/* Deep dive Category Showcases (Economy & Regions) */}
            <CategoryShowcase
              articles={articles}
              onSelectArticle={handleSelectArticle}
              onSelectCategory={handleSelectCategory}
            />

            {/* Multimedia Video & Photo Gallery Section */}
            <MultimediaSection />

            {/* Newsletter Signup */}
            <NewsletterSection onSubscribe={handleNewSubscriber} />
          </>
        )}

        {/* CATEGORY VIEW */}
        {activeView === 'category' && (
          <CategoryView
            category={currentCategory}
            initialSubcategory={currentSubcategory}
            articles={articles}
            onSelectArticle={handleSelectArticle}
            onBackHome={handleGoHome}
            onToggleBookmark={handleToggleBookmark}
            bookmarkedIds={bookmarkedIds}
          />
        )}

        {/* ARTICLE VIEW */}
        {activeView === 'article' && (
          <ArticleView
            article={selectedArticle}
            relatedArticles={relatedArticles}
            onBack={handleGoHome}
            onSelectArticle={handleSelectArticle}
            onToggleBookmark={handleToggleBookmark}
            isBookmarked={bookmarkedIds.has(selectedArticle.id)}
          />
        )}

      </main>

      {/* Professional Footer */}
      <Footer
        onSelectCategory={handleSelectCategory}
        onGoHome={handleGoHome}
        onOpenLive={() => setLiveModalOpen(true)}
      />

      {/* Mobile-first bottom navigation bar for Android & smartphones */}
      <AndroidMobileBar
        currentCategory={currentCategory}
        activeView={activeView}
        onGoHome={handleGoHome}
        onOpenCategories={() => handleSelectCategory('gobollada')}
        onOpenSearch={() => setSearchModalOpen(true)}
        onOpenBookmarks={() => setBookmarksDrawerOpen(true)}
        onOpenLive={() => setLiveModalOpen(true)}
        onOpenAdmin={handleOpenAdmin}
        bookmarksCount={bookmarkedIds.size}
      />

      {/* Global Interactive Search Modal */}
      <SearchModal
        isOpen={searchModalOpen}
        onClose={() => setSearchModalOpen(false)}
        articles={articles}
        onSelectArticle={handleSelectArticle}
      />

      {/* Saved Bookmarks Drawer */}
      <BookmarksDrawer
        isOpen={bookmarksDrawerOpen}
        onClose={() => setBookmarksDrawerOpen(false)}
        bookmarkedArticles={bookmarkedArticles}
        onSelectArticle={handleSelectArticle}
        onRemoveBookmark={handleToggleBookmark}
        onClearAllBookmarks={handleClearAllBookmarks}
      />

      {/* Live Broadcast / Radio Modal */}
      <LiveBroadcastModal
        isOpen={liveModalOpen}
        onClose={() => setLiveModalOpen(false)}
      />

    </div>
  );
}
