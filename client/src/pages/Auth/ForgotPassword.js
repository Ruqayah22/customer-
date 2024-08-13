import React, { useState } from "react";
import {
  Avatar,
  Box,
  Button,
  // Container,
  CssBaseline,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import axios from "axios";
import toast from "react-hot-toast";
import backgroundImage from "../../images/background.png";
import { useNavigate } from "react-router-dom";

const defaultTheme = createTheme();

const apiUrl = process.env.REACT_APP_SERVER_URL;

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${apiUrl}/auth/forgotPassword`, { email });
      if (res && res.data.success) {
        toast.success(res.data.message);
        navigate("/login");
      } else {
        toast.error(res.data.message);
      }
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
              هل نسيت كلمة السر؟ {/* Forgot Password */}
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
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
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
                إرسال رابط استعادة كلمة المرور {/* Send Reset Link */}
              </Button>
            </Box>
          </Box>
        {/* </Container> */}
        </Box>
      </ThemeProvider>
    // </Layout>
  );
};

export default ForgotPassword;


