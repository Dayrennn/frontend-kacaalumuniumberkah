import { ChevronRight } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

export default function SidebarGroup({ icon: IconComp, label, basePath, children }) {
    const pathname = usePathname();
    const childActive = basePath ? pathname.startsWith(basePath) : false;

    const [open, setOpen] = useState(childActive);

    return (
        <div>
            <button
                type="button"
                onClick={() => setOpen((prev) => !prev)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                    childActive ? 'text-blue-700' : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'
                }`}
            >
                <IconComp className="w-[18px] h-[18px] shrink-0" />
                <span className="flex-1 text-left">{label}</span>
                <ChevronRight className={`w-4 h-4 shrink-0 transition-transform ${open ? 'rotate-90' : ''}`} />
            </button>

            <div
                className={`grid transition-all duration-200 ${open ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}
            >
                <div className="overflow-hidden">
                    <div className="ml-4 mt-1 pl-4 border-l border-gray-100 space-y-1">{children}</div>
                </div>
            </div>
        </div>
    );
}
