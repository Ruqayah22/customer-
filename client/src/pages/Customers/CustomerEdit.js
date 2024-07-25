import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  FormControl,
  IconButton,
} from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";

const apiUrl = process.env.REACT_APP_SERVER_URL;



const CustomerEdit = () => {
  const { id } = useParams();
  const [customer, setCustomer] = useState({
    name: "",
    phoneNumber: "",
  });
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`${apiUrl}/customers/${id}`)
      .then((response) => {
        setCustomer(response.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the customer data!", error);
      });
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCustomer((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .put(`${apiUrl}/customers/${id}`, customer)
      .then((response) => {
        console.log("Customer updated successfully:", response.data);
        navigate(`/customers/${id}`);
      })
      .catch((error) => {
        console.error("There was an error updating the customer!", error);
      });
  };

  return (
    <Container
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <Box
        sx={{
          width: "100%",
          maxWidth: "500px",
          padding: "20px",
          boxShadow: 3,
          backgroundColor: "white",
        }}
      >
        <Typography
          variant="h4"
          gutterBottom
          textAlign={"center"}
          fontWeight={"bold"}
        >
          {/* Edit Customer */}
          تعديل
        </Typography>
        <form onSubmit={handleSubmit} style={{ direction: "rtl" }}>
          <FormControl fullWidth sx={{ marginBottom: "20px" }}>
            <TextField
              name="name"
              label="الاسم" //"Name"
              variant="outlined"
              value={customer.name}
              onChange={handleChange}
              required
              sx={{
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: "#44484e",
                  },
                  "&:hover fieldset": {
                    borderColor: "#44484e",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "#44484e",
                  },
                },
                "& .MuiInputLabel-root": {
                  color: "#44484e",
                },
                "& .MuiInputLabel-root.Mui-focused": {
                  color: "#44484e",
                },
              }}
            />
          </FormControl>
          <FormControl fullWidth sx={{ marginBottom: "20px" }}>
            <TextField
              name="phoneNumber"
              label="رقم الهاتف" //"Phone Number"
              variant="outlined"
              value={customer.phoneNumber}
              onChange={handleChange}
              required
              sx={{
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: "#44484e",
                  },
                  "&:hover fieldset": {
                    borderColor: "#44484e",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "#44484e",
                  },
                },
                "& .MuiInputLabel-root": {
                  color: "#44484e",
                },
                "& .MuiInputLabel-root.Mui-focused": {
                  color: "#44484e",
                },
              }}
            />
          </FormControl>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <IconButton
              onClick={() => navigate(`/customers/${id}`)}
              title="إلغاء"
            >
              <HighlightOffIcon />
            </IconButton>
            <Button
              variant="contained"
              type="submit"
              sx={{
                marginRight: "10px",
                background: "#44484e",
                fontWeight: "bold",
                fontSize: "18px",
                "&:hover": {
                  backgroundColor: "#5c6169",
                },
              }}
            >
              {/* Save */}
              حفظ
            </Button>
          </Box>
        </form>
      </Box>
    </Container>
  );
};

export default CustomerEdit;
