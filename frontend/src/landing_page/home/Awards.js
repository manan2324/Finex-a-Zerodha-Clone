import React from "react";

function Awards() {
    return (
        <div className="container my-5">
            <div className="row align-items-center">
                <div className="col-12 col-md-6 p-4 p-md-5 text-center text-md-start">
                    <img
                        src="media/images/largestBroker.svg"
                        alt="Largest Broker"
                        className="img-fluid"
                    />
                </div>

                <div className="col-12 col-md-6 p-4 p-md-5 mt-4 mt-md-0">
                    <h2 className="fs-2 fs-md-1 text-center mb-2">Largest stock broker in India</h2>
                    <p className="mb-4">
                        2+ million Zerodha clients contribute to over 15% of all retail
                        order volumes in India daily by trading and investing in:
                    </p>

                    <div className="row">
                        <div className="col-6">
                            <ul className="list-unstyled small">
                                <li>Futures and Options</li>
                                <li>Commodity derivatives</li>
                                <li>Currency derivatives</li>
                            </ul>
                        </div>
                        <div className="col-6">
                            <ul className="list-unstyled small">
                                <li>Stocks & IPOs</li>
                                <li>Direct mutual funds</li>
                                <li>Bonds and Govt. Securities</li>
                            </ul>
                        </div>
                    </div>

                    <img
                        src="media/images/pressLogos.png"
                        alt="Press Logos"
                        className="img-fluid mt-4"
                    />
                </div>
            </div>
        </div>
    );
}

export default Awards;