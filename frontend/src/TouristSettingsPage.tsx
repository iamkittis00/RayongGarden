import { useState } from 'react';
import { PhoneCall, Star, Globe, LogOut, ChevronRight, X, CheckCircle2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import BottomNav from './components/BottomNav';
import { useLanguage } from './contexts/LanguageContext';

export default function TouristSettingsPage() {
  const navigate = useNavigate();
  const [showContactModal, setShowContactModal] = useState(false);
  const [showRatingModal, setShowRatingModal] = useState(false);
  const [ratingValue, setRatingValue] = useState(0);
  const [hoveredStar, setHoveredStar] = useState(0);
  const [toastMessage, setToastMessage] = useState('');
  const { language, setLanguage, t } = useLanguage();

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 3000);
  };

  const handleLogout = () => {
    localStorage.removeItem('touristName');
    localStorage.removeItem('touristPhone');
    localStorage.removeItem('stampCount');
    localStorage.removeItem('stamps');
    localStorage.removeItem('trip_start_time');
    localStorage.removeItem('trip_route');
    navigate('/tourist-login');
  };

  return (
    <div className="min-h-screen bg-[#F4F9FF] font-sans flex justify-center md:bg-slate-100">
      <div className="w-full md:max-w-md bg-[#F4F9FF] min-h-screen relative flex flex-col md:border-x md:border-slate-200 md:shadow-2xl overflow-y-auto pb-32">
        
        {/* Header */}
        <div className="bg-gradient-to-br from-slate-800 to-slate-900 px-8 pt-16 pb-12 rounded-b-[2.5rem] shadow-lg relative overflow-hidden">
          <div className="absolute top-0 right-0 w-40 h-40 bg-white/5 rounded-full blur-2xl"></div>
          <h1 className="text-3xl font-black text-white tracking-tight relative z-10 drop-shadow-md">{t('settings.title')}</h1>
          <p className="text-slate-300 mt-2 font-medium relative z-10 text-sm">{t('settings.subtitle')}</p>
        </div>

        {/* Content */}
        <div className="px-6 -mt-6 relative z-20 flex flex-col gap-4">
          
          {/* Action Menu Group 1 */}
          <div className="bg-white rounded-[2rem] shadow-[0_10px_30px_rgba(0,0,0,0.05)] border border-slate-100 overflow-hidden">
            <button onClick={() => setShowContactModal(true)} className="w-full flex items-center justify-between p-5 border-b border-slate-100 active:bg-slate-50 transition-colors">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-500">
                  <PhoneCall size={18} strokeWidth={2.5} />
                </div>
                <div className="text-left">
                  <div className="font-bold text-slate-800">{t('settings.contact')}</div>
                  <div className="text-xs font-medium text-slate-400">{t('settings.contact_desc')}</div>
                </div>
              </div>
              <ChevronRight size={20} className="text-slate-300" />
            </button>
            
            <button onClick={() => setShowRatingModal(true)} className="w-full flex items-center justify-between p-5 active:bg-slate-50 transition-colors">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-yellow-50 flex items-center justify-center text-yellow-500">
                  <Star size={18} strokeWidth={2.5} />
                </div>
                <div className="text-left">
                  <div className="font-bold text-slate-800">{t('settings.rate')}</div>
                  <div className="text-xs font-medium text-slate-400">{t('settings.rate_desc')}</div>
                </div>
              </div>
              <ChevronRight size={20} className="text-slate-300" />
            </button>
          </div>

          {/* Action Menu Group 2 */}
          <div className="bg-white rounded-[2rem] shadow-[0_10px_30px_rgba(0,0,0,0.05)] border border-slate-100 overflow-hidden mt-2">
            <button 
              onClick={() => {
                setLanguage(language === 'th' ? 'en' : 'th');
                showToast(language === 'th' ? 'Language changed to English' : 'เปลี่ยนเป็นภาษาไทยเรียบร้อยแล้ว');
              }}
              className="w-full flex items-center justify-between p-5 active:bg-slate-50 transition-colors"
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-500">
                  <Globe size={18} strokeWidth={2.5} />
                </div>
                <div className="text-left">
                  <div className="font-bold text-slate-800">{t('settings.language')}</div>
                  <div className="text-xs font-medium text-slate-400">{t('settings.current_lang')}</div>
                </div>
              </div>
              <ChevronRight size={20} className="text-slate-300" />
            </button>
          </div>

          {/* Logout */}
          <button 
            onClick={handleLogout}
            className="w-full mt-6 flex items-center justify-center gap-2 py-4 bg-red-50 text-red-500 font-bold rounded-2xl active:bg-red-100 transition-colors border border-red-100"
          >
            <LogOut size={18} strokeWidth={2.5} />
            {t('settings.logout')}
          </button>

        </div>

        {/* Contact Modal */}
        {showContactModal && (
          <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-[60] flex items-center justify-center p-6 animate-in fade-in duration-200">
            <div className="bg-white w-full max-w-sm rounded-[2rem] p-6 shadow-2xl relative animate-in zoom-in-95 duration-200">
              <button onClick={() => setShowContactModal(false)} className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600 active:scale-90 transition-transform">
                <X size={20} />
              </button>
              
              <div className="w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4 text-blue-600">
                <PhoneCall size={28} />
              </div>
              <h3 className="text-xl font-bold text-center text-slate-800 mb-2">{t('settings.contact')}</h3>
              <p className="text-center text-sm text-slate-500 mb-6">{t('settings.contact_desc')}</p>
              
              <div className="space-y-3 mb-6">
                <a href="tel:038-111-222" className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100 active:bg-blue-50 transition-colors">
                  <div className="font-bold text-slate-700">สำนักงานสวนฯ</div>
                  <div className="text-blue-600 font-black">038-111-222</div>
                </a>
                <a href="tel:089-999-8888" className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100 active:bg-red-50 transition-colors">
                  <div className="font-bold text-slate-700">หน่วยกู้ภัยทางน้ำ</div>
                  <div className="text-red-500 font-black">089-999-8888</div>
                </a>
              </div>
              
              <button onClick={() => setShowContactModal(false)} className="w-full py-4 bg-slate-100 text-slate-700 font-bold rounded-2xl active:bg-slate-200 transition-colors">
                {t('settings.close')}
              </button>
            </div>
          </div>
        )}

        {/* Rating Modal */}
        {showRatingModal && (
          <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-[60] flex items-center justify-center p-6 animate-in fade-in duration-200">
            <div className="bg-white w-full max-w-sm rounded-[2rem] p-6 shadow-2xl relative animate-in zoom-in-95 duration-200">
              <button onClick={() => setShowRatingModal(false)} className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600 active:scale-90 transition-transform">
                <X size={20} />
              </button>
              
              <div className="w-14 h-14 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4 text-yellow-500">
                <Star size={28} fill="currentColor" />
              </div>
              <h3 className="text-xl font-bold text-center text-slate-800 mb-2">{t('settings.rate')}</h3>
              <p className="text-center text-sm text-slate-500 mb-6">{t('settings.rate_desc')}</p>
              
              <div className="flex justify-center gap-2 mb-8">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button 
                    key={star}
                    onClick={() => setRatingValue(star)}
                    onMouseEnter={() => setHoveredStar(star)}
                    onMouseLeave={() => setHoveredStar(0)}
                    className="p-1 outline-none transition-transform active:scale-90 hover:scale-110"
                  >
                    <Star 
                      size={40} 
                      className={`transition-colors ${star <= (hoveredStar || ratingValue) ? 'text-yellow-400' : 'text-slate-200'}`} 
                      fill={star <= (hoveredStar || ratingValue) ? 'currentColor' : 'none'} 
                    />
                  </button>
                ))}
              </div>
              
              <button 
                onClick={() => {
                  setShowRatingModal(false);
                  showToast(language === 'th' ? 'ขอบคุณสำหรับคะแนนประเมินของคุณ!' : 'Thank you for your rating!');
                  setTimeout(() => setRatingValue(0), 500);
                }} 
                disabled={ratingValue === 0}
                className={`w-full py-4 font-bold rounded-2xl transition-all shadow-md ${ratingValue > 0 ? 'bg-blue-600 text-white active:scale-95 shadow-blue-600/30' : 'bg-slate-100 text-slate-400 cursor-not-allowed shadow-none'}`}
              >
                {t('settings.submit')}
              </button>
            </div>
          </div>
        )}

        {/* Toast Notification */}
        {toastMessage && (
          <div className="fixed top-6 left-1/2 -translate-x-1/2 z-[70] bg-slate-800 text-white px-5 py-3 rounded-full shadow-lg flex items-center gap-2 animate-in slide-in-from-top-4 fade-in duration-300">
            <CheckCircle2 size={18} className="text-emerald-400" />
            <span className="text-sm font-medium">{toastMessage}</span>
          </div>
        )}

        <BottomNav activeTab="others" />
      </div>
    </div>
  );
}
