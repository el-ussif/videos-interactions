import OceanObjective from "@/components/interactions/oceans/ocean-objective";
import OceanStarter from "@/components/interactions/oceans/ocean-starter";
import OceanExpert1 from "@/components/interactions/oceans/ocean-expert-1";
import OceanBarrelEyeFish from "@/components/interactions/oceans/ocean-barrel-eye-fish";
import OceanBarrelEyeFishFunFact from "@/components/interactions/oceans/ocean-barrel-eye-fish-fun-fact";
import OceanAnglerFish from "@/components/interactions/oceans/ocean-angler-fish";
import OceanAnglerFishFunFact from "@/components/interactions/oceans/ocean-angler-fish-fun-fact";
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

/*
{
                timecode: 0.1,
                previewDuration: 15.5,
                duration: Infinity,
                canGoNext: false,
                blocking: true,
                blockingBg: false,
                component: (props: InteractionComponentProps) => <OceanExpert1 {...props} />,
            },
 */

export const videos = [
    {
        defaultAudio: '/audios/ocean/bg-music.mp3',
        items: [
            {
                id: 0.5,
                src: "/videos/ocean/Frame01.mp4",
                interactions: [
                    {
                        timecode: 1,
                        duration: 7,
                        blocking: false,
                        component: (props: InteractionComponentProps) => <OceanObjective {...props} />,
                    },
                ],
            },
            {
                id: 2,
                src: "/videos/ocean/Frame02.mp4",
                interactions: [
                    {
                        timecode: 0,
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
                        timecode: 1,
                        previewDuration: 16.17800,
                        duration: Infinity,
                        canGoNext: true,
                        blocking: true,
                        blockingBg: false,
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
                        duration: 26,
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
                        timecode: 1,
                        duration: 28.5,
                        blocking: false,
                        component: () => <OceanBarrelEyeFishFunFact/>,
                    },
                ],
            },
            {
                id: 6,
                src: "/videos/ocean/Frame06.mp4",
                interactions: [
                    {
                        timecode: 1,
                        duration: 18.5,
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
                        duration: 27.5,
                        blocking: false,
                        blockingBg: false,
                        component: () => <OceanAnglerFishFunFact />,
                    },
                ],
            },
            {
                id: 8,
                src: "/videos/ocean/Frame08.mp4",
                interactions: [
                    {
                        timecode: 1,
                        duration: null,
                        blocking: true,
                        canGoNext: true,
                        loop: true,
                        audios: [
                            "/audios/ocean/frame-8-intro.wav",
                            "/audios/ocean/frame-8-question.wav",
                            "/audios/ocean/frame-8-correct-answer.wav",
                            "/audios/ocean/frame-8-incorrect-answer.wav",
                        ],
                        component: (props: InteractionComponentProps) => <KnowledgeCheckQuizAnglerFish {...props} />,
                    },
                ],
            },
            {
                id: 9,
                src: "/videos/ocean/Frame09.mp4",
                interactions: [
                    {
                        timecode: 1,
                        duration: 20.5,
                        blocking: false,
                        component: () => <OceanJapaneseSpiderCrab/>,
                    },
                ],
            },
            {
                id: 10,
                src: "/videos/ocean/Frame10.mp4",
                interactions: [
                    {
                        timecode: 1,
                        duration: 28.5,
                        blocking: false,
                        component: () => <OceanJapaneseSpiderFunFact/>,
                    },
                ],
            },
            {
                id: 11,
                src: "/videos/ocean/Frame11.mp4",
                interactions: [
                    {
                        timecode: 1,
                        duration: null,
                        blocking: true,
                        canGoNext: true,
                        loop: true,
                        audios: [
                            "/audios/ocean/frame-11-intro.wav",
                            "/audios/ocean/frame-11-question.wav",
                            "/audios/ocean/frame-11-correct-answer.wav",
                            "/audios/ocean/frame-11-incorrect-answer.wav",
                        ],
                        component: (props: InteractionComponentProps) => <KnowledgeCheckQuizJapaneseSpiderCrab {...props} />,
                    },
                ],
            },
            {
                id: 12,
                src: "/videos/ocean/Frame12.mp4",
                interactions: [
                    {
                        timecode: 1,
                        duration: null,
                        blocking: true,
                        canGoNext: true,
                        loop: true,
                        audios: [
                            "/audios/ocean/frame-12-intro.wav",
                            "/audios/ocean/frame-12-question.wav",
                            "/audios/ocean/frame-12-correct-answer.wav",
                            "/audios/ocean/frame-12-incorrect-answer.wav",
                        ],
                        component: (props: InteractionComponentProps) => <KnowledgeCheckFishesMatching {...props} />,
                    },
                ],
            },
            {
                id: 13,
                src: "/videos/ocean/Frame13.mp4",
                interactions: [

                    {
                        timecode: 1,
                        duration: null,
                        blocking: true,
                        canGoNext: true,
                        loop: true,
                        audios: [
                            "/audios/ocean/frame-13-intro.wav",
                            "/audios/ocean/frame-13-question.wav",
                            "/audios/ocean/frame-13-correct-answer.wav",
                            "/audios/ocean/frame-13-incorrect-answer.wav",
                        ],
                        component: (props: InteractionComponentProps) => <KnowledgeCheckBarrelEye {...props} />,
                    },
                ],
            },
            {
                id: 14,
                src: "/videos/ocean/Frame14.mp4",
                interactions: [
                    {
                        timecode: 1,
                        previewDuration: 17.20,
                        duration: null,
                        canGoNext: true,
                        blocking: true,
                        component: (props: InteractionComponentProps) => <OceanStopper {...props} />,
                    },
                ],
            },
            {
                id: 15,
                src: "/videos/ocean/Frame08.mp4",
                interactions: [
                    {
                        timecode: 1,
                        duration: 10,
                        blocking: true,
                        loop: true,
                        component: () => <PerformanceSummary/>,
                    },
                ],
            },
        ]
    }
];
