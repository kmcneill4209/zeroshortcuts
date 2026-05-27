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

export interface BlockPlan {
  block: number; // 1–4
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
  block: number;
  weekInBlock: number;
  exercises: ExerciseLog[];
  completedAt: number;
}

export interface UserProgress {
  block: number;       // 1–4
  weekInBlock: number; // 1–5
}
