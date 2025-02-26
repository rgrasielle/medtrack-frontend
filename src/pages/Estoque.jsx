import axios from "axios";
import { useEffect, useState } from "react";
import "../styles/estoque.css";
import { Box, Button, Card, CardActionArea, CardActions, CardContent, Container, Grid2, Typography } from "@mui/material";
import Navbar from "../components/Navbar";

const drawerWidth = 240;

const Estoque = () => {

    const [products, setProducts] = useState([]);

    const getProducts = async () => {
        try {
            const response = await axios.get("http://localhost:8080/products");
            console.log(response.data);
            setProducts(response.data);
        } catch (error) {
            console.error("Erro ao buscar produtos:", error);
        }
    };

    const deleteProduct = async (id) => {
        try {
            await axios.delete(`http://localhost:8080/products/${id}`);
            alert("Produto deletado com sucesso!");
            setProducts(products.filter((item) => item.id !== id));
        } catch (error) {
            console.error("Erro ao deletar produto:", error);
        }
    };

    const updateProduct = async (id, updatedData) => {
        try {
            await axios.put(`http://localhost:8080/products/${id}`, updatedData);
            alert("Produto atualizado com sucesso!");
            setProducts(products.map((item) =>
                item.id === id ? { ...item, ...updatedData } : item
            ));
        } catch (error) {
            console.error("Erro ao atualizar produto:", error);
        }
    };

    useEffect(() => {
        getProducts()
    }, [])

    return (
        <>
            <Navbar />
            <Container maxWidth="lg" sx={{
                display: "flex",
                flexDirection: "column",
                marginLeft: `${drawerWidth}px`,
                marginTop: "-100px",
                width: `calc(100% - ${drawerWidth}px)`,
            }}>

                <Box sx={{ display: "flex", mt: 10 }}>
                    <Typography variant="h4" sx={{ fontWeight: "bold", mb: 3 }}>
                        Estoque
                    </Typography>
                </Box>

                <Box sx={{ display: "flex", mt: 3 }}>
                    <Grid2 container spacing={2}>
                        {products.map((item) => (
                            <Grid2 item xs={12} sm={6} md={4} key={item.id}>
                                <Card sx={{ width: "100%", maxWidth: 600, p: 2, mb: 2, height: "100%" }}>
                                    <CardActionArea>
                                        <CardContent sx={{ textAlign: "left" }}>
                                            <h3 style={{ marginBottom: "16px" }}>{item.name}</h3>
                                            <p>Categoria: {item.category}</p>
                                            <p>Quantidade: {item.total}</p>
                                            <p>Quantidade por dia: {item.quantityPerDay}</p>
                                            <p>Data do início: {new Date(item.start).toLocaleDateString("pt-BR")}</p>
                                        </CardContent>
                                    </CardActionArea>
                                    <CardActions sx={{ justifyContent: "center" }}>
                                        <Button onClick={() => updateProduct(item.id)}>Editar</Button>
                                        <Button onClick={() => deleteProduct(item.id)}>Apagar</Button>
                                    </CardActions>
                                </Card>
                            </Grid2>
                        ))}
                    </Grid2>
                </Box>
            </Container>
        </>
    )
}



export default Estoque