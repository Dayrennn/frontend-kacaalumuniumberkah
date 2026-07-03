import Link from "next/link";
import { usePathname } from "next/navigation";

export default function SidebarSubLink({ href, icon: IconComp, children }) {
    const pathname = usePathname();
    const active = pathname === href || pathname.startsWith(href + '/');

    return (
        <Link
            href={href}
            className={`flex items-center gap-2.5 px-3 py-2 rounded-xl text-sm font-medium transition-all ${
                active ? 'bg-blue-50 text-blue-700' : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'
            }`}
        >
            <IconComp className="w-4 h-4 shrink-0" />
            {children}
        </Link>
    );
}