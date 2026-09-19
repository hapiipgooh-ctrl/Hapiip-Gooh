import { Article, BreakingItem, CityWeather, ExchangeRate, NewsComment, PrayerTimes } from '../types';

export const BREAKING_NEWS_ITEMS: BreakingItem[] = [
  {
    id: 'brk-1',
    title: 'Baarlamaanka Federaalka Soomaaliya oo cod aqlabiyad leh ku ansixiyay Xeerka Doorashooyinka Qaran ee 2026',
    category: 'Siyaasadda',
    time: '5 daqiiqo ka hor',
    articleId: 'art-1',
  },
  {
    id: 'brk-2',
    title: 'Dekedda Caalamiga ah ee Muqdisho oo gaartay heerkii ugu sarreeyay ee dhoofinta wax-soo-saarka dalka',
    category: 'Dhaqaalaha',
    time: '24 daqiiqo ka hor',
    articleId: 'art-3',
  },
  {
    id: 'brk-3',
    title: 'Shir Madaxeedka Amniga Geeska Afrika oo ka furmay magaalada Muqdisho oo ay ka qeyb galayaan hoggaamiyeyaal goboleed',
    category: 'Amniga',
    time: '1 saac ka hor',
    articleId: 'art-2',
  },
  {
    id: 'brk-4',
    title: 'Fiilada Internetka ee labaad ee xawaaraha sarreeya (Subsea Cable) oo laga soo xiray xeebta Banaadir',
    category: 'Farsamada',
    time: '2 saac ka hor',
    articleId: 'art-5',
  },
];

export const CITY_WEATHERS: CityWeather[] = [
  { city: 'Muqdisho', temp: '31°C', condition: 'Qorrax leh', humidity: '72%' },
  { city: 'Hargeysa', temp: '26°C', condition: 'Daruuro kooban', humidity: '48%' },
  { city: 'Garoowe', temp: '29°C', condition: 'Qallalan', humidity: '51%' },
  { city: 'Kismaayo', temp: '30°C', condition: 'Dabeylo xeebed', humidity: '76%' },
  { city: 'Baydhabo', temp: '32°C', condition: 'Qorrax kulul', humidity: '55%' },
  { city: 'Dhuusamarreeb', temp: '33°C', condition: 'Qorrax leh', humidity: '42%' },
];

export const EXCHANGE_RATES: ExchangeRate[] = [
  { currency: 'USD / SOS', buy: 26200, sell: 26400, change: '+0.2%' },
  { currency: 'EUR / USD', buy: 1.09, sell: 1.11, change: '-0.1%' },
  { currency: 'AED / SOS', buy: 7130, sell: 7200, change: '0.0%' },
];

export const MOGADISHU_PRAYER_TIMES: PrayerTimes = {
  fajr: '04:45 AM',
  sunrise: '05:58 AM',
  dhuhr: '12:02 PM',
  asr: '03:18 PM',
  maghrib: '06:06 PM',
  isha: '07:15 PM',
};

