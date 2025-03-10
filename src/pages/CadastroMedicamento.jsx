import { Box, Button, FormControl, InputLabel, MenuItem, Select, TextField, Typography } from "@mui/material";
import "../styles/cadastroMedicamento.css";
import { Controller, useForm } from "react-hook-form";
import axios from "axios";
import Navbar from "../components/Navbar";


const CadastroMedicamento = () => {

    const { control, handleSubmit, formState: { errors } } = useForm();

    function onSubmit(data) {
        console.log(data);
        chamarAPI(data);
    }

    const chamarAPI = (userData) => {
        axios.post("http://localhost:8080/products", userData).then((response) => {
            console.log(response.status);
            console.log("Cadastrado com sucesso")
        });
    }

    return (
        <>
            <Navbar />

            <form onSubmit={handleSubmit(onSubmit)} style={{ display: "flex", flexDirection: "column", gap: "10px", maxWidth: "400px", marginTop: "-100px" }}>
                <Box sx={{ display: "flex", justifyContent: "center", mt: 3 }}>
                    <Typography variant="h4" sx={{ fontWeight: "bold", mb: 3 }}>
                        Cadastro
                    </Typography>

                </Box>
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
                        <FormControl fullWidth error={!!errors.categoria}>
                            <InputLabel id="categoria-label">Categoria</InputLabel>
                            <Select
                                {...field}
                                labelId="categoria-label"
                                label="Categoria"
                            >
                                <MenuItem value="MEDICAMENTO">Medicamento</MenuItem>
                                <MenuItem value="SUPLEMENTO">Suplemento</MenuItem>
                            </Select>
                            {errors.categoria && <p>{errors.category.message}</p>}
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
                            label="Quantidade"
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
                            label="Quantidade por dia"
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

                <Button
                    type="submit"
                    fullWidth
                    sx={{ marginTop: 2 }} >Salvar</Button>
            </form>
        </>
    )
}

export default CadastroMedicamento

