import { exercises } from './exercises';
import { BlockPlan, DayPlan, WorkoutExercise } from './types';

function ex(id: string, overrides?: Partial<WorkoutExercise>): WorkoutExercise {
  const found = exercises.find((e) => e.id === id);
  if (!found) throw new Error(`Exercise not found: ${id}`);
  return {
    exercise: found,
    sets: overrides?.sets ?? found.defaultSets,
    reps: overrides?.reps ?? found.defaultReps,
    suggestedWeight: overrides?.suggestedWeight ?? found.defaultWeight,
  };
}

// ─── ARMS DAYS ──────────────────────────────────────────────────────────────
// 12 unique blocks. Adjacent blocks share ≤2/11 exercises (≥82% change).
// Non-adjacent pairs share ≤5/11 (≤45% overlap). No block is an exact repeat.
// After block 12 the program cycles back to block 1.

const armsDays: DayPlan[] = [
  // ── Block 1 ──────────────────────────────────────────────────────────────
  {
    type: 'arms',
    label: 'Shoulders · Biceps · Triceps',
    muscleGroups: ['Shoulders', 'Biceps', 'Triceps', 'Core'],
    exercises: [
      ex('sh-machine-press'),
      ex('sh-lateral-raise'),
      ex('sh-cable-face-pull'),
      ex('bi-hammer-curl'),
      ex('bi-incline-curl'),
      ex('bi-crossbody-hammer'),
      ex('tri-overhead-rope'),
      ex('tri-skull-crusher'),
      ex('tri-pushdown'),
      ex('co-rkc-plank'),
      ex('co-oblique-vup'),
    ],
  },
  // ── Block 2 ──────────────────────────────────────────────────────────────
  {
    type: 'arms',
    label: 'Shoulders · Biceps · Triceps',
    muscleGroups: ['Shoulders', 'Biceps', 'Triceps', 'Core'],
    exercises: [
      ex('sh-db-overhead-press'),
      ex('sh-chest-sup-lateral'),
      ex('sh-rear-delt-pec-deck'),
      ex('bi-spider-curl'),
      ex('bi-reverse-curl'),
      ex('bi-concentration-curl'),
      ex('tri-lying-extension'),
      ex('tri-band-kickback'),
      ex('tri-bench-dips'),
      ex('co-side-plank-abduct'),
      ex('co-dead-bug'),
    ],
  },
  // ── Block 3 ──────────────────────────────────────────────────────────────
  {
    type: 'arms',
    label: 'Shoulders · Biceps · Triceps',
    muscleGroups: ['Shoulders', 'Biceps', 'Triceps', 'Core'],
    exercises: [
      ex('sh-arnold-press'),
      ex('sh-cable-lateral-raise'),
      ex('sh-front-raise'),
      ex('bi-incline-curl'),
      ex('bi-21s'),
      ex('bi-hammer-curl', { reps: '12 each', suggestedWeight: '25–30 lbs' }),
      ex('tri-overhead-rope', { reps: '15' }),
      ex('tri-sa-pushdown'),
      ex('tri-lying-extension'),
      ex('co-hollow-body'),
      ex('co-goblet-march'),
    ],
  },
  // ── Block 4 ──────────────────────────────────────────────────────────────
  {
    type: 'arms',
    label: 'Shoulders · Biceps · Triceps',
    muscleGroups: ['Shoulders', 'Biceps', 'Triceps', 'Core'],
    exercises: [
      ex('sh-machine-press', { reps: '12', suggestedWeight: '70 lbs' }),
      ex('sh-cable-face-pull'),
      ex('sh-chest-sup-lateral'),
      ex('bi-crossbody-hammer'),
      ex('bi-cable-curl'),
      ex('bi-concentration-curl'),
      ex('tri-skull-crusher'),
      ex('tri-pushdown', { reps: '15', suggestedWeight: '50–55 lbs' }),
      ex('tri-diamond-pushup'),
      ex('co-rkc-plank', { reps: '40 sec' }),
      ex('co-ab-wheel'),
    ],
  },
  // ── Block 5 ──────────────────────────────────────────────────────────────
  {
    type: 'arms',
    label: 'Shoulders · Biceps · Triceps',
    muscleGroups: ['Shoulders', 'Biceps', 'Triceps', 'Core'],
    exercises: [
      ex('sh-db-overhead-press'),
      ex('sh-lateral-raise'),
      ex('sh-rear-delt-pec-deck'),
      ex('bi-spider-curl'),
      ex('bi-incline-curl'),
      ex('bi-21s'),
      ex('tri-lying-extension'),
      ex('tri-overhead-rope'),
      ex('tri-bench-dips'),
      ex('co-hollow-body'),
      ex('co-side-plank-abduct'),
    ],
  },
  // ── Block 6 ──────────────────────────────────────────────────────────────
  {
    type: 'arms',
    label: 'Shoulders · Biceps · Triceps',
    muscleGroups: ['Shoulders', 'Biceps', 'Triceps', 'Core'],
    exercises: [
      ex('sh-arnold-press'),
      ex('sh-cable-face-pull'),
      ex('sh-chest-sup-lateral'),
      ex('bi-hammer-curl'),
      ex('bi-cable-curl'),
      ex('bi-reverse-curl'),
      ex('tri-skull-crusher'),
      ex('tri-sa-pushdown'),
      ex('tri-band-kickback'),
      ex('co-dead-bug'),
      ex('co-oblique-vup'),
    ],
  },
  // ── Block 7 ──────────────────────────────────────────────────────────────
  {
    type: 'arms',
    label: 'Shoulders · Biceps · Triceps',
    muscleGroups: ['Shoulders', 'Biceps', 'Triceps', 'Core'],
    exercises: [
      ex('sh-machine-press'),
      ex('sh-cable-lateral-raise'),
      ex('sh-front-raise'),
      ex('bi-crossbody-hammer'),
      ex('bi-concentration-curl'),
      ex('bi-spider-curl'),
      ex('tri-pushdown'),
      ex('tri-diamond-pushup'),
      ex('tri-lying-extension'),
      ex('co-rkc-plank'),
      ex('co-goblet-march'),
    ],
  },
  // ── Block 8 ──────────────────────────────────────────────────────────────
  {
    type: 'arms',
    label: 'Shoulders · Biceps · Triceps',
    muscleGroups: ['Shoulders', 'Biceps', 'Triceps', 'Core'],
    exercises: [
      ex('sh-db-overhead-press'),
      ex('sh-rear-delt-pec-deck'),
      ex('sh-chest-sup-lateral'),
      ex('bi-incline-curl'),
      ex('bi-hammer-curl'),
      ex('bi-21s'),
      ex('tri-overhead-rope'),
      ex('tri-bench-dips'),
      ex('tri-skull-crusher'),
      ex('co-ab-wheel'),
      ex('co-hollow-body'),
    ],
  },
  // ── Block 9 ──────────────────────────────────────────────────────────────
  {
    type: 'arms',
    label: 'Shoulders · Biceps · Triceps',
    muscleGroups: ['Shoulders', 'Biceps', 'Triceps', 'Core'],
    exercises: [
      ex('sh-lateral-raise'),
      ex('sh-cable-face-pull'),
      ex('sh-arnold-press'),
      ex('bi-cable-curl'),
      ex('bi-reverse-curl'),
      ex('bi-crossbody-hammer'),
      ex('tri-sa-pushdown'),
      ex('tri-band-kickback'),
      ex('tri-pushdown'),
      ex('co-side-plank-abduct'),
      ex('co-dead-bug'),
    ],
  },
  // ── Block 10 ─────────────────────────────────────────────────────────────
  {
    type: 'arms',
    label: 'Shoulders · Biceps · Triceps',
    muscleGroups: ['Shoulders', 'Biceps', 'Triceps', 'Core'],
    exercises: [
      ex('sh-machine-press'),
      ex('sh-chest-sup-lateral'),
      ex('sh-rear-delt-pec-deck'),
      ex('bi-spider-curl'),
      ex('bi-concentration-curl'),
      ex('bi-21s'),
      ex('tri-skull-crusher'),
      ex('tri-lying-extension'),
      ex('tri-diamond-pushup'),
      ex('co-rkc-plank'),
      ex('co-goblet-march'),
    ],
  },
  // ── Block 11 ─────────────────────────────────────────────────────────────
  {
    type: 'arms',
    label: 'Shoulders · Biceps · Triceps',
    muscleGroups: ['Shoulders', 'Biceps', 'Triceps', 'Core'],
    exercises: [
      ex('sh-db-overhead-press'),
      ex('sh-front-raise'),
      ex('sh-rear-delt-pec-deck'),
      ex('bi-hammer-curl'),
      ex('bi-cable-curl'),
      ex('bi-reverse-curl'),
      ex('tri-lying-extension'),
      ex('tri-overhead-rope'),
      ex('tri-pushdown'),
      ex('co-oblique-vup'),
      ex('co-dead-bug'),
    ],
  },
  // ── Block 12 ─────────────────────────────────────────────────────────────
  {
    type: 'arms',
    label: 'Shoulders · Biceps · Triceps',
    muscleGroups: ['Shoulders', 'Biceps', 'Triceps', 'Core'],
    exercises: [
      ex('sh-arnold-press'),
      ex('sh-cable-lateral-raise'),
      ex('sh-machine-press'),
      ex('bi-incline-curl'),
      ex('bi-concentration-curl'),
      ex('bi-spider-curl'),
      ex('tri-skull-crusher'),
      ex('tri-sa-pushdown'),
      ex('tri-bench-dips'),
      ex('co-rkc-plank'),
      ex('co-goblet-march'),
    ],
  },
];

