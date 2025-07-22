export default function VideoLoadingScreen({ loadingProgress }: { loadingProgress: number }) {
    return (
        <div className="fixed inset-0 bg-black z-50 flex items-center justify-center h-full flex-col gap-4">
            <div className="text-white text-lg">Loading...</div>
            <div className="w-64 h-2 bg-gray-700 rounded-full">
                <div
                    className="h-full bg-white rounded-full transition-all duration-300"
                    style={{ width: `${loadingProgress}%` }}
                />
            </div>
        </div>
    );
}
