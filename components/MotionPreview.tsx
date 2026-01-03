
import React, { useState, useEffect } from 'react';

interface Props {
  type: string;
}

const MotionPreview: React.FC<Props> = ({ type }) => {
  const [key, setKey] = useState(0);
  const [variation, setVariation] = useState(0);

  const replay = () => setKey(prev => prev + 1);

  useEffect(() => {
    setVariation(0);
  }, [type]);

  const renderPreview = () => {
    const props = { key, variation };
    switch (type) {
      case 'counter': return <CounterPreview {...props} />;
      case 'text-slide': return <TextSlidePreview {...props} />;
      case 'bar-growth': return <BarGrowthPreview {...props} />;
      case 'mask-push': return <MaskPushPreview {...props} />;
      case 'camera-zoom': return <CameraZoomPreview {...props} />;
      case 'shape-trim': return <ShapeTrimPreview {...props} />;
      case 'slide-transition': return <SlideTransitionPreview {...props} />;
      case 'tracking': return <TrackingPreview {...props} />;
      case 'logo-anim': return <LogoAnimPreview {...props} />;
      case 'pie-chart': return <PieChartPreview {...props} />;
      case 'mg-elements': return <MGElementsPreview {...props} />;
      default: return <div className="text-slate-500">预览不可用</div>;
    }
  };

  const getVarLabel = (v: number) => {
    switch (v) {
      case 0: return "基础演示 Standard";
      case 1: return "风格变体 Variation";
      case 2: return "高级进阶 Advanced";
      default: return "";
    }
  }

  return (
    <div className="relative w-full rounded-[2.5rem] bg-slate-900 overflow-hidden border border-slate-800 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.6)] flex flex-col min-h-[500px]">
      {/* Visual Header Overlay */}
      <div className="absolute top-8 left-8 z-30 flex flex-col gap-2 pointer-events-none">
        <div className="flex items-center gap-3">
          <div className="px-4 py-1 bg-purple-600 rounded-full text-[11px] font-black font-mono text-white shadow-lg shadow-purple-900/50">
            PREVIEW MODE
          </div>
          <div className="px-3 py-1 bg-slate-800/80 backdrop-blur-xl rounded-full text-[10px] font-bold text-slate-300 border border-white/10 uppercase tracking-widest">
            {type.replace('-', ' ')}
          </div>
        </div>
      </div>

      {/* Floating Action Buttons */}
      <div className="absolute top-8 right-8 z-30 flex gap-3">
        <button 
          onClick={replay}
          className="w-12 h-12 flex items-center justify-center bg-white/10 hover:bg-white/20 text-white rounded-2xl transition-all border border-white/10 shadow-xl backdrop-blur-md"
          title="Replay Animation"
        >
          <i className="fas fa-redo-alt text-lg"></i>
        </button>
      </div>

      {/* Main Preview Screen - Now Larger */}
      <div className="flex-1 flex items-center justify-center relative bg-[radial-gradient(circle_at_center,_#1e293b_0%,_#0f172a_100%)] overflow-hidden">
        {/* Animated Background Grids */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
        
        <div className="relative w-full h-full flex items-center justify-center transform scale-110 lg:scale-125">
          {renderPreview()}
        </div>
      </div>

      {/* Professional Variation Tab Selector */}
      <div className="bg-slate-900/90 border-t border-slate-800/50 px-8 py-5 flex items-center justify-between backdrop-blur-2xl">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">演示列表</span>
        </div>
        
        <div className="flex gap-2 p-1.5 bg-black/40 rounded-2xl border border-white/5 shadow-inner">
          {[0, 1, 2].map((v) => (
            <button
              key={v}
              onClick={() => { setVariation(v); replay(); }}
              className={`px-6 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-3 ${
                variation === v 
                ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-xl shadow-purple-900/40 translate-y-[-2px]' 
                : 'text-slate-500 hover:text-slate-300 hover:bg-white/5'
              }`}
            >
              <span className={`w-5 h-5 rounded flex items-center justify-center text-[10px] border ${variation === v ? 'bg-white/20 border-white/40' : 'bg-slate-800 border-slate-700'}`}>
                {v + 1}
              </span>
              {getVarLabel(v).split(' ')[0]}
            </button>
          ))}
        </div>

        <div className="hidden md:block text-[10px] font-mono text-slate-600">
          60 FPS / GPU ACCELERATED
        </div>
      </div>
    </div>
  );
};

// --- Sub-components with High-Impact Variations ---

const CounterPreview: React.FC<{ variation: number }> = ({ variation }) => {
  const [count, setCount] = useState(0);
  useEffect(() => {
    const end = variation === 0 ? 100 : variation === 1 ? 8848 : 500000;
    const duration = variation === 2 ? 3000 : 2000;
    const startTime = Date.now();
    const update = () => {
      const now = Date.now();
      const progress = Math.min((now - startTime) / duration, 1);
      const easeProgress = 1 - Math.pow(1 - progress, 4); // Quart Ease Out
      setCount(Math.floor(easeProgress * end));
      if (progress < 1) requestAnimationFrame(update);
    };
    requestAnimationFrame(update);
  }, [variation]);

  return (
    <div className="text-center group">
      <div className={`font-black font-mono transition-all duration-700 drop-shadow-[0_20px_50px_rgba(0,0,0,0.5)] ${
        variation === 1 ? 'text-8xl text-indigo-400 tracking-tight' : 
        variation === 2 ? 'text-7xl text-amber-400' : 'text-9xl text-white'
      }`}>
        {variation === 1 && <span className="text-4xl align-top mr-2 text-slate-600">ALTITUDE</span>}
        {variation === 2 && <span className="text-3xl mr-2 text-slate-500">$</span>}
        {count.toLocaleString()}
        {variation === 0 && <span className="text-5xl ml-4 text-purple-500">%</span>}
      </div>
      <div className="mt-8 text-sm font-black text-slate-500 uppercase tracking-[0.4em] opacity-40 group-hover:opacity-100 transition-opacity">
        {variation === 0 ? 'Loading Sequence' : variation === 1 ? 'Dynamic Measurement' : 'Financial Revenue'}
      </div>
    </div>
  );
};

const TextSlidePreview: React.FC<{ variation: number }> = ({ variation }) => (
  <div className="flex flex-col items-center gap-6 overflow-hidden py-10 px-20 text-center">
    <div className={`text-6xl font-black tracking-tighter transition-all duration-1000 ${
      variation === 0 ? 'animate-[slideUpEx_1s_cubic-bezier(0.19,1,0.22,1)_forwards]' :
      variation === 1 ? 'animate-[slideRightEx_1s_cubic-bezier(0.19,1,0.22,1)_forwards]' :
      'animate-[focusReveal_1.5s_ease-out_forwards]'
    }`}>
      {variation === 0 ? 'VERTICAL SLIDE' : variation === 1 ? 'KINETIC MOTION' : 'GAUSSIAN REVEAL'}
    </div>
    <div className="animate-[fadeIn_1.5s_ease-out_0.6s_forwards] opacity-0 text-2xl font-bold text-slate-500 flex items-center gap-4">
       <div className="h-px w-12 bg-slate-800"></div>
       <span>DESIGN & MOTION</span>
       <div className="h-px w-12 bg-slate-800"></div>
    </div>
    <style dangerouslySetInnerHTML={{ __html: `
      @keyframes slideUpEx { from { transform: translateY(120%) skewY(10deg); opacity: 0; } to { transform: translateY(0) skewY(0); opacity: 1; } }
      @keyframes slideRightEx { from { transform: translateX(-120%) skewX(-20deg); opacity: 0; } to { transform: translateX(0) skewX(0); opacity: 1; } }
      @keyframes focusReveal { from { filter: blur(40px); opacity: 0; transform: scale(1.4); } to { filter: blur(0); opacity: 1; transform: scale(1); } }
      @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
    `}} />
  </div>
);

const BarGrowthPreview: React.FC<{ variation: number }> = ({ variation }) => (
  <div className={`flex items-end gap-6 h-64 transition-all duration-700 ${variation === 1 ? 'flex-col justify-center items-stretch w-1/2 h-auto gap-4' : ''}`}>
    {[70, 100, 45, 90, 60, 80].map((h, i) => (
      <div 
        key={i} 
        className={`rounded-2xl animate-[popIn_1s_cubic-bezier(0.34,1.56,0.64,1)_forwards] opacity-0 shadow-2xl ${
          variation === 0 ? 'w-14 bg-gradient-to-t from-purple-800 to-indigo-500' :
          variation === 1 ? 'h-8 bg-gradient-to-r from-emerald-600 to-cyan-400 origin-left' :
          'w-14 border border-white/10 bg-white/5 backdrop-blur-md relative overflow-hidden'
        }`}
        style={{ 
          height: variation === 1 ? '32px' : `${h}%`, 
          width: variation === 1 ? `${h}%` : '56px',
          animationDelay: `${i * 0.15}s`,
          transformOrigin: variation === 1 ? 'left' : 'bottom'
        }}
      >
        {variation === 2 && <div className="absolute inset-0 bg-gradient-to-t from-white/20 to-transparent animate-pulse"></div>}
      </div>
    ))}
    <style dangerouslySetInnerHTML={{ __html: `
      @keyframes popIn { 0% { transform: scale(0); opacity: 0; } 100% { transform: scale(1); opacity: 1; } }
    `}} />
  </div>
);

const MaskPushPreview: React.FC<{ variation: number }> = ({ variation }) => (
  <div className="relative w-full h-full p-20 flex items-center justify-center">
    <div className={`absolute inset-0 transition-colors duration-1000 ${variation === 1 ? 'bg-purple-900/30' : variation === 2 ? 'bg-black' : 'bg-slate-900'}`}></div>
    
    <div className={`relative w-full h-full overflow-hidden rounded-3xl flex items-center justify-center shadow-inner ${
      variation === 0 ? 'animate-[clipLeft_2s_infinite_alternate]' :
      variation === 1 ? 'animate-[clipCircle_2s_infinite_alternate]' :
      'animate-[clipDiamond_2s_infinite_alternate]'
    }`}>
       <div className="absolute inset-0 bg-gradient-to-br from-purple-600 to-indigo-900"></div>
       <div className="z-10 text-6xl font-black italic tracking-tighter text-white drop-shadow-2xl">
          {variation === 0 ? 'ALPHA PUSH' : variation === 1 ? 'IRIS OPEN' : 'DIAMOND REVEAL'}
       </div>
    </div>
    <style dangerouslySetInnerHTML={{ __html: `
      @keyframes clipLeft { 0% { clip-path: inset(0 100% 0 0); } 40%, 100% { clip-path: inset(0 0 0 0); } }
      @keyframes clipCircle { 0% { clip-path: circle(0% at 50% 50%); } 40%, 100% { clip-path: circle(100% at 50% 50%); } }
      @keyframes clipDiamond { 0% { clip-path: polygon(50% 50%, 50% 50%, 50% 50%, 50% 50%); } 40%, 100% { clip-path: polygon(50% -20%, 120% 50%, 50% 120%, -20% 50%); } }
    `}} />
  </div>
);

const CameraZoomPreview: React.FC<{ variation: number }> = ({ variation }) => (
  <div className="w-full h-full flex items-center justify-center overflow-hidden bg-black rounded-[2.5rem]">
    <div className={`relative w-full h-full transition-all duration-1000 flex items-center justify-center ${
      variation === 0 ? 'animate-[camZoomOut_5s_infinite_alternate]' :
      variation === 1 ? 'animate-[camTruck_5s_infinite_alternate]' :
      'animate-[camOrbit_10s_linear_infinite]'
    }`}>
      <img src="https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?w=1200" className="w-[120%] h-[120%] object-cover opacity-70 scale-125" alt="Background" />
      <div className="absolute flex flex-col items-center">
         <div className="w-64 h-80 border-4 border-white/40 rounded-3xl shadow-[0_0_100px_rgba(255,255,255,0.2)]"></div>
         <div className="mt-6 px-4 py-2 bg-white text-black font-black text-sm tracking-widest rounded-lg">FOCUS TARGET</div>
      </div>
    </div>
    <style dangerouslySetInnerHTML={{ __html: `
      @keyframes camZoomOut { from { transform: scale(1.5); } to { transform: scale(1); } }
      @keyframes camTruck { from { transform: translateX(-10%); } to { transform: translateX(10%); } }
      @keyframes camOrbit { 0% { transform: rotate(0deg) scale(1.5); } 100% { transform: rotate(360deg) scale(1.5); } }
    `}} />
  </div>
);

const ShapeTrimPreview: React.FC<{ variation: number }> = ({ variation }) => (
  <svg viewBox="0 0 200 200" className="w-80 h-80 drop-shadow-[0_0_50px_rgba(168,85,247,0.3)]">
    {variation === 0 ? (
      <circle cx="100" cy="100" r="80" fill="none" stroke="#a855f7" strokeWidth="12" strokeDasharray="502" strokeDashoffset="502" strokeLinecap="round" className="animate-[drawFull_2s_cubic-bezier(0.65,0,0.35,1)_infinite_alternate]" />
    ) : variation === 1 ? (
      <rect x="20" y="20" width="160" height="160" fill="none" stroke="#22d3ee" strokeWidth="12" strokeDasharray="640" strokeDashoffset="640" strokeLinecap="round" className="animate-[drawFull_2s_cubic-bezier(0.65,0,0.35,1)_infinite_alternate]" />
    ) : (
      <path d="M100 25 L175 165 L25 165 Z" fill="none" stroke="#f43f5e" strokeWidth="12" strokeDasharray="500" strokeDashoffset="500" strokeLinecap="round" className="animate-[drawFull_2s_cubic-bezier(0.65,0,0.35,1)_infinite_alternate]" />
    )}
    <style dangerouslySetInnerHTML={{ __html: `
      @keyframes drawFull { from { stroke-dashoffset: 640; opacity: 0.3; } to { stroke-dashoffset: 0; opacity: 1; } }
    `}} />
  </svg>
);

const SlideTransitionPreview: React.FC<{ variation: number }> = ({ variation }) => (
  <div className="relative w-full h-full overflow-hidden flex">
    <div className={`shrink-0 w-full h-full flex items-center justify-center transition-all duration-1000 ${
      variation === 0 ? 'bg-slate-800 animate-[fullX_4s_infinite]' :
      variation === 1 ? 'bg-indigo-950 animate-[fullY_4s_infinite]' :
      'bg-slate-800 animate-[fullZoom_4s_infinite]'
    }`}>
       <div className="text-5xl font-black opacity-40">SCENE ONE</div>
    </div>
    <div className={`shrink-0 w-full h-full flex items-center justify-center transition-all duration-1000 ${
      variation === 0 ? 'bg-indigo-900 animate-[fullX_4s_infinite]' :
      variation === 1 ? 'bg-rose-950 animate-[fullY_4s_infinite]' :
      'bg-indigo-900 animate-[fullZoom_4s_infinite]'
    }`}>
       <div className="text-5xl font-black opacity-40">SCENE TWO</div>
    </div>
    <style dangerouslySetInnerHTML={{ __html: `
      @keyframes fullX { 0%, 40% { transform: translateX(0); } 60%, 100% { transform: translateX(-100%); } }
      @keyframes fullY { 0%, 40% { transform: translateY(0); } 60%, 100% { transform: translateY(-100%); } }
      @keyframes fullZoom { 0%, 40% { transform: scale(1); opacity: 1; } 60%, 100% { transform: scale(2); opacity: 0; } }
    `}} />
  </div>
);

const TrackingPreview: React.FC<{ variation: number }> = ({ variation }) => (
  <div className="relative w-full h-full bg-slate-950 flex items-center justify-center overflow-hidden">
    <div className="absolute inset-0 opacity-20" style={{backgroundImage: 'radial-gradient(circle, #444 1px, transparent 1px)', backgroundSize: '40px 40px'}}></div>
    
    <div className={`w-16 h-16 bg-white rounded-full transition-all duration-500 animate-[pathMove_6s_infinite_linear] shadow-[0_0_80px_rgba(255,255,255,0.3)] ${variation === 1 ? 'bg-cyan-400' : variation === 2 ? 'bg-rose-500' : ''}`}></div>
    
    <div className="absolute animate-[pathMove_6s_infinite_linear] mt-[-80px] ml-24 flex flex-col items-start transition-all duration-700">
      {variation === 0 ? (
        <div className="flex flex-col">
          <div className="w-px h-16 bg-white/40 mb-2 origin-bottom animate-pulse"></div>
          <div className="bg-white text-black text-[12px] px-3 py-1.5 rounded-lg font-black shadow-2xl tracking-tighter">
            DATA_POINT: OBJECT_A
          </div>
        </div>
      ) : variation === 1 ? (
        <div className="flex items-center gap-4 bg-cyan-500/10 backdrop-blur-2xl border border-cyan-500/30 p-4 rounded-2xl shadow-2xl">
           <div className="w-10 h-10 rounded-xl bg-cyan-500 flex items-center justify-center animate-spin-slow"><i className="fas fa-crosshairs text-white"></i></div>
           <div>
             <div className="text-[10px] font-bold text-cyan-400 uppercase tracking-widest">Tracking Info</div>
             <div className="text-sm font-black text-white">LOCKED_ON_01</div>
           </div>
        </div>
      ) : (
        <div className="w-40 h-40 border-2 border-dashed border-rose-500/30 rounded-full flex items-center justify-center animate-spin-slow">
           <div className="w-32 h-32 border-2 border-rose-500/50 rounded-full flex items-center justify-center">
              <div className="w-4 h-4 bg-rose-500 rounded-full animate-ping"></div>
           </div>
        </div>
      )}
    </div>
    <style dangerouslySetInnerHTML={{ __html: `
      @keyframes pathMove { 0% { transform: translate(-150px, 80px); } 25% { transform: translate(150px, -20px); } 50% { transform: translate(50px, -100px); } 75% { transform: translate(-150px, -50px); } 100% { transform: translate(-150px, 80px); } }
      .animate-spin-slow { animation: spin 4s linear infinite; }
    `}} />
  </div>
);

const LogoAnimPreview: React.FC<{ variation: number }> = ({ variation }) => (
  <div className="flex flex-col items-center gap-12">
    <div className="w-48 h-48 relative flex items-center justify-center">
      {variation === 0 ? (
        <div className="relative">
          <div className="absolute inset-[-40px] border-4 border-dashed border-white/10 rounded-full animate-spin"></div>
          <div className="w-32 h-32 bg-gradient-to-tr from-purple-600 to-pink-500 rounded-[2rem] animate-[logoPop_1.2s_cubic-bezier(0.175, 0.885, 0.32, 1.275)_forwards] shadow-2xl flex items-center justify-center">
             <i className="fas fa-cube text-5xl text-white"></i>
          </div>
        </div>
      ) : variation === 1 ? (
        <div className="grid grid-cols-3 gap-3 animate-[staggerGrid_2s_infinite_alternate]">
           {[...Array(9)].map((_, i) => <div key={i} className="w-10 h-10 bg-white rounded-xl shadow-lg" style={{animationDelay: `${i*0.05}s`}}></div>)}
        </div>
      ) : (
        <div className="w-40 h-40 bg-rose-600 rounded-3xl flex items-center justify-center animate-[logoPulseMorph_3s_infinite_alternate] shadow-[0_0_80px_rgba(225,29,72,0.4)]">
           <i className="fas fa-fire text-6xl text-white"></i>
        </div>
      )}
    </div>
    <div className="overflow-hidden h-16">
      <div className="text-5xl font-black tracking-[0.3em] uppercase text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-500 animate-[textReveal_1.5s_cubic-bezier(0.19,1,0.22,1)_forwards]">
        {variation === 0 ? 'GENESIS' : variation === 1 ? 'COLLECTIVE' : 'IGNITION'}
      </div>
    </div>
    <style dangerouslySetInnerHTML={{ __html: `
      @keyframes logoPop { 0% { transform: scale(0) rotate(-45deg); opacity: 0; } 100% { transform: scale(1) rotate(0); opacity: 1; } }
      @keyframes staggerGrid { 0% { gap: 4px; transform: scale(0.9) rotate(0); } 100% { gap: 16px; transform: scale(1.2) rotate(45deg); } }
      @keyframes logoPulseMorph { 0% { border-radius: 40%; transform: scale(0.8); } 100% { border-radius: 20%; transform: scale(1.1) rotate(90deg); } }
      @keyframes textReveal { from { transform: translateY(100%); opacity: 0; filter: blur(20px); } to { transform: translateY(0); opacity: 1; filter: blur(0); } }
    `}} />
  </div>
);

const PieChartPreview: React.FC<{ variation: number }> = ({ variation }) => (
  <div className="w-80 h-80 relative flex items-center justify-center">
    <svg viewBox="0 0 100 100" className="rotate-[-90deg] w-full h-full drop-shadow-[0_20px_60px_rgba(0,0,0,0.6)]">
      <circle cx="50" cy="50" r="42" fill="transparent" stroke="rgba(255,255,255,0.03)" strokeWidth={variation === 1 ? "4" : "16"} />
      <circle 
        cx="50" cy="50" r="42" fill="transparent" 
        stroke={variation === 0 ? "#8b5cf6" : variation === 1 ? "#2dd4bf" : "#fb7185"} 
        strokeWidth={variation === 1 ? "4" : "16"}
        strokeDasharray="263.8" 
        strokeDashoffset="263.8"
        strokeLinecap="round"
        className="animate-[drawChart_2s_cubic-bezier(0.65,0,0.35,1)_forwards]"
        style={{ strokeDashoffset: `${263.8 * (1 - (variation === 0 ? 0.8 : variation === 1 ? 0.35 : 0.95))}` }}
      />
    </svg>
    <div className="absolute flex flex-col items-center">
       <span className={`font-black tracking-tighter drop-shadow-lg ${variation === 1 ? 'text-6xl text-teal-400' : 'text-8xl text-white'}`}>
         {variation === 0 ? '80%' : variation === 1 ? '35%' : '95%'}
       </span>
       <span className="text-xs font-black text-slate-500 uppercase tracking-[0.5em] mt-4 opacity-50">Performance</span>
    </div>
    <style dangerouslySetInnerHTML={{ __html: `
      @keyframes drawChart { from { stroke-dashoffset: 263.8; } }
    `}} />
  </div>
);

const MGElementsPreview: React.FC<{ variation: number }> = ({ variation }) => (
  <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
    {variation === 0 ? (
      <div className="relative w-full h-full">
        {[...Array(20)].map((_, i) => (
          <div key={i} className="absolute w-3 h-3 rounded-full bg-white/20 animate-[floatMG_4s_infinite]"
            style={{ left: `${Math.random() * 90 + 5}%`, top: `${Math.random() * 90 + 5}%`, animationDelay: `${i * 0.2}s`, transform: `scale(${Math.random() + 0.5})` }}
          />
        ))}
        <div className="absolute inset-0 flex items-center justify-center">
           <div className="w-64 h-64 border-2 border-white/5 rounded-full animate-ping opacity-10"></div>
           <div className="text-4xl font-black text-white/10 tracking-[1em] uppercase">Particles</div>
        </div>
      </div>
    ) : variation === 1 ? (
      <div className="flex gap-8">
         {[1,2,3,4,5].map(i => (
           <div key={i} className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-800 rounded-2xl animate-[bounceMG_1s_infinite_alternate]" style={{animationDelay: `${i * 0.1}s`}}></div>
         ))}
      </div>
    ) : (
      <div className="relative w-full h-full overflow-hidden flex items-center justify-center">
         <div className="w-[100%] h-2 bg-white/10 absolute rotate-45 animate-pulse"></div>
         <div className="w-[100%] h-2 bg-white/10 absolute -rotate-45 animate-pulse" style={{animationDelay: '0.5s'}}></div>
         <div className="w-48 h-48 bg-white/5 border border-white/10 backdrop-blur-xl rotate-45 animate-spin-slow flex items-center justify-center">
            <div className="w-24 h-24 border-2 border-white/20 animate-ping"></div>
         </div>
      </div>
    )}
    <style dangerouslySetInnerHTML={{ __html: `
      @keyframes floatMG { 0%, 100% { transform: translate(0,0); opacity: 0; } 50% { transform: translate(40px,-60px); opacity: 0.8; } }
      @keyframes bounceMG { from { transform: translateY(40px) scaleX(1.2); } to { transform: translateY(-40px) scaleX(0.8); } }
      @keyframes spin-slow { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
    `}} />
  </div>
);

export default MotionPreview;
