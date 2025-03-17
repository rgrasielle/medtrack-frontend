// src/contexts/AuthProvider.js
import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import api from "../services/api";
import { AuthContext } from "./AuthContext"; // Importando o contexto

export const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(() => {

        // Inicializa o estado do usuário com os dados salvos no localStorage
        const storedUser = localStorage.getItem("user_info");
        return storedUser && storedUser !== "undefined" ? JSON.parse(storedUser) : null;
    });

    const [loading, setLoading] = useState(true); // Estado para controlar o carregamento

    useEffect(() => {
        const userToken = localStorage.getItem("user_token");

        if (userToken && !user) {
            const userInfo = localStorage.getItem("user_info");
            if (userInfo && userInfo !== "undefined") {
                setUser(JSON.parse(userInfo));
            }
        }

        setLoading(false); // Finaliza o carregamento
    }, []);

    const signin = async (email, password) => {
        try {
            const response = await api.post("/auth/login", { email, password });

            if (!response.data || !response.data.token) {
                return { success: false, message: "Erro ao obter token" };
            }

            const { token } = response.data;

            // Salvar o token no localStorage
            localStorage.setItem("user_token", token);

            // Buscar as informações do usuário
            const userResponse = await api.get("/users/me", {
                headers: { Authorization: `Bearer ${token}` }
            });

            if (userResponse.data) {
                const user = userResponse.data;
                localStorage.setItem("user_info", JSON.stringify(user));
                setUser(user);

                return { success: true };
            } else {
                return { success: false, message: "Erro ao obter informações do usuário" };
            }
        } catch (error) {
            console.error("Erro ao fazer login:", error);
            return { success: false, message: "E-mail ou senha incorretos" };
        }
    };

    const signup = async (email, password) => {
        try {
            await api.post("/auth/register", { email, password });
            return { success: true };
        } catch (error) {
            console.error("Erro ao cadastrar usuário:", error);
            return { success: false, message: "Erro ao cadastrar usuário" };
        }
    };

    const signout = () => {
        setUser(null);
        localStorage.removeItem("user_token");
        localStorage.removeItem("user_info");
    };

    return (
        <AuthContext.Provider value={{ user, signed: !!user, signin, signup, signout, loading }}>
            {!loading && children}
        </AuthContext.Provider>
    );
};

AuthProvider.propTypes = {
    children: PropTypes.node.isRequired,
};