export const ARTICLES: Article[] = [
  {
    id: 'art-1',
    slug: 'baarlamaanka-ansixiyay-xeerka-doorashooyinka',
    title: 'Baarlamaanka Federaalka Soomaaliya oo meelmariyay Xeerka Doorashooyinka Qof iyo Codka ah ee Dalka',
    subtitle: 'Kulan wadajir ah oo labada aqal ku yeesheen Xarunta Villa Hargeysa ee Muqdisho ayaa lagu ansixiyay sharcigan taariikhiga ah.',
    excerpt: 'Xildhibaannada Golaha Shacabka iyo Aqalka Sare ee Baarlamaanka Federaalka Soomaaliya ayaa maanta dood dheer ka dib cod aqlabiyad leh ku ansixiyay Xeerka Doorashooyinka Qaran, kaas oo dhabaha u xaaraya in shacabka Soomaaliyeed ay doortaan hoggaankooda.',
    content: [
      'Magaalada Muqdisho ee caasimadda dalka, kulan wadajir ah oo maanta ay isugu yimaadeen Xildhibaannada Labada Aqal ee Baarlamaanka Federaalka Soomaaliya ayaa si rasmi ah loogu meelmariyay Xeerka Doorashooyinka Qaran.',
      'Guddoomiyaha Golaha Shacabka oo shir-guddoominayay kulanka ayaa ku dhawaaqay natiijada codeynta, isagoo xaqiijiyay in in ka badan 180 mudane ay u codeeyeen meelmarinta sharcigan, halka ay jireen tiro yar oo diidday ama ka aamustay.',
      'Sharcigan cusub ayaa qeexaya nidaamka doorashooyinka tooska ah ee qof iyo codka ah ee heer degmo, heer dowlad goboleed iyo heer federaal. Waxaa sidoo kale lagu caddeeyay qoondada haweenka ee boqolkiiba 30% iyo doorka dhallinyarada ee hannaanka siyaasadda.',
      'Doodda sharcigan ayaa soo martay marxalado kala duwan, iyadoo guddiga madaxa-bannaan ee doorashooyinka uu soo bandhigay qorshe howleed ku aaddan diiwaangelinta codbixiyayaasha guud ahaan gobollada dalka.',
      'Khubarada arrimaha dastuurka iyo siyaasadda Soomaaliya ayaa tallaabadan ku tilmaamay guul weyn oo u soo hoyatay dimuqraadiyadda curdanka ah ee Soomaaliya, maadaama dalku muddo dheer ku tiirsanaa nidaamka doorashooyinka dadban.'
    ],
    quote: {
      text: "Maanta waa maalin taariikhi ah oo shacabka Soomaaliyeed loo soo celiyay xaqa aasaasiga ah ee ah inay doortaan cidda mataleysa.",
      author: "Guddoomiyaha Golaha Shacabka",
      role: "Baarlamaanka Federaalka Soomaaliya"
    },
    keyPoints: [
      'Meelmarinta nidaamka qof iyo codka ah ee doorashooyinka dalka.',
      'Ilaalinta qoondada 30% ee metelaadda haweenka Soomaaliyeed.',
      'Dhismaha xarumaha diiwaangelinta codbixiyayaasha ee dhammaan magaalooyinka waaweyn.',
      'Taageerada caalamiga ah ee nidaamka farsamo iyo dhaqaale ee doorashada.'
    ],
    category: 'siyaasadda',
    categoryLabel: 'Siyaasadda',
    subcategory: 'Baarlamaanka',
    author: {
      name: 'Cabdiraxmaan Cali Nuur',
      role: 'Wariyaha Sare ee BRENKNEWS Muqdisho',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
      location: 'Muqdisho, Soomaaliya'
    },
    publishedAt: '18 Sebtembar 2026, 09:30 Subaxnimo',
    updatedAt: '18 Sebtembar 2026, 11:15 Duhurnimo',
    readTime: '4 daqiiqo',
    views: 14850,
    commentsCount: 38,
    imageUrl: 'https://images.unsplash.com/photo-1541872703-74c5e44368f9?w=1200&auto=format&fit=crop&q=80',
    imageCaption: 'Xarunta Baarlamaanka Federaalka Soomaaliya intii ay socotay codeynta sharciga doorashooyinka.',
    imageCredit: 'BRENKNEWS / Sawirka Xafiiska Baarlamaanka',
    isBreaking: true,
    isHero: true,
    isTrending: true,
    trendingRank: 1,
    tags: ['Muqdisho', 'Baarlamaanka', 'Doorashooyinka', 'Dastuurka', 'Somalia2026'],
    audioDuration: '3:45',
  },
  {
    id: 'art-2',
    slug: 'shirka-amniga-geeska-afrika-muqdisho',
    title: 'Hoggaamiyeyaasha Geeska Afrika oo Muqdisho kaga shiraya Iskaashiga Amniga iyo Dagaalka Argagixisada',
    subtitle: 'Wufuud sare oo ka socota dalalka deriska iyo saaxiibbada caalamiga ah oo yimid garoonka Aadan Cadde.',
    excerpt: 'Caasimadda Muqdisho ayaa maanta martigelisay Shirweynaha Amniga Gobolka Geeska Afrika, kaas oo diiradda lagu saarayo dhammeystirka hawlgallada amniga iyo wareejinta mas’uuliyadda ciidanka.',
    content: [
      'Magaalada Muqdisho waxaa si habsami leh uga furmay Shirweynaha Qaran iyo Goboleed ee Amniga Geeska Afrika, kaas oo ay ka qeyb galayaan wakiillo ka socda Midowga Afrika, Qaramada Midoobay, iyo madaxda ciidanka dalka.',
      'Madaxweynaha Jamhuuriyadda Federaalka Soomaaliya oo furay shirka ayaa hoosta ka xariiqay guulaha la taaban karo ee Ciidanka Xoogga Dalka Soomaaliyeed ay ka gaareen howlgallada ka socda gobollada dhexe iyo koonfurta dalka.',
      'Wasiirka Gaashaandhigga ayaa soo bandhigay warbixin ku saabsan qorshaha tababarka iyo qalabeynta ciidamada qalabka sida, iyo sidii loo xoojin lahaa iskaashiga xogta sirdoonka ee dalalka bariga Afrika.',
      'Shirka ayaa sidoo kale lagaga dooday qorshaha dib-u-dejinta dadka ku barakacay degaannada dhawaan la xoreeyay iyo furitaanka jidadka muhiimka ah ee connects gobollada dalka.'
    ],
    quote: {
      text: "Amniga Soomaaliya waa amniga gobolka oo dhan; ma jiro dal si gooni ah nabad ugu noolaan kara haddii aan gacmaha la isku qabsan.",
      author: "Madaxweynaha JFS",
      role: "Madaxtooyada Villa Somalia"
    },
    keyPoints: [
      'Xoojinta awoodda difaaca ee Ciidanka Xoogga Dalka.',
      'Iskaashiga xogta sirdoonka gobolka Geeska Afrika.',
      'Barnaamijyada xasilinta iyo gargaarka degaannada la xoreeyay.'
    ],
    category: 'amniga',
    categoryLabel: 'Amniga & Difaaca',
    subcategory: 'Ciidamada',
    author: {
      name: 'Faarax Maxamed Warsame',
      role: 'Tifaftiraha Qeybta Amniga',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
      location: 'Muqdisho, Soomaaliya'
    },
    publishedAt: '18 Sebtembar 2026, 08:10 Subaxnimo',
    readTime: '3 daqiiqo',
    views: 11200,
    commentsCount: 19,
    imageUrl: 'https://images.unsplash.com/photo-1579273166152-d725a4e2b755?w=1200&auto=format&fit=crop&q=80',
    imageCaption: 'Madaxda iyo saraakiisha sar sare intii uu socday furitaanka shirka amniga ee Muqdisho.',
    imageCredit: 'BRENKNEWS / Wakaaladda Wararka',
    isHero: true,
    isTrending: true,
    trendingRank: 2,
    tags: ['Amniga', 'CiidankaXoogga', 'GeeskaAfrika', 'Muqdisho'],
    audioDuration: '2:50',
  },
  {
    id: 'art-3',
    slug: 'dekedda-muqdisho-koror-dhoofinta',
    title: 'Dekedda Caalamiga ah ee Muqdisho oo Gaartay Heer Taariikhi ah: Dhoofinta Xoolaha iyo Wax-soo-saarka oo Kordhay 45%',
    subtitle: 'Casriyeynta qalabka rarka iyo dajinta ee dekedda ayaa sare u qaadday hufnaanta ganacsiga caalamiga ah.',
    excerpt: 'Maamulka Dekedda Muqdisho ayaa shaaciyay warbixinta rubuca labaad ee sannadkan, taasoo muujineysa koboc ballaaran oo ku yimid xaddiga badeecadaha dhoofka iyo dakhliga dowladda.',
    content: [
      'Dekedda weyn ee caasimadda Muqdisho ayaa sanadkan diiwaangelisay mid ka mid ah guulaha ugu waaweyn xagga dhaqdhaqaaqa ganacsiga iyo dhoofinta badeecadaha maxalliga ah ee Soomaaliya.',
      'Sida ku cad xogta cusub ee ka soo baxday Wasaaradda Dekedaha iyo Gaadiidka Badda, dhoofinta xoolaha nool, muuska, sisinta, iyo kalluunka ayaa kor u kacday boqolkiiba 45% marka la barbardhigo isla xilligan sanadkii hore.',
      'Wasiirka Ganacsiga iyo Warshadaha ayaa sheegay in heshiisyada cusub ee ganacsi ee Soomaaliya la gashay waddamada Khaliijka iyo Bariga Afrika ay horseedeen in fursado cusub u furmaan beeraleyda iyo ganacsatada xoolaha ee Soomaaliyeed.',
      'Casriyeynta lagu sameeyay wiishashka waaweyn ee dekedda (Gantry Cranes) iyo nidaamka dijitaalka ah ee canshuuraha ayaa soo gaabiyay waqtigii markabku ku qaadan jiray dekedda oo laga dhigay wax ka yar 48 saacadood.'
    ],
    quote: {
      text: "Dhaqaalaha Soomaaliya waxa uu ku tiirsan yahay wax-soo-saarkeena gudaha. Dekedaha casriga ahi waa albaabka kobaca qaran.",
      author: "Maareeyaha Dekedda Muqdisho",
      role: "Wasaaradda Dekedaha"
    },
    keyPoints: [
      'Koror 45% ah oo ku yimid dhoofinta xoolaha iyo wax-soo-saarka beeraha.',
      'Hirgelinta nidaamka dijitaalka ah ee rarka iyo kormeerka xamuulka.',
      'Fursado shaqo oo cusub oo ay heleen in ka badan 2,500 dhallinyaro Soomaaliyeed ah.'
    ],
    category: 'dhaqaalaha',
    categoryLabel: 'Dhaqaalaha & Ganacsiga',
    subcategory: 'Ganacsiga Badda',
    author: {
      name: 'Maryan Axmed Jimcaale',
      role: 'Tifaftiraha Dhaqaalaha & Maaliyadda',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
      location: 'Muqdisho, Soomaaliya'
    },
    publishedAt: '18 Sebtembar 2026, 07:45 Subaxnimo',
    readTime: '3 daqiiqo',
    views: 9400,
    commentsCount: 14,
    imageUrl: 'https://images.unsplash.com/photo-1518241353330-0f7941c2d9b5?w=1200&auto=format&fit=crop&q=80',
    imageCaption: 'Maraakiib waaweyn oo xamuul ku dajinaya kuna raranaya dekedda weyn ee magaalada Muqdisho.',
    imageCredit: 'BRENKNEWS / Sawirka Dekedda',
    isHero: true,
    isTrending: true,
    trendingRank: 3,
    tags: ['Dhaqaalaha', 'DekeddaMuqdisho', 'Ganacsiga', 'Dhoofinta'],
    audioDuration: '3:10',
  },
  {
    id: 'art-4',
    slug: 'horumarka-garoowe-iyo-mashaariicda-puntland',
    title: 'Magaalada Garoowe oo laga daahfuray Mashruuc Weyn oo Isku Xiraya Waddooyinka Gobollada Waqooyi-Bari',
    subtitle: 'Mashruucan oo ay maalgelisay dowladda iyo maalgashadayaasha maxalliga ah ayaa kor u qaadaya isku xirka bulshada.',
    excerpt: 'Magaalada Garoowe ee caasimadda Puntland ayaa maanta lagu daahfuray wajiga labaad ee dhismaha wadada isku xirta gobollada Nugaal iyo Mudug, taasoo fududeyn doonta ganacsiga iyo isku socodka.',
    content: [
      'Munaasabad ballaaran oo ka dhacday caasimadda Garoowe ayaa lagu dhagax dhigay mashruuc cusub oo lagu ballaarinayo waddooyinka laamiga ah ee isku xira degmooyinka iyo gobollada Puntland.',
      'Madaxweynaha Puntland iyo xubno ka tirsan golihiisa wasiirrada, maamulka degmada Garoowe, iyo odayaasha dhaqanka ayaa ka qeyb galay furitaanka dhismaha jidkan casriga ah.',
      'Injineerrada fulinaya howsha ayaa sheegay in wadadu leedahay nidaam casri ah oo biyaha roobka ka weecinaya jidka, calaamado nalka cadceedda ku shaqeeya (Solar Lighting), iyo buundooyin adag.',
      'Shacabka ganacsatada ah ayaa soo dhoweeyay tallaabadan, iyagoo sheegay inay yarayn doonto kharashkii ku bixi jiray gaadiidka xamuulka qaada ee gobolka.'
    ],
    category: 'gobollada',
    categoryLabel: 'Gobollada Dalka',
    subcategory: 'Puntland',
    author: {
      name: 'Jaamac Maxamuud Ciise',
      role: 'Wariyaha BRENKNEWS ee Garoowe',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80',
      location: 'Garoowe, Puntland'
    },
    publishedAt: '18 Sebtembar 2026, 06:30 Subaxnimo',
    readTime: '3 daqiiqo',
    views: 7800,
    commentsCount: 22,
    imageUrl: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=1200&auto=format&fit=crop&q=80',
    imageCaption: 'Muuqaal guud oo laga qaaday dhismaha jidadka casriga ah ee bartamaha magaalada Garoowe.',
    imageCredit: 'BRENKNEWS / Garoowe Bureau',
    isTrending: true,
    trendingRank: 4,
    tags: ['Garoowe', 'Puntland', 'Gobollada', 'Kaabayaasha'],
    audioDuration: '2:40',
  },
  {
    id: 'art-5',
    slug: 'farsamada-fiilada-internetka-cusub',
    title: 'Fiilo Cusub oo Internetka Xawaaraha Sare ah (Subsea Cable) oo Si Rasmi ah Looga Furay Xeebta Soomaaliya',
    subtitle: 'Tallaabadan ayaa la filayaa inay qiimaha xogta internetka hoos u dhigto 30% isla markaana kor u qaaddo ganacsiga dijitaalka ah.',
    excerpt: 'Shirkadaha isgaarsiinta iyo Wasaaradda Isgaarsiinta iyo Tiknoolajiyadda ayaa maanta si wadajir ah u shaaciyay daahfurka xarunta qaabilaadda fiilada badda hoos marta ee magaalada Muqdisho.',
    content: [
      'Soomaaliya waxay maanta qaadday tallaabo weyn oo dhinaca kaabayaasha farsamada casriga ah, iyadoo si rasmi ah loo daahfuray fiilada labaad ee badda hoosteeda marta oo xiriirinaysa dalka iyo qaaradaha adduunka.',
      'Fiiladan cusub waxay bixin doontaa awood xawaare gaaraya tobanaan Terabits ilbiriqsigiiba, taas oo meesha ka saari doonta culeysyadii mararka qaar ku imaan jiray shabakadda internetka ee dalka.',
      'Dhallinyarada bilaabaya shirkadaha tiknoolajiyadda (Startups), jaamacadaha, xarumaha caafimaadka, iyo bangiyada ayaa si gaar ah uga faa’iideysan doona xawaarahan cusub.',
      'Wasiirka Isgaarsiinta ayaa ku boorriyay maalgashadayaasha maxalliga ah inay maalgashadaan xarumaha xogta (Data Centers) si xogta Soomaaliya loogu dhex kaydiyo dalka gudihiisa.'
    ],
    category: 'farsamada',
    categoryLabel: 'Farsamada & IT',
    subcategory: 'Tiknoolajiyad',
    author: {
      name: 'Khadar Xasan Cilmi',
      role: 'Wariyaha Tiknoolajiyadda & Hal-abuurka',
      avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&auto=format&fit=crop&q=80',
      location: 'Muqdisho, Soomaaliya'
    },
    publishedAt: '17 Sebtembar 2026, 04:15 Galabnimo',
    readTime: '4 daqiiqo',
    views: 8650,
    commentsCount: 16,
    imageUrl: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1200&auto=format&fit=crop&q=80',
    imageCaption: 'Tiknoolajiyadda xargaha badda hoose ee xiriiriya xogta caalamka iyo Soomaaliya.',
    imageCredit: 'Unsplash / Tech News',
    isTrending: true,
    trendingRank: 5,
    tags: ['Tiknoolajiyad', 'Internet', 'Muqdisho', 'HalAbuur'],
    audioDuration: '3:05',
  },
  {
    id: 'art-6',
    slug: 'koobka-maamul-goboleedyada-muqdisho-stadium',
    title: 'Cayaaraha Maamul Goboleedyada: Kulanka Kama Dambeysta ah ee Koobka oo Berri ka Dhacaya Muqdisho Stadium',
    subtitle: 'Kooxaha Banaadir iyo Galmudug oo ku hardamaya koobka qaaliga ah ee sanadkan, iyadoo tikidhadii ay dhammaadeen.',
    excerpt: 'Garoonka weyn ee Muqdisho Stadium ayaa diyaar u ah martigelinta ciyaarta ugu xamaasadda badan sanadka ee u dhaxeysa xulalka Banaadir iyo Galmudug.',
    content: [
      'Xamaasadda cayaaraha kubadda cagta ee Soomaaliya ayaa gaartay heerkii ugu sarreeyay, iyadoo berri galab garoonka weyn ee Muqdisho Stadium lagu wada qaban doono ciyaarta fiinaalka Koobka Maamul Goboleedyada iyo Gobolka Banaadir.',
      'Kumanaan taageerayaal ah oo ka kala yimid dhammaan degmooyinka caasimadda iyo gobollada dalka ayaa durba bilaabay safafka hore ee gelitaanka garoonka.',
      'Guddoomiyaha Xiriirka Kubadda Cagta Soomaaliyeed ayaa sheegay in ciyaartan ay muujineyso is-dhexgalka bulshada, nabadda, iyo kartida dhallinyarada Soomaaliyeed.',
      'Wasiirka Dhallinyarada iyo Cayaaraha ayaa ugu baaqay taageerayaasha inay muujiyaan anshax wanaagsan iyo niyad sami cayaareed inta ay ciyaartu socoto.'
    ],
    category: 'cayaaraha',
    categoryLabel: 'Cayaaraha',
    subcategory: 'Kubadda Cagta',
    author: {
      name: 'Mustaf Axmed Gelle',
      role: 'Wariyaha Cayaaraha ee BRENKNEWS',
      avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&auto=format&fit=crop&q=80',
      location: 'Muqdisho, Soomaaliya'
    },
    publishedAt: '17 Sebtembar 2026, 02:00 Duhurnimo',
    readTime: '2 daqiiqo',
    views: 13200,
    commentsCount: 45,
    imageUrl: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=1200&auto=format&fit=crop&q=80',
    imageCaption: 'Muuqaal xiiso leh oo ka mid ah garoonka weyn ee Muqdisho Stadium intii ay socdeen tartamada.',
    imageCredit: 'BRENKNEWS / Sports Media',
    tags: ['Cayaaraha', 'MuqdishoStadium', 'Banaadir', 'Galmudug'],
    audioDuration: '2:15',
  },
  {
    id: 'art-7',
    slug: 'berbera-xarunta-ganacsiga-xorta-ah',
    title: 'Dekedda Berbera iyo Aagga Dhaqaalaha Xorta ah oo Soo Jiitay Shirkado Caalami ah oo Maalgashi Sameynaya',
    subtitle: 'Dekedda oo noqotay marin ganacsi oo muhiim u ah dalalka ku yaalla Geeska Afrika gaar ahaan Itoobiya.',
    excerpt: 'Aagga Ganacsiga Xorta ah ee Berbera (Berbera Economic Zone) ayaa diiwaangeliyay heshiisyo cusub oo ay la saxiixdeen shirkado caalami ah oo ka shaqeeya saadka iyo warshadaha fudud.',
    content: [
      'Magaalada xeebeedka Berbera ee Somaliland ayaa sii xoojinaysa maqaamkeeda xarun ganacsi oo heer caalami ah kadib furitaanka aagga cusub ee ganacsiga xorta ah.',
      'Mas’uuliyiinta dekedda ayaa xaqiijiyay in tiro badan oo maraakiib xamuul ah ay hadda si toos ah u soo gaaraan Berbera iyagoo aan soo marin dekedo dhexe, taasoo jabisay qiimihii gaadiidka badeecadaha.',
      'Ganacsatada ku sugan Geeska Afrika ayaa sheegay in hufnaanta canshuuraha iyo xawaaraha adeegyada Berbera ay kor u qaadeen tartanka ganacsiga badda cas iyo badweynta Hindiya.'
    ],
    category: 'gobollada',
    categoryLabel: 'Gobollada Dalka',
    subcategory: 'Somaliland',
    author: {
      name: 'Ibraahim Xuseen Cigaal',
      role: 'Wariyaha BRENKNEWS ee Hargeysa & Berbera',
      avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=150&auto=format&fit=crop&q=80',
      location: 'Hargeysa, Somaliland'
    },
    publishedAt: '16 Sebtembar 2026, 11:20 Barqo',
    readTime: '3 daqiiqo',
    views: 6540,
    commentsCount: 11,
    imageUrl: 'https://images.unsplash.com/photo-1578575437130-527eed3abbec?w=1200&auto=format&fit=crop&q=80',
    imageCaption: 'Maraakiibta konteenarada qaada ee taagan dekedda cusub ee Berbera.',
    imageCredit: 'BRENKNEWS / Berbera Archive',
    tags: ['Berbera', 'Somaliland', 'Dhaqaalaha', 'GanacsigaBadda'],
    audioDuration: '2:50',
  },
  {
    id: 'art-8',
    slug: 'beeraleyda-shabeellaha-hoose-iyo-wax-soo-saarka',
    title: 'Beeraleyda Gobolka Shabeellaha Hoose oo Bilaabay Goosashada Dalagyada Xilliga Gu’ga ee Sanadkan',
    subtitle: 'Roobabkii fiicnaa ee ka da’ay wabiga Shabeelle ayaa keenay in beero badan ay soo saaraan galley, yaanyo, iyo basbal.',
    excerpt: 'Wax-soo-saarka beeraleyda gobolka Shabeellaha Hoose ayaa suuqyada Muqdisho iyo gobollada u dhow ku soo kordhiyay cunto raqiis ah oo tayo sare leh.',
    content: [
      'Beeraleyda ku nool degaannada Afgooye, Awdheegle, iyo Qoryooley ee gobolka Shabeellaha Hoose ayaa bilaabay goosashada dalagyada kala duwan ee xilliga Gu’ga.',
      'Suuqyada waaweyn ee Bakaaraha, Suuq Bacaad, iyo Madiina ayaa lagu arkayay gawaari waaweyn oo sida qudaarta iyo dalagyada beeraha oo qiimahoodu aad u jaban yahay.',
      'Guddoomiyaha Iskaashatada Beeraleyda ayaa ugu baaqay dowladda iyo hay’adaha inay beeraleyda ka caawiyaan dhismaha keydadka qabow (Cold storage) si wax-soo-saarku uusan u hallaabin xilliyada barwaaqada.'
    ],
    category: 'dhaqaalaha',
    categoryLabel: 'Dhaqaalaha & Ganacsiga',
    subcategory: 'Beeraha',
    author: {
      name: 'Maryan Axmed Jimcaale',
      role: 'Tifaftiraha Dhaqaalaha & Maaliyadda',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
      location: 'Muqdisho, Soomaaliya'
    },
    publishedAt: '16 Sebtembar 2026, 09:10 Subaxnimo',
    readTime: '3 daqiiqo',
    views: 5400,
    commentsCount: 9,
    imageUrl: 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=1200&auto=format&fit=crop&q=80',
    imageCaption: 'Beeraha doogga ah ee ku yaalla jiidda webiga Shabeelle ee koonfurta dalka.',
    imageCredit: 'BRENKNEWS / Shabeelle Reporter',
    tags: ['Beeraha', 'ShabeellahaHoose', 'Afgooye', 'Dhaqaalaha'],
    audioDuration: '2:30',
  },
  {
    id: 'art-9',
    slug: 'falanqeyn-geeska-afrika-diplomasiyadda',
    title: 'FALANQEYN: Dhaqdhaqaaqyada Diblomaasiyadeed ee Cusub ee Geeska Afrika iyo Saameynta ay ku leeyihiin Soomaaliya',
    subtitle: 'Qalinkii Prof. Cabdullaahi Maxamed Nuur - Falanqeeye Arrimaha Siyaasadda Gobolka.',
    excerpt: 'Isbeddellada degdegga ah ee ka socda mandaqadda Badda Cas iyo Geeska Afrika waxay horseedeen in Soomaaliya ay noqoto xudunta danaha caalamiga ah ee quwadaha waaweyn.',
    content: [
      'Geeska Afrika wuxuu hadda marayaa marxalad taariikhi ah oo dib loogu qaabeynayo xulafaysiga siyaasadeed, dhaqaale, iyo amni.',
      'Soomaaliya oo leh xeebta ugu dheer qaaradda Afrika (in ka badan 3,333 km) iyo goob istiraatiiji ah oo ku beegan marinka Bab el-Mandeb ayaa soo jiidatay indhaha dalalka Bariga Dhexe, Mareykanka, Yurub, iyo Shiinaha.',
      'Si Soomaaliya uga faa’iideysato fursadahan, waxaa lama huraan ah in la xoojiyo hay’adaha dowliga ah, la mideeyo siyaasadda arrimaha dibadda, laguna adkeysto madax-bannaanida iyo wadajirka dhuleed ee qaranka.'
    ],
    category: 'rayiga',
    categoryLabel: 'Falanqeynta & Ra\'yiga',
    subcategory: 'Diblomaasiyadda',
    author: {
      name: 'Prof. Cabdullaahi Maxamed Nuur',
      role: 'Falanqeeye Sare & Qoraa Madax-bannaan',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
      location: 'Nairobi / Muqdisho'
    },
    publishedAt: '15 Sebtembar 2026, 05:00 Galabnimo',
    readTime: '5 daqiiqo',
    views: 8900,
    commentsCount: 31,
    imageUrl: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1200&auto=format&fit=crop&q=80',
    imageCaption: 'Khariidadda gobolka Geeska Afrika iyo marinnada caalamiga ah ee maraakiibta.',
    imageCredit: 'BRENKNEWS Opinion Desk',
    tags: ['Falanqeyn', 'SiyaasaddaDibadda', 'GeeskaAfrika', 'BaddaCas'],
    audioDuration: '4:10',
  },
  {
    id: 'art-10',
    slug: 'kismaayo-mashaariicda-jubbaland',
    title: 'Garoonka Caalamiga ah ee Sayid Maxamed Cabdille Xasan ee Kismaayo oo Lagu Kordhiyay Dhabaha Diyaaradaha',
    subtitle: 'Duullimaadyada tooska ah ee caalamiga ah ayaa la filayaa inay dhowaan ka bilowdaan magaalada Kismaayo.',
    excerpt: 'Dhismaha dhabaha cusub ee diyaaradaha (Runway) ee garoonka magaalada Kismaayo ayaa la soo gabagabeeyay, taas oo u saamaxaysa diyaaradaha waaweyn ee xamuulka iyo rakaabka inay si nabad ah ku soo degaan.',
    content: [
      'Magaalada Kismaayo ee xarunta ku-meel-gaarka ah ee Jubbaland ayaa maanta u dabbaal-dagtay dhammeystirka dhismaha dhabaha casriga ah ee garoonka diyaaradaha ee Sayid Maxamed Cabdille Xasan.',
      'Mas’uuliyiinta Hay’adda Duulista Rayidka Soomaaliyeed ayaa kormeeray badqabka iyo qalabka cusub ee habeenkii lagu hagi doono diyaaradaha.',
      'Tallaabadan ayaa kor u qaadaysa dhoofka kalluunka qaaliga ah ee laga helo xeebaha Jubbaland, kaas oo si toos ah loogu dhoofin doono suuqyada caalamka.'
    ],
    category: 'gobollada',
    categoryLabel: 'Gobollada Dalka',
    subcategory: 'Jubbaland',
    author: {
      name: 'Cabdiweli Saalax Mire',
      role: 'Wariyaha BRENKNEWS ee Kismaayo',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
      location: 'Kismaayo, Jubbaland'
    },
    publishedAt: '15 Sebtembar 2026, 01:30 Duhurnimo',
    readTime: '3 daqiiqo',
    views: 4890,
    commentsCount: 8,
    imageUrl: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=1200&auto=format&fit=crop&q=80',
    imageCaption: 'Diyaarad rakaab ah oo ka soo degeysa garoonka diyaaradaha ee magaalada Kismaayo.',
    imageCredit: 'BRENKNEWS / Kismaayo Bureau',
    tags: ['Kismaayo', 'Jubbaland', 'Duulista', 'Gobollada'],
    audioDuration: '2:40',
  }
];

