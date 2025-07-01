import React from "react";
import { useNavigate } from 'react-router-dom';
import useInactivityTimer from './inactivityTimer';


function Landing() {
const navigate = useNavigate();
const [showForm, setShowForm] = React.useState(false);
const handleInactivityFunction = () => {
    setShowForm(true);
  };

  // Specify the delay in milliseconds (5 minutes = 5 * 60 * 1000 milliseconds)
  const inactivityDelay = 1*60*1000;


  function detectUserLeaving(e){
      var y = e.clientY;

        // Check if cursor is leaving the page
        if (y <= 40 || y >= window.innerHeight - 20) {
            // Cursor is leaving the page
            setShowForm(true);
        }
    
  }

  function disableScroll() {
    document.body.classList.add("stop-scrolling");
  }
  function enableScroll() {
    window.onscroll = function () {};
    document.body.classList.remove("stop-scrolling");
  }

  const iframe = React.useRef();
  useInactivityTimer(iframe.current, handleInactivityFunction, inactivityDelay);


  React.useEffect(() => {
    disableScroll();
    const frame = iframe.current;
    frame.onload = ()=>{

        frame.contentDocument.getElementById('nav-analytics').addEventListener('click', (e)=>{
            e.preventDefault();
            navigate('/analytics');
        })
    }
    document.addEventListener('mousemove', detectUserLeaving);
    return ()=>{enableScroll(); document.removeEventListener('mousemove', detectUserLeaving)};
  });

  const style = {
    width: "100%",
    height: "100vh"
  };
  return (
    <>
    {showForm === true && <div class="survey-container">
    <div class="survey-card">
      <div class='survey-close' onClick={()=>setShowForm(false)}>
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
          <path fill="currentColor" d="M6.4 19L5 17.6l5.6-5.6L5 6.4L6.4 5l5.6 5.6L17.6 5L19 6.4L13.4 12l5.6 5.6l-1.4 1.4l-5.6-5.6L6.4 19Z"/>
        </svg>
      </div>
      <div class="survey-header">
        <h2 class="survey-title">Help Us Improve! Take our Quick Survey!!</h2>
      </div>
      <div class="survey-content">
        <p class="survey-description">We value your opinion. By taking this short survey, you can help us enhance your experience. It'll only take a few minutes of your time.</p>
      </div>
      <div class="survey-action">
        <button class="survey-button" onClick={()=>{window.location.href = 'http://localhost:5000/survey'}}>Start Now</button>

      </div>
    </div>
  </div>

    }
    <iframe
    ref={iframe}
    style={style}
    src="landing.html"
    title="W3Schools Free Online Web Tutorials"
    ></iframe>
    </>
  );
}

export default Landing;
