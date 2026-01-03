
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
    const props = { variation };
    switch (type) {
      case 'counter': return <CounterPreview key={key} {...props} />;
      case 'text-slide': return <TextSlidePreview key={key} {...props} />;
      case 'bar-growth': return <BarGrowthPreview key={key} {...props} />;
      case 'mask-push': return <MaskPushPreview key={key} {...props} />;
      case 'camera-zoom': return <CameraZoomPreview key={key} {...props} />;
      case 'shape-trim': return <ShapeTrimPreview key={key} {...props} />;
      case 'slide-transition': return <SlideTransitionPreview key={key} {...props} />;
      case 'tracking': return <TrackingPreview key={key} {...props} />;
      case 'logo-anim': return <LogoAnimPreview key={key} {...props} />;
      case 'pie-chart': return <PieChartPreview key={key} {...props} />;
      case 'mg-elements': return <MGElementsPreview key={key} {...props} />;
      default: return <div className="text-slate-500">预览不可用</div>;
    }
  };

  const getVarLabel = (v: number) => {
    switch (v) {
      case 0: return "标准风格 Standard";
      case 1: return "科技变体 Sci-Fi";
      case 2: return "极简美学 Minimal";
      default: return "";
    }
  }

  return (
    <div className="relative w-full rounded-[3rem] bg-[#020617] overflow-hidden border border-white/5 shadow-[0_48px_80px_-16px_rgba(0,0,0,0.8)] flex flex-col min-h-[600px]">
      {/* Visual Header Overlay */}
      <div className="absolute top-10 left-10 z-30 flex flex-col gap-3 pointer-events-none">
        <div className="flex items-center gap-3">
          <div className="px-5 py-1.5 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-full text-[12px] font-black font-mono text-white shadow-xl">
            PREVIEW ENGINE 4.0
          </div>
          <div className="px-4 py-1.5 bg-white/5 backdrop-blur-2xl rounded-full text-[10px] font-bold text-slate-400 border border-white/10 uppercase tracking-widest">
            {type.replace('-', ' ')}
          </div>
        </div>
      </div>

      {/* Floating Action Buttons */}
      <div className="absolute top-10 right-10 z-30 flex gap-4">
        <button 
          onClick={replay}
          className="w-14 h-14 flex items-center justify-center bg-white/5 hover:bg-white/10 text-white rounded-2xl transition-all border border-white/10 shadow-2xl backdrop-blur-xl group"
          title="Replay Animation"
        >
          <i className="fas fa-redo-alt text-xl group-active:rotate-180 transition-transform"></i>
        </button>
      </div>

      {/* Main Preview Screen - Fixed Height Collapse */}
      <div className="flex-1 relative bg-[#020617] overflow-hidden">
        {/* Subtle Background Elements */}
        <div className="absolute inset-0 opacity-[0.05] pointer-events-none z-10" style={{ backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', backgroundSize: '60px 60px' }}></div>
        
        {/* Sub-preview container */}
        <div className="absolute inset-0 flex items-center justify-center transform scale-100 lg:scale-110 transition-transform duration-700">
          {renderPreview()}
        </div>
      </div>

      {/* Variation Selector Bar */}
      <div className="bg-[#0f172a] border-t border-white/5 px-10 py-8 flex items-center justify-between z-20">
        <div className="flex items-center gap-4">
          <div className="flex -space-x-2">
            <div className="w-8 h-8 rounded-full border-2 border-slate-900 bg-purple-600"></div>
            <div className="w-8 h-8 rounded-full border-2 border-slate-900 bg-indigo-600"></div>
          </div>
          <div>
            <div className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Style Variation</div>
            <div className="text-sm font-bold text-white">点击切换演示样式</div>
          </div>
        </div>
        
        <div className="flex gap-3 p-2 bg-black/40 rounded-[1.8rem] border border-white/5 shadow-2xl">
          {[0, 1, 2].map((v) => (
            <button
              key={v}
              onClick={() => { setVariation(v); replay(); }}
              className={`px-10 py-3.5 rounded-2xl text-xs font-black transition-all flex items-center gap-3 ${
                variation === v 
                ? 'bg-white text-black shadow-2xl translate-y-[-2px]' 
                : 'text-slate-500 hover:text-slate-300 hover:bg-white/5'
              }`}
            >
              <span className={`w-6 h-6 rounded-lg flex items-center justify-center text-[11px] font-mono border ${variation === v ? 'bg-black text-white border-black/10' : 'bg-slate-800 border-slate-700'}`}>
                {v + 1}
              </span>
              {getVarLabel(v).split(' ')[0]}
            </button>
          ))}
        </div>

        <div className="hidden lg:flex items-center gap-3 text-[11px] font-mono text-slate-600">
           <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
           HARDWARE ACCELERATION
        </div>
      </div>
    </div>
  );
};

// --- Tracking Preview - Fixed Strip Issue ---

const TrackingPreview: React.FC<{ variation: number }> = ({ variation }) => {
  return (
    <div className="absolute inset-0 flex items-center justify-center bg-black overflow-hidden">
      {/* Background Video Simulation - Full Height */}
      <div className={`absolute inset-0 transition-opacity duration-1000 ${variation === 2 ? 'opacity-10' : 'opacity-40'}`}>
         <img 
           src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1600" 
           className="w-full h-full object-cover" 
           alt="Space Background" 
         />
         <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-transparent to-[#020617]"></div>
      </div>
      
      {/* PARENT TRACKER (Simulating Null Object) */}
      <div className="relative w-full h-full flex items-center justify-center">
        <div className="relative animate-[aeTrackingPathComplex_8s_infinite_ease-in-out]">
          
          {/* TRACKING BOX / ANCHOR */}
          <div className="relative flex items-center justify-center">
            {/* Feature Search Area (The inner box) */}
            <div className={`w-16 h-16 border-2 transition-all duration-500 flex items-center justify-center ${
              variation === 0 ? 'border-white/40 bg-white/5' : 
              variation === 1 ? 'border-cyan-400 bg-cyan-400/10' : 
              'border-white/10'
            }`}>
              <div className={`w-1.5 h-1.5 rounded-full ${variation === 1 ? 'bg-cyan-400' : 'bg-white'}`}></div>
              {/* Feature Points */}
              <div className="absolute top-0 left-0 w-1 h-1 bg-white"></div>
              <div className="absolute top-0 right-0 w-1 h-1 bg-white"></div>
              <div className="absolute bottom-0 left-0 w-1 h-1 bg-white"></div>
              <div className="absolute bottom-0 right-0 w-1 h-1 bg-white"></div>
            </div>

            {/* Tracking Search Area (The outer box) */}
            <div className="absolute w-32 h-32 border border-white/10 pointer-events-none"></div>
            
            {variation === 1 && (
               <div className="absolute inset-0 border-2 border-cyan-400 animate-pulse scale-150 opacity-20"></div>
            )}
          </div>

          {/* CALLOUT ATTACHMENT */}
          <div className="absolute top-[-120px] left-[80px]">
            {/* LEADER LINE */}
            <svg className="absolute top-[120px] left-[-80px] w-40 h-40 pointer-events-none overflow-visible">
               <path 
                 d="M 0 0 L 80 -120 L 160 -120" 
                 fill="none" 
                 stroke={variation === 1 ? "#22d3ee" : "white"} 
                 strokeWidth="2" 
                 strokeDasharray="400" 
                 strokeDashoffset="400"
                 className="animate-[aeDrawLine_1.5s_ease-out_forwards_0.5s]"
               />
            </svg>

            {/* DATA BOX */}
            <div className={`animate-[aeBoxAppear_0.8s_cubic-bezier(0.19,1,0.22,1)_forwards_1.2s] opacity-0 translate-x-10 ${
              variation === 0 ? 'bg-white text-black p-4 rounded-xl shadow-2xl flex flex-col min-w-[180px]' : 
              variation === 1 ? 'bg-slate-900/80 backdrop-blur-2xl border-l-4 border-cyan-400 p-5 rounded-r-xl flex items-center gap-5 min-w-[240px]' : 
              'bg-white/5 backdrop-blur-md border border-white/10 px-6 py-3 rounded-full text-white font-mono text-xs'
            }`}>
              {variation === 0 && (
                 <>
                   <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">Point Tracker</span>
                   <span className="text-lg font-black italic tracking-tighter">COORDINATE_91</span>
                 </>
              )}
              {variation === 1 && (
                 <>
                   <div className="w-12 h-12 rounded-xl bg-cyan-400/20 flex items-center justify-center text-cyan-400"><i className="fas fa-radar text-xl"></i></div>
                   <div>
                     <div className="text-[10px] font-bold text-cyan-400 uppercase mb-1">Tracking Status</div>
                     <div className="text-sm font-black text-white">LOCKED: 0.982 ACC</div>
                   </div>
                 </>
              )}
              {variation === 2 && <span>#TRACK_ACTIVE_RENDER</span>}
            </div>
          </div>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes aeTrackingPathComplex { 
          0%, 100% { transform: translate(-200px, 120px); } 
          25% { transform: translate(180px, -40px); } 
          50% { transform: translate(60px, -180px); } 
          75% { transform: translate(-160px, -80px); } 
        }
        @keyframes aeDrawLine { to { stroke-dashoffset: 0; } }
        @keyframes aeBoxAppear { from { transform: translateX(30px); opacity: 0; } to { transform: translateX(0); opacity: 1; } }
      `}} />
    </div>
  );
};

// --- Supporting Previews with Proper Inset Centering ---

const CounterPreview: React.FC<{ variation: number }> = ({ variation }) => {
  const [count, setCount] = useState(0);
  useEffect(() => {
    const end = variation === 0 ? 100 : variation === 1 ? 9999 : 1250000;
    const duration = 2500;
    const startTime = Date.now();
    const update = () => {
      const progress = Math.min((Date.now() - startTime) / duration, 1);
      const ease = 1 - Math.pow(1 - progress, 5);
      setCount(Math.floor(ease * end));
      if (progress < 1) requestAnimationFrame(update);
    };
    requestAnimationFrame(update);
  }, [variation]);

  return (
    <div className="text-center w-full">
      <div className={`font-black font-mono tracking-tighter transition-all duration-700 leading-none ${
        variation === 1 ? 'text-[12rem] text-indigo-400' : 
        variation === 2 ? 'text-[10rem] text-amber-500' : 'text-[15rem] text-white'
      }`}>
        {count.toLocaleString()}
        {variation === 0 && <span className="text-7xl ml-6 text-purple-600">%</span>}
      </div>
      <div className="mt-8 text-xl font-black text-slate-600 uppercase tracking-[1.5em] opacity-50">
        {variation === 0 ? 'Data Processing' : variation === 1 ? 'Network Packets' : 'Total Valuation'}
      </div>
    </div>
  );
};

const TextSlidePreview: React.FC<{ variation: number }> = ({ variation }) => (
  <div className="flex flex-col items-center gap-10 text-center w-full px-20">
    <div className={`text-[9rem] font-black tracking-tighter leading-none transition-all duration-1000 ${
      variation === 0 ? 'animate-[slideUpHigh_1.2s_cubic-bezier(0.19,1,0.22,1)_forwards]' :
      variation === 1 ? 'animate-[slideLeftHigh_1.2s_cubic-bezier(0.19,1,0.22,1)_forwards]' :
      'animate-[blurFade_1.5s_ease-out_forwards]'
    }`}>
      {variation === 0 ? 'MOTION' : variation === 1 ? 'KINETIC' : 'GAUSSIAN'}
    </div>
    <div className="h-0.5 w-full max-w-2xl bg-gradient-to-r from-transparent via-white/20 to-transparent animate-[scaleW_1.5s_ease-out_forwards_0.5s] scale-x-0"></div>
    <style dangerouslySetInnerHTML={{ __html: `
      @keyframes slideUpHigh { from { transform: translateY(100%) skewY(10deg); opacity: 0; } to { transform: translateY(0) skewY(0); opacity: 1; } }
      @keyframes slideLeftHigh { from { transform: translateX(-100%) skewX(-20deg); opacity: 0; } to { transform: translateX(0) skewX(0); opacity: 1; } }
      @keyframes blurFade { from { filter: blur(60px); opacity: 0; transform: scale(1.5); } to { filter: blur(0); opacity: 1; transform: scale(1); } }
      @keyframes scaleW { to { transform: scaleX(1); } }
    `}} />
  </div>
);

const BarGrowthPreview: React.FC<{ variation: number }> = ({ variation }) => (
  <div className={`flex items-end gap-12 h-[400px] transition-all duration-700 ${variation === 1 ? 'flex-col justify-center items-stretch w-1/2 h-auto gap-8' : ''}`}>
    {[60, 100, 45, 90, 70, 85].map((h, i) => (
      <div 
        key={i} 
        className={`rounded-3xl animate-[growIn_1s_cubic-bezier(0.34,1.56,0.64,1)_forwards] opacity-0 shadow-2xl ${
          variation === 0 ? 'w-24 bg-gradient-to-t from-purple-900 to-indigo-500' :
          variation === 1 ? 'h-12 bg-gradient-to-r from-emerald-600 to-cyan-400 origin-left' :
          'w-24 bg-white/5 border border-white/10 backdrop-blur-xl relative'
        }`}
        style={{ 
          height: variation === 1 ? '48px' : `${h}%`, 
          width: variation === 1 ? `${h}%` : '96px',
          // Fix: Correct template literal for animationDelay; '0.1s' inside ${} was a syntax error
          animationDelay: `${i * 0.1}s`,
          transformOrigin: variation === 1 ? 'left' : 'bottom'
        }}
      />
    ))}
    <style dangerouslySetInnerHTML={{ __html: `
      @keyframes growIn { 0% { transform: scale(0); opacity: 0; } 100% { transform: scale(1); opacity: 1; } }
    `}} />
  </div>
);

const MaskPushPreview: React.FC<{ variation: number }> = ({ variation }) => (
  <div className="absolute inset-0 flex items-center justify-center p-20">
    <div className={`absolute inset-0 transition-colors duration-1000 ${variation === 1 ? 'bg-indigo-900/40' : variation === 2 ? 'bg-black' : 'bg-slate-900'}`}></div>
    <div className={`relative w-full h-full overflow-hidden rounded-[4rem] flex items-center justify-center ${
      variation === 0 ? 'animate-[matteX_3s_infinite_alternate]' :
      variation === 1 ? 'animate-[matteCircle_3s_infinite_alternate]' :
      'animate-[matteDiamond_3s_infinite_alternate]'
    }`}>
       <div className="absolute inset-0 bg-gradient-to-br from-indigo-500 via-purple-700 to-rose-600"></div>
       <div className="text-[10rem] font-black italic tracking-tighter text-white drop-shadow-2xl">
          {variation === 0 ? 'SLIDE' : variation === 1 ? 'IRIS' : 'QUARTZ'}
       </div>
    </div>
    <style dangerouslySetInnerHTML={{ __html: `
      @keyframes matteX { 0% { clip-path: inset(0 100% 0 0); } 40%, 100% { clip-path: inset(0 0 0 0); } }
      @keyframes matteCircle { 0% { clip-path: circle(0% at 50% 50%); } 40%, 100% { clip-path: circle(100% at 50% 50%); } }
      @keyframes matteDiamond { 0% { clip-path: polygon(50% 50%, 50% 50%, 50% 50%, 50% 50%); } 40%, 100% { clip-path: polygon(50% -50%, 150% 50%, 50% 150%, -50% 50%); } }
    `}} />
  </div>
);

const CameraZoomPreview: React.FC<{ variation: number }> = ({ variation }) => (
  <div className="absolute inset-0 bg-black overflow-hidden rounded-[4rem]">
    <div className={`absolute inset-0 transition-all duration-[8s] ease-in-out ${
      variation === 0 ? 'scale-[1.8] animate-[zoomOut_8s_infinite_alternate]' :
      variation === 1 ? 'animate-[truckX_8s_infinite_alternate]' :
      'animate-[orbitView_20s_linear_infinite]'
    }`}>
      <img src="https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=1600" className="w-full h-full object-cover opacity-50" alt="Camera Scene" />
      <div className="absolute inset-0 flex items-center justify-center">
         <div className="w-[500px] h-[600px] border-[12px] border-white/20 rounded-[4rem] shadow-[0_0_150px_rgba(255,255,255,0.1)]"></div>
      </div>
    </div>
    <style dangerouslySetInnerHTML={{ __html: `
      @keyframes zoomOut { from { transform: scale(2); } to { transform: scale(1); } }
      @keyframes truckX { from { transform: translateX(-15%) scale(1.2); } to { transform: translateX(15%) scale(1.2); } }
      @keyframes orbitView { 0% { transform: rotate(0deg) scale(2); } 100% { transform: rotate(360deg) scale(2); } }
    `}} />
  </div>
);

const ShapeTrimPreview: React.FC<{ variation: number }> = ({ variation }) => (
  <svg viewBox="0 0 200 200" className="w-[30rem] h-[30rem] drop-shadow-[0_0_100px_rgba(168,85,247,0.4)]">
    {variation === 0 ? (
      <circle cx="100" cy="100" r="85" fill="none" stroke="#a855f7" strokeWidth="12" strokeDasharray="534" strokeDashoffset="534" strokeLinecap="round" className="animate-[drawShape_2.5s_cubic-bezier(0.65,0,0.35,1)_infinite_alternate]" />
    ) : variation === 1 ? (
      <rect x="20" y="20" width="160" height="160" fill="none" stroke="#22d3ee" strokeWidth="12" strokeDasharray="640" strokeDashoffset="640" strokeLinecap="round" className="animate-[drawShape_2.5s_cubic-bezier(0.65,0,0.35,1)_infinite_alternate]" />
    ) : (
      <path d="M100 15 L185 175 L15 175 Z" fill="none" stroke="#f43f5e" strokeWidth="12" strokeDasharray="550" strokeDashoffset="550" strokeLinecap="round" className="animate-[drawShape_2.5s_cubic-bezier(0.65,0,0.35,1)_infinite_alternate]" />
    )}
    <style dangerouslySetInnerHTML={{ __html: `
      @keyframes drawShape { from { stroke-dashoffset: 640; opacity: 0.2; } to { stroke-dashoffset: 0; opacity: 1; } }
    `}} />
  </svg>
);

const SlideTransitionPreview: React.FC<{ variation: number }> = ({ variation }) => (
  <div className="absolute inset-0 flex overflow-hidden">
    <div className={`shrink-0 w-full h-full flex items-center justify-center transition-all duration-1000 ${
      variation === 0 ? 'bg-[#0f172a] animate-[slideX_6s_infinite]' :
      variation === 1 ? 'bg-indigo-950 animate-[slideY_6s_infinite]' :
      'bg-black animate-[slideZoom_6s_infinite]'
    }`}>
       <div className="text-[12rem] font-black text-white/5 uppercase">Phase I</div>
    </div>
    <div className={`shrink-0 w-full h-full flex items-center justify-center transition-all duration-1000 ${
      variation === 0 ? 'bg-indigo-900 animate-[slideX_6s_infinite]' :
      variation === 1 ? 'bg-rose-950 animate-[slideY_6s_infinite]' :
      'bg-purple-900 animate-[slideZoom_6s_infinite]'
    }`}>
       <div className="text-[12rem] font-black text-white/5 uppercase">Phase II</div>
    </div>
    <style dangerouslySetInnerHTML={{ __html: `
      @keyframes slideX { 0%, 40% { transform: translateX(0); } 60%, 100% { transform: translateX(-100%); } }
      @keyframes slideY { 0%, 40% { transform: translateY(0); } 60%, 100% { transform: translateY(-100%); } }
      @keyframes slideZoom { 0%, 40% { transform: scale(1); opacity: 1; } 60%, 100% { transform: scale(3); opacity: 0; } }
    `}} />
  </div>
);

const LogoAnimPreview: React.FC<{ variation: number }> = ({ variation }) => (
  <div className="flex flex-col items-center gap-20">
    <div className="relative flex items-center justify-center">
      {variation === 0 ? (
        <div className="w-64 h-64 bg-gradient-to-tr from-purple-600 to-indigo-600 rounded-[4rem] animate-[logoMain_1.5s_cubic-bezier(0.175,0.885,0.32,1.275)_forwards] shadow-2xl flex items-center justify-center">
           <i className="fas fa-shapes text-[8rem] text-white"></i>
        </div>
      ) : variation === 1 ? (
        <div className="grid grid-cols-3 gap-8 animate-[staggerIn_2.5s_infinite_alternate]">
           {[...Array(9)].map((_, i) => <div key={i} className="w-16 h-16 bg-white rounded-2xl shadow-2xl" style={{animationDelay: `${i*0.08}s`}}></div>)}
        </div>
      ) : (
        <div className="w-72 h-72 bg-rose-600 rounded-[4rem] flex items-center justify-center animate-[morphLogo_4s_infinite_alternate] shadow-[0_0_120px_rgba(225,29,72,0.6)]">
           <i className="fas fa-bolt text-[10rem] text-white"></i>
        </div>
      )}
    </div>
    <div className="text-[6rem] font-black tracking-[0.5em] text-white animate-[textSlideIn_1.5s_cubic-bezier(0.19,1,0.22,1)_forwards] opacity-0">
      {variation === 0 ? 'ORBIT' : variation === 1 ? 'TILES' : 'STRIKE'}
    </div>
    <style dangerouslySetInnerHTML={{ __html: `
      @keyframes logoMain { from { transform: scale(0) rotate(-90deg); } }
      @keyframes staggerIn { 0% { transform: scale(0.8) rotate(0); gap: 10px; } 100% { transform: scale(1.2) rotate(45deg); gap: 30px; } }
      @keyframes morphLogo { 0% { border-radius: 40%; } 100% { border-radius: 15%; transform: rotate(180deg); } }
      @keyframes textSlideIn { from { transform: translateY(50px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
    `}} />
  </div>
);

const PieChartPreview: React.FC<{ variation: number }> = ({ variation }) => (
  <div className="relative w-[35rem] h-[35rem] flex items-center justify-center">
    <svg viewBox="0 0 100 100" className="rotate-[-90deg] w-full h-full drop-shadow-[0_40px_100px_rgba(0,0,0,0.8)]">
      <circle cx="50" cy="50" r="44" fill="transparent" stroke="rgba(255,255,255,0.02)" strokeWidth="12" />
      <circle 
        cx="50" cy="50" r="44" fill="transparent" 
        stroke={variation === 0 ? "#8b5cf6" : variation === 1 ? "#2dd4bf" : "#fb7185"} 
        strokeWidth="12"
        strokeDasharray="276" 
        strokeDashoffset="276"
        strokeLinecap="round"
        className="animate-[drawP_2.5s_cubic-bezier(0.65,0,0.35,1)_forwards]"
        style={{ strokeDashoffset: `${276 * (1 - (variation === 0 ? 0.9 : variation === 1 ? 0.45 : 0.99))}` }}
      />
    </svg>
    <div className="absolute text-center">
       <div className={`font-black text-[10rem] leading-none ${variation === 1 ? 'text-teal-400' : 'text-white'}`}>
         {variation === 0 ? '90%' : variation === 1 ? '45%' : '99%'}
       </div>
       <div className="text-xl font-black text-slate-600 uppercase tracking-[1em] mt-8">Capacity</div>
    </div>
    <style dangerouslySetInnerHTML={{ __html: `
      @keyframes drawP { from { stroke-dashoffset: 276; } }
    `}} />
  </div>
);

const MGElementsPreview: React.FC<{ variation: number }> = ({ variation }) => (
  <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
    {variation === 0 ? (
      <div className="w-full h-full relative">
        {[...Array(40)].map((_, i) => (
          <div key={i} className="absolute w-5 h-5 rounded-full bg-white/10 animate-[floatMGX_6s_infinite]"
            style={{ left: `${Math.random() * 90 + 5}%`, top: `${Math.random() * 90 + 5}%`, animationDelay: `${i * 0.15}s`, transform: `scale(${Math.random() + 0.5})` }}
          />
        ))}
      </div>
    ) : variation === 1 ? (
      <div className="flex gap-16">
         {[1,2,3,4,5].map(i => (
           <div key={i} className="w-28 h-28 bg-gradient-to-br from-indigo-500 to-purple-800 rounded-[2.5rem] animate-[bounceMGX_1.5s_infinite_alternate]" style={{animationDelay: `${i * 0.15}s`}}></div>
         ))}
      </div>
    ) : (
      <div className="w-full h-full relative flex items-center justify-center">
         <div className="w-[800px] h-8 bg-white/5 absolute rotate-45 animate-pulse"></div>
         <div className="w-[800px] h-8 bg-white/5 absolute -rotate-45 animate-pulse" style={{animationDelay: '0.8s'}}></div>
         <div className="w-[400px] h-[400px] bg-white/5 border-2 border-white/10 rotate-45 animate-[spin_20s_linear_infinite]"></div>
      </div>
    )}
    <style dangerouslySetInnerHTML={{ __html: `
      @keyframes floatMGX { 0%, 100% { transform: translate(0,0) scale(0); opacity: 0; } 50% { transform: translate(100px,-150px) scale(2); opacity: 0.6; } }
      @keyframes bounceMGX { from { transform: translateY(80px) scaleX(1.4); } to { transform: translateY(-80px) scaleX(0.6); } }
    `}} />
  </div>
);

export default MotionPreview;
