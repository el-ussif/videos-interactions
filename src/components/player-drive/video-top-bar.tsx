import {AnimatePresence, motion} from "framer-motion";
import {X} from "lucide-react";
import {useEffect, useRef, useState} from "react";
import useTokenStore from "@/store/token-store";
import {useRouter} from "next/navigation";

export default function VideoTopBar({ showToken }: { showToken: boolean }) {
    const { token } = useTokenStore();
    const router  = useRouter()

    const prevToken = useRef(token);
    const [highlight, setHighlight] = useState(false);

    useEffect(() => {
        if (token > prevToken.current) {
            setHighlight(true);
            setTimeout(() => setHighlight(false), 1000);
        }
        prevToken.current = token;
    }, [token]);

    return (
        <>
            <motion.button
                onClick={() => {
                    router.push('/')
                }}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.3 }}
                className="fixed top-4 left-4 text-white bg-[#DBE2EA]/40 h-[55px] w-[55px] rounded-full items-center justify-center flex z-50"
            >
                <X />
            </motion.button>

            <AnimatePresence>
                {showToken && (
                    <motion.button
                        key="token"
                        initial={{ opacity: 0, x: 100 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 100 }}
                        transition={{ duration: 0.3 }}
                        className={`
                            fixed w-[120px] z-[100] top-6 right-4
                            text-white bg-[#DBE2EA]/40 flex rounded-full
                            items-center justify-center 
                            ${highlight ? "animate-glow shadow-lg ring-2 ring-blue-200 ring-offset-2" : ""}
                        `}
                    >
                        <img className="h-[54px] w-[54px]" src="/images/globe-kin-gem.png" alt="" />
                        <span className="w-full font-bold text-xl -ml-3 justify-center">{token}</span>
                    </motion.button>
                )}
            </AnimatePresence>
        </>
    );
}
