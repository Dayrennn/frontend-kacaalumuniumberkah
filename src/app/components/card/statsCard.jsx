export default function StatCard({ icon: IconComp, label, value, tone = 'blue' }) {
    const tones = {
        blue: 'bg-blue-50 text-blue-600',
        red: 'bg-red-50 text-red-600',
        green: 'bg-green-50 text-green-600',
        amber: 'bg-amber-50 text-amber-600',
    };

    return (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 flex items-center gap-4">
            <div className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 ${tones[tone]}`}>
                <IconComp className="w-5 h-5" />
            </div>
            <div className="min-w-0">
                <p className="text-gray-500 text-xs font-medium truncate">{label}</p>
                <p className="text-gray-900 text-xl font-extrabold mt-0.5">{value}</p>
            </div>
        </div>
    );
}