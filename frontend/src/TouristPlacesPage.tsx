import { useState } from 'react';
import { ArrowLeft, Info, Leaf, Bug, TreePine, Map, } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { ALL_POIS } from './data/mapData';
import { useLanguage } from './contexts/LanguageContext';

// แมปโซนเป็นภาษาไทย
const ZONES = [
  { id: 'all', name: 'ทั้งหมด' },
  { id: 'chamuang', name: 'ป่าชะมวง' },
  { id: 'taew_lek', name: 'แต้วเล็ก' },
  { id: 'kok', name: 'ป่ากก' },
  { id: 'mai_nam', name: 'ไม้หนาม' }
];

// ฟังก์ชันจำลองรูปภาพตามประเภทของฐาน
const getPlaceholderImage = (id: number) => {
  const images = [
    '/nature_mangrove.png', // ป่าชายเลน
    '/nature_lake.png', // บึงน้ำใส
    '/nature_scenic.png', // ป่าเสม็ด
    '/rayong_promo.jpg', // ภาพรวมโปรโมต
  ];
  return images[id % images.length];
};

// ฟังก์ชันเลือกสีและไอคอนตามประเภท
const getTypeStyle = (type: string) => {
  switch(type) {
    case 'ระบบนิเวศ': return { color: 'text-emerald-600 bg-emerald-50 border-emerald-100', icon: <Leaf size={14} /> };
    case 'พรรณไม้ป่า': return { color: 'text-green-600 bg-green-50 border-green-100', icon: <TreePine size={14} /> };
    case 'สมุนไพร': return { color: 'text-teal-600 bg-teal-50 border-teal-100', icon: <Leaf size={14} /> };
    case 'สัตว์ป่า': return { color: 'text-orange-600 bg-orange-50 border-orange-100', icon: <Bug size={14} /> };
    default: return { color: 'text-blue-600 bg-blue-50 border-blue-100', icon: <Info size={14} /> };
  }
};

export default function TouristPlacesPage() {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const [activeZone, setActiveZone] = useState('all');

  const filteredPlaces = activeZone === 'all' 
    ? ALL_POIS 
    : ALL_POIS.filter(poi => poi.zone === activeZone);

  return (
    <div className="min-h-dvh bg-[#F4F9FF] font-sans flex justify-center md:bg-slate-100">
      {/* Mobile Simulator Container */}
      <div className="w-full md:max-w-md bg-[#fdfaf6] min-h-dvh relative flex flex-col md:border-x md:border-slate-200 md:shadow-2xl">
        
        {/* Header */}
        <div className="bg-white/80 backdrop-blur-xl sticky top-0 z-20 px-6 pt-14 pb-4 flex flex-col gap-4 shadow-[0_4px_20px_rgba(0,0,0,0.03)] border-b border-slate-100">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => navigate(-1)} 
              className="p-3 bg-slate-50 text-slate-700 rounded-2xl active:scale-90 transition-transform"
            >
              <ArrowLeft size={24} strokeWidth={2.5} />
            </button>
            <div>
              <h1 className="text-2xl font-extrabold text-slate-800 tracking-tight">{t('places.title')}</h1>
              <p className="text-sm font-medium text-slate-500">{t('places.subtitle')}</p>
            </div>
          </div>

          {/* Tabs โซน */}
          <div className="flex gap-2 overflow-x-auto pb-2 -mx-6 px-6 snap-x hide-scrollbar">
            {ZONES.map((zone) => (
              <button
                key={zone.id}
                onClick={() => setActiveZone(zone.id)}
                className={`whitespace-nowrap flex-shrink-0 px-5 py-2.5 rounded-full text-sm font-bold transition-all snap-start shadow-sm border ${
                  activeZone === zone.id 
                    ? 'bg-blue-600 text-white border-blue-600 shadow-blue-600/30' 
                    : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
                }`}
              >
                {zone.name}
              </button>
            ))}
          </div>
        </div>

        {/* Content List */}
        <div className="flex-1 px-6 py-8 overflow-y-auto pb-24">
          <div className="flex flex-col gap-6">
            {filteredPlaces.map((poi) => {
              const style = getTypeStyle(poi.type);
              return (
                <div key={poi.id} className="bg-white rounded-[2rem] p-4 shadow-[0_10px_30px_rgba(0,0,0,0.04)] border border-slate-50 active:scale-[0.98] transition-transform flex flex-col gap-4">
                  {/* Image */}
                  <div className="w-full h-48 rounded-[1.5rem] overflow-hidden relative shadow-inner">
                    <img src={getPlaceholderImage(poi.id)} alt={poi.name} className="w-full h-full object-cover" />
                    <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-sm border border-white/50">
                      <span className={style.color.split(' ')[0]}>{style.icon}</span>
                      <span className={`text-xs font-extrabold ${style.color.split(' ')[0]}`}>{poi.type}</span>
                    </div>
                  </div>

                  {/* Info */}
                  <div className="px-2 pb-2">
                    <div className="flex justify-between items-start mb-1">
                      <h2 className="text-xl font-bold text-slate-800">{t(`poi.${poi.name}`)}</h2>
                    </div>
                    {poi.scientific && (
                      <p className="text-xs font-medium italic text-slate-400 mb-3">{poi.scientific}</p>
                    )}
                    <p className="text-sm text-slate-600 leading-relaxed font-medium mb-4">
                      {poi.info}
                    </p>
                    
                    {/* Action Button */}
                    <button onClick={() => navigate('/zones-map', { state: { targetPoiId: poi.id } })} className="w-full mb-2 bg-blue-50 text-blue-600 font-bold py-3.5 rounded-2xl flex items-center justify-center gap-2 active:bg-blue-100 transition-colors">
                      <Map size={18} strokeWidth={2.5} />
                      {t('places.navigate')}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        {/* End Mobile Container */}
      </div>
    </div>
  );
}
