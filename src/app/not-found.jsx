import Link from "next/link";

export default function NotFound() {
    return (
        <main className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 px-6">
            <div className="max-w-lg text-center">
                <div className="mb-8 flex justify-center">
                    <div className="flex h-24 w-24 items-center justify-center rounded-full bg-blue-600/10 ring-1 ring-blue-500/20">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-12 w-12 text-blue-500"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={1.8}
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M9.75 17L3 10.25l6.75-6.75M14.25 7L21 13.75 14.25 20.5"
                            />
                        </svg>
                    </div>
                </div>

                <span className="rounded-full border border-blue-500/20 bg-blue-500/10 px-4 py-1 text-sm font-medium text-blue-400">
                    Feature Preview
                </span>

                <h1 className="mt-6 text-4xl font-bold tracking-tight text-white">Sedang Dalam Pengembangan</h1>

                <p className="mt-4 text-slate-400 leading-7">
                    Fitur ini masih dalam proses pengembangan. Kami sedang mempersiapkan pengalaman terbaik agar dapat
                    segera digunakan.
                </p>

                <div className="mt-10 flex justify-center gap-4">
                    <Link
                        href="/"
                        className="rounded-xl bg-blue-600 px-5 py-3 text-sm font-medium text-white transition hover:bg-blue-700"
                    >
                        Home
                    </Link>
                </div>
            </div>
        </main>
    );
}