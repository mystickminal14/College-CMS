import { useEffect, useRef, useState } from "react";

interface Options {
  enabled: boolean;
  /** Silence after which the kiosk clears itself. */
  timeoutMs: number;
  /** How long before that the visitor is asked whether they are still there. */
  warnMs: number;
  onReset: () => void;
}

/**
 * A lobby tablet is shared, so a visitor who walks away mid-flow must not leave
 * their name, phone number and reason for visiting on screen for the next
 * person. This clears the kiosk after a stretch of silence, warning first so
 * nobody loses a form they are still filling in.
 *
 * Returns the seconds left once the warning is due, or null while the visitor
 * is still active.
 */
export const useIdleReset = ({ enabled, timeoutMs, warnMs, onReset }: Options) => {
  const [secondsLeft, setSecondsLeft] = useState<number | null>(null);
  const deadline = useRef(0);
  const onResetRef = useRef(onReset);

  useEffect(() => {
    onResetRef.current = onReset;
  }, [onReset]);

  useEffect(() => {
    if (!enabled) return;

    // Seeded by touching the ref rather than by calling bump(), so arming the
    // timer does not queue a render on mount.
    deadline.current = Date.now() + timeoutMs;

    const bump = () => {
      deadline.current = Date.now() + timeoutMs;
      setSecondsLeft(null);
    };

    const events = ["pointerdown", "keydown", "touchstart", "wheel"] as const;
    events.forEach((event) => window.addEventListener(event, bump, { passive: true }));

    const timer = setInterval(() => {
      const left = deadline.current - Date.now();
      if (left <= 0) {
        setSecondsLeft(null);
        onResetRef.current();
        return;
      }
      setSecondsLeft(left <= warnMs ? Math.ceil(left / 1000) : null);
    }, 500);

    return () => {
      events.forEach((event) => window.removeEventListener(event, bump));
      clearInterval(timer);
    };
  }, [enabled, timeoutMs, warnMs]);

  // Derived rather than cleared in the effect: a disabled timer has no warning
  // to show, whatever the last tick left behind.
  return enabled ? secondsLeft : null;
};
