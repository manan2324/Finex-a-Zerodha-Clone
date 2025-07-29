import React from "react";

function Pricing() {
    return (
        <div className="container py-5">
            <div className="row gy-4 align-items-center">
                <div className="col-12 col-md-6 col-lg-4 left-pricing">
                    <h1 className="mb-3 fs-2">Unbeatable pricing</h1>
                    <p>
                        We pioneered the concept of discount broking and price transparency
                        in India. Flat fees and no hidden charges.
                    </p>
                    <a href="/pricing" className="text-decoration-none text-primary fw-semibold">
                        See Pricing{" "}
                        <i className="fa fa-long-arrow-right" aria-hidden="true"></i>
                    </a>
                </div>

                <div className="d-none d-lg-block col-lg-2"></div>

                <div className="col-12 col-md-6 col-lg-6">
                    <div className="row g-3">
                        <div className="col-12 col-sm-6">
                            <div className="border p-4 text-center h-100">
                                <h1 className="mb-3">₹0</h1>
                                <p className="mb-0">
                                    Free equity delivery and <br />
                                    direct mutual funds
                                </p>
                            </div>
                        </div>
                        <div className="col-12 col-sm-6">
                            <div className="border p-4 text-center h-100">
                                <h1 className="mb-3">₹20</h1>
                                <p className="mb-0">Intraday and F&amp;O</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Pricing;