import React, { useEffect, useRef, useState } from 'react';
import { Chart, registerables } from 'chart.js';

// Register necessary scale modules
Chart.register(...registerables);

const MyChart = () => {
  const [chartData, setChartData] = useState({ labels: [], data: [] });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:5000/survey/result');
        const data = await response.json();

        const options = [
          'Yes, I was aware and interested in donating',
          'Yes, but not interested in donating',
          'No, I was not aware of the donation option',
        ];

        const counts = options.map(option => {
          const count = data.reduce((accumulator, obj) => {
            if (obj.AwareAboutDonation === option) {
              return accumulator + 1;
            }
            return accumulator;
          }, 0);
          return count;
        });

        setChartData({ labels: options, data: counts });
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const chartRef = useRef(null);

  useEffect(() => {
    if (chartData.labels.length === 0) return;

    const myChart = new Chart(chartRef.current, {
      type: 'pie',
      data: {
        labels: chartData.labels,
        datasets: [
          {
            label: 'Why Not Volunteering',
            data: chartData.data,
            backgroundColor: [
              'rgba(75, 192, 192, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(255, 99, 132, 0.2)'
            ],
            borderColor: [
              'rgba(75, 192, 192, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(255, 99, 132, 1)'
            ],
            borderWidth: 1,
          },
        ],
      },
    });

    // Clean up the chart instance on component unmount
    return () => {
      myChart.destroy();
    };
  }, [chartData]);

  return <canvas ref={chartRef} style={{ width: '150px', height: '150px' }} />;
};

export default MyChart;