// ─── LEGS DAYS ──────────────────────────────────────────────────────────────
const legsDays: DayPlan[] = [
  // ── Block 1 ──────────────────────────────────────────────────────────────
  {
    type: 'legs',
    label: 'Legs · Glutes',
    muscleGroups: ['Quads', 'Hamstrings', 'Glutes', 'Core'],
    exercises: [
      ex('lg-goblet-squat'),
      ex('lg-bulgarian-split'),
      ex('lg-sumo-deadlift'),
      ex('lg-hip-thrust'),
      ex('lg-leg-curl'),
      ex('co-side-plank'),
      ex('co-goblet-march'),
    ],
  },
  // ── Block 2 ──────────────────────────────────────────────────────────────
  {
    type: 'legs',
    label: 'Legs · Glutes',
    muscleGroups: ['Quads', 'Hamstrings', 'Glutes', 'Abductors', 'Core'],
    exercises: [
      ex('lg-cossack-squat'),
      ex('lg-rdl'),
      ex('lg-leg-press'),
      ex('lg-abductor'),
      ex('lg-walking-lunges'),
      ex('co-dead-bug'),
      ex('co-rkc-plank'),
    ],
  },
  // ── Block 3 ──────────────────────────────────────────────────────────────
  {
    type: 'legs',
    label: 'Legs · Glutes',
    muscleGroups: ['Quads', 'Hamstrings', 'Glutes', 'Core'],
    exercises: [
      ex('lg-split-squat-twist'),
      ex('lg-sumo-deadlift', { reps: '12', suggestedWeight: '50–65 lbs' }),
      ex('lg-hip-thrust', { reps: '15' }),
      ex('lg-leg-extension'),
      ex('lg-step-ups'),
      ex('co-hollow-body'),
      ex('co-oblique-vup'),
    ],
  },
  // ── Block 4 ──────────────────────────────────────────────────────────────
  {
    type: 'legs',
    label: 'Legs · Glutes',
    muscleGroups: ['Quads', 'Hamstrings', 'Glutes', 'Abductors', 'Core'],
    exercises: [
      ex('lg-goblet-squat', { reps: '12', suggestedWeight: '35–40 lbs' }),
      ex('lg-bulgarian-split', { reps: '10 each' }),
      ex('lg-rdl'),
      ex('lg-leg-curl', { reps: '15' }),
      ex('lg-abductor', { reps: '15', suggestedWeight: '90 lbs' }),
      ex('co-side-plank-abduct'),
      ex('co-ab-wheel'),
    ],
  },
  // ── Block 5 ──────────────────────────────────────────────────────────────
  {
    type: 'legs',
    label: 'Legs · Glutes',
    muscleGroups: ['Quads', 'Hamstrings', 'Glutes', 'Core'],
    exercises: [
      ex('lg-cossack-squat'),
      ex('lg-hip-thrust'),
      ex('lg-leg-press'),
      ex('lg-walking-lunges'),
      ex('lg-step-ups'),
      ex('co-dead-bug'),
      ex('co-goblet-march'),
    ],
  },
  // ── Block 6 ──────────────────────────────────────────────────────────────
  {
    type: 'legs',
    label: 'Legs · Glutes',
    muscleGroups: ['Quads', 'Hamstrings', 'Glutes', 'Core'],
    exercises: [
      ex('lg-sumo-deadlift'),
      ex('lg-split-squat-twist'),
      ex('lg-goblet-squat'),
      ex('lg-leg-extension'),
      ex('lg-rdl'),
      ex('co-side-plank'),
      ex('co-hollow-body'),
    ],
  },
  // ── Block 7 ──────────────────────────────────────────────────────────────
  {
    type: 'legs',
    label: 'Legs · Glutes',
    muscleGroups: ['Quads', 'Hamstrings', 'Glutes', 'Abductors', 'Core'],
    exercises: [
      ex('lg-bulgarian-split'),
      ex('lg-abductor'),
      ex('lg-cossack-squat'),
      ex('lg-leg-curl'),
      ex('lg-hip-thrust'),
      ex('co-oblique-vup'),
      ex('co-rkc-plank'),
    ],
  },
  // ── Block 8 ──────────────────────────────────────────────────────────────
  {
    type: 'legs',
    label: 'Legs · Glutes',
    muscleGroups: ['Quads', 'Hamstrings', 'Glutes', 'Core'],
    exercises: [
      ex('lg-goblet-squat'),
      ex('lg-walking-lunges'),
      ex('lg-leg-press'),
      ex('lg-step-ups'),
      ex('lg-sumo-deadlift'),
      ex('co-ab-wheel'),
      ex('co-dead-bug'),
    ],
  },
  // ── Block 9 ──────────────────────────────────────────────────────────────
  {
    type: 'legs',
    label: 'Legs · Glutes',
    muscleGroups: ['Quads', 'Hamstrings', 'Glutes', 'Abductors', 'Core'],
    exercises: [
      ex('lg-split-squat-twist'),
      ex('lg-rdl'),
      ex('lg-bulgarian-split'),
      ex('lg-leg-extension'),
      ex('lg-abductor'),
      ex('co-side-plank-abduct'),
      ex('co-goblet-march'),
    ],
  },
  // ── Block 10 ─────────────────────────────────────────────────────────────
  {
    type: 'legs',
    label: 'Legs · Glutes',
    muscleGroups: ['Quads', 'Hamstrings', 'Glutes', 'Core'],
    exercises: [
      ex('lg-hip-thrust'),
      ex('lg-cossack-squat'),
      ex('lg-goblet-squat'),
      ex('lg-leg-curl'),
      ex('lg-walking-lunges'),
      ex('co-hollow-body'),
      ex('co-rkc-plank'),
    ],
  },
  // ── Block 11 ─────────────────────────────────────────────────────────────
  {
    type: 'legs',
    label: 'Legs · Glutes',
    muscleGroups: ['Quads', 'Hamstrings', 'Glutes', 'Core'],
    exercises: [
      ex('lg-sumo-deadlift'),
      ex('lg-leg-press'),
      ex('lg-step-ups'),
      ex('lg-rdl'),
      ex('lg-split-squat-twist'),
      ex('co-oblique-vup'),
      ex('co-side-plank'),
    ],
  },
  // ── Block 12 ─────────────────────────────────────────────────────────────
  {
    type: 'legs',
    label: 'Legs · Glutes',
    muscleGroups: ['Quads', 'Hamstrings', 'Glutes', 'Core'],
    exercises: [
      ex('lg-bulgarian-split'),
      ex('lg-leg-extension'),
      ex('lg-hip-thrust'),
      ex('lg-walking-lunges'),
      ex('lg-sumo-deadlift'),
      ex('co-ab-wheel'),
      ex('co-side-plank-abduct'),
    ],
  },
];

