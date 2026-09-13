/**
 * utils/transitions.ts
 * 
 * Hardened View Transitions utility abstraction.
 * Provides deterministic naming and safely bounds transition execution.
 */

/**
 * Deterministic transition name generator.
 * Enforces semantic role + stable ID to prevent random/hallucinated names.
 * Usage: viewTransitionName: getTransitionName('hero-image', 'product-123')
 */
export function getTransitionName(role: string, id: string): string {
  if (!role || !id) return 'none';
  return `vt-${role}-${id.replace(/[^a-zA-Z0-9-]/g, '-')}`;
}

/**
 * Checks if the user has requested reduced motion at the OS level.
 */
export function prefersReducedMotion(): boolean {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

/**
 * Global lock to prevent overlapping View Transitions which would crash the API.
 */
let isTransitionActive = false;

/**
 * Safely executes a route transition callback.
 * Implements strict fallback, duplicate-name protection, and lock safety.
 */
export function executeSafeViewTransition(updateCallback: () => void) {
  // 1. Fallback: API not supported, reduced motion enabled, or an existing transition is active (race condition)
  if (!document.startViewTransition || prefersReducedMotion() || isTransitionActive) {
    updateCallback();
    return;
  }

  let captureFailed = false;

  try {
    isTransitionActive = true;
    
    const transition = document.startViewTransition(() => {
      // The update callback. If we reached here, capture succeeded.
      captureFailed = false;
      updateCallback();
    });

    // Safety timeout: Guarantee lock releases even if browser transition hangs
    const safetyTimer = setTimeout(() => {
      isTransitionActive = false;
    }, 2000);

    // Release the lock when transition completes or fails post-capture
    transition.finished.finally(() => {
      clearTimeout(safetyTimer);
      isTransitionActive = false;
    });

  } catch (err) {
    // The capture phase failed synchronously (usually due to duplicate view-transition-names).
    // The updateCallback was NOT executed. We must flag it for fallback.
    captureFailed = true;
    isTransitionActive = false;
    console.warn('[Website Engine] Native View Transition capture failed (likely duplicate names). Falling back to standard navigation.', err);
  }

  // 2. Hard Fallback: Execute navigation instantly to prevent a broken route
  if (captureFailed) {
    updateCallback();
  }
}
