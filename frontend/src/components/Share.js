import React, { useEffect, useState, useCallback } from "react";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";
import { Chart } from "react-chartjs-2";
import axios from "axios";

function Share({ share, price }) {
  const [xValues, setXValues] = useState("");
  const [yValues, setYValues] = useState("");
  function getBusinessDates() {
    var startDate = new Date()
    Date.parse(startDate.setDate(startDate.getDate() - 1))
    var endDate = new Date()
    while(true) {
      var weekDay = endDate.getDay()
      if(weekDay != 0 && weekDay != 6) { // not a weekend
        break;
      }
      else {
        startDate.setDate(startDate.getDate() - 1)
        endDate.setDate(endDate.getDate() - 1)
      }
    }
    return [Math.floor(startDate.getTime() / 1000), Math.floor(endDate.getTime() / 1000)]
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
    maintainAspectRatio: false,
    events: [],
    elements: {
      point: {
        radius: 0,
      },
    },
  };

  // accessing graph data for the portfolio 
  useEffect(() => {
    var [startDate, endDate] = getBusinessDates();
    axios
      .get(
        `https://finnhub.io/api/v1/stock/candle?symbol=${share.ticker}&resolution=60&from=${startDate}&to=${endDate}&token=cb6avbiad3i70tu62u4g`
      )
      .then(function (response) {
        convertUnix(response.data["t"]);
        setYValues(response.data["c"]);
      });
  }, []);

  function convertUnix(unix) {
    var dates = [];
    for (var u of unix) {
      var date = new Date(u * 1000);
      dates.push(date);
    }
    setXValues(dates);
  }

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

  return (
    <tr>
      <td className = 'roboto'> {share.count} </td>
      <td className = 'roboto'>{share.ticker}</td>
      <td className = 'roboto'>${price}</td>
      <td>
        <div style={{ width: "5vw", height: "3vh" }}>
          {" "}
          <Line options={options} data={data} />{" "}
        </div>
      </td>
    </tr>
  );
}

export default Share;
