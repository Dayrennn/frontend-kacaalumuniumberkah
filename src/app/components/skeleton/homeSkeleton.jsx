export default function HomeSkeleton() {
    return (
        <div className="bg-white text-gray-800 antialiased animate-pulse">
            {/* Navbar skeleton */}
            <header className="fixed top-0 left-0 right-0 z-50 border-b border-gray-100 shadow-sm bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        <div className="h-6 w-48 bg-gray-200 rounded-lg" />
                        <div className="hidden md:flex items-center gap-7">
                            {[1, 2, 3, 4, 5].map((i) => (
                                <div key={i} className="h-4 w-14 bg-gray-200 rounded" />
                            ))}
                        </div>
                        <div className="h-9 w-24 bg-gray-200 rounded-lg" />
                    </div>
                </div>
            </header>

            {/* Hero skeleton */}
            <section className="relative min-h-screen flex items-center overflow-hidden pt-16 bg-gray-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 w-full">
                    <div className="max-w-xl space-y-5">
                        <div className="h-12 w-4/5 bg-gray-300 rounded-lg" />
                        <div className="h-12 w-2/3 bg-gray-300 rounded-lg" />
                        <div className="space-y-2 pt-2">
                            <div className="h-4 w-full bg-gray-200 rounded" />
                            <div className="h-4 w-full bg-gray-200 rounded" />
                            <div className="h-4 w-3/4 bg-gray-200 rounded" />
                        </div>
                        <div className="flex gap-4 pt-4">
                            <div className="h-12 w-40 bg-gray-300 rounded-xl" />
                            <div className="h-12 w-40 bg-gray-300 rounded-xl" />
                        </div>
                    </div>
                </div>
            </section>

            {/* About skeleton */}
            <section className="py-24 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-14 space-y-3">
                        <div className="h-4 w-24 bg-gray-200 rounded mx-auto" />
                        <div className="h-8 w-64 bg-gray-200 rounded mx-auto" />
                        <div className="h-4 w-96 max-w-full bg-gray-200 rounded mx-auto" />
                    </div>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 space-y-4">
                                <div className="w-12 h-12 bg-gray-200 rounded-xl" />
                                <div className="h-5 w-2/3 bg-gray-200 rounded" />
                                <div className="h-4 w-full bg-gray-200 rounded" />
                                <div className="h-4 w-4/5 bg-gray-200 rounded" />
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Products skeleton */}
            <section className="py-24 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-14 space-y-3">
                        <div className="h-4 w-24 bg-gray-200 rounded mx-auto" />
                        <div className="h-8 w-64 bg-gray-200 rounded mx-auto" />
                    </div>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {[1, 2, 3, 4].map((i) => (
                            <div key={i} className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                                <div className="h-40 bg-gray-200" />
                                <div className="p-4 space-y-2">
                                    <div className="h-4 w-3/4 bg-gray-200 rounded" />
                                    <div className="h-4 w-1/2 bg-gray-200 rounded" />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Benefit skeleton */}
            <section className="py-24 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-14 space-y-3">
                        <div className="h-4 w-24 bg-gray-200 rounded mx-auto" />
                        <div className="h-8 w-64 bg-gray-200 rounded mx-auto" />
                    </div>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {[1, 2, 3, 4].map((i) => (
                            <div key={i} className="text-center space-y-3">
                                <div className="w-14 h-14 bg-gray-200 rounded-2xl mx-auto" />
                                <div className="h-4 w-24 bg-gray-200 rounded mx-auto" />
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Address skeleton */}
            <section className="py-24 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-14 space-y-3">
                        <div className="h-4 w-24 bg-gray-200 rounded mx-auto" />
                        <div className="h-8 w-64 bg-gray-200 rounded mx-auto" />
                    </div>
                    <div className="grid lg:grid-cols-2 gap-8">
                        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8 space-y-6">
                            {[1, 2, 3, 4].map((i) => (
                                <div key={i} className="flex items-start gap-4">
                                    <div className="w-10 h-10 bg-gray-200 rounded-xl flex-shrink-0" />
                                    <div className="flex-1 space-y-2">
                                        <div className="h-4 w-24 bg-gray-200 rounded" />
                                        <div className="h-4 w-3/4 bg-gray-200 rounded" />
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="bg-gray-200 rounded-2xl" style={{ minHeight: 400 }} />
                    </div>
                </div>
            </section>

            {/* CTA banner skeleton */}
            <section className="py-20">
                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="bg-gray-200 rounded-3xl py-16 px-8 text-center space-y-4">
                        <div className="h-8 w-2/3 bg-gray-300 rounded mx-auto" />
                        <div className="h-4 w-1/2 bg-gray-300 rounded mx-auto" />
                        <div className="h-12 w-48 bg-gray-300 rounded-xl mx-auto mt-6" />
                    </div>
                </div>
            </section>

            {/* Footer skeleton */}
            <footer className="bg-gray-900">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10 py-14 border-b border-gray-800">
                        <div className="space-y-4">
                            <div className="h-6 w-40 bg-gray-700 rounded" />
                            <div className="h-4 w-full bg-gray-700 rounded" />
                            <div className="h-4 w-4/5 bg-gray-700 rounded" />
                        </div>
                        {[1, 2, 3].map((col) => (
                            <div key={col} className="space-y-4">
                                <div className="h-4 w-24 bg-gray-700 rounded" />
                                {[1, 2, 3, 4].map((i) => (
                                    <div key={i} className="h-3 w-32 bg-gray-800 rounded" />
                                ))}
                            </div>
                        ))}
                    </div>
                    <div className="py-6">
                        <div className="h-3 w-64 bg-gray-800 rounded" />
                    </div>
                </div>
            </footer>
        </div>
    );
}