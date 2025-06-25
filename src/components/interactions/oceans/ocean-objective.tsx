export default function OceanObjective({ onComplete }: { onComplete?: () => void }) {
    if (onComplete) {

    }
    return (
        <div className="bg-transparent items-center text-black">
            <div className="w-full justify-center flex">
                <img src="/images/brands/logo.png" alt=""/>
            </div>
            <div className="w-full mt-8 justify-center flex">
                <img src="/images/oceans/diving-into-depths.png" alt=""/>
            </div>
        </div>
    );
}
