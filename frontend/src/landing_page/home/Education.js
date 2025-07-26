import React from "react";

function Education() {
    return (
        <div className="container my-5">
            <div className="row align-items-center">
                <div className="col-12 col-md-6 mb-4 mb-md-0 text-center text-md-start">
                    <img
                        src="media/images/education.svg"
                        alt="Education Illustration"
                        className="img-fluid"
                        style={{ maxWidth: "70%" }}
                    />
                </div>

                <div className="col-12 col-md-6">
                    <h2 className="mb-3 fs-2 education-heading">Free and open market education</h2>
                    <p>
                        Varsity, the largest online stock market education book in the world,
                        covering everything from the basics to advanced trading.
                    </p>
                    <a href="#" className="text-decoration-none text-primary fw-semibold">
                        Varsity <i className="fa fa-long-arrow-right" aria-hidden="true"></i>
                    </a>

                    <p className="mt-4">
                        TradingQ&A, the most active trading and investment community in
                        India for all your market-related queries.
                    </p>
                    <a href="#" className="text-decoration-none text-primary fw-semibold">
                        TradingQ&A <i className="fa fa-long-arrow-right" aria-hidden="true"></i>
                    </a>
                </div>
            </div>
        </div>
    );
}

export default Education;