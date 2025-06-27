import OceanObjective from "@/components/interactions/oceans/ocean-objective";
import OceanStarter from "@/components/interactions/oceans/ocean-starter";
import OceanExpert1 from "@/components/interactions/oceans/ocean-expert-1";
import OceanBarrelEyeFish from "@/components/interactions/oceans/ocean-barrel-eye-fish";
import OceanBarrelEyeFishSwim from "@/components/interactions/oceans/ocean-barrel-eye-fish-swim";
import OceanAnglerFish from "@/components/interactions/oceans/ocean-angler-fish";
import OceanAnglerFishSwim from "@/components/interactions/oceans/ocean-angler-fish-swim";
import KnowledgeCheckQuizAnglerFish from "@/components/interactions/oceans/knowledge-check-quiz-angler-fish";
import OceanJapaneseSpiderCrab from "@/components/interactions/oceans/ocean-japanese-spider-crab";
import OceanJapaneseSpiderFunFact from "@/components/interactions/oceans/ocean-japanese-spider-fun-fact";
import KnowledgeCheckQuizJapaneseSpiderCrab
    from "@/components/interactions/oceans/knowledge-check-quiz-japanese-spider-crab";
import KnowledgeCheckBarrelEye from "@/components/interactions/oceans/knowledge-check-barrel-eye";
import OceanStopper from "@/components/interactions/oceans/ocean-stopper";
import PerformanceSummary from "@/components/custom-ui/performance-summary";
import KnowledgeCheckFishesMatching from "@/components/interactions/oceans/knowledge-check-fishes-matching";

export type InteractionComponentProps = {
    onComplete?: VoidFunction;
};

export const videos = [
    {
        id: 1,
        src: "/videos/ocean/Frame01.mp4",
        interactions: [
            {
                timecode: 1,
                duration: 5,
                blocking: false,
                component: (props: InteractionComponentProps) => <OceanObjective {...props} />,
            },/*
            {
        id: 3,
        src: "/videos/ocean/Frame03.mp4",
        interactions: [
            {
                timecode: 1,
                duration: 7,
                previewDuration: 5,
                blocking: true,
                component: (props: InteractionComponentProps) => <OceanExpert1 {...props} />,
            },
        ],
    },
            {
                timecode: 10,
                duration: 5,
                blocking: false,
                component: (props: InteractionComponentProps) => <OceanObjective {...props} />,
            },*/
        ],
    },
    {
        id: 2,
        src: "/videos/ocean/Frame02.mp4",
        interactions: [
            {
                timecode: 0.1,
                duration: Infinity,
                blocking: true,
                loop: true,
                canGoNext: true,
                component: (props: InteractionComponentProps) => <OceanStarter {...props} />,
            },
        ],
    },
    {
        id: 3,
        src: "/videos/ocean/Frame03.mp4",
        interactions: [
            {
                timecode: 3,
                duration: 5,
                blocking: true,
                component: (props: InteractionComponentProps) => <OceanExpert1 {...props} />,
            },
        ],
    },
    {
        id: 4,
        src: "/videos/ocean/Frame04.mp4",
        interactions: [
            {
                timecode: 1,
                duration: 10,
                blocking: false,
                component: () => <OceanBarrelEyeFish />,
            },
        ],
    },
    {
        id: 5,
        src: "/videos/ocean/Frame05.mp4",
        interactions: [
            {
                timecode: 3,
                duration: 10,
                blocking: false,
                component: () => <OceanBarrelEyeFishSwim/>,
            },
        ],
    },
    {
        id: 6,
        src: "/videos/ocean/Frame06.mp4",
        interactions: [
            {
                timecode: 1,
                duration: 10,
                blocking: false,
                component: () => <OceanAnglerFish/>,
            },
        ],
    },
    {
        id: 7,
        src: "/videos/ocean/Frame07.mp4",
        interactions: [
            {
                timecode: 1,
                duration: 10,
                blocking: false,
                component: () => <OceanAnglerFishSwim />,
            },
            {
                timecode: 20,
                duration: null,
                blocking: true,
                component: (props: InteractionComponentProps) => <KnowledgeCheckQuizAnglerFish {...props} />,
            },
        ],
    },
    {
        id: 8,
        src: "/videos/ocean/Frame08.mp4",
        interactions: [
            {
                timecode: 2,
                duration: 10,
                blocking: false,
                component: () => <OceanJapaneseSpiderCrab/>,
            },
        ],
    },
    {
        id: 9,
        src: "/videos/ocean/Frame09.mp4",
        interactions: [
            {
                timecode: 2,
                duration: 10,
                blocking: false,
                component: () => <OceanJapaneseSpiderFunFact/>,
            },
            {
                timecode: 18,
                duration: null,
                blocking: true,
                component: (props: InteractionComponentProps) => <KnowledgeCheckQuizJapaneseSpiderCrab {...props} />,
            },
        ],
    },
    {
        id: 10,
        src: "/videos/ocean/Frame10.mp4",
        interactions: [
            {
                timecode: 5,
                duration: false,
                blocking: true,
                component: (props: InteractionComponentProps) => <KnowledgeCheckFishesMatching {...props} />,
            },
            {
                timecode: 15,
                duration: null,
                blocking: true,
                component: (props: InteractionComponentProps) => <KnowledgeCheckBarrelEye {...props} />,
            },
        ],
    },
    {
        id: 11,
        src: "/videos/ocean/Frame14.mp4",
        interactions: [
            {
                timecode: 1,
                duration: 5,
                blocking: true,
                component: (props: InteractionComponentProps) => <OceanStopper {...props} />,
            },
        ],
    },
    {
        id: 12,
        src: "/videos/ocean/Frame08.mp4",
        interactions: [
            {
                timecode: 1,
                duration: 10,
                blocking: true,
                component: () => <PerformanceSummary/>,
            },
        ],
    },

    /*
    {
        id: 8,
        src: "/videos/ocean/Frame08.mp4",
        interactions: [
            {
                timecode: 1,
                duration: 10,
                blocking: false,
                component: (props: InteractionComponentProps) => <OceanObjective {...props} />,
            },
        ],
    },*/
];
