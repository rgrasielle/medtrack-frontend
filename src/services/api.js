import axios from "axios";

// Obtém a URL da API a partir da variável de ambiente
const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL, // Usa a URL definida nas variáveis de ambiente
});

export default api;
