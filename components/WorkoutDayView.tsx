'use client';

import { useState } from 'react';
import { addDoc, collection } from 'firebase/firestore';
import { CheckCircle, ChevronDown, ChevronUp } from 'lucide-react';
import { db } from '@/lib/firebase';
import { DayPlan, ExerciseLog, WorkoutExercise } from '@/lib/types';
import { useAuth } from '@/hooks/useAuth';
import ExerciseCard from './ExerciseCard';
import LogModal from './LogModal';

interface Props {
  day: DayPlan;
  block: number;
  weekInBlock: number;
}

export default function WorkoutDayView({ day, block, weekInBlock }: Props) {
  const { user } = useAuth();
  const [exercises, setExercises] = useState<WorkoutExercise[]>(day.exercises);
  const [pendingLog, setPendingLog] = useState<WorkoutExercise | null>(null);
  const [logs, setLogs] = useState<ExerciseLog[]>([]);
  const [saved, setSaved] = useState(false);
  const [expanded, setExpanded] = useState(false);

  const allCurrentIds = exercises.map((we) => we.exercise.id);

  const handleChange = (original: WorkoutExercise, replacement: WorkoutExercise) => {
    setExercises((prev) => prev.map((we) => (we === original ? replacement : we)));
  };

  const handleLogSave = (log: ExerciseLog) => {
    setLogs((prev) => {
      const existing = prev.findIndex((l) => l.exerciseId === log.exerciseId);
      if (existing >= 0) {
        const updated = [...prev];
        updated[existing] = log;
        return updated;
      }
      return [...prev, log];
    });
  };

  const handleSaveWorkout = async () => {
    if (!user || logs.length === 0) return;
    await addDoc(collection(db, 'users', user.uid, 'workoutLogs'), {
      userId: user.uid,
      workoutType: day.type,
      dayLabel: day.label,
      block,
      weekInBlock,
      exercises: logs,
      completedAt: Date.now(),
    });
    setSaved(true);
  };

  const loggedIds = new Set(logs.map((l) => l.exerciseId));

  return (
    <div className="rounded-2xl border border-white/5 bg-[#141414] overflow-hidden">
      <button
        className="flex w-full items-center justify-between px-5 py-4 text-left"
        onClick={() => setExpanded((v) => !v)}
      >
        <div>
          <div className="flex items-center gap-2 mb-0.5">
            {day.muscleGroups.map((g) => (
              <span key={g} className="text-xs text-neutral-500">{g}</span>
            ))}
          </div>
          <h2 className="text-base font-semibold text-white">{day.label}</h2>
          <p className="text-xs text-neutral-500 mt-0.5">{exercises.length} exercises</p>
        </div>
        <div className="flex items-center gap-3">
          {logs.length > 0 && (
            <span className="text-xs text-emerald-400">
              {logs.length}/{exercises.length} logged
            </span>
          )}
          {expanded ? (
            <ChevronUp size={16} className="text-neutral-500" />
          ) : (
            <ChevronDown size={16} className="text-neutral-500" />
          )}
        </div>
      </button>

      {expanded && (
        <div className="px-4 pb-4 space-y-3">
          {exercises.map((we) => (
            <div key={we.exercise.id} className="relative">
              {loggedIds.has(we.exercise.id) && (
                <div className="absolute right-3 top-3 z-10">
                  <CheckCircle size={14} className="text-emerald-400" />
                </div>
              )}
              <ExerciseCard
                workoutExercise={we}
                allCurrentIds={allCurrentIds}
                onLog={(we) => setPendingLog(we)}
                onChange={handleChange}
              />
            </div>
          ))}

          <button
            onClick={handleSaveWorkout}
            disabled={logs.length === 0 || saved}
            className={`mt-2 w-full rounded-xl py-3 text-sm font-semibold transition-all
              ${saved
                ? 'bg-emerald-500/20 text-emerald-400 cursor-default'
                : logs.length === 0
                ? 'bg-white/5 text-neutral-600 cursor-not-allowed'
                : 'bg-emerald-500 text-black hover:bg-emerald-400'
              }`}
          >
            {saved ? '✓ Workout Saved' : `Save Workout (${logs.length} logged)`}
          </button>
        </div>
      )}

      {pendingLog && (
        <LogModal
          workoutExercise={pendingLog}
          onSave={handleLogSave}
          onClose={() => setPendingLog(null)}
        />
      )}
    </div>
  );
}
