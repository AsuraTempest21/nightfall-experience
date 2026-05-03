/**
 * Full-page loading skeleton shown during lazy route loading (Suspense fallback).
 * Styled to match the dark Tichuka aesthetic.
 */
const PageLoader = () => (
  <div className="flex min-h-[60vh] items-center justify-center">
    <div className="flex flex-col items-center gap-4">
      <div className="relative w-10 h-10">
        <div className="absolute inset-0 rounded-full border-2 border-primary/20" />
        <div className="absolute inset-0 rounded-full border-2 border-transparent border-t-primary animate-spin" />
      </div>
      <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground animate-pulse">
        Loading
      </p>
    </div>
  </div>
);

export default PageLoader;
