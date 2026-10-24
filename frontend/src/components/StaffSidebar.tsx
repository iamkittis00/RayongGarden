import { LayoutDashboard, Map as MapIcon, Users, FileWarning, LogOut, Settings } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface StaffSidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export default function StaffSidebar({ activeTab, setActiveTab }: StaffSidebarProps) {
  const navigate = useNavigate();

  const menuItems = [
    { id: 'overview', icon: <LayoutDashboard size={20} />, label: 'ภาพรวมระบบ' },
    { id: 'map', icon: <MapIcon size={20} />, label: 'แผนที่ติดตาม (Live)' },
    { id: 'tourists', icon: <Users size={20} />, label: 'รายชื่อนักท่องเที่ยว' },
    { id: 'sos', icon: <FileWarning size={20} />, label: 'ประวัติ SOS' },
    { id: 'settings', icon: <Settings size={20} />, label: 'ตั้งค่าระบบ' },
  ];

  return (
    <div className="w-72 h-screen bg-[#0B1739] text-slate-300 flex flex-col shadow-2xl z-20 shrink-0">
      {/* Logo & Header */}
      <div className="p-8 flex flex-col items-center border-b border-white/5">
        <div className="w-16 h-16 bg-blue-500 rounded-2xl flex items-center justify-center mb-4 shadow-[0_8px_16px_rgba(59,130,246,0.3)]">
          <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-white"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>
        </div>
        <h1 className="text-white text-lg font-extrabold tracking-wide">Rayong Botanic</h1>
        <p className="text-blue-400 text-xs font-bold uppercase tracking-widest mt-1">Command Center</p>
      </div>

      {/* Navigation */}
      <div className="flex-1 overflow-y-auto py-6 px-4 space-y-2">
        <div className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-4 px-4">Menu</div>
        
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`w-full flex items-center gap-4 px-4 py-3.5 rounded-xl transition-all duration-200 ${
              activeTab === item.id 
                ? 'bg-blue-600/10 text-blue-400 font-bold border border-blue-500/20' 
                : 'hover:bg-white/5 font-medium hover:text-white'
            }`}
          >
            {item.icon}
            <span className="text-sm">{item.label}</span>
          </button>
        ))}
      </div>

      {/* Profile & Settings */}
      <div className="p-4 border-t border-white/5">
        <div className="flex items-center gap-3 p-3 bg-white/5 rounded-xl mb-4">
          <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-blue-500 rounded-full flex items-center justify-center text-white font-bold shadow-md">
            A
          </div>
          <div className="flex-1 text-left">
            <p className="text-white text-sm font-bold">Admin User</p>
          </div>
        </div>
        
        <button 
          onClick={() => navigate('/staff-login')}
          className="w-full flex items-center justify-center gap-2 py-3 rounded-xl text-slate-400 hover:text-white hover:bg-white/5 transition-all text-sm font-bold"
        >
          <LogOut size={18} />
          ออกจากระบบ
        </button>
      </div>
    </div>
  );
}
