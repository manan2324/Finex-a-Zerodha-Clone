import React from "react";

function Hero() {
    const charges = [
        {
            image: "media/images/pricing0.svg",
            price: "₹0",
            title: "Free equity delivery",
            desc: "All equity delivery investments (NSE, BSE), are absolutely free — ₹0 brokerage.",
        },
        {
            image: "media/images/intradayTrades.svg",
            price: "₹20",
            title: "Intraday and F&O trades",
            desc: "Flat ₹20 or 0.03% (whichever is lower) per executed order on intraday trades across equity, currency, and commodity trades. Flat ₹20 on all option trades.",
        },
        {
            image: "media/images/pricing0.svg",
            price: "₹0",
            title: "Free direct MF",
            desc: "All direct mutual fund investments are absolutely free — ₹0 commissions & DP charges.",
        },
    ];

    return (
        <section className="container text-center my-5">
            <div className="py-5">
                <h2 className="fs-1">Charges</h2>
                <p className="fs-5 text-muted">List of all charges and taxes</p>
            </div>

            <div className="row mt-5">
                {charges.map((item, index) => (
                    <div className="col-12 col-md-4 mb-5 py-lg-5" key={index}>
                        <img src={item.image} alt={item.title} style={{ height: "200px" }} />
                        <h5 className="mt-3">{item.title}</h5>
                        <p className="text-muted px-3">{item.desc}</p>
                    </div>
                ))}
            </div>
        </section>
    );
}

export default Hero;