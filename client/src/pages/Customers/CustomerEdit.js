import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  FormControl,
} from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const CustomerEdit = () => {
  const { id } = useParams();
  const [customer, setCustomer] = useState({
    name: "",
    phoneNumber: "",
  });
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`http://localhost:8000/customers/${id}`)
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
      .put(`http://localhost:8000/customers/${id}`, customer)
      .then((response) => {
        console.log("Customer updated successfully:", response.data);
        navigate(`/customers/${id}`);
      })
      .catch((error) => {
        console.error("There was an error updating the customer!", error);
      });
  };

  return (
    <Container>
      <Box sx={{ marginTop: "20px" }}>
        <Typography variant="h4" gutterBottom>
          Edit Customer
        </Typography>
        <form onSubmit={handleSubmit}>
          <FormControl fullWidth sx={{ marginBottom: "20px" }}>
            <TextField
              name="name"
              label="Name"
              variant="outlined"
              value={customer.name}
              onChange={handleChange}
              required
            />
          </FormControl>
          <FormControl fullWidth sx={{ marginBottom: "20px" }}>
            <TextField
              name="phoneNumber"
              label="Phone Number"
              variant="outlined"
              value={customer.phoneNumber}
              onChange={handleChange}
              required
            />
          </FormControl>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Button
              variant="contained"
              color="primary"
              type="submit"
              sx={{ marginRight: "10px" }}
            >
              Save
            </Button>
            <Button
              variant="contained"
              color="secondary"
              onClick={() => navigate(`/customers/${id}`)}
            >
              Cancel
            </Button>
          </Box>
        </form>
      </Box>
    </Container>
  );
};

export default CustomerEdit;
