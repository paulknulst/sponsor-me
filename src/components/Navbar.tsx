import Link from "next/link";
import {useRouter} from "next/router";

const Navbar = () => {
    const {pathname} = useRouter();
    console.log(pathname)
    return (
        <div
            className="flex items-center justify-between px-3 lg:px-20 z-10"
            style={{height: "10vh"}}
        >
            <a>
                <Link href="/">
                    <div className="flex items-center space-x-4 cursor-pointer z-10 ">
                        <div className=" md:block  z-10 ">
                            <span className={pathname === "/" ? "font-bold text-cyan-400" : "font-bold text-yellow-400 hover:text-cyan-400"}>Paul Knulst</span>
                            <p>Father,Husband & Software Engineer</p>
                        </div>
                    </div>
                </Link>
            </a>

            <div className="flex space-x-6 text-base lg:text-xl z-10 ">
                <Link href="/about">
                    <a className={pathname === "/about" ? "text-cyan-400" : "hover:text-cyan-400 text-yellow-400"}>ABOUT</a>
                </Link>
                {/*<Link href="/stats">*/}
                {/*    <a className={pathname === "/stats" ? "text-cyan-400" : "hover:text-cyan-400 text-yellow-400"}>STATS</a>*/}
                {/*</Link>*/}
            </div>
        </div>
    );
};

export default Navbar;
