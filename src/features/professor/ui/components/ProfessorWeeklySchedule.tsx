import React, { useState } from 'react';
import type { ProfessorSchedule } from '../../domain/ProfessorModels';
import { ProfessorWeeklyDayCard } from './ProfessorWeeklyDayCard';
import { formatTimeRange, formatRoomName } from '../../utils/scheduleFormatter';

interface Props {
  readonly schedule: readonly ProfessorSchedule[];
  readonly onEnterCourse?: (courseId: string) => void;
}

const DAYS = [
  { key: 'Lundi', short: 'LUN' },
  { key: 'Mardi', short: 'MAR' },
  { key: 'Mercredi', short: 'MER' },
  { key: 'Jeudi', short: 'JEU' },
  { key: 'Vendredi', short: 'VEN' }
] as const;

export function ProfessorWeeklySchedule({ schedule, onEnterCourse }: Props) {
  const [selectedDay, setSelectedDay] = useState<string>('Lundi');
  const activeSession = schedule.find(s => s.day === selectedDay && s.status !== 'annule');

  const { display: activeTimeDisplay } = activeSession ? formatTimeRange(activeSession.time) : { display: '' };
  const activeRoomDisplay = activeSession ? formatRoomName(activeSession.room) : '';

  return (
    <section 
      className="bg-white border border-neutral-200/90 rounded-[32px] p-5 md:p-6.5 shadow-xl shadow-neutral-100/40 hover:shadow-2xl hover:shadow-neutral-150/40 transition-all duration-350 flex flex-col min-h-[365px] md:h-[365px] justify-between relative overflow-hidden"
    >
      <div 
        className="absolute top-0 left-0 right-0 h-[3.5px] bg-gradient-to-r from-[#B3181C] via-[#8e1215] to-[#B3181C]" 
      />
      <div className="flex justify-between items-center mb-4.5 shrink-0">
        <h3 
          className="font-sans text-[13.5px] font-black flex items-center gap-2.5 text-neutral-800"
        >
          <span translate="no" className="material-symbols-outlined text-[#B3181C] scale-105">calendar_month</span>
          Mon Emploi du Temps
        </h3>
        <span 
          className="font-extrabold text-[9.5px] tracking-wider uppercase bg-[#FFF5F5] text-[#B3181C] border border-[#B3181C]/10 px-3 py-1 rounded-xl"
        >
          Semaine Courante
        </span>
      </div>

      {/* Mobile view */}
      <div className="block md:hidden w-full space-y-4">
        <div className="grid grid-cols-5 gap-1.5 shrink-0">
          {DAYS.map((d) => (
            <button
              key={d.key}
              onClick={() => setSelectedDay(d.key)}
              className={`py-2 px-1 text-center font-black text-xs rounded-xl transition-all cursor-pointer border-0 ${
                selectedDay === d.key ? 'bg-brand-red-deep text-white shadow-md' : 'bg-neutral-gray-50 border border-neutral-gray-150 text-secondary'
              }`}
            >
              {d.short}
            </button>
          ))}
        </div>

        <div className="flex-grow flex flex-col justify-center min-h-[140px]">
          {!activeSession ? (
            <p className="text-center text-xs text-secondary py-4">Aucun cours prévu</p>
          ) : (
            <div 
              onClick={() => onEnterCourse?.(activeSession.courseId || activeSession.id)}
              className="p-4 rounded-2xl border cursor-pointer hover:shadow hover:scale-101 group bg-neutral-50/50 border-neutral-gray-200 hover:border-brand-red-deep/25 transition-all"
            >
              <div className="flex justify-between items-start mb-2">
                <span className="text-[9.5px] font-mono font-extrabold text-[#B3181C] bg-[#FFF5F5] px-1.5 py-0.5 rounded-md border border-[#B3181C]/5">{activeTimeDisplay}</span>
                <div className="flex gap-1.5">
                  <span className="px-2 py-0.5 rounded-full text-[8.5px] font-black bg-neutral-gray-200 text-[#291715]">{activeSession.type}</span>
                </div>
              </div>
              <h4 className="font-black text-xs text-on-surface group-hover:text-brand-red-deep truncate">{activeSession.classe || 'L3-GL'}</h4>
              <p className="text-[10px] text-neutral-400 font-bold leading-tight truncate mb-2">{activeSession.courseTitle}</p>
              <div className="flex items-center justify-between text-[11px] text-secondary">
                <div className="flex items-center gap-1.5 font-bold">
                  <span translate="no" className="material-symbols-outlined text-xs text-brand-red-deep">location_on</span>
                  <span>{activeRoomDisplay}</span>
                </div>
                <span translate="no" className="material-symbols-outlined text-xs text-brand-red-deep">arrow_forward</span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Desktop view */}
      <div className="hidden md:block overflow-x-auto w-full pb-1.5 scrollbar-thin">
        <div 
          className="grid grid-cols-5 gap-5 min-w-[980px] xl:min-w-0 items-stretch select-none"
        >
          {DAYS.map((dayObj) => {
            const session = schedule.find(s => s.day === dayObj.key && s.status !== 'annule');
            const isToday = dayObj.key === 'Mercredi';

            return (
              <ProfessorWeeklyDayCard
                key={dayObj.key}
                dayKey={dayObj.key}
                session={session}
                isToday={isToday}
                onEnterCourse={onEnterCourse}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}
