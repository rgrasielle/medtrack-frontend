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
            const token = localStorage.getItem("user_token"); // Pega o token armazenado no login
            const response = await axios.get("http://localhost:8080/products", {
                headers: {
                    Authorization: `Bearer ${token}`,  // Envia o token na requisição
                }
            });
            console.log(response.data);
            setProducts(response.data);
        } catch (error) {
            console.error("Erro ao buscar produtos:", error);
        }
    };

    const deleteProduct = async (id) => {
        try {
            const token = localStorage.getItem("user_token"); // Pega o token armazenado no login
            await axios.delete(`http://localhost:8080/products/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,  // Envia o token na requisição
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
            const token = localStorage.getItem("user_token"); // Pegando o token do localStorage
            await axios.put(`http://localhost:8080/products/${id}`, updatedData, {
                headers: {
                    Authorization: `Bearer ${token}`, // Garantindo que o token seja enviado
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
            setMensagem("");  // Limpa a mensagem após 5 segundos
        }, 5000);
    };

    useEffect(() => {
        getProducts()
    }, [])

    // Função para abrir o modal de edição com os dados do produto
    const handleOpenEditModal = (product) => {
        setSelectedProduct(product);
        setOpenEditModal(true);
    };

    // Função para fechar o modal de edição
    const handleCloseEditModal = () => {
        setOpenEditModal(false);
        setSelectedProduct(null);
    };

    // Função para atualizar os valores do produto durante a edição
    const handleChange = (e) => {
        setSelectedProduct({ ...selectedProduct, [e.target.name]: e.target.value });
    };

    const handleSubmitEdit = async () => {
        if (!selectedProduct) return;

        const formattedProduct = {
            id: selectedProduct.id,
            name: selectedProduct.name,
            category: selectedProduct.category,
            total: Number(selectedProduct.total),
            quantityPerDay: Number(selectedProduct.quantityPerDay),
            start: selectedProduct.start,
            daysBeforeNotification: selectedProduct.daysBeforeNotification || 0,
            user: {
                id: selectedProduct.user?.id,
                email: selectedProduct.user?.email,
                role: selectedProduct.user?.role || "USER"
            }
        };

        await updateProduct(selectedProduct.id, formattedProduct);
        handleCloseEditModal();
    };

    const formatDate = (dateString) => {
        const date = parseISO(dateString); // Converte a string para um objeto Date corretamente
        const dateAdjusted = addHours(date, 3); // Ajusta para UTC-3 (Brasília)
        return format(dateAdjusted, "dd/MM/yyyy"); // Formata a data
    };

    return (
        <>
            <Navbar />
            <Container maxWidth="lg" sx={{
                display: "flex",
                flexDirection: "column",
                marginLeft: `${drawerWidth}px`,
                marginTop: "-100px",
                width: `calc(1500px - ${drawerWidth}px)`,
            }}>

                <Box sx={{ display: "flex", mt: 10 }}>
                    <Typography variant="h4" sx={{ fontWeight: "bold", mb: 3 }}>
                        Estoque
                    </Typography>
                </Box>

                {mensagemSucesso && <Alert severity="success">{mensagemSucesso}</Alert>}

                <Box sx={{ display: "flex", mt: 3 }}>
                    <Grid2 container spacing={2}>
                        {products.map((item) => (
                            <Grid2 item xs={12} sm={6} md={4} key={item.id}>
                                <Card sx={{ width: "100%", maxWidth: 600, p: 2, mb: 2, height: "100%" }}>
                                    <CardActionArea>
                                        <CardContent sx={{ textAlign: "left" }}>
                                            <h3 style={{ marginBottom: "16px" }}>{item.name}</h3>
                                            <p>Categoria: {item.category}</p>
                                            <p>Total de doses: {item.total}</p>
                                            <p>Dose por dia: {item.quantityPerDay}</p>
                                            <p>Data de início: {formatDate(item.start)}</p>
                                            <p>Data de término: {formatDate(item.endDate)}</p>


                                            <p style={{ marginTop: "16px" }}><strong>Este item terminará em {item.daysRemaining} dias!</strong></p>
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



export default Estoque