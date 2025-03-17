import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import AppBar from '@mui/material/AppBar';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import HomeIcon from '@mui/icons-material/Home';
import InventoryIcon from '@mui/icons-material/Inventory';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import SettingsIcon from '@mui/icons-material/Settings';
import ShieldIcon from '@mui/icons-material/Shield';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

const drawerWidth = 240;

const NAVIGATION = [
    { title: "Home", path: "/home", icon: <HomeIcon /> },
    { title: "Cadastro", path: "/item", icon: <AddCircleIcon /> },
    { title: "Estoque", path: "/estoque", icon: <InventoryIcon /> },
];

const Navbar = () => {

    const navigate = useNavigate();
    const { signout } = useAuth();

    const handleLogout = () => {
        signout();  // Faz o logout do usuário
        navigate("/login");  // Redireciona para a tela de login
    };

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBar position="fixed" sx={{ backgroundColor: "#333", color: "white", zIndex: (theme) => theme.zIndex.drawer + 1 }}>
                <Toolbar>
                    <Typography variant="h5" noWrap component="div">
                        MedTrack
                    </Typography>
                </Toolbar>
            </AppBar>
            <Drawer
                variant="permanent"
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
                }}
            >
                <Toolbar />
                <Box sx={{ overflow: 'auto' }}>
                    <List>
                        {NAVIGATION.map((item) => (
                            <ListItem key={item.title} disablePadding>
                                <ListItemButton onClick={() => navigate(item.path)}> {/* Navega para o path */}
                                    <ListItemIcon>
                                        {item.icon}
                                    </ListItemIcon>
                                    <ListItemText primary={item.title} />
                                </ListItemButton>
                            </ListItem>
                        ))}
                    </List>

                    <Divider />

                    <List>
                        <ListItem disablePadding>
                            <ListItemButton onClick={() => navigate("/configuracoes")}>
                                <ListItemIcon><SettingsIcon /></ListItemIcon>
                                <ListItemText primary="Configurações" />
                            </ListItemButton>
                        </ListItem>
                        <ListItem disablePadding>
                            <ListItemButton onClick={() => navigate("/seguranca")}>
                                <ListItemIcon><ShieldIcon /></ListItemIcon>
                                <ListItemText primary="Segurança" />
                            </ListItemButton>
                        </ListItem>
                        <Divider />
                        <ListItem disablePadding>
                            <ListItemButton onClick={handleLogout}>
                                <ListItemIcon><ExitToAppIcon /></ListItemIcon>
                                <ListItemText primary="Sair" />
                            </ListItemButton>
                        </ListItem>
                    </List>

                </Box>
            </Drawer>
            <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                <Toolbar />
            </Box>
        </Box>
    );
};

export default Navbar