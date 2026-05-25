'use client';

import { useEffect, useState } from 'react';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { useRouter } from 'next/navigation';
import { RefreshCw, ChevronRight } from 'lucide-react';
import { db } from '@/lib/firebase';
import { useAuth } from '@/hooks/useAuth';
import { getWeekPlan } from '@/lib/workoutProgram';
import { WeekPlan } from '@/lib/types';
import WorkoutDayView from '@/components/WorkoutDayView';

const workoutTypeIcons: Record<string, string> = {
  arms: '💪',
  legs: '🦵',
  'chest-back': '🏋️',
};

export default function HomePage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [weekNumber, setWeekNumber] = useState(1);
  const [plan, setPlan] = useState<WeekPlan | null>(null);
  const [loadingPlan, setLoadingPlan] = useState(true);

  useEffect(() => {
    if (!loading && !user) {
      router.push('/auth');
    }
  }, [user, loading, router]);

  useEffect(() => {
    if (!user) return;
    const ref = doc(db, 'users', user.uid, 'settings', 'workout');
    getDoc(ref).then((snap) => {
      const wn = snap.exists() ? (snap.data().weekNumber ?? 1) : 1;
      setWeekNumber(wn);
      setPlan(getWeekPlan(wn));
      setLoadingPlan(false);
    });
  }, [user]);

  const advanceWeek = async () => {
    if (!user) return;
    const next = weekNumber + 1;
    setWeekNumber(next);
    setPlan(getWeekPlan(next));
    await setDoc(doc(db, 'users', user.uid, 'settings', 'workout'), { weekNumber: next });
  };

  if (loading || loadingPlan) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="h-6 w-6 animate-spin rounded-full border-2 border-emerald-400 border-t-transparent" />
      </div>
    );
  }

  if (!user || !plan) return null;

  const cycleWeek = ((weekNumber - 1) % 4) + 1;

  return (
    <div className="space-y-8">
      <div className="flex items-end justify-between">
        <div>
          <p className="text-xs uppercase tracking-widest text-neutral-500 mb-1">Week {weekNumber}</p>
          <h1 className="text-2xl font-bold text-white">Your Workouts</h1>
          <p className="mt-1 text-sm text-neutral-500">
            Program cycle {cycleWeek} of 4 &mdash; expand a day to start
          </p>
        </div>
        <button
          onClick={advanceWeek}
          className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-neutral-300 transition-colors hover:bg-white/10 hover:text-white"
        >
          <RefreshCw size={14} />
          Next week
        </button>
      </div>

      <div className="space-y-3">
        {plan.days.map((day) => (
          <WorkoutDayView key={day.type} day={day} weekNumber={weekNumber} />
        ))}
      </div>

      <div className="rounded-2xl border border-white/5 bg-[#141414] p-5">
        <h3 className="mb-3 text-sm font-semibold text-white">4-Week Program Overview</h3>
        <div className="grid grid-cols-4 gap-2">
          {[1, 2, 3, 4].map((w) => (
            <div
              key={w}
              className={`rounded-lg p-3 text-center text-xs transition-colors ${
                cycleWeek === w
                  ? 'bg-emerald-500/15 border border-emerald-500/30 text-emerald-400'
                  : 'bg-white/3 border border-white/5 text-neutral-500'
              }`}
            >
              <div className="font-semibold mb-0.5">Week {w}</div>
              <div className="text-neutral-600 text-[11px]">
                {w === 1 && 'Foundation'}
                {w === 2 && 'Volume'}
                {w === 3 && 'Variation'}
                {w === 4 && 'Intensity'}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
