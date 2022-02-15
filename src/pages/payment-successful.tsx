const PaymentSuccessful = () => {
    return (
        <main className="flex-auto w-full flex-1 flex-col items-center justify-center bg-slate-900">
            <div className="flex flex-wrap h-screen w-screen items-center justify-evenly p-10">
                <div className="flex-none h-auto w-auto items-center justify-center">
                    <h1 className="text-3xl font-bold text-cyan-300">
                        Thank you for sponsoring me 💙
                    </h1>
                <a className="flex justify-center items-center h-auto  my-10 px-5 rounded-lg border-cyan-500 border-2 hover:border-2 bg-cyan-500 py-3 text-xl font-bold hover:bg-slate-900 hover:text-cyan-300"
                   href={'/'}>Go Back</a>
                </div>
            </div>
        </main>
    );
};

export default PaymentSuccessful;
