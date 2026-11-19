import { useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";

/** Counts up to `target` once `active` turns true. Reduced motion skips straight to the figure. */
const useCountUp = (target: number, active: boolean, duration = 1400) => {
  const prefersReducedMotion = useReducedMotion();
  const [counted, setCounted] = useState(0);

  useEffect(() => {
    if (!active || prefersReducedMotion) return;

    let frame = 0;
    const start = performance.now();

    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      // Ease-out so the number settles rather than stopping dead.
      setCounted(Math.round(target * (1 - Math.pow(1 - progress, 3))));
      if (progress < 1) frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [active, target, duration, prefersReducedMotion]);

  return prefersReducedMotion ? target : counted;
};

export default useCountUp;
