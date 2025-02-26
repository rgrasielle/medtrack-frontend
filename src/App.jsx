import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from "./pages/Home";
import CadastroMedicamento from "./pages/CadastroMedicamento";
import Estoque from './pages/Estoque';
import CadastroUsuario from './pages/CadastroUsuario';
import './App.css';
import { ThemeProvider } from '@emotion/react';
import theme from './styles/theme';

function App() {

  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Routes>
          <Route path="/" element={<CadastroUsuario />} />
          <Route path="/home" element={<Home />} />
          <Route path="/cadastro" element={<CadastroMedicamento />} />
          <Route path="/estoque" element={<Estoque />} />
        </Routes>
      </Router>
    </ThemeProvider>

  )
}

export default App
