import React from "react";

const platforms = [
  {
    image: "media/images/zerodhaFundhouse.png",
    alt: "zerodhaFundhouse Logo",
    description:
      "Our asset management venture that is creating simple and transparent index funds to help you save for your goals.",
  },
  {
    image: "media/images/sensibullLogo.svg",
    alt: "Sensibull Logo",
    description:
      "Options trading platform that lets you create strategies, analyze positions, and examine data points like open interest, FII/DII, and more.",
  },
  {
    image: "media/images/goldenpiLogo.png",
    alt: "GoldenPi Logo",
    description:
      "Investment research platform that offers detailed insights on stocks, sectors, supply chains, and more.",
  },
  {
    image: "media/images/streakLogo.png",
    alt: "Streak Logo",
    description:
      "Systematic trading platform that allows you to create and backtest strategies without coding.",
  },
  {
    image: "media/images/smallcaseLogo.png",
    alt: "SmallCase Logo",
    description:
      "Thematic investing platform that helps you invest in diversified baskets of stocks on ETFs.",
  },
  {
    image: "media/images/dittoLogo.png",
    alt: "Ditto Logo",
    description:
      "Personalized advice on life and health insurance. No spam and no mis-selling.",
  },
];

function Universe() {
  return (
    <div className="container mt-5">
      <div className="text-center">
        <h1>The Finex Universe</h1>
        <p className="text-muted">
          Extend your trading and investment experience even further with our partner platforms.
        </p>
      </div>

      <div className="row mt-4">
        {platforms.map((platform, index) => (
          <div key={index} className="col-12 col-sm-6 col-md-4 p-4 text-center">
            <img
              src={platform.image}
              alt={platform.alt}
              className="img-fluid mb-3"
              style={{ maxHeight: "60px" }}
            />
            <p className="text-muted small">{platform.description}</p>
          </div>
        ))}
      </div>

      <div className="d-flex justify-content-center mt-4 mb-5">
        <a href="https://finex-dashboard.vercel.app" className="btn btn-primary px-4 py-2 fs-5">
          Signup Now
        </a>
      </div>
    </div>
  );
}

export default Universe;