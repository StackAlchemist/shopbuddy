"use client";

import Link from "next/link";
import { ChevronRight, Brain, Currency } from "lucide-react";

type ListCardProps = {
  id: string;
  title: string;
  itemsCount: number;
  updatedAt?: string;
  total?: number;
};

export default function ListCard({
  id,
  title,
  itemsCount,
  updatedAt,
  total,
}: ListCardProps) {
  return (
    <Link
      href={`/lists/${id}`}
      className="group relative rounded-2xl border border-slate-200 bg-white p-5 transition
                 hover:-translate-y-0.5 hover:shadow-lg"
    >
      {/* Header */}
      <div className="flex items-start justify-between">
        <h3 className="text-base font-semibold text-slate-900 line-clamp-2">
          {title}
        </h3>

        <ChevronRight
          size={18}
          className="text-slate-400 transition group-hover:translate-x-1"
        />
      </div>

      {/* Meta */}
      <div className="mt-3 flex items-center gap-3 text-sm text-slate-500">
        <span>{itemsCount} items</span>

        {updatedAt && (
          <>
            <span>•</span>
            <span>Updated {updatedAt}</span>
          </>
        )}
      </div>

      {/* AI Badge */}
      {/* {aiEnabled && (
        <div className="mt-4 inline-flex items-center gap-1.5 rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700">
          <Brain size={12} />
          Smart suggestions enabled
        </div>
      )} */}
      <div className="mt-4 inline-flex items-center gap-1.5 rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700">   <Currency size={12} />
        Total: ₦{total?.toLocaleString()}
      </div>
    </Link>
  );
}
