import React from 'react';


function Survey(){
     function disableScroll() {
    document.body.classList.add("stop-scrolling");
  }
  function enableScroll() {
    window.onscroll = function () {};
    document.body.classList.remove("stop-scrolling");
  }
  React.useEffect(()=>{
    disableScroll()
    return enableScroll;
  })
  const iframe = React.useRef();
    return <iframe src="http://localhost:5000/survey" ref={iframe}></iframe>
}

export default Survey;