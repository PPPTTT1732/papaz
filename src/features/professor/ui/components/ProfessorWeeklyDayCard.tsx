import React from 'react';
import type { ProfessorSchedule } from '../../domain/ProfessorModels';
import { formatTimeRange, formatRoomName } from '../../utils/scheduleFormatter';

interface Props {
  readonly dayKey: string;
  readonly session: ProfessorSchedule | undefined;
  readonly isToday: boolean;
  readonly onEnterCourse?: (courseId: string) => void;
}

export function ProfessorWeeklyDayCard({ dayKey, session, isToday, onEnterCourse }: Props) {
  const formattedRoom = session ? formatRoomName(session.room) : '';
  const { display } = session ? formatTimeRange(session.time) : { display: '' };

  return (
    <div 
      style={{ height: '215px' }}
      className={`p-3.5 sm:p-4 rounded-[22px] border flex flex-col justify-between transition-all duration-350 relative select-none ${
        isToday 
          ? 'bg-gradient-to-b from-white to-[#FFF8F8] border-[#B3181C]/35 shadow-sm ring-1 ring-[#B3181C]/5' 
          : 'bg-white border-neutral-200 hover:bg-[#FFF9F9]/40 hover:border-[#B3181C]/20 hover:shadow-md'
      }`}
    >
      <div className="flex flex-col flex-grow">
        <div className="flex items-center justify-between mb-2 pb-1.5 border-b border-neutral-100/75">
          <span className={`text-[10px] font-black uppercase tracking-widest ${isToday ? 'text-[#B3181C]' : 'text-neutral-400'}`}>
            {dayKey}
          </span>
          {isToday && (
            <span className="h-1.5 w-1.5 rounded-full bg-[#B3181C] animate-ping" />
          )}
        </div>

        {session ? (
          <div 
            onClick={() => onEnterCourse?.(session.courseId || session.id)} 
            className="cursor-pointer group flex flex-col flex-grow h-full justify-between"
          >
            <div>
              <span className="text-[9px] font-black font-mono mb-1.5 inline-block text-[#B3181C] bg-[#FFF5F5] px-2 py-0.5 rounded-md border border-[#B3181C]/10">
                {display}
              </span>
              <h4 className="text-[12px] font-black leading-tight tracking-tight line-clamp-1 text-neutral-800 group-hover:text-[#B3181C] transition-colors duration-200">
                {session.classe || 'L3-GL'}
              </h4>
              <p className="text-[10px] text-neutral-400 font-semibold leading-tight truncate mt-0.5 group-hover:text-neutral-600 transition-colors">
                {session.courseTitle}
              </p>
            </div>
            <div className="flex items-center justify-between mt-auto">
              <div className="flex items-center gap-1 text-[9.5px] text-neutral-500 font-bold">
                <span translate="no" className="material-symbols-outlined text-[10px] text-[#B3181C]">location_on</span>
                <span className="truncate">{formattedRoom}</span>
              </div>
              <span translate="no" className="material-symbols-outlined text-xs text-neutral-300 group-hover:text-[#B3181C] group-hover:translate-x-0.5 transition-all">
                arrow_forward
              </span>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-10 text-neutral-300">
            <span translate="no" className="material-symbols-outlined text-base">calendar_today</span>
            <span className="text-[9px] font-black uppercase tracking-wider mt-1.5">Libre</span>
          </div>
        )}
      </div>

      {session && (
        <div className="flex justify-between items-center mt-2.5 pt-2 border-t border-neutral-100/50 min-w-0 gap-1">
          <span className={`text-[8px] font-black px-1.5 py-0.5 rounded-md shrink-0 ${
            session.type === 'CM' ? 'bg-blue-50 text-blue-600 border border-blue-100' : session.type === 'TP' ? 'bg-emerald-50 text-emerald-600 border border-emerald-100' : 'bg-amber-50 text-amber-600 border border-amber-100'
          }`}>{session.type}</span>
          <span className="text-[8.5px] font-black text-emerald-600 truncate shrink bg-emerald-50/50 px-1.5 py-0.5 rounded-md border border-emerald-100/50">Confirmé</span>
        </div>
      )}
    </div>
  );
}
