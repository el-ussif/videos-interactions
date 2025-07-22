import Link from "next/link";

export default function Tests() {
    return (
        <div className="">
            <main className="p-10">
                <div className="grid grid-cols-5">
                    <div className="w-[60%]">
                        <Link href="/diving">
                            <img src="/images/oceans/cover-image.png" className="rounded-2xl" alt=""/>
                        </Link>
                    </div>
                </div>
            </main>
        </div>
    );
}
