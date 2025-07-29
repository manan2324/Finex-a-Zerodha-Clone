import React from "react";
import { Link } from "react-router-dom";

function Footer() {
    return (
        <footer style={{ backgroundColor: "rgb(250, 250, 250)" }}>
            <div className="container border-top mt-5 pt-5">
                <div className="row gy-4">
                    <div className="col-12 col-md-3">
                        <div className="logo logo-link">
                            <img src='logo.png' style={{ width: "35px" }} alt="Logo" />
                            <span>Finex</span>
                        </div>
                        <p className="text-muted small">
                            &copy; 2010 - 2024, Not Finex Broking Ltd. All rights reserved.
                        </p>
                    </div>

                    <div className="col-6 col-md-3">
                        <p className="fw-bold">Company</p>
                        <ul className="list-unstyled small">
                            <li><a href="/about">About</a></li>
                            <li><a href="/product">Products</a></li>
                            <li><a href="/pricing">Pricing</a></li>
                            <li><a href="#">Referral programme</a></li>
                            <li><a href="#">Careers</a></li>
                            <li><a href="#">Finex.tech</a></li>
                            <li><a href="#">Press & media</a></li>
                            <li><a href="#">Finex cares (CSR)</a></li>
                        </ul>
                    </div>

                    <div className="col-6 col-md-3">
                        <p className="fw-bold">Support</p>
                        <ul className="list-unstyled small">
                            <li><a href="#">Contact</a></li>
                            <li><a href="#">Support portal</a></li>
                            <li><a href="#">Z-Connect blog</a></li>
                            <li><a href="/pricing">List of charges</a></li>
                            <li><a href="#">Downloads & resources</a></li>
                        </ul>
                    </div>

                    <div className="col-12 col-md-3">
                        <p className="fw-bold">Account</p>
                        <ul className="list-unstyled small">
                            <li><a href="https://finex-dashboard.vercel.app">Open an account</a></li>
                            <li><a href="#">Fund transfer</a></li>
                            <li><a href="#">60 day challenge</a></li>
                        </ul>
                    </div>
                </div>
                <div className="mt-5 text-muted" style={{ fontSize: "14px" }}>
                    <p>
                        Finex Broking Ltd.: Member of NSE​ &​ BSE – SEBI Registration no.:
                        INZ000031633 CDSL: Depository services through Finex Securities
                        Pvt. Ltd. – SEBI Registration no.: IN-DP-100-2015 Commodity Trading
                        through Finex Commodities Pvt. Ltd. MCX: 46025 – SEBI Registration
                        no.: INZ000038238 Registered Address: Finex Broking Ltd.,
                        #153/154, 4th Cross, Dollars Colony, Opp. Clarence Public School,
                        J.P Nagar 4th Phase, Bengaluru - 560078, Karnataka, India. For any
                        complaints pertaining to securities broking please write to
                        complaints@Finex.com, for DP related to dp@Finex.com. Please
                        ensure you carefully read the Risk Disclosure Document as prescribed
                        by SEBI | ICF
                    </p>

                    <p>
                        Procedure to file a complaint on SEBI SCORES: Register on SCORES
                        portal. Mandatory details for filing complaints on SCORES: Name,
                        PAN, Address, Mobile Number, E-mail ID. Benefits: Effective
                        Communication, Speedy redressal of the grievances
                    </p>

                    <p>
                        Investments in securities market are subject to market risks; read
                        all the related documents carefully before investing.
                    </p>

                    <p>
                        "Prevent unauthorised transactions in your account. Update your
                        mobile numbers/email IDs with your stock brokers. Receive
                        information of your transactions directly from Exchange on your
                        mobile/email at the end of the day. Issued in the interest of
                        investors. KYC is one time exercise while dealing in securities
                        markets - once KYC is done through a SEBI registered intermediary
                        (broker, DP, Mutual Fund etc.), you need not undergo the same
                        process again when you approach another intermediary." Dear
                        Investor, if you are subscribing to an IPO, there is no need to
                        issue a cheque. Please write the Bank account number and sign the
                        IPO application form to authorize your bank to make payment in case
                        of allotment. In case of non allotment the funds will remain in your
                        bank account. As a business we don't give stock tips, and have not
                        authorized anyone to trade on behalf of others. If you find anyone
                        claiming to be part of Finex and offering such services, please
                        create a ticket here.
                    </p>
                </div>
            </div>
        </footer>
    );
}

export default Footer;