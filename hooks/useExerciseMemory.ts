'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { ExerciseMemoryEntry, ExerciseMemoryMap } from '@/lib/types';
import { useAuth } from './useAuth';

export function useExerciseMemory() {
  const { user } = useAuth();
  const [memory, setMemory] = useState<ExerciseMemoryMap>({});
  const [loaded, setLoaded] = useState(false);
  // Ref so updateMemory never captures stale state in its closure
  const memoryRef = useRef<ExerciseMemoryMap>({});

  useEffect(() => {
    memoryRef.current = memory;
  }, [memory]);

  useEffect(() => {
    if (!user) return;
    const ref = doc(db, 'users', user.uid, 'settings', 'exerciseMemory');
    getDoc(ref).then((snap) => {
      if (snap.exists()) {
        const data = snap.data() as ExerciseMemoryMap;
        setMemory(data);
        memoryRef.current = data;
      }
      setLoaded(true);
    });
  }, [user]);

  const updateMemory = useCallback(
    async (exerciseId: string, entry: ExerciseMemoryEntry) => {
      if (!user) return;
      const updated = { ...memoryRef.current, [exerciseId]: entry };
      setMemory(updated);
      memoryRef.current = updated;
      await setDoc(
        doc(db, 'users', user.uid, 'settings', 'exerciseMemory'),
        updated
      );
    },
    [user]
  );

  return { memory, loaded, updateMemory };
}
