import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  BrowserRouter
} from "react-router-dom";
import HomePage from './components/UI/HomePage'
import Landing from './Landing/landing';
import Survey from './Survey/survey';
import MyChart from './components/MyChart';

function App() {
  return(
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing/>}/>
        <Route path="/survey" element={<Survey/>}/>
        <Route path="/analytics" element={<HomePage/>}/>
        {/* <Route path="/MyChart" element={<MyChart/>}/>
        <Route path="/PieChart" element={<PieChart/>}/>
        <Route path="/LineChart"element={<LineChart/>}/>
        <Route path="/Scatter" element={<Scatter/>}/> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
