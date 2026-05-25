'use client';

import { useState } from 'react';
import { RotateCcw, PlayCircle, ClipboardList } from 'lucide-react';
import { WorkoutExercise, ExerciseCategory } from '@/lib/types';
import { getAlternative } from '@/lib/exercises';

const categoryColors: Record<ExerciseCategory, string> = {
  shoulders: 'text-sky-400 bg-sky-400/10',
  biceps: 'text-violet-400 bg-violet-400/10',
  triceps: 'text-purple-400 bg-purple-400/10',
  chest: 'text-rose-400 bg-rose-400/10',
  back: 'text-amber-400 bg-amber-400/10',
  legs: 'text-green-400 bg-green-400/10',
  core: 'text-orange-400 bg-orange-400/10',
  pullups: 'text-cyan-400 bg-cyan-400/10',
};

interface Props {
  workoutExercise: WorkoutExercise;
  allCurrentIds: string[];
  onLog: (we: WorkoutExercise) => void;
  onChange: (original: WorkoutExercise, replacement: WorkoutExercise) => void;
}

export default function ExerciseCard({ workoutExercise, allCurrentIds, onLog, onChange }: Props) {
  const { exercise, sets, reps, suggestedWeight } = workoutExercise;
  const [current, setCurrent] = useState(workoutExercise);
  const [vetoed, setVetoed] = useState(false);

  const handleVeto = () => {
    const alt = getAlternative(current.exercise.id, current.exercise.category, allCurrentIds);
    if (!alt) return;
    const replacement: WorkoutExercise = {
      exercise: alt,
      sets: alt.defaultSets,
      reps: alt.defaultReps,
      suggestedWeight: alt.defaultWeight,
    };
    onChange(current, replacement);
    setCurrent(replacement);
    setVetoed(true);
    setTimeout(() => setVetoed(false), 1500);
  };

  const colorClass = categoryColors[current.exercise.category];
  const label = current.exercise.category.charAt(0).toUpperCase() + current.exercise.category.slice(1);

  return (
    <div className="group relative rounded-xl border border-white/5 bg-[#181818] p-4 transition-colors hover:border-white/10">
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          <div className="mb-1.5 flex items-center gap-2">
            <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${colorClass}`}>
              {label}
            </span>
            {current.exercise.youtubeUrl && (
              <a
                href={current.exercise.youtubeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 rounded-full px-2 py-0.5 text-xs text-red-400 bg-red-400/10 hover:bg-red-400/20 transition-colors"
              >
                <PlayCircle size={11} />
                Demo
              </a>
            )}
          </div>

          <h3 className="font-medium text-white leading-snug">{current.exercise.name}</h3>

          <div className="mt-2 flex items-center gap-3 text-sm text-neutral-400">
            <span>{current.sets} sets</span>
            <span className="text-neutral-600">·</span>
            <span>{current.reps} reps</span>
            {current.suggestedWeight && (
              <>
                <span className="text-neutral-600">·</span>
                <span>{current.suggestedWeight}</span>
              </>
            )}
          </div>
        </div>

        <div className="flex items-center gap-1 shrink-0">
          <button
            onClick={handleVeto}
            title="Swap exercise"
            className={`flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs transition-all
              ${vetoed
                ? 'bg-emerald-500/20 text-emerald-400'
                : 'bg-white/5 text-neutral-400 hover:bg-white/10 hover:text-white'
              }`}
          >
            <RotateCcw size={13} className={vetoed ? 'animate-spin' : ''} />
            {vetoed ? 'Swapped' : 'Swap'}
          </button>
          <button
            onClick={() => onLog(current)}
            title="Log this exercise"
            className="flex items-center gap-1.5 rounded-lg bg-emerald-500/15 px-2.5 py-1.5 text-xs text-emerald-400 transition-colors hover:bg-emerald-500/25"
          >
            <ClipboardList size={13} />
            Log
          </button>
        </div>
      </div>
    </div>
  );
}
