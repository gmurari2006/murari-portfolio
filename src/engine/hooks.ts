import { useEffect, useState, useRef } from 'react';
import { director, DirectorState, SceneCalculations, SceneId } from './director';

export function useDirector(callback: (state: DirectorState) => void, idKey?: string) {
  const cbRef = useRef(callback);
  cbRef.current = callback;

  useEffect(() => {
    const key = idKey || Math.random().toString(36).slice(2);
    const unsubscribe = director.subscribe(key, (state) => {
      cbRef.current(state);
    });
    return unsubscribe;
  }, [idKey]);
}

export function useSceneDirector(
  sceneId: SceneId,
  callback: (calc: SceneCalculations, fullState: DirectorState) => void,
  idKey?: string
) {
  const cbRef = useRef(callback);
  cbRef.current = callback;

  useEffect(() => {
    const key = idKey || `${sceneId}-${Math.random().toString(36).slice(2)}`;
    const unsubscribe = director.subscribe(key, (state) => {
      const sceneCalc = state.scenes[sceneId];
      if (sceneCalc) {
        cbRef.current(sceneCalc, state);
      }
    });
    return unsubscribe;
  }, [sceneId, idKey]);
}

export function useMousePosition() {
  const [pos, setPos] = useState({ x: 0, y: 0, nx: 0, ny: 0 });

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      const nx = (e.clientX / window.innerWidth) * 2 - 1;
      const ny = (e.clientY / window.innerHeight) * 2 - 1;
      setPos({ x: e.clientX, y: e.clientY, nx, ny });
    };

    window.addEventListener('mousemove', handleMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMove);
  }, []);

  return pos;
}
