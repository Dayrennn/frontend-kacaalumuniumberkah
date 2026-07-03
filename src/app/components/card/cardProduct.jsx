import Image from 'next/image';

export default function CardProduct({ name, category, bg, image, badge, badgeLabel, desc, onViewDetail }) {
    return (
        <div
            className="product-card bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden card-hover"
            data-category={category}
        >
            <div className={`relative flex items-center justify-center h-40 ${bg ?? ''}`}>
                <Image src={image} alt={name} width={120} height={120} />
                <span className="absolute top-3 right-3 bg-green-100 text-green-700 text-xs font-semibold px-2 py-1 rounded-full flex items-center gap-1">
                    <span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span> Available
                </span>
            </div>

            <div className="p-4">
                <span className={`${badge} text-xs font-semibold px-2.5 py-1 rounded-full`}>{badgeLabel}</span>
                <h4 className="font-bold text-gray-900 mt-2 mb-1">{name}</h4>
                <p className="text-gray-500 text-xs mb-4 leading-relaxed">{desc}</p>
                <button
                    onClick={onViewDetail}
                    className="w-full bg-blue-50 hover:bg-blue-600 hover:text-white text-blue-700 font-semibold text-sm py-2.5 rounded-xl transition-all"
                >
                    Lihat Detail
                </button>
            </div>
        </div>
    );
}
