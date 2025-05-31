// 📄 src/App.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Pets from './pages/Pets';
import './App.css'; 


export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element
        ={<Home />} />
        <Route path="/pets" element={<Pets />} />
      </Routes>
    </Router>
  );
}


