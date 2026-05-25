export type ExerciseCategory =
  | 'shoulders'
  | 'biceps'
  | 'triceps'
  | 'chest'
  | 'back'
  | 'legs'
  | 'core'
  | 'pullups';

export type WorkoutType = 'arms' | 'legs' | 'chest-back';

export interface Exercise {
  id: string;
  name: string;
  category: ExerciseCategory;
  equipment: string[];
  defaultSets: number;
  defaultReps: string;
  defaultWeight?: string;
  youtubeUrl?: string;
}

export interface WorkoutExercise {
  exercise: Exercise;
  sets: number;
  reps: string;
  suggestedWeight?: string;
}

export interface DayPlan {
  type: WorkoutType;
  label: string;
  muscleGroups: string[];
  exercises: WorkoutExercise[];
}

export interface WeekPlan {
  weekNumber: number; // 1–4 cycling
  days: DayPlan[];
}

export interface ExerciseLog {
  exerciseId: string;
  exerciseName: string;
  sets: number;
  reps: string;
  weight: string;
  comment: string;
}

export interface WorkoutLog {
  id?: string;
  userId: string;
  workoutType: WorkoutType;
  dayLabel: string;
  weekNumber: number;
  exercises: ExerciseLog[];
  completedAt: number;
}
