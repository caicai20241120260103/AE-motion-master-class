
import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import ContentArea from './components/ContentArea';
import { MANUAL_CONTENT } from './constants';
import { SectionID } from './types';

const App: React.FC = () => {
  const [activeId, setActiveId] = useState<string>(SectionID.DIGITAL_COUNTER);

  const activeSection = MANUAL_CONTENT.find(s => s.id === activeId) || MANUAL_CONTENT[0];

  return (
    <div className="flex h-screen w-full bg-slate-950 text-slate-200 overflow-hidden font-sans selection:bg-purple-500/30">
      {/* Mobile Sidebar Toggle - Hidden for now as simplified sidebar is desktop-ready */}
      
      {/* Main Sidebar */}
      <Sidebar activeId={activeId} onSelect={setActiveId} />

      {/* Main Content Container */}
      <main className="flex-1 flex flex-col min-w-0">
        {/* Simple Top Navigation / Branding */}
        <header className="h-16 border-b border-slate-900 flex items-center justify-between px-8 bg-slate-950/50 backdrop-blur-md z-20">
          <div className="flex items-center gap-2 text-slate-400 text-xs font-medium">
            <span className="hover:text-white transition-colors cursor-pointer">Motion Graphics</span>
            <i className="fas fa-chevron-right text-[8px]"></i>
            <span className="text-white font-bold">{activeSection.title}</span>
          </div>
          <div className="flex items-center gap-4">
             <button className="p-2 hover:bg-slate-800 rounded-lg text-slate-400 transition-colors">
               <i className="fas fa-search"></i>
             </button>
             <button className="p-2 hover:bg-slate-800 rounded-lg text-slate-400 transition-colors">
               <i className="fas fa-bell"></i>
             </button>
             <div className="w-8 h-8 rounded-full bg-purple-600 flex items-center justify-center text-xs font-bold border border-purple-400">
               ME
             </div>
          </div>
        </header>

        {/* Content Body */}
        <ContentArea section={activeSection} />
      </main>

      {/* Background Decor */}
      <div className="fixed top-[-10%] right-[-10%] w-[50%] h-[50%] bg-purple-900/10 blur-[150px] -z-10 pointer-events-none"></div>
      <div className="fixed bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-900/10 blur-[150px] -z-10 pointer-events-none"></div>
    </div>
  );
};

export default App;
