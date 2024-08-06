import React from "react";
import {
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  styled,
} from "@mui/material";
import {
  AccountCircle,
  Badge,
  ChevronLeft,
  // Description,
  // Money,
  // PriceCheck,
  // QueryStats,
  LocalGroceryStore,
} from "@mui/icons-material";

import MuiDrawer from "@mui/material/Drawer";
import { Link } from "react-router-dom";

const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  backgroundColor: "#44484e",
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  backgroundColor: "#44484e",

  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
  backgroundColor: "#44484e",
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

const SideListPages = ({ open, setOpen }) => {
  return (
    <>
      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <IconButton sx={{ color: "#ffffff" }} onClick={() => setOpen(false)}>
            <ChevronLeft />
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {/* Main */}
          {/* <Link
            to={"/main"}
            style={{
              textDecoration: "none",
              color: "#ffff",
            }}
            title="Go to main page"
          >
            <ListItem disablePadding sx={{ display: "block", margin: "5px 0" }}>
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? "initial" : "center",
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : "auto",
                    justifyContent: "center",
                    color: "#ffffff",
                  }}
                >
                  <QueryStats />
                </ListItemIcon>
                <ListItemText
                  sx={{
                    opacity: open ? 1 : 0,
                    color: "white",
                  }}
                >
                  الرئيسية
                </ListItemText>
              </ListItemButton>
            </ListItem>
          </Link> */}
          {/* Employees */}
          <Link
            to={"/employees"}
            style={{ textDecoration: "none", color: "#ffff" }}
            title="Go to employees page"
          >
            <ListItem disablePadding sx={{ display: "block", margin: "5px 0" }}>
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? "initial" : "center",
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : "auto",
                    justifyContent: "center",
                    color: "#ffffff",
                  }}
                >
                  <Badge />
                </ListItemIcon>
                <ListItemText sx={{ opacity: open ? 1 : 0, color: "white" }}>
                  العمال
                </ListItemText>
              </ListItemButton>
            </ListItem>
          </Link>
          {/* Customers */}
          <Link
            to={"/customer"}
            style={{ textDecoration: "none", color: "#ffff" }}
            title="Go to customers page"
          >
            <ListItem disablePadding sx={{ display: "block", margin: "5px 0" }}>
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? "initial" : "center",
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : "auto",
                    justifyContent: "center",
                    color: "#ffffff",
                  }}
                >
                  <AccountCircle />
                </ListItemIcon>
                <ListItemText sx={{ opacity: open ? 1 : 0, color: "white" }}>
                  الزبائن
                </ListItemText>
              </ListItemButton>
            </ListItem>
          </Link>
          {/* Income */}
          {/* <Link
            to={"/income"}
            style={{ textDecoration: "none", color: "#ffff" }}
            title="Go to income page"
          >
            <ListItem disablePadding sx={{ display: "block", margin: "5px 0" }}>
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? "initial" : "center",
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : "auto",
                    justifyContent: "center",
                    color: "#ffffff",
                  }}
                >
                  <Money />
                </ListItemIcon>
                <ListItemText sx={{ opacity: open ? 1 : 0, color: "white" }}>
                  الدخل
                </ListItemText>
              </ListItemButton>
            </ListItem>
          </Link> */}
          {/* Expenses */}
          {/* <Link
            to={"/expenses"}
            style={{ textDecoration: "none", color: "#ffff" }}
            title="Go to Expenses page"
          >
            <ListItem disablePadding sx={{ display: "block", margin: "5px 0" }}>
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? "initial" : "center",
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : "auto",
                    justifyContent: "center",
                    color: "#ffffff",
                  }}
                >
                  <PriceCheck />
                </ListItemIcon>
                <ListItemText sx={{ opacity: open ? 1 : 0, color: "white" }}>
                  المصاريف
                </ListItemText>
              </ListItemButton>
            </ListItem>
          </Link> */}
          {/* Stored */}
          <Link
            to={"/stored"}
            style={{ textDecoration: "none", color: "#ffff" }}
            title="Go to store page"
          >
            <ListItem disablePadding sx={{ display: "block", margin: "5px 0" }}>
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? "initial" : "center",
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : "auto",
                    justifyContent: "center",
                    color: "#ffffff",
                  }}
                >
                  <LocalGroceryStore />
                </ListItemIcon>
                <ListItemText
                  sx={{
                    opacity: open ? 1 : 0,
                    color: "white",
                  }}
                >
                  المخزن
                </ListItemText>
              </ListItemButton>
            </ListItem>
          </Link>
          {/* Notes */}
          {/* <Link
            to={"/notes"}
            style={{ textDecoration: "none", color: "#ffff" }}
            title="Go to notes page"
          >
            <ListItem disablePadding sx={{ display: "block", margin: "5px 0" }}>
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? "initial" : "center",
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : "auto",
                    justifyContent: "center",
                    color: "#ffffff",
                  }}
                >
                  <Description />
                </ListItemIcon>
                <ListItemText
                  sx={{
                    opacity: open ? 1 : 0,
                    color: "white",
                  }}
                >
                  الملاحظات
                </ListItemText>
              </ListItemButton>
            </ListItem>
          </Link> */}
        </List>
        <Divider />
      </Drawer>
    </>
  );
};

export default SideListPages;
