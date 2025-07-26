import React from "react";

function Hero() {
    return (
        <div className="container border-bottom mb-5">
            <div className="text-center mt-5 p-3 px-3 px-md-5">
                <h1 className="fw-bold">Technology</h1>
                <h3 className="text-muted mt-3 fs-5 fs-md-4">
                    Sleek, modern, and intuitive trading platforms
                </h3>
                <p className="mt-3 mb-5 text-muted">
                    Check out our{" "}
                    <a href="#" className="text-decoration-none text-primary fw-medium">
                        investment offerings{" "}
                        <i className="fa fa-long-arrow-right" aria-hidden="true"></i>
                    </a>
                </p>
            </div>
        </div>
    );
}

export default Hero;