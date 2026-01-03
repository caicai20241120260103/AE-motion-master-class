
import React, { useState, useEffect } from 'react';

interface Props {
  type: string;
}

const MotionPreview: React.FC<Props> = ({ type }) => {
  const [key, setKey] = useState(0);
  const [variation, setVariation] = useState(0);

  const replay = () => setKey(prev => prev + 1);

  // Reset variation when type changes
  useEffect(() => {
    setVariation(0);
  }, [type]);

  const renderPreview = () => {
    switch (type) {
      case 'counter':
        return <CounterPreview key={key} variation={variation} />;
      case 'text-slide':
        return <TextSlidePreview key={key} variation={variation} />;
      case 'bar-growth':
        return <BarGrowthPreview key={key} variation={variation} />;
      case 'mask-push':
        return <MaskPushPreview key={key} variation={variation} />;
      case 'camera-zoom':
        return <CameraZoomPreview key={key} variation={variation} />;
      case 'shape-trim':
        return <ShapeTrimPreview key={key} variation={variation} />;
      case 'slide-transition':
        return <SlideTransitionPreview key={key} variation={variation} />;
      case 'tracking':
        return <TrackingPreview key={key} variation={variation} />;
      case 'logo-anim':
        return <LogoAnimPreview key={key} variation={variation} />;
      case 'pie-chart':
        return <PieChartPreview key={key} variation={variation} />;
      case 'mg-elements':
        return <MGElementsPreview key={key} variation={variation} />;
      default:
        return <div className="text-slate-500">预览不可用</div>;
    }
  };

  const variationsCount = 3; // Standardize to 3 variations per type for UI consistency

  return (
    <div className="relative w-full aspect-video bg-slate-900 rounded-2xl overflow-hidden border border-slate-700/50 shadow-2xl group flex flex-col">
      {/* Top Header */}
      <div className="absolute top-4 left-4 z-20 flex items-center gap-2">
        <div className="px-3 py-1 bg-purple-600/20 backdrop-blur-md rounded-full text-[10px] font-bold font-mono text-purple-400 border border-purple-500/30">
          DEMO v2.0
        </div>
        <div className="px-3 py-1 bg-white/5 backdrop-blur-md rounded-full text-[10px] font-bold font-mono text-slate-400 border border-white/10">
          VAR: {variation + 1}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="absolute top-4 right-4 z-20 flex gap-2">
        <button 
          onClick={replay}
          className="p-2 bg-slate-800/80 hover:bg-slate-700 text-white rounded-xl transition-all border border-slate-600 shadow-lg backdrop-blur-sm"
          title="Replay Animation"
        >
          <i className="fas fa-redo-alt text-sm"></i>
        </button>
      </div>

      {/* Main Preview Container */}
      <div className="flex-1 flex items-center justify-center relative bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-slate-800/50 to-transparent">
        {renderPreview()}
      </div>

      {/* Variation Switcher Bottom Bar */}
      <div className="bg-slate-900/80 border-t border-slate-800 p-3 flex items-center justify-center gap-4 backdrop-blur-md">
        <span className="text-[10px] uppercase tracking-widest text-slate-500 font-bold">样式切换</span>
        <div className="flex gap-1.5 p-1 bg-slate-800/50 rounded-lg border border-slate-700/30">
          {[0, 1, 2].map((v) => (
            <button
              key={v}
              onClick={() => { setVariation(v); replay(); }}
              className={`w-8 h-8 rounded-md text-[10px] font-bold transition-all ${
                variation === v 
                ? 'bg-purple-600 text-white shadow-lg shadow-purple-900/40 scale-105' 
                : 'text-slate-400 hover:bg-slate-700 hover:text-white'
              }`}
            >
              {v + 1}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

// --- Sub-components with variations ---

// Added React.FC to sub-components to handle standard React attributes like 'key'
const CounterPreview: React.FC<{ variation: number }> = ({ variation }) => {
  const [count, setCount] = useState(0);
  useEffect(() => {
    const end = variation === 0 ? 100 : variation === 1 ? 5240 : 10;
    const duration = 2000;
    const startTime = Date.now();
    const update = () => {
      const now = Date.now();
      const progress = Math.min((now - startTime) / duration, 1);
      const easeProgress = progress * (2 - progress);
      setCount(Math.floor(easeProgress * end));
      if (progress < 1) requestAnimationFrame(update);
    };
    requestAnimationFrame(update);
  }, [variation]);

  return (
    <div className="flex flex-col items-center">
      <div className={`font-black font-mono text-white tabular-nums drop-shadow-2xl transition-all duration-500 ${variation === 1 ? 'text-6xl text-emerald-400' : 'text-8xl'}`}>
        {variation === 1 && <span className="text-3xl mr-2 text-slate-500">$</span>}
        {count.toLocaleString()}
        {variation === 0 && <span className="text-4xl ml-2 opacity-50">%</span>}
        {variation === 2 && <span className="text-4xl ml-2 text-rose-500">s</span>}
      </div>
      <div className="mt-4 text-xs font-bold text-slate-500 uppercase tracking-widest">
        {variation === 0 ? '百分比进度' : variation === 1 ? '财务数据增长' : '倒计时组件'}
      </div>
    </div>
  );
};

// Added React.FC to sub-components to handle standard React attributes like 'key'
const TextSlidePreview: React.FC<{ variation: number }> = ({ variation }) => (
  <div className="flex flex-col items-center gap-4 overflow-hidden py-10">
    <div className={`text-4xl font-black tracking-tighter transition-all duration-700 ${
      variation === 0 ? 'animate-[slideUp_0.8s_ease-out_forwards]' :
      variation === 1 ? 'animate-[slideLeft_0.8s_ease-out_forwards]' :
      'animate-[blurIn_1s_ease-out_forwards]'
    }`}>
      {variation === 0 ? '向上滑入演示' : variation === 1 ? '横向滑入效果' : '高斯模糊入场'}
    </div>
    <div className="animate-[fadeIn_1s_ease-out_0.6s_forwards] opacity-0 text-xl text-purple-400 flex gap-2">
       <span>ADOBE</span>
       <span className="bg-purple-600/20 px-2 py-0.5 rounded border border-purple-500/30">AFTER EFFECTS</span>
    </div>
    <style dangerouslySetInnerHTML={{ __html: `
      @keyframes slideUp { from { transform: translateY(100%); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
      @keyframes slideLeft { from { transform: translateX(100%); opacity: 0; } to { transform: translateX(0); opacity: 1; } }
      @keyframes blurIn { from { filter: blur(20px); opacity: 0; transform: scale(0.9); } to { filter: blur(0); opacity: 1; transform: scale(1); } }
      @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
    `}} />
  </div>
);

// Added React.FC to sub-components to handle standard React attributes like 'key'
const BarGrowthPreview: React.FC<{ variation: number }> = ({ variation }) => (
  <div className={`flex items-end gap-4 h-48 transition-all ${variation === 1 ? 'flex-col justify-center items-stretch w-2/3 h-auto gap-3' : ''}`}>
    {[60, 100, 40, 85, 55].map((h, i) => (
      <div 
        key={i} 
        className={`rounded-lg origin-bottom animate-[barGrow_1.2s_ease-out_forwards] scale-0 shadow-lg ${
          variation === 0 ? 'w-12 bg-gradient-to-t from-purple-700 to-indigo-400' :
          variation === 1 ? 'h-6 bg-gradient-to-r from-emerald-600 to-teal-400 origin-left' :
          'w-12 border-2 border-white/20 bg-white/5 backdrop-blur-sm'
        }`}
        style={{ 
          height: variation === 1 ? '24px' : `${h}%`, 
          width: variation === 1 ? `${h}%` : '48px',
          animationDelay: `${i * 0.1}s`,
          transformOrigin: variation === 1 ? 'left' : 'bottom'
        }}
      />
    ))}
    <style dangerouslySetInnerHTML={{ __html: `
      @keyframes barGrow { from { transform: scale(0); } to { transform: scale(1); } }
    `}} />
  </div>
);

// Added React.FC to sub-components to handle standard React attributes like 'key'
const MaskPushPreview: React.FC<{ variation: number }> = ({ variation }) => (
  <div className="relative w-full h-full p-12">
    <div className={`absolute inset-0 bg-slate-800 transition-colors duration-500 ${variation === 1 ? 'bg-indigo-900/50' : variation === 2 ? 'bg-rose-900/20' : ''}`}></div>
    <div className={`absolute inset-0 bg-gradient-to-br from-indigo-600 to-purple-800 flex items-center justify-center overflow-hidden transition-all duration-1000 ${
      variation === 0 ? 'animate-[maskLeft_2s_infinite_alternate]' :
      variation === 1 ? 'animate-[maskTop_2s_infinite_alternate]' :
      'animate-[maskCenter_2s_infinite_alternate]'
    }`}>
       <div className="text-4xl font-black italic tracking-widest text-white drop-shadow-xl text-center px-10">
          {variation === 0 ? 'SLIDE REVEAL' : variation === 1 ? 'VERTICAL MASK' : 'CENTER OUT'}
       </div>
    </div>
    <style dangerouslySetInnerHTML={{ __html: `
      @keyframes maskLeft { 0% { clip-path: inset(0 100% 0 0); } 50%, 100% { clip-path: inset(0 0 0 0); } }
      @keyframes maskTop { 0% { clip-path: inset(0 0 100% 0); } 50%, 100% { clip-path: inset(0 0 0 0); } }
      @keyframes maskCenter { 0% { clip-path: circle(0% at 50% 50%); } 50%, 100% { clip-path: circle(100% at 50% 50%); } }
    `}} />
  </div>
);

// Added React.FC to sub-components to handle standard React attributes like 'key'
const CameraZoomPreview: React.FC<{ variation: number }> = ({ variation }) => (
  <div className="w-full h-full flex items-center justify-center overflow-hidden bg-black">
    <div className={`relative transition-all duration-1000 flex items-center justify-center ${
      variation === 0 ? 'animate-[cameraZoom_4s_infinite_alternate]' :
      variation === 1 ? 'animate-[cameraShake_4s_infinite]' :
      'animate-[cameraRotate_4s_infinite_alternate]'
    }`}>
      <img src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800" className="w-64 h-64 object-cover rounded-2xl shadow-2xl border-2 border-white/20" alt="Sample" />
      <div className="absolute inset-0 ring-4 ring-white/10 rounded-2xl"></div>
    </div>
    <style dangerouslySetInnerHTML={{ __html: `
      @keyframes cameraZoom { 0% { transform: scale(0.8); } 100% { transform: scale(1.6); } }
      @keyframes cameraShake { 0%, 100% { transform: scale(1.2) translate(0,0); } 25% { transform: scale(1.2) translate(10px, -5px); } 50% { transform: scale(1.2) translate(-5px, 10px); } 75% { transform: scale(1.2) translate(-10px, -10px); } }
      @keyframes cameraRotate { 0% { transform: scale(1.2) rotate(-10deg); } 100% { transform: scale(1.2) rotate(10deg); } }
    `}} />
  </div>
);

// Added React.FC to sub-components to handle standard React attributes like 'key'
const ShapeTrimPreview: React.FC<{ variation: number }> = ({ variation }) => (
  <svg viewBox="0 0 200 200" className="w-64 h-64 drop-shadow-[0_0_20px_rgba(168,85,247,0.4)]">
    {variation === 0 ? (
      <circle cx="100" cy="100" r="80" fill="none" stroke="#a855f7" strokeWidth="8" strokeDasharray="502" strokeDashoffset="502" className="animate-[draw_2s_ease-in-out_infinite_alternate]" />
    ) : variation === 1 ? (
      <rect x="20" y="20" width="160" height="160" fill="none" stroke="#22d3ee" strokeWidth="8" strokeDasharray="640" strokeDashoffset="640" className="animate-[draw_2s_ease-in-out_infinite_alternate]" />
    ) : (
      <path d="M100 20 L180 160 L20 160 Z" fill="none" stroke="#f43f5e" strokeWidth="8" strokeDasharray="480" strokeDashoffset="480" className="animate-[draw_2s_ease-in-out_infinite_alternate]" />
    )}
    <style dangerouslySetInnerHTML={{ __html: `
      @keyframes draw { from { stroke-dashoffset: 640; } to { stroke-dashoffset: 0; } }
    `}} />
  </svg>
);

// Added React.FC to sub-components to handle standard React attributes like 'key'
const SlideTransitionPreview: React.FC<{ variation: number }> = ({ variation }) => (
  <div className="relative w-full h-full overflow-hidden flex bg-slate-900">
    <div className={`shrink-0 w-full h-full flex items-center justify-center transition-all duration-700 ${
      variation === 0 ? 'bg-slate-800 animate-[sceneX_4s_infinite]' :
      variation === 1 ? 'bg-indigo-900 animate-[sceneY_4s_infinite]' :
      'bg-slate-800 animate-[sceneZoom_4s_infinite]'
    }`}>
       <div className="text-2xl font-black">A-SIDE</div>
    </div>
    <div className={`shrink-0 w-full h-full flex items-center justify-center transition-all duration-700 ${
      variation === 0 ? 'bg-indigo-900 animate-[sceneX_4s_infinite]' :
      variation === 1 ? 'bg-rose-900 animate-[sceneY_4s_infinite]' :
      'bg-indigo-900 animate-[sceneZoom_4s_infinite]'
    }`}>
       <div className="text-2xl font-black">B-SIDE</div>
    </div>
    <style dangerouslySetInnerHTML={{ __html: `
      @keyframes sceneX { 0%, 45% { transform: translateX(0); } 55%, 100% { transform: translateX(-100%); } }
      @keyframes sceneY { 0%, 45% { transform: translateY(0); } 55%, 100% { transform: translateY(-100%); } }
      @keyframes sceneZoom { 0%, 45% { transform: scale(1); opacity: 1; } 55%, 100% { transform: scale(0); opacity: 0; } }
    `}} />
  </div>
);

// Added React.FC to sub-components to handle standard React attributes like 'key'
const TrackingPreview: React.FC<{ variation: number }> = ({ variation }) => (
  <div className="relative w-full h-full bg-slate-950 flex items-center justify-center overflow-hidden">
    {/* Grid Background */}
    <div className="absolute inset-0 opacity-10" style={{backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '20px 20px'}}></div>
    
    <div className={`w-12 h-12 bg-white rounded-full transition-all duration-500 animate-[move_4s_infinite_alternate] shadow-[0_0_30px_rgba(255,255,255,0.4)] ${variation === 1 ? 'bg-indigo-400' : variation === 2 ? 'bg-rose-500' : ''}`}></div>
    
    <div className="absolute animate-[move_4s_infinite_alternate] mt-[-60px] ml-16 flex flex-col items-start">
      {variation === 0 ? (
        <>
          <div className="w-px h-10 bg-white/40 mb-1 origin-bottom animate-[scaleLine_4s_infinite_alternate]"></div>
          <div className="bg-white text-black text-[10px] px-2 py-1 rounded font-black whitespace-nowrap shadow-xl">
            COORDINATE: X42.Y91
          </div>
        </>
      ) : variation === 1 ? (
        <div className="flex items-center gap-2 bg-indigo-500/20 backdrop-blur-md border border-indigo-500/30 p-2 rounded-lg">
           <div className="w-6 h-6 rounded bg-indigo-500 flex items-center justify-center"><i className="fas fa-tag text-[10px]"></i></div>
           <div className="text-[10px] font-bold text-indigo-100">TARGET_LOCKED</div>
        </div>
      ) : (
        <div className="w-24 h-24 border border-rose-500/50 rounded-full flex items-center justify-center animate-pulse">
           <div className="w-2 h-2 bg-rose-500 rounded-full"></div>
        </div>
      )}
    </div>
    <style dangerouslySetInnerHTML={{ __html: `
      @keyframes move { 0% { transform: translate(-100px, 40px); } 100% { transform: translate(100px, -40px); } }
      @keyframes scaleLine { from { transform: scaleY(0.5); opacity: 0.2; } to { transform: scaleY(1.5); opacity: 0.8; } }
    `}} />
  </div>
);

// Added React.FC to sub-components to handle standard React attributes like 'key'
const LogoAnimPreview: React.FC<{ variation: number }> = ({ variation }) => (
  <div className="flex flex-col items-center gap-8">
    <div className="w-32 h-32 relative flex items-center justify-center">
      {variation === 0 ? (
        <>
          <div className="absolute inset-0 border-2 border-dashed border-white/20 rounded-full animate-[spin_20s_linear_infinite]"></div>
          <div className="w-16 h-16 bg-gradient-to-br from-purple-600 to-indigo-600 rounded-2xl animate-[logoIn_1s_cubic-bezier(0.34,1.56,0.64,1)_forwards] shadow-2xl"></div>
        </>
      ) : variation === 1 ? (
        <div className="grid grid-cols-2 gap-2 animate-[logoGrid_2s_infinite_alternate]">
           {[1,2,3,4].map(i => <div key={i} className="w-8 h-8 bg-white rounded-lg opacity-80"></div>)}
        </div>
      ) : (
        <div className="w-20 h-20 bg-rose-600 rounded-full flex items-center justify-center animate-[logoMorph_3s_infinite_alternate]">
           <i className="fas fa-bolt text-3xl"></i>
        </div>
      )}
    </div>
    <div className="overflow-hidden">
      <div className="text-3xl font-black tracking-[0.2em] animate-[logoTextIn_1.5s_ease-out_forwards]">
        {variation === 0 ? 'CONCEPT' : variation === 1 ? 'MODULAR' : 'ENERGY'}
      </div>
    </div>
    <style dangerouslySetInnerHTML={{ __html: `
      @keyframes logoIn { from { transform: scale(0) rotate(-180deg); } to { transform: scale(1) rotate(0); } }
      @keyframes logoGrid { from { gap: 4px; transform: scale(0.8); } to { gap: 12px; transform: scale(1.1); } }
      @keyframes logoMorph { 0% { border-radius: 50%; } 100% { border-radius: 10%; transform: rotate(180deg); } }
      @keyframes logoTextIn { from { transform: translateY(100%); opacity: 0; filter: blur(10px); } to { transform: translateY(0); opacity: 1; filter: blur(0); } }
    `}} />
  </div>
);

// Added React.FC to sub-components to handle standard React attributes like 'key'
const PieChartPreview: React.FC<{ variation: number }> = ({ variation }) => (
  <div className="w-64 h-64 relative flex items-center justify-center">
    <svg viewBox="0 0 100 100" className="rotate-[-90deg] w-full h-full drop-shadow-2xl">
      <circle cx="50" cy="50" r="40" fill="transparent" stroke="rgba(255,255,255,0.05)" strokeWidth={variation === 1 ? "2" : "12"} />
      <circle 
        cx="50" cy="50" r="40" fill="transparent" 
        stroke={variation === 0 ? "#8b5cf6" : variation === 1 ? "#2dd4bf" : "#fb7185"} 
        strokeWidth={variation === 1 ? "2" : "12"}
        strokeDasharray="251.2" 
        strokeDashoffset="251.2"
        strokeLinecap="round"
        className="animate-[drawPie_1.5s_cubic-bezier(0.65,0,0.35,1)_forwards]"
        style={{ strokeDashoffset: `${251.2 * (1 - (variation === 0 ? 0.75 : variation === 1 ? 0.45 : 0.9))}` }}
      />
    </svg>
    <div className="absolute flex flex-col items-center">
       <span className={`font-black tracking-tighter ${variation === 1 ? 'text-4xl text-teal-400' : 'text-5xl'}`}>
         {variation === 0 ? '75%' : variation === 1 ? '45%' : '90%'}
       </span>
       <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mt-1">COMPLETION</span>
    </div>
    <style dangerouslySetInnerHTML={{ __html: `
      @keyframes drawPie { from { stroke-dashoffset: 251.2; } }
    `}} />
  </div>
);

// Added React.FC to sub-components to handle standard React attributes like 'key'
const MGElementsPreview: React.FC<{ variation: number }> = ({ variation }) => (
  <div className="relative w-full h-full overflow-hidden">
    {variation === 0 ? (
      [...Array(12)].map((_, i) => (
        <div key={i} className="absolute w-2 h-2 rounded-full bg-indigo-500 animate-[mgFloat_4s_infinite]"
          style={{ left: `${Math.random() * 80 + 10}%`, top: `${Math.random() * 80 + 10}%`, animationDelay: `${i * 0.2}s` }}
        />
      ))
    ) : variation === 1 ? (
      <div className="absolute inset-0 flex items-center justify-center">
         <div className="w-32 h-32 border-2 border-rose-500/30 rounded-full animate-ping"></div>
         <div className="w-24 h-24 border-2 border-rose-500/50 rounded-full animate-ping" style={{animationDelay: '0.3s'}}></div>
         <div className="w-16 h-16 bg-rose-500 rounded-full animate-pulse shadow-[0_0_40px_rgba(244,63,94,0.4)]"></div>
      </div>
    ) : (
      <div className="flex gap-4">
         {[1,2,3,4,5].map(i => (
           <div key={i} className="w-10 h-10 bg-white/10 rounded-lg animate-[mgBounce_1s_infinite_alternate]" style={{animationDelay: `${i * 0.1}s`}}></div>
         ))}
      </div>
    )}
    <style dangerouslySetInnerHTML={{ __html: `
      @keyframes mgFloat { 0%, 100% { transform: translate(0,0) scale(1); opacity: 0; } 50% { transform: translate(20px,-30px) scale(1.5); opacity: 0.8; } }
      @keyframes mgBounce { from { transform: translateY(20px) rotate(0deg); opacity: 0.2; } to { transform: translateY(-20px) rotate(45deg); opacity: 0.8; } }
    `}} />
  </div>
);

export default MotionPreview;
