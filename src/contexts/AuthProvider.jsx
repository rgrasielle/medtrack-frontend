// src/contexts/AuthProvider.js
import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import api from "../services/api";
import { AuthContext } from "./AuthContext"; // Importando o contexto

export const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(null);

    useEffect(() => {
        const userToken = localStorage.getItem("user_token");
        const userInfo = localStorage.getItem("user_info");

        // Verifica se o item existe antes de tentar fazer o parse
        if (userToken && userInfo && userInfo !== "undefined") {
            setUser(JSON.parse(userInfo)); // Só faz o parse se o valor for válido
        }
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

            // Buscar as informações do usuário (agora com o token no header)
            const userResponse = await api.get("/users/me", {
                headers: {
                    Authorization: `Bearer ${token}`, // Adiciona o token no cabeçalho
                }
            });

            if (userResponse.data) {
                const user = userResponse.data;
                // Salvar as informações do usuário no localStorage
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
        <AuthContext.Provider value={{ user, signed: !!user, signin, signup, signout }}>
            {children}
        </AuthContext.Provider>
    );
};

AuthProvider.propTypes = {
    children: PropTypes.node.isRequired,
};
