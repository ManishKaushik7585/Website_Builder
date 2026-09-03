export function cn(...classes: (string | undefined | null | false)[]) {
  // A strictly native, zero-dependency class composition utility.
  // This function does NOT resolve Tailwind conflicts (e.g. p-4 vs p-8).
  // It only handles conditional concatenation.
  return classes.filter(Boolean).join(' ').trim();
}
