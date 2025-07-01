import React, { useState } from 'react';
import './HomePage.css';
import PrimaryReason from '../PrimaryReason';
import FoundTheInformation from '../FoundTheInformation';
import AwareAboutVolunteer from '../AwareAboutVolunteer';
import WhyNotVolunteering from '../WhyNotVolunteering';
import AwareAboutDonation from '../AwareAboutDonation';
import WhyNotDonating from '../WhyNotDonating';
import HearAboutBhumi from '../HearAboutBhumi';
import RevisitBhumi from '../RevisitBhumi';
import RateInformation from '../RateInformation';

const HomePage = () => {
  const [activeChart, setActiveChart] = useState(null);

  const handleChartClick = (chartType) => {
    setActiveChart(chartType);
  };

  const renderChartComponent = () => {
    switch (activeChart) {
      case 'PrimaryReason':
        return <PrimaryReason />;
      case 'FoundTheInformation':
        return <FoundTheInformation />;
      case 'AwareAboutVolunteer':
        return <AwareAboutVolunteer />;
      case 'WhyNotVolunteering':
        return <WhyNotVolunteering />;
      case 'AwareAboutDonation':
        return <AwareAboutDonation />;  
      case 'WhyNotDonating':
        return <WhyNotDonating />;
      case 'HearAboutBhumi':
        return <HearAboutBhumi />;
      case 'RateInformation':
        return <RateInformation />;
      case 'RevisitBhumi':
        return <RevisitBhumi />;
      default:
        return null;
    }
  };

  return (
    <div className="app">
      <h1>Data Insights</h1>
      <br></br>
      <div className="chart-buttons">
        <button
          className={activeChart === 'PrimaryReason' ? 'active' : ''}
          onClick={() => handleChartClick('PrimaryReason')}
        >
          Primary reason for visiting the website
        </button>
        <button
          className={activeChart === 'AwareAboutVolunteer' ? 'active' : ''}
          onClick={() => handleChartClick('AwareAboutVolunteer')}
        >
          Awareness about volunteering
        </button>
        <button
          className={activeChart === 'WhyNotVolunteering' ? 'active' : ''}
          onClick={() => handleChartClick('WhyNotVolunteering')}
        >
          Reason behind not volunteering
        </button>
        <button
          className={activeChart === 'AwareAboutDonation' ? 'active' : ''}
          onClick={() => handleChartClick('AwareAboutDonation')}
        >
          Awareness about donating
        </button>
        <button
          className={activeChart === 'WhyNotDonating' ? 'active' : ''}
          onClick={() => handleChartClick('WhyNotDonating')}
        >
          Reason behind not donating
        </button>
        <button
          className={activeChart === 'HearAboutBhumi' ? 'active' : ''}
          onClick={() => handleChartClick('HearAboutBhumi')}
        >
          Heard about Bhumi
        </button>
        <button
          className={activeChart === 'RateInformation' ? 'active' : ''}
          onClick={() => handleChartClick('RateInformation')}
        >
          Accessibility of information
        </button>
        <button
          className={activeChart === 'RevisitBhumi' ? 'active' : ''}
          onClick={() => handleChartClick('RevisitBhumi')}
        >
          Likelihood of revisiting
        </button>
      </div>
      <div className="chart-container">
        {activeChart && (
          <div className="chart">
            {renderChartComponent()}
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;

