import { useState, useEffect } from 'react';
import { ArrowLeft, Navigation, Camera, BookOpen, Award, MapPin } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from './contexts/LanguageContext';

interface StampsState {
  spot102: boolean;
  spot103: boolean;
  quiz: boolean;
  readComplete: boolean;
}

export default function StampCollectionPage() {
  const navigate = useNavigate();
  const { t } = useLanguage();
  
  const [stamps, setStamps] = useState<StampsState>({
    spot102: false,
    spot103: false,
    quiz: false,
    readComplete: false
  });

  useEffect(() => {
    const savedStamps = localStorage.getItem('user_stamps');
    if (savedStamps) {
      try {
        setStamps(JSON.parse(savedStamps));
      } catch (e) {
        console.error("Failed to parse stamps", e);
      }
    }
  }, []);

  const completedCount = Object.values(stamps).filter(Boolean).length;

  return (
    <div className="min-h-dvh bg-[#F4F9FF] font-sans flex justify-center md:bg-slate-100">
      <div className="w-full md:max-w-md bg-[#F4F9FF] min-h-dvh relative flex flex-col md:border-x md:border-slate-200 md:shadow-2xl overflow-y-auto">
        
        {/* Header */}
        <div className="pt-12 px-6 pb-6 relative z-10 flex items-center gap-4 bg-white/80 backdrop-blur-md shadow-sm">
          <button 
            onClick={() => navigate(-1)} 
            className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center text-slate-700 active:scale-95 transition-transform"
          >
            <ArrowLeft size={20} strokeWidth={2.5} />
          </button>
          <div>
            <h1 className="text-2xl font-black text-slate-800">{t('stamp.title')}</h1>
            <p className="text-slate-500 text-xs mt-0.5 font-bold">{t('stamp.progress')}: {completedCount}/4 {t('stamp.unit')}</p>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 flex-1 flex flex-col">
          <div className="bg-orange-50 border border-orange-100 p-4 rounded-2xl mb-8">
            <p className="text-sm font-bold text-orange-700 leading-relaxed">
              ยินดีต้อนรับสู่สมุดสะสมสแตมป์! 
              ร่วมสนุกทำภารกิจระหว่างล่องเรือเพื่อสะสมให้ครบทั้ง 4 ดวง 
              (ภารกิจตอบคำถามสามารถทำได้ในหน้าแผนที่)
            </p>
          </div>

          {/* Stamp Grid */}
          <div className="grid grid-cols-2 gap-4 mb-8 flex-1">
            {/* Stamp 1: Bridge */}
            <div className="aspect-square bg-white border-2 border-dashed border-slate-300 rounded-3xl flex flex-col items-center justify-center p-4 relative shadow-sm">
              {stamps.spot102 ? (
                <img src="/stamps/stamp_bridge.png" alt="Bridge Stamp" className="w-24 h-24 object-contain mb-3 transform -rotate-12 drop-shadow-md" />
              ) : (
                <div className="w-20 h-20 rounded-full bg-slate-100 mb-3 flex items-center justify-center">
                  <Navigation size={32} className="text-slate-300" />
                </div>
              )}
              <span className="text-xs font-bold text-center text-slate-600 leading-tight">{t('stamp.explorer')}<br/>{t('stamp.reach_chamoung')}</span>
            </div>

            {/* Stamp 2: Tree */}
            <div className="aspect-square bg-white border-2 border-dashed border-slate-300 rounded-3xl flex flex-col items-center justify-center p-4 relative shadow-sm">
              {stamps.spot103 ? (
                <img src="/stamps/stamp_tree.png" alt="Tree Stamp" className="w-24 h-24 object-contain mb-3 transform rotate-6 drop-shadow-md" />
              ) : (
                <div className="w-20 h-20 rounded-full bg-slate-100 mb-3 flex items-center justify-center">
                  <MapPin size={32} className="text-slate-300" />
                </div>
              )}
              <span className="text-xs font-bold text-center text-slate-600 leading-tight">{t('stamp.conqueror')}<br/>{t('stamp.reach_payom')}</span>
            </div>

            {/* Stamp 3: Quiz */}
            <div className="aspect-square bg-white border-2 border-dashed border-slate-300 rounded-3xl flex flex-col items-center justify-center p-4 relative shadow-sm">
              {stamps.quiz ? (
                <img src="/stamps/stamp_quiz.png" alt="Quiz Stamp" className="w-24 h-24 object-contain mb-3 transform -rotate-6 drop-shadow-md" />
              ) : (
                <div className="w-20 h-20 rounded-full bg-pink-50 mb-3 flex items-center justify-center">
                  <Camera size={32} className="text-slate-300" />
                </div>
              )}
              <span className="text-xs font-bold text-center text-slate-600 leading-tight">{t('stamp.conservationist')}<br/>{t('stamp.quiz')}</span>
            </div>

            {/* Stamp 4: Engagement */}
            <div className="aspect-square bg-white border-2 border-dashed border-slate-300 rounded-3xl flex flex-col items-center justify-center p-4 relative shadow-sm">
              {stamps.readComplete ? (
                <img src="/stamps/stamp_map.png" alt="Map Stamp" className="w-24 h-24 object-contain mb-3 transform rotate-12 drop-shadow-md" />
              ) : (
                <div className="w-20 h-20 rounded-full bg-slate-100 mb-3 flex items-center justify-center">
                  <BookOpen size={32} className="text-slate-300" />
                </div>
              )}
              <span className="text-xs font-bold text-center text-slate-600 leading-tight">{t('stamp.reader')}<br/>{t('stamp.read_info')}</span>
            </div>
          </div>

          <div className="bg-white rounded-3xl p-5 shadow-sm border border-slate-100 mb-6 relative z-20">
            <div className="flex justify-between items-end mb-3">
              <span className="font-extrabold text-slate-700 text-sm">{t('stamp.progress')}</span>
              <span className="text-blue-600 font-black">{t('stamp.collected')} {completedCount}/4 {t('stamp.unit')}</span>
            </div>
            
            {/* Progress Bar */}
            <div className="w-full bg-slate-100 rounded-full h-3.5 mb-2 overflow-hidden shadow-inner">
              <div 
                className="bg-gradient-to-r from-blue-400 to-blue-600 h-3.5 rounded-full transition-all duration-1000 ease-out relative" 
                style={{ width: `${(completedCount / 4) * 100}%` }}
              >
                <div className="absolute inset-0 bg-white/20 bg-[length:10px_10px] bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.5)_25%,rgba(255,255,255,0.5)_50%,transparent_50%,transparent_75%,rgba(255,255,255,0.5)_75%,rgba(255,255,255,0.5)_100%)] animate-[progress_1s_linear_infinite]"></div>
              </div>
            </div>
          </div> 
          
          {completedCount === 4 && (
            <div className="bg-blue-50 border border-blue-200 text-blue-600 p-4 rounded-2xl flex items-center justify-center gap-2 text-base font-bold mt-auto mb-6 shadow-sm">
              <Award size={20} strokeWidth={2.5} />
              {t('stamp.congrats')}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
