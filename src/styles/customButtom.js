import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';

const CustomButton = styled(Button)({
    backgroundColor: "#f0f0f0",
    color: "#000",
    fontSize: "16px",
    fontFamily: "Poppins, serif",
    fontWeight: 500,
    padding: "10px 20px",
    borderRadius: "8px",
    boxShadow: "none",
    textTransform: "none",
    "&:hover": {
        backgroundColor: "#d9d9d9",
        boxShadow: "none",
    }
});

export default CustomButton;
