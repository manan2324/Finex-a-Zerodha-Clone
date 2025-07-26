import React from "react";

function Brokerage() {
    return (
        <div className="container">
            <div className="row px-3 py-5 mt-5 border-top">
                <div className="col-12 col-md-8 mb-4 mb-md-0 text-center text-md-start">
                    <a href="#" className="text-decoration-none">
                        <h3 className="fs-5 text-primary">Brokerage calculator</h3>
                    </a>
                    <ul className="text-muted ps-3" style={{ lineHeight: "1.8", fontSize: "0.95rem" }}>
                        <li>
                            Call & Trade and RMS auto-squareoff: Additional charges of ₹50 +
                            GST per order.
                        </li>
                        <li>Digital contract notes will be sent via e-mail.</li>
                        <li>
                            Physical copies of contract notes, if required, shall be charged
                            ₹20 per contract note. Courier charges apply.
                        </li>
                        <li>
                            For NRI account (non-PIS), 0.5% or ₹100 per executed order for
                            equity (whichever is lower).
                        </li>
                        <li>
                            For NRI account (PIS), 0.5% or ₹200 per executed order for equity
                            (whichever is lower).
                        </li>
                        <li>
                            If the account is in debit balance, any order placed will be
                            charged ₹40 per executed order instead of ₹20 per executed order.
                        </li>
                    </ul>
                </div>

                <div className="col-12 col-md-4 text-center text-md-start">
                    <a href="#" className="text-decoration-none">
                        <h3 className="fs-5 text-primary">List of charges</h3>
                    </a>
                </div>
            </div>
        </div>
    );
}

export default Brokerage;