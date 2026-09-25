import { PlayCircle, X } from "lucide-react";

export default function ProjectCard({ projects, active, setActive, videoUrl, thumbnailUrl, title, location, deskripsi }) {
    return (
        <>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {projects.map((p) => (
                    <button
                        key={p.id}
                        onClick={() => setActive(p)}
                        className="group relative rounded-2xl overflow-hidden border border-gray-100 shadow-sm text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
                    >
                        <div className="aspect-[4/3] w-full bg-gray-100">
                            <img src={p.thumbnailUrl} alt={p.title} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" />
                        </div>

                        {/* Overlay play icon hanya muncul kalau project ini punya video */}
                        {p.videoUrl && (
                            <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/30 transition-colors">
                                <PlayCircle className="w-12 h-12 text-white drop-shadow" />
                            </div>
                        )}

                        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent px-4 pt-8 pb-3">
                            <p className="text-white text-sm font-semibold leading-tight">{p.title}</p>
                            <p className="text-white text-sm font-semibold leading-tight">{p.deskripsi}</p>
                            <p className="text-blue-100 text-xs">{p.location}</p>
                        </div>
                    </button>
                ))}
            </div>
        </>
    );
}
