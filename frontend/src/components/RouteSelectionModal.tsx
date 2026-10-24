import { Sailboat, Ship } from 'lucide-react';

interface RouteOption {
  id: string;
  name: string;
  type: string;
  color: string;
  bg: string;
  strokeColor: string;
}

interface RouteSelectionModalProps {
  routes: RouteOption[];
  onSelectRoute: (id: string) => void;
  onCancel: () => void;
}

export default function RouteSelectionModal({ routes, onSelectRoute, onCancel }: RouteSelectionModalProps) {
  return (
    <div className="absolute inset-0 z-50 bg-slate-900/40 backdrop-blur-sm flex flex-col justify-end">
      <div className="bg-white rounded-t-[2.5rem] w-full max-h-[85vh] flex flex-col shadow-[0_-20px_40px_rgba(0,0,0,0.1)] animate-in slide-in-from-bottom-full duration-300">
        <div className="flex justify-center pt-4 pb-2">
          <div className="w-12 h-1.5 bg-slate-200 rounded-full"></div>
        </div>
        
        <div className="px-6 pb-4 pt-2">
          <h2 className="text-2xl font-extrabold text-slate-800 tracking-tight">เลือกเส้นทางเรือ</h2>
          <p className="text-slate-500 font-medium mt-1.5 text-sm leading-relaxed">กรุณาเลือกเรือหรือเส้นทางที่คุณกำลังใช้งานอยู่ เพื่อเริ่มระบบติดตามและแชร์พิกัด GPS</p>
        </div>
        
        <div className="flex flex-col gap-3 px-6 pb-8 overflow-y-auto">
          {routes.map((route) => (
            <button 
              key={route.id}
              onClick={() => onSelectRoute(route.id)}
              className="flex items-center gap-4 p-4 rounded-2xl border border-slate-100 hover:border-blue-500 hover:shadow-md active:scale-[0.98] transition-all bg-white shadow-sm shadow-slate-100/50"
            >
              <div className={`p-3 rounded-full ${route.bg} ${route.color}`}>
                {route.type === 'kayak' ? <Sailboat size={24} /> : <Ship size={24} />}
              </div>
              <div className="text-left">
                <h3 className="font-bold text-slate-800 text-[15px]">{route.name}</h3>
                <p className="text-slate-400 text-[11px] font-medium mt-0.5">แตะเพื่อเริ่มการนำทาง</p>
              </div>
            </button>
          ))}
          
          <button 
            onClick={onCancel} 
            className="mt-4 py-4 rounded-2xl bg-slate-100 text-slate-600 font-bold active:scale-[0.98] transition-transform"
          >
            ย้อนกลับ
          </button>
        </div>
      </div>
    </div>
  );
}
