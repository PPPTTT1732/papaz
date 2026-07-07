import React, { useState } from 'react';
import { Icon } from '@iconify/react';
import { motion } from 'motion/react';
import { LiveSession } from '@/features/student/types';

interface RealTimeMeetRoomProps {
  readonly selectedLive: LiveSession;
  readonly onLeave: () => void;
  readonly triggerToast: (msg: string) => void;
  readonly userName?: string;
}

export function RealTimeMeetRoom({ selectedLive, onLeave, triggerToast, userName }: RealTimeMeetRoomProps) {
  const meetUrl = selectedLive.hlsUrl || "https://meet.google.com";
  const isJitsi = meetUrl.includes('meet.jit.si');
  const [embedActive, setEmbedActive] = useState(isJitsi);
  const iframeSrc = `${meetUrl}#config.prejoinPageEnabled=false&userInfo.displayName=${encodeURIComponent(userName || "Élève")}`;

  const handleOpenMeet = () => {
    window.open(meetUrl, '_blank', 'noopener,noreferrer');
    triggerToast(isJitsi ? "Ouverture..." : "Ouverture de Google Meet...");
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}
      className="w-full bg-neutral-950 rounded-3xl overflow-hidden relative border-4 border-[#B3181C] shadow-[0_0_50px_rgba(179,24,28,0.3)] flex flex-col min-h-[500px] h-full justify-between"
    >
      <div className="p-4 bg-neutral-900 border-b border-white/5 flex items-center justify-between z-10 shadow-md">
        <div className="flex items-center gap-2.5 min-w-0">
          <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-ping shrink-0" />
          <span className="font-mono text-[9px] font-black text-red-500 uppercase tracking-widest shrink-0">
            {isJitsi ? "Amphi Virtuel Jitsi" : "Amphi Google Meet"}
          </span>
          <span className="text-white/20 text-xs">|</span>
          <h4 className="text-xs font-bold text-white truncate">{selectedLive.courseName}</h4>
        </div>
        <div className="flex items-center gap-2">
          {isJitsi && (
            <button onClick={() => setEmbedActive(!embedActive)} className="bg-white/10 hover:bg-white/15 border border-white/10 text-white px-2.5 py-1.5 rounded-xl font-bold transition-all text-[10px] flex items-center gap-1 cursor-pointer">
              <Icon icon={embedActive ? "lucide:external-link" : "lucide:video"} className="h-3 w-3" />
              {embedActive ? "Lien Extérieur" : "Mode Intégré"}
            </button>
          )}
          <button onClick={onLeave} className="bg-red-600/10 hover:bg-red-600/25 border border-red-500/20 text-red-400 px-3.5 py-1.5 rounded-xl font-extrabold transition-all text-xs flex items-center gap-1 cursor-pointer hover:scale-102 active:scale-98">
            <Icon icon="lucide:arrow-left" className="h-3.5 w-3.5" /> Retour
          </button>
        </div>
      </div>

      <div className="flex-grow flex flex-col relative bg-gradient-to-b from-neutral-900 to-[#120708]">
        {isJitsi && embedActive ? (
          <div className="absolute inset-0 w-full h-full bg-neutral-950">
            <iframe src={iframeSrc} className="w-full h-full border-0" allow="camera; microphone; fullscreen; display-capture; autoplay; clipboard-write" title="Visioconférence Jitsi Intégrée" />
          </div>
        ) : (
          <div className="flex-grow flex flex-col items-center justify-center p-8 text-center space-y-6 max-w-lg mx-auto">
            <div className="relative">
              <div className="absolute inset-0 bg-blue-500/10 rounded-full blur-xl scale-125 animate-pulse" />
              <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-500 border border-white/10 flex items-center justify-center shadow-2xl relative">
                <Icon icon={isJitsi ? "logos:jitsi" : "logos:google-meet"} className="h-10 w-10 filter drop-shadow-lg" />
              </div>
            </div>

            <div className="space-y-2">
              <span className="text-[10px] uppercase tracking-widest text-[#E3A857] font-black">
                {isJitsi ? "Visioconférence Interactive Prête" : "Google Meet Prêt"}
              </span>
              <h3 className="text-base font-black text-white tracking-tight sm:text-lg">Rejoindre la classe virtuelle</h3>
              <p className="text-xs text-neutral-400 font-semibold leading-relaxed">
                Votre professeur, <span className="text-[#E3A857] font-extrabold">{selectedLive.teacherName}</span>, anime la session : <br />
                <span className="text-white font-black">"{selectedLive.title}"</span>.
              </p>
            </div>

            <button onClick={handleOpenMeet} className="px-8 py-3.5 bg-gradient-to-r from-blue-600 to-[#1557b0] hover:from-blue-500 hover:to-[#1a73e8] text-white rounded-2xl font-black text-xs uppercase tracking-wider flex items-center gap-3 shadow-xl shadow-blue-500/20 transition-all hover:scale-105 active:scale-95 cursor-pointer border border-white/10">
              <Icon icon="lucide:external-link" className="h-4 w-4" />
              Rejoindre sur {isJitsi ? "Jitsi Meet" : "Google Meet"}
            </button>

            {!isJitsi && (
              <p className="text-[10px] text-neutral-500 font-medium max-w-sm mt-2 leading-relaxed bg-white/5 border border-white/5 rounded-2xl p-3">
                ⚠️ <span className="font-bold text-neutral-300">Note de sécurité :</span> Google Meet interdit strictement l'affichage intégré (iframe) en dehors de ses propres serveurs. C'est pourquoi cette réunion s'ouvre de manière sécurisée et rapide dans un nouvel onglet !
              </p>
            )}
          </div>
        )}
      </div>

      <div className="p-3 bg-neutral-950 border-t border-white/5 text-center shrink-0">
        <p className="text-[9px] text-neutral-500 font-extrabold uppercase tracking-widest flex items-center justify-center gap-1">
          <Icon icon="lucide:shield-check" className="h-3.5 w-3.5 text-red-500/50" />
          École 221 • Espace Amphi Virtuel Sécurisé
        </p>
      </div>
    </motion.div>
  );
}

export default RealTimeMeetRoom;
