import React from "react";
import { Skeleton } from "./ui/skeleton";

const SkeletonProductCard = () => {
  return (
    <div className="space-x-4">
      <Skeleton className="h-64 w-full" />
      <div className="space-y-2">
        <Skeleton className="h-10 w-[250px]" />
        <Skeleton className="h-6 w-[200px]" />
      </div>
    </div>
  );
};

export default SkeletonProductCard;
