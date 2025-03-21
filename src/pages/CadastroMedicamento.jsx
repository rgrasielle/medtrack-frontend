import { Alert, Box, Button, FormControl, FormHelperText, InputLabel, MenuItem, Select, TextField, Typography } from "@mui/material";
import "../styles/cadastroMedicamento.css";
import { Controller, useForm } from "react-hook-form";
import axios from "axios";
import Navbar from "../components/Navbar";
import { useState } from "react";

const drawerWidth = 240;

const CadastroMedicamento = () => {
    const { control, handleSubmit, formState: { errors }, reset } = useForm();
    const [mensagemSucesso, setMensagemSucesso] = useState("");

    function onSubmit(data) {
        console.log(data);
        chamarAPI(data);
    }

    const chamarAPI = (userData) => {
        const token = localStorage.getItem("user_token");

        if (!token) {
            console.error("Erro: Token não encontrado!");
            return;
        }

        // Usando a variável de ambiente VITE_API_URL
        const apiUrl = `${import.meta.env.VITE_API_URL}/products`;

        axios.post(apiUrl, userData, {
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            }
        })
            .then((response) => {
                console.log("Cadastrado com sucesso", response.data);
                setMensagemComTimeout(setMensagemSucesso, "Cadastro realizado com sucesso!");
                reset();
            })
            .catch((error) => {
                console.error("Erro ao cadastrar:", error.response ? error.response.data : error);
            });
    };

    const setMensagemComTimeout = (setMensagem, mensagem) => {
        setMensagem(mensagem);
        setTimeout(() => {
            setMensagem("");
        }, 5000);
    };

    return (
        <>
            <Navbar />

            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    textAlign: "center",
                    position: "absolute",
                    top: 0,
                    left: drawerWidth,
                    width: `calc(95% - ${drawerWidth}px)`,
                    height: "100vh", // Ocupa toda a altura da tela
                    overflow: "auto", // Evita qualquer rolagem
                }}
            >

                <Typography variant="h4" sx={{ fontWeight: "bold", mb: 2, mt: 4 }}>
                    Cadastrar item
                </Typography>

                {mensagemSucesso && <Alert severity="success" sx={{ mb: 2 }}>{mensagemSucesso}</Alert>}

                <form onSubmit={handleSubmit(onSubmit)}
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "10px",
                        maxWidth: "370px", // Mantém um tamanho fixo para não esticar demais
                        width: "100%",
                        marginTop: 2
                    }}>

                    <Controller
                        name="name"
                        control={control}
                        defaultValue=""
                        rules={{ required: 'O nome é obrigatório' }}
                        render={({ field }) => (
                            <TextField
                                {...field}
                                label="Nome"
                                type="text"
                                variant="outlined"
                                fullWidth
                                error={!!errors.name}
                                helperText={errors.name?.message}
                            />
                        )}
                    />

                    <Controller
                        name="category"
                        control={control}
                        defaultValue=""
                        rules={{ required: 'A categoria é obrigatória' }}
                        render={({ field }) => (
                            <FormControl fullWidth error={!!errors.category}>
                                <InputLabel id="categoria-label">Categoria</InputLabel>
                                <Select {...field} labelId="categoria-label" label="Categoria">
                                    <MenuItem value="MEDICAMENTO">Medicamento</MenuItem>
                                    <MenuItem value="SUPLEMENTO">Suplemento</MenuItem>
                                </Select>
                                <FormHelperText>{errors.category?.message}</FormHelperText>

                            </FormControl>
                        )}
                    />

                    <Controller
                        name="total"
                        control={control}
                        defaultValue=""
                        rules={{ required: 'A quantidade é obrigatória', min: { value: 1, message: 'Deve ser maior que zero' } }}
                        render={({ field }) => (
                            <TextField
                                {...field}
                                label="Quantidade total de doses"
                                type="number"
                                variant="outlined"
                                fullWidth
                                error={!!errors.total}
                                helperText={errors.total?.message}
                            />
                        )}
                    />

                    <Controller
                        name="quantityPerDay"
                        control={control}
                        defaultValue=""
                        rules={{ required: 'A quantidade por dia é obrigatória', min: { value: 1, message: 'Deve ser maior que zero' } }}
                        render={({ field }) => (
                            <TextField
                                {...field}
                                label="Quantidade de doses por dia"
                                type="number"
                                variant="outlined"
                                fullWidth
                                error={!!errors.quantityPerDay}
                                helperText={errors.quantityPerDay?.message}
                            />
                        )}
                    />

                    <Controller
                        name="start"
                        control={control}
                        defaultValue=""
                        rules={{ required: 'A data de início é obrigatória' }}
                        render={({ field }) => (
                            <TextField
                                {...field}
                                label="Data de início"
                                type="date"
                                variant="outlined"
                                fullWidth
                                InputLabelProps={{ shrink: true }}
                                error={!!errors.start}
                                helperText={errors.start?.message}
                            />
                        )}
                    />

                    <Controller
                        name="daysBeforeNotification"
                        control={control}
                        defaultValue=""
                        render={({ field }) => (
                            <TextField
                                {...field}
                                label="Notificar quantos dias antes do término?"
                                type="number"
                                variant="outlined"
                                fullWidth
                                error={!!errors.daysBeforeNotification}
                                helperText={errors.daysBeforeNotification?.message}
                            />
                        )}
                    />

                    <Button type="submit" variant="contained" fullWidth sx={{ mt: 2 }}>
                        Salvar
                    </Button>

                </form>
            </Box>
        </>
    );
};

export default CadastroMedicamento;
