import React from "react";
import { Link } from "react-router-dom";

function Hero() {
    return (
        <div className="container py-5 mb-5">
            <div className="row justify-content-center text-center">
                <div className="col-12 col-sm-10 col-md-8 col-lg-6">
                    <img
                        src="media/images/homeHero.png"
                        alt="Hero"
                        className="img-fluid mb-5"
                    />
                    <h1 className="fs-2 fs-md-1 mt-5">Invest in everything</h1>
                    <p className="text-muted fs-6 fs-md-5">
                        Online platform to invest in stocks, derivatives, mutual funds, and more.
                    </p>
                    <div className="d-flex justify-content-center">
                        <Link to="http://localhost:3000" target="_blank" className="btn btn-primary btn-lg mt-3 px-4">
                            Signup Now
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Hero;