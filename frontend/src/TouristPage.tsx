import { Map, Bookmark, Ticket } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import BottomNav from './components/BottomNav';
import { useLanguage } from './contexts/LanguageContext';

export default function TouristMainPage() {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const touristName = localStorage.getItem('tourist_name') || 'นักท่องเที่ยว';
  
  return (
    <div className="min-h-screen bg-[#F4F9FF] font-sans flex justify-center md:bg-slate-100">
      {/* Mobile Simulator Container */}
      <div className="w-full md:max-w-md bg-[#F4F9FF] min-h-screen relative flex flex-col overflow-x-hidden md:border-x md:border-slate-200 md:shadow-2xl">
      
      {/* Decorative Background Elements (ทำพื้นหลังให้มีมิติแบบ Glassmorphism) */}
      <div className="absolute top-0 left-0 w-full h-96 overflow-hidden pointer-events-none">
        <div className="absolute -top-10 -left-10 w-56 h-56 bg-blue-300/40 rounded-full mix-blend-multiply filter blur-[60px]"></div>
        <div className="absolute top-20 -right-20 w-64 h-64 bg-teal-200/40 rounded-full mix-blend-multiply filter blur-[60px]"></div>
        <div className="absolute top-40 left-1/4 w-40 h-40 bg-orange-200/30 rounded-full mix-blend-multiply filter blur-[50px]"></div>
      </div>

      {/* ส่วนหัว (Header) */}
      <div className="pt-10 px-8 flex-shrink-0 relative z-10">
        <h1 className="text-4xl font-extrabold text-slate-800 mb-2 tracking-tight">{t('home.welcome')}</h1>
        <p className="text-slate-600 font-semibold text-lg mb-1">{t('home.enjoy')}</p>
        <p className="text-sm text-slate-400 font-medium">{t('home.hello')} {touristName}</p>
      </div>

      {/* 3 ปุ่มหลัก (Quick Actions) */}
      <div className="grid grid-cols-3 gap-3 px-5 mt-8 flex-shrink-0 relative z-10 w-full">
        {/* ปุ่ม 1: แผนที่ */}
        <button onClick={() => navigate('/map')} className="outline-none focus:outline-none bg-white/60 backdrop-blur-xl border border-white shadow-[0_8px_20px_rgba(37,99,235,0.08)] p-3 flex flex-col items-center justify-center aspect-square active:scale-90 active:shadow-inner transition-all duration-200 rounded-[1.2rem]">
          <div className="bg-gradient-to-br from-blue-400 to-blue-600 text-white rounded-2xl p-3.5 mb-3 shadow-md">
            <Map size={28} strokeWidth={2.5} />
          </div>
          <span className="text-[11.5px] font-extrabold text-slate-700 text-center leading-tight whitespace-pre-wrap">{t('home.route')}</span>
        </button>

        {/* ปุ่ม 2: สถานที่แนะนำ */}
        <button onClick={() => navigate('/places')} className="outline-none focus:outline-none bg-white/60 backdrop-blur-xl border border-white shadow-[0_8px_20px_rgba(249,115,22,0.08)] p-3 flex flex-col items-center justify-center aspect-square active:scale-90 active:shadow-inner transition-all duration-200 rounded-[1.2rem]">
          <div className="bg-gradient-to-br from-orange-400 to-orange-600 text-white rounded-2xl p-3.5 mb-3 shadow-md">
            <Bookmark size={28} strokeWidth={2.5} />
          </div>
          <span className="text-[11.5px] font-extrabold text-slate-700 text-center leading-tight whitespace-pre-wrap">{t('home.places')}</span>
        </button>

        {/* ปุ่ม 3: คะแนนสะสม */}
        <button onClick={() => navigate('/collection')} className="outline-none focus:outline-none bg-white/60 backdrop-blur-xl border border-white shadow-[0_8px_20px_rgba(34,197,94,0.08)] p-3 flex flex-col items-center justify-center aspect-square active:scale-90 active:shadow-inner transition-all duration-200 rounded-[1.2rem]">
          <div className="bg-gradient-to-br from-green-400 to-green-600 text-white rounded-2xl p-3.5 mb-3 shadow-md">
            <Ticket size={28} strokeWidth={2.5} />
          </div>
          <span className="text-[11.5px] font-extrabold text-slate-700 text-center leading-tight whitespace-pre-wrap">{t('home.points')}</span>
        </button>
      </div>

      {/* ส่วนแนะนำจุดเที่ยว */}
      {/* ใช้ flex-grow ให้เต็มจอพอดี ไม่เหลือขอบขาวเยอะเกินไปด้านล่าง */}
      <div className="bg-white mt-10 rounded-t-[3rem] flex-grow px-8 pt-10 pb-36 shadow-[0_-10px_40px_rgba(0,0,0,0.04)]">
        <div className="flex justify-between items-end mb-6">
          <h2 className="text-2xl font-bold text-gray-900 tracking-tight">{t('home.recommend')}</h2>
          <button onClick={() => navigate('/places')} className="outline-none focus:outline-none text-sm font-bold text-blue-500 hover:text-blue-700 transition-colors active:scale-95">{t('home.see_all')}</button>
        </div>
        
        {/* Grid Container */}
        <div className="grid grid-cols-2 gap-4 pb-4">
          
          {/* การ์ดที่ 1 */}
          <div className="w-full relative rounded-[2rem] overflow-hidden aspect-[4/5] shadow-md cursor-pointer active:scale-95 transition-transform duration-200">
            <img src="/nature_scenic.png" alt="ฐานชะมวง" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-90"></div>
            <div className="absolute bottom-4 left-4 right-4">
              <span className="text-white font-bold text-base block mb-1">{t('poi.ฐานชะมวง')}</span>
              <span className="text-white/80 text-[10px] flex items-center gap-1"><Map size={12}/> {t('home.distance')} 1.2 {t('home.km')}</span>
            </div>
          </div>

          {/* การ์ดที่ 2 */}
          <div className="w-full relative rounded-[2rem] overflow-hidden aspect-[4/5] shadow-md cursor-pointer active:scale-95 transition-transform duration-200">
            <img src="/nature_lake.png" alt="ฐานพะยอม" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-90"></div>
            <div className="absolute bottom-4 left-4 right-4">
              <span className="text-white font-bold text-base block mb-1">{t('poi.ฐานพะยอม')}</span>
              <span className="text-white/80 text-[10px] flex items-center gap-1"><Map size={12}/> {t('home.distance')} 2.5 {t('home.km')}</span>
            </div>
          </div>

          {/* การ์ดที่ 3 */}
          <div className="w-full relative rounded-[2rem] overflow-hidden aspect-[4/5] shadow-md cursor-pointer active:scale-95 transition-transform duration-200">
            <img src="/nature_mangrove.png" alt="ป่าเสม็ดดึกดำบรรพ์" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-90"></div>
            <div className="absolute bottom-4 left-4 right-4">
              <span className="text-white font-bold text-base block mb-1">{t('poi.ป่าเสม็ด')}</span>
              <span className="text-white/80 text-[10px] flex items-center gap-1"><Map size={12}/> {t('home.distance')} 3.8 {t('home.km')}</span>
            </div>
          </div>

          {/* การ์ดที่ 4 (รูปใหม่) */}
          <div className="w-full relative rounded-[2rem] overflow-hidden aspect-[4/5] shadow-md cursor-pointer active:scale-95 transition-transform duration-200">
            <img src="/rayong_promo.jpg" alt="จุดชมวิวพิเศษ" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-90"></div>
            <div className="absolute bottom-4 left-4 right-4">
              <span className="text-white font-bold text-base block mb-1">{t('poi.จุดชมวิวพิเศษ')}</span>
              <span className="text-white/80 text-[10px] flex items-center gap-1"><Map size={12}/> {t('home.distance')} 4.2 {t('home.km')}</span>
            </div>
          </div>

        </div>
      </div>

      {/* Bottom Navigation */}
      <BottomNav activeTab="home" />
      {/* End Mobile Container */}
      </div>
    </div>
  )
}
