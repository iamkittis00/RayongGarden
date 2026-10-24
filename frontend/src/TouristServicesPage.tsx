import { Anchor, ShieldAlert, Coffee, MapPin, CircleDollarSign, Car, Ticket, Bath } from 'lucide-react';
import BottomNav from './components/BottomNav';
import { useLanguage } from './contexts/LanguageContext';

export default function TouristServicesPage() {
  const { t } = useLanguage();
  
  return (
    <div className="min-h-screen bg-[#F4F9FF] font-sans flex justify-center md:bg-slate-100">
      <div className="w-full md:max-w-md bg-[#F4F9FF] min-h-screen relative flex flex-col md:border-x md:border-slate-200 md:shadow-2xl overflow-y-auto pb-32">
        
        {/* Header */}
        <div className="bg-gradient-to-br from-blue-600 to-blue-800 px-8 pt-16 pb-12 rounded-b-[2.5rem] shadow-lg relative overflow-hidden">
          <div className="absolute top-10 right-10 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
          <h1 className="text-3xl font-black text-white tracking-tight relative z-10 drop-shadow-md">{t('services.title')}</h1>
          <p className="text-blue-100 mt-2 font-medium relative z-10 text-sm">{t('services.subtitle')}</p>
        </div>

        {/* Content */}
        <div className="px-6 -mt-6 relative z-20 flex flex-col gap-5">
          
          {/* Section 1: Boat Pricing */}
          <div className="bg-white rounded-[2rem] p-6 shadow-[0_10px_30px_rgba(0,0,0,0.05)] border border-slate-100">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                <CircleDollarSign size={20} strokeWidth={2.5} />
              </div>
              <h2 className="text-lg font-bold text-slate-800">{t('services.pricing')}</h2>
            </div>
            
            <div className="flex flex-col gap-3">
              <div className="flex justify-between items-center p-4 bg-slate-50 rounded-2xl border border-slate-100">
                <div className="flex items-center gap-3">
                  <Anchor size={18} className="text-slate-400" />
                  <span className="font-bold text-slate-700">{t('services.kayak')}</span>
                </div>
                <span className="font-black text-blue-600 text-lg">1฿<span className="text-xs text-slate-400 font-medium">{t('services.per_boat')}</span></span>
              </div>
              
              <div className="flex justify-between items-center p-4 bg-slate-50 rounded-2xl border border-slate-100">
                <div className="flex items-center gap-3">
                  <Anchor size={18} className="text-slate-400" />
                  <span className="font-bold text-slate-700">{t('services.motorboat')}</span>
                </div>
                <span className="font-black text-blue-600 text-lg">1฿<span className="text-xs text-slate-400 font-medium">{t('services.per_boat')}</span></span>
              </div>
            </div>
          </div>

          {/* Section 2: Facilities */}
          <div className="bg-white rounded-[2rem] p-6 shadow-[0_10px_30px_rgba(0,0,0,0.05)] border border-slate-100">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center text-orange-600">
                <MapPin size={20} strokeWidth={2.5} />
              </div>
              <h2 className="text-lg font-bold text-slate-800">{t('services.facilities')}</h2>
            </div>
            
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-slate-50 p-4 rounded-2xl flex flex-col items-center justify-center text-center gap-2 border border-slate-100">
                <Coffee size={24} className="text-orange-400" />
                <span className="text-xs font-bold text-slate-600">{t('services.cafe')}</span>
              </div>
              <div className="bg-slate-50 p-4 rounded-2xl flex flex-col items-center justify-center text-center gap-2 border border-slate-100">
                <Bath size={24} className="text-blue-400" />
                <span className="text-xs font-bold text-slate-600">{t('services.toilet')}</span>
              </div>
              <div className="bg-slate-50 p-4 rounded-2xl flex flex-col items-center justify-center text-center gap-2 border border-slate-100">
                <Car size={24} className="text-red-400" />
                <span className="text-xs font-bold text-slate-600">{t('services.parking')}</span>
              </div>
              <div className="bg-slate-50 p-4 rounded-2xl flex flex-col items-center justify-center text-center gap-2 border border-slate-100">
                <Ticket size={24} className="text-pink-400" />
                <span className="text-xs font-bold text-slate-600">{t('services.ticket')}</span>
              </div>
            </div>
          </div>

          {/* Section 3: Safety */}
          <div className="bg-white rounded-[2rem] p-6 shadow-[0_10px_30px_rgba(0,0,0,0.05)] border border-slate-100">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center text-red-600">
                <ShieldAlert size={20} strokeWidth={2.5} />
              </div>
              <h2 className="text-lg font-bold text-slate-800">{t('services.safety')}</h2>
            </div>
            
            <ul className="space-y-3 text-sm text-slate-600 font-medium">
              <li className="flex items-start gap-2">
                <span className="text-red-500 mt-0.5">•</span>
                {t('services.rule1')}
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-500 mt-0.5">•</span>
                {t('services.rule2')}
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-500 mt-0.5">•</span>
                {t('services.rule3')}
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-500 mt-0.5">•</span>
                {t('services.rule4')}
              </li>
            </ul>
          </div>

        </div>

        <BottomNav activeTab="services" />
      </div>
    </div>
  );
}
