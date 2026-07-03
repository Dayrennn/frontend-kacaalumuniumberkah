import Link from "next/link";
import { usePathname } from "next/navigation";

export default function SidebarLink({ href, icon: IconComp, children }) {
    const pathname = usePathname();
    const active = pathname === href || pathname.startsWith(href + '/');

    return (
        <Link
            href={href}
            className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                active ? 'bg-blue-50 text-blue-700' : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'
            }`}
        >
            <IconComp className="w-[18px] h-[18px] shrink-0" />
            {children}
        </Link>
    );
}