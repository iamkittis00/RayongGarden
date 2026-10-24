import { Search, Filter, MoreVertical, Phone, AlertTriangle, CheckCircle2 } from 'lucide-react';

const MOCK_TOURISTS = [
  { id: 't1', name: 'สมชาย ใจดี', type: 'เรือคายัค', route: 'เส้นทางคายัค', startTime: '10:00', timeLeft: '1 ชม. 15 นาที', status: 'active', phone: '081-234-5678' },
  { id: 't2', name: 'วิชัย รักน้ำ', type: 'เรือยนต์', route: 'เส้นทางเรือยนต์', startTime: '11:00', timeLeft: '45 นาที', status: 'active', phone: '089-876-5432' },
  { id: 't3', name: 'สมศรี มีสุข', type: 'เรือคายัค', route: 'เส้นทางคายัค', startTime: '11:30', timeLeft: '-', status: 'sos', phone: '085-555-5555' },
  { id: 't4', name: 'อำนาจ ชาญชัย', type: 'เรือคายัค', route: 'เส้นทางคายัค', startTime: '09:00', timeLeft: '-', status: 'completed', phone: '082-333-4444' },
  { id: 't5', name: 'ปราณี แสงจันทร์', type: 'เรือยนต์', route: 'เส้นทางเรือยนต์', startTime: '12:00', timeLeft: '1 ชม. 30 นาที', status: 'active', phone: '081-111-2222' },
  { id: 't6', name: 'กิตติพงษ์ ทองดี', type: 'เรือคายัค', route: 'เส้นทางคายัค', startTime: '08:30', timeLeft: '-', status: 'completed', phone: '084-444-5555' },
];

export default function TouristListTable() {
  return (
    <div className="h-full flex flex-col bg-slate-50 p-6">
      <div className="mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-extrabold text-slate-800 tracking-tight">รายชื่อนักท่องเที่ยว</h2>
          <p className="text-slate-500 text-sm font-medium mt-1">จัดการและติดตามสถานะผู้เช่าเรือทั้งหมด</p>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input 
              type="text" 
              placeholder="ค้นหาชื่อ, เบอร์โทร..." 
              className="pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 w-64 shadow-sm"
            />
          </div>
          <button className="flex items-center gap-2 px-4 py-2.5 bg-white border border-slate-200 text-slate-700 font-bold rounded-xl hover:bg-slate-50 active:scale-95 transition-all shadow-sm">
            <Filter size={18} />
            <span>กรองข้อมูล</span>
          </button>
        </div>
      </div>

      <div className="flex-1 bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden flex flex-col">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200">
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">ชื่อ-นามสกุล</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">ประเภทเรือ</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">เส้นทาง</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">เริ่ม-เหลือเวลา</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">สถานะ</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-right">จัดการ</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {MOCK_TOURISTS.map((tourist) => (
                <tr key={tourist.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-white shadow-sm ${
                        tourist.status === 'sos' ? 'bg-red-500' : 
                        tourist.status === 'completed' ? 'bg-slate-400' : 'bg-blue-600'
                      }`}>
                        {tourist.name.charAt(0)}
                      </div>
                      <div>
                        <p className="text-sm font-bold text-slate-800">{tourist.name}</p>
                        <p className="text-xs font-medium text-slate-500 flex items-center gap-1 mt-0.5">
                          <Phone size={10} /> {tourist.phone}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold border ${
                      tourist.type === 'เรือยนต์' 
                        ? 'bg-blue-50 text-blue-700 border-blue-200' 
                        : 'bg-green-50 text-green-700 border-green-200'
                    }`}>
                      {tourist.type}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm font-semibold text-slate-600">
                    {tourist.route}
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-sm font-bold text-slate-800">{tourist.startTime} น.</p>
                    <p className="text-xs font-medium text-slate-500 mt-0.5">เหลือ: {tourist.timeLeft}</p>
                  </td>
                  <td className="px-6 py-4">
                    {tourist.status === 'active' && (
                      <div className="flex items-center gap-1.5 text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200 w-fit">
                        <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
                        <span className="text-xs font-bold">กำลังใช้งาน</span>
                      </div>
                    )}
                    {tourist.status === 'sos' && (
                      <div className="flex items-center gap-1.5 text-red-600 bg-red-50 px-2.5 py-1 rounded-md border border-red-200 w-fit shadow-sm shadow-red-100">
                        <AlertTriangle size={12} strokeWidth={3} />
                        <span className="text-xs font-bold">SOS ฉุกเฉิน</span>
                      </div>
                    )}
                    {tourist.status === 'completed' && (
                      <div className="flex items-center gap-1.5 text-slate-600 bg-slate-100 px-2.5 py-1 rounded-md border border-slate-200 w-fit">
                        <CheckCircle2 size={12} strokeWidth={3} />
                        <span className="text-xs font-bold">คืนเรือแล้ว</span>
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                      <MoreVertical size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="p-4 border-t border-slate-200 bg-slate-50 flex items-center justify-between mt-auto">
          <p className="text-xs font-medium text-slate-500">แสดง 1 ถึง 6 จาก 142 รายการ</p>
          <div className="flex gap-2">
            <button className="px-3 py-1.5 border border-slate-200 bg-white text-slate-400 text-xs font-bold rounded-lg cursor-not-allowed">ก่อนหน้า</button>
            <button className="px-3 py-1.5 border border-slate-200 bg-white text-slate-700 text-xs font-bold rounded-lg hover:bg-slate-50">ถัดไป</button>
          </div>
        </div>
      </div>
    </div>
  );
}
