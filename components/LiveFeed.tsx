
import React, { useEffect, useRef, useState } from 'react';

interface LiveFeedProps {
  onClose: () => void;
}

const LiveFeed: React.FC<LiveFeedProps> = ({ onClose }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isLive, setIsLive] = useState(false);
  const [stationName, setStationName] = useState('Station Alpha - District 4');

  useEffect(() => {
    let stream: MediaStream | null = null;
    
    async function setupCamera() {
      try {
        stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          setIsLive(true);
        }
      } catch (err) {
        console.error("Camera access denied or unavailable", err);
      }
    }

    setupCamera();

    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  return (
    <div className="h-[calc(100vh-250px)] flex flex-col space-y-4 animate-fadeIn">
      <div className="flex justify-between items-center bg-white p-4 rounded-xl shadow-sm border border-slate-200">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <span className={`w-3 h-3 rounded-full ${isLive ? 'bg-red-500 animate-pulse' : 'bg-slate-300'}`}></span>
            <span className="font-bold text-slate-800 uppercase tracking-widest text-sm">Live Feed</span>
          </div>
          <div className="h-6 w-px bg-slate-200"></div>
          <select 
            value={stationName}
            onChange={(e) => setStationName(e.target.value)}
            className="bg-transparent font-medium text-slate-600 outline-none"
          >
            <option>Station Alpha - District 4</option>
            <option>Station Bravo - District 4</option>
            <option>Station Charlie - District 2</option>
          </select>
        </div>
        <div className="text-sm font-mono text-slate-500">
          {new Date().toLocaleTimeString()} | 06/02/2026
        </div>
      </div>

      <div className="flex-grow bg-slate-900 rounded-2xl overflow-hidden relative shadow-2xl border-4 border-slate-800">
        {isLive ? (
          <video 
            ref={videoRef} 
            autoPlay 
            muted 
            playsInline 
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="absolute inset-0 flex flex-col items-center justify-center text-slate-500 space-y-4">
            <i className="fas fa-video-slash text-6xl"></i>
            <p className="text-lg">Waiting for secure connection...</p>
          </div>
        )}
        
        {/* Overlays */}
        <div className="absolute top-6 left-6 pointer-events-none">
          <div className="bg-black/40 backdrop-blur-md text-white px-4 py-2 rounded border border-white/20">
            <p className="text-[10px] font-bold uppercase tracking-tighter opacity-70">Source ID</p>
            <p className="font-mono text-sm">SEC-VTR-D04-ALPHA</p>
          </div>
        </div>

        <div className="absolute bottom-6 right-6 flex space-x-2">
          <div className="bg-black/60 text-white px-3 py-1 rounded text-xs flex items-center">
            <i className="fas fa-signal mr-2 text-green-400"></i>
            1080p | 60FPS
          </div>
          <div className="bg-red-600 text-white px-3 py-1 rounded text-xs font-bold uppercase">
            Rec
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200">
          <p className="text-xs font-bold text-slate-400 uppercase">Current Capacity</p>
          <p className="text-2xl font-bold text-slate-800">12 <span className="text-sm font-normal text-slate-400">/ 50</span></p>
        </div>
        <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200">
          <p className="text-xs font-bold text-slate-400 uppercase">Est. Wait Time</p>
          <p className="text-2xl font-bold text-slate-800">4 <span className="text-sm font-normal text-slate-400">min</span></p>
        </div>
        <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200">
          <p className="text-xs font-bold text-slate-400 uppercase">Staff Active</p>
          <p className="text-2xl font-bold text-slate-800">8</p>
        </div>
        <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200">
          <p className="text-xs font-bold text-slate-400 uppercase">Alert Status</p>
          <p className="text-2xl font-bold text-green-600">Clear</p>
        </div>
      </div>
    </div>
  );
};

export default LiveFeed;
