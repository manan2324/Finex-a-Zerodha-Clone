import React from "react";

const categories = [
  {
    title: "Account Opening",
    topics: [
      "Online Account Opening",
      "Offline Account Opening",
      "Company, Partnership and HUF Account",
      "Opening",
      "NRI Account Opening",
      "Charges at Zerodha",
      "Zerodha IDFC FIRST Bank 3-in-1 Account",
      "Getting Started",
    ],
  },
  {
    title: "Segment Activation",
    topics: [
      "Equity segment",
      "F&O segment",
      "Commodity segment",
      "Bank details for activation",
      "Upload documents",
      "Activation timeline",
      "Charges involved",
      "FAQs",
    ],
  },
  {
    title: "KYC & Verification",
    topics: [
      "PAN and Aadhaar linking",
      "Video KYC process",
      "Document rejection reasons",
      "Name mismatch resolution",
      "Email/mobile verification",
      "Address proof queries",
      "In-person verification",
      "KYC status check",
    ],
  },
  {
    title: "Trading Platforms",
    topics: [
      "Kite mobile",
      "Kite web",
      "Coin",
      "Console",
      "Order types",
      "Charting tools",
      "Login issues",
      "Password reset",
    ],
  },
  {
    title: "Fund Transfers",
    topics: [
      "Bank linking",
      "UPI & IMPS",
      "Withdrawals",
      "Transfer limits",
      "Failed transfers",
      "Charges",
      "Transaction timeline",
      "Refund issues",
    ],
  },
  {
    title: "General Queries",
    topics: [
      "Tax reporting",
      "Nominee addition",
      "Account closure",
      "Charges",
      "Support timings",
      "Referral program",
      "Language support",
      "Ticket status",
    ],
  },
];

function CreateTicket() {
  return (
    <div className="container my-5">
      <h1 className="fs-2 mb-4">To create a ticket, select a relevant topic</h1>
      <div className="row">
        {categories.map((category, index) => (
          <div className="col-12 col-sm-6 col-lg-4 mb-4" key={index}>
            <div className="p-3 border h-100">
              <h4 className="mb-3">
                <i className="fa fa-plus-circle me-2" aria-hidden="true"></i>
                {category.title}
              </h4>
              <ul className="list-unstyled" style={{ lineHeight: "2.2" }}>
                {category.topics.map((topic, i) => (
                  <li key={i}>
                    <a href="#" className="text-decoration-none text-dark">
                      {topic}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CreateTicket;