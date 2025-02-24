import { FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import "../styles/cadastroMedicamento.css";
import CustomButton from "../styles/customButtom";
import { Controller, useForm } from "react-hook-form";


const CadastroMedicamento = () => {

    const { control, handleSubmit, formState: { errors } } = useForm();
    const onSubmit = data => console.log(data);

    return (

        <form onSubmit={handleSubmit(onSubmit)} style={{ display: "flex", flexDirection: "column", gap: "10px", maxWidth: "400px", marginTop: "-100px" }}>
            <h1>Cadastro</h1>
            <Controller
                name="nome"
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
                        error={!!errors.nome}  // Exibe erro se o campo for inválido
                        helperText={errors.nome?.message}  // Mensagem de erro

                    />
                )}
            />

            <Controller
                name="categoria"
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
                            <MenuItem value="medicine">Medicamento</MenuItem>
                            <MenuItem value="supplement">Suplemento</MenuItem>
                        </Select>
                        {errors.categoria && <p>{errors.categoria.message}</p>}
                    </FormControl>
                )}
            />

            <Controller
                name="quantidade"
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
                        error={!!errors.quantidade}  // Exibe erro se o campo for inválido
                        helperText={errors.quantidade?.message}  // Mensagem de erro

                    />
                )}
            />

            <Controller
                name="quantidadePorDia"
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
                        error={!!errors.quantidadePorDia}  // Exibe erro se o campo for inválido
                        helperText={errors.noquantidadePorDiame?.message}  // Mensagem de erro

                    />
                )}
            />

            <Controller
                name="dataInicio"
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
                        error={!!errors.dataInicio}  // Exibe erro se o campo for inválido
                        helperText={errors.dataInicio?.message}  // Mensagem de erro
                    />
                )}
            />

            {/*
            <TextField label="Nome" type="text" {...register("name")} fullWidth />
            <TextField label="Quantidade" type="number" {...register("quantity")} fullWidth />
            <TextField label="Quantidade por dia" type="number" {...register("quantityPerDay")} fullWidth />
            <TextField label="Data de início" type="date" {...register("start")} fullWidth InputLabelProps={{ shrink: true }} />
            */}

            <CustomButton
                type="submit"
                className="meu-botao"
                fullWidth
                sx={{ marginTop: 2 }} >Salvar</CustomButton>
        </form>
    );
}

export default CadastroMedicamento

