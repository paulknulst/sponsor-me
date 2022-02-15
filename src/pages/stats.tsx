import {IDonation} from "@libs/types";
import {NextPage} from "next";

const stats: NextPage<{ donations: IDonation[] }> = ({donations}) => {
    const getTotalDonation = (): String => {
        const total = donations.reduce((acc, donation) => acc + donation.amount, 0);
        return `${total}$`;
    };
    return (
        <div className="grid h-full gap-5 p-6 lg:px-24 md:grid-cols-2">
            <div className="textBlock-wrapper">
                <h1 className="textBlock-title">
                    <span className="font-bold text-cyan-400">Stats </span>to show
                </h1>
                <p className="textBlock-subtitle">Some nice Stats.</p>
            </div>
            <div className="flex flex-col justify-center space-y-3 ">
                <div
                    className="flex justify-between px-6 py-3 text-xl"
                    key="1"
                >
                    <h2>Total Donations</h2>
                    <span>{getTotalDonation()}</span>
                </div>
                <h2 className="text-4xl">{donations.length > 5 ? "Last 5 donations" : donations.length > 1 ? "Last " + donations.length + " donations" : "No Donations yet"} </h2>
                {
                    //todo add type
                    donations.map((d, i) => (
                        <div
                            className="flex justify-between px-6 py-3 text-xl"
                            key={i}
                        >
                            <span>{d.name}</span>
                            <span>{d.amount}$</span>
                        </div>
                    ))
                }
            </div>
        </div>
    );
};

export const getServerSideProps = async () => {
    const res = await fetch(`${process.env.API_BASE_ENDPOINT}/api/donations`);
    const data = await res.json();
    return {
        props: {
            donations: data,
        },
    };
};

export default stats;
