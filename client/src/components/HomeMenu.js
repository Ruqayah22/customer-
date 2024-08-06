import React from "react";
import { AppBar, Box, IconButton, Toolbar } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useNavigate } from "react-router-dom";
// import LoginIcon from "@mui/icons-material/Login";
// import SensorOccupiedIcon from "@mui/icons-material/SensorOccupied";
// import LogoutIcon from "@mui/icons-material/Logout";

const HomeMenu = () => {

  // const isUserSignedIn = !!localStorage.getItem("token");
  
  const navigate = useNavigate();

  // const handleSignOut = () => {
  //   localStorage.removeItem("token");
  //   navigate("/login");
  // };

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
          {/* {isUserSignedIn ? ( */}
            {/* <> */}
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
              {/* <IconButton
                size="large"
                edge="end"
                color="inherit"
                aria-label="menu"
                onClick={handleSignOut}
                sx={{ mr: 2, background: "#0000", marginLeft: "90%" }}
              >
                <LogoutIcon />
              </IconButton> */}
            {/* </> */}
          {/* ) : ( */}
            {/* <>
              <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="menu"
                onClick={() => navigate("main")}
                sx={{ mr: 2, background: "#494c52" }}
              >
                <MenuIcon />
              </IconButton>
              <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="menu"
                onClick={() => navigate("/login")}
                sx={{ mr: 2, background: "#494c52" }}
              >
                <LoginIcon />
              </IconButton>
              <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="menu"
                onClick={() => navigate("/register")}
                sx={{ mr: 2, background: "#494c52" }}
              >
                <SensorOccupiedIcon />
              </IconButton>
            </> */}
          {/* )} */}
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default HomeMenu;
