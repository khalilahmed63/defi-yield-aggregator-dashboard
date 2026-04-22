type SkeletonProps = {
  className?: string;
};

export function Skeleton({ className = "" }: SkeletonProps) {
  return <div className={`skeleton-shimmer rounded-lg bg-white/8 ${className}`} />;
}