export const CATEGORIES_LIST = [
  { id: 'dhammaan', nameSo: 'Dhammaan', nameEn: 'All', icon: 'Globe' },
  { id: 'siyaasadda', nameSo: 'Siyaasadda', nameEn: 'Politics', icon: 'Landmark' },
  { id: 'amniga', nameSo: 'Amniga & Ciidanka', nameEn: 'Security', icon: 'ShieldAlert' },
  { id: 'dhaqaalaha', nameSo: 'Dhaqaalaha & Ganacsiga', nameEn: 'Economy', icon: 'TrendingUp' },
  { id: 'gobollada', nameSo: 'Gobollada Dalka', nameEn: 'Regions', icon: 'MapPin' },
  { id: 'caalamka', nameSo: 'Arrimaha Caalamka', nameEn: 'World', icon: 'Compass' },
  { id: 'farsamada', nameSo: 'Farsamada & IT', nameEn: 'Technology', icon: 'Cpu' },
  { id: 'cayaaraha', nameSo: 'Cayaaraha', nameEn: 'Sports', icon: 'Trophy' },
  { id: 'rayiga', nameSo: 'Falanqeynta & Ra\'yiga', nameEn: 'Opinion', icon: 'FileText' },
];

export const REGIONS_SUBMENU = [
  { name: 'Banaadir (Muqdisho)', slug: 'banaadir' },
  { name: 'Puntland (Garoowe/Boosaaso)', slug: 'puntland' },
  { name: 'Somaliland (Hargeysa/Berbera)', slug: 'somaliland' },
  { name: 'Jubbaland (Kismaayo)', slug: 'jubbaland' },
  { name: 'Galmudug (Dhuusamarreeb/Gaalkacyo)', slug: 'galmudug' },
  { name: 'Hirshabelle (Jowhar/Beledweyne)', slug: 'hirshabelle' },
  { name: 'Koonfur Galbeed (Baydhabo/Baraawe)', slug: 'koonfur-galbeed' },
];

