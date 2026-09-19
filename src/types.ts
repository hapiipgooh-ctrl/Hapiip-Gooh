export type CategoryId = 
  | 'dhammaan'
  | 'siyaasadda' 
  | 'amniga' 
  | 'dhaqaalaha' 
  | 'gobollada' 
  | 'caalamka' 
  | 'farsamada' 
  | 'cayaaraha' 
  | 'rayiga';

export interface Author {
  name: string;
  role: string;
  avatar: string;
  location: string;
}

export interface NewsComment {
  id: string;
  authorName: string;
  authorLocation: string;
  text: string;
  date: string;
  likes: number;
}

export interface Article {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  excerpt: string;
  content: string[];
  quote?: {
    text: string;
    author: string;
    role: string;
  };
  keyPoints?: string[];
  category: CategoryId;
  categoryLabel: string;
  subcategory?: string;
  author: Author;
  publishedAt: string;
  updatedAt?: string;
  readTime: string;
  views: number;
  commentsCount: number;
  imageUrl: string;
  imageCaption: string;
  imageCredit: string;
  isBreaking?: boolean;
  isHero?: boolean;
  isTrending?: boolean;
  trendingRank?: number;
  tags: string[];
  audioDuration?: string;
  videoUrl?: string;
}

export interface BreakingItem {
  id: string;
  title: string;
  category: string;
  time: string;
  articleId: string;
}

export interface ExchangeRate {
  currency: string;
  buy: number;
  sell: number;
  change: string;
}

export interface CityWeather {
  city: string;
  temp: string;
  condition: string;
  humidity: string;
}

export interface CommunityPoll {
  id: string;
  question: string;
  options: {
    id: string;
    text: string;
    votes: number;
  }[];
  totalVotes: number;
  isActive: boolean;
}

export interface OwnerAnnouncement {
  id: string;
  message: string;
  active: boolean;
  date: string;
}

export interface Subscriber {
  id: string;
  email: string;
  date: string;
}

export interface PrayerTimes {
  fajr: string;
  sunrise: string;
  dhuhr: string;
  asr: string;
  maghrib: string;
  isha: string;
}
