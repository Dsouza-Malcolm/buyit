import React from "react";
import { Skeleton } from "./ui/skeleton";

const SkeletonProductCard = () => {
  return (
    <div className="space-y-4">
      <Skeleton className="h-32 w-full bg-zinc-200" />
      <div className="space-y-4">
        <Skeleton className="h-4 w-[250px] bg-zinc-200" />
        <Skeleton className="h-4 w-[200px] bg-zinc-200" />
      </div>
    </div>
  );
};

export default SkeletonProductCard;
