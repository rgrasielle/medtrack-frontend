import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from "./pages/Home";
import CadastroMedicamento from "./pages/CadastroMedicamento";
import Estoque from './pages/Estoque';
import Navbar from './components/Navbar';
import './App.css';

function App() {

  return (

    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/estoque" element={<Estoque />} />
        <Route path="/cadastro" element={<CadastroMedicamento />} />
      </Routes>
    </Router>

  )
}

export default App
