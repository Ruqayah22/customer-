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
  // DialogContentText,
  DialogTitle,
  IconButton,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import dayjs from "dayjs";

import ClearIcon from "@mui/icons-material/Clear";
import EditIcon from "@mui/icons-material/Edit";
import PrintIcon from "@mui/icons-material/Print";

import PrintDialog from "./PrintDialog";

const CustomerDetails = () => {
  const { id } = useParams();
  const [customer, setCustomer] = useState(null);
  const [newDebt, setNewDebt] = useState({ amount: "", date: "" });
  const [newPayment, setNewPayment] = useState({ amount: "", date: "" });
  const [newBuyer, setNewBuyer] = useState({ name: "", count: "", date: "" });
  const [editItem, setEditItem] = useState(null);
  const [editDialogOpen, setEditDialogOpen] = useState(false);

  const [printDialogOpen, setPrintDialogOpen] = useState(false);
  const [selectedBuyer, setSelectedBuyer] = useState(null);

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

  const formatAmount = (amount) => {
    const parsedAmount = parseFloat(amount);
    return isNaN(parsedAmount)
      ? "0.00"
      : parsedAmount.toLocaleString("en-US", {
          minimumFractionDigits: 3,
          maximumFractionDigits: 3,
        });
  };

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
        setNewBuyer({ name: "", count: "", price: "", date: "" });
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

  function formatCurrency(amount, currency) {
    switch (currency) {
      case "$":
        return `$${amount}`;
      case "IQD":
        return `${formatAmount(amount)} IQD`;
      default:
        return `${amount.toFixed(2)}`;
    }
  }

  // // Function to handle printing buyer information
  // const handlePrintBuyer = (buyer) => {
  //   setSelectedBuyer(buyer);
  //   setPrintDialogOpen(true);
  // };

  // Function to handle printing buyer information
  const handlePrintBuyer = (buyer) => {
    setSelectedBuyer(buyer);
    setPrintDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setPrintDialogOpen(false);
    setSelectedBuyer(null); // Clear selected buyer after closing
  };

  return (
    <Container>
      <Typography
        variant="h4"
        component="h1"
        gutterBottom
        style={{
          textAlign: "center",
          fontWeight: "bold",
          margin: "30px 0 10px 0",
        }}
      >
        {/* Customer Information */}
        معلومات الزبون
      </Typography>
      <Box sx={{ width: "100%", margin: "20px", direction: "rtl" }}>
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
            <Box sx={{ marginBottom: "20px" }}>
              <Typography
                variant="h5"
                gutterBottom
                sx={{ padding: "5px", margin: "5px", fontWeight: "bold" }}
              >
                {/* Name: {customer.name} */}
                الاسم: {customer.name}
              </Typography>
              <Typography
                variant="h5"
                gutterBottom
                sx={{ padding: "5px", margin: "5px", fontWeight: "bold" }}
              >
                {/* Phone: {customer.phoneNumber} */}
                رقم الهاتف: {customer.phoneNumber}
              </Typography>
              <Box>
                <IconButton
                  variant="contained"
                  color="primary"
                  sx={{ padding: "5px", margin: "5px", color: "#44484e" }}
                  onClick={handleDeleteCustomer}
                >
                  <ClearIcon />
                </IconButton>
                {/* <Button
                variant="contained"
                color="primary"
                sx={{ padding: "5px", margin: "5px" }}
                onClick={handleDeleteCustomer}
              >
                Delete
              </Button> */}
                <IconButton
                  variant="contained"
                  color="primary"
                  sx={{ padding: "5px", margin: "5px", color: "#44484e" }}
                  onClick={handleEditCustomer}
                >
                  <EditIcon />
                </IconButton>
                {/* <Button
                variant="contained"
                color="primary"
                sx={{ padding: "5px", margin: "5px" }}
                onClick={handleEditCustomer}
              >
                Edit
              </Button> */}
              </Box>
            </Box>
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-end",
              marginButton: "20px",
              padding: "10px",
            }}
          >
            <Typography
              variant="h5"
              gutterBottom
              sx={{ padding: "5px", margin: "5px", fontWeight: "bold" }}
            >
              {/* Total Debt: {calculateTotalDebt()} */}
              مجموع الديون: {calculateTotalDebt()}
            </Typography>
            <Typography
              variant="h5"
              gutterBottom
              sx={{ padding: "5px", margin: "5px", fontWeight: "bold" }}
            >
              {/* Total Payment: {calculateTotalPayment()} */}
              مجموع التسديد: {calculateTotalPayment()}
            </Typography>
            {/* الباقي */}
            <Typography
              variant="h5"
              gutterBottom
              sx={{ padding: "5px", margin: "5px", fontWeight: "bold" }}
            >
              {/* Rest: {calculateRestAmount()} */}
              الباقي: {calculateRestAmount()}
            </Typography>
          </Box>
        </Box>

        <Grid container spacing={2}>
          {/* add debt */}
          <Grid item xs={12} md={4}>
            <Paper sx={{ padding: "16px", textAlign: "center" }}>
              <Typography variant="h5" gutterBottom fontWeight={"bold"}>
                {/* Add New Debt */}
                اضافة دين
              </Typography>
              <FormControl fullWidth margin="normal">
                <TextField
                  label="الدين" //"Amount"
                  value={newDebt.amount}
                  onChange={(e) =>
                    setNewDebt({
                      ...newDebt,
                      amount: e.target.value.replace(/[^0-9.]/g, ""),
                    })
                  }
                  // InputProps={{
                  //   inputMode: "numeric",
                  //   pattern: "[0-9]*",
                  // }}
                  onBlur={(e) =>
                    setNewDebt({
                      ...newDebt,
                      amount: formatAmount(e.target.value),
                    })
                  }
                  variant="standard"
                  InputProps={{
                    style: { textAlign: "right" },
                    inputMode: "numeric",
                    pattern: "[0-9]*",
                  }}
                  InputLabelProps={{ style: { right: 30, left: "auto" } }}
                />
              </FormControl>
              <FormControl fullWidth margin="normal">
                <TextField
                  // label="Date"
                  type="date"
                  value={newDebt.date}
                  onChange={(e) =>
                    setNewDebt({ ...newDebt, date: e.target.value })
                  }
                  // InputLabelProps={{
                  //   shrink: true,
                  // }}
                  variant="standard"
                  InputProps={{ style: { textAlign: "right" } }}
                  InputLabelProps={{
                    style: { right: 30, left: "auto" },
                    shrink: true,
                  }}
                />
              </FormControl>
              <Button
                variant="contained"
                color="primary"
                onClick={handleAddDebt}
                sx={{
                  background: "#44484e",
                  fontWeight: "bold",
                  fontSize: "15px",
                  margin: "20px 0 10px 0",
                  "&:hover": {
                    backgroundColor: "#5c6169",
                  },
                }}
              >
                {/* Add Debt */}
                اضافة دين
              </Button>
            </Paper>
          </Grid>
          {/* add Payment */}
          <Grid item xs={12} md={4}>
            <Paper sx={{ padding: "16px", textAlign: "center" }}>
              <Typography variant="h5" gutterBottom fontWeight={"bold"}>
                {/* Add New Payment */}
                تسديد الدين
              </Typography>
              <FormControl fullWidth margin="normal">
                <TextField
                  label="التسديد" //"Amount"
                  value={newPayment.amount}
                  onChange={(e) =>
                    setNewPayment({
                      ...newPayment,
                      amount: e.target.value.replace(/[^0-9.]/g, ""),
                    })
                  }
                  // InputProps={{
                  //   inputMode: "numeric",
                  //   pattern: "[0-9]*",
                  // }}
                  onBlur={(e) =>
                    setNewPayment({
                      ...newPayment,
                      amount: formatAmount(e.target.value),
                    })
                  }
                  variant="standard"
                  InputProps={{
                    style: { textAlign: "right" },
                    inputMode: "numeric",
                    pattern: "[0-9]*",
                  }}
                  InputLabelProps={{ style: { right: 30, left: "auto" } }}
                />
              </FormControl>
              <FormControl fullWidth margin="normal">
                <TextField
                  // label="Date"
                  type="date"
                  value={newPayment.date}
                  onChange={(e) =>
                    setNewPayment({ ...newPayment, date: e.target.value })
                  }
                  // InputLabelProps={{
                  //   shrink: true,
                  // }}
                  variant="standard"
                  InputProps={{ style: { textAlign: "right" } }}
                  InputLabelProps={{ style: { right: 30, left: "auto" } }}
                />
              </FormControl>
              <Button
                variant="contained"
                color="primary"
                onClick={handleAddPayment}
                sx={{
                  background: "#44484e",
                  fontWeight: "bold",
                  fontSize: "15px",
                  margin: "20px 0 10px 0",
                  "&:hover": {
                    backgroundColor: "#5c6169",
                  },
                }}
              >
                {/* Add Payment */}
                اضافة تسديد
              </Button>
            </Paper>
          </Grid>
          {/* add Buyer */}
          <Grid item xs={12} md={4}>
            <Paper sx={{ padding: "16px", textAlign: "center" }}>
              <Typography variant="h5" gutterBottom fontWeight={"bold"}>
                {/* Add New Buyer */}
                اضافة بضاعة
              </Typography>
              <FormControl fullWidth margin="normal">
                <TextField
                  label="البضاعة" //"Name"
                  value={newBuyer.name}
                  onChange={(e) =>
                    setNewBuyer({ ...newBuyer, name: e.target.value })
                  }
                  variant="standard"
                  InputProps={{
                    style: { textAlign: "right" },
                  }}
                  InputLabelProps={{ style: { right: 30, left: "auto" } }}
                />
              </FormControl>
              <FormControl fullWidth margin="normal">
                <TextField
                  label="السعر" //"price"
                  value={newBuyer.price}
                  onChange={(e) =>
                    setNewBuyer({ ...newBuyer, price: e.target.value })
                  }
                  variant="standard"
                  InputProps={{
                    style: { textAlign: "right" },
                    inputMode: "numeric",
                    pattern: "[0-9]*",
                  }}
                  InputLabelProps={{ style: { right: 30, left: "auto" } }}
                />
              </FormControl>
              <FormControl fullWidth margin="normal">
                <InputLabel style={{ right: 30, left: "auto" }}>
                  العملة
                </InputLabel>
                <Select
                  value={newBuyer.currency}
                  onChange={(e) =>
                    setNewBuyer({ ...newBuyer, currency: e.target.value })
                  }
                  variant="standard"
                  sx={{ textAlign: "right" }}
                >
                  <MenuItem value="$">$</MenuItem>
                  <MenuItem value="IQD">IQD</MenuItem>
                </Select>
              </FormControl>
              <FormControl fullWidth margin="normal">
                <TextField
                  label="العدد" //"Count"
                  value={newBuyer.count}
                  onChange={(e) =>
                    setNewBuyer({ ...newBuyer, count: e.target.value })
                  }
                  variant="standard"
                  InputProps={{
                    style: { textAlign: "right" },
                    inputMode: "numeric",
                    pattern: "[0-9]*",
                  }}
                  InputLabelProps={{ style: { right: 30, left: "auto" } }}
                />
              </FormControl>
              <FormControl fullWidth margin="normal">
                <TextField
                  // label="Date"
                  type="date"
                  value={newBuyer.date}
                  onChange={(e) =>
                    setNewBuyer({ ...newBuyer, date: e.target.value })
                  }
                  // InputLabelProps={{
                  //   shrink: true,
                  // }}
                  variant="standard"
                  InputProps={{ style: { textAlign: "right" } }}
                  InputLabelProps={{
                    style: { right: 30, left: "auto" },
                    shrink: true,
                  }}
                />
              </FormControl>
              <Button
                variant="contained"
                color="primary"
                onClick={handleAddBuyer}
                sx={{
                  background: "#44484e",
                  fontWeight: "bold",
                  fontSize: "15px",
                  margin: "20px 0 10px 0",
                  "&:hover": {
                    backgroundColor: "#5c6169",
                  },
                }}
              >
                {/* Add Buyer */}
                اضافة بضاعة
              </Button>
            </Paper>
          </Grid>
        </Grid>

        <Grid container spacing={2} sx={{ marginTop: "20px" }}>
          {/* debt table */}
          <Grid item xs={12} md={6}>
            <Typography
              variant="h5"
              gutterBottom
              fontWeight={"bold"}
              marginRight={5}
            >
              {/* Debts */}
              الديون
            </Typography>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>المبلغ {/*Amount*/}</TableCell>
                    <TableCell>التاريخ {/*Date*/}</TableCell>
                    <TableCell>{/*Actions*/}</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {customer.debts.map((debt) => (
                    <TableRow key={debt._id}>
                      <TableCell>{formatAmount(debt.amount)}</TableCell>
                      <TableCell>{formatDate(debt.date)}</TableCell>
                      <TableCell>
                        <IconButton
                          variant="contained"
                          color="primary"
                          sx={{
                            padding: "5px",
                            margin: "5px",
                            color: "#44484e",
                          }}
                          onClick={() => handleDeleteItem("debts", debt._id)}
                        >
                          <ClearIcon />
                        </IconButton>
                        {/* <Button
                          variant="contained"
                          color="secondary"
                          onClick={() => handleDeleteItem("debts", debt._id)}
                          sx={{ marginRight: "8px" }}
                        >
                          Delete
                        </Button> */}
                        <IconButton
                          variant="contained"
                          color="primary"
                          sx={{
                            padding: "5px",
                            margin: "5px",
                            color: "#44484e",
                          }}
                          onClick={() => handleEditItem("debts", debt)}
                        >
                          <EditIcon />
                        </IconButton>
                        {/* <Button
                          variant="contained"
                          color="primary"
                          onClick={() => handleEditItem("debts", debt)}
                        >
                          Edit
                        </Button> */}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
          {/* payment table */}
          <Grid item xs={12} md={6}>
            <Typography
              variant="h5"
              gutterBottom
              fontWeight={"bold"}
              marginRight={5}
            >
              {/* Payments */}
              التسديد
            </Typography>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>المبلغ {/*Amount*/}</TableCell>
                    <TableCell>التاريخ {/*Date*/}</TableCell>
                    <TableCell>{/*Actions*/}</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {customer.payments.map((payment) => (
                    <TableRow key={payment._id}>
                      <TableCell>{formatAmount(payment.amount)}</TableCell>
                      <TableCell>{formatDate(payment.date)}</TableCell>
                      <TableCell>
                        <IconButton
                          variant="contained"
                          color="primary"
                          sx={{
                            padding: "5px",
                            margin: "5px",
                            color: "#44484e",
                          }}
                          onClick={() =>
                            handleDeleteItem("payments", payment._id)
                          }
                        >
                          <ClearIcon />
                        </IconButton>
                        {/* <Button
                          variant="contained"
                          color="secondary"
                          onClick={() =>
                            handleDeleteItem("payments", payment._id)
                          }
                          sx={{ marginRight: "8px" }}
                        >
                          Delete
                        </Button> */}
                        <IconButton
                          variant="contained"
                          color="primary"
                          sx={{
                            padding: "5px",
                            margin: "5px",
                            color: "#44484e",
                          }}
                          onClick={() => handleEditItem("payments", payment)}
                        >
                          <EditIcon />
                        </IconButton>
                        {/* <Button
                          variant="contained"
                          color="primary"
                          onClick={() => handleEditItem("payments", payment)}
                        >
                          Edit
                        </Button> */}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
        </Grid>
        {/* Buyers table */}
        <Typography
          variant="h5"
          gutterBottom
          sx={{ marginTop: "20px", marginRight: "40px" }}
          fontWeight={"bold"}
        >
          {/* Buyers */}
          البضاعة
        </Typography>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>البضاعة {/*Name*/}</TableCell>
                <TableCell>العدد {/*Count*/}</TableCell>
                <TableCell>السعر {/*price*/}</TableCell>
                <TableCell>السعر الكلي {/*total price*/}</TableCell>
                <TableCell>التاريخ {/*Date*/}</TableCell>
                <TableCell>{/*Actions*/}</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {customer.buyers.map((buyer) => (
                <TableRow key={buyer._id}>
                  <TableCell>{buyer.name}</TableCell>
                  <TableCell>{buyer.count}</TableCell>
                  {/* <TableCell>
                    {formatAmount(buyer.price)}
                    
                  </TableCell>
                  <TableCell>{formatAmount(buyer.price * buyer.count)}</TableCell> */}
                  {/* <TableCell>
                    {buyer.currency === "IQD"
                      ? formatAmount(buyer.price)
                      : buyer.price}
                  </TableCell>
                  <TableCell>
                    {buyer.currency === "IQD"
                      ? formatAmount(buyer.price * buyer.count)
                      : buyer.price * buyer.count}
                  </TableCell> */}
                  <TableCell>
                    {formatCurrency(buyer.price, buyer.currency)}
                  </TableCell>
                  <TableCell>
                    {formatCurrency(buyer.price * buyer.count, buyer.currency)}
                  </TableCell>
                  <TableCell>{formatDate(buyer.date)}</TableCell>
                  <TableCell>
                    {/* <IconButton
                      aria-label="print"
                      title="Print Customer"
                      onClick={() => handlePrintBuyer(buyer)}
                    >
                      <PrintIcon />
                    </IconButton> */}
                    <IconButton
                      aria-label="print"
                      title="Print Customer"
                      onClick={() => handlePrintBuyer(buyer)}
                    >
                      <PrintIcon />
                    </IconButton>
                    <IconButton
                      variant="contained"
                      color="primary"
                      sx={{ padding: "5px", margin: "5px", color: "#44484e" }}
                      onClick={() => handleDeleteItem("buyers", buyer._id)}
                    >
                      <ClearIcon />
                    </IconButton>
                    {/* <Button
                      variant="contained"
                      color="secondary"
                      onClick={() => handleDeleteItem("buyers", buyer._id)}
                      sx={{ marginRight: "8px" }}
                    >
                      Delete
                    </Button> */}
                    <IconButton
                      variant="contained"
                      color="primary"
                      sx={{ padding: "5px", margin: "5px", color: "#44484e" }}
                      onClick={() => handleEditItem("buyers", buyer)}
                    >
                      <EditIcon />
                    </IconButton>
                    {/* <Button
                      variant="contained"
                      color="primary"
                      onClick={() => handleEditItem("buyers", buyer)}
                    >
                      Edit
                    </Button> */}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
      {/* Edit Dialog */}
      <Dialog open={editDialogOpen} onClose={() => setEditDialogOpen(false)}>
        {/* <DialogTitle>Edit {editItem?.type}</DialogTitle> */}
        <DialogTitle
          sx={{ textAlign: "center", fontWeight: "bold", fontSize: "30px" }}
        >
          تعديل
        </DialogTitle>
        <DialogContent>
          {/* <DialogContentText>
            Make changes to the selected {editItem?.type}.
          </DialogContentText> */}
          {editItem && (
            <Box
              sx={{ display: "flex", flexDirection: "column", margin: "5px" }}
            >
              {editItem.type !== "buyers" && (
                <TextField
                  label="المبلغ" //"Amount"
                  // type="number"
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
                  label="البضاعة" //"Buyer Name"
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
                  label="السعر" //"Buyer Name"
                  value={editItem.item.price}
                  onChange={(e) =>
                    setEditItem({
                      ...editItem,
                      item: { ...editItem.item, price: e.target.value },
                    })
                  }
                  fullWidth
                  sx={{ marginBottom: "20px" }}
                />
              )}
              {editItem.type === "buyers" && (
                <TextField
                  label="العدد" //"Count"
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
                label="التاريخ" //"Date"
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
          <Button
            onClick={() => setEditDialogOpen(false)}
            sx={{ color: "#44484e", fontWeight: "bold" }}
          >
            {/* Cancel */} الالغاء
          </Button>
          <Button
            onClick={handleSaveEdit}
            sx={{ color: "#44484e", fontWeight: "bold" }}
          >
            {/* Save */} حفظ
          </Button>
        </DialogActions>
      </Dialog>
      {/* Print Dialog */}
      {/* <PrintDialog
        open={printDialogOpen}
        onClose={() => setPrintDialogOpen(false)}
        customer={customer}
        buyers={newBuyer} // Pass all table data
        buyer={selectedBuyer} // Pass selected row data
      /> */}
      <PrintDialog
        open={printDialogOpen}
        onClose={handleCloseDialog}
        selectedBuyer={selectedBuyer}
      />
      
    </Container>
  );
};

export default CustomerDetails;
