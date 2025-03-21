import { Alert, Box, Button, TextField, Typography } from "@mui/material";
import axios from "axios";
import { Controller, useForm } from "react-hook-form";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const CadastroUsuario = () => {
    const { control, handleSubmit, formState: { errors } } = useForm();
    const [mensagemErro, setMensagemErro] = useState("");
    const [mensagemSucesso, setMensagemSucesso] = useState("");
    const navigate = useNavigate();
    const { signup } = useAuth();

    const onSubmit = async (data) => {
        setMensagemErro(""); // Reseta o erro antes da submissão
        setMensagemSucesso("");

        const emailExistente = await verificarEmailExistente(data.email);

        if (emailExistente) {
            setMensagemComTimeout(setMensagemErro, "Este email já está cadastrado."); // Atualiza o estado do erro
        } else {
            console.log(data);
            await handleSignup(data);
        }
    };

    const apiUrl = import.meta.env.VITE_API_URL;

    const verificarEmailExistente = async (email) => {
        try {
            const response = await axios.get(`${apiUrl}/users/email-exists?email=${email}`);
            return response.data.exists; // Retorna se o email existe ou não
        } catch (error) {
            console.error("Erro ao verificar email", error);
            setMensagemErro("Erro ao verificar email. Tente novamente.");
            return false; // Caso haja erro na requisição, assumimos que o email não existe
        }
    };

    const setMensagemComTimeout = (setMensagem, mensagem) => {
        setMensagem(mensagem);
        setTimeout(() => {
            setMensagem("");  // Limpa a mensagem após 5 segundos
        }, 5000);
    };

    const handleSignup = async (data) => {
        const { email, password } = data;
        const res = await signup(email, password);  // Chama o signup do useAuth

        if (!res.success) {
            setMensagemErro(res.message);  // Exibe a mensagem de erro, caso exista
            return;
        }
        // Se o cadastro for bem-sucedido, redireciona para a página de login
        setMensagemSucesso("Cadastrado realizado com sucesso!");
        setTimeout(() => {
            navigate("/login");  // Redireciona para a página de login após alguns segundos
        }, 2000);
    };

    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)} style={{ display: "flex", flexDirection: "column", gap: "10px", maxWidth: "400px", marginTop: "-100px" }}>
                <Box sx={{ display: "flex", justifyContent: "center", mt: 3 }}>
                    <Typography variant="h4" sx={{ fontWeight: "bold", mb: 3 }}>
                        Cadastre-se
                    </Typography>
                </Box>

                {mensagemErro && <Alert severity="error">{mensagemErro}</Alert>}
                {mensagemSucesso && <Alert severity="success">{mensagemSucesso}</Alert>}

                <Controller
                    name="email"
                    control={control}
                    defaultValue=""
                    rules={{ required: 'O email é obrigatório' }}
                    render={({ field }) => (
                        <TextField
                            {...field}
                            label="E-mail"
                            type="email"
                            variant="outlined"
                            sx={{ width: "400px" }}
                            error={!!errors.email}
                            helperText={errors.email?.message}
                        />
                    )}
                />

                <Controller
                    name="password"
                    control={control}
                    defaultValue=""
                    rules={{ required: 'A senha é obrigatória', minLength: { value: 8, message: 'A senha deve ter pelo menos 8 caracteres' } }}
                    render={({ field }) => (
                        <TextField
                            {...field}
                            label="Senha"
                            type="password"
                            variant="outlined"
                            sx={{ width: "400px" }}
                            error={!!errors.password}
                            helperText={errors.password?.message}
                        />
                    )}
                />

                <Button type="submit" fullWidth sx={{ marginTop: 2 }}>Cadastrar-se</Button>

                <Box sx={{ display: "flex", justifyContent: "center", marginTop: 2 }}>
                    <Typography>Já possui uma conta? </Typography>
                    <Link to="/login" style={{ marginLeft: 4 }}>Entre</Link>
                </Box>
            </form>
        </>
    );
};

export default CadastroUsuario;