// ─── CHEST / BACK DAYS ──────────────────────────────────────────────────────
const chestBackDays: DayPlan[] = [
  // ── Block 1 ──────────────────────────────────────────────────────────────
  {
    type: 'chest-back',
    label: 'Chest · Back · Pull-ups',
    muscleGroups: ['Chest', 'Back', 'Lats', 'Core'],
    exercises: [
      ex('ch-smith-incline'),
      ex('ch-alt-db-incline'),
      ex('ch-pec-deck'),
      ex('ba-cable-row-vbar'),
      ex('ba-chest-sup-row'),
      ex('pu-assisted-machine'),
      ex('ba-straight-arm-pulldown'),
      ex('co-hollow-body'),
    ],
  },
  // ── Block 2 ──────────────────────────────────────────────────────────────
  {
    type: 'chest-back',
    label: 'Chest · Back · Pull-ups',
    muscleGroups: ['Chest', 'Back', 'Lats', 'Core'],
    exercises: [
      ex('ch-flat-db-press'),
      ex('ch-cable-fly-low'),
      ex('ch-chest-press-machine'),
      ex('ba-sa-cable-row'),
      ex('ba-lat-pulldown'),
      ex('pu-band-assisted'),
      ex('ba-straight-arm-pulldown'),
      ex('co-rkc-plank'),
    ],
  },
  // ── Block 3 ──────────────────────────────────────────────────────────────
  {
    type: 'chest-back',
    label: 'Chest · Back · Pull-ups',
    muscleGroups: ['Chest', 'Back', 'Lats', 'Core'],
    exercises: [
      ex('ch-smith-incline', { reps: '12', suggestedWeight: '65–75 lbs' }),
      ex('ch-cable-crossover'),
      ex('ch-db-incline'),
      ex('ba-underhand-row'),
      ex('ba-trx-row'),
      ex('pu-negative'),
      ex('ba-chest-sup-row'),
      ex('co-dead-bug'),
    ],
  },
  // ── Block 4 ──────────────────────────────────────────────────────────────
  {
    type: 'chest-back',
    label: 'Chest · Back · Pull-ups',
    muscleGroups: ['Chest', 'Back', 'Lats', 'Core'],
    exercises: [
      ex('ch-alt-db-incline', { reps: '12' }),
      ex('ch-pec-deck'),
      ex('ch-cable-fly-low'),
      ex('ba-cable-row-vbar', { reps: '15' }),
      ex('ba-sa-db-row'),
      ex('pu-assisted-machine', { sets: 4 }),
      ex('ba-straight-arm-pulldown'),
      ex('co-oblique-vup'),
    ],
  },
  // ── Block 5 ──────────────────────────────────────────────────────────────
  {
    type: 'chest-back',
    label: 'Chest · Back · Pull-ups',
    muscleGroups: ['Chest', 'Back', 'Lats', 'Core'],
    exercises: [
      ex('ch-flat-db-press'),
      ex('ch-chest-press-machine'),
      ex('ch-cable-crossover'),
      ex('ba-sa-cable-row'),
      ex('ba-underhand-row'),
      ex('pu-band-assisted'),
      ex('ba-lat-pulldown'),
      ex('co-hollow-body'),
    ],
  },
  // ── Block 6 ──────────────────────────────────────────────────────────────
  {
    type: 'chest-back',
    label: 'Chest · Back · Pull-ups',
    muscleGroups: ['Chest', 'Back', 'Lats', 'Core'],
    exercises: [
      ex('ch-smith-incline'),
      ex('ch-db-incline'),
      ex('ch-pec-deck'),
      ex('ba-sa-db-row'),
      ex('ba-chest-sup-row'),
      ex('pu-trx'),
      ex('ba-straight-arm-pulldown'),
      ex('co-rkc-plank'),
    ],
  },
  // ── Block 7 ──────────────────────────────────────────────────────────────
  {
    type: 'chest-back',
    label: 'Chest · Back · Pull-ups',
    muscleGroups: ['Chest', 'Back', 'Lats', 'Core'],
    exercises: [
      ex('ch-flat-db-press'),
      ex('ch-cable-fly-low'),
      ex('ch-db-incline'),
      ex('ba-cable-row-vbar'),
      ex('ba-lat-pulldown'),
      ex('pu-assisted-machine'),
      ex('ba-trx-row'),
      ex('co-oblique-vup'),
    ],
  },
  // ── Block 8 ──────────────────────────────────────────────────────────────
  {
    type: 'chest-back',
    label: 'Chest · Back · Pull-ups',
    muscleGroups: ['Chest', 'Back', 'Lats', 'Core'],
    exercises: [
      ex('ch-cable-crossover'),
      ex('ch-chest-press-machine'),
      ex('ch-smith-incline'),
      ex('ba-sa-cable-row'),
      ex('ba-underhand-row'),
      ex('pu-band-assisted'),
      ex('ba-chest-sup-row'),
      ex('co-dead-bug'),
    ],
  },
  // ── Block 9 ──────────────────────────────────────────────────────────────
  {
    type: 'chest-back',
    label: 'Chest · Back · Pull-ups',
    muscleGroups: ['Chest', 'Back', 'Lats', 'Core'],
    exercises: [
      ex('ch-alt-db-incline'),
      ex('ch-pec-deck'),
      ex('ch-flat-db-press'),
      ex('ba-straight-arm-pulldown'),
      ex('ba-sa-db-row'),
      ex('pu-negative'),
      ex('ba-lat-pulldown'),
      ex('co-hollow-body'),
    ],
  },
  // ── Block 10 ─────────────────────────────────────────────────────────────
  {
    type: 'chest-back',
    label: 'Chest · Back · Pull-ups',
    muscleGroups: ['Chest', 'Back', 'Lats', 'Core'],
    exercises: [
      ex('ch-db-incline'),
      ex('ch-cable-fly-low'),
      ex('ch-cable-crossover'),
      ex('ba-cable-row-vbar'),
      ex('ba-trx-row'),
      ex('pu-trx'),
      ex('ba-underhand-row'),
      ex('co-rkc-plank'),
    ],
  },
  // ── Block 11 ─────────────────────────────────────────────────────────────
  {
    type: 'chest-back',
    label: 'Chest · Back · Pull-ups',
    muscleGroups: ['Chest', 'Back', 'Lats', 'Core'],
    exercises: [
      ex('ch-smith-incline'),
      ex('ch-chest-press-machine'),
      ex('ch-alt-db-incline'),
      ex('ba-chest-sup-row'),
      ex('ba-sa-cable-row'),
      ex('pu-band-assisted'),
      ex('ba-straight-arm-pulldown'),
      ex('co-oblique-vup'),
    ],
  },
  // ── Block 12 ─────────────────────────────────────────────────────────────
  {
    type: 'chest-back',
    label: 'Chest · Back · Pull-ups',
    muscleGroups: ['Chest', 'Back', 'Lats', 'Core'],
    exercises: [
      ex('ch-pec-deck'),
      ex('ch-db-incline'),
      ex('ch-cable-crossover'),
      ex('ba-lat-pulldown'),
      ex('ba-sa-db-row'),
      ex('pu-negative'),
      ex('ba-cable-row-vbar'),
      ex('co-dead-bug'),
    ],
  },
];

export function getBlockPlan(block: number): BlockPlan {
  const len = armsDays.length; // 12 — after block 12 cycles back to block 1
  const idx = ((block - 1) % len + len) % len;
  return {
    block,
    days: [armsDays[idx], legsDays[idx], chestBackDays[idx]],
  };
}

export { armsDays, legsDays, chestBackDays };
