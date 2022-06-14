import './App.css';
import { Routes, Route, useNavigate } from "react-router-dom";
import Navbar from './components/Navbar';
import Home from './pages/Home';
import About from './pages/About';
import Profile from './pages/Profile';

function App() {
  return (
      <div className="App">
        <Navbar />
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/about' element={<About/>}/>
          <Route path='/profile' element={<Profile/>}/>
        </Routes>
      </div>
  );
}

export default App;
