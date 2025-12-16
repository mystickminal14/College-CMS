   export const CourseSkeleton = () => (
        <div className="
      bg-white 
      dark:bg-slate-800
      rounded-2xl 
      shadow 
      border border-gray-200
      dark:border-slate-700
      p-4
      w-full
      h-full
      flex flex-col
      animate-pulse
    ">
            {/* Image skeleton */}
            <div className="
        h-52 
        w-full 
        rounded-xl 
        bg-gray-300 
        dark:bg-slate-700
       shrink-0
        mb-3
      "></div>

            {/* Content skeleton */}
            <div className="flex flex-col flex-1">
                {/* Title skeleton */}
                <div className="h-4 bg-gray-300 dark:bg-slate-700 rounded mb-3 w-3/4"></div>
                <div className="h-4 bg-gray-300 dark:bg-slate-700 rounded mb-4 w-1/2"></div>

                {/* Metadata skeleton */}
                <div className="flex gap-3 mb-4">
                    <div className="h-3 bg-gray-300 dark:bg-slate-700 rounded w-16"></div>
                    <div className="h-3 bg-gray-300 dark:bg-slate-700 rounded w-20"></div>
                </div>

                {/* Button skeleton */}
                <div className="mt-auto">
                    <div className="h-10 bg-gray-300 dark:bg-slate-700 rounded-xl w-full"></div>
                </div>
            </div>
        </div>
    );  