'use client';

import { useEffect, useState } from 'react';
import { collection, getDocs, orderBy, query } from 'firebase/firestore';
import { useRouter } from 'next/navigation';
import { ChevronDown, ChevronUp, Calendar } from 'lucide-react';
import { db } from '@/lib/firebase';
import { useAuth } from '@/hooks/useAuth';
import { WorkoutLog } from '@/lib/types';

const dayTypeLabel: Record<string, string> = {
  arms: '💪 Arms',
  legs: '🦵 Legs',
  'chest-back': '🏋️ Chest & Back',
};

function formatDate(ts: number) {
  return new Intl.DateTimeFormat('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
  }).format(new Date(ts));
}

function LogEntry({ log }: { log: WorkoutLog }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="rounded-xl border border-white/5 bg-[#141414] overflow-hidden">
      <button
        className="flex w-full items-center justify-between px-5 py-4 text-left"
        onClick={() => setOpen((v) => !v)}
      >
        <div>
          <div className="flex items-center gap-2 mb-0.5">
            <span className="text-sm font-semibold text-white">
              {dayTypeLabel[log.workoutType] ?? log.dayLabel}
            </span>
            <span className="text-xs text-neutral-500">Week {log.weekNumber}</span>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-neutral-500">
            <Calendar size={11} />
            {formatDate(log.completedAt)}
            <span className="text-neutral-700">·</span>
            {log.exercises.length} exercises logged
          </div>
        </div>
        {open ? (
          <ChevronUp size={15} className="text-neutral-500" />
        ) : (
          <ChevronDown size={15} className="text-neutral-500" />
        )}
      </button>

      {open && (
        <div className="px-5 pb-4 border-t border-white/5">
          <div className="mt-3 space-y-2">
            {log.exercises.map((ex, i) => (
              <div key={i} className="rounded-lg bg-[#1a1a1a] px-4 py-3">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-sm font-medium text-white">{ex.exerciseName}</p>
                    <p className="mt-0.5 text-xs text-neutral-500">
                      {ex.sets} sets · {ex.reps} reps
                      {ex.weight && ` · ${ex.weight}`}
                    </p>
                    {ex.comment && (
                      <p className="mt-1.5 text-xs text-neutral-400 italic">"{ex.comment}"</p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default function HistoryPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [logs, setLogs] = useState<WorkoutLog[]>([]);
  const [fetching, setFetching] = useState(true);

  useEffect(() => {
    if (!loading && !user) router.push('/auth');
  }, [user, loading, router]);

  useEffect(() => {
    if (!user) return;
    const ref = collection(db, 'users', user.uid, 'workoutLogs');
    getDocs(query(ref, orderBy('completedAt', 'desc'))).then((snap) => {
      setLogs(snap.docs.map((d) => ({ id: d.id, ...d.data() } as WorkoutLog)));
      setFetching(false);
    });
  }, [user]);

  if (loading || fetching) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="h-6 w-6 animate-spin rounded-full border-2 border-emerald-400 border-t-transparent" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <p className="text-xs uppercase tracking-widest text-neutral-500 mb-1">All sessions</p>
        <h1 className="text-2xl font-bold text-white">Workout History</h1>
      </div>

      {logs.length === 0 ? (
        <div className="rounded-2xl border border-white/5 bg-[#141414] p-10 text-center">
          <p className="text-neutral-500 text-sm">No logged workouts yet.</p>
          <p className="text-neutral-600 text-xs mt-1">Log your first workout on the home screen.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {logs.map((log) => (
            <LogEntry key={log.id} log={log} />
          ))}
        </div>
      )}
    </div>
  );
}
