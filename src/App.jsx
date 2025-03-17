import PropTypes from "prop-types";
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from "./pages/Home";
import CadastroMedicamento from "./pages/CadastroMedicamento";
import Estoque from './pages/Estoque';
import CadastroUsuario from './pages/CadastroUsuario';
import './App.css';
import { ThemeProvider } from '@emotion/react';
import theme from './styles/theme';
import Login from './pages/Login';
import { AuthProvider } from './contexts/AuthProvider';
import useAuth from './hooks/useAuth';

// Para proteger as rotas privadas
const Private = ({ Item }) => {
  const { signed, loading } = useAuth();

  if (loading) {
    return <div>Carregando...</div>;
  }

  return signed ? <Item /> : <Navigate to="/login" />;
};


Private.propTypes = {
  Item: PropTypes.elementType.isRequired, // Garante que `Item` seja um componente React válido
};

function App() {
  return (
    <ThemeProvider theme={theme}>
      <AuthProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Navigate to="/login" />} />

            <Route path="/login" element={<Login />} />
            <Route path="/registro" element={<CadastroUsuario />} />
            <Route path="/home" element={<Private Item={Home} />} />
            <Route path="/item" element={<Private Item={CadastroMedicamento} />} />
            <Route path="/estoque" element={<Private Item={Estoque} />} />
          </Routes>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
