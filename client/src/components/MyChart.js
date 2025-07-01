// import React, { useEffect, useRef, useState } from 'react';
// import { Chart, registerables } from 'chart.js';
// // import { set } from 'mongoose';

// // Register necessary scale modules
// Chart.register(...registerables);

// const MyChart = () => {
//   const [json, setJson] = useState([]);
//   // const getResponses = async () => {
//   //   const response = await fetch("http://localhost:5000/survey/result", {
//   //     method: "GET",
//   //   });
//   //   const res = await response.json();
//   //   setJson(res);
//   //   console.log(json);
//   // };
//   useEffect(() => {
//     const getResponses = async () => {
//       const response = await fetch("http://localhost:5000/survey/result", {
//         method: "GET",
//       });
//       const res = await response.json();
//     };
//     getResponses();
//   }, [json]);
//   // console.log(json);
//   // getResponses();
//   const chartRef = useRef(null);

//   useEffect(() => {
//     // Create the chart instance
//     const myChart = new Chart(chartRef.current, {
//       type: 'bar',
//       data: {
//         labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
//         datasets: [
//           {
//             label: '# of Votes',
//             data: [12, 19, 3, 5, 2, 3],
//             backgroundColor: [
//               'rgba(255, 99, 132, 0.2)',
//               'rgba(54, 162, 235, 0.2)',
//               'rgba(255, 206, 86, 0.2)',
//               'rgba(75, 192, 192, 0.2)',
//               'rgba(153, 102, 255, 0.2)',
//               'rgba(255, 159, 64, 0.2)',
//             ],
//             borderColor: [
//               'rgba(255, 99, 132, 1)',
//               'rgba(54, 162, 235, 1)',
//               'rgba(255, 206, 86, 1)',
//               'rgba(75, 192, 192, 1)',
//               'rgba(153, 102, 255, 1)',
//               'rgba(255, 159, 64, 1)',
//             ],
//             borderWidth: 1,
//           },
//         ],
//       },
//       options: {
//         scales: {
//           y: {
//             beginAtZero: true,
//           },
//         },
//       },
//     });

//     // Clean up the chart instance on component unmount
//     return () => {
//       myChart.destroy();
//     };
//   }, []);

//   return <canvas ref={chartRef} style={{ width: '100px', height: '100px' }} />;
// };

// export default MyChart;


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
        console.log(data);
        const awareOptions = [
          'Yes, I was aware and interested in donating',
          'Yes, but not interested in donating',
          'No, I was not aware of the donation option'
        ];

        const counts = awareOptions.map(option => {
          const count = data.reduce((accumulator, obj) => {
            if (obj.AwareAboutDonation === option) {
              return accumulator + 1;
            }
            return accumulator;
          }, 0);
          return count;
        });

        setChartData({ labels: awareOptions, data: counts });
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

  return <canvas ref={chartRef} style={{ width: '100px', height: '100px' }} />;
};

export default MyChart;
