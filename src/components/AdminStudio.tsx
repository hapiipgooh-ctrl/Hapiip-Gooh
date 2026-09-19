import React, { useState } from 'react';
import { 
  PlusCircle, 
  FileText, 
  Users, 
  BarChart3, 
  Radio, 
  Trash2, 
  Edit3, 
  CheckCircle2, 
  AlertCircle, 
  Sparkles, 
  Upload, 
  Image as ImageIcon, 
  ArrowLeft, 
  Eye, 
  Flame, 
  Pin, 
  Send, 
  MessageSquare, 
  Mail, 
  Vote, 
  ShieldCheck, 
  RefreshCw 
} from 'lucide-react';
import { Article, CategoryId, CommunityPoll, OwnerAnnouncement, Subscriber } from '../types';
import { CATEGORIES_LIST } from '../data/newsData';

interface AdminStudioProps {
  articles: Article[];
  onAddArticle: (article: Article) => void;
  onUpdateArticle: (article: Article) => void;
  onDeleteArticle: (articleId: string) => void;
  onSetHeroArticle: (articleId: string) => void;
  onClose: () => void;
  onViewArticle: (article: Article) => void;
  subscribers: Subscriber[];
  onAddSubscriber: (email: string) => void;
  announcement: OwnerAnnouncement;
  onUpdateAnnouncement: (ann: OwnerAnnouncement) => void;
  poll: CommunityPoll;
  onUpdatePoll: (poll: CommunityPoll) => void;
  onResetToDefaults: () => void;
}

const PRESET_IMAGES = [
  {
    name: 'Muqdisho Xeebta & Dekedda',
    url: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=1200&q=80',
    caption: 'Muuqaalka guud ee caasimadda Muqdisho iyo xeebta Liido',
  },
  {
    name: 'Madaxtooyada & Shirarka Siyaasadda',
    url: 'https://images.unsplash.com/photo-1541872703-74c5e44368f9?auto=format&fit=crop&w=1200&q=80',
    caption: 'Kulamada madaxda dowladda iyo wadatashiyada qaran',
  },
  {
    name: 'Dekedaha & Ganacsiga',
    url: 'https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&w=1200&q=80',
    caption: 'Dhaqdhaqaaqa maraakiibta iyo kheyraadka dalka',
  },
  {
    name: 'Tiknoolajiyadda & Dhalinyarada',
    url: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=1200&q=80',
    caption: 'Horumarka dhinaca tiknoolajiyadda iyo IT-ga Soomaaliya',
  },
  {
    name: 'Cayaaraha & Garoomada',
    url: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=1200&q=80',
    caption: 'Cayaaraha gobollada iyo tartamada dalka',
  },
  {
    name: 'Amniga & Ciidamada Qalabka Sida',
    url: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=1200&q=80',
    caption: 'Ciidamada qalabka sida oo ku jira heeganka difaaca qaran',
  },
];

