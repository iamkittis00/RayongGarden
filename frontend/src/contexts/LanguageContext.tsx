import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';

type Language = 'th' | 'en';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations = {
  th: {
    // Bottom Nav
    'nav.services': 'บริการ',
    'nav.home': 'หน้าแรก',
    'nav.others': 'อื่นๆ',
    
    // Settings Page
    'settings.title': 'การตั้งค่าและอื่นๆ',
    'settings.subtitle': 'จัดการบัญชีและติดต่อสอบถาม',
    'settings.contact': 'ติดต่อเจ้าหน้าที่',
    'settings.contact_desc': 'โทรสอบถาม หรือขอความช่วยเหลือ',
    'settings.rate': 'ให้คะแนนความพึงพอใจ',
    'settings.rate_desc': 'ติชมเพื่อการพัฒนาบริการที่ดีขึ้น',
    'settings.language': 'เปลี่ยนภาษา (Language)',
    'settings.current_lang': 'ปัจจุบัน: ภาษาไทย',
    'settings.logout': 'ออกจากระบบ',
    'settings.close': 'ปิดหน้าต่าง',
    'settings.submit': 'ส่งคะแนนประเมิน',
    
    // Home Page
    'home.welcome': 'ยินดีต้อนรับ',
    'home.enjoy': 'เพลิดเพลินกับการล่องเรือ',
    'home.hello': 'สวัสดี, คุณ',
    'home.explorer': 'นักสำรวจธรรมชาติ',
    'home.route': 'แผนที่เส้นทางเรือ',
    'home.places': 'สถานที่แนะนำ',
    'home.points': 'คะแนนสะสม',
    'home.recommend': 'แนะนำจุดเที่ยว',
    'home.see_all': 'ดูทั้งหมด',
    'home.distance': 'ห่างไป',
    'home.km': 'กม.',
    
    // Services Page
    'services.title': 'บริการข้อมูล',
    'services.subtitle': 'ข้อมูลและสิ่งอำนวยความสะดวกสำหรับนักท่องเที่ยว',
    'services.pricing': 'อัตราค่าบริการเรือ',
    'services.kayak': 'เรือคายัค (พายเอง)',
    'services.motorboat': 'เรือยนต์ (มีคนขับ)',
    'services.per_boat': '/ลำ',
    'services.facilities': 'สิ่งอำนวยความสะดวกบนฝั่ง',
    'services.cafe': 'คาเฟ่ & เครื่องดื่ม',
    'services.toilet': 'ห้องน้ำสะอาด',
    'services.parking': 'ลานจอดรถกว้างขวาง',
    'services.ticket': 'จุดจำหน่ายตั๋วเรือ',
    'services.safety': 'ข้อปฏิบัติเพื่อความปลอดภัย',
    'services.rule1': 'สวมเสื้อชูชีพตลอดเวลาขณะอยู่บนเรือและห้ามถอดเด็ดขาด',
    'services.rule2': 'ห้ามยืนหรือโยกเรือขณะพายเรือคายัค เพื่อป้องกันเรือพลิกคว่ำ',
    'services.rule3': 'ห้ามทิ้งขยะลงในบึงน้ำ หรือทำลายพรรณไม้ตามเส้นทาง',
    'services.rule4': 'หากหลงทางหรือเกิดเหตุฉุกเฉิน ให้กดปุ่ม SOS ในหน้าแผนที่',
    
    // POIs
    'poi.ฐานชะมวง': 'ฐานชะมวง',
    'poi.ฐานพะยอม': 'ฐานพะยอม',
    'poi.ป่าเสม็ด': 'ป่าเสม็ด',
    'poi.จุดชมวิวพิเศษ': 'จุดชมวิวพิเศษ',
    'poi.จุดชมวิว 1': 'จุดชมวิว 1',
    'poi.จุดชมวิว 2': 'จุดชมวิว 2',
    
    // Places Page
    'places.title': 'สถานที่แนะนำ',
    'places.subtitle': 'เลือกสถานที่ที่น่าสนใจบนเส้นทางของคุณ',
    'places.navigate': 'นำทาง',
    
    // Stamp Page
    'stamp.title': 'สะสมสแตมป์',
    'stamp.subtitle': 'เก็บสแตมป์ตามจุดต่างๆ เพื่อรับของที่ระลึก',
    'stamp.progress': 'ความคืบหน้า',
    'stamp.collected': 'สะสมแล้ว',
    'stamp.unit': 'ดวง',
    'stamp.explorer': 'นักสำรวจ',
    'stamp.reach_chamoung': '(ไปถึงฐานชะมวง)',
    'stamp.conqueror': 'ผู้พิชิต',
    'stamp.reach_payom': '(ไปถึงฐานพะยอม)',
    'stamp.conservationist': 'นักอนุรักษ์',
    'stamp.quiz': '(ตอบคำถามถูกต้อง)',
    'stamp.reader': 'นักอ่าน',
    'stamp.read_info': '(เปิดดูข้อมูล 3 จุด)',
    'stamp.congrats': 'ยินดีด้วย! คุณสะสมสแตมป์ครบแล้ว',
    'stamp.modal_subtitle': 'เก็บสแตมป์ให้ครบระหว่างล่องเรือ!',
    'stamp.quiz_error': 'ทำภารกิจในหน้าแผนที่นะ!',
    'stamp.read_info_map': '({count}/3 จุด)',
    'stamp.read_info_short': '(เปิดดู 3 จุด)',
    
    // Trip Summary Page
    'summary.title': 'สิ้นสุดการเดินทาง',
    'summary.route_completed': 'เส้นทางที่สำเร็จ',
    'summary.time_spent': 'เวลาที่ใช้ไป',
    'summary.minutes': 'นาที',
    'summary.distance_est': 'ระยะทางประมาณ',
    'summary.stamps_collected': 'สแตมป์ที่เก็บได้',
    'summary.share': 'แชร์ความประทับใจ',
    'summary.return_home': 'กลับสู่หน้าหลัก',
    
    // Routes
    'route.nature': 'เส้นทางชมธรรมชาติ',
    'route.special': 'เส้นทางพิเศษ',
    'route.kayak_yellow': 'คายัค (สีเหลือง)',
    'route.kayak_green': 'คายัค (สีเขียว)',
    'route.kayak_red': 'คายัค (สีแดง)',
    'route.kayak_purple': 'คายัค (สีม่วง)',
    'route.motorboat_white': 'เรือยนต์ (สีขาว)',
    'route.motorboat_blue': 'เรือยนต์ (สีฟ้า)'
  },
  en: {
    // Bottom Nav
    'nav.services': 'Services',
    'nav.home': 'Home',
    'nav.others': 'Settings',
    
    // Settings Page
    'settings.title': 'Settings & More',
    'settings.subtitle': 'Manage your account and support',
    'settings.contact': 'Contact Staff',
    'settings.contact_desc': 'Call for inquiries or assistance',
    'settings.rate': 'Rate Us',
    'settings.rate_desc': 'Give feedback to improve our service',
    'settings.language': 'Change Language',
    'settings.current_lang': 'Current: English',
    'settings.logout': 'Logout',
    'settings.close': 'Close',
    'settings.submit': 'Submit Rating',
    
    // Home Page
    'home.welcome': 'Welcome',
    'home.enjoy': 'Enjoy your boat tour',
    'home.hello': 'Hello,',
    'home.explorer': 'Nature Explorer',
    'home.route': 'Boat Routes Map',
    'home.places': 'Recommended Places',
    'home.points': 'Stamp Points',
    'home.recommend': 'Recommended Highlights',
    'home.see_all': 'See All',
    'home.distance': 'Distance',
    'home.km': 'km',
    
    // Services Page
    'services.title': 'Information Services',
    'services.subtitle': 'Information and facilities for tourists',
    'services.pricing': 'Boat Pricing',
    'services.kayak': 'Kayak (Self-paddling)',
    'services.motorboat': 'Motorboat (with driver)',
    'services.per_boat': '/boat',
    'services.facilities': 'On-shore Facilities',
    'services.cafe': 'Cafe & Beverages',
    'services.toilet': 'Clean Toilets',
    'services.parking': 'Spacious Parking',
    'services.ticket': 'Ticket Office',
    'services.safety': 'Safety Guidelines',
    'services.rule1': 'Wear a life jacket at all times while on the boat.',
    'services.rule2': 'Do not stand or rock the kayak to prevent capsizing.',
    'services.rule3': 'Do not litter in the lake or destroy flora along the route.',
    'services.rule4': 'In case of emergency, press the SOS button on the map.',
    
    // POIs
    'poi.ฐานชะมวง': 'Chamoung Base',
    'poi.ฐานพะยอม': 'Payom Base',
    'poi.ป่าเสม็ด': 'Paper Bark Forest',
    'poi.จุดชมวิวพิเศษ': 'Special Viewpoint',
    'poi.จุดชมวิว 1': 'Viewpoint 1',
    'poi.จุดชมวิว 2': 'Viewpoint 2',
    
    // Places Page
    'places.title': 'Recommended Places',
    'places.subtitle': 'Choose interesting places on your route',
    'places.navigate': 'Navigate',
    
    // Stamp Page
    'stamp.title': 'Stamp Collection',
    'stamp.subtitle': 'Collect stamps at checkpoints to get a souvenir',
    'stamp.progress': 'Progress',
    'stamp.collected': 'Collected',
    'stamp.unit': 'stamps',
    'stamp.explorer': 'Explorer',
    'stamp.reach_chamoung': '(Reach Chamoung Base)',
    'stamp.conqueror': 'Conqueror',
    'stamp.reach_payom': '(Reach Payom Base)',
    'stamp.conservationist': 'Conservationist',
    'stamp.quiz': '(Answer Quiz Correctly)',
    'stamp.reader': 'Reader',
    'stamp.read_info': '(Read info of 3 places)',
    'stamp.congrats': 'Congratulations! You have collected all stamps.',
    'stamp.modal_subtitle': 'Collect all stamps during your trip!',
    'stamp.quiz_error': 'Do this quest on the Map page!',
    'stamp.read_info_map': '({count}/3 places)',
    'stamp.read_info_short': '(Read 3 places)',
    
    // Trip Summary Page
    'summary.title': 'Trip Completed',
    'summary.route_completed': 'Completed Route',
    'summary.time_spent': 'Time Spent',
    'summary.minutes': 'mins',
    'summary.distance_est': 'Est. Distance',
    'summary.stamps_collected': 'Stamps Collected',
    'summary.share': 'Share Your Trip',
    'summary.return_home': 'Return to Home',
    
    // Routes
    'route.nature': 'Nature Route',
    'route.special': 'Special Route',
    'route.kayak_yellow': 'Kayak (Yellow)',
    'route.kayak_green': 'Kayak (Green)',
    'route.kayak_red': 'Kayak (Red)',
    'route.kayak_purple': 'Kayak (Purple)',
    'route.motorboat_white': 'Motorboat (White)',
    'route.motorboat_blue': 'Motorboat (Blue)'
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>('th');

  useEffect(() => {
    const savedLang = localStorage.getItem('appLanguage') as Language;
    if (savedLang && (savedLang === 'th' || savedLang === 'en')) {
      setLanguageState(savedLang);
    }
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('appLanguage', lang);
  };

  const t = (key: string): string => {
    // Fallback simple string matching if exact match exists
    if (translations[language][key as keyof typeof translations['th']]) {
      return translations[language][key as keyof typeof translations['th']];
    }
    
    return key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
