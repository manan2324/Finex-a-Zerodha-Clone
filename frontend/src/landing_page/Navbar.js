import React from "react";

function Navbar() {
    return (
        <nav
            className="navbar navbar-expand-lg border-bottom"
            style={{ backgroundColor: "#FFF" }}
        >
            <div className="container p-2">
                <a className="navbar-brand" href="/">
                    <img
                        src="media/images/logo.svg"
                        className="img-fluid"
                        style={{ maxWidth: "125px", height: "auto" }}
                        alt="Logo"
                    />
                </a>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarSupportedContent"
                    aria-controls="navbarSupportedContent"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav ms-auto mb-2 mb-lg-0 gap-3">
                        <li className="nav-item">
                            <a className="nav-link active" href="https://finex-dashboard.vercel.app">Go to Dashboard</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link active" href="/about">About</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link active" href="/product">Product</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link active" href="/pricing">Pricing</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link active" href="/support">Support</a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;