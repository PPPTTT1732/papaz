import React, { useState } from 'react';
import { Icon } from '@iconify/react';

interface ActiveSession {
  id: string;
  title: string;
  hlsUrl: string;
}

interface ProfessorActiveMeetViewProps {
  readonly active: ActiveSession;
  readonly stopMeet: (id: string) => Promise<void>;
  readonly profName: string;
}

export function ProfessorActiveMeetView({ active, stopMeet, profName }: ProfessorActiveMeetViewProps) {
  const [showEmbed, setShowEmbed] = useState(false);
  const isJitsi = active.hlsUrl.includes('meet.jit.si');
  const iframeSrc = `${active.hlsUrl}#config.prejoinPageEnabled=false&userInfo.displayName=${encodeURIComponent(profName)}`;

  return (
    <div className="space-y-4 w-full">
      <div className="bg-emerald-50/40 border border-emerald-100/50 rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <span className="text-[8.5px] font-black uppercase text-emerald-600 bg-emerald-100/50 px-2 py-0.5 rounded-md inline-block mb-1">En Cours</span>
          <h5 className="font-bold text-xs text-neutral-800 leading-tight">{active.title}</h5>
        </div>
        <div className="flex flex-wrap items-center gap-2 shrink-0">
          {isJitsi && (
            <button
              onClick={() => setShowEmbed(!showEmbed)}
              className="px-3.5 py-2 bg-neutral-800 hover:bg-neutral-900 text-white rounded-xl font-bold text-[10px] flex items-center gap-1 transition-all cursor-pointer"
            >
              <Icon icon={showEmbed ? "lucide:eye-off" : "lucide:eye"} className="h-3.5 w-3.5" />
              {showEmbed ? "Masquer la classe" : "Rejoindre ici"}
            </button>
          )}
          <a href={active.hlsUrl} target="_blank" rel="noopener noreferrer" className="px-3.5 py-2 bg-[#1a73e8] hover:bg-[#1557b0] text-white rounded-xl font-bold text-[10px] flex items-center gap-1 transition-all">
            <Icon icon="lucide:external-link" className="h-3.5 w-3.5" /> Ouvrir l'appel
          </a>
          <button onClick={() => stopMeet(active.id)} className="px-3.5 py-2 bg-[#B3181C] hover:bg-[#8c1215] text-white rounded-xl font-bold text-[10px] cursor-pointer">
            Terminer
          </button>
        </div>
      </div>

      {showEmbed && isJitsi && (
        <div className="w-full h-[400px] bg-neutral-950 border border-neutral-800 rounded-2xl overflow-hidden shadow-inner animate-scale-up">
          <iframe
            src={iframeSrc}
            className="w-full h-full border-0"
            allow="camera; microphone; fullscreen; display-capture; autoplay; clipboard-write"
            title="Classe virtuelle intégrée"
          />
        </div>
      )}
    </div>
  );
}

export default ProfessorActiveMeetView;
