import { Box, Button, FormControl, InputLabel, MenuItem, Modal, Select, TextField, Typography } from "@mui/material";
import PropTypes from "prop-types";

const EditItemModal = ({ open, handleClose, product, handleChange, handleSubmit }) => {
    if (!product) return null;

    return (
        <Modal open={open} onClose={handleClose}>
            <Box sx={{
                position: "absolute", top: "50%", left: "50%",
                transform: "translate(-50%, -50%)", width: 400, bgcolor: "background.paper",
                boxShadow: 24, p: 4, borderRadius: 2
            }}>
                <Typography variant="h6" sx={{ mb: 2 }}>Editar item</Typography>
                <TextField
                    label="Nome" name="name" fullWidth
                    value={product.name || ""} onChange={handleChange} sx={{ mb: 2 }}
                />
                <FormControl fullWidth sx={{ mb: 2 }}>
                    <InputLabel id="categoria-label">Categoria</InputLabel>
                    <Select
                        labelId="categoria-label"
                        name="category"
                        value={product.category || ""}
                        onChange={handleChange}
                        label="Categoria"
                    >
                        <MenuItem value="MEDICAMENTO">Medicamento</MenuItem>
                        <MenuItem value="SUPLEMENTO">Suplemento</MenuItem>
                    </Select>
                </FormControl>
                <TextField
                    label="Total de Doses" name="total" type="number" fullWidth
                    value={product.total || ""} onChange={handleChange} sx={{ mb: 2 }}
                />
                <TextField
                    label="Doses por dia" name="quantityPerDay" type="number" fullWidth
                    value={product.quantityPerDay || ""} onChange={handleChange} sx={{ mb: 2 }}
                />
                <TextField
                    label="Data de Início"
                    name="start"
                    type="date"
                    fullWidth
                    value={product.start ? new Date(product.start).toISOString().split("T")[0] : ""}
                    onChange={handleChange}
                    sx={{ mb: 2 }}
                    InputLabelProps={{ shrink: true }} // Garante que o label não cubra a data
                />
                <Button variant="contained" onClick={handleSubmit} sx={{ mt: 2 }}>Salvar</Button>
                <Button variant="outlined" onClick={handleClose} sx={{ mt: 2, ml: 2 }}>Cancelar</Button>
            </Box>
        </Modal>

    )
};

EditItemModal.propTypes = {
    open: PropTypes.bool.isRequired,
    handleClose: PropTypes.func.isRequired,
    product: PropTypes.shape({
        name: PropTypes.string,
        category: PropTypes.string,
        total: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        quantityPerDay: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        start: PropTypes.string, // Agora validamos o campo start
    }),
    handleChange: PropTypes.func.isRequired,
    handleSubmit: PropTypes.func.isRequired,
};


export default EditItemModal;