export const SAMPLE_COMMENTS: NewsComment[] = [
  {
    id: 'c-1',
    authorName: 'Axmed Xasan Geeddi',
    authorLocation: 'Muqdisho',
    text: 'Tallaabo aad u wanaagsan oo dalkeena u horseedeysa xasilooni iyo horumar. Waxaan rajeyneynaa in si hufan loo fuliyo.',
    date: '18 Sebtembar 2026, 10:45 AM',
    likes: 24,
  },
  {
    id: 'c-2',
    authorName: 'Safiyo Cabdiraxmaan',
    authorLocation: 'Hargeysa',
    text: 'Warbixin tayo leh oo xaqiiqada ka hadlaysa. BRENKNEWS mar kasta waad ku mahadsan tihiin wararka dhex-dhexaadka ah.',
    date: '18 Sebtembar 2026, 11:20 AM',
    likes: 18,
  },
  {
    id: 'c-3',
    authorName: 'Maxamed Cumar (London)',
    authorLocation: 'London, UK',
    text: 'Waxaan qurbaha kala soconnaa wararka dalka, waxaana ku faraxsanahay inaan aragno dalka oo horumar ka samaynaya nidaamka doorashada iyo dhaqaalaha.',
    date: '18 Sebtembar 2026, 12:05 PM',
    likes: 15,
  }
];

