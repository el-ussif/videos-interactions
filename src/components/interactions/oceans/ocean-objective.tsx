export default function OceanObjective({ onComplete }: { onComplete?: () => void }) {
    if (onComplete) {

    }
    return (
        <div className="bg-transparent items-center -mt-[1%] text-black">
            <div className="w-full justify-center flex">
                <img className="w-[300px] h-[100px]" src="/images/brands/logo.png" alt=""/>
            </div>
            <div className="w-full mt-8 justify-center flex">
                <img src="/images/oceans/diving-into-depths.png" className="w-[400px] hs-[100px]" alt=""/>
            </div>
        </div>
    );
}
