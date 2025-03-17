import axios from "axios";
import { useEffect, useState } from "react";
import "../styles/estoque.css";
import { Alert, Box, Button, Card, CardActionArea, CardActions, CardContent, Container, Grid2, Typography } from "@mui/material";
import Navbar from "../components/Navbar";
import EditItemModal from "../components/EditItemModal";
import { format, parseISO, addHours } from "date-fns";

const drawerWidth = 240;

const Estoque = () => {

    const [products, setProducts] = useState([]);
    const [mensagemSucesso, setMensagemSucesso] = useState("");
    const [openEditModal, setOpenEditModal] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);

    const getProducts = async () => {
        try {
            const token = localStorage.getItem("user_token");
            const response = await axios.get("http://localhost:8080/products", {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            });
            setProducts(response.data);
        } catch (error) {
            console.error("Erro ao buscar produtos:", error);
        }
    };

    const deleteProduct = async (id) => {
        try {
            const token = localStorage.getItem("user_token");
            await axios.delete(`http://localhost:8080/products/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            });
            setMensagemComTimeout(setMensagemSucesso, "Produto deletado com sucesso!");
            setProducts(products.filter((item) => item.id !== id));
        } catch (error) {
            console.error("Erro ao deletar produto:", error);
        }
    };

    const updateProduct = async (id, updatedData) => {
        try {
            const token = localStorage.getItem("user_token");
            await axios.put(`http://localhost:8080/products/${id}`, updatedData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            });
            setMensagemComTimeout(setMensagemSucesso, "Produto atualizado com sucesso!");
            setProducts(products.map((item) =>
                item.id === id ? { ...item, ...updatedData } : item
            ));
        } catch (error) {
            console.error("Erro ao atualizar produto:", error);
        }
    };

    const setMensagemComTimeout = (setMensagem, mensagem) => {
        setMensagem(mensagem);
        setTimeout(() => {
            setMensagem("");
        }, 5000);
    };

    useEffect(() => {
        getProducts()
    }, [])

    const handleOpenEditModal = (product) => {
        setSelectedProduct(product);
        setOpenEditModal(true);
    };

    const handleCloseEditModal = () => {
        setOpenEditModal(false);
        setSelectedProduct(null);
    };

    const handleChange = (e) => {
        setSelectedProduct({ ...selectedProduct, [e.target.name]: e.target.value });
    };

    const handleSubmitEdit = async () => {
        if (!selectedProduct) return;

        const { id, name, category, total, quantityPerDay, start, daysBeforeNotification, user } = selectedProduct;

        const formattedProduct = {
            id,
            name,
            category,
            total: Number(total),
            quantityPerDay: Number(quantityPerDay),
            start,
            daysBeforeNotification: daysBeforeNotification || 0,
            user: {
                id: user?.id,
                email: user?.email,
                role: user?.role || "USER",
            }
        };

        await updateProduct(id, formattedProduct);
        handleCloseEditModal();
    };

    const formatDate = (dateString) => {
        const date = parseISO(dateString);
        const dateAdjusted = addHours(date, 3);
        return format(dateAdjusted, "dd/MM/yyyy");
    };

    return (
        <>
            <Navbar />
            <Container
                maxWidth="lg"
                sx={{
                    position: "absolute",
                    left: drawerWidth,
                    top: 0,
                    width: `calc(100% - ${drawerWidth}px)`,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "flex-start",
                    textAlign: "center",
                    overflowY: "auto",
                    padding: 0,
                    marginTop: "64px", // Adiciona espaçamento para não sobrepor o Navbar
                    paddingBottom: 8
                }}
            >

                <Box sx={{ mt: 6, mb: 2, textAlign: "center", pl: 10 }}> {/* Reduzindo margem superior */}
                    <Typography variant="h4" sx={{ fontWeight: "bold" }}>
                        Estoque
                    </Typography>

                    {mensagemSucesso && <Alert severity="success" sx={{ mt: 2 }}>{mensagemSucesso}</Alert>}

                </Box>



                <Box sx={{ width: "100%", display: "flex", justifyContent: "center", mt: 2 }}>
                    <Grid2 container spacing={2} justifyContent="flex-start" sx={{ pl: 10 }}>
                        {products.map((item) => (
                            <Grid2 item xs={12} sm={6} md={4} key={item.id}>
                                <Card sx={{ width: "100%", maxWidth: 350, p: 2, mb: 2, height: "100%" }}>
                                    <CardActionArea>
                                        <CardContent sx={{ textAlign: "left" }}>
                                            <Typography variant="h5" sx={{ marginBottom: "16px" }}>
                                                {item.name}
                                            </Typography>
                                            <Typography variant="body1">Categoria: {item.category}</Typography>
                                            <Typography variant="body1">Total de doses: {item.total}</Typography>
                                            <Typography variant="body1">Dose por dia: {item.quantityPerDay}</Typography>
                                            <Typography variant="body1">Data de início: {formatDate(item.start)}</Typography>
                                            <Typography variant="body1">Data de término: {formatDate(item.endDate)}</Typography>
                                            <Typography variant="body1" sx={{ marginTop: "16px" }}>
                                                <strong>Este item terminará em {item.daysRemaining} dias!</strong>
                                            </Typography>
                                        </CardContent>
                                    </CardActionArea>
                                    <CardActions sx={{ justifyContent: "center" }}>
                                        <Button onClick={() => handleOpenEditModal(item)}>Editar</Button>
                                        <Button onClick={() => deleteProduct(item.id)}>Apagar</Button>
                                    </CardActions>
                                </Card>
                            </Grid2>
                        ))}
                    </Grid2>
                </Box>
            </Container>

            <EditItemModal
                open={openEditModal}
                handleClose={handleCloseEditModal}
                product={selectedProduct}
                handleChange={handleChange}
                handleSubmit={handleSubmitEdit}
            />
        </>
    )
}

export default Estoque;
