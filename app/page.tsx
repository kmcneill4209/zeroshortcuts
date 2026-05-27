'use client';

import { useEffect, useState } from 'react';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { useRouter } from 'next/navigation';
import { ChevronRight } from 'lucide-react';
import { db } from '@/lib/firebase';
import { useAuth } from '@/hooks/useAuth';
import { getBlockPlan } from '@/lib/workoutProgram';
import { BlockPlan } from '@/lib/types';
import WorkoutDayView from '@/components/WorkoutDayView';

export default function HomePage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  // The user's actual progress position (persisted to Firebase)
  const [currentBlock, setCurrentBlock] = useState(1);
  const [currentWeekInBlock, setCurrentWeekInBlock] = useState(1);

  // What block/week is currently displayed (can be any prior block/week)
  const [selectedBlock, setSelectedBlock] = useState(1);
  const [selectedWeekInBlock, setSelectedWeekInBlock] = useState(1);

  // Which block's week chips are showing in the bottom nav
  const [expandedBlock, setExpandedBlock] = useState(1);

  const [plan, setPlan] = useState<BlockPlan | null>(null);
  const [loadingPlan, setLoadingPlan] = useState(true);

  useEffect(() => {
    if (!loading && !user) router.push('/auth');
  }, [user, loading, router]);

  // Load progress from Firebase on mount
  useEffect(() => {
    if (!user) return;
    const ref = doc(db, 'users', user.uid, 'settings', 'workout');
    getDoc(ref).then((snap) => {
      const b = snap.exists() ? (snap.data().block ?? 1) : 1;
      const w = snap.exists() ? (snap.data().weekInBlock ?? 1) : 1;
      setCurrentBlock(b);
      setCurrentWeekInBlock(w);
      setSelectedBlock(b);
      setSelectedWeekInBlock(w);
      setExpandedBlock(b);
      setPlan(getBlockPlan(b));
      setLoadingPlan(false);
    });
  }, [user]);

  // Refresh plan when selected block changes
  useEffect(() => {
    setPlan(getBlockPlan(selectedBlock));
  }, [selectedBlock]);

  const advanceWeek = async () => {
    if (!user) return;
    let nextBlock = currentBlock;
    let nextWeek = currentWeekInBlock + 1;
    if (nextWeek > 5) {
      nextWeek = 1;
      nextBlock = currentBlock < 4 ? currentBlock + 1 : currentBlock;
    }
    setCurrentBlock(nextBlock);
    setCurrentWeekInBlock(nextWeek);
    setSelectedBlock(nextBlock);
    setSelectedWeekInBlock(nextWeek);
    setExpandedBlock(nextBlock);
    await setDoc(doc(db, 'users', user.uid, 'settings', 'workout'), {
      block: nextBlock,
      weekInBlock: nextWeek,
    });
  };

  // A block/week is selectable if it's at or before the user's current progress
  const isSelectable = (b: number, w: number) =>
    b < currentBlock || (b === currentBlock && w <= currentWeekInBlock);

  const handleBlockClick = (b: number) => {
    if (b > currentBlock) return; // locked
    setExpandedBlock(b);
    // Jump to the latest accessible week in that block
    const targetWeek = b < currentBlock ? 5 : currentWeekInBlock;
    setSelectedBlock(b);
    setSelectedWeekInBlock(targetWeek);
  };

  const handleWeekClick = (w: number) => {
    if (!isSelectable(expandedBlock, w)) return;
    setSelectedBlock(expandedBlock);
    setSelectedWeekInBlock(w);
  };

  if (loading || loadingPlan) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="h-6 w-6 animate-spin rounded-full border-2 border-emerald-400 border-t-transparent" />
      </div>
    );
  }

  if (!user || !plan) return null;

  const isCurrentView =
    selectedBlock === currentBlock && selectedWeekInBlock === currentWeekInBlock;

  return (
    <div className="space-y-6 pb-36">
      {/* Header */}
      <div className="flex items-end justify-between">
        <div>
          <p className="text-xs uppercase tracking-widest text-neutral-500 mb-1">
            Block {selectedBlock} &middot; Week {selectedWeekInBlock} of 5
          </p>
          <h1 className="text-2xl font-bold text-white">Your Workouts</h1>
          {!isCurrentView && (
            <p className="mt-1 text-xs text-amber-400">
              Viewing past session &mdash; logging saves to this block/week
            </p>
          )}
        </div>
        {isCurrentView && (
          <button
            onClick={advanceWeek}
            disabled={currentBlock === 4 && currentWeekInBlock === 5}
            className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-neutral-300 transition-colors hover:bg-white/10 hover:text-white disabled:opacity-40 disabled:cursor-not-allowed"
          >
            Next week
            <ChevronRight size={14} />
          </button>
        )}
      </div>

      {/* Workout days */}
      <div className="space-y-3">
        {plan.days.map((day) => (
          <WorkoutDayView
            key={`${day.type}-${selectedBlock}-${selectedWeekInBlock}`}
            day={day}
            block={selectedBlock}
            weekInBlock={selectedWeekInBlock}
          />
        ))}
      </div>

      {/* ── Fixed bottom navigator ── */}
      <div className="fixed bottom-0 left-0 right-0 border-t border-white/5 bg-[#0d0d0d]/95 backdrop-blur-sm px-4 pt-3 pb-5">
        <div className="mx-auto max-w-lg space-y-2.5">

          {/* Week chips for the expanded block */}
          <div className="flex gap-2">
            {[1, 2, 3, 4, 5].map((w) => {
              const sel = isSelectable(expandedBlock, w);
              const isSelected = selectedBlock === expandedBlock && selectedWeekInBlock === w;
              const isCurrent = currentBlock === expandedBlock && currentWeekInBlock === w;

              return (
                <button
                  key={w}
                  disabled={!sel}
                  onClick={() => handleWeekClick(w)}
                  className={`flex-1 rounded-lg py-2 text-xs font-medium transition-colors
                    ${isSelected
                      ? 'bg-emerald-500 text-black'
                      : isCurrent && sel
                      ? 'bg-emerald-500/20 border border-emerald-500/30 text-emerald-400'
                      : sel
                      ? 'bg-white/8 text-neutral-300 hover:bg-white/12'
                      : 'bg-white/3 text-neutral-700 cursor-not-allowed'
                    }`}
                >
                  Wk {w}
                </button>
              );
            })}
          </div>

          {/* Block chips */}
          <div className="flex gap-2">
            {[1, 2, 3, 4].map((b) => {
              const unlocked = b <= currentBlock;
              const isExpanded = expandedBlock === b;
              const isCurrent = currentBlock === b;

              return (
                <button
                  key={b}
                  disabled={!unlocked}
                  onClick={() => handleBlockClick(b)}
                  className={`flex-1 rounded-xl py-2.5 text-sm font-semibold transition-colors
                    ${isExpanded && isCurrent
                      ? 'bg-emerald-500 text-black'
                      : isExpanded
                      ? 'bg-white/15 text-white'
                      : isCurrent
                      ? 'bg-emerald-500/15 border border-emerald-500/30 text-emerald-400'
                      : unlocked
                      ? 'bg-white/8 text-neutral-400 hover:bg-white/12'
                      : 'bg-white/3 text-neutral-700 cursor-not-allowed'
                    }`}
                >
                  Block {b}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
