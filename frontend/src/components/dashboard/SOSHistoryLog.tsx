import { Calendar, Search, MapPin, User, Clock, AlertTriangle, ShieldCheck, Download, CheckCircle2 } from 'lucide-react';

const MOCK_SOS_HISTORY = [
  { id: 'sos-001', date: '27 พ.ค. 2026', time: '11:45', name: 'สมศรี มีสุข', route: 'เส้นทางคายัค', location: 'โซน B - ป่าเสม็ด', status: 'resolved', handledBy: 'จนท. วิชัย', responseTime: '8 นาที' },
  { id: 'sos-002', date: '26 พ.ค. 2026', time: '14:20', name: 'John Doe', route: 'เส้นทางเรือยนต์', location: 'โซน C - ทะเลบัว', status: 'resolved', handledBy: 'จนท. สมปอง', responseTime: '5 นาที' },
  { id: 'sos-003', date: '25 พ.ค. 2026', time: '09:15', name: 'มาลี รักไทย', route: 'เส้นทางคายัค', location: 'โซน A - จุดเริ่มต้น', status: 'resolved', handledBy: 'จนท. วิชัย', responseTime: '12 นาที' },
  { id: 'sos-004', date: '22 พ.ค. 2026', time: '16:30', name: 'Alex Smith', route: 'เส้นทางคายัค', location: 'โซน D - จุดชมวิว', status: 'resolved', handledBy: 'จนท. อำนาจ', responseTime: '15 นาที' },
];

export default function SOSHistoryLog() {
  return (
    <div className="h-full flex flex-col bg-slate-50 p-6">
      <div className="mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-extrabold text-slate-800 tracking-tight">ประวัติการแจ้งเหตุ SOS</h2>
          <p className="text-slate-500 text-sm font-medium mt-1">บันทึกเหตุฉุกเฉินและการเข้าช่วยเหลือย้อนหลัง</p>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input 
              type="text" 
              placeholder="ค้นหารหัส, ชื่อ..." 
              className="pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 w-64 shadow-sm"
            />
          </div>
          <button className="flex items-center gap-2 px-4 py-2.5 bg-white border border-slate-200 text-slate-700 font-bold rounded-xl hover:bg-slate-50 active:scale-95 transition-all shadow-sm">
            <Calendar size={18} />
            <span>เลือกเดือน</span>
          </button>
          <button className="flex items-center gap-2 px-4 py-2.5 bg-slate-800 text-white font-bold rounded-xl hover:bg-slate-900 active:scale-95 transition-all shadow-[0_10px_25px_rgba(30,41,59,0.3)]">
            <Download size={18} />
            <span>Export CSV</span>
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        <div className="space-y-4">
          {MOCK_SOS_HISTORY.map((log) => (
            <div key={log.id} className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200 flex flex-col md:flex-row md:items-center justify-between gap-6 hover:border-red-200 transition-colors group">
              <div className="flex items-start gap-4 flex-1">
                <div className="w-12 h-12 rounded-full bg-red-50 text-red-600 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                  <AlertTriangle size={24} strokeWidth={2.5} />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-extrabold text-slate-800">{log.id}</span>
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-100 text-slate-500">
                      {log.date} เวลา {log.time} น.
                    </span>
                  </div>
                  
                  <div className="flex flex-wrap items-center gap-4 text-xs font-medium text-slate-500">
                    <div className="flex items-center gap-1.5">
                      <User size={14} className="text-blue-500" />
                      <span className="text-slate-700 font-bold">{log.name}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <MapPin size={14} className="text-emerald-500" />
                      <span>{log.location} ({log.route})</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-6 bg-slate-50 p-4 rounded-xl border border-slate-100">
                <div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wide mb-1">เวลาตอบสนอง</p>
                  <div className="flex items-center gap-1.5 text-sm font-bold text-slate-800">
                    <Clock size={14} className="text-orange-500" />
                    {log.responseTime}
                  </div>
                </div>
                <div className="w-px h-8 bg-slate-200"></div>
                <div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wide mb-1">เจ้าหน้าที่</p>
                  <div className="flex items-center gap-1.5 text-sm font-bold text-slate-800">
                    <ShieldCheck size={14} className="text-blue-500" />
                    {log.handledBy}
                  </div>
                </div>
                <div className="w-px h-8 bg-slate-200"></div>
                <div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wide mb-1">สถานะ</p>
                  <div className="flex items-center gap-1.5 text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                    <CheckCircle2 size={12} strokeWidth={3} />
                    <span className="text-[10px] font-bold">ช่วยเหลือแล้ว</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
