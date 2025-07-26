import React from "react";

function RightSection({ imageURL, productName, productDesription, learnMore }) {
    return (
        <div className="container mt-5">
            <div className="row align-items-center flex-column-reverse flex-md-row">
                <div className="col-12 col-md-6 px-3 px-md-5 mt-4 mt-md-0 text-center text-md-start">
                    <h2 className="fw-bold">{productName}</h2>
                    <p className="text-muted">{productDesription}</p>
                    <a href={learnMore} className="text-decoration-none text-primary fw-semibold">
                        Learn More
                    </a>
                </div>

                <div className="col-12 col-md-6 text-center text-md-end mb-4 mb-md-0">
                    <img
                        src={imageURL}
                        alt={`${productName} preview`}
                        className="img-fluid"
                    />
                </div>
            </div>
        </div>
    );
}

export default RightSection;