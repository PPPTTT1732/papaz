import { useState, useEffect, useCallback } from 'react';
import { apiClient } from '@/shared/lib/apiClient';

export interface LiveSession {
  id: string;
  courseName: string;
  teacherName: string;
  title: string;
  status: string;
  hlsUrl: string;
}

export function useProfessorLiveSessions(courseName: string, triggerToast: (msg: string) => void) {
  const [sessions, setSessions] = useState<LiveSession[]>([]);

  const fetchSessions = useCallback(async () => {
    try {
      const res = await apiClient.get('/student/live-sessions');
      setSessions(res.data || []);
    } catch (err) {
      console.error(err);
    }
  }, []);

  useEffect(() => {
    fetchSessions();
    const interval = setInterval(fetchSessions, 12000);
    return () => clearInterval(interval);
  }, [fetchSessions]);

  const active = sessions.find((s) => s.courseName === courseName && s.status === 'active');

  const startMeet = async (title: string, rawUrl: string, profName: string) => {
    let finalUrl = rawUrl.trim();
    if (!finalUrl) {
      const chars = "abcdefghijklmnopqrstuvwxyz0123456789";
      const rand = (n: number) => Array.from({ length: n }, () => chars[Math.floor(Math.random() * chars.length)]).join("");
      finalUrl = `https://meet.jit.si/MonEcole-InstantMeet-${rand(8)}`;
    } else if (!finalUrl.startsWith('http://') && !finalUrl.startsWith('https://')) {
      finalUrl = 'https://' + finalUrl;
    }

    try {
      const finalTitle = title.trim() || `Cours de ${courseName}`;
      await apiClient.post('/student/live-sessions', {
        courseName, teacherName: profName, title: finalTitle, meetUrl: finalUrl
      });
      window.open(finalUrl, '_blank', 'noopener,noreferrer');
      triggerToast('Cours en direct diffusé avec succès !');
      fetchSessions();
      return true;
    } catch {
      triggerToast('Erreur lors du lancement de la visioconférence.');
      return false;
    }
  };

  const stopMeet = async (id: string) => {
    try {
      await apiClient.delete(`/student/live-sessions/${id}`);
      triggerToast('Le cours en direct est terminé.');
      fetchSessions();
    } catch {
      triggerToast('Erreur lors de la fermeture.');
    }
  };

  return { active, startMeet, stopMeet };
}
