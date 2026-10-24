import { Users, Anchor, TrendingUp, Clock, AlertTriangle, CheckCircle2 } from 'lucide-react';

export default function SystemOverview() {
  return (
    <div className="h-full overflow-y-auto bg-slate-50 p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-extrabold text-slate-800 tracking-tight">ภาพรวมระบบ (System Overview)</h2>
        <p className="text-slate-500 text-sm font-medium mt-1">สรุปข้อมูลการใช้งานประจำวัน สวนพฤกษศาสตร์ระยอง</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 flex items-center gap-4">
          <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center shrink-0">
            <Users size={24} strokeWidth={2.5} />
          </div>
          <div>
            <p className="text-slate-400 text-xs font-bold uppercase tracking-wider mb-1">นักท่องเที่ยว (วันนี้)</p>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-black text-slate-800">142</span>
              <span className="text-slate-400 text-sm font-semibold">คน</span>
            </div>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 flex items-center gap-4">
          <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-xl flex items-center justify-center shrink-0">
            <Anchor size={24} strokeWidth={2.5} />
          </div>
          <div>
            <p className="text-slate-400 text-xs font-bold uppercase tracking-wider mb-1">เรือที่กำลังใช้งาน</p>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-black text-slate-800">18</span>
              <span className="text-slate-400 text-sm font-semibold">ลำ</span>
            </div>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 flex items-center gap-4">
          <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center shrink-0">
            <TrendingUp size={24} strokeWidth={2.5} />
          </div>
          <div>
            <p className="text-slate-400 text-xs font-bold uppercase tracking-wider mb-1">รายได้ประเมิน</p>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-black text-slate-800">12,500</span>
              <span className="text-slate-400 text-sm font-semibold">฿</span>
            </div>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 flex items-center gap-4">
          <div className="w-12 h-12 bg-red-50 text-red-600 rounded-xl flex items-center justify-center shrink-0">
            <AlertTriangle size={24} strokeWidth={2.5} />
          </div>
          <div>
            <p className="text-slate-400 text-xs font-bold uppercase tracking-wider mb-1">เหตุฉุกเฉิน (SOS)</p>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-black text-slate-800">1</span>
              <span className="text-slate-400 text-sm font-semibold">ครั้ง</span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Mock Chart Section */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 lg:col-span-2">
          <h3 className="text-lg font-bold text-slate-800 mb-4">สถิติการเช่าเรือรายชั่วโมง</h3>
          <div className="h-64 flex items-end justify-between gap-2 pt-4 relative border-b border-slate-100 pb-2">
            {/* Grid lines */}
            <div className="absolute inset-0 flex flex-col justify-between pb-2 pointer-events-none">
              {[40, 30, 20, 10, 0].map((val, i) => (
                <div key={i} className="flex items-center text-[10px] text-slate-300 font-bold w-full">
                  <span className="w-6 text-right mr-2">{val}</span>
                  <div className="h-px bg-slate-100 flex-1"></div>
                </div>
              ))}
            </div>
            
            {/* Bars */}
            {[
              { time: '08:00', value: 10, h: 'h-[25%]' },
              { time: '09:00', value: 25, h: 'h-[60%]' },
              { time: '10:00', value: 35, h: 'h-[85%]' },
              { time: '11:00', value: 30, h: 'h-[75%]' },
              { time: '12:00', value: 15, h: 'h-[40%]' },
              { time: '13:00', value: 22, h: 'h-[55%]' },
              { time: '14:00', value: 38, h: 'h-[95%]' },
              { time: '15:00', value: 28, h: 'h-[70%]' },
              { time: '16:00', value: 18, h: 'h-[45%]' },
            ].map((bar, i) => (
              <div key={i} className="flex flex-col items-center w-full relative z-10 group cursor-pointer">
                <div className="absolute -top-8 bg-slate-800 text-white text-xs font-bold px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                  {bar.value} ลำ
                </div>
                <div className={`w-full max-w-[2rem] bg-blue-500 rounded-t-md transition-all group-hover:bg-blue-600 ${bar.h}`}></div>
                <span className="text-[10px] font-bold text-slate-400 mt-2">{bar.time}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Activity Feed */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-slate-800">กิจกรรมล่าสุด</h3>
            <button className="text-blue-600 text-xs font-bold hover:underline">ดูทั้งหมด</button>
          </div>
          
          <div className="space-y-6">
            <div className="flex gap-4">
              <div className="w-8 h-8 rounded-full bg-red-100 text-red-600 flex items-center justify-center shrink-0">
                <AlertTriangle size={14} strokeWidth={3} />
              </div>
              <div>
                <p className="text-sm font-bold text-slate-800">รับแจ้งเหตุ SOS จาก "สมศรี มีสุข"</p>
                <p className="text-xs text-slate-500 mt-0.5">เส้นทางคายัค (สีแดง)</p>
                <p className="text-[10px] font-bold text-slate-400 mt-1 flex items-center gap-1">
                  <Clock size={10} /> 10 นาทีที่แล้ว
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0">
                <CheckCircle2 size={14} strokeWidth={3} />
              </div>
              <div>
                <p className="text-sm font-bold text-slate-800">เช่าเรือสำเร็จ: "วิชัย รักน้ำ"</p>
                <p className="text-xs text-slate-500 mt-0.5">เรือยนต์ - 1 ชั่วโมง</p>
                <p className="text-[10px] font-bold text-slate-400 mt-1 flex items-center gap-1">
                  <Clock size={10} /> 45 นาทีที่แล้ว
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0">
                <CheckCircle2 size={14} strokeWidth={3} />
              </div>
              <div>
                <p className="text-sm font-bold text-slate-800">คืนเรือเสร็จสิ้น: "อำนาจ ชาญชัย"</p>
                <p className="text-xs text-slate-500 mt-0.5">เรือคายัค - คืนตรงเวลา</p>
                <p className="text-[10px] font-bold text-slate-400 mt-1 flex items-center gap-1">
                  <Clock size={10} /> 1 ชั่วโมงที่แล้ว
                </p>
              </div>
            </div>
            
            <div className="flex gap-4">
              <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center shrink-0">
                <Users size={14} strokeWidth={3} />
              </div>
              <div>
                <p className="text-sm font-bold text-slate-800">คณะทัวร์ 20 คน ลงทะเบียน</p>
                <p className="text-xs text-slate-500 mt-0.5">นำเที่ยวโดยเจ้าหน้าที่</p>
                <p className="text-[10px] font-bold text-slate-400 mt-1 flex items-center gap-1">
                  <Clock size={10} /> 2 ชั่วโมงที่แล้ว
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
