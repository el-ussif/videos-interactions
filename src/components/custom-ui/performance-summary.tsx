import {Button} from "@/components/ui/button";

export default function PerformanceSummary() {
    return (
        <>
            <div className="items-center w-full max-w-[1140px]  flex justify-center text-black">
                <div
                    className="bg-white/30 border min-w-[1140px] border-white/50 shadow-xl backdrop-blur-lg border-white/50 border rounded-3xl xl py-8 px-[90px] text-white text-center shadow-3xl">
                    <div>
                        <div className="w-full flex items-center">
                            <div className="w-[125px] h-[80px]">
                                <img className="w-full" src="/images/oceans/diving-into-depths-2.png" alt=""/>
                            </div>
                            <div className="w-full text-center">
                                <h3 className="uppercase font-bold text-4xl">
                                    Performance Summary
                                </h3>
                            </div>
                        </div>

                        <div className="grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-10">
                            <div className="bg-green-1 flex flex flex-wrap gap-2 p-4 rounded-2xl">
                                <div className="flex items-center space-x-3 w-full">
                                    <svg width="40" height="40" viewBox="0 0 40 40" fill="none"
                                         xmlns="http://www.w3.org/2000/svg">
                                        <rect width="40" height="40" rx="20" fill="#101010" fillOpacity="0.8"/>
                                        <path fillRule="evenodd" clipRule="evenodd"
                                              d="M27.9789 14.0077C28.4119 14.3866 28.4558 15.0447 28.0769 15.4776L18.9623 25.8943C18.5849 26.3256 17.9299 26.371 17.4966 25.9959L12.0278 21.261C11.5929 20.8844 11.5456 20.2266 11.9221 19.7917C12.2987 19.3567 12.9566 19.3094 13.3915 19.686L18.0768 23.7426L26.5091 14.1057C26.8879 13.6728 27.546 13.6289 27.9789 14.0077Z"
                                              fill="white" stroke="white" strokeWidth="2" strokeLinecap="round"
                                              strokeLinejoin="round"/>
                                    </svg>
                                    <span className="font-semibold text-center w-9/12">
                                        Knowledge Check Score
                                    </span>
                                </div>
                                <div className="font-bold mt-4 py-8 text-8xl w-full">
                                85%
                                </div>
                            </div>

                            <div className="bg-blue-1 flex flex flex-wrap gap-2 p-4 rounded-2xl">
                                <div className="flex items-center space-x-3 w-full">
                                    <svg width="40" height="40" viewBox="0 0 40 40" fill="none"
                                         xmlns="http://www.w3.org/2000/svg">
                                        <rect width="40" height="40" rx="20" fill="#101010" fillOpacity="0.8"/>
                                        <path fillRule="evenodd" clipRule="evenodd"
                                              d="M20 10C17.2389 10 14.7375 11.1204 12.9289 12.9289C11.1204 14.7375 10 17.2389 10 20C10 22.7611 11.1204 25.2625 12.9289 27.0711C14.7375 28.8796 17.2389 30 20 30C22.7611 30 25.2625 28.8796 27.0711 27.0711C28.8796 25.2625 30 22.7611 30 20C30 17.2389 28.8796 14.7375 27.0711 12.9289C25.2625 11.1204 22.7611 10 20 10ZM20 15C20.5523 15 21 15.4477 21 16V19.5858L22.7071 21.2929C23.0976 21.6834 23.0976 22.3166 22.7071 22.7071C22.3166 23.0976 21.6834 23.0976 21.2929 22.7071L19.2929 20.7071C19.1054 20.5196 19 20.2652 19 20V16C19 15.4477 19.4477 15 20 15Z"
                                              fill="white"/>
                                    </svg>
                                    <span className="font-semibold text-center w-9/12">
                                        Total Time
                                    </span>
                                </div>
                                <div className="font-bold text-left mt-4 py-8 text-7xl w-full">
                                    1hr  30min
                                </div>
                            </div>

                            <div className="bg-blue-2 flex flex flex-wrap gap-2 p-4 rounded-2xl">
                                <div className="flex items-center space-x-3 w-full">
                                    <svg width="40" height="40" viewBox="0 0 40 40" fill="none"
                                         xmlns="http://www.w3.org/2000/svg">
                                        <rect width="40" height="40" rx="20" fill="#101010" fillOpacity="0.8"/>
                                        <g clipPath="url(#clip0_4950_49565)">
                                            <path
                                                d="M19.4248 13.9551C17.5216 17.338 15.6346 20.6968 13.7355 24.0757H24.9609C23.1142 20.6968 21.2836 17.3582 19.4248 13.9551Z"
                                                fill="white"/>
                                            <path
                                                d="M18.245 13.6329C15.4305 14.141 12.6161 14.6531 9.75731 15.1692C10.7734 17.8747 11.7814 20.5561 12.8137 23.3141C14.6564 20.0723 16.4668 16.8869 18.2812 13.6975L18.245 13.6289V13.6329Z"
                                                fill="white"/>
                                            <path
                                                d="M20.5519 13.5957C22.2898 16.7448 24.0034 19.8536 25.7413 23.0107C26.9308 20.3737 28.1001 17.7811 29.2734 15.1723C26.3421 14.6441 23.4752 14.1279 20.5479 13.5997L20.5519 13.5957Z"
                                                fill="white"/>
                                            <path
                                                d="M19.297 31.5112C21.0994 29.4225 22.8695 27.3661 24.6719 25.2734H13.9867C15.7528 27.346 17.5068 29.4064 19.297 31.5112Z"
                                                fill="white"/>
                                            <path
                                                d="M29.8926 16.6523C28.7475 19.1724 27.6024 21.6965 26.4411 24.2449C27.6145 24.8053 28.7636 25.3577 29.9531 25.9263V16.6765C29.933 16.6685 29.9128 16.6604 29.8926 16.6523Z"
                                                fill="white"/>
                                            <path
                                                d="M27.9141 13.6606C25.3133 12.1284 22.7086 10.5962 20.0796 9.04785V12.3381C22.6965 12.8098 25.3012 13.2776 27.902 13.7453C27.906 13.7171 27.91 13.6929 27.9141 13.6647V13.6606Z"
                                                fill="white"/>
                                            <path
                                                d="M18.8319 12.33V9.08008C16.3642 10.6002 13.9329 12.0961 11.5015 13.5961C11.5095 13.6122 11.5176 13.6324 11.5257 13.6485C13.953 13.209 16.3844 12.7735 18.8359 12.33H18.8319Z"
                                                fill="white"/>
                                            <path
                                                d="M9.47651 26.132C10.3112 25.5837 11.1337 25.0434 11.9805 24.4829C11.1579 22.2975 10.3354 20.1161 9.51683 17.9307H9.47651V26.132Z"
                                                fill="white"/>
                                            <path
                                                d="M26.0499 25.4308C24.7072 27.0195 23.3564 28.6162 22.0056 30.2129C22.0177 30.2331 22.0298 30.2492 22.0419 30.2694C24.3402 29.1121 26.6426 27.9589 28.957 26.7937C28.6022 26.5477 26.4047 25.5155 26.0539 25.4268L26.0499 25.4308Z"
                                                fill="white"/>
                                            <path
                                                d="M12.6186 25.4463C11.8646 25.9584 11.1267 26.4584 10.3444 26.9946C12.4774 28.1156 14.5701 29.2163 16.6668 30.3131C16.6789 30.297 16.691 30.2849 16.7031 30.2687C15.3443 28.6639 13.9855 27.0632 12.6186 25.4463Z"
                                                fill="white"/>
                                        </g>
                                        <defs>
                                            <clipPath id="clip0_4950_49565">
                                                <rect width="20.4752" height="22.4631" fill="white"
                                                      transform="matrix(-1 0 0 1 29.9531 9.04785)"/>
                                            </clipPath>
                                        </defs>
                                    </svg>
                                    <span className="font-semibold text-center w-9/12">
                                        Tokens Earned
                                    </span>
                                </div>
                                <div className="font-bold mt-4 py-8 text-8xl w-full">
                                    40
                                </div>
                                <div className="font-semibold mt-1 w-full">
                                    out of 50 tokens
                                </div>
                            </div>

                        </div>

                        <div className="bg-dark-1 mt-10 items-center rounded-3xl w-full flex justify-between">
                            <div className="px-10 text-left font-semibold text-2xl">
                                Download a hands-on <br/>
                                activity for bonus tokens
                            </div>
                            <div className="w-[350px]">
                                <img className="rounded-3xl" src="/images/oceans/ocean-performance-summary-download.png" alt=""/>
                            </div>
                        </div>

                        <div className="">
                            <Button className="w-[444px] py-7 mt-16 rounded-xl">
                                Exit
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
