import { useState } from 'react';
import { X, MapPin, HelpCircle, BookOpen, Award } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

interface StampsState {
  spot102: boolean;
  spot103: boolean;
  quiz: boolean;
  readComplete: boolean;
}

interface StampBookModalProps {
  stamps: StampsState;
  readCount?: number;
  onClose: () => void;
  onOpenQuiz?: () => void;
  isMapPage?: boolean;
}

export default function StampBookModal({ stamps, readCount = 0, onClose, onOpenQuiz, isMapPage = false }: StampBookModalProps) {
  const [showError, setShowError] = useState(false);
  const { t } = useLanguage();

  return (
    <div className="absolute inset-0 z-[110] bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-6 animate-in fade-in">
      <div className="bg-[#fdfaf6] p-6 rounded-[2rem] shadow-2xl w-full max-w-md relative overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-2xl font-black text-slate-800">{t('stamp.title')}</h2>
            <p className="text-slate-500 text-xs mt-1 font-medium">{t('stamp.modal_subtitle')}</p>
          </div>
          <button onClick={onClose} className="p-2 bg-slate-100 rounded-full text-slate-500 active:scale-95 transition-transform">
            <X size={20} />
          </button>
        </div>

        {/* Stamp Grid */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          {/* Stamp 1: Bridge */}
          <div className="aspect-square bg-white border-2 border-dashed border-slate-300 rounded-2xl flex flex-col items-center justify-center p-4 relative shadow-sm">
            {stamps.spot102 ? (
              <img src="/stamps/stamp_bridge.png" alt="Bridge Stamp" className="w-20 h-20 object-contain mb-2 transform -rotate-12 drop-shadow-md" />
            ) : (
              <div className="w-16 h-16 rounded-full bg-slate-100 mb-2 flex items-center justify-center">
                <MapPin size={24} className="text-slate-300" />
              </div>
            )}
            <span className="text-[11px] font-bold text-center text-slate-600 leading-tight">{t('stamp.explorer')}<br/>{t('stamp.reach_chamoung')}</span>
          </div>

          {/* Stamp 2: Tree */}
          <div className="aspect-square bg-white border-2 border-dashed border-slate-300 rounded-2xl flex flex-col items-center justify-center p-4 relative shadow-sm">
            {stamps.spot103 ? (
              <img src="/stamps/stamp_tree.png" alt="Tree Stamp" className="w-20 h-20 object-contain mb-2 transform rotate-6 drop-shadow-md" />
            ) : (
              <div className="w-16 h-16 rounded-full bg-slate-100 mb-2 flex items-center justify-center">
                <MapPin size={24} className="text-slate-300" />
              </div>
            )}
            <span className="text-[11px] font-bold text-center text-slate-600 leading-tight">{t('stamp.conqueror')}<br/>{t('stamp.reach_payom')}</span>
          </div>

          {/* Stamp 3: Quiz */}
          <div className="aspect-square bg-white border-2 border-dashed border-slate-300 rounded-2xl flex flex-col items-center justify-center p-4 relative shadow-sm">
            {stamps.quiz ? (
              <img src="/stamps/stamp_quiz.png" alt="Quiz Stamp" className="w-20 h-20 object-contain mb-2 transform -rotate-6 drop-shadow-md" />
            ) : (
              <div className="flex flex-col items-center relative">
                <button 
                  onClick={() => {
                    if (isMapPage && onOpenQuiz) {
                      onClose();
                      onOpenQuiz();
                    } else if (!isMapPage) {
                      setShowError(true);
                      setTimeout(() => setShowError(false), 3000);
                    }
                  }}
                  className="w-16 h-16 rounded-full bg-pink-100 mb-2 flex items-center justify-center text-pink-500 hover:scale-105 active:scale-95 transition-transform cursor-pointer shadow-inner relative"
                >
                  <HelpCircle size={28} />
                </button>
                {showError && (
                  <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-40 bg-slate-800 text-white text-[11px] p-2 rounded-lg text-center animate-in fade-in z-10 shadow-lg">
                    {t('stamp.quiz_error')}
                    <div className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[6px] border-t-slate-800"></div>
                  </div>
                )}
              </div>
            )}
            <span className="text-[11px] font-bold text-center text-slate-600 leading-tight">{t('stamp.conservationist')}<br/>{t('stamp.quiz')}</span>
          </div>

          {/* Stamp 4: Engagement */}
          <div className="aspect-square bg-white border-2 border-dashed border-slate-300 rounded-2xl flex flex-col items-center justify-center p-4 relative shadow-sm">
            {stamps.readComplete ? (
              <img src="/stamps/stamp_map.png" alt="Map Stamp" className="w-20 h-20 object-contain mb-2 transform rotate-12 drop-shadow-md" />
            ) : (
              <div className="w-16 h-16 rounded-full bg-slate-100 mb-2 flex items-center justify-center">
                <BookOpen size={24} className="text-slate-300" />
              </div>
            )}
            <span className="text-[11px] font-bold text-center text-slate-600 leading-tight">{t('stamp.reader')}<br/>{isMapPage ? t('stamp.read_info_map').replace('{count}', readCount.toString()) : t('stamp.read_info_short')}</span>
          </div>
        </div>

        {Object.values(stamps).every(Boolean) && (
          <div className="bg-blue-50 border border-blue-200 text-blue-600 p-3 rounded-xl flex items-center justify-center gap-2 text-sm font-bold shadow-sm">
            <Award size={18} strokeWidth={2.5} />
            {t('stamp.congrats')}
          </div>
        )}
      </div>
    </div>
  );
}
