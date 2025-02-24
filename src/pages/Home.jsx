import { Box } from "@mui/material";
import CustomButton from "../styles/customButtom";
import "../styles/home.css";
import { Link } from "react-router-dom";

const drawerWidth = 240;

const Home = () => {
    return (

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
            <h1>MedTrack</h1>
            <p>Gerencie seus medicamentos e suplementos de forma simples e eficiente.</p>
            <Link to="/cadastro">
                <CustomButton sx={{ marginTop: 4 }} >Cadastrar</CustomButton>
            </Link>
        </Box >
    )
}

export default Home