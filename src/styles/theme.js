import "@fontsource/poppins";
import { createTheme } from "@mui/material/styles";

const theme = createTheme({
    palette: {
        primary: {
            main: '#BEBEBE',
        },
        secondary: {
            main: '#333',
        },
    },
    typography: {
        fontFamily: "Poppins, Arial, sans-serif",
        button: {
            fontWeight: 'bold',
            color: '#333',
        },
    },
    components: {
        MuiButton: {
            defaultProps: {
                variant: "contained",
            },
            styleOverrides: {
                root: {
                    backgroundColor: "#f0f0f0",
                    color: "#000",
                    fontSize: "16px",
                    fontFamily: "Poppins, Arial, sans-serif",
                    fontWeight: 500,
                    padding: "10px 20px",
                    borderRadius: "8px",
                    boxShadow: "none",
                    textTransform: "none",
                    "&:hover": {
                        backgroundColor: "#d9d9d9",
                        boxShadow: "none",
                    },
                },
            },
        },
    },
});

export default theme;
