import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Phone, ArrowRight, ShieldCheck, Map as MapIcon } from 'lucide-react';

export default function TouristLoginPage() {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!name.trim() || !phone.trim()) {
      setError('กรุณากรอกข้อมูลให้ครบถ้วน');
      return;
    }
    
    if (phone.length !== 10) {
      setError('กรุณากรอกเบอร์โทรศัพท์ให้ครบ 10 หลัก');
      return;
    }

    // Save to localStorage for use in Maps and SOS Dashboard
    localStorage.setItem('tourist_name', name);
    localStorage.setItem('tourist_phone', phone);
    
    // Reset stamps and trip data for a new session
    localStorage.removeItem('user_stamps');
    localStorage.removeItem('trip_start_time');
    localStorage.removeItem('trip_route');
    
    // Redirect to main tourist dashboard
    navigate('/TouristPage');
  };

  return (
    <div className="min-h-screen bg-[#F4F9FF] font-sans relative overflow-x-hidden md:flex">
      {/* Desktop Hero Section */}
      <div className="hidden md:flex md:w-1/2 bg-gradient-to-br from-blue-50 to-emerald-50 flex-col justify-center items-center text-slate-800 relative overflow-hidden border-r border-slate-200/50">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-400/10 rounded-full blur-[100px] mix-blend-multiply"></div>
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-emerald-400/10 rounded-full blur-[100px] mix-blend-multiply"></div>
        <div className="relative z-10 text-center px-12">
          <div className="w-24 h-24 bg-white rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-xl border border-slate-100">
            <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-emerald-500"><path d="M12 22s-8-4.5-8-11.8A8 8 0 0 1 12 2a8 8 0 0 1 8 8.2c0 7.3-8 11.8-8 11.8z"></path><circle cx="12" cy="10" r="3"></circle></svg>
          </div>
          <h1 className="text-4xl font-extrabold mb-6 tracking-tight text-slate-800">ระบบติดตามความปลอดภัย</h1>
          <p className="text-slate-500 text-lg font-medium max-w-sm mx-auto leading-relaxed">
            กรุณาลงทะเบียนเพื่อเปิดใช้งานระบบขอความช่วยเหลือฉุกเฉิน และแผนที่นำทางอัจฉริยะ
          </p>
        </div>
      </div>

      {/* Form Section */}
      <div className="md:w-1/2 min-h-screen flex flex-col items-center justify-center p-6 py-12 relative overflow-y-auto">
        {/* Background Decorations (Mobile only) */}
        <div className="absolute top-[-10%] right-[-10%] w-96 h-96 bg-blue-400/20 rounded-full blur-[80px] md:hidden"></div>
        <div className="absolute bottom-[-10%] left-[-10%] w-80 h-80 bg-emerald-400/20 rounded-full blur-[80px] md:hidden"></div>

        {/* Main Card */}
        <div className="w-full max-w-sm bg-white/80 backdrop-blur-xl p-8 rounded-[2rem] shadow-[0_20px_60px_rgba(0,0,0,0.05)] border border-white relative z-10">
        
        {/* Header Icon */}
        <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-600 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-blue-500/30 transform -rotate-6">
          <MapIcon size={36} className="text-white" strokeWidth={2.5} />
        </div>

        <div className="text-center mb-8">
          <h1 className="text-2xl font-extrabold text-slate-800 mb-2 tracking-tight">ข้อมูลนักท่องเที่ยว</h1>
          <p className="text-sm font-medium text-slate-500 leading-relaxed">
            กรุณากรอกข้อมูลเพื่อใช้ในการแจ้งเตือนความปลอดภัยระหว่างการเดินทาง
          </p>
        </div>

        <form onSubmit={handleSubmit} noValidate className="space-y-5">
          {/* Name Input */}
          <div>
            <label className="block text-[13px] font-bold text-slate-700 mb-1.5 ml-1">
              ชื่อ-นามสกุล
            </label>
            <div className="relative flex items-center">
              <div className={`absolute left-4 ${error && !name.trim() ? 'text-red-400' : 'text-slate-400'}`}>
                <User size={20} strokeWidth={2.5} />
              </div>
              <input 
                type="text" 
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  if (error) setError(null);
                }}
                className={`w-full bg-slate-50 text-slate-800 text-sm font-bold rounded-2xl pl-12 pr-4 py-4 focus:outline-none focus:ring-4 transition-all placeholder:text-slate-400 placeholder:font-medium border ${
                  error && !name.trim() 
                    ? 'border-red-400 focus:ring-red-500/20 focus:border-red-500 bg-red-50/30' 
                    : 'border-slate-200 focus:ring-blue-500/20 focus:border-blue-500'
                }`}
                placeholder="สมชาย ใจดี"
              />
            </div>
          </div>

          {/* Phone Input */}
          <div>
            <label className="block text-[13px] font-bold text-slate-700 mb-1.5 ml-1">
              เบอร์โทรศัพท์ (ฉุกเฉิน)
            </label>
            <div className="relative flex items-center">
              <div className={`absolute left-4 ${error && (phone.length !== 10) ? 'text-red-400' : 'text-slate-400'}`}>
                <Phone size={20} strokeWidth={2.5} />
              </div>
              <input 
                type="tel" 
                value={phone}
                onChange={(e) => {
                  const val = e.target.value.replace(/\D/g, '');
                  if (val.length <= 10) setPhone(val);
                  if (error) setError(null);
                }}
                className={`w-full bg-slate-50 text-slate-800 text-sm font-bold rounded-2xl pl-12 pr-4 py-4 focus:outline-none focus:ring-4 transition-all placeholder:text-slate-400 placeholder:font-medium border ${
                  error && (phone.length !== 10)
                    ? 'border-red-400 focus:ring-red-500/20 focus:border-red-500 bg-red-50/30' 
                    : 'border-slate-200 focus:ring-blue-500/20 focus:border-blue-500'
                }`}
                placeholder="08X-XXX-XXXX"
              />
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div className="text-red-500 text-xs font-bold text-center mt-2 flex items-center justify-center gap-1.5 animate-in slide-in-from-top-1 fade-in">
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>
              {error}
            </div>
          )}

          {/* Privacy Note */}
          <div className="bg-emerald-50 rounded-xl p-3 flex items-start gap-2.5 mt-2">
            <ShieldCheck size={18} className="text-emerald-600 shrink-0 mt-0.5" strokeWidth={2.5} />
            <p className="text-[11px] text-emerald-700 font-medium leading-relaxed">
              ข้อมูลของคุณจะถูกใช้เพื่อการติดตามความปลอดภัยในกรณีฉุกเฉินเท่านั้น
            </p>
          </div>

          {/* Submit Button */}
          <button 
            type="submit" 
            className="w-full bg-blue-600 text-white font-bold py-4 rounded-2xl flex items-center justify-center gap-2 mt-6 active:scale-95 transition-transform shadow-[0_10px_25px_rgba(37,99,235,0.3)] hover:bg-blue-700"
          >
            เริ่มต้นใช้งาน
            <ArrowRight size={20} strokeWidth={2.5} />
          </button>
        </form>

        <button 
          onClick={() => navigate('/')} 
          className="w-full text-slate-400 font-bold text-sm mt-6 hover:text-slate-600 transition-colors"
        >
          กลับหน้าหลัก
        </button>
      </div>
      </div>
    </div>
  );
}
