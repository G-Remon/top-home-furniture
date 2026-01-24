// components/products/ProductSkeleton.tsx

export default function ProductSkeleton() {
    return (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden flex flex-col h-full animate-pulse">
            <div className="aspect-[4/5] bg-gray-200" />
            <div className="p-5 flex flex-col flex-grow space-y-4">
                <div className="flex justify-between">
                    <div className="h-4 bg-gray-200 rounded w-1/4" />
                    <div className="h-4 bg-gray-200 rounded w-1/8" />
                </div>
                <div className="h-6 bg-gray-200 rounded w-3/4" />
                <div className="space-y-2">
                    <div className="h-3 bg-gray-200 rounded w-full" />
                    <div className="h-3 bg-gray-200 rounded w-5/6" />
                </div>
                <div className="mt-auto h-10 bg-gray-200 rounded-xl w-full" />
            </div>
        </div>
    );
}
