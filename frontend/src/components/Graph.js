import React, { useEffect, useState, useCallback } from "react";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";
import { Chart } from "react-chartjs-2";
import axios from "axios";

//https://finnhub.io/api/v1/stock/candle?symbol=META&resolution=60&from=1657950323&to=1658036723&token=cb6avbiad3i70tu62u4g
function Graph({ ticker }) {
  const [xValues, setXValues] = useState("");
  const [yValues, setYValues] = useState("");

  function convertUnix(unix) {
    var dates = [];
    for (var u of unix) {
      var date = new Date(u * 1000);
      dates.push(date);
    }
    setXValues(dates);
  }
  const options = {
    scales: {
      "x-axis-1": {
        display: false,
        gridLines: {
          display: false,
        },
      },
      "y-axis-1": {
        type: "linear",
        display: false,
        position: "left",
      },
    },
    plugins: {
      legend: {
        display: false,
      },
    },
    maintainAspectRatio: true,
    events: [],
    elements: {
      point: {
        radius: 0,
      },
    },
  };
  var data = {
    labels: xValues,
    datasets: [
      {
        label: "First dataset",
        data: yValues,
        fill: true,
        backgroundColor: "rgba(75,192,192,0.2)",
        borderColor: "rgba(75,192,192,1)",
      },
    ],
  };
  
  // accessing graph data upon change of ticker
  useEffect(() => {
    // var a = Math.floor(Date.now() / 1000)
    // var dateOffset = 86400;
    // var past = a - dateOffset
    axios
      .get(
        `https://finnhub.io/api/v1/stock/candle?symbol=${ticker}&resolution=60&from=1657692413&to=1657778813&token=cb6avbiad3i70tu62u4g`
      )
      .then(function (response) {
        convertUnix(response.data["t"]);
        setYValues(response.data["c"]);
      });
  }, [ticker]);

  return (
    <div
      style={{
        width: "40%",
        height: "2vh",
        position: "relative",
        marginBottom: "5%",
      }}
    >
      {" "}
      <Line options={options} data={data} />{" "}
    </div>
  );
}

export default Graph;
