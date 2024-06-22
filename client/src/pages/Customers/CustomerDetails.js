import React, { useState, useEffect } from "react";
import {
  Box,
  Container,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  TextField,
  Button,
  FormControl,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import dayjs from "dayjs";

const CustomerDetails = () => {
  const { id } = useParams();
  const [customer, setCustomer] = useState(null);
  const [newDebt, setNewDebt] = useState({ amount: "", date: "" });
  const [newPayment, setNewPayment] = useState({ amount: "", date: "" });
  const [newBuyer, setNewBuyer] = useState({ name: "", count: "", date: "" });
  const [editItem, setEditItem] = useState(null);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`http://localhost:8000/customers/${id}`)
      .then((response) => {
        const customerData = response.data;

        if (!Array.isArray(customerData.buyers)) {
          customerData.buyers = [];
        }

        setCustomer(customerData);
      })
      .catch((error) => {
        console.error(
          "There was an error fetching the customer details!",
          error
        );
      });
  }, [id]);

  //  const formatAmount = (amount) => {
  //    if (!amount) return "";
  //    return new Intl.NumberFormat().format(parseFloat(amount));
  //  };

  // // Helper function to format amount
  // const formatAmount = (amount) => {
  //   return parseFloat(amount).toFixed(3);
  // };
  
  const formatAmount = (amount) => {
    const parsedAmount = parseFloat(amount);
    return isNaN(parsedAmount)
      ? "0.00"
      : parsedAmount.toLocaleString("en-US", {
          minimumFractionDigits: 3,
          maximumFractionDigits: 3,
        });
  };


  // // Helper function to format date
  // const formatDate = (date) => {
  //   return new Date(date).toISOString().split("T")[0];
  // };

  const handleAddDebt = () => {
    const updatedCustomer = {
      ...customer,
      debts: [
        ...customer.debts,
        {
          ...newDebt,
          amount: parseFloat(newDebt.amount.replace(/,/g, "")),
          date: newDebt.date,
        },
      ],
    };

    axios
      .put(`http://localhost:8000/customers/${id}`, updatedCustomer)
      .then((response) => {
        setCustomer(response.data);
        setNewDebt({ amount: "", date: "" });
      })
      .catch((error) => {
        console.error("Error updating customer:", error);
      });
  };

  const handleAddPayment = () => {
    const updatedCustomer = {
      ...customer,
      payments: [
        ...customer.payments,
        {
          ...newPayment,
          amount: parseFloat(newPayment.amount.replace(/,/g, "")),
          date: newPayment.date,
        },
      ],
    };
    axios
      .put(`http://localhost:8000/customers/${id}`, updatedCustomer)
      .then((response) => {
        setCustomer(response.data);
        setNewPayment({ amount: "", date: "" });
      })
      .catch((error) => {
        console.error("Error updating customer:", error);
      });
  };

  const handleAddBuyer = () => {
    const updatedCustomer = {
      ...customer,
      buyers: [...customer.buyers, { ...newBuyer, date: newBuyer.date }],
    };
    axios
      .put(`http://localhost:8000/customers/${id}`, updatedCustomer)
      .then((response) => {
        setCustomer(response.data);
        setNewBuyer({ name: "", count: "", date: "" });
      })
      .catch((error) => {
        console.error("Error updating customer:", error);
      });
  };

  const calculateTotalDebt = () => {
    let totalDebt = 0;
    if (customer && Array.isArray(customer.debts)) {
      totalDebt = customer.debts.reduce(
        (acc, debt) => acc + parseFloat(debt.amount),
        0
      );
    }
    return formatAmount(totalDebt);
  };

  const calculateTotalPayment = () => {
    let totalPayment = 0;
    if (customer && Array.isArray(customer.payments)) {
      totalPayment = customer.payments.reduce(
        (acc, payment) => acc + parseFloat(payment.amount),
        0
      );
    }
    return formatAmount(totalPayment);
  };

  const handleDeleteCustomer = async () => {
    try {
      await axios.delete(`http://localhost:8000/customers/${id}`);
      console.log("Customer deleted successfully");

      navigate("/customers");
    } catch (error) {
      console.error("Error deleting customer:", error);
    }
  };

  const handleEditCustomer = () => {
    navigate(`/customers/${id}/edit`);
  };

  // Delete functions for Debt, Payment, and Buyer
  const handleDeleteItem = (type, itemId) => {
    const updatedCustomer = {
      ...customer,
      [type]: customer[type].filter((item) => item._id !== itemId),
    };

    axios
      .put(`http://localhost:8000/customers/${id}`, updatedCustomer)
      .then((response) => {
        setCustomer(response.data);
      })
      .catch((error) => {
        console.error("Error updating customer:", error);
      });
  };

  // Edit functions for Debt, Payment, and Buyer
  const handleEditItem = (type, item) => {
    setEditItem({ type, item });
    setEditDialogOpen(true);
  };

  const handleSaveEdit = () => {
    const { type, item } = editItem;
    const updatedCustomer = {
      ...customer,
      [type]: customer[type].map((i) => (i._id === item._id ? item : i)),
    };

    axios
      .put(`http://localhost:8000/customers/${id}`, updatedCustomer)
      .then((response) => {
        setCustomer(response.data);
        setEditDialogOpen(false);
        setEditItem(null);
      })
      .catch((error) => {
        console.error("Error updating customer:", error);
      });
  };

  const formatDate = (date) => {
    return dayjs(date).format("YYYY-MM-DD");
  };

  const calculateRestAmount = () => {
    const restAmount =
      calculateTotalDebt().replace(/,/g, "") -
      calculateTotalPayment().replace(/,/g, "");
    return formatAmount(restAmount);
  };
  

  if (!customer) return <Typography>Loading...</Typography>;

  return (
    <Container>
      <Box sx={{ width: "100%", margin: "20px" }}>
        <Box
          sx={{
            width: "100%",
            margin: "20px",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              marginRight: "20px",
            }}
          >
            <Typography variant="h5" gutterBottom>
              Customer Information
            </Typography>
            <Box sx={{ marginBottom: "20px" }}>
              <Typography
                variant="h5"
                gutterBottom
                sx={{ padding: "5px", margin: "5px" }}
              >
                Name: {customer.name}
              </Typography>
              <Typography
                variant="h5"
                gutterBottom
                sx={{ padding: "5px", margin: "5px" }}
              >
                Phone: {customer.phoneNumber}
              </Typography>
            </Box>
          </Box>

          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-end",
              margin: "20px",
              padding: "10px",
            }}
          >
            <Box>
              <Button
                variant="contained"
                color="primary"
                sx={{ padding: "5px", margin: "5px" }}
                onClick={handleDeleteCustomer}
              >
                Delete
              </Button>
              <Button
                variant="contained"
                color="primary"
                sx={{ padding: "5px", margin: "5px" }}
                onClick={handleEditCustomer}
              >
                Edit
              </Button>
            </Box>
            <Typography
              variant="h5"
              gutterBottom
              sx={{ padding: "5px", margin: "5px" }}
            >
              Total Debt: {calculateTotalDebt()}
            </Typography>
            <Typography
              variant="h5"
              gutterBottom
              sx={{ padding: "5px", margin: "5px" }}
            >
              Total Payment: {calculateTotalPayment()}
            </Typography>
            {/* الباقي */}
            <Typography
              variant="h5"
              gutterBottom
              sx={{ padding: "5px", margin: "5px" }}
            >
              Rest: {calculateRestAmount()}
            </Typography>
          </Box>
        </Box>

        <Grid container spacing={2}>
          <Grid item xs={12} md={4}>
            <Paper sx={{ padding: "16px" }}>
              <Typography variant="h6" gutterBottom>
                Add New Debt
              </Typography>
              <FormControl fullWidth margin="normal">
                <TextField
                  label="Amount"
                  value={newDebt.amount}
                  onChange={(e) =>
                    setNewDebt({
                      ...newDebt,
                      amount: e.target.value.replace(/[^0-9.]/g, ""),
                    })
                  }
                  InputProps={{
                    inputMode: "numeric",
                    pattern: "[0-9]*",
                  }}
                  onBlur={(e) =>
                    setNewDebt({
                      ...newDebt,
                      amount: formatAmount(e.target.value),
                    })
                  }
                />
              </FormControl>
              <FormControl fullWidth margin="normal">
                <TextField
                  label="Date"
                  type="date"
                  value={newDebt.date}
                  onChange={(e) =>
                    setNewDebt({ ...newDebt, date: e.target.value })
                  }
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </FormControl>
              <Button
                variant="contained"
                color="primary"
                onClick={handleAddDebt}
              >
                Add Debt
              </Button>
            </Paper>
          </Grid>
          <Grid item xs={12} md={4}>
            <Paper sx={{ padding: "16px" }}>
              <Typography variant="h6" gutterBottom>
                Add New Payment
              </Typography>
              <FormControl fullWidth margin="normal">
                <TextField
                  label="Amount"
                  value={newPayment.amount}
                  onChange={(e) =>
                    setNewPayment({
                      ...newPayment,
                      amount: e.target.value.replace(/[^0-9.]/g, ""),
                    })
                  }
                  InputProps={{
                    inputMode: "numeric",
                    pattern: "[0-9]*",
                  }}
                  onBlur={(e) =>
                    setNewPayment({
                      ...newPayment,
                      amount: formatAmount(e.target.value),
                    })
                  }
                />
              </FormControl>
              <FormControl fullWidth margin="normal">
                <TextField
                  label="Date"
                  type="date"
                  value={newPayment.date}
                  onChange={(e) =>
                    setNewPayment({ ...newPayment, date: e.target.value })
                  }
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </FormControl>
              <Button
                variant="contained"
                color="primary"
                onClick={handleAddPayment}
              >
                Add Payment
              </Button>
            </Paper>
          </Grid>
          <Grid item xs={12} md={4}>
            <Paper sx={{ padding: "16px" }}>
              <Typography variant="h6" gutterBottom>
                Add New Buyer
              </Typography>
              <FormControl fullWidth margin="normal">
                <TextField
                  label="Name"
                  value={newBuyer.name}
                  onChange={(e) =>
                    setNewBuyer({ ...newBuyer, name: e.target.value })
                  }
                />
              </FormControl>
              <FormControl fullWidth margin="normal">
                <TextField
                  label="Count"
                  value={newBuyer.count}
                  onChange={(e) =>
                    setNewBuyer({ ...newBuyer, count: e.target.value })
                  }
                />
              </FormControl>
              <FormControl fullWidth margin="normal">
                <TextField
                  label="Date"
                  type="date"
                  value={newBuyer.date}
                  onChange={(e) =>
                    setNewBuyer({ ...newBuyer, date: e.target.value })
                  }
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </FormControl>
              <Button
                variant="contained"
                color="primary"
                onClick={handleAddBuyer}
              >
                Add Buyer
              </Button>
            </Paper>
          </Grid>
        </Grid>

        <Grid container spacing={2} sx={{ marginTop: "20px" }}>
          <Grid item xs={12} md={6}>
            <Typography variant="h6" gutterBottom>
              Debts
            </Typography>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Amount</TableCell>
                    <TableCell>Date</TableCell>
                    <TableCell>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {customer.debts.map((debt) => (
                    <TableRow key={debt._id}>
                      <TableCell>{formatAmount(debt.amount)}</TableCell>
                      <TableCell>{formatDate(debt.date)}</TableCell>
                      <TableCell>
                        <Button
                          variant="contained"
                          color="secondary"
                          onClick={() => handleDeleteItem("debts", debt._id)}
                          sx={{ marginRight: "8px" }}
                        >
                          Delete
                        </Button>
                        <Button
                          variant="contained"
                          color="primary"
                          onClick={() => handleEditItem("debts", debt)}
                        >
                          Edit
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>

          <Grid item xs={12} md={6}>
            <Typography variant="h6" gutterBottom>
              Payments
            </Typography>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Amount</TableCell>
                    <TableCell>Date</TableCell>
                    <TableCell>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {customer.payments.map((payment) => (
                    <TableRow key={payment._id}>
                      <TableCell>{formatAmount(payment.amount)}</TableCell>
                      <TableCell>{formatDate(payment.date)}</TableCell>
                      <TableCell>
                        <Button
                          variant="contained"
                          color="secondary"
                          onClick={() =>
                            handleDeleteItem("payments", payment._id)
                          }
                          sx={{ marginRight: "8px" }}
                        >
                          Delete
                        </Button>
                        <Button
                          variant="contained"
                          color="primary"
                          onClick={() => handleEditItem("payments", payment)}
                        >
                          Edit
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
        </Grid>

        <Typography variant="h6" gutterBottom sx={{ marginTop: "20px" }}>
          Buyers
        </Typography>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Count</TableCell>
                <TableCell>Date</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {customer.buyers.map((buyer) => (
                <TableRow key={buyer._id}>
                  <TableCell>{buyer.name}</TableCell>
                  <TableCell>{buyer.count}</TableCell>
                  <TableCell>{formatDate(buyer.date)}</TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      color="secondary"
                      onClick={() => handleDeleteItem("buyers", buyer._id)}
                      sx={{ marginRight: "8px" }}
                    >
                      Delete
                    </Button>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => handleEditItem("buyers", buyer)}
                    >
                      Edit
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
      {/* Edit Dialog */}
      <Dialog open={editDialogOpen} onClose={() => setEditDialogOpen(false)}>
        <DialogTitle>Edit {editItem?.type}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Make changes to the selected {editItem?.type}.
          </DialogContentText>
          {editItem && (
            <Box sx={{ display: "flex", flexDirection: "column" }}>
              {editItem.type !== "buyers" && (
                <TextField
                  label="Amount"
                  type="number"
                  value={editItem.item.amount}
                  onChange={(e) =>
                    setEditItem({
                      ...editItem,
                      item: { ...editItem.item, amount: e.target.value },
                    })
                  }
                  fullWidth
                  sx={{ marginBottom: "20px" }}
                />
              )}
              {editItem.type === "buyers" && (
                <TextField
                  label="Buyer Name"
                  value={editItem.item.name}
                  onChange={(e) =>
                    setEditItem({
                      ...editItem,
                      item: { ...editItem.item, name: e.target.value },
                    })
                  }
                  fullWidth
                  sx={{ marginBottom: "20px" }}
                />
              )}
              {editItem.type === "buyers" && (
                <TextField
                  label="Count"
                  type="number"
                  value={editItem.item.count}
                  onChange={(e) =>
                    setEditItem({
                      ...editItem,
                      item: { ...editItem.item, count: e.target.value },
                    })
                  }
                  fullWidth
                  sx={{ marginBottom: "20px" }}
                />
              )}
              <TextField
                label="Date"
                type="date"
                value={editItem.item.date}
                onChange={(e) =>
                  setEditItem({
                    ...editItem,
                    item: { ...editItem.item, date: e.target.value },
                  })
                }
                fullWidth
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEditDialogOpen(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSaveEdit} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default CustomerDetails;
