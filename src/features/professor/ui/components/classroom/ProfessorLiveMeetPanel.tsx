import React, { useState } from 'react';
import { Icon } from '@iconify/react';
import type { ProfessorCourse } from '../../../domain/ProfessorModels';
import { ProfessorActiveMeetView } from './ProfessorActiveMeetView';
import { useProfessorLiveSessions } from './useProfessorLiveSessions';

interface Props {
  readonly selectedCourse: ProfessorCourse;
  readonly triggerToast: (msg: string) => void;
  readonly profName: string;
}

export function ProfessorLiveMeetPanel({ selectedCourse, triggerToast, profName }: Props) {
  const { active, startMeet, stopMeet } = useProfessorLiveSessions(selectedCourse.titre, triggerToast);
  const [sessionTitle, setSessionTitle] = useState('');
  const [meetUrl, setMeetUrl] = useState('');

  const handleStart = async () => {
    const success = await startMeet(sessionTitle, meetUrl, profName);
    if (success) {
      setSessionTitle('');
      setMeetUrl('');
    }
  };

  const handleCreateMeetHelp = () => {
    window.open('https://meet.google.com/new', '_blank', 'noopener,noreferrer');
    triggerToast("Onglet ouvert ! Créez la réunion Google, copiez le lien et collez-le ici.");
  };

  return (
    <div className="bg-white border border-neutral-100 rounded-3xl p-5 shadow-sm space-y-3">
      <div className="flex items-center gap-2">
        <div className={`p-2 rounded-xl shrink-0 ${active ? 'bg-emerald-50 text-emerald-600' : 'bg-[#FFF5F5] text-[#B3181C]'}`}>
          <Icon icon="logos:google-meet" className="h-6 w-6" />
        </div>
        <div>
          <h4 className="font-extrabold text-xs text-[#291715] flex items-center gap-1.5">
            Classe Virtuelle Interactive
            {active && <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-ping" />}
          </h4>
          <p className="text-[10px] text-neutral-400 font-semibold leading-none mt-1">
            {active ? 'La classe virtuelle est en cours.' : 'Lancez un cours vidéo interactif en temps réel.'}
          </p>
        </div>
      </div>

      {active ? (
        <ProfessorActiveMeetView active={active} stopMeet={stopMeet} profName={profName} />
      ) : (
        <div className="pt-2 border-t border-neutral-100 space-y-3">
          <div className="flex flex-col gap-2">
            <input
              type="text"
              placeholder="Sujet du cours (ex: TP Graphes)"
              value={sessionTitle}
              onChange={(e) => setSessionTitle(e.target.value)}
              className="w-full bg-[#FAF8F6] border border-neutral-200 rounded-xl px-3.5 py-2 text-xs font-semibold text-[#291715] focus:bg-white focus:outline-none transition-all"
            />
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Optionnel: Coller un lien personnalisé..."
                value={meetUrl}
                onChange={(e) => setMeetUrl(e.target.value)}
                className="flex-1 min-w-0 bg-[#FAF8F6] border border-neutral-200 rounded-xl px-3.5 py-2 text-xs font-semibold text-[#291715] focus:bg-white focus:outline-none transition-all"
              />
              <button
                type="button"
                onClick={handleCreateMeetHelp}
                className="px-3.5 py-2 bg-neutral-50 hover:bg-neutral-100 text-[#291715] rounded-xl text-[10px] font-extrabold shrink-0 transition-all cursor-pointer flex items-center gap-1.5 border border-neutral-200 hover:scale-102 active:scale-98"
                title="Créer un vrai Google Meet"
              >
                <Icon icon="logos:google-meet" className="h-4 w-4 shrink-0" />
                <span>Créer +</span>
              </button>
            </div>
          </div>
          
          <button
            onClick={handleStart}
            className="w-full py-2.5 bg-[#B3181C] hover:bg-[#8c1215] text-white rounded-xl font-black text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 shadow-sm cursor-pointer transition-all"
          >
            <Icon icon="lucide:radio" className="h-4 w-4" /> Diffuser le cours en direct aux élèves
          </button>
        </div>
      )}
    </div>
  );
}

export default ProfessorLiveMeetPanel;
