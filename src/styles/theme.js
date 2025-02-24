import { createTheme } from "@mui/material/styles";

const theme = createTheme({
    palette: {
        primary: {
            main: '#BEBEBE', // Cinza claro para o fundo
        },
        secondary: {
            main: '#333', // Cinza escuro para o texto
        },
    },
    typography: {
        button: {
            fontWeight: 'bold', // Fonte negrito
            color: '#333', // Cor do texto (cinza escuro)
        },
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    backgroundColor: '#BEBEBE', // Cor de fundo do botão
                    borderRadius: '8px', // Bordas arredondadas
                    '&:hover': {
                        backgroundColor: '#AFAFAF', // Cor ao passar o mouse
                    },
                },
            },
        },
    },
});

export default theme;

