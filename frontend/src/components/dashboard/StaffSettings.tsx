import { Save, Shield, Map, BellRing, Database } from 'lucide-react';

export default function StaffSettings() {
  return (
    <div className="h-full overflow-y-auto bg-slate-50 p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-extrabold text-slate-800 tracking-tight">ตั้งค่าระบบ (System Settings)</h2>
        <p className="text-slate-500 text-sm font-medium mt-1">จัดการการตั้งค่าพื้นฐานของศูนย์ควบคุม</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-6">
          {/* Geofence Settings */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
            <div className="flex items-center gap-3 mb-4 border-b border-slate-100 pb-4">
              <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center">
                <Map size={20} strokeWidth={2.5} />
              </div>
              <h3 className="text-lg font-bold text-slate-800">ตั้งค่าพิกัดเขตปลอดภัย (Geofencing)</h3>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl border border-slate-200">
                <div>
                  <p className="font-bold text-slate-800 text-sm">เปิดใช้งานแจ้งเตือนออกนอกเขต</p>
                  <p className="text-xs text-slate-500 mt-1">ระบบจะแจ้งเตือนเมื่อเรือออกนอกขอบเขตสวนพฤกษศาสตร์</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" defaultChecked />
                  <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">ระยะการเตือนภัย (รัศมี)</label>
                <div className="flex items-center gap-4">
                  <input type="range" min="100" max="1000" defaultValue="500" className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600" />
                  <span className="font-bold text-blue-600 text-sm w-16 text-right">500 m</span>
                </div>
              </div>
            </div>
          </div>

          {/* Pricing Settings */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
            <div className="flex items-center gap-3 mb-4 border-b border-slate-100 pb-4">
              <div className="w-10 h-10 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center">
                <Database size={20} strokeWidth={2.5} />
              </div>
              <h3 className="text-lg font-bold text-slate-800">ตั้งค่าอัตราค่าบริการเรือ</h3>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">เรือคายัค (บาท/ชม.)</label>
                <input type="number" defaultValue="100" className="w-full bg-slate-50 border border-slate-200 text-slate-800 text-sm font-bold rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500" />
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">เรือยนต์ (บาท/ชม.)</label>
                <input type="number" defaultValue="600" className="w-full bg-slate-50 border border-slate-200 text-slate-800 text-sm font-bold rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500" />
              </div>
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          {/* Notifications */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
            <div className="flex items-center gap-3 mb-4 border-b border-slate-100 pb-4">
              <div className="w-10 h-10 bg-orange-50 text-orange-600 rounded-xl flex items-center justify-center">
                <BellRing size={20} strokeWidth={2.5} />
              </div>
              <h3 className="text-lg font-bold text-slate-800">การแจ้งเตือน</h3>
            </div>
            
            <div className="space-y-4">
              <label className="flex items-center gap-3 cursor-pointer p-2 hover:bg-slate-50 rounded-lg">
                <input type="checkbox" defaultChecked className="w-4 h-4 text-orange-600 rounded border-slate-300 focus:ring-orange-600" />
                <span className="text-sm font-medium text-slate-700">เสียงเตือนเมื่อมี SOS</span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer p-2 hover:bg-slate-50 rounded-lg">
                <input type="checkbox" defaultChecked className="w-4 h-4 text-orange-600 rounded border-slate-300 focus:ring-orange-600" />
                <span className="text-sm font-medium text-slate-700">เด้งหน้าต่าง (Popup) เมื่อมี SOS</span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer p-2 hover:bg-slate-50 rounded-lg">
                <input type="checkbox" defaultChecked className="w-4 h-4 text-orange-600 rounded border-slate-300 focus:ring-orange-600" />
                <span className="text-sm font-medium text-slate-700">แจ้งเตือนเมื่อหมดเวลาเช่าเรือ</span>
              </label>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col items-center justify-center text-center">
            <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mb-4 text-slate-400">
              <Shield size={32} />
            </div>
            <h3 className="font-bold text-slate-800 mb-1">สิทธิ์การเข้าถึง (Admin)</h3>
            <p className="text-xs text-slate-500 mb-6">คุณมีสิทธิ์ในการแก้ไขการตั้งค่าทั้งหมดของระบบ</p>
            
            <button className="w-full flex items-center justify-center gap-2 bg-blue-600 text-white font-bold py-3 rounded-xl active:scale-95 transition-transform hover:bg-blue-700 shadow-md shadow-blue-500/20">
              <Save size={18} />
              บันทึกการตั้งค่า
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
