import "tailwindcss/tailwind.css";
import "@styles/globals.css";
import Navbar from "@components/Navbar";
import {AppProps} from "next/app";

function MyApp({Component, pageProps}: AppProps) {
    return (
        <div className="h-auto text-white bg-slate-700">
            <Navbar/>

            <div style={{height: "90vh"}}>
                <Component {...pageProps} />
            </div>
        </div>
    );
}

export default MyApp;
