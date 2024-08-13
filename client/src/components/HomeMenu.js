import React from "react";
import { AppBar, Box, IconButton, ListItem, ListItemButton, ListItemText, Toolbar, Typography } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/auth";
import toast from "react-hot-toast";
// import LoginIcon from "@mui/icons-material/Login";
// import SensorOccupiedIcon from "@mui/icons-material/SensorOccupied";
import LogoutIcon from "@mui/icons-material/Logout";

const HomeMenu = () => {
const [auth, setAuth] = useAuth();

const handleLogout = (event) => {
  event.preventDefault();
  try {
    setAuth({
      ...auth,
      user: null,
      token: "",
    });
    localStorage.removeItem("auth");
    toast.success("Logout Successfully");
    navigate("/login");
  } catch (error) {
    console.log(error);
    toast.error("Something went wrong");
  }
};
  
  const navigate = useNavigate();

  

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="static"
        elevation={0}
        style={{
          background: "none",
        }}
      >
        <Toolbar>
          {!auth?.user ? (
            <>
              <ListItem disablePadding>
                <ListItemButton sx={{ textAlign: "center" }}>
                  <ListItemText>
                    <Typography
                      variant="body1"
                      sx={{ fontSize: "20px", fontWeight: "bold" }}
                      onClick={() => navigate("/register")}
                    >
                      حساب جديد {/* Register */}
                    </Typography>
                  </ListItemText>
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding>
                <ListItemButton sx={{ textAlign: "center" }}>
                  <ListItemText>
                    <Typography
                      variant="body1"
                      sx={{ fontSize: "20px", fontWeight: "bold" }}
                      onClick={() => navigate("/login")}
                    >
                      تسجيل دخول {/* Login */}
                    </Typography>
                  </ListItemText>
                </ListItemButton>
              </ListItem>
            </>
          ) : (
            <>
              <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="menu"
                onClick={() => navigate("customer")}
                sx={{ mr: 2, background: "#494c52", marginLeft: "15px" }}
              >
                <MenuIcon />
              </IconButton>
              <IconButton
                size="large"
                edge="end"
                color="inherit"
                aria-label="menu"
                onClick={handleLogout}
                sx={{ mr: 2, background: "#0000", marginLeft: "90%" }}
              >
                <LogoutIcon />
              </IconButton>
              
            </>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default HomeMenu;