export const AdminStudio: React.FC<AdminStudioProps> = ({
  articles,
  onAddArticle,
  onUpdateArticle,
  onDeleteArticle,
  onSetHeroArticle,
  onClose,
  onViewArticle,
  subscribers,
  announcement,
  onUpdateAnnouncement,
  poll,
  onUpdatePoll,
  onResetToDefaults,
}) => {
  const [activeTab, setActiveTab] = useState<'create' | 'manage' | 'community' | 'announcement'>('create');
  const [notification, setNotification] = useState<string | null>(null);

  // Article Form State
  const [title, setTitle] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [category, setCategory] = useState<CategoryId>('siyaasadda');
  const [subcategory, setSubcategory] = useState('Banaadir');
  const [paragraphs, setParagraphs] = useState<string[]>([
    'Wararka hordhaca ah ee naga soo gaaraya xarunta dowladda ayaa sheegaya in go\'aanno waaweyn laga gaaray arrimaha taagan.',
    'Mas\'uuliyiinta ayaa tilmaamay in tallaabooyinkani ay wax weyn ka tari doonaan horumarka iyo danta guud ee shacabka Soomaaliyeed.',
  ]);
  const [keyPoints, setKeyPoints] = useState<string>('Qodobka 1aad: Horumarka iyo amniga\nQodobka 2aad: Dhaqaalaha iyo xiriirka caalamiga ah');
  const [quoteText, setQuoteText] = useState('');
  const [quoteAuthor, setQuoteAuthor] = useState('');
  const [quoteRole, setQuoteRole] = useState('');
  const [imageUrl, setImageUrl] = useState(PRESET_IMAGES[0].url);
  const [imageCaption, setImageCaption] = useState(PRESET_IMAGES[0].caption);
  const [imageCredit, setImageCredit] = useState('BRENKNEWS Media Desk');
  const [authorName, setAuthorName] = useState('Milkiilaha & Tifaftiraha Guud');
  const [authorRole, setAuthorRole] = useState('Tifaftiraha BRENKNEWS');
  const [authorLocation, setAuthorLocation] = useState('Muqdisho, Soomaaliya');
  const [tagsInput, setTagsInput] = useState('Soomaaliya, War Deg Deg ah, Muqdisho');
  const [isHero, setIsHero] = useState(false);
  const [isBreaking, setIsBreaking] = useState(true);
  const [isTrending, setIsTrending] = useState(false);

  // Editing existing article
  const [editingArticleId, setEditingArticleId] = useState<string | null>(null);

  // Announcement state
  const [announcementMsg, setAnnouncementMsg] = useState(announcement.message);
  const [announcementActive, setAnnouncementActive] = useState(announcement.active);

  // Poll state
  const [pollQuestion, setPollQuestion] = useState(poll.question);
  const [opt1, setOpt1] = useState(poll.options[0]?.text || 'Haa');
  const [opt2, setOpt2] = useState(poll.options[1]?.text || 'Maya');
  const [opt3, setOpt3] = useState(poll.options[2]?.text || 'Dhex-dhexaad');

  const showToast = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 4000);
  };

  const handleParagraphChange = (index: number, val: string) => {
    const updated = [...paragraphs];
    updated[index] = val;
    setParagraphs(updated);
  };

  const addParagraph = () => {
    setParagraphs([...paragraphs, '']);
  };

  const removeParagraph = (index: number) => {
    if (paragraphs.length <= 1) return;
    setParagraphs(paragraphs.filter((_, i) => i !== index));
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        setImageUrl(reader.result);
        showToast('Sawirka cusub waa la soo galiyay!');
      }
    };
    reader.readAsDataURL(file);
  };

  const resetForm = () => {
    setTitle('');
    setSubtitle('');
    setExcerpt('');
    setParagraphs([
      'Wararka hordhaca ah ee naga soo gaaraya xarunta dowladda ayaa sheegaya in go\'aanno waaweyn laga gaaray arrimaha taagan.',
      'Mas\'uuliyiinta ayaa tilmaamay in tallaabooyinkani ay wax weyn ka tari doonaan horumarka iyo danta guud ee shacabka Soomaaliyeed.',
    ]);
    setKeyPoints('Qodobka 1aad: Horumarka iyo amniga\nQodobka 2aad: Dhaqaalaha iyo xiriirka caalamiga ah');
    setQuoteText('');
    setQuoteAuthor('');
    setQuoteRole('');
    setTagsInput('Soomaaliya, War Deg Deg ah, Muqdisho');
    setIsHero(false);
    setIsBreaking(true);
    setIsTrending(false);
    setEditingArticleId(null);
  };

  const handleSubmitArticle = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !excerpt.trim()) {
      showToast('Fadlan gali ugu yaraan Ciwaanka iyo Faahfaahinta kooban ee warka.');
      return;
    }

    const catObj = CATEGORIES_LIST.find((c) => c.id === category) || { nameSo: 'Wararka' };
    const cleanParagraphs = paragraphs.filter((p) => p.trim().length > 0);
    const parsedKeyPoints = keyPoints
      .split('\n')
      .map((k) => k.trim())
      .filter((k) => k.length > 0);

    const parsedTags = tagsInput
      .split(',')
      .map((t) => t.trim())
      .filter((t) => t.length > 0);

    const articleData: Article = {
      id: editingArticleId || `art-${Date.now()}`,
      slug: title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
      title: title.trim(),
      subtitle: subtitle.trim() || title.trim(),
      excerpt: excerpt.trim(),
      content: cleanParagraphs.length > 0 ? cleanParagraphs : [excerpt.trim()],
      category: category,
      categoryLabel: catObj.nameSo,
      subcategory: subcategory.trim() || undefined,
      author: {
        name: authorName.trim() || 'Milkiilaha BRENKNEWS',
        role: authorRole.trim() || 'Tifaftiraha Guud',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
        location: authorLocation.trim() || 'Muqdisho, Soomaaliya',
      },
      publishedAt: new Date().toLocaleDateString('so-SO', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
      }) + `, ${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`,
      readTime: '3 daqiiqo',
      views: editingArticleId ? (articles.find((a) => a.id === editingArticleId)?.views || 100) : Math.floor(Math.random() * 400) + 120,
      commentsCount: 0,
      imageUrl: imageUrl.trim() || PRESET_IMAGES[0].url,
      imageCaption: imageCaption.trim() || 'Sawirka warka BRENKNEWS',
      imageCredit: imageCredit.trim() || 'BRENKNEWS',
      isBreaking: isBreaking,
      isHero: isHero,
      isTrending: isTrending,
      tags: parsedTags.length > 0 ? parsedTags : ['Soomaaliya', 'BRENKNEWS'],
      keyPoints: parsedKeyPoints.length > 0 ? parsedKeyPoints : undefined,
      quote: quoteText.trim()
        ? {
            text: quoteText.trim(),
            author: quoteAuthor.trim() || 'Mas\'uul Dowladeed',
            role: quoteRole.trim() || 'Xoghayaha Warfaafinta',
          }
        : undefined,
    };

    if (editingArticleId) {
      onUpdateArticle(articleData);
      showToast('Warka si guul ah ayaa wax looga beddelay!');
    } else {
      onAddArticle(articleData);
      showToast('Hambalyo! Warkaaga cusub si toos ah ayaa loogu daabacay BRENKNEWS!');
    }

    if (isHero) {
      onSetHeroArticle(articleData.id);
    }

    resetForm();
    setActiveTab('manage');
  };

  const handleEditClick = (art: Article) => {
    setEditingArticleId(art.id);
    setTitle(art.title);
    setSubtitle(art.subtitle || '');
    setExcerpt(art.excerpt);
    setCategory(art.category);
    setSubcategory(art.subcategory || '');
    setParagraphs(art.content || [art.excerpt]);
    setKeyPoints(art.keyPoints ? art.keyPoints.join('\n') : '');
    setQuoteText(art.quote?.text || '');
    setQuoteAuthor(art.quote?.author || '');
    setQuoteRole(art.quote?.role || '');
    setImageUrl(art.imageUrl);
    setImageCaption(art.imageCaption);
    setImageCredit(art.imageCredit);
    setAuthorName(art.author.name);
    setAuthorRole(art.author.role);
    setAuthorLocation(art.author.location);
    setTagsInput(art.tags.join(', '));
    setIsHero(art.isHero || false);
    setIsBreaking(art.isBreaking || false);
    setIsTrending(art.isTrending || false);
    setActiveTab('create');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSaveAnnouncement = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateAnnouncement({
      id: 'ann-1',
      message: announcementMsg,
      active: announcementActive,
      date: new Date().toLocaleDateString('so-SO'),
    });
    showToast('Ogaysiiska guud ee bogga waa la cusbooneysiiyay!');
  };

  const handleSavePoll = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdatePoll({
      id: 'poll-1',
      question: pollQuestion,
      options: [
        { id: 'opt-1', text: opt1, votes: poll.options[0]?.votes || 240 },
        { id: 'opt-2', text: opt2, votes: poll.options[1]?.votes || 85 },
        { id: 'opt-3', text: opt3, votes: poll.options[2]?.votes || 30 },
      ],
      totalVotes: (poll.options[0]?.votes || 240) + (poll.options[1]?.votes || 85) + (poll.options[2]?.votes || 30),
      isActive: true,
    });
    showToast('Aftida dadweynaha (Community Poll) si toos ah ayaa loogu shaaciyay shacabka!');
  };

  // Metrics
  const totalViews = articles.reduce((acc, a) => acc + (a.views || 0), 0);

  return (
    <div className="bg-[#F8F9FA] min-h-screen py-8 text-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Toast Notification */}
        {notification && (
          <div className="fixed top-6 right-6 z-50 bg-gray-900 text-white border-l-4 border-red-600 px-5 py-3.5 rounded-xl shadow-2xl flex items-center gap-3 animate-fade-in">
            <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
            <span className="text-xs sm:text-sm font-semibold">{notification}</span>
          </div>
        )}

        {/* Back navigation & Title */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 mb-6 border-b border-gray-200 gap-4">
          <div className="flex items-center gap-3">
            <button
              id="admin-back-btn"
              onClick={onClose}
              className="p-2 rounded-xl bg-white border border-gray-200 hover:bg-gray-100 text-gray-700 transition-colors cursor-pointer flex items-center gap-1.5 text-xs font-bold"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Ku noqo Bogga Wararka</span>
            </button>
            <div>
              <div className="flex items-center gap-2">
                <span className="bg-red-600 text-white text-[10px] font-extrabold uppercase px-2 py-0.5 rounded tracking-wider">
                  QOLKA MULKIILAHA & TIFAFTIRKA
                </span>
                <span className="text-xs text-gray-400 font-mono">BRENKNEWS CMS</span>
              </div>
              <h1 className="font-serif-headline text-2xl sm:text-3xl font-black text-gray-950 mt-1">
                Maamulka Wararka & Shacabka
              </h1>
            </div>
          </div>

          {/* Quick Metrics Header */}
          <div className="flex items-center gap-2 sm:gap-4 bg-white p-2.5 rounded-2xl border border-gray-200 shadow-xs">
            <div className="px-3 py-1 text-center border-r border-gray-100">
              <span className="text-[10px] uppercase font-bold text-gray-400 block">Wararka</span>
              <strong className="text-base font-black text-gray-900">{articles.length}</strong>
            </div>
            <div className="px-3 py-1 text-center border-r border-gray-100">
              <span className="text-[10px] uppercase font-bold text-gray-400 block">Akhrinta</span>
              <strong className="text-base font-black text-red-600">{totalViews.toLocaleString()}</strong>
            </div>
            <div className="px-3 py-1 text-center">
              <span className="text-[10px] uppercase font-bold text-gray-400 block">Shacabka Ku Xiran</span>
              <strong className="text-base font-black text-gray-900">{subscribers.length + 84500}</strong>
            </div>
          </div>
        </div>

        {/* Studio Tabs */}
        <div className="flex flex-wrap items-center gap-2 mb-8 bg-white p-2 rounded-2xl border border-gray-200 shadow-xs">
          <button
            id="tab-publish-article"
            onClick={() => {
              setActiveTab('create');
              if (!editingArticleId) resetForm();
            }}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold cursor-pointer transition-all ${
              activeTab === 'create'
                ? 'bg-red-600 text-white shadow-md shadow-red-900/20'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            <PlusCircle className="w-4 h-4" />
            <span>{editingArticleId ? 'Wax ka beddel Warka' : 'Qor War Cusub (Publish)'}</span>
          </button>

          <button
            id="tab-manage-articles"
            onClick={() => setActiveTab('manage')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold cursor-pointer transition-all ${
              activeTab === 'manage'
                ? 'bg-red-600 text-white shadow-md shadow-red-900/20'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            <FileText className="w-4 h-4" />
            <span>Wararkaaga Diyaarka ah ({articles.length})</span>
          </button>

          <button
            id="tab-community"
            onClick={() => setActiveTab('community')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold cursor-pointer transition-all ${
              activeTab === 'community'
                ? 'bg-red-600 text-white shadow-md shadow-red-900/20'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            <Users className="w-4 h-4" />
            <span>Xiriirka Shacabka & Aftida</span>
          </button>

          <button
            id="tab-announcements"
            onClick={() => setActiveTab('announcement')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold cursor-pointer transition-all ${
              activeTab === 'announcement'
                ? 'bg-red-600 text-white shadow-md shadow-red-900/20'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            <Radio className="w-4 h-4" />
            <span>Ogaysiiska Guud ee Bogga</span>
          </button>
        </div>

        {/* TAB 1: CREATE / EDIT ARTICLE */}
        {activeTab === 'create' && (
          <form onSubmit={handleSubmitArticle} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Left Column: Main Editor (Span 2) */}
            <div className="lg:col-span-2 space-y-6">
              
              {/* Title & Excerpt Box */}
              <div className="bg-white p-6 sm:p-8 rounded-2xl border border-gray-200 shadow-xs space-y-4">
                <div className="flex items-center justify-between border-b border-gray-100 pb-3">
                  <h2 className="text-base font-bold text-gray-900 flex items-center gap-2">
                    <Edit3 className="w-4 h-4 text-red-600" />
                    <span>Nuxurka Warka (Qoraalka)</span>
                  </h2>
                  {editingArticleId && (
                    <span className="text-xs text-amber-600 bg-amber-50 font-bold px-2 py-1 rounded">
                      Waxaad wax ka beddeleysaa war hore
                    </span>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                    Ciwaanka Warka (Headline) *
                  </label>
                  <input
                    id="news-title-input"
                    type="text"
                    required
                    placeholder="Tusaale: Madaxweynaha oo Xariga Ka Jaray Dekedda Cusub ee..."
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full text-base sm:text-lg font-bold text-gray-900 p-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-red-600 focus:bg-white transition-all"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                    Ciwaan-hoosaad (Subtitle / Kordhin)
                  </label>
                  <input
                    id="news-subtitle-input"
                    type="text"
                    placeholder="Qodobbo muhiim ah oo ku saabsan heshiiska cusub..."
                    value={subtitle}
                    onChange={(e) => setSubtitle(e.target.value)}
                    className="w-full text-sm text-gray-800 p-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-red-600 focus:bg-white transition-all"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                    Faahfaahin Kooban (Lead Excerpt - Waxa akhristuhu ugu hor arkayo) *
                  </label>
                  <textarea
                    id="news-excerpt-input"
                    rows={3}
                    required
                    placeholder="Qor 2 ilaa 3 sadar oo si kooban u sharxaya dhacdada ugu weyn..."
                    value={excerpt}
                    onChange={(e) => setExcerpt(e.target.value)}
                    className="w-full text-sm text-gray-800 p-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-red-600 focus:bg-white transition-all"
                  ></textarea>
                </div>
              </div>

              {/* Multi-Paragraph Body Editor */}
              <div className="bg-white p-6 sm:p-8 rounded-2xl border border-gray-200 shadow-xs space-y-4">
                <div className="flex items-center justify-between border-b border-gray-100 pb-3">
                  <div>
                    <h2 className="text-base font-bold text-gray-900">Qoraalka Buuxa ee Warka (Falanqeynta)</h2>
                    <p className="text-xs text-gray-500">Qor faahfaahinta warkaaga cutub cutub (paragraphs)</p>
                  </div>
                  <button
                    type="button"
                    onClick={addParagraph}
                    className="flex items-center gap-1 bg-red-50 text-red-600 hover:bg-red-100 text-xs font-bold px-3 py-1.5 rounded-lg cursor-pointer transition-colors"
                  >
                    <PlusCircle className="w-3.5 h-3.5" />
                    <span>Ku dar Cutub Cusub</span>
                  </button>
                </div>

                {paragraphs.map((p, idx) => (
                  <div key={idx} className="space-y-1">
                    <div className="flex items-center justify-between text-xs text-gray-400">
                      <span className="font-semibold text-gray-600">Cutubka {idx + 1}aad:</span>
                      {paragraphs.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeParagraph(idx)}
                          className="text-red-500 hover:text-red-700 cursor-pointer"
                        >
                          Tirtir
                        </button>
                      )}
                    </div>
                    <textarea
                      rows={4}
                      value={p}
                      onChange={(e) => handleParagraphChange(idx, e.target.value)}
                      placeholder={`Faahfaahi dhacdada cutubka ${idx + 1}aad...`}
                      className="w-full text-sm text-gray-800 p-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-red-600 focus:bg-white transition-all"
                    ></textarea>
                  </div>
                ))}
              </div>

              {/* Key Takeaways & Quotes Box */}
              <div className="bg-white p-6 sm:p-8 rounded-2xl border border-gray-200 shadow-xs space-y-4">
                <h2 className="text-base font-bold text-gray-900 border-b border-gray-100 pb-2">
                  Qodobbada Muhiimka ah & Xigashada (Optional)
                </h2>

                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                    Qodobbo Karti Leh (Key Takeaways - Mid kasta sadar cusub u yeel)
                  </label>
                  <textarea
                    rows={3}
                    value={keyPoints}
                    onChange={(e) => setKeyPoints(e.target.value)}
                    placeholder="Qodobka 1aad...&#10;Qodobka 2aad...&#10;Qodobka 3aad..."
                    className="w-full text-sm text-gray-800 p-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-red-600 focus:bg-white"
                  ></textarea>
                </div>

                <div className="pt-2 border-t border-gray-100 grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="sm:col-span-3">
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                      Xigasho Muhiim ah (Pull Quote)
                    </label>
                    <input
                      type="text"
                      value={quoteText}
                      onChange={(e) => setQuoteText(e.target.value)}
                      placeholder="Tusaale: 'Tani waa guul weyn oo u soo hoyatay dhammaan shacabka...'"
                      className="w-full text-xs text-gray-800 p-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-red-600"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-gray-600 mb-1">Qofka Laga Soo Xigtay</label>
                    <input
                      type="text"
                      value={quoteAuthor}
                      onChange={(e) => setQuoteAuthor(e.target.value)}
                      placeholder="Magaca Mas'uulka"
                      className="w-full text-xs text-gray-800 p-2 bg-gray-50 border border-gray-200 rounded-lg"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-[11px] font-semibold text-gray-600 mb-1">Xilka Qofka</label>
                    <input
                      type="text"
                      value={quoteRole}
                      onChange={(e) => setQuoteRole(e.target.value)}
                      placeholder="Xilka ama Hey'adda"
                      className="w-full text-xs text-gray-800 p-2 bg-gray-50 border border-gray-200 rounded-lg"
                    />
                  </div>
                </div>
              </div>

            </div>

            {/* Right Column: Settings, Category, Image & Visibility */}
            <div className="space-y-6">
              
              {/* Publication Controls */}
              <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-xs space-y-4">
                <h3 className="text-sm font-extrabold uppercase tracking-wider text-gray-900 border-b border-gray-100 pb-2">
                  Astaamaha Daabacaadda
                </h3>

                {/* Hero Feature Toggle */}
                <label className="flex items-start gap-3 p-3 rounded-xl border border-gray-200 bg-red-50/30 cursor-pointer hover:bg-red-50 transition-colors">
                  <input
                    id="checkbox-is-hero"
                    type="checkbox"
                    checked={isHero}
                    onChange={(e) => setIsHero(e.target.checked)}
                    className="w-4 h-4 text-red-600 rounded mt-0.5"
                  />
                  <div>
                    <strong className="text-xs font-bold text-gray-900 flex items-center gap-1.5">
                      <Pin className="w-3.5 h-3.5 text-red-600" />
                      <span>U yeel Warweynaha Bogga (Hero Story)</span>
                    </strong>
                    <p className="text-[11px] text-gray-500">
                      Warkani wuxuu noqon doonaa warka ugu weyn ee qof kasta ku soo dhaco marka uu furo BRENKNEWS.
                    </p>
                  </div>
                </label>

                {/* Breaking News Toggle */}
                <label className="flex items-start gap-3 p-3 rounded-xl border border-gray-200 bg-gray-50 cursor-pointer hover:bg-gray-100 transition-colors">
                  <input
                    id="checkbox-is-breaking"
                    type="checkbox"
                    checked={isBreaking}
                    onChange={(e) => setIsBreaking(e.target.checked)}
                    className="w-4 h-4 text-red-600 rounded mt-0.5"
                  />
                  <div>
                    <strong className="text-xs font-bold text-gray-900 flex items-center gap-1.5">
                      <Radio className="w-3.5 h-3.5 text-red-600" />
                      <span>War Deg Deg Ah (Breaking Ticker)</span>
                    </strong>
                    <p className="text-[11px] text-gray-500">
                      Wuxuu toos ugu muuqan doonaa calaamadda guduudan ee sare ee oroneysa War Deg Deg Ah.
                    </p>
                  </div>
                </label>

                {/* Trending News Toggle */}
                <label className="flex items-start gap-3 p-3 rounded-xl border border-gray-200 bg-gray-50 cursor-pointer hover:bg-gray-100 transition-colors">
                  <input
                    id="checkbox-is-trending"
                    type="checkbox"
                    checked={isTrending}
                    onChange={(e) => setIsTrending(e.target.checked)}
                    className="w-4 h-4 text-red-600 rounded mt-0.5"
                  />
                  <div>
                    <strong className="text-xs font-bold text-gray-900 flex items-center gap-1.5">
                      <Flame className="w-3.5 h-3.5 text-amber-500" />
                      <span>Ugu Akhriska Badan (Trending)</span>
                    </strong>
                    <p className="text-[11px] text-gray-500">
                      Waxaa lagu dari doonaa safka 5-ta war ee ugu xiisaha badan todobaadka.
                    </p>
                  </div>
                </label>

                {/* Category Selector */}
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                    Qeybta Warka (Category)
                  </label>
                  <select
                    id="news-category-select"
                    value={category}
                    onChange={(e) => setCategory(e.target.value as CategoryId)}
                    className="w-full text-xs font-bold text-gray-800 p-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-red-600"
                  >
                    {CATEGORIES_LIST.filter((c) => c.id !== 'dhammaan').map((cat) => (
                      <option key={cat.id} value={cat.id}>
                        {cat.nameSo}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Subcategory / State */}
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                    Gobolka / Qeyb-hoosaadka (Subcategory)
                  </label>
                  <input
                    type="text"
                    placeholder="Banaadir, Puntland, Somaliland, Baarlamaanka..."
                    value={subcategory}
                    onChange={(e) => setSubcategory(e.target.value)}
                    className="w-full text-xs text-gray-800 p-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-red-600"
                  />
                </div>

                {/* Author Name */}
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                    Magaca Qoraaga (Author)
                  </label>
                  <input
                    type="text"
                    value={authorName}
                    onChange={(e) => setAuthorName(e.target.value)}
                    placeholder="Milkiilaha BRENKNEWS"
                    className="w-full text-xs text-gray-800 p-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-red-600"
                  />
                </div>

                {/* Tags */}
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                    Ereyada Furaha (Tags - ku kala saar kooma)
                  </label>
                  <input
                    type="text"
                    value={tagsInput}
                    onChange={(e) => setTagsInput(e.target.value)}
                    placeholder="Muqdisho, Ganacsi, Dekedda, Soomaaliya"
                    className="w-full text-xs text-gray-800 p-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-red-600"
                  />
                </div>
              </div>

              {/* Image Selection Box */}
              <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-xs space-y-4">
                <h3 className="text-sm font-extrabold uppercase tracking-wider text-gray-900 border-b border-gray-100 pb-2 flex items-center justify-between">
                  <span>Sawirka Warka</span>
                  <ImageIcon className="w-4 h-4 text-red-600" />
                </h3>

                {/* Image Preview */}
                <div className="relative aspect-16/10 rounded-xl overflow-hidden border border-gray-200 bg-gray-100">
                  <img
                    src={imageUrl}
                    alt="Preview"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = PRESET_IMAGES[0].url;
                    }}
                  />
                  <div className="absolute bottom-2 left-2 bg-black/70 text-white text-[10px] px-2 py-0.5 rounded">
                    Muuqaalka Warka
                  </div>
                </div>

                {/* Upload Image from Device */}
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">
                    Ka soo rar Taleefankaaga / Kumbuyuutarka:
                  </label>
                  <label className="flex items-center justify-center gap-2 p-3 bg-red-50 hover:bg-red-100 text-red-700 font-bold text-xs rounded-xl cursor-pointer border border-dashed border-red-300 transition-colors">
                    <Upload className="w-4 h-4" />
                    <span>Xulo Sawir Qalabkaaga</span>
                    <input
                      id="upload-image-file"
                      type="file"
                      accept="image/*"
                      onChange={handleFileUpload}
                      className="hidden"
                    />
                  </label>
                </div>

                {/* Preset image selector */}
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">
                    Ama ka dooro sawirrada diyaarsan:
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {PRESET_IMAGES.map((img, i) => (
                      <button
                        key={i}
                        type="button"
                        onClick={() => {
                          setImageUrl(img.url);
                          setImageCaption(img.caption);
                        }}
                        className={`relative aspect-square rounded-lg overflow-hidden border-2 cursor-pointer transition-all ${
                          imageUrl === img.url ? 'border-red-600 scale-95 shadow-md' : 'border-transparent hover:opacity-80'
                        }`}
                        title={img.name}
                      >
                        <img src={img.url} alt={img.name} className="w-full h-full object-cover" />
                      </button>
                    ))}
                  </div>
                </div>

                {/* Image URL custom input */}
                <div>
                  <label className="block text-[11px] font-semibold text-gray-600 mb-1">
                    Ama qor link-ga sawirka (URL):
                  </label>
                  <input
                    type="url"
                    value={imageUrl}
                    onChange={(e) => setImageUrl(e.target.value)}
                    placeholder="https://images.unsplash.com/..."
                    className="w-full text-xs text-gray-800 p-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-red-600"
                  />
                </div>

                {/* Caption */}
                <div>
                  <label className="block text-[11px] font-semibold text-gray-600 mb-1">
                    Qoraalka Sawirka (Caption):
                  </label>
                  <input
                    type="text"
                    value={imageCaption}
                    onChange={(e) => setImageCaption(e.target.value)}
                    placeholder="Muuqaalka goobta ama dhacdada..."
                    className="w-full text-xs text-gray-800 p-2 bg-gray-50 border border-gray-200 rounded-lg"
                  />
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2">
                <button
                  id="submit-article-btn"
                  type="submit"
                  className="w-full bg-red-600 hover:bg-red-700 text-white font-extrabold text-sm py-4 rounded-xl shadow-lg shadow-red-900/30 cursor-pointer transition-all flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  <span>{editingArticleId ? 'Cusbooneysii Warka' : 'Toos U Daabac Warka (Publish)'}</span>
                </button>

                {editingArticleId && (
                  <button
                    type="button"
                    onClick={resetForm}
                    className="w-full bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold text-xs py-2.5 rounded-xl cursor-pointer transition-colors"
                  >
                    Jooji Wax ka beddelka (Cancel)
                  </button>
                )}
              </div>

            </div>

          </form>
        )}

        {/* TAB 2: MANAGE ARTICLES */}
        {activeTab === 'manage' && (
          <div className="bg-white rounded-2xl border border-gray-200 shadow-xs overflow-hidden">
            <div className="p-5 border-b border-gray-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h3 className="font-serif-headline text-lg font-bold text-gray-900">
                  Dhammaan Wararka Daabacan ee BRENKNEWS
                </h3>
                <p className="text-xs text-gray-500">
                  Waxaad halkaan ka arki kartaa, ka beddeli kartaa, ama ka tirtiri kartaa dhammaan wararkaaga.
                </p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={onResetToDefaults}
                  className="text-xs font-bold text-gray-500 hover:text-red-600 bg-gray-100 hover:bg-red-50 px-3 py-2 rounded-lg cursor-pointer transition-colors flex items-center gap-1.5"
                  title="Dib u soo celi wararkii asalka ahaa haddii aad rabto"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>Dib u dhig Wararkii Hore</span>
                </button>
                <button
                  onClick={() => {
                    resetForm();
                    setActiveTab('create');
                  }}
                  className="bg-red-600 hover:bg-red-700 text-white text-xs font-bold px-4 py-2 rounded-lg cursor-pointer transition-colors flex items-center gap-1.5"
                >
                  <PlusCircle className="w-3.5 h-3.5" />
                  <span>Qor War Cusub</span>
                </button>
              </div>
            </div>

            <div className="divide-y divide-gray-100">
              {articles.map((art, idx) => (
                <div key={art.id} className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-gray-50/80 transition-colors">
                  <div className="flex items-start gap-4">
                    <img
                      src={art.imageUrl}
                      alt={art.title}
                      className="w-20 h-16 sm:w-24 sm:h-20 object-cover rounded-xl shrink-0"
                    />
                    <div>
                      <div className="flex items-center gap-2 text-[10px] mb-1">
                        <span className="bg-red-100 text-red-700 font-bold px-1.5 py-0.5 rounded uppercase">
                          {art.categoryLabel}
                        </span>
                        {art.isHero && (
                          <span className="bg-amber-100 text-amber-800 font-bold px-1.5 py-0.5 rounded flex items-center gap-0.5">
                            <Pin className="w-2.5 h-2.5" />
                            <span>WARWEYNE</span>
                          </span>
                        )}
                        {art.isBreaking && (
                          <span className="bg-red-600 text-white font-bold px-1.5 py-0.5 rounded animate-pulse">
                            DEG DEG
                          </span>
                        )}
                        <span className="text-gray-400">•</span>
                        <span className="text-gray-500">{art.publishedAt}</span>
                      </div>

                      <h4 
                        onClick={() => onViewArticle(art)}
                        className="font-serif-headline text-sm sm:text-base font-bold text-gray-900 hover:text-red-600 transition-colors cursor-pointer line-clamp-1"
                      >
                        {art.title}
                      </h4>

                      <p className="text-xs text-gray-500 line-clamp-1 mt-0.5">
                        {art.excerpt}
                      </p>

                      <div className="flex items-center gap-3 text-[11px] text-gray-400 mt-2">
                        <span className="flex items-center gap-1">
                          <Eye className="w-3 h-3 text-gray-400" />
                          <strong className="text-gray-700">{art.views.toLocaleString()}</strong> akhris
                        </span>
                        <span>•</span>
                        <span>Qoraaga: <strong className="text-gray-700">{art.author.name}</strong></span>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2 self-end sm:self-center shrink-0">
                    <button
                      onClick={() => onViewArticle(art)}
                      className="p-2 text-gray-600 hover:text-gray-900 bg-gray-100 hover:bg-gray-200 rounded-lg cursor-pointer text-xs font-bold"
                      title="Fiiri warka sida akhristuhu u arko"
                    >
                      <Eye className="w-4 h-4" />
                    </button>

                    <button
                      onClick={() => onSetHeroArticle(art.id)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold cursor-pointer transition-colors flex items-center gap-1 ${
                        art.isHero
                          ? 'bg-amber-100 text-amber-800 border border-amber-300'
                          : 'bg-gray-100 text-gray-700 hover:bg-amber-50 hover:text-amber-700'
                      }`}
                      title="U yeel warka ugu weyn ee bogga hore"
                    >
                      <Pin className="w-3.5 h-3.5" />
                      <span>{art.isHero ? 'Warweyne' : 'U yeel Warweyne'}</span>
                    </button>

                    <button
                      onClick={() => handleEditClick(art)}
                      className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg cursor-pointer transition-colors"
                      title="Wax ka beddel warka"
                    >
                      <Edit3 className="w-4 h-4" />
                    </button>

                    <button
                      onClick={() => {
                        if (window.confirm('Ma hubtaa inaad tirtirto warkan?')) {
                          onDeleteArticle(art.id);
                          showToast('Warka waa la tirtiray.');
                        }
                      }}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg cursor-pointer transition-colors"
                      title="Tirtir warkan"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: COMMUNITY & POLLS */}
        {activeTab === 'community' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            
            {/* Community Poll Manager (Afti Dadweyne) */}
            <div className="bg-white p-6 sm:p-8 rounded-2xl border border-gray-200 shadow-xs space-y-6">
              <div className="flex items-center justify-between border-b border-gray-100 pb-3">
                <div>
                  <h3 className="text-base font-bold text-gray-900 flex items-center gap-2">
                    <Vote className="w-5 h-5 text-red-600" />
                    <span>Aftida Dadweynaha (Community Poll)</span>
                  </h3>
                  <p className="text-xs text-gray-500">
                    Weydii shacabka su'aal toos ah si aad u ogaato aragtidooda.
                  </p>
                </div>
                <span className="bg-emerald-50 text-emerald-700 text-xs font-bold px-2 py-1 rounded-full">
                  Toos Ayuu U Shaqeynayaa
                </span>
              </div>

              <form onSubmit={handleSavePoll} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                    Su'aasha Aftida ee Shacabka
                  </label>
                  <input
                    type="text"
                    required
                    value={pollQuestion}
                    onChange={(e) => setPollQuestion(e.target.value)}
                    placeholder="Miyaad taageersan tahay in doorashadu ku qabsoonto xilligii loo qorsheeyay?"
                    className="w-full text-sm font-bold text-gray-900 p-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-red-600"
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider">
                    Xulashooyinka Cod-bixinta (Choices)
                  </label>
                  
                  <div className="flex items-center gap-2">
                    <span className="w-6 text-xs font-bold text-gray-400">1:</span>
                    <input
                      type="text"
                      required
                      value={opt1}
                      onChange={(e) => setOpt1(e.target.value)}
                      placeholder="Haa (Taageersan)"
                      className="flex-1 text-xs text-gray-800 p-2.5 bg-gray-50 border border-gray-200 rounded-lg"
                    />
                    <span className="text-xs font-mono font-bold text-gray-500">{poll.options[0]?.votes || 0} cod</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="w-6 text-xs font-bold text-gray-400">2:</span>
                    <input
                      type="text"
                      required
                      value={opt2}
                      onChange={(e) => setOpt2(e.target.value)}
                      placeholder="Maya (Diidan)"
                      className="flex-1 text-xs text-gray-800 p-2.5 bg-gray-50 border border-gray-200 rounded-lg"
                    />
                    <span className="text-xs font-mono font-bold text-gray-500">{poll.options[1]?.votes || 0} cod</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="w-6 text-xs font-bold text-gray-400">3:</span>
                    <input
                      type="text"
                      value={opt3}
                      onChange={(e) => setOpt3(e.target.value)}
                      placeholder="Dhex-dhexaad"
                      className="flex-1 text-xs text-gray-800 p-2.5 bg-gray-50 border border-gray-200 rounded-lg"
                    />
                    <span className="text-xs font-mono font-bold text-gray-500">{poll.options[2]?.votes || 0} cod</span>
                  </div>
                </div>

                <div className="p-3 bg-gray-50 rounded-xl border border-gray-200 text-xs text-gray-600 flex items-center justify-between">
                  <span>Wadarta Codadka Ilaa Hadda La Dhiibtay:</span>
                  <strong className="font-mono text-sm font-bold text-red-600">
                    {poll.totalVotes.toLocaleString()} qof
                  </strong>
                </div>

                <button
                  type="submit"
                  className="w-full bg-red-600 hover:bg-red-700 text-white font-bold text-xs py-3 rounded-xl cursor-pointer transition-colors shadow-sm"
                >
                  Cusbooneysii Aftida Dadweynaha
                </button>
              </form>
            </div>

            {/* Subscribers & Shacabka Ku Xiran */}
            <div className="bg-white p-6 sm:p-8 rounded-2xl border border-gray-200 shadow-xs space-y-6">
              <div className="flex items-center justify-between border-b border-gray-100 pb-3">
                <div>
                  <h3 className="text-base font-bold text-gray-900 flex items-center gap-2">
                    <Mail className="w-5 h-5 text-red-600" />
                    <span>Liiska Shacabka Ku Xiran (Subscribers)</span>
                  </h3>
                  <p className="text-xs text-gray-500">
                    Dadka is-diiwaangeliyay si ay subax kasta u helaan wararkaaga.
                  </p>
                </div>
                <div className="text-right">
                  <span className="font-mono font-black text-gray-900 text-base">
                    {(subscribers.length + 84500).toLocaleString()}
                  </span>
                  <span className="text-[10px] text-gray-400 block">Dadweyne</span>
                </div>
              </div>

              {/* Sample list */}
              <div className="space-y-2 max-h-60 overflow-y-auto pr-1">
                {subscribers.map((sub) => (
                  <div key={sub.id} className="p-2.5 rounded-lg bg-gray-50 border border-gray-200 flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-full bg-red-100 text-red-600 font-bold flex items-center justify-center text-[10px]">
                        {sub.email.slice(0, 2).toUpperCase()}
                      </div>
                      <span className="font-semibold text-gray-800">{sub.email}</span>
                    </div>
                    <span className="text-[10px] text-gray-400">{sub.date}</span>
                  </div>
                ))}
              </div>

              {/* Broadcast message simulation */}
              <div className="p-4 rounded-xl bg-gray-900 text-white space-y-3">
                <div className="flex items-center gap-2 text-xs font-bold text-red-400">
                  <Send className="w-3.5 h-3.5" />
                  <span>U DIR FARRIIN GUUD DHAMMAAN SHACABKA</span>
                </div>
                <p className="text-xs text-gray-300">
                  Ku dir farriin toos ah oo email iyo WhatsApp ugu tageysa dhammaan 85,000+ qof ee kugu xiran.
                </p>
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Qor ciwaanka farriinta aad u direyso shacabka..."
                    className="flex-1 bg-gray-950 border border-gray-800 text-white placeholder-gray-500 text-xs px-3 py-2 rounded-lg focus:outline-none focus:border-red-600"
                  />
                  <button
                    onClick={() => showToast('Farriinta guud waxaa loo diray 84,500+ qof oo shacabka ah!')}
                    className="bg-red-600 hover:bg-red-700 text-white font-bold text-xs px-4 py-2 rounded-lg cursor-pointer transition-colors"
                  >
                    Dir Hadda
                  </button>
                </div>
              </div>

            </div>

          </div>
        )}

        {/* TAB 4: GENERAL ANNOUNCEMENT BANNER */}
        {activeTab === 'announcement' && (
          <div className="max-w-2xl mx-auto bg-white p-6 sm:p-8 rounded-2xl border border-gray-200 shadow-xs space-y-6">
            <div className="border-b border-gray-100 pb-3">
              <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                <Radio className="w-5 h-5 text-red-600" />
                <span>Ogaysiiska Tooska ah ee Bogga Hore</span>
              </h3>
              <p className="text-xs text-gray-500 mt-0.5">
                Farriintaan waxay ka soo muuqan doontaa dusha sare ee bogga oo dhan si qof kasta oo yimaada u arko.
              </p>
            </div>

            <form onSubmit={handleSaveAnnouncement} className="space-y-4">
              <label className="flex items-center gap-3 p-3 rounded-xl bg-red-50 border border-red-200 cursor-pointer">
                <input
                  type="checkbox"
                  checked={announcementActive}
                  onChange={(e) => setAnnouncementActive(e.target.checked)}
                  className="w-4 h-4 text-red-600 rounded"
                />
                <span className="text-xs font-bold text-gray-900">
                  Daar Ogaysiiska (Enable Announcement Banner)
                </span>
              </label>

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                  Qoraalka Ogaysiiska
                </label>
                <textarea
                  rows={3}
                  required
                  value={announcementMsg}
                  onChange={(e) => setAnnouncementMsg(e.target.value)}
                  placeholder="Tusaale: Kusoo dhawaada warbaahinta cusub ee BRENKNEWS! Kala soco wararkii ugu dambeeyay..."
                  className="w-full text-sm text-gray-800 p-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-red-600"
                ></textarea>
              </div>

              {/* Preview */}
              {announcementActive && (
                <div className="p-3 bg-red-600 text-white text-xs font-semibold rounded-xl flex items-center gap-2 shadow-sm">
                  <span className="bg-white text-red-600 font-extrabold px-1.5 py-0.5 rounded text-[10px] uppercase">
                    Muuqaalka
                  </span>
                  <span>{announcementMsg}</span>
                </div>
              )}

              <button
                type="submit"
                className="w-full bg-red-600 hover:bg-red-700 text-white font-bold text-xs py-3.5 rounded-xl cursor-pointer transition-colors shadow-sm"
              >
                Keydi Ogaysiiska
              </button>
            </form>
          </div>
        )}

      </div>
    </div>
  );
};
