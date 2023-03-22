import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import HomeIcon from "@mui/icons-material/Home";
import LockIcon from "@mui/icons-material/Lock";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
const drawerWidth = 240;

const styles = {
  drawer: {
    zIndex: 1200,
  },
};

const icons=[<HomeIcon/>,<LockIcon />]
export default function UserSidebar() {
  const navigate = useNavigate();
  let CustomListItem = ({ to, primary, icon }) => (
    <ListItemButton
      component={Link}
      to={to}
      selected={to === navigate.pathname}
    >
        <ListItemIcon children={icons[icon]}/>
                
              
      <ListItemText primary={primary} />
    </ListItemButton>
  );
  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />

      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
        variant="permanent"
        anchor="left"
        style={styles.drawer}
      >
        <Toolbar />
        <Divider />
        <List>
            
          <CustomListItem to="" primary="Dashboard" disablePadding icon={0} />
          
          <CustomListItem to="/account" primary="Account" disablePadding icon={1} />
        </List>
      </Drawer>
      <Box
        component="main"
        sx={{ flexGrow: 1, bgcolor: "background.default", p: 3 }}
      >
        <Toolbar />
      </Box>
    </Box>
  );
}
