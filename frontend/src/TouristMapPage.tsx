import { useState, useEffect, useCallback, useRef } from 'react';
import { GoogleMap, useJsApiLoader, MarkerF, PolylineF, OverlayViewF } from '@react-google-maps/api';
import * as turf from '@turf/turf';
import { ArrowLeft, Navigation, MapPin, Sailboat, Ship, AlertCircle, AlertTriangle, BookOpen, HelpCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import RouteSelectionModal from './components/RouteSelectionModal';
import StampBookModal from './components/StampBookModal';

const mapContainerStyle = {
  width: '100%',
  height: '100dvh'
};

// จุดศูนย์กลางเริ่มต้น (สวนพฤกษศาสตร์ระยอง จากโปรเจคเก่า)
const defaultCenter = { lat: 12.6525, lng: 101.5440 };

import { PATHS, SCENIC_SPOTS } from './data/mapData';

// Map Theme จากผู้ใช้งาน
const mapTheme = [
  { "elementType": "labels", "stylers": [{ "visibility": "off" }] },
  { "featureType": "administrative", "elementType": "geometry", "stylers": [{ "visibility": "off" }] },
  { "featureType": "administrative.land_parcel", "stylers": [{ "visibility": "off" }] },
  { "featureType": "administrative.neighborhood", "stylers": [{ "visibility": "off" }] },
  { "featureType": "poi", "stylers": [{ "visibility": "off" }] },
  { "featureType": "road", "elementType": "labels.icon", "stylers": [{ "visibility": "off" }] },
  { "featureType": "transit", "stylers": [{ "visibility": "off" }] }
];

const ROUTES = [
  { id: 'kayak_yellow', name: 'เส้นทางคายัค (สีเหลือง)', type: 'kayak', color: 'text-yellow-500', bg: 'bg-yellow-50', strokeColor: '#eab308' },
  { id: 'kayak_green', name: 'เส้นทางคายัค (สีเขียว)', type: 'kayak', color: 'text-green-500', bg: 'bg-green-50', strokeColor: '#22c55e' },
  { id: 'kayak_red', name: 'เส้นทางคายัค (สีแดง)', type: 'kayak', color: 'text-red-500', bg: 'bg-red-50', strokeColor: '#ef4444' },
  { id: 'kayak_purple', name: 'เส้นทางคายัค (สีม่วง)', type: 'kayak', color: 'text-purple-500', bg: 'bg-purple-50', strokeColor: '#a855f7' },
  { id: 'motorboat_white', name: 'เส้นทางเรือยนต์ (สีขาว)', type: 'motorboat', color: 'text-slate-600', bg: 'bg-slate-200', strokeColor: '#f8fafc' },
  { id: 'motorboat_blue', name: 'เส้นทางเรือยนต์ (สีฟ้า)', type: 'motorboat', color: 'text-cyan-500', bg: 'bg-cyan-50', strokeColor: '#06b6d4' },
];

export default function TouristMapPage() {
  const navigate = useNavigate();
  
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY || ''
  });

  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [userPos, setUserPos] = useState<google.maps.LatLngLiteral | null>(null);
  const [activePOI, setActivePOI] = useState<any>(null);
  const [showGpsPopup] = useState(false);
  
  // UI States
  const [selectedRoute, setSelectedRoute] = useState<string | null>(null);
    const [isSimulating, setIsSimulating] = useState(false);
  
  // Modal States
  const [showLocationConsent, setShowLocationConsent] = useState(true);
  const [showExitConfirm, setShowExitConfirm] = useState(false);
  const [showSosPrompt, setShowSosPrompt] = useState(false); // สำหรับกดยืนยันรอบแรก
  const [showSosConfirm, setShowSosConfirm] = useState(false); // หน้าจอกำลังส่งสัญญาณ
    
  // Stamp Collection States
  const [stamps, setStamps] = useState(() => {
    const saved = localStorage.getItem('user_stamps');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error("Failed to parse stamps", e);
      }
    }
    return {
      spot102: false, // Bridge
      spot103: false, // Tree
      quiz: false,    // Quiz
      readComplete: false // Engagement
    };
  });
  
  useEffect(() => {
    localStorage.setItem('user_stamps', JSON.stringify(stamps));
  }, [stamps]);

  const [showStampBook, setShowStampBook] = useState(false);
  const [showQuizModal, setShowQuizModal] = useState(false);
  const [quizError, setQuizError] = useState(false);
  const [showStampToast, setShowStampToast] = useState<{show: boolean, name: string, image: string}>({show: false, name: '', image: ''});
  const [readPois, setReadPois] = useState<number[]>([]);
  
  // Bottom Sheet States
  const [isSheetExpanded, setIsSheetExpanded] = useState(false);
  const touchStartY = useRef<number | null>(null);
  const touchCurrentY = useRef<number | null>(null);

  const handleTouchStart = (e: React.TouchEvent | React.MouseEvent) => {
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
    touchStartY.current = clientY;
  };

  const handleTouchMove = (e: React.TouchEvent | React.MouseEvent) => {
    if (!touchStartY.current) return;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
    touchCurrentY.current = clientY;
  };

  const handleTouchEnd = () => {
    if (touchStartY.current !== null && touchCurrentY.current !== null) {
      const deltaY = touchCurrentY.current - touchStartY.current;
      if (deltaY > 50 && isSheetExpanded) {
        setIsSheetExpanded(false); // Swipe down
      } else if (deltaY < -50 && !isSheetExpanded) {
        setIsSheetExpanded(true); // Swipe up
      }
    }
    touchStartY.current = null;
    touchCurrentY.current = null;
  };

  const userName = localStorage.getItem('tourist_name') || 'นักท่องเที่ยว';

  const simulationIndexRef = useRef(0);
  
  // ใช้ ref สำหรับเก็บสถานะ POI ปัจจุบัน เพื่อป้องกันบั๊ก Closure ภายใน Callback ของ GPS
  const activePoiIdRef = useRef<number | null>(null);

  const onLoad = useCallback(function callback(map: google.maps.Map) {
    setMap(map);
  }, []);

  const onUnmount = useCallback(function callback() {
    setMap(null);
  }, []);

  const handlePoiDetection = useCallback((foundPOI: any) => {
    if (foundPOI && activePoiIdRef.current !== foundPOI.id) {
      activePoiIdRef.current = foundPOI.id;
      setActivePOI(foundPOI);
      if (navigator.vibrate) navigator.vibrate(200);

      // Stamp Logic for Location
      if (foundPOI.id === 102 || foundPOI.id === 103) {
        setStamps((prev: any) => {
          if (!prev[`spot${foundPOI.id}` as keyof typeof prev]) {
            const newState = { ...prev, [`spot${foundPOI.id}`]: true };
            const stampName = foundPOI.id === 102 ? 'สะพานรักษ์เสม็ด' : 'ป่าเสม็ดโบราณ';
            const stampImg = foundPOI.id === 102 ? '/stamps/stamp_bridge.png' : '/stamps/stamp_tree.png';
            setShowStampToast({ show: true, name: stampName, image: stampImg });
            setTimeout(() => setShowStampToast({ show: false, name: '', image: '' }), 4000);
            return newState;
          }
          return prev;
        });
      }
    } else if (!foundPOI && activePoiIdRef.current !== null) {
      activePoiIdRef.current = null;
      setActivePOI(null);
    }
  }, []);

  useEffect(() => {
    if (activePOI && !readPois.includes(activePOI.id)) {
      const newReadPois = [...readPois, activePOI.id];
      setReadPois(newReadPois);
      if (newReadPois.length >= 3 && !stamps.readComplete) {
        setStamps((prev: any) => {
          if (!prev.readComplete) {
            setShowStampToast({ show: true, name: 'นักอ่าน (เปิดดู 3 จุด)', image: '/stamps/stamp_map.png' });
            setTimeout(() => setShowStampToast({ show: false, name: '', image: '' }), 4000);
            return { ...prev, readComplete: true };
          }
          return prev;
        });
      }
    }
  }, [activePOI, readPois, stamps.readComplete]);

  const handleQuizAnswer = (isCorrect: boolean) => {
    if (isCorrect && !stamps.quiz) {
      setShowQuizModal(false);
      setQuizError(false);
      setStamps((prev: any) => {
        setShowStampToast({ show: true, name: 'นักปราชญ์ (ตอบถูก)', image: '/stamps/stamp_quiz.png' });
        setTimeout(() => setShowStampToast({ show: false, name: '', image: '' }), 4000);
        return { ...prev, quiz: true };
      });
    } else if (!isCorrect) {
      setQuizError(true);
    }
  };

  // เริ่มติดตาม GPS ผู้ใช้
  useEffect(() => {
    let watchId: number | null = null;
    if (navigator.geolocation && selectedRoute && !isSimulating && !showLocationConsent) {
      watchId = navigator.geolocation.watchPosition(
        (position) => {
          const currentPos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          setUserPos(currentPos);
          
          // Geofencing
          const userPoint = turf.point([currentPos.lng, currentPos.lat]);
          let foundPOI = null;
          
          for (const poi of SCENIC_SPOTS) {
            const poiPoint = turf.point([poi.position.lng, poi.position.lat]);
            const distanceMeters = turf.distance(userPoint, poiPoint) * 1000;
            if (distanceMeters <= poi.radius) {
              foundPOI = poi;
              break;
            }
          }

          handlePoiDetection(foundPOI);
        },
        (error) => console.error("Error watching position:", error),
        { enableHighAccuracy: true, maximumAge: 10000, timeout: 5000 }
      );
    }

    return () => {
      if (watchId !== null) navigator.geolocation.clearWatch(watchId);
    };
  }, [selectedRoute, isSimulating, showLocationConsent]); // ลบ watchId ออกจาก dependency ป้องกัน Infinite Loop

  // Simulator และการเลื่อนกล้องเมื่อเลือกเส้นทาง
  useEffect(() => {
    if (selectedRoute && map && PATHS[selectedRoute as keyof typeof PATHS]) {
      const path = PATHS[selectedRoute as keyof typeof PATHS];
      if (path && path.length > 0 && !isSimulating) {
        map.panTo(path[0]);
        map.setZoom(17);
      }
    }
  }, [selectedRoute, map]);

  useEffect(() => {
    let interval: ReturnType<typeof setInterval> | null = null;
    if (isSimulating && selectedRoute) {
      const path = PATHS[selectedRoute as keyof typeof PATHS];
      if (path && path.length > 0) {
        interval = setInterval(() => {
          const currentPos = path[simulationIndexRef.current];
          setUserPos(currentPos);
          if (map) map.panTo(currentPos); // เลื่อนกล้องตาม Simulator

          // Geofencing Logic (ทำงานร่วมกับ Simulator)
          const userPoint = turf.point([currentPos.lng, currentPos.lat]);
          let foundPOI = null;
          
          for (const poi of SCENIC_SPOTS) {
            const poiPoint = turf.point([poi.position.lng, poi.position.lat]);
            const distanceMeters = turf.distance(userPoint, poiPoint) * 1000;
            if (distanceMeters <= poi.radius) {
              foundPOI = poi;
              break;
            }
          }
          handlePoiDetection(foundPOI);

          simulationIndexRef.current = (simulationIndexRef.current + 1) % path.length;
        }, 1500); // จำลองการเคลื่อนที่ทุก 1.5 วินาที
      }
    } else {
      simulationIndexRef.current = 0; // รีเซ็ตเมื่อปิด
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isSimulating, selectedRoute, map]);



  const handleSelectRoute = (routeId: string) => {
    setSelectedRoute(routeId);
    localStorage.setItem('trip_start_time', Date.now().toString());
    localStorage.setItem('trip_route', routeId);
  };

  if (!isLoaded) return <div className="flex h-dvh items-center justify-center bg-[#F4F9FF] font-bold text-slate-500">กำลังโหลดแผนที่...</div>;

  return (
    <div className="relative w-full h-dvh font-sans overflow-hidden bg-[#Edf3fa]">
      
      {/* Route Selection Overlay */}
      {!selectedRoute && !showLocationConsent && (
        <RouteSelectionModal 
          routes={ROUTES} 
          onSelectRoute={handleSelectRoute} 
          onCancel={() => setShowExitConfirm(true)} 
        />
      )}

      {/* Top Navigation Bar */}
      <div className="absolute top-0 w-full z-10 px-6 pt-14 pb-6 flex items-center justify-between pointer-events-none">
        <button 
          onClick={() => setShowExitConfirm(true)} 
          className="pointer-events-auto bg-white/80 backdrop-blur-md p-3.5 rounded-[1rem] shadow-[0_8px_20px_rgba(0,0,0,0.08)] text-slate-700 active:scale-90 transition-all"
        >
          <ArrowLeft size={24} strokeWidth={2.5} />
        </button>
        <div className="flex flex-col items-center pointer-events-auto">
          {/* ซ่อนข้อความชื่อแผนที่และ Badge ไว้ตามที่ผู้ใช้ร้องขอ */}
        </div>
        <div className="w-14"></div>
      </div>

      {/* แผนที่ Google Maps */}
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        center={defaultCenter}
        zoom={17} // ซูมเข้ามานิดนึงเพื่อให้เห็น 3D ชัดเจน
        tilt={45} // บังคับเป็น 3D ผ่าน Prop
        mapTypeId="satellite" // บังคับเป็นภาพดาวเทียม
        onLoad={onLoad}
        onUnmount={onUnmount}
        options={{
          disableDefaultUI: true,
          keyboardShortcuts: false, // ปิดการใช้งาน Keyboard Shortcuts ของ Google Maps
          mapTypeId: 'satellite', 
          tilt: 45, // เปลี่ยนเป็นมุมมองเอียง 3D 
          heading: 0, // หันหน้าทิศเหนือ
          styles: mapTheme,
          gestureHandling: 'greedy',
          minZoom: 16.0,
          maxZoom: 30.5,
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
        {/* ปิดการแสดงผลวงสีส้ม (Geofence) ชั่วคราว */}
        {/*
        {ALL_POIS.map((poi) => (
          <React.Fragment key={poi.id}>
            <CircleF
              center={poi.position}
              radius={poi.radius}
              options={{ fillColor: '#F97316', fillOpacity: 0.25, strokeColor: '#F97316', strokeOpacity: 0.8, strokeWeight: 2 }}
            />
          </React.Fragment>
        ))}
        */}

        {selectedRoute && PATHS[selectedRoute as keyof typeof PATHS] && (
          <>
            <PolylineF
              path={PATHS[selectedRoute as keyof typeof PATHS]}
              options={{
                strokeColor: '#0f172a',
                strokeOpacity: 0.7,
                strokeWeight: 6,
                geodesic: true
              }}
            />
            <PolylineF
              path={PATHS[selectedRoute as keyof typeof PATHS]}
              options={{
                strokeColor: ROUTES.find(r => r.id === selectedRoute)?.strokeColor || '#0ea5e9',
                strokeOpacity: 1,
                strokeWeight: 4,
                geodesic: true
              }}
            />
          </>
        )}

        {userPos && (
          <MarkerF
            position={userPos}
            icon={{ path: google.maps.SymbolPath.CIRCLE, scale: 8, fillColor: "#3B82F6", fillOpacity: 1, strokeWeight: 3, strokeColor: "#ffffff" }}
          />
        )}

        {/* จุดสำคัญ (Scenic Spots) ที่ผู้ใช้ระบุมา (แบบสวยงาม) */}
        {selectedRoute && SCENIC_SPOTS.map((spot) => (
          <OverlayViewF
            key={`scenic-${spot.id}`}
            position={spot.position}
            mapPaneName="overlayMouseTarget"
            getPixelPositionOffset={(width, height) => ({
              x: -(width / 2),
              y: -(height / 2),
            })}
          >
            <div 
              onClick={() => setActivePOI(spot as any)}
              className="relative cursor-pointer group flex flex-col items-center justify-center -mt-6"
            >
              {/* Teardrop Map Pin */}
              <div className="w-8 h-8 bg-red-500 rounded-t-full rounded-bl-full rounded-br-none rotate-45 border-2 border-white shadow-md flex items-center justify-center group-hover:scale-110 group-hover:bg-red-600 transition-all origin-bottom-right">
                {/* Inner white circle counter-rotated */}
                <div className="w-2.5 h-2.5 bg-white rounded-full -rotate-45 shadow-inner"></div>
              </div>
              
              {/* Tooltip Label */}
              <div className="absolute top-[120%] left-1/2 -translate-x-1/2 mt-1 bg-slate-900/80 backdrop-blur-sm text-white text-[10px] font-bold px-2.5 py-1 rounded-md opacity-80 group-hover:opacity-100 group-hover:-translate-y-1 transition-all whitespace-nowrap pointer-events-none shadow-lg">
                {spot.name}
              </div>
            </div>
          </OverlayViewF>
        ))}
      </GoogleMap>

      {/* Custom Popup แทนการใช้ alert() */}
      <div className={`absolute top-36 left-1/2 -translate-x-1/2 w-[85%] max-w-sm bg-slate-800/90 backdrop-blur-lg text-white p-4 rounded-2xl shadow-xl flex items-center gap-3 transition-all duration-300 z-50 ${showGpsPopup ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4 pointer-events-none'}`}>
        <AlertCircle size={20} className="text-blue-400 shrink-0" />
        <p className="text-sm font-medium">กำลังค้นหาสัญญาณ GPS ของคุณ กรุณารอสักครู่...</p>
      </div>

      {/* Floating Geofencing Alert / Info Card */}
      {activePOI && (
        <div className={`absolute left-1/2 -translate-x-1/2 w-[92%] max-w-sm bg-white/95 backdrop-blur-xl rounded-[2rem] p-4 shadow-[0_20px_50px_rgba(0,0,0,0.15)] border border-slate-100 flex items-center z-40 transition-all duration-500 animate-in fade-in slide-in-from-bottom-8 ${isSheetExpanded ? 'bottom-[calc(35vh+100px)]' : 'bottom-[100px]'}`}>
          <div className="flex gap-4 items-center flex-1">
            <div className="bg-gradient-to-br from-red-500 to-red-600 p-4 rounded-[1.5rem] text-white shadow-lg shadow-red-500/30 flex-shrink-0">
              <MapPin size={28} strokeWidth={2.5} />
            </div>
            <div className="flex-1 pr-2">
              <h3 className="font-extrabold text-slate-800 text-base mb-1">{activePOI.name}</h3>
              <p className="text-slate-500 text-[11px] font-medium leading-relaxed line-clamp-2">{activePOI.info}</p>
            </div>
          </div>
          {/* Close Button */}
          <button 
            onClick={() => setActivePOI(null)}
            className="absolute top-4 right-4 text-slate-300 hover:text-slate-500 p-1 active:scale-90 transition-transform"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
          </button>
        </div>
      )}

      {/* Bottom Sheet */}
      {selectedRoute && (
        <>
          {/* Backdrop for closing */}
          <div 
            className={`absolute inset-0 z-20 bg-slate-900/20 transition-opacity duration-300 ${isSheetExpanded ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
            onClick={() => setIsSheetExpanded(false)}
          />
          
          <div 
            className={`absolute left-0 right-0 bottom-0 bg-white z-30 rounded-t-[2.5rem] shadow-[0_-10px_40px_rgba(0,0,0,0.15)] transition-transform duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] ${isSheetExpanded ? 'translate-y-0' : 'translate-y-[calc(100%-110px)]'}`}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            {/* Handle & Collapsed Header */}
            <div 
              className="h-[88px] px-6 flex items-center justify-between cursor-pointer relative"
              onClick={() => setIsSheetExpanded(!isSheetExpanded)}
            >
              {/* Drag Indicator */}
              <div className="absolute top-3 left-1/2 -translate-x-1/2 w-12 h-1.5 bg-slate-200 rounded-full"></div>
              
              <div className="flex items-center gap-4 mt-2">
                <div className={`p-3.5 rounded-[1.2rem] shadow-sm ${ROUTES.find(r => r.id === selectedRoute)?.bg || 'bg-blue-50'} ${ROUTES.find(r => r.id === selectedRoute)?.color || 'text-blue-500'}`}>
                  {selectedRoute.includes('kayak') ? <Sailboat size={26} strokeWidth={2} /> : <Ship size={26} strokeWidth={2} />}
                </div>
                <div>
                  <h3 className="font-extrabold text-slate-800 text-base mb-0.5">{ROUTES.find(r => r.id === selectedRoute)?.name}</h3>
                  <div className="flex items-center gap-2">
                    <span className="text-slate-500 text-[13px] font-medium">รหัสเรือ:</span>
                    <span className="bg-slate-100 text-slate-600 px-2 py-0.5 rounded text-[11px] font-bold">BG-102</span>
                  </div>
                </div>
              </div>
              
              {/* Chevron or indicator */}
              <div className={`text-slate-400 bg-slate-50 p-2 rounded-full transition-transform duration-300 ${isSheetExpanded ? 'rotate-180' : ''}`}>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="18 15 12 9 6 15"></polyline></svg>
              </div>
            </div>

            {/* Expanded Content */}
            <div className="px-6 pb-[calc(2.5rem+env(safe-area-inset-bottom,20px))] pt-2 h-[40dvh] flex flex-col">
              
              {/* Passenger Info & End Trip */}
              <div className="bg-slate-50 p-4 rounded-3xl border border-slate-100 flex items-center justify-between mb-auto">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-white shadow-sm border border-slate-100 rounded-full flex items-center justify-center text-blue-500 font-bold text-lg">
                    {userName.charAt(0)}
                  </div>
                  <div>
                    <p className="text-[11px] text-slate-400 font-bold mb-0.5 uppercase tracking-wider">ผู้โดยสาร</p>
                    <p className="text-sm font-extrabold text-slate-700">{userName}</p>
                  </div>
                </div>
                <button 
                  onClick={() => setShowExitConfirm(true)}
                  className="bg-slate-800 text-white text-[11px] font-bold px-4 py-2.5 rounded-xl shadow-md active:scale-95 transition-transform"
                >
                  สิ้นสุดทริป
                </button>
              </div>

              {/* Action Buttons: SOS & Nav */}
              <div className="flex gap-3 mt-6">
                {/* Stamp Book Button */}
                <button 
                  onClick={() => setShowStampBook(true)}
                  className="w-16 flex-shrink-0 flex flex-col items-center justify-center rounded-[1.5rem] shadow-lg active:scale-95 transition-transform border bg-orange-50 border-orange-100 relative group"
                >
                  <div className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center border-2 border-white z-10 shadow-sm">
                    {Object.values(stamps).filter(Boolean).length}
                  </div>
                  <BookOpen size={24} strokeWidth={2.5} className="text-orange-500" />
                </button>

                {/* SOS Button (Big) */}
                <button 
                  onClick={() => setShowSosPrompt(true)}
                  className="flex-1 bg-red-600 text-white py-4 rounded-[1.5rem] shadow-[0_12px_24px_rgba(220,38,38,0.35)] active:scale-95 transition-transform flex items-center justify-center gap-2"
                >
                  <AlertTriangle size={24} strokeWidth={2.5} />
                  <span className="font-black text-lg tracking-widest">SOS</span>
                </button>

                {/* Simulator Toggle */}
                <button 
                  onClick={() => setIsSimulating(!isSimulating)}
                  className={`w-16 flex-shrink-0 flex items-center justify-center rounded-[1.5rem] shadow-lg active:scale-95 transition-transform border ${isSimulating ? 'bg-red-50 text-red-600 border-red-200 animate-pulse shadow-red-100' : 'bg-white text-blue-600 border-slate-100 shadow-slate-200/50'}`}
                >
                  {isSimulating ? <AlertCircle size={26} strokeWidth={2.5} /> : <Navigation size={26} strokeWidth={2.5} className="ml-[-2px] mb-[2px]" />}
                </button>
              </div>
            </div>
          </div>
        </>
      )}

      {/* --- Pop-ups Overlays --- */}

      {/* 1. Location Consent */}
      {showLocationConsent && (
        <div className="absolute inset-0 z-[100] bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-6">
          <div className="bg-white p-6 rounded-[2rem] shadow-2xl w-full max-w-sm text-center transform transition-all">
            <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-inner">
              <MapPin size={32} />
            </div>
            <h2 className="text-xl font-bold text-slate-800 mb-2">อนุญาตการเข้าถึงพิกัด</h2>
            <p className="text-slate-500 text-sm mb-6 leading-relaxed">ระบบจำเป็นต้องเข้าถึงพิกัด GPS ของคุณเพื่อใช้ในการติดตามเรือและแจ้งเตือนความปลอดภัยระหว่างการเดินทาง</p>
            <button 
              onClick={() => setShowLocationConsent(false)} 
              className="w-full bg-blue-600 text-white font-bold py-3.5 rounded-2xl shadow-[0_8px_16px_rgba(37,99,235,0.25)] active:scale-95 transition-transform"
            >
              ยินยอมและเปิดแผนที่
            </button>
          </div>
        </div>
      )}

      {/* 2. Exit Confirmation */}
      {showExitConfirm && (
        <div className="absolute inset-0 z-[100] bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-6">
          <div className="bg-white p-6 rounded-[2rem] shadow-2xl w-full max-w-sm text-center">
            <div className="w-16 h-16 bg-red-50 text-red-500 rounded-full flex items-center justify-center mx-auto mb-4 border-4 border-red-100">
              <AlertTriangle size={28} strokeWidth={2.5} />
            </div>
            <h2 className="text-xl font-bold text-slate-800 mb-2">
              {selectedRoute ? 'ต้องการสิ้นสุดการเดินทาง?' : 'ต้องการออกจากแผนที่?'}
            </h2>
            <p className="text-slate-500 text-sm mb-6 leading-relaxed">
              {selectedRoute 
                ? 'ระบบจะพาคุณไปยังหน้าสรุปทริปการเดินทาง และหยุดการติดตามตำแหน่ง'
                : 'หากคุณออกจากหน้านี้ ระบบติดตามตำแหน่งจะหยุดทำงานทันที'
              }
            </p>
            <div className="flex gap-3">
              <button 
                onClick={() => setShowExitConfirm(false)} 
                className="flex-1 bg-slate-100 text-slate-600 font-bold py-3 rounded-2xl active:scale-95 transition-transform"
              >
                ยกเลิก
              </button>
              <button 
                onClick={() => {
                  if (selectedRoute) {
                    navigate('/trip-summary');
                  } else {
                    navigate(-1);
                  }
                }} 
                className="flex-1 bg-red-500 text-white font-bold py-3 rounded-2xl shadow-[0_8px_16px_rgba(239,68,68,0.25)] active:scale-95 transition-transform"
              >
                {selectedRoute ? 'สิ้นสุดทริป' : 'ยืนยันการออก'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 2.5 SOS Initial Prompt (ยืนยันก่อนส่ง) */}
      {showSosPrompt && (
        <div className="absolute inset-0 z-[100] bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-6">
          <div className="bg-white p-6 rounded-[2rem] shadow-2xl w-full max-w-sm text-center">
            <div className="w-16 h-16 bg-red-50 text-red-500 rounded-full flex items-center justify-center mx-auto mb-4 border-4 border-red-100">
              <AlertTriangle size={28} strokeWidth={2.5} />
            </div>
            <h2 className="text-xl font-bold text-slate-800 mb-2">ยืนยันการขอความช่วยเหลือ?</h2>
            <p className="text-slate-500 text-sm mb-6 leading-relaxed">คุณต้องการส่งสัญญาณ SOS และพิกัดของคุณไปยังเจ้าหน้าที่ใช่หรือไม่?</p>
            <div className="flex gap-3">
              <button 
                onClick={() => setShowSosPrompt(false)} 
                className="flex-1 bg-slate-100 text-slate-600 font-bold py-3 rounded-2xl active:scale-95 transition-transform"
              >
                ยกเลิก
              </button>
              <button 
                onClick={() => {
                  setShowSosPrompt(false);
                  setShowSosConfirm(true);
                }} 
                className="flex-1 bg-red-500 text-white font-bold py-3 rounded-2xl shadow-[0_8px_16px_rgba(239,68,68,0.25)] active:scale-95 transition-transform"
              >
                ยืนยันการส่ง
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 3. SOS Confirmation / Sending Screen */}
      {showSosConfirm && (
        <div className="absolute inset-0 z-[100] bg-[#fafafa] flex flex-col items-center justify-between p-8 pb-12 animate-in fade-in duration-300">
          
          <div className="w-full pt-10"></div> {/* Top spacing */}

          {/* Center Content */}
          <div className="flex flex-col items-center w-full mt-10">
            {/* Pulsing SOS Radar */}
            <div className="relative flex items-center justify-center mb-16 w-[280px] h-[280px]">
              {/* Static Concentric Rings */}
              <div className="absolute inset-0 border-[2px] border-[#fde5e5] rounded-full"></div>
              <div className="absolute inset-8 border-[2.5px] border-[#facaca] rounded-full"></div>
              <div className="absolute inset-16 border-[3px] border-[#f7a2a2] rounded-full"></div>
              
              {/* Pulsing glow */}
              <div className="absolute inset-24 bg-red-400/40 rounded-full animate-[ping_2s_cubic-bezier(0,0,0.2,1)_infinite]"></div>

              {/* Core Button */}
              <div className="absolute inset-24 bg-[#ea6e6e] text-white rounded-full flex items-center justify-center z-10 shadow-[0_10px_30px_rgba(234,110,110,0.4)]">
                <span className="text-3xl font-bold tracking-widest">SOS</span>
              </div>
            </div>

            <h2 className="text-[22px] font-bold text-slate-800 mb-3">กำลังส่งสัญญาณ SOS</h2>
            <p className="text-[#737373] text-center px-4 text-[15px] font-medium leading-relaxed">
              ตำแหน่งของคุณจะถูกส่งไปยัง<br/>เจ้าหน้าที่ทันที
            </p>
          </div>

          {/* Bottom Cancel Button */}
          <div className="w-full max-w-sm mt-auto">
            <button 
              onClick={() => setShowSosConfirm(false)} 
              className="w-full bg-[#c82828] text-white font-bold text-lg py-4 rounded-[1rem] shadow-[0_8px_20px_rgba(200,40,40,0.25)] active:scale-95 transition-transform"
            >
              ยกเลิก
            </button>
          </div>
        </div>
      )}

      {/* --- Gamification UI (Stamp Collection) --- */}

      {/* Stamp Received Toast */}
      {showStampToast.show && (
        <div className="absolute top-36 left-1/2 -translate-x-1/2 z-50 bg-white/95 backdrop-blur-md px-5 py-3 rounded-[2rem] shadow-[0_20px_50px_rgba(0,0,0,0.15)] border border-slate-100 flex items-center gap-4 animate-in slide-in-from-top-4 fade-in">
          <div className="w-12 h-12 rounded-full overflow-hidden shrink-0 border border-slate-100 bg-slate-50 flex items-center justify-center relative">
             <img src={showStampToast.image} alt="Stamp" className="absolute w-full h-full object-cover opacity-30 animate-[ping_1.5s_cubic-bezier(0,0,0.2,1)_1]" style={{ animationIterationCount: 1 }} />
             <img src={showStampToast.image} alt="Stamp" className="absolute w-10 h-10 object-contain z-10" />
          </div>
          <div className="pr-2">
            <p className="text-[10px] font-bold text-orange-500 uppercase tracking-widest mb-0.5">ได้รับสแตมป์ใหม่!</p>
            <p className="text-sm font-extrabold text-slate-800">{showStampToast.name}</p>
          </div>
        </div>
      )}

      {/* Stamp Book Modal */}
      {showStampBook && (
        <StampBookModal 
          stamps={stamps} 
          readCount={readPois.length}
          onClose={() => setShowStampBook(false)} 
          onOpenQuiz={() => setShowQuizModal(true)}
          isMapPage={true}
        />
      )}

      {/* Quiz Modal */}
      {showQuizModal && (
        <div className="absolute inset-0 z-[120] bg-slate-900/70 backdrop-blur-sm flex items-center justify-center p-6 animate-in fade-in">
          <div className="bg-white rounded-[2rem] shadow-2xl w-full max-w-sm overflow-hidden">
            <div className="bg-pink-500 p-6 text-white text-center">
              <HelpCircle size={40} className="mx-auto mb-2 opacity-90" />
              <h2 className="text-xl font-black">คำถามทดสอบความรู้!</h2>
            </div>
            <div className="p-6">
              <p className="text-slate-700 text-base font-bold mb-4 text-center">
                "ต้นเสม็ดที่นี่ มีลักษณะเด่นอย่างไร?"
              </p>
              {quizError && (
                <div className="bg-red-50 text-red-500 text-sm font-bold p-3 rounded-xl mb-4 text-center animate-in fade-in zoom-in-95">
                  เสียใจด้วย คำตอบยังไม่ถูก ลองเลือกใหม่นะ!
                </div>
              )}
              <div className="flex flex-col gap-3">
                <button onClick={() => handleQuizAnswer(false)} className="bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-700 font-medium p-4 rounded-2xl text-left transition-colors">
                  ก. มีหนามแหลมคมรอบต้น
                </button>
                <button onClick={() => handleQuizAnswer(true)} className="bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-700 font-medium p-4 rounded-2xl text-left transition-colors active:bg-pink-50">
                  ข. เปลือกไม้ลอกเป็นแผ่นคล้ายกระดาษได้
                </button>
                <button onClick={() => handleQuizAnswer(false)} className="bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-700 font-medium p-4 rounded-2xl text-left transition-colors">
                  ค. ออกผลสีแดงรับประทานได้
                </button>
              </div>
              <button 
                onClick={() => { setShowQuizModal(false); setQuizError(false); }}
                className="mt-6 w-full text-slate-400 font-bold text-sm py-2 active:scale-95 transition-transform"
              >
                ข้ามไปก่อน
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
