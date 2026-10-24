import { useState, useCallback } from 'react';
import StaffSidebar from './components/StaffSidebar';
import { GoogleMap, useJsApiLoader, OverlayViewF } from '@react-google-maps/api';
import { AlertTriangle, Users, Anchor, CheckCircle2, Navigation, Phone, X } from 'lucide-react';
import SystemOverview from './components/dashboard/SystemOverview';
import TouristListTable from './components/dashboard/TouristListTable';
import SOSHistoryLog from './components/dashboard/SOSHistoryLog';
import StaffSettings from './components/dashboard/StaffSettings';

const mapContainerStyle = {
  width: '100%',
  height: '100%',
  borderRadius: '1rem'
};

const defaultCenter = { lat: 12.6525, lng: 101.5440 };

// Light Mode Theme for Map
const mapTheme = [
  { "featureType": "poi", "stylers": [{ "visibility": "off" }] },
  { "featureType": "transit", "stylers": [{ "visibility": "off" }] }
];

const MOCK_BOATS = [
  { id: 'boat-1', name: 'สมชาย ใจดี', type: 'kayak', color: 'bg-green-500', routeName: 'เส้นทางคายัค', pos: { lat: 12.6515, lng: 101.5430 }, status: 'active', phone: '081-234-5678', time: '10:45' },
  { id: 'boat-2', name: 'วิชัย รักน้ำ', type: 'motorboat', color: 'bg-blue-500', routeName: 'เส้นทางเรือยนต์', pos: { lat: 12.6535, lng: 101.5450 }, status: 'active', phone: '089-876-5432', time: '11:20' },
  { id: 'boat-3', name: 'สมศรี มีสุข', type: 'kayak', color: 'bg-red-500', routeName: 'เส้นทางคายัค', pos: { lat: 12.6520, lng: 101.5460 }, status: 'sos', phone: '085-555-5555', time: '11:55' },
  { id: 'boat-4', name: 'อำนาจ ชาญชัย', type: 'kayak', color: 'bg-green-500', routeName: 'เส้นทางคายัค', pos: { lat: 12.6540, lng: 101.5420 }, status: 'active', phone: '082-333-4444', time: '12:10' }
];

