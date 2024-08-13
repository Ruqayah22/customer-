import React, { useState } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import {
  Avatar,
  Box,
  Button,
  // Container,
  CssBaseline,
  Grid,
  IconButton,
  InputAdornment,
  Link,
  TextField,
  Typography,
} from "@mui/material";

import { useAuth } from "../../context/auth";
import backgroundImage from "../../images/background.png";

const defaultTheme = createTheme();

const initialValue = {
  email: "",
  password: "",
  showPassword: false,
};

const apiUrl = process.env.REACT_APP_SERVER_URL;


const Login = () => {
  const [user, setUser] = useState(initialValue);
  const [auth, setAuth] = useAuth(); 

  const onValueChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${apiUrl}/auth/login`, user);
      if (res && res.data.success) {
        toast.success(res.data && res.data.message);
        setAuth({
          ...auth,
          user: res.data.user,
          token: res.data.token,
        });
        localStorage.setItem("auth", JSON.stringify(res.data));
        navigate("/");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  const handleShowPassword = (e) => {
    e.preventDefault();
    try {
      setUser((prevState) => ({
        ...prevState,
        showPassword: !prevState.showPassword,
      }));
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  return (
    // <Layout>
    <ThemeProvider theme={defaultTheme}>
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* <Container component="main" maxWidth="xs" sx={{ margin: "5% 25%" }}> */}
          <CssBaseline />
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              width: "500px",
              padding: "30px",
              backgroundColor: "white",
              borderRadius: "10px",
              boxShadow: "5px 5px 10px 0px rgba(255, 255, 255, 0.2)",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "#44484e", width: 66, height: 66 }}>
              <LockOutlinedIcon sx={{ width: 40, height: "auto" }} />
            </Avatar>
            <Typography component="h1" variant="h4" sx={{ fontWeight: "bold" }}>
              تسجيل الدخول {/* Sign in */}
            </Typography>
            <Box
              component="form"
              onSubmit={handleSubmit}
              noValidate
              sx={{ mt: 1 }}
            >
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="email"
                    value={user.email}
                    onChange={(e) => onValueChange(e)}
                    label="Email"
                    name="email"
                    autoComplete="email"
                    autoFocus
                    sx={{
                      "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
                        {
                          borderColor: "#91C7B1",
                        },
                      "& .MuiInputLabel-root.Mui-focused": {
                        color: "#91C7B1",
                      },
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name="password"
                    value={user.password}
                    type={user.showPassword ? "text" : "password"}
                    onChange={(e) => onValueChange(e)}
                    label="Password"
                    id="password"
                    autoComplete="new-password"
                    sx={{
                      "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
                        {
                          borderColor: "#91C7B1",
                        },
                      "& .MuiInputLabel-root.Mui-focused": {
                        color: "#91C7B1",
                      },
                    }}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton onClick={handleShowPassword} edge="end">
                            {user.showPassword ? (
                              <VisibilityIcon />
                            ) : (
                              <VisibilityOffIcon />
                            )}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{
                  mt: 3,
                  mb: 2,
                  fontSize: "25px",
                  bgcolor: "#44484e",
                  "&:hover": {
                    bgcolor: "#80868e",
                  },
                }}
              >
                تسجيل الدخول {/* Sign In */}
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link
                    href="/forgotPassword"
                    variant="body1"
                    sx={{
                      color: "#44484e",
                      textDecorationColor: "#fff",
                    }}
                  >
                    هل نسيت كلمة السر ؟{/* Forgot password? */}
                  </Link>
                </Grid>
                <Grid item>
                  <Link
                    href="/register"
                    variant="body1"
                    sx={{
                      color: "#44484e",
                      textDecorationColor: "#fff",
                    }}
                  >
                    {/* {"Don't have an account? Sign Up"} */}
                    {"ليس لديك حساب؟ حساب جديد"}
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        {/* </Container> */}
      </Box>
    </ThemeProvider>
    // </Layout>
  );
};

export default Login;
