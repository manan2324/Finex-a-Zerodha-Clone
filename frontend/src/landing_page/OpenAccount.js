import React from "react";
import { Link } from "react-router-dom";

function OpenAccount() {
    return (
        <div className="container py-5 mb-5">
            <div className="row justify-content-center text-center">
                <div className="col-12 col-md-8">
                    <h2 className="fs-2 mt-4 mb-3 account-heading">Open a Finex account</h2>
                    <p className="text-muted mb-4">
                        Modern platforms and apps, ₹0 investments, and flat ₹20 intraday and
                        F&O trades.
                    </p>

                    <Link
                        to="https://finex-dashboard.vercel.app/login"
                        target="_blank"
                        className="btn btn-primary btn-lg px-4"
                        style={{ maxWidth: "220px" }}
                    >
                        Sign up Now
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default OpenAccount;