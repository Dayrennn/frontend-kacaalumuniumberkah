import { X } from "lucide-react";

export default function ProjectModal({ active, setActive }) {
    return (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4" onClick={() => setActive(null)}>
            <div className="bg-white rounded-2xl overflow-hidden max-w-3xl w-full max-h-[90dvh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
                <div className="relative bg-black">
                    {active.videoUrl ? (
                        <video src={active.videoUrl} poster={active.thumbnailUrl} controls autoPlay playsInline className="w-full max-h-[70vh]" />
                    ) : (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={active.thumbnailUrl} alt={active.title} className="w-full max-h-[70vh] object-contain" />
                    )}
                    <button
                        onClick={() => setActive(null)}
                        className="absolute top-3 right-3 w-9 h-9 rounded-full bg-white/90 flex items-center justify-center hover:bg-white"
                        aria-label="Tutup"
                    >
                        <X className="w-5 h-5 text-gray-900" />
                    </button>
                </div>
                <div className="p-5">
                    <h4 className="font-bold text-gray-900 mb-1">{active.title}</h4>
                    <p className="text-gray-500 text-sm mb-2">{active.location}</p>
                    <p className="text-gray-600 text-sm leading-relaxed">{active.deskripsi}</p>
                </div>
            </div>
        </div>
    );
}
