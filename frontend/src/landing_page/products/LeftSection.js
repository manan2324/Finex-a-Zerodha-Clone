import React from "react";

function LeftSection({
    imageURL,
    productName,
    productDesription,
    tryDemo,
    learnMore,
    googlePlay,
    appStore,
}) {
    return (
        <div className="container mt-5">
            <div className="row align-items-center">
                {/* Image Section */}
                <div className="col-12 col-md-6 mb-4 mb-md-0 text-center text-md-start">
                    <img
                        src={imageURL}
                        alt={`${productName} visual`}
                        className="img-fluid"
                    />
                </div>

                {/* Text Section */}
                <div className="col-12 col-md-6 px-3 px-md-5 text-center text-md-start">
                    <h2 className="fw-bold">{productName}</h2>
                    <p className="text-muted">{productDesription}</p>

                    {/* Aligned links (Try Demo + Learn More) */}
                    <div className="d-flex justify-content-center justify-content-md-start flex-wrap gap-3 mt-3">
                        <a href={tryDemo} className="text-decoration-none text-primary fw-semibold">
                            Try Demo
                        </a>
                        <a href={learnMore} className="text-decoration-none text-primary fw-semibold">
                            Learn More
                        </a>
                    </div>

                    {/* Aligned store badges */}
                    <div className="d-flex justify-content-center justify-content-md-start flex-wrap gap-4 mt-4">
                        <a href={googlePlay}>
                            <img
                                src="media/images/googlePlayBadge.svg"
                                alt="Google Play"
                                className="img-fluid"
                                style={{ maxHeight: "50px" }}
                            />
                        </a>
                        <a href={appStore}>
                            <img
                                src="media/images/appstoreBadge.svg"
                                alt="App Store"
                                className="img-fluid"
                                style={{ maxHeight: "50px" }}
                            />
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LeftSection;
