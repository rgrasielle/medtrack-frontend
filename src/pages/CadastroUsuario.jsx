import { Alert, Box, Button, TextField, Typography } from "@mui/material";
import axios from "axios";
import { Controller, useForm } from "react-hook-form";
import { useState } from "react";

const CadastroUsuario = () => {
    const { control, handleSubmit, reset, formState: { errors } } = useForm();
    const [mensagemErro, setMensagemErro] = useState("");
    const [mensagemSucesso, setMensagemSucesso] = useState("");

    const onSubmit = async (data) => {
        setMensagemErro(""); // Reseta o erro antes da submissão
        setMensagemSucesso("");
        const emailExistente = await verificarEmailExistente(data.email);

        if (emailExistente) {
            setMensagemErro("Este email já está cadastrado."); // Atualiza o estado do erro
        } else {
            console.log(data);
            chamarAPI(data);
        }
    };

    const verificarEmailExistente = async (email) => {
        try {
            const response = await axios.get(`http://localhost:8080/users/email-exists?email=${email}`);
            return response.data.exists; // Retorna se o email existe ou não
        } catch (error) {
            console.error("Erro ao verificar email", error);
            return false; // Caso haja erro na requisição, assumimos que o email não existe
        }
    };

    const chamarAPI = async (userData) => {
        try {
            const response = await axios.post("http://localhost:8080/users", userData);
            console.log("Cadastrado com sucesso", response.status);
            if (response.status === 201) {
                setMensagemSucesso("Cadastrado com sucesso!");
                reset(); // Reseta o formulário após o cadastro
            }
        } catch (error) {
            console.error("Erro ao cadastrar usuário", error);
            setMensagemErro("Erro ao cadastrar usuário. Tente novamente mais tarde.");
        }
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
                    rules={{ required: 'A senha é obrigatória', minLength: { value: 6, message: 'A senha deve ter pelo menos 6 caracteres' } }}
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
            </form>
        </>
    );
};

export default CadastroUsuario;
