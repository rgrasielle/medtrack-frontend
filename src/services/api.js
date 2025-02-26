import axios from "axios";

// Programa as requisições a sistemas externos a aplicação


// Configuração da URL base para o backend
const api = axios.create({
    baseURL: 'http://localhost:8080/', // URL do seu backend
});





export default api