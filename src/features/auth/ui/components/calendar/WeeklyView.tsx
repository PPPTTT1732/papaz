import React from 'react';
import { DAYS_ORDER } from './CalendarData';
import { getNextCourse } from './CalendarUtils';
import { WeeklyCard } from './WeeklyCard';

export function WeeklyView({ state }: { readonly state: any }) {
  const nextCourse = getNextCourse(state.displayedSessions);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5 h-full items-stretch">
      {DAYS_ORDER.map((dayObj) => {
        const session = state.displayedSessions.find((s: any) => s.jour === dayObj.key);
        const isToday = dayObj.key === 'MER';

        return (
          <WeeklyCard
            key={dayObj.key}
            dayKey={dayObj.key}
            dayName={dayObj.name}
            session={session}
            isToday={isToday}
            nextCourse={nextCourse}
            onSelect={state.handleSelectCourse}
          />
        );
      })}
    </div>
  );
}
