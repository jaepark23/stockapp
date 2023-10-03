import React, { useEffect, useState, useCallback } from "react";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";
import { Chart } from "react-chartjs-2";
import "chartjs-adapter-moment";
import axios from "axios";
import moment from "moment";

const API_KEY = process.env.REACT_APP_API_KEY

function Graph({ ticker, length, getBusinessDates }) {
  const [xValues, setXValues] = useState("");
  const [yValues, setYValues] = useState("");

  function convertUnix(unix) {
    var dates = [];
    for (var u of unix) {
      dates.push(moment.unix(u));
    }
    setXValues(dates);
  }

  const options = {
    elements: {
      point: {
        radius: 0
      }
    },
    scales: {
      "x-axis-1": {
        display: true,
        grid: {
          display: false,
        },
        type: "time",
        time: {
          ...(length == 1 && { unit: "hour" }),
          ...(length == 7 && { unit: "day" }),
          ...(length == 30 && { unit: "week" }),
          ...(length === 365 && { unit: 'month' }),
          ...(length === 1825 && { unit: 'year' }),
          displayFormats: { day: "MMM DD", hour: "HH A", month: 'MMM' },
        },
        ticks: {
          font: {
            size: 10,
          },
        },
      },
      "y-axis-1": {
        type: "linear",
        display: true,
        position: "left",
      },
    },
    plugins: {
      legend: {
        display: false,
      },
    },
    maintainAspectRatio: false,
    responsive: true,
  };
  var data = {
    labels: xValues,
    datasets: [
      {
        label: ticker,
        data: yValues,
        fill: true,
        fillColor: "yellow",
        backgroundColor: [
          'rgb(169,169,169)'
        ],
        borderColor: [
          '	rgb(105,105,105)'
        ]
      },
    ],
  };

  // accessing graph data upon change of ticker
  useEffect(() => {
    if (ticker) {
      var [startDate, endDate] = getBusinessDates();
      console.log('start: ' + startDate)
      console.log('end: ' + endDate)
      var resolution = 60;
      if (length === 365) {
        resolution = 'D'
      } else if (length === 1825) {
        resolution = 'D'
      }
      console.log(
        "url:" +
        `https://finnhub.io/api/v1/stock/candle?symbol=${ticker}&resolution=${resolution}&from=${Math.floor(
          startDate.getTime() / 1000
        )}&to=${Math.floor(
          endDate.getTime() / 1000
        )}&token=${API_KEY}`
      );
      axios
        .get(
          `https://finnhub.io/api/v1/stock/candle?symbol=${ticker}&resolution=${resolution}&from=${Math.floor(
            startDate.getTime() / 1000
          )}&to=${Math.floor(
            endDate.getTime() / 1000
          )}&token=${API_KEY}`
        )
        .then(function (response) {
          convertUnix(response.data["t"]);
          setYValues(response.data["c"]);
        });
    }
  }, [ticker, length]);

  return (
    <div className="chart-container">
      <Line options={options} data={data} />{" "}
    </div>
  );
}

export default Graph;