export default function StaffDashboard() {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY || ''
  });

  const [, setMap] = useState<google.maps.Map | null>(null);
  const [selectedBoat, setSelectedBoat] = useState<any>(null);
  const [activeTab, setActiveTab] = useState('map');

  // Stats
  const totalActive = MOCK_BOATS.filter(b => b.status === 'active').length;
  const totalSOS = MOCK_BOATS.filter(b => b.status === 'sos').length;
  const totalVisitors = MOCK_BOATS.length;

  const onLoad = useCallback(function callback(mapInstance: google.maps.Map) {
    setMap(mapInstance);
  }, []);

  const onUnmount = useCallback(function callback() {
    setMap(null);
  }, []);

  return (
    <div className="flex h-screen bg-slate-50 font-sans overflow-hidden">
      <StaffSidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        {activeTab === 'map' && (
          <div className="flex flex-col h-full overflow-hidden">
            {/* Header / KPI Cards */}
            <div className="p-6 shrink-0">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-extrabold text-slate-800 tracking-tight">แผนที่ติดตาม (Live Tracking)</h2>
              <p className="text-slate-500 text-sm font-medium mt-1">ศูนย์ควบคุมความปลอดภัย สวนพฤกษศาสตร์ระยอง</p>
            </div>
            {totalSOS > 0 && (
              <div className="bg-red-50 text-red-600 px-4 py-2 rounded-xl flex items-center gap-2 border border-red-200 animate-pulse shadow-sm shadow-red-100">
                <AlertTriangle size={20} strokeWidth={2.5} />
                <span className="font-bold text-sm">ตรวจพบสัญญาณ SOS!</span>
              </div>
            )}
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 flex items-center gap-4">
              <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center shrink-0">
                <Anchor size={24} strokeWidth={2.5} />
              </div>
              <div>
                <p className="text-slate-400 text-xs font-bold uppercase tracking-wider mb-1">เรือที่กำลังใช้งาน</p>
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl font-black text-slate-800">{totalActive}</span>
                  <span className="text-slate-400 text-sm font-semibold">ลำ</span>
                </div>
              </div>
            </div>
            
            <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 flex items-center gap-4">
              <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center shrink-0">
                <Users size={24} strokeWidth={2.5} />
              </div>
              <div>
                <p className="text-slate-400 text-xs font-bold uppercase tracking-wider mb-1">นักท่องเที่ยว (วันนี้)</p>
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl font-black text-slate-800">{totalVisitors}</span>
                  <span className="text-slate-400 text-sm font-semibold">คน</span>
                </div>
              </div>
            </div>

            <div className={`p-5 rounded-2xl shadow-sm border flex items-center gap-4 transition-all ${totalSOS > 0 ? 'bg-red-600 border-red-500 text-white shadow-red-500/30' : 'bg-white border-slate-100 text-slate-800'}`}>
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${totalSOS > 0 ? 'bg-white/20 text-white' : 'bg-slate-50 text-slate-400'}`}>
                {totalSOS > 0 ? <AlertTriangle size={24} strokeWidth={2.5} /> : <CheckCircle2 size={24} strokeWidth={2.5} />}
              </div>
              <div>
                <p className={`text-xs font-bold uppercase tracking-wider mb-1 ${totalSOS > 0 ? 'text-red-100' : 'text-slate-400'}`}>แจ้งเตือนฉุกเฉิน (SOS)</p>
                <div className="flex items-baseline gap-2">
                  <span className={`text-2xl font-black ${totalSOS > 0 ? 'text-white' : 'text-slate-800'}`}>{totalSOS}</span>
                  <span className={`text-sm font-semibold ${totalSOS > 0 ? 'text-red-100' : 'text-slate-400'}`}>เคส</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Map Section */}
        <div className="px-6 pb-6 flex-1 min-h-0 relative">
          <div className="w-full h-full bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden relative">
            {isLoaded ? (
              <GoogleMap
                mapContainerStyle={mapContainerStyle}
                center={defaultCenter}
                zoom={16}
                tilt={45}
                mapTypeId="satellite"
                onLoad={onLoad}
                onUnmount={onUnmount}
                options={{
                  disableDefaultUI: false,
                  mapTypeControl: false,
                  styles: mapTheme,
                  mapTypeId: 'satellite',
                  tilt: 45,
                  restriction: {
                    latLngBounds: {
                      north: 12.665,
                      south: 12.640,
                      east: 101.560,
                      west: 101.530,
                    },
                    strictBounds: true,
                  }
                }}
              >
                {/* Render Mock Boats */}
                {MOCK_BOATS.map((boat) => (
                  <OverlayViewF
                    key={boat.id}
                    position={boat.pos}
                    mapPaneName="overlayMouseTarget"
                    getPixelPositionOffset={(w, h) => ({ x: -(w / 2), y: -(h / 2) })}
                  >
                    <div 
                      onClick={() => setSelectedBoat(boat)}
                      className={`relative cursor-pointer group flex flex-col items-center justify-center transition-all ${boat.status === 'sos' ? 'animate-pulse' : ''}`}
                    >
                      {boat.status === 'sos' && (
                        <div className="absolute inset-0 bg-red-500 rounded-full animate-ping opacity-50 scale-150"></div>
                      )}
                      <div className={`w-10 h-10 rounded-full border-4 shadow-lg flex items-center justify-center relative z-10 transition-transform ${
                        selectedBoat?.id === boat.id ? 'scale-110 border-white' : 'border-white group-hover:scale-110'
                      } ${boat.status === 'sos' ? 'bg-red-600' : boat.color}`}>
                        <Navigation size={18} strokeWidth={3} className={`text-white ${boat.type === 'kayak' ? '' : 'rotate-45'}`} />
                      </div>
                      
                      {/* Name Label */}
                      <div className={`absolute top-full mt-1.5 px-2.5 py-1 rounded-md text-[10px] font-bold shadow-md whitespace-nowrap z-20 ${
                        boat.status === 'sos' ? 'bg-red-600 text-white' : 'bg-slate-800/90 text-white backdrop-blur-sm'
                      }`}>
                        {boat.name}
                      </div>
                    </div>
                  </OverlayViewF>
                ))}
              </GoogleMap>
            ) : (
              <div className="w-full h-full flex items-center justify-center text-slate-400 font-bold">กำลังโหลดแผนที่...</div>
            )}
            
            {/* Boat Detail Floating Card */}
            {selectedBoat && (
              <div className="absolute top-6 left-6 w-80 bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-slate-100 p-5 z-30 animate-in slide-in-from-left-4 fade-in duration-300">
                <button 
                  onClick={() => setSelectedBoat(null)}
                  className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 active:scale-90 transition-all bg-slate-50 p-1.5 rounded-full"
                >
                  <X size={18} strokeWidth={2.5} />
                </button>
                
                <div className="flex items-center gap-3 mb-4 pr-8">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 shadow-inner ${selectedBoat.status === 'sos' ? 'bg-red-100 text-red-600' : 'bg-blue-50 text-blue-600'}`}>
                    {selectedBoat.status === 'sos' ? <AlertTriangle size={24} strokeWidth={2.5} /> : <Anchor size={24} strokeWidth={2.5} />}
                  </div>
                  <div>
                    <h3 className="font-extrabold text-slate-800 text-base">{selectedBoat.name}</h3>
                    <p className={`text-xs font-bold ${selectedBoat.status === 'sos' ? 'text-red-500' : 'text-emerald-500'}`}>
                      {selectedBoat.status === 'sos' ? 'แจ้งเหตุฉุกเฉิน' : 'กำลังล่องเรือ'}
                    </p>
                  </div>
                </div>
                
                <div className="space-y-3 bg-slate-50 p-4 rounded-xl border border-slate-100">
                  <div>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wide mb-1">เส้นทางที่เลือก</p>
                    <div className="flex items-center gap-2">
                      <div className={`w-3 h-3 rounded-full ${selectedBoat.color}`}></div>
                      <span className="text-sm font-semibold text-slate-700">{selectedBoat.routeName}</span>
                    </div>
                  </div>
                  
                  <div className="pt-2 border-t border-slate-200">
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wide mb-1">เบอร์โทรติดต่อ</p>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-bold text-slate-800">{selectedBoat.phone}</span>
                    </div>
                  </div>
                </div>
                
                <p className="text-[10px] text-center text-slate-400 font-medium mt-4">
                  อัพเดทล่าสุดเมื่อ {selectedBoat.time} น.
                </p>
              </div>
            )}
          </div>
        </div>
          </div>
        )}
        {activeTab === 'overview' && <SystemOverview />}
        {activeTab === 'tourists' && <TouristListTable />}
        {activeTab === 'sos' && <SOSHistoryLog />}
        {activeTab === 'settings' && <StaffSettings />}
      </div>
    </div>
  );
}
