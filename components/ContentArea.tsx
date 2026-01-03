
import React from 'react';
import { SectionContent } from '../types';
import MotionPreview from './MotionPreview';

interface Props {
  section: SectionContent;
}

const ContentArea: React.FC<Props> = ({ section }) => {
  return (
    <div className="flex-1 overflow-y-auto custom-scrollbar bg-slate-950">
      <div className="max-w-6xl mx-auto p-6 lg:p-12 pb-24">
        {/* Header Section */}
        <header className="mb-12 animate-fadeIn text-center">
          <div className="inline-block px-4 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-xs font-bold tracking-widest uppercase mb-4">
            Module: {section.id.replace('-', ' ')}
          </div>
          <h2 className="text-4xl lg:text-6xl font-black mb-6 tracking-tighter text-white">{section.title}</h2>
          <p className="text-xl text-slate-400 leading-relaxed max-w-3xl mx-auto">
            {section.description}
          </p>
        </header>

        {/* Large Primary Preview Section */}
        <section className="mb-16">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-sm font-bold text-slate-500 uppercase tracking-widest flex items-center gap-2">
               <i className="fas fa-play-circle text-purple-500"></i> 多维动效示范 (Multiple Demonstrations)
            </h3>
            <span className="text-xs text-slate-500 bg-slate-900 px-3 py-1 rounded-full border border-slate-800">
              交互式实时预览
            </span>
          </div>
          <MotionPreview type={section.previewType} />
        </section>

        {/* Detailed Info Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 border-t border-slate-900 pt-16">
          {/* Main Steps Column */}
          <div className="lg:col-span-7 space-y-12">
            <section className="bg-slate-900/30 rounded-[2rem] p-10 border border-slate-800/50 backdrop-blur-sm">
              <h3 className="text-2xl font-bold mb-8 flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-purple-600 flex items-center justify-center shadow-lg shadow-purple-900/40">
                  <i className="fas fa-list-ol text-white text-sm"></i>
                </div>
                操作指南
              </h3>
              <ul className="space-y-8">
                {section.steps.map((step, i) => (
                  <li key={i} className="flex gap-6 group">
                    <span className="shrink-0 w-10 h-10 rounded-2xl bg-slate-800 border border-slate-700 flex items-center justify-center text-sm font-bold text-purple-400 shadow-xl group-hover:border-purple-500/50 transition-colors">
                      {i + 1}
                    </span>
                    <p className="text-slate-300 text-lg leading-relaxed pt-1.5">{step}</p>
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
                   <i className="fas fa-code"></i> 表达式参考 (Expressions)
                </h3>
                <div className="bg-slate-900 rounded-3xl p-8 border border-slate-800 font-mono text-sm relative overflow-hidden group shadow-2xl">
                  <div className="absolute top-4 right-4">
                    <button 
                      onClick={() => navigator.clipboard.writeText(section.expression || '')}
                      className="p-3 bg-slate-800 hover:bg-slate-700 rounded-xl text-slate-400 transition-all border border-slate-700"
                    >
                      <i className="far fa-copy"></i>
                    </button>
                  </div>
                  <pre className="text-purple-300 overflow-x-auto whitespace-pre-wrap pr-12 text-base leading-relaxed">
                    <code>{section.expression}</code>
                  </pre>
                </div>
              </section>
            )}

            {/* Tips Section */}
            {section.tips && (
              <section className="bg-indigo-600/5 rounded-3xl p-8 border border-indigo-500/10">
                <h4 className="text-sm font-bold text-indigo-400 uppercase tracking-widest mb-6 flex items-center gap-3">
                   <i className="fas fa-star"></i> Pro Tips & 避坑指南
                </h4>
                <ul className="space-y-4">
                  {section.tips.map((tip, i) => (
                    <li key={i} className="text-slate-400 flex gap-3 text-base leading-relaxed">
                      <i className="fas fa-check-circle text-indigo-500/50 mt-1"></i>
                      {tip}
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {/* Practice Advice */}
            <div className="bg-slate-900/30 border border-slate-800/50 rounded-3xl p-8">
               <h4 className="text-sm font-bold text-slate-400 mb-4 uppercase flex items-center gap-2">
                 <i className="fas fa-keyboard"></i> 实战练习
               </h4>
               <p className="text-sm text-slate-500 leading-relaxed italic">
                 "动效学习的核心是手感。" 尝试调节关键帧的“缓动控制点”，体验动画从“机械运动”到“自然流畅”的蜕变。
               </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContentArea;
