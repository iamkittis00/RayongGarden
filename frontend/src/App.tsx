import { BrowserRouter as Router, Route, Routes, Link, useNavigate } from 'react-router-dom';
import TouristPage from './TouristPage';
import TouristMapPage from './TouristMapPage';
import TouristPlacesPage from './TouristPlacesPage';
import ZonesMapPage from './ZonesMapPage';
import TouristLoginPage from './TouristLoginPage';
import StaffDashboard from './StaffDashboard';
import StampCollectionPage from './StampCollectionPage';
import TripSummaryPage from './TripSummaryPage';
import TouristServicesPage from './TouristServicesPage';
import TouristSettingsPage from './TouristSettingsPage';
import { LanguageProvider } from './contexts/LanguageContext';
import './App.css'

function Home() {
  return (
    <div className="min-h-dvh bg-[#F4F9FF] font-sans relative overflow-x-hidden overflow-y-auto md:flex">
      {/* Desktop Hero Section */}
      <div className="hidden md:flex md:w-1/2 bg-gradient-to-br from-blue-600 to-blue-800 flex-col justify-center items-center text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/hero.png')] bg-cover bg-center opacity-20 mix-blend-overlay"></div>
        <div className="absolute inset-0 bg-blue-900/40"></div>
        <div className="relative z-10 text-center px-12">
          <div className="w-24 h-24 bg-white/10 backdrop-blur-md rounded-3xl flex items-center justify-center mx-auto mb-8 border border-white/20 shadow-2xl">
            <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-white"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>
          </div>
          <h1 className="text-5xl font-extrabold mb-6 tracking-tight leading-tight">Rayong Botanic<br/>Garden</h1>
          <p className="text-blue-100 text-lg font-medium max-w-sm mx-auto leading-relaxed">
            ระบบนำทางและดูแลความปลอดภัยทางน้ำ สวนพฤกษศาสตร์ระยอง
          </p>
        </div>
      </div>

      {/* Login Form Section */}
      <div className="md:w-1/2 min-h-dvh flex flex-col items-center justify-center p-6 py-12 relative overflow-y-auto">
        {/* Background Decorations (Mobile only) */}
        <div className="absolute top-[-10%] right-[-10%] w-96 h-96 bg-blue-400/20 rounded-full blur-[80px] md:hidden"></div>
        <div className="absolute bottom-[-10%] left-[-10%] w-80 h-80 bg-emerald-400/20 rounded-full blur-[80px] md:hidden"></div>

        <div className="w-full max-w-sm bg-white/80 backdrop-blur-xl p-8 rounded-[2rem] shadow-[0_20px_60px_rgba(0,0,0,0.05)] border border-white relative z-10 text-center">
        <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-600 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-blue-500/30">
          <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-white"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>
        </div>
        
        <h1 className="text-2xl font-extrabold text-slate-800 mb-2 tracking-tight">ระบบนำทางเรือ</h1>
        <p className="text-sm font-medium text-slate-500 mb-8 leading-relaxed">
          สวนพฤกษศาสตร์ระยอง
        </p>

        <div className="space-y-4">
          <Link 
            to="/tourist-login"
            className="flex items-center justify-center gap-3 w-full bg-blue-600 text-white font-bold py-4 rounded-2xl active:scale-95 transition-transform shadow-[0_10px_25px_rgba(37,99,235,0.3)] hover:bg-blue-700"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
            สำหรับนักท่องเที่ยว
          </Link>
          <Link 
            to="/staff-login" 
            className="flex items-center justify-center gap-3 w-full bg-slate-50 text-slate-700 font-bold py-4 rounded-2xl active:scale-95 transition-transform border border-slate-200 hover:bg-slate-100"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>
            สำหรับเจ้าหน้าที่
          </Link>
        </div>
        </div>
      </div>
    </div>
  )
}

