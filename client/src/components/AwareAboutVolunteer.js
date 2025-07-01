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

        const awareOptions = [
          'Yes, I was aware and interested in volunteering',
          'Yes, but not interested in volunteering',
          'No, I was not aware of the volunteer program',
        ];
        const awareOptionsDisplay = [
          'Was aware & interested',
          'Aware but not interested ',
          'Not Aware',
        ];

        const counts = awareOptions.map(option => {
          const count = data.reduce((accumulator, obj) => {
            if (obj.AwareAboutVolunteer === option) {
              return accumulator + 1;
            }
            return accumulator;
          }, 0);
          return count;
        });

        setChartData({ labels: awareOptionsDisplay, data: counts });
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
      type: 'bar',
      data: {
        labels: chartData.labels,
        datasets: [
          {
            label: '# of People',
            data: chartData.data,
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1,
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
            stepSize: 1,
            precision:0 // Set the step size for the y-axis ticks
          },
        },
      },
    });

    // Clean up the chart instance on component unmount
    return () => {
      myChart.destroy();
    };
  }, [chartData]);

  return <div style={{ width: '600px', height: '300px' }}>
  <canvas ref={chartRef}/>;
  </div>
};

export default MyChart;