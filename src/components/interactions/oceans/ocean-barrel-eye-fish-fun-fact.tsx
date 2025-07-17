import OceanFunFact from "@/components/interactions/oceans/ocean-fun-fact";

export default function OceanBarrelEyeFishFunFact() {
    return (
        <>
            <OceanFunFact
                image={"/images/oceans/barrel-eye-fish-2.png"}
                title={"Fun Fact!"}
                imageClassName={'w-[460px] p-5 h-[100%] scale-x-[-1]'}
                fishName={"Barreleye Fish"}
                description={"They have only been seen a handful of times"}
            />
        </>
    );
}
