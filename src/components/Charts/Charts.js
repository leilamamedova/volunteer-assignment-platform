import React from "react";
import { Pie, Bar, Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale,
  LinearScale,
  BarElement,
  Title
} from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale,
  LinearScale,
  BarElement,
  Title,
);

export const PieChart = ({ chartData }) => {
  return <Pie data={chartData} />;
}

export const VerticalBarChart = ({ options, data }) => {
  return <Bar data={data} options={options} />;
}

export const DoughnutChart = ({ data }) => {
  return <Doughnut data={data} />;
}

