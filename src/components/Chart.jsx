import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { getChart } from '../util';
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const Chart = ({chartData, specifier} ) => {
  const [data, setData] = useState({
    labels: [],
    datasets: []
  });
  const [options, setOptions] = useState({});
  useEffect(()=>{
    if (chartData&&specifier) {
      loadLineChart();
    }
  }, [chartData, specifier]);
  
  const loadLineChart = () => {
    const [chart, unit, title] = getChart(chartData, specifier);
    const chartOptions = {
      responsive: true,
      plugins: {
        legend: {
          position: 'top',
          labels: {
            color: 'white'
          }
        },
        title: {
          display: true,
          text: title + ', ' + unit,
          color: 'white'
        },
      },
      scales: {
        x: {
            ticks: {
                color: 'white', 
            },
            title: {
                color: 'white',
            },
        },
        y: {
            ticks: {
                color: 'white',
                size: '1px',
            },
            title: {
                color: 'white', 
            },
        },
    },
      maintainAspectRatio: false
    };
    setData(chart);
    setOptions(chartOptions);
  };

  return (
    <ChartContainer >
      <Line data={data} options={options}/>
    </ChartContainer>
  );
}
;

export default Chart;

const ChartContainer = styled.div`
  background: linear-gradient(rgb(90, 0, 150),rgba(255, 255, 255, 0.2));
  width: 70%;
  height: 100%;
  transition: 1s ease-in-out;
  border-radius: 30px;
  margin-right: 1rem;
  padding: 1rem;
  @media(max-width: 700px) {
    width: 100%;
    margin-right: 0;
    height: 85%;
  }
  @media (max-width:500px) {
    height: 80%;
    padding: 0.3rem;
  }
`;
