'use client';

import { useState } from 'react';
import { X, Check } from 'lucide-react';
import { WorkoutExercise, ExerciseLog } from '@/lib/types';

interface Props {
  workoutExercise: WorkoutExercise;
  onSave: (log: ExerciseLog) => void;
  onClose: () => void;
}

export default function LogModal({ workoutExercise, onSave, onClose }: Props) {
  const { exercise, sets, reps, suggestedWeight } = workoutExercise;
  const [actualSets, setActualSets] = useState(String(sets));
  const [actualReps, setActualReps] = useState(reps);
  const [weight, setWeight] = useState(suggestedWeight ?? '');
  const [comment, setComment] = useState('');

  const handleSave = () => {
    onSave({
      exerciseId: exercise.id,
      exerciseName: exercise.name,
      sets: Number(actualSets) || sets,
      reps: actualReps,
      weight,
      comment,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center sm:items-center">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-md rounded-t-2xl sm:rounded-2xl border border-white/10 bg-[#1a1a1a] p-6 shadow-2xl">
        <div className="mb-5 flex items-start justify-between">
          <div>
            <p className="text-xs text-neutral-500 uppercase tracking-widest mb-1">Log Exercise</p>
            <h2 className="text-lg font-semibold text-white leading-tight">{exercise.name}</h2>
          </div>
          <button
            onClick={onClose}
            className="rounded-lg p-1.5 text-neutral-500 hover:bg-white/5 hover:text-white transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="mb-1.5 block text-xs text-neutral-500">Sets completed</label>
              <input
                type="number"
                value={actualSets}
                onChange={(e) => setActualSets(e.target.value)}
                className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white placeholder-neutral-600 focus:border-emerald-500/50 focus:outline-none focus:ring-1 focus:ring-emerald-500/30"
              />
            </div>
            <div>
              <label className="mb-1.5 block text-xs text-neutral-500">Reps</label>
              <input
                type="text"
                value={actualReps}
                onChange={(e) => setActualReps(e.target.value)}
                className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white placeholder-neutral-600 focus:border-emerald-500/50 focus:outline-none focus:ring-1 focus:ring-emerald-500/30"
              />
            </div>
          </div>

          <div>
            <label className="mb-1.5 block text-xs text-neutral-500">Weight used</label>
            <input
              type="text"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              placeholder="e.g. 30 lbs, bodyweight"
              className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white placeholder-neutral-600 focus:border-emerald-500/50 focus:outline-none focus:ring-1 focus:ring-emerald-500/30"
            />
          </div>

          <div>
            <label className="mb-1.5 block text-xs text-neutral-500">Comment (optional)</label>
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="How did it feel? Too easy, too hard?"
              rows={2}
              className="w-full resize-none rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white placeholder-neutral-600 focus:border-emerald-500/50 focus:outline-none focus:ring-1 focus:ring-emerald-500/30"
            />
          </div>
        </div>

        <button
          onClick={handleSave}
          className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-500 py-3 text-sm font-semibold text-black transition-colors hover:bg-emerald-400"
        >
          <Check size={16} />
          Save
        </button>
      </div>
    </div>
  );
}
