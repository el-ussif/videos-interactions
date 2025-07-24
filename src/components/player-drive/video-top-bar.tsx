import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import useTokenStore from "@/store/token-store";

export default function VideoTopBar({ showToken }: { showToken: boolean }) {
    const { token } = useTokenStore();

    const prevToken = useRef(token);
    const [highlight, setHighlight] = useState(false);

    useEffect(() => {
        if (token > prevToken.current) {
            setHighlight(true);
            setTimeout(() => setHighlight(false), 1500);
        }
        prevToken.current = token;
    }, [token]);

    return (
        <>
            <motion.button
                onClick={() => alert("On closing app")}
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
                        className={`fixed min-w-[150px] z-[100] top-6 right-4 text-white bg-[#DBE2EA]/40 flex rounded-full items-center justify-center shadow-lg
                            ${highlight ? "ring-2 ring-[#add8ff] ring-offset-2 animate-glow" : ""}
                        `}
                    >
                        <img className="h-[54px] w-[54px]" src="/images/globe-kin-gem.png" alt="" />
                        <span className="w-full font-bold text-xl justify-center">{token}</span>
                    </motion.button>
                )}
            </AnimatePresence>
        </>
    );
}
