import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
    // title: {
    //   display: true,
    //   text: "Chart.js Bar Chart",
    // },
  },
};

export default function BarChart({ labels, chartData }) {
  const data = {
    labels,
    datasets: [
      {
        label: "Base Stat",
        data: chartData,
        backgroundColor: "rgb(53, 162, 235)",
      },
    ],
  };
  return (
    <div style={{ width: "50%", height: "250px" }}>
      <Bar options={options} data={data} />
    </div>
  );
}
