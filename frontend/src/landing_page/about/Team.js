import React from "react";

function Team() {
    return (
        <div className="container">
            <div className="row mt-5 pt-4 border-top">
                <div className="col-12 text-center">
                    <h1 className="fw-bold">People</h1>
                </div>
            </div>

            <div
                className="row text-muted mt-4 align-items-center"
                style={{ lineHeight: "1.8", fontSize: "1.1rem" }}
            >
                {/* Image Column */}
                <div className="col-12 col-md-6 text-center mb-4 mb-md-0">
                    <img
                        src="media/images/nithinKamath.jpg"
                        alt="Nithin Kamath"
                        className="img-fluid rounded-circle"
                        style={{ maxWidth: "250px" }}
                    />
                    <h4 className="mt-4">Nithin Kamath</h4>
                    <h6 className="text-secondary">Founder, CEO</h6>
                </div>

                <div className="col-12 col-md-6 px-4">
                    <p>
                        Nithin bootstrapped and founded Finex in 2010 to overcome the
                        hurdles he faced during his decade-long stint as a trader. Today,
                        Finex has changed the landscape of the Indian broking industry.
                    </p>
                    <p>
                        He is a member of the SEBI Secondary Market Advisory Committee
                        (SMAC) and the Market Data Advisory Committee (MDAC).
                    </p>
                    <p>Playing basketball is his zen.</p>
                    <p>
                        Connect on{" "}
                        <a href="#" className="text-decoration-none text-primary">Homepage</a> /{" "}
                        <a href="#" className="text-decoration-none text-primary">TradingQnA</a> /{" "}
                        <a href="#" className="text-decoration-none text-primary">Twitter</a>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Team;