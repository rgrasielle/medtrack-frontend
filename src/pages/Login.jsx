import { Box, Button, TextField, Typography } from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { useState } from "react";

const Login = () => {
    const { control, handleSubmit, formState: { errors } } = useForm();
    const { signin } = useAuth();
    const navigate = useNavigate();
    const [mensagemErro, setMensagemErro] = useState("");


    // Função chamada quando o formulário é enviado
    const handleLogin = async (data) => {
        const { email, password } = data;
        console.log("Tentando fazer login...");
        // Tenta fazer login e retorna erro, caso haja
        const res = await signin(email, password);
        console.log("Resposta do login:", res);
        if (res && res.message) {
            setMensagemErro(res.message);
            return;
        }
        navigate("/home");
    };

    return (
        <form
            onSubmit={handleSubmit(handleLogin)}
            style={{ display: "flex", flexDirection: "column", gap: "10px", maxWidth: "400px", marginTop: "-100px" }}
        >
            <Box sx={{ display: "flex", justifyContent: "center", mt: 3 }}>
                <Typography variant="h4" sx={{ fontWeight: "bold", mb: 3 }}>
                    Login
                </Typography>
            </Box>

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
                rules={{
                    required: 'A senha é obrigatória',
                    minLength: { value: 8, message: 'A senha deve ter pelo menos 8 caracteres' }
                }}
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

            <Button type="submit" fullWidth sx={{ marginTop: 2 }}>Entrar</Button>

            {/* Mensagem de erro, caso exista */}
            {mensagemErro && <Typography color="error" sx={{ textAlign: 'center', marginTop: 2 }}>{mensagemErro}</Typography>}

            <Box sx={{ display: "flex", justifyContent: "center", marginTop: 2 }}>
                <Typography>Não tem uma conta? </Typography>
                <Link to="/registro" style={{ marginLeft: 4 }}>Cadastre-se</Link>
            </Box>
        </form>
    );
};

export default Login;
