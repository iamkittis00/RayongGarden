import { Home, LayoutGrid, MoreHorizontal } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';

interface BottomNavProps {
  activeTab: 'home' | 'services' | 'others';
}

export default function BottomNav({ activeTab }: BottomNavProps) {
  const navigate = useNavigate();
  const { t } = useLanguage();

  return (
    <div className="bg-white px-8 pt-5 pb-8 flex justify-between items-center fixed bottom-0 w-full md:max-w-md shadow-[0_-10px_40px_rgba(0,0,0,0.05)] rounded-t-[2.5rem] z-50">
      
      {/* บริการ */}
      <button 
        onClick={() => navigate('/services')}
        className={`outline-none focus:outline-none flex flex-col items-center gap-2 transition-all duration-200 w-20 group ${activeTab === 'services' ? 'text-blue-500' : 'text-gray-400 hover:text-blue-500 active:scale-90'}`}
      >
        <LayoutGrid size={28} strokeWidth={2.5} className={`${activeTab !== 'services' && 'group-hover:-translate-y-1'}`} />
        <span className="text-[11px] font-extrabold tracking-wide">{t('nav.services')}</span>
      </button>

      {/* หน้าแรก */}
      <button 
        onClick={() => navigate('/TouristPage')}
        className={`outline-none focus:outline-none flex flex-col items-center transition-all duration-200 -mt-10 border-[5px] border-[#F5F9FD] rounded-full ${
          activeTab === 'home' 
            ? 'bg-gradient-to-tr from-blue-500 to-blue-300 text-white px-8 py-4 gap-1.5 shadow-xl shadow-blue-200/80' 
            : 'bg-white text-gray-400 px-5 py-5 shadow-md hover:text-blue-500 active:scale-95'
        }`}
      >
        <Home size={30} strokeWidth={2.5} />
        {activeTab === 'home' && <span className="text-xs font-black tracking-wide">{t('nav.home')}</span>}
      </button>

      {/* อื่นๆ */}
      <button 
        onClick={() => navigate('/settings')}
        className={`outline-none focus:outline-none flex flex-col items-center gap-2 transition-all duration-200 w-20 group ${activeTab === 'others' ? 'text-blue-500' : 'text-gray-400 hover:text-blue-500 active:scale-90'}`}
      >
        <MoreHorizontal size={28} strokeWidth={2.5} className={`${activeTab !== 'others' && 'group-hover:-translate-y-1'}`} />
        <span className="text-[11px] font-extrabold tracking-wide">{t('nav.others')}</span>
      </button>
    </div>
  );
}
