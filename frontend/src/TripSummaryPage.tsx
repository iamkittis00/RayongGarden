import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Share2, Home, MapPin, Clock, Award, CheckCircle2, Ticket, Trophy, Sailboat, Ship } from 'lucide-react';
import html2canvas from 'html2canvas-pro';
import { useLanguage } from './contexts/LanguageContext';

export default function TripSummaryPage() {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const [stats, setStats] = useState({
    durationMins: 0,
    distanceKm: 0,
    stampsCount: 0,
    routeKey: 'route.special'
  });
  
  const [isCapturing, setIsCapturing] = useState(false);

  useEffect(() => {
    // 1. Load Data
    const startTimeStr = localStorage.getItem('trip_start_time');
    const routeId = localStorage.getItem('trip_route') || '';
    const stampsStr = localStorage.getItem('user_stamps');

    // 2. Calculate Duration
    let duration = 0;
    if (startTimeStr) {
      const startMs = parseInt(startTimeStr, 10);
      const diffMs = Date.now() - startMs;
      duration = Math.max(1, Math.floor(diffMs / 60000)); // อย่างน้อย 1 นาที
    }

    // 3. Distance Estimation
    let distance = 1.5;
    let routeKey = 'route.nature';
    if (routeId.includes('kayak_yellow')) { distance = 2.2; routeKey = 'route.kayak_yellow'; }
    else if (routeId.includes('kayak_green')) { distance = 1.8; routeKey = 'route.kayak_green'; }
    else if (routeId.includes('kayak_red')) { distance = 2.5; routeKey = 'route.kayak_red'; }
    else if (routeId.includes('kayak_purple')) { distance = 3.0; routeKey = 'route.kayak_purple'; }
    else if (routeId.includes('motorboat_white')) { distance = 4.5; routeKey = 'route.motorboat_white'; }
    else if (routeId.includes('motorboat_blue')) { distance = 3.8; routeKey = 'route.motorboat_blue'; }

    // 4. Stamps Count
    let stampsEarned = 0;
    if (stampsStr) {
      try {
        const stampsObj = JSON.parse(stampsStr);
        stampsEarned = Object.values(stampsObj).filter(Boolean).length;
      } catch (e) {
        console.error(e);
      }
    }

    setStats({
      durationMins: duration,
      distanceKm: distance,
      stampsCount: stampsEarned,
      routeKey: routeKey
    });
  }, []);

  const handleFinish = () => {
    // Clear trip session (keep stamps for now so they can see them in main menu)
    localStorage.removeItem('trip_start_time');
    localStorage.removeItem('trip_route');
    navigate('/TouristPage');
  };

  const handleShare = async () => {
    setIsCapturing(true);
    const element = document.getElementById('summary-card');
    if (element) {
      try {
        const canvas = await html2canvas(element as HTMLElement, { 
          scale: 2, 
          useCORS: true,
          backgroundColor: '#F4F9FF' 
        });
        const dataUrl = canvas.toDataURL('image/png');
        
        // Mock download/share
        const link = document.createElement('a');
        link.href = dataUrl;
        link.download = 'rayong-trip-summary.png';
        link.click();
        
      } catch (err) {
        console.error("Error capturing image:", err);
      }
    }
    setIsCapturing(false);
  };

  const touristName = localStorage.getItem('tourist_name') || 'นักท่องเที่ยว';

  return (
    <div className="min-h-dvh bg-[#F4F9FF] font-sans flex justify-center md:bg-slate-100 relative overflow-hidden">
      
      {/* Decorative Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <div className="absolute -top-10 -left-10 w-64 h-64 bg-blue-300/40 rounded-full mix-blend-multiply filter blur-[70px]"></div>
        <div className="absolute top-40 -right-20 w-72 h-72 bg-teal-200/40 rounded-full mix-blend-multiply filter blur-[70px]"></div>
        <div className="absolute bottom-20 left-1/4 w-80 h-80 bg-orange-200/30 rounded-full mix-blend-multiply filter blur-[80px]"></div>
      </div>

      <div className="w-full md:max-w-md bg-[#F4F9FF] md:bg-transparent min-h-dvh relative flex flex-col items-center justify-center p-6 z-10 md:border-x md:border-slate-200 md:shadow-2xl">
        
        <div className="w-full flex items-center justify-center gap-3 mb-8">
          <Trophy size={28} className="text-blue-600 drop-shadow-sm" strokeWidth={2.5} />
          <h1 className="text-slate-800 text-3xl font-black tracking-tight drop-shadow-sm">
            {t('summary.title')}
          </h1>
        </div>

        {/* The Card to be captured */}
        <div id="summary-card" className="w-full bg-white/90 backdrop-blur-xl rounded-[2.5rem] p-8 shadow-[0_20px_60px_rgba(37,99,235,0.1)] relative overflow-hidden mb-10 border-2 border-white">
          {/* Card Decor */}
          <div className="absolute top-0 left-0 w-full h-36 bg-gradient-to-br from-blue-500 to-blue-700 rounded-t-[2rem] shadow-inner"></div>
          <div className="absolute top-10 right-10 w-24 h-24 bg-white/10 rounded-full blur-xl mix-blend-overlay"></div>
          
          <div className="relative z-10 text-center mb-8 pt-6">
            <div className="w-24 h-24 bg-white rounded-full mx-auto mb-5 p-1 shadow-[0_8px_25px_rgba(0,0,0,0.1)] flex items-center justify-center relative">
              <div className="w-full h-full bg-blue-50 rounded-full flex items-center justify-center border-[3px] border-dashed border-blue-200">
                {stats.routeKey.includes('kayak') ? <Sailboat size={36} className="text-blue-500" strokeWidth={2} /> : <Ship size={36} className="text-blue-500" strokeWidth={2} />}
              </div>
            </div>
            <h2 className="text-2xl font-black text-black drop-shadow-md tracking-wide">{touristName}</h2>
            <p className="font-bold text-black text-[11px] mt-2 bg-black/20 inline-block px-4 py-1.5 rounded-full backdrop-blur-md uppercase tracking-widest border border-white/10">
              {t('home.explorer')}
            </p>
          </div>

          <div className="bg-white rounded-[2rem] p-6 shadow-sm border border-slate-100 relative mt-2">
            
            {/* Watermark Logo */}
            <div className="absolute inset-0 flex items-center justify-center opacity-[0.02] pointer-events-none">
              <Award size={180} />
            </div>

            <div className="text-center mb-6">
              <h3 className="text-slate-400 text-[10px] font-extrabold tracking-widest uppercase mb-1">{t('summary.route_completed')}</h3>
              <p className="text-lg font-black text-slate-800">{t(stats.routeKey)}</p>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-6 relative z-10">
              <div className="bg-[#F4F9FF] p-4 rounded-2xl flex flex-col items-center border border-blue-50">
                <Clock size={24} className="text-blue-500 mb-2" strokeWidth={2.5} />
                <span className="text-2xl font-black text-slate-800">{stats.durationMins}<span className="text-[11px] font-bold text-slate-400 ml-1">{t('summary.minutes')}</span></span>
                <span className="text-[10px] text-slate-500 font-bold mt-0.5">{t('summary.time_spent')}</span>
              </div>
              <div className="bg-teal-50 p-4 rounded-2xl flex flex-col items-center border border-teal-100/50">
                <MapPin size={24} className="text-teal-600 mb-2" strokeWidth={2.5} />
                <span className="text-2xl font-black text-slate-800">{stats.distanceKm}<span className="text-[11px] font-bold text-slate-400 ml-1">{t('home.km')}</span></span>
                <span className="text-[10px] text-slate-500 font-bold mt-0.5">{t('summary.distance_est')}</span>
              </div>
            </div>

            <div className="bg-orange-50/80 border border-orange-100 p-5 rounded-3xl flex flex-col items-center text-center gap-4 relative z-10">
              <div>
                <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600 mx-auto mb-2 shadow-inner border border-emerald-200">
                  <Ticket size={22} strokeWidth={2.5} />
                </div>
                <h4 className="text-slate-800 font-extrabold text-sm leading-tight">{t('summary.stamps_collected')}</h4>
                <div className="mt-1.5">
                  <span className="text-orange-600 text-[10px] font-black bg-orange-100 px-3 py-1 rounded-full border border-orange-200">
                    {stats.stampsCount}/4 {t('stamp.unit')}
                  </span>
                </div>
              </div>
              <div className="flex items-center justify-center gap-3 w-full bg-white/60 p-3 rounded-2xl border border-orange-100/50 shadow-sm">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="relative">
                    {i <= stats.stampsCount ? (
                      <CheckCircle2 size={18} className="text-emerald-500 absolute -bottom-1 -right-1 z-10 bg-white rounded-full" />
                    ) : null}
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${i <= stats.stampsCount ? 'bg-emerald-50 border-2 border-emerald-200 shadow-sm' : 'bg-slate-50 border-2 border-slate-100'}`}>
                      <Ticket size={16} className={i <= stats.stampsCount ? 'text-emerald-500' : 'text-slate-300'} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          <div className="text-center mt-6">
            <p className="text-slate-400 text-[10px] font-extrabold uppercase tracking-[0.2em]">Rayong Botanic Garden</p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="w-full flex flex-col gap-3 px-1 z-10">
          <button 
            onClick={handleShare}
            disabled={isCapturing}
            className="w-full mb-3 bg-gradient-to-tr from-blue-600 to-blue-500 text-white font-bold py-4 rounded-2xl flex items-center justify-center gap-2 active:scale-95 transition-all shadow-md shadow-blue-500/20 disabled:opacity-70 disabled:active:scale-100"
          >
            {isCapturing ? (
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
            ) : (
              <Share2 size={20} strokeWidth={2.5} />
            )}
            {t('summary.share')}
          </button>
          
          <button 
            onClick={handleFinish}
            className="w-full bg-white text-slate-600 font-bold py-4 rounded-2xl flex items-center justify-center gap-2 active:scale-95 transition-all shadow-sm border border-slate-100 hover:bg-slate-50"
          >
            <Home size={20} strokeWidth={2.5} className="text-slate-400" />
            {t('summary.return_home')}
          </button>
        </div>

      </div>
    </div>
  );
}
