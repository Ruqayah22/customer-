import React, { useMemo, useState } from "react";
import {
  Box,
  createTheme,
  CssBaseline,
  IconButton,
  styled,
  ThemeProvider,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";

import MuiAppBar from "@mui/material/AppBar";
import { useNavigate } from "react-router-dom";
import { Brightness4, Brightness7, Home } from "@mui/icons-material";
import AllCustomers from "./AllCustomers";

const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));

const Customers = () => {
  const [dark, setDark] = useState(true);

  const darkTheme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: dark ? "dark" : "light",
        },
      }),
    [dark]
  );

  

  const navigate = useNavigate();

  return (
    // <AllCustomers />
    <ThemeProvider theme={darkTheme}>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <AppBar position="fixed"  sx={{ background: "#44484e" }}>
          <Toolbar>
            <Tooltip title="Go back to home page">
              <IconButton
                sx={{ mr: 1 }}
                onClick={() => navigate("/")}
                color="inherit"
              >
                <Home />
              </IconButton>
            </Tooltip>
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ flexGrow: 1 }}
            >
              Customers
            </Typography>
            <IconButton onClick={() => setDark(!dark)}>
              {dark ? <Brightness7 /> : <Brightness4 />}
            </IconButton>
          </Toolbar>
        </AppBar>
        <Box component="main" sx={{ flexGrow: 1, p: 2 }}>
          <DrawerHeader />
          <AllCustomers />
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default Customers;
