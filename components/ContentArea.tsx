
import React from 'react';
import { SectionContent } from '../types';
import MotionPreview from './MotionPreview';

interface Props {
  section: SectionContent;
}

const ContentArea: React.FC<Props> = ({ section }) => {
  return (
    <div className="flex-1 overflow-y-auto custom-scrollbar bg-slate-950">
      <div className="max-w-4xl mx-auto p-8 lg:p-12 pb-24">
        {/* Header Section */}
        <header className="mb-10 animate-fadeIn">
          <div className="inline-block px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-xs font-bold tracking-widest uppercase mb-4">
            Chapter {section.id.replace('-', ' ')}
          </div>
          <h2 className="text-4xl lg:text-5xl font-black mb-6 tracking-tight text-white">{section.title}</h2>
          <p className="text-lg text-slate-400 leading-relaxed max-w-3xl">
            {section.description}
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Main Info Column */}
          <div className="lg:col-span-7 space-y-10">
            {/* Steps */}
            <section className="bg-slate-900/50 rounded-3xl p-8 border border-slate-800">
              <h3 className="text-xl font-bold mb-6 flex items-center gap-3">
                <i className="fas fa-list-ol text-purple-500"></i> 操作步骤
              </h3>
              <ul className="space-y-6">
                {section.steps.map((step, i) => (
                  <li key={i} className="flex gap-4">
                    <span className="shrink-0 w-8 h-8 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-xs font-bold text-purple-400 shadow-lg">
                      {i + 1}
                    </span>
                    <p className="text-slate-300 leading-relaxed pt-1">{step}</p>
                  </li>
                ))}
              </ul>
            </section>

            {/* Expression if any */}
            {section.expression && (
              <section>
                <h3 className="text-sm font-bold text-slate-500 uppercase tracking-widest mb-4 flex items-center gap-2">
                   <i className="fas fa-code"></i> Expression Code
                </h3>
                <div className="bg-slate-900 rounded-2xl p-6 border border-slate-800 font-mono text-sm relative overflow-hidden group">
                  <div className="absolute top-0 right-0 p-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button 
                      onClick={() => navigator.clipboard.writeText(section.expression || '')}
                      className="p-2 hover:bg-slate-800 rounded-lg text-slate-400"
                    >
                      <i className="far fa-copy"></i>
                    </button>
                  </div>
                  <pre className="text-purple-300 overflow-x-auto whitespace-pre-wrap">
                    <code>{section.expression}</code>
                  </pre>
                </div>
              </section>
            )}

            {/* Tips */}
            {section.tips && (
              <section className="bg-indigo-600/10 rounded-2xl p-6 border border-indigo-500/20">
                <h4 className="text-xs font-bold text-indigo-400 uppercase tracking-widest mb-3 flex items-center gap-2">
                   <i className="fas fa-lightbulb"></i> 专业提示
                </h4>
                <ul className="space-y-2">
                  {section.tips.map((tip, i) => (
                    <li key={i} className="text-sm text-indigo-200/80 flex gap-2">
                      <span className="text-indigo-500">•</span>
                      {tip}
                    </li>
                  ))}
                </ul>
              </section>
            )}
          </div>

          {/* Interactive Preview Column */}
          <div className="lg:col-span-5">
            <div className="sticky top-8 space-y-6">
              <h3 className="text-sm font-bold text-slate-500 uppercase tracking-widest flex items-center gap-2">
                 <i className="fas fa-play-circle"></i> 动态预览
              </h3>
              <MotionPreview type={section.previewType} />
              
              <div className="bg-slate-900/30 border border-slate-800/50 rounded-2xl p-6">
                 <h4 className="text-xs font-bold text-slate-400 mb-4 uppercase">练习建议</h4>
                 <p className="text-xs text-slate-500 leading-relaxed italic">
                   打开 After Effects，尝试按照左侧的步骤还原这个效果。调节关键帧的“缓动曲线 (F9)”以观察不同的动态节奏。
                 </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContentArea;
