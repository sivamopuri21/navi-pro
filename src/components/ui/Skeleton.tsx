"use client";

export function Skeleton({ className = "" }: { className?: string }) {
  return <div className={`skeleton ${className}`} />;
}

export function ProjectCardSkeleton() {
  return (
    <div className="rounded-2xl overflow-hidden bg-white shadow-md">
      <Skeleton className="h-48 w-full !rounded-none" />
      <div className="p-5 space-y-3">
        <Skeleton className="h-6 w-3/4" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-2/3" />
      </div>
    </div>
  );
}

export function TestimonialSkeleton() {
  return (
    <div className="rounded-2xl bg-white shadow-md p-6 space-y-3">
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-5/6" />
      <Skeleton className="h-5 w-1/3 mt-4" />
    </div>
  );
}
