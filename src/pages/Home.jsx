import { Box, Button } from "@mui/material";
import "../styles/home.css";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";

const drawerWidth = 240;

const Home = () => {
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
                    marginLeft: `${drawerWidth}px`,
                    marginTop: "-100px",
                    width: `calc(100% - ${drawerWidth}px)`, // Ocupar apenas a área sem drawer
                }}
            >
                <h1 style={{ marginBottom: "4%" }}>MedTrack</h1>
                <p>Gerencie seus medicamentos e suplementos de forma simples e eficiente.</p>
                <Link to="/item">
                    <Button sx={{ marginTop: 4 }} >Cadastrar item</Button>
                </Link>
            </Box >
        </>
    )
}

export default Home