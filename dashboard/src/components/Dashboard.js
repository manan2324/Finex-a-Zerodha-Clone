import React, { useEffect, useState } from "react";
import Holdings from "./Holdings";
import Orders from "./Orders";
import Positions from "./Positions";
import Summary from "./Summary";
import { DoughnutChart } from "./DoughnutChart";
import { VerticalGraph } from "./VerticalGraph";
import { watchlist } from "../data/data";
import axios from "axios";

const Dashboard = () => {
  const [holdings, setHoldings] = useState([]);

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    if (!userId) return;

    axios.get(`http://localhost:3002/holdings/userHoldings/${userId}`).then((res) => {
      setHoldings(res.data);
    });
  }, []);

  const holdingsLabels = holdings.map((stock) => stock.name);
  const watchlistLabels = watchlist.map((stock) => stock.name);

  const verticalGraphData = {
    labels: holdingsLabels,
    datasets: [
      {
        label: "Stock Price",
        data: holdings.map((stock) => stock.price),
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  };

  const doughnutData = {
    labels: watchlistLabels,
    datasets: [
      {
        label: "Price",
        data: watchlist.map((stock) => stock.price),
        backgroundColor: [
          "rgba(255, 99, 132, 0.5)",
          "rgba(54, 162, 235, 0.5)",
          "rgba(255, 206, 86, 0.5)",
          "rgba(75, 192, 192, 0.5)",
          "rgba(153, 102, 255, 0.5)",
          "rgba(255, 159, 64, 0.5)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <>
      <div className="grid-container">
        <Summary />
        <DoughnutChart data={doughnutData} />
      </div>
      <Holdings holdings={holdings} />
      <Positions />
      <Orders />
      <VerticalGraph data={verticalGraphData} />
    </>
  );
};

export default Dashboard;
