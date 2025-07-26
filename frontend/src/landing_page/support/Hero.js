import React from "react";

function Hero() {
  return (
    <section className="container-fluid" id="supportHero">
      <div className="py-5 text-center bg-light text-dark border-bottom" id="supportWrapper">
        <h4 className="mb-2">Support Portal</h4>
        <a href="/" className="text-decoration-none text-dark fw-semibold">
          Track Tickets
        </a>
      </div>

      <div className="row px-3 px-md-5 py-5">
        <div className="col-12 col-md-6 mb-5 mb-md-0">
          <h1 className="fs-4 mb-4">
            Search for an answer or browse help topics to create a ticket
          </h1>

          <input
            type="text"
            className="form-control mb-4"
            placeholder="e.g. How do I activate F&O"
          />

          <div className="d-flex flex-column gap-2">
            <a href="/" className="text-decoration-none text-muted">
              Track account opening
            </a>
            <a href="/" className="text-decoration-none text-muted">
              Track segment activation
            </a>
            <a href="/" className="text-decoration-none text-muted">
              Intraday margins
            </a>
            <a href="/" className="text-decoration-none text-muted">
              Kite user manual
            </a>
          </div>
        </div>

        <div className="col-12 col-md-6">
          <h1 className="fs-4 mb-4">Featured</h1>
          <ol className="ps-3">
            <li className="mb-2">
              <a href="/" className="text-decoration-none text-dark">
                Current Takeovers and Delisting - January 2024
              </a>
            </li>
            <li>
              <a href="/" className="text-decoration-none text-dark">
                Latest Intraday leverages - MIS & CO
              </a>
            </li>
          </ol>
        </div>
      </div>
    </section>
  );
}

export default Hero;