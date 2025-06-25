export default function OceanObjective({ onComplete }: { onComplete?: () => void }) {
    return (
        <div className="bg-white text-black p-6 rounded shadow-lg text-center">
            <h2 className="text-xl font-bold mb-2">🌊 Objectif de la vidéo</h2>
            <p>{"Apprendre les bases de l'écosystème océanique."}</p>
            {onComplete && (
                <button
                    onClick={onComplete}
                    className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                    Continuer
                </button>
            )}
        </div>
    );
}
