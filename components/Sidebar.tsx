
import React from 'react';
import { MANUAL_CONTENT } from '../constants';

interface Props {
  activeId: string;
  onSelect: (id: string) => void;
}

const Sidebar: React.FC<Props> = ({ activeId, onSelect }) => {
  return (
    <aside className="w-72 flex-shrink-0 border-r border-slate-800 h-full overflow-y-auto custom-scrollbar bg-slate-900/50 backdrop-blur-xl">
      <div className="p-6">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 ae-gradient rounded-lg flex items-center justify-center shadow-lg shadow-purple-900/20">
            <span className="text-xl font-bold italic tracking-tighter">Ae</span>
          </div>
          <div>
            <h1 className="text-sm font-bold tracking-tight leading-none">AE 动效手册</h1>
            <p className="text-[10px] text-slate-500 uppercase tracking-widest mt-1 font-semibold">Motion Guide</p>
          </div>
        </div>
        
        <nav className="space-y-1">
          {MANUAL_CONTENT.map((section, idx) => (
            <button
              key={section.id}
              onClick={() => onSelect(section.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group text-left ${
                activeId === section.id 
                  ? 'bg-purple-600/20 text-purple-400 border border-purple-500/30' 
                  : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200 border border-transparent'
              }`}
            >
              <span className={`text-xs font-mono font-bold w-5 ${activeId === section.id ? 'text-purple-400' : 'text-slate-600'}`}>
                {String(idx + 1).padStart(2, '0')}
              </span>
              <span className="text-sm font-medium">{section.title}</span>
              {activeId === section.id && (
                <div className="ml-auto w-1.5 h-1.5 rounded-full bg-purple-500 shadow-[0_0_8px_rgba(168,85,247,1)]"></div>
              )}
            </button>
          ))}
        </nav>
      </div>

      <div className="p-6 mt-auto">
        <div className="bg-slate-800/40 rounded-2xl p-4 border border-slate-700/50">
          <p className="text-xs text-slate-400 leading-relaxed mb-3">想要深入学习？查看 Adobe 官方文档获取更多高级技巧。</p>
          <a href="https://helpx.adobe.com/after-effects/user-guide.html" target="_blank" rel="noopener noreferrer" className="text-xs font-bold text-purple-400 hover:text-purple-300 flex items-center gap-2">
            前往官网 <i className="fas fa-external-link-alt"></i>
          </a>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
