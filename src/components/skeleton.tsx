export function Skeleton({ className = "" }: { className?: string }) {
    return (
        <div className={`animate-pulse bg-white/[0.04] rounded-xl ${className}`} />
    );
}

export function SkeletonCard() {
    return (
        <div className="card-base p-6 space-y-4">
            <Skeleton className="h-10 w-10 rounded-xl" />
            <Skeleton className="h-5 w-3/4" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-2/3" />
        </div>
    );
}

export function SkeletonHero() {
    return (
        <div className="pt-32 pb-20 max-w-[1200px] mx-auto px-6 text-center space-y-6">
            <Skeleton className="h-8 w-48 mx-auto rounded-full" />
            <Skeleton className="h-16 w-3/4 mx-auto" />
            <Skeleton className="h-6 w-1/2 mx-auto" />
            <div className="flex justify-center gap-4 pt-4">
                <Skeleton className="h-14 w-48 rounded-2xl" />
                <Skeleton className="h-14 w-48 rounded-2xl" />
            </div>
            <Skeleton className="h-[300px] max-w-[500px] mx-auto mt-8 rounded-2xl" />
        </div>
    );
}

export function SkeletonGrid() {
    return (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-[1200px] mx-auto px-6 py-24">
            {Array.from({ length: 6 }).map((_, i) => (
                <SkeletonCard key={i} />
            ))}
        </div>
    );
}
