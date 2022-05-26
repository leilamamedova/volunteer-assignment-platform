import React from "react";
import { Pie, Bar } from "react-chartjs-2";
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

export const PieChart = ({ chartData, options }) => {
  return <Pie data={chartData} options={options} />;
}

export const Chart = ({ data, options }) => {
  return <Bar data={data} options={options} />;
}


