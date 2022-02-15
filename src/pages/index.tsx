import Head from 'next/head'
import {useEffect, useState} from "react";
import {loadStripe} from "@stripe/stripe-js";
import axios from "axios";
import {PayPalButton} from "react-paypal-button-v2";
import {useRouter} from "next/router";

export default function Home() {
    const [amount, setAmount] = useState<number | null>(5);
    const [scriptLoaded, setScriptLoaded] = useState(false);
    const { push } = useRouter();
    useEffect(() => {
        const addPaypalScript = () => {
            const script = document.createElement("script");
            script.type = "text/javascript";
            script.src = `https://www.paypal.com/sdk/js?client-id=Aa1lk8tr6oW76AYnzElGTZ6k1yPtOCXscF4ZVcGWr3o1ZKX-n-PLvPicvBgYXjL67dADvEhKsEqDzvT1`;
            script.async = true;
            script.onload = () => setScriptLoaded(true);
            document.body.appendChild(script);
        };
        addPaypalScript();
    }, []);

    const defaultAmounts = [1, 5, 10, 20];
    const createCheckOutSession = async () => {
        const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY!);
        const stripe = await stripePromise;
        const checkoutSession = await axios.post("/api/prepare-stripe-payment", {
            amount: amount,
        });

        const result = await stripe?.redirectToCheckout({
            sessionId: checkoutSession.data.id,
        });

        if (result?.error) {
            alert(result?.error.message);
        }
    };
    const addDonationInDB = async (name: string) => {
        try {
            const res = await fetch(
                `${process.env.NEXT_PUBLIC_API_BASE_ENDPOINT}/api/donations/`,
                {
                    method: "POST",
                    body: JSON.stringify({
                        name,
                        amount,
                    }),
                }
            );
            const data = await res.json();
            console.log(data);
        } catch (error) {
            console.log(error);
        }
    };
    const paypalBtnStyle = {
        color: 'gold',
        layout: 'horizontal',
        tagline: 'false',

    }

    return (
        <div className="flex h-auto flex-col items-center bg-slate-700 justify-center">
            <Head>
                <title>Sponsor Me</title>
                <link rel="icon" href="/favicon.ico"/>
            </Head>

            <main className="flex w-full flex-1 flex-col items-center justify-center px-20">
                <div className="relative flex w-screen flex-col-reverse items-center justify-evenly sm:flex-row sm:justify-evenly sm:pt-20">
                {/*<div className="relative flex min-h-screen w-screen flex-col-reverse items-center bg-darkBlue p-10 sm:flex-row sm:justify-evenly sm:p-20">*/}

                    <div
                        className="flex-none h-auto w-auto mb-10 z-0 before:absolute before:top-0 before:left-0 before:w-full before:h-full before:bg-slate-700">
                        <img src="/happy-dev-smaller.png" alt=""
                             className="relative z-0 inset-0 w-auto h-full object-cover"/>
                    </div>
                    <div className="w-96 flex-col items-center z-10 space-y-5 rounded-md bg-slate-900 p-10">
                        <div className="">
                            <h2 className="text-3xl text-cyan-400 font-bold">
                                Love my work? Feel free to support me with a donation!
                            </h2>
                            <p className="mt-10 text-gray-300">
                                Thanks in advance. Each donation of yours means a lot, however little it might be!
                            </p>
                        </div>
                        <div
                            className="group flex w-full items-center rounded-lg bg-gray-100/30 text-white focus:outline-none">
                            <p className="rounded-l-lg bg-gray-400 px-4 py-3 text-lg text-black">
                                USD
                            </p>
                            <input
                                type="number"
                                className="w-full rounded-lg bg-transparent px-4 py-3 text-gray-300  transition duration-200 focus:outline-none group-hover:opacity-100"
                                placeholder="Enter Amount"
                                value={amount ? amount : ""}
                                onChange={(e) => setAmount(parseInt(e.target.value))}
                            />
                        </div>
                        <div className="flex items-center space-x-2">
                            {defaultAmounts.map((buttonAmount) => (
                                <button
                                    className={`${
                                        amount === buttonAmount ? "bg-cyan-500 border-cyan-500" : "bg-gray-300"
                                            + " border-4 border-gray-300 hover:border-4 hover:border-cyan-500"
                                    } border-4 border-gray-300 rounded-full px-5 py-2 transition duration-200`}
                                    onClick={() => setAmount(buttonAmount)}
                                    key={buttonAmount}
                                >
                                    {buttonAmount}$
                                </button>
                            ))}
                        </div>
                        <button
                            onClick={createCheckOutSession}
                            className="w-full rounded-lg border-cyan-500 border-2 hover:border-2 bg-cyan-500 py-3 text-xl font-bold hover:bg-cyan-600 hover:border-cyan-600">
                            <span>Stripe</span>
                        </button>
                        {scriptLoaded ? (
                            <div className="w-full rounded-lg text-xl font-bold">
                                <PayPalButton
                                    amount={amount}
                                    onSuccess={(details, data) => {
                                        addDonationInDB(details.payer.name.given_name).then()
                                        push("/payment-successful").then()
                                    }}
                                    style={paypalBtnStyle}
                                />
                            </div>
                        ) : (
                            <span>Loading...</span>
                        )}{" "}
                    </div>
                </div>
            </main>
        </div>
    )
}


