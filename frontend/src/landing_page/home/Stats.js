import React from "react";

function Stats() {
    return (
        <div className="container py-4">
            <div className="row align-items-center">
                <div className="col-12 col-md-6 px-4 px-md-5 mb-4 mb-md-0">
                    <h1 className="fs-2 mb-4">Trust with confidence</h1>

                    <div className="mb-4">
                        <h2 className="fs-5 fw-semibold">Customer-first always</h2>
                        <p className="text-muted small">
                            That's why 1.3+ crore customers trust Zerodha with ₹3.5+ lakh crores
                            worth of equity investments.
                        </p>
                    </div>

                    <div className="mb-4">
                        <h2 className="fs-5 fw-semibold">No spam or gimmicks</h2>
                        <p className="text-muted small">
                            No gimmicks, spam, "gamification", or annoying push notifications.
                            High quality apps that you use at your pace, the way you like.
                        </p>
                    </div>

                    <div className="mb-4">
                        <h2 className="fs-5 fw-semibold">The Zerodha universe</h2>
                        <p className="text-muted small">
                            Not just an app, but a whole ecosystem. Our investments in 30+
                            fintech startups offer you tailored services specific to your needs.
                        </p>
                    </div>

                    <div className="mb-3">
                        <h2 className="fs-5 fw-semibold">Do better with money</h2>
                        <p className="text-muted small">
                            With initiatives like Nudge and Kill Switch, we don't just
                            facilitate transactions, but actively help you do better with your
                            money.
                        </p>
                    </div>
                </div>

                <div className="col-12 col-md-6 px-4 px-md-5">
                    <img
                        src="media/images/ecosystem.png"
                        alt="Zerodha Ecosystem"
                        className="img-fluid mb-4"
                    />

                    <div className="d-flex flex-column flex-md-row justify-content-center gap-3 text-center">
                        <a href="#" className="text-decoration-none text-primary fw-semibold">
                            Explore our products{" "}
                            <i className="fa fa-long-arrow-right" aria-hidden="true"></i>
                        </a>
                        <a href="#" className="text-decoration-none text-primary fw-semibold">
                            Try Kite demo{" "}
                            <i className="fa fa-long-arrow-right" aria-hidden="true"></i>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Stats;