export const MULTIMEDIA_ITEMS = [
  {
    id: 'v-1',
    title: 'Warbixin Muuqaal ah: Sida Dekedda Muqdisho ugu diyaar garoowday Maraakiibta Waaweyn ee Caalamiga ah',
    duration: '04:18',
    views: '45K views',
    thumbnail: 'https://images.unsplash.com/photo-1518241353330-0f7941c2d9b5?w=800&auto=format&fit=crop&q=80',
    type: 'video',
    author: 'Kooxda Muuqaallada BRENKNEWS'
  },
  {
    id: 'v-2',
    title: 'Sawirro Gaar ah: Quruxda Xeebta Liido iyo Dhaqdhaqaaqa Ganacsiga Jimcaha ee Muqdisho',
    duration: '8 Sawirro',
    views: '28K views',
    thumbnail: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&auto=format&fit=crop&q=80',
    type: 'gallery',
    author: 'Sawir-qaade Cabdullaahi Maxamed'
  },
  {
    id: 'v-3',
    title: 'Barnaamij Gaar ah: Dhallinyarada Soomaaliyeed ee Furay Shirkadaha Tiknoolajiyada Casriga ah',
    duration: '06:45',
    views: '19K views',
    thumbnail: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=800&auto=format&fit=crop&q=80',
    type: 'video',
    author: 'Qeybta Barnaamijyada'
  }
];
