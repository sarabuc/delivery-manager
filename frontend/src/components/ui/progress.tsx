import React from "react";

import { cn } from "../../lib/utils";

interface ProgressProps extends React.HTMLAttributes<HTMLDivElement> {
  value: number;
}

export function Progress({ value, className, ...props }: ProgressProps) {
  return (
    <div
      className={cn("h-2 w-full rounded-full bg-slate-800", className)}
      {...props}
    >
      <div
        className="h-2 rounded-full bg-emerald-500 transition-all"
        style={{ width: `${value}%` }}
      />
    </div>
  );
}
