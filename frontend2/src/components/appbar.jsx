import { Email, Login, Menu, Person } from "@mui/icons-material";
import { AppBar, Box, Drawer, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Toolbar, Typography } from "@mui/material";
import { useState } from "react";
import { Link } from "react-router-dom";


export default function SimpleAppBar(){
   const [isDrawerOpen, setIsDrawerOpen] = useState(false);

   
    return(
        <>
        {/*Drawer*/}
        <Drawer
         anchor="left"
         open={isDrawerOpen}
         onClose={() => setIsDrawerOpen(false)}
         >
            <Box
             P={2}
             width="250px"
             textAlign="center"
             role = "presentation"
            >
                <Typography 
                    variant="h6"
                    component="div"
                    >
                    Menu
                </Typography>
                <List>
                    <ListItem disablePadding>
                        <Link to = '/login'>
                      < ListItemButton>
                        <ListItemIcon>
                            <Login />
                        </ListItemIcon>
                        <ListItemText primary="Login" />
                      </ListItemButton>
                      </Link>
                    </ListItem>
                </List>
             </Box>
        </Drawer>
            {/*Toolbar*/}
            <Box sx={{ flexGrow: 1 }}>
                <AppBar position=" static">
                    <Toolbar variant="dense">
                        <IconButton
                            edge="start"
                            color="inherit"
                            onClick={() => setIsDrawerOpen(true)}
                            aria-label="menu" sx={{ mr: 2 }}
                        >
                            <Menu />
                        </IconButton>
                        <Typography variant="h6" color="inherit" component="div">
                            To-Do-LIST APP
                        </Typography>
                    </Toolbar>
                </AppBar>
            </Box></>
    )
}
