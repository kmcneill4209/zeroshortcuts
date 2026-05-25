import { exercises } from './exercises';
import { DayPlan, WeekPlan, WorkoutExercise } from './types';

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

const armsDays: DayPlan[] = [
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
];

const legsDays: DayPlan[] = [
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
];

const chestBackDays: DayPlan[] = [
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
];

export function getWeekPlan(weekNumber: number): WeekPlan {
  const idx = ((weekNumber - 1) % 4 + 4) % 4;
  return {
    weekNumber,
    days: [armsDays[idx], legsDays[idx], chestBackDays[idx]],
  };
}

export { armsDays, legsDays, chestBackDays };
