import React from "react";

type TableSkeletonProps = {
  columns?: number;
  rows?: number;
};

export default function TableSkeleton({
  columns = 4,
  rows = 5,
}: TableSkeletonProps) {
  return (
    <div className="w-full border rounded-lg shadow-sm overflow-hidden">
      <div className="animate-pulse">
        <table className="min-w-full border-collapse">
          <thead className="bg-gray-100">
            <tr>
              {[...Array(columns)].map((_, i) => (
                <th key={i} className="px-4 py-2 border-b">
                  <div className="h-4 bg-gray-200 rounded w-1/2 mx-auto" />
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {[...Array(rows)].map((_, i) => (
              <tr key={i} className="border-b">
                {[...Array(columns)].map((_, j) => (
                  <td key={j} className="px-4 py-3">
                    <div className="h-4 bg-gray-200 rounded" />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
