"use client";
import { Chart as ChartJS } from "chart.js/auto";
import { Line } from "react-chartjs-2";

export default function Chart({ values }) {
  const last30 = values.slice(0, 30).reverse();
  const prices = last30.map((value) => value.close);
  const labels = last30.map((value) => value.date);

  const data = {
    labels,
    datasets: [
      {
        label: "Price",
        data: prices,
        fill: true,
        tension: 0.1,
        backgroundColor: (context) => {
          const ctx = context.chart.ctx;
          const gradient = ctx.createLinearGradient(0, 0, 0, 400);
          gradient.addColorStop(0, "rgba(16,185,129,0.18)");
          gradient.addColorStop(1, "rgba(16,185,129,0)");
          return gradient;
        },
        borderColor: "#10b981",
        borderWidth: 2,
        pointBackgroundColor: "#10b981",
        pointBorderColor: "transparent",
        pointHoverBackgroundColor: "#059669",
        pointHoverBorderColor: "transparent",
        pointRadius: 2,
      },
    ],
  };

  const options = {
    scales: {
      x: {
        grid: {
          display: true,
          color: "rgba(24,24,27,0.06)",
        },
        ticks: {
          font: { size: 11 },
          color: "#71717a",
        },
      },
      y: {
        grid: {
          display: true,
          color: "rgba(24,24,27,0.06)",
        },
        ticks: {
          font: { size: 11 },
          color: "#71717a",
          callback: function (value) {
            return "$" + value.toFixed(2);
          },
        },
      },
    },
    plugins: {
      legend: {
        display: false,
      },
    },
    layout: {
      padding: {
        top: 12,
        bottom: 4,
      },
    },
    responsive: true,
    maintainAspectRatio: false,
    animation: {
      duration: 600,
    },
  };

  return <Line data={data} options={options} />;
}
