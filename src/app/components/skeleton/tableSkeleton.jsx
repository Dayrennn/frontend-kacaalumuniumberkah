export default function TableSkeleton({
    statCount = 3,
    columns = 8,
    rows = 8,
    showFilter = false,
}) {
    return (
        <div className="p-6 lg:p-8 space-y-6 animate-pulse">
            {/* Header */}
            <div className="flex items-center justify-between flex-wrap gap-4">
                <div className="space-y-2">
                    <div className="h-7 w-48 bg-gray-200 rounded-lg" />
                    <div className="h-4 w-64 bg-gray-100 rounded" />
                </div>
                <div className="flex items-center gap-2">
                    {showFilter && <div className="h-10 w-40 bg-gray-200 rounded-xl" />}
                    <div className="h-10 w-36 bg-gray-200 rounded-xl" />
                </div>
            </div>

            {/* Stat cards */}
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
                {Array.from({ length: statCount }).map((_, i) => (
                    <div
                        key={i}
                        className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 flex items-center gap-4"
                    >
                        <div className="w-11 h-11 bg-gray-200 rounded-xl flex-shrink-0" />
                        <div className="space-y-2 flex-1">
                            <div className="h-3 w-20 bg-gray-200 rounded" />
                            <div className="h-5 w-12 bg-gray-200 rounded" />
                        </div>
                    </div>
                ))}
            </div>

            {/* Tabel */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                {/* Table header bar */}
                <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100 flex-wrap gap-3">
                    <div className="flex items-center gap-2">
                        <div className="w-4 h-4 bg-gray-200 rounded" />
                        <div className="h-4 w-32 bg-gray-200 rounded" />
                    </div>
                    <div className="flex items-center gap-2">
                        {showFilter && <div className="h-9 w-56 bg-gray-100 rounded-xl" />}
                        <div className="h-9 w-56 bg-gray-100 rounded-xl" />
                    </div>
                </div>

                {/* Table rows */}
                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="text-left">
                                {Array.from({ length: columns }).map((_, i) => (
                                    <th key={i} className="px-5 py-3">
                                        <div className="h-3 w-16 bg-gray-200 rounded" />
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {Array.from({ length: rows }).map((_, rowIdx) => (
                                <tr key={rowIdx}>
                                    {Array.from({ length: columns }).map((_, colIdx) => (
                                        <td key={colIdx} className="px-5 py-4">
                                            <div className="h-3.5 w-full max-w-[100px] bg-gray-100 rounded" />
                                        </td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Pagination bar */}
                <div className="flex items-center justify-between px-5 py-4 border-t border-gray-100">
                    <div className="h-3 w-40 bg-gray-100 rounded" />
                    <div className="flex items-center gap-1">
                        {Array.from({ length: 5 }).map((_, i) => (
                            <div key={i} className="w-8 h-8 bg-gray-100 rounded-lg" />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}