function StaffLogin() {
  const navigate = useNavigate();
  return (
    <div className="min-h-dvh bg-[#F4F9FF] font-sans relative overflow-x-hidden md:flex">
      {/* Desktop Hero Section */}
      <div className="hidden md:flex md:w-1/2 bg-slate-900 flex-col justify-center items-center text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-blue-900/20 mix-blend-overlay"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.1)_0%,transparent_100%)]"></div>
        <div className="relative z-10 text-center px-12">
          <div className="w-24 h-24 bg-white/5 backdrop-blur-md rounded-3xl flex items-center justify-center mx-auto mb-8 border border-white/10 shadow-2xl">
            <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-blue-400"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>
          </div>
          <h1 className="text-5xl font-extrabold mb-6 tracking-tight">Staff Portal</h1>
          <p className="text-slate-400 text-lg font-medium max-w-sm mx-auto leading-relaxed">
            ระบบจัดการความปลอดภัยและตอบสนองเหตุฉุกเฉิน
          </p>
        </div>
      </div>

      {/* Login Form Section */}
      <div className="md:w-1/2 min-h-dvh flex flex-col items-center justify-center p-6 py-12 relative overflow-y-auto">
        {/* Background Decorations (Mobile only) */}
        <div className="absolute top-[-10%] right-[-10%] w-96 h-96 bg-blue-400/20 rounded-full blur-[80px] md:hidden"></div>
        <div className="absolute bottom-[-10%] left-[-10%] w-80 h-80 bg-emerald-400/20 rounded-full blur-[80px] md:hidden"></div>

        <div className="w-full max-w-sm bg-white/80 backdrop-blur-xl p-8 rounded-[2rem] shadow-[0_20px_60px_rgba(0,0,0,0.05)] border border-white relative z-10">
        <div className="w-20 h-20 bg-slate-800 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-slate-800/30">
          <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-white"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>
        </div>
        
        <div className="text-center mb-8">
          <h2 className="text-2xl font-extrabold text-slate-800 mb-2 tracking-tight">เข้าสู่ระบบ</h2>
          <p className="text-sm font-medium text-slate-500">สำหรับเจ้าหน้าที่ดูแลความปลอดภัย</p>
        </div>

        <form className="space-y-5" onSubmit={(e) => { e.preventDefault(); navigate('/dashboard'); }}>
          <div>
            <label className="block text-[13px] font-bold text-slate-700 mb-1.5 ml-1">
              ชื่อผู้ใช้งาน
            </label>
            <input 
              type="text" 
              className="w-full bg-slate-50 border border-slate-200 text-slate-800 text-sm font-bold rounded-2xl px-4 py-4 focus:outline-none focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all placeholder:text-slate-400"
              placeholder="admin"
            />
          </div>
          <div>
            <label className="block text-[13px] font-bold text-slate-700 mb-1.5 ml-1">
              รหัสผ่าน
            </label>
            <input 
              type="password" 
              className="w-full bg-slate-50 border border-slate-200 text-slate-800 text-sm font-bold rounded-2xl px-4 py-4 focus:outline-none focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all placeholder:text-slate-400"
              placeholder="••••••••"
            />
          </div>
          <button 
            type="submit" 
            className="w-full bg-slate-800 text-white font-bold py-4 rounded-2xl mt-6 active:scale-95 transition-transform shadow-[0_10px_25px_rgba(30,41,59,0.3)] hover:bg-slate-900"
          >
            เข้าสู่ระบบ
          </button>
        </form>

        <Link 
          to="/" 
          className="block text-center w-full text-slate-400 font-bold text-sm mt-6 hover:text-slate-600 transition-colors"
        >
          กลับหน้าหลัก
        </Link>
      </div>
      </div>
    </div>
  )
}

export default function App() {
  return (
    <LanguageProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/staff-login" element={<StaffLogin />} />
          <Route path="/dashboard" element={<StaffDashboard />} />
          <Route path="/tourist-login" element={<TouristLoginPage />} />
          <Route path="/TouristPage" element={<TouristPage />} />
          <Route path="/map" element={<TouristMapPage />} />
          <Route path="/places" element={<TouristPlacesPage />} />
          <Route path="/zones-map" element={<ZonesMapPage />} />
          <Route path="/collection" element={<StampCollectionPage />} />
          <Route path="/trip-summary" element={<TripSummaryPage />} />
          <Route path="/services" element={<TouristServicesPage />} />
          <Route path="/settings" element={<TouristSettingsPage />} />
        </Routes>
      </Router>
    </LanguageProvider>
  )
}
