
import React from 'react';
import { SectionContent } from '../types';
import MotionPreview from './MotionPreview';

interface Props {
  section: SectionContent;
}

const ContentArea: React.FC<Props> = ({ section }) => {
  return (
    <div className="flex-1 overflow-y-auto custom-scrollbar bg-slate-950">
      <div className="max-w-7xl mx-auto p-6 lg:p-12 pb-24">
        {/* Header Section */}
        <header className="mb-12 animate-fadeIn text-center lg:text-left">
          <div className="inline-block px-4 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-xs font-bold tracking-widest uppercase mb-4">
            AE Motion Module: {section.id.replace('-', ' ')}
          </div>
          <h2 className="text-4xl lg:text-7xl font-black mb-6 tracking-tighter text-white">{section.title}</h2>
          <p className="text-xl text-slate-400 leading-relaxed max-w-4xl">
            {section.description}
          </p>
        </header>

        {/* Large Primary Preview Section */}
        <section className="mb-20">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-sm font-bold text-slate-500 uppercase tracking-widest flex items-center gap-2">
               <i className="fas fa-play-circle text-purple-500"></i> 实时动效示范库 (Live Animation Gallery)
            </h3>
            <div className="hidden sm:flex items-center gap-2 text-[10px] text-slate-500 bg-slate-900/50 px-3 py-1 rounded-full border border-slate-800">
              <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></span>
              RENDER ENGINE ACTIVE
            </div>
          </div>
          <MotionPreview type={section.previewType} />
        </section>

        {/* Detailed Info Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 pt-12 border-t border-white/5">
          {/* Main Steps Column */}
          <div className="lg:col-span-7 space-y-12">
            <section className="bg-slate-900/20 rounded-[3rem] p-10 border border-white/5 backdrop-blur-sm shadow-2xl">
              <h3 className="text-2xl font-bold mb-10 flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-purple-600 to-indigo-600 flex items-center justify-center shadow-lg shadow-purple-900/40">
                  <i className="fas fa-terminal text-white text-sm"></i>
                </div>
                核心制作步骤
              </h3>
              <ul className="space-y-10">
                {section.steps.map((step, i) => (
                  <li key={i} className="flex gap-8 group">
                    <span className="shrink-0 w-12 h-12 rounded-2xl bg-slate-800 border border-slate-700 flex items-center justify-center text-sm font-black text-purple-400 shadow-xl group-hover:border-purple-500/50 transition-all group-hover:scale-110">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <p className="text-slate-300 text-xl leading-snug pt-2 group-hover:text-white transition-colors">{step}</p>
                  </li>
                ))}
              </ul>
            </section>
          </div>

          {/* Code & Tips Column */}
          <div className="lg:col-span-5 space-y-10">
            {/* Expression if any */}
            {section.expression && (
              <section className="space-y-4">
                <h3 className="text-sm font-bold text-slate-500 uppercase tracking-widest flex items-center gap-2">
                   <i className="fas fa-magic text-purple-500"></i> AE 表达式
                </h3>
                <div className="bg-slate-900 rounded-[2.5rem] p-8 border border-white/5 font-mono text-sm relative overflow-hidden group shadow-inner">
                  <div className="absolute top-4 right-4">
                    <button 
                      onClick={() => navigator.clipboard.writeText(section.expression || '')}
                      className="p-3 bg-slate-800/50 hover:bg-purple-600 hover:text-white rounded-xl text-slate-400 transition-all border border-slate-700"
                      title="Copy Code"
                    >
                      <i className="far fa-copy"></i>
                    </button>
                  </div>
                  <pre className="text-purple-300 overflow-x-auto whitespace-pre-wrap pr-12 text-base leading-relaxed selection:bg-purple-500/30">
                    <code>{section.expression}</code>
                  </pre>
                </div>
              </section>
            )}

            {/* Tips Section */}
            {section.tips && (
              <section className="bg-indigo-600/5 rounded-[2.5rem] p-8 border border-indigo-500/10 shadow-lg">
                <h4 className="text-sm font-bold text-indigo-400 uppercase tracking-widest mb-6 flex items-center gap-3">
                   <i className="fas fa-lightbulb"></i> 专家避坑指南
                </h4>
                <ul className="space-y-5">
                  {section.tips.map((tip, i) => (
                    <li key={i} className="text-slate-400 flex gap-4 text-base leading-relaxed group">
                      <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-indigo-500 group-hover:scale-150 transition-transform"></div>
                      {tip}
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {/* Practice Advice */}
            <div className="bg-slate-900/30 border border-white/5 rounded-[2.5rem] p-8">
               <h4 className="text-sm font-bold text-slate-400 mb-4 uppercase flex items-center gap-2">
                 <i className="fas fa-graduation-cap"></i> 课后实操建议
               </h4>
               <p className="text-base text-slate-500 leading-relaxed italic">
                 "动效的灵魂在于节奏。" 建议在 AE 中反复对比「线性关键帧」与「缓动关键帧」的视觉差异。
               </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContentArea;
