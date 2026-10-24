import { useState, useCallback } from 'react';
import { GoogleMap, useJsApiLoader, PolygonF, OverlayViewF } from '@react-google-maps/api';
import { ArrowLeft, MapPin } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ALL_POIS } from './data/mapData';
import { ZONE_POLYGONS, ZONE_CONFIGS } from './data/zonePolygons';

const mapContainerStyle = { width: '100%', height: '100dvh' };
const defaultCenter = { lat: 12.6525, lng: 101.5440 };

const mapTheme = [
  { "elementType": "labels", "stylers": [{ "visibility": "off" }] },
  { "featureType": "administrative", "elementType": "geometry", "stylers": [{ "visibility": "off" }] },
  { "featureType": "administrative.land_parcel", "stylers": [{ "visibility": "off" }] },
  { "featureType": "administrative.neighborhood", "stylers": [{ "visibility": "off" }] },
  { "featureType": "poi", "stylers": [{ "visibility": "off" }] },
  { "featureType": "road", "elementType": "labels.icon", "stylers": [{ "visibility": "off" }] },
  { "featureType": "transit", "stylers": [{ "visibility": "off" }] }
];

export default function ZonesMapPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY || ''
  });

  const [, setMap] = useState<google.maps.Map | null>(null);
  const [activePOI, setActivePOI] = useState<any>(null);

  const onLoad = useCallback(function callback(mapInstance: google.maps.Map) {
    setMap(mapInstance);
    
    // ดึงพิกัดจากหน้าสถานที่แนะนำ
    const targetPoiId = location.state?.targetPoiId;
    if (targetPoiId) {
      const targetPoi = ALL_POIS.find(p => p.id === targetPoiId);
      if (targetPoi && targetPoi.position) {
        setActivePOI(targetPoi);
        // เลื่อนไปยังหมุด (Pan) และซูมเข้าแบบ 3D
        setTimeout(() => {
          mapInstance.panTo(targetPoi.position);
          mapInstance.setZoom(18);
        }, 500);
      }
    }
  }, [location.state]);

  const onUnmount = useCallback(function callback() {
    setMap(null);
  }, []);

  if (!isLoaded) return <div className="h-dvh w-full flex items-center justify-center bg-slate-50"><p>กำลังโหลดแผนที่...</p></div>;

  return (
    <div className="h-dvh w-full relative">
      <div className="absolute top-14 left-6 z-10 flex gap-3">
        <button 
          onClick={() => navigate(-1)} 
          className="bg-white/90 backdrop-blur-md p-3.5 rounded-[1rem] shadow-md text-slate-700 active:scale-90 transition-all"
        >
          <ArrowLeft size={24} strokeWidth={2.5} />
        </button>
      </div>

      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        center={defaultCenter}
        zoom={15}
        tilt={45} // 3D
        mapTypeId="satellite" // ภาพดาวเทียม
        onLoad={onLoad}
        onUnmount={onUnmount}
        options={{
          disableDefaultUI: true,
          keyboardShortcuts: false,
          mapTypeId: 'satellite',
          tilt: 45, // 3D
          styles: mapTheme,
          gestureHandling: 'greedy'
        }}
      >
        {/* Render Zones */}
        {Object.entries(ZONE_POLYGONS).map(([zoneKey, path]) => (
          <PolygonF
            key={`zone-${zoneKey}`}
            path={path}
            options={{
              fillColor: ZONE_CONFIGS[zoneKey as keyof typeof ZONE_CONFIGS]?.color || '#3b82f6',
              fillOpacity: 0.15,
              strokeColor: ZONE_CONFIGS[zoneKey as keyof typeof ZONE_CONFIGS]?.color || '#3b82f6',
              strokeOpacity: 0.8,
              strokeWeight: 2,
            }}
          />
        ))}

        {/* Render POIs (Bases) */}
        {ALL_POIS.map((poi) => (
          <OverlayViewF
            key={`poi-${poi.id}`}
            position={poi.position}
            mapPaneName="overlayMouseTarget"
            getPixelPositionOffset={(width, height) => ({ x: -(width / 2), y: -(height / 2) })}
          >
            <div 
              onClick={() => setActivePOI(poi)}
              className="relative cursor-pointer group flex flex-col items-center justify-center -mt-6"
            >
              {/* Teardrop Map Pin */}
              <div className={`w-8 h-8 rounded-t-full rounded-bl-full rounded-br-none rotate-45 border-2 border-white shadow-md flex items-center justify-center transition-all origin-bottom-right ${activePOI?.id === poi.id ? 'bg-orange-500 scale-110 shadow-orange-500/50' : 'bg-blue-500 group-hover:scale-110 group-hover:bg-blue-600'}`}>
                <div className="w-2.5 h-2.5 bg-white rounded-full -rotate-45 shadow-inner"></div>
              </div>
              
              {/* Tooltip Label */}
              <div className="absolute top-[120%] left-1/2 -translate-x-1/2 mt-1 bg-slate-900/80 backdrop-blur-sm text-white text-[10px] font-bold px-2.5 py-1 rounded-md opacity-80 group-hover:opacity-100 group-hover:-translate-y-1 transition-all whitespace-nowrap pointer-events-none shadow-lg">
                {poi.name}
              </div>
            </div>
          </OverlayViewF>
        ))}
      </GoogleMap>

      {/* POI Info Card */}
      {activePOI && (
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 w-[92%] max-w-sm bg-white/95 backdrop-blur-xl rounded-[2rem] p-4 shadow-[0_20px_50px_rgba(0,0,0,0.15)] border border-slate-100 flex items-center z-40 animate-in fade-in slide-in-from-bottom-8 duration-500">
          <div className="flex gap-4 items-center flex-1">
            <div className="bg-gradient-to-br from-orange-400 to-orange-500 p-4 rounded-[1.5rem] text-white shadow-lg shadow-orange-500/30 flex-shrink-0">
              <MapPin size={28} strokeWidth={2.5} />
            </div>
            <div className="flex-1 pr-2">
              <h3 className="font-extrabold text-slate-800 text-base mb-1">{activePOI.name}</h3>
              <p className="text-slate-500 text-[11px] font-medium leading-relaxed line-clamp-2">{activePOI.info}</p>
            </div>
          </div>
          <button 
            onClick={() => setActivePOI(null)}
            className="absolute top-4 right-4 text-slate-300 hover:text-slate-500 p-1 active:scale-90 transition-transform"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
          </button>
        </div>
      )}
    </div>
  );
}
