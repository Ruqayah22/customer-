import React, { useEffect, useState } from 'react'
import { Box, Button, Container, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from '@mui/material';
import axios from "axios";
import dayjs from "dayjs";

import ClearIcon from "@mui/icons-material/Clear";
import EditIcon from "@mui/icons-material/Edit";
import PrintIcon from "@mui/icons-material/Print";
import { useParams } from 'react-router-dom';
import PrintDialog from '../PrintDialog';

const apiUrl = process.env.REACT_APP_SERVER_URL;


const BuyersTable = () => {
  const { id } = useParams();
  const [customer, setCustomer] = useState(null);

  const [editItem, setEditItem] = useState(null);
  const [editDialogOpen, setEditDialogOpen] = useState(false);

  const [printDialogOpen, setPrintDialogOpen] = useState(false);
  const [selectedBuyer, setSelectedBuyer] = useState(null);

  useEffect(() => {
    axios
      .get(`${apiUrl}/customers/${id}`)
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

  // Delete functions for Debt, Payment, and Buyer
  const handleDeleteItem = (type, itemId) => {
    const updatedCustomer = {
      ...customer,
      [type]: customer[type].filter((item) => item._id !== itemId),
    };

    axios
      .put(`${apiUrl}/customers/${id}`, updatedCustomer)
      .then((response) => {
        setCustomer(response.data);
      })
      .catch((error) => {
        console.error("Error updating customer:", error);
      });
  };

  // // Edit functions for Debt, Payment, and Buyer
  // const handleEditItem = (type, item) => {
  //   setEditItem({ type, item });
  //   setEditDialogOpen(true);
  // };
  const handleEditItem = (type, item) => {
    if (item.date) {
      item.date = formatDate(item.date);
    }
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
      .put(`${apiUrl}/customers/${id}`, updatedCustomer)
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

  // Function to handle printing buyer information
  const handlePrintBuyer = (buyer) => {
    setSelectedBuyer(buyer);
    setPrintDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setPrintDialogOpen(false);
    setSelectedBuyer(null); // Clear selected buyer after closing
  };

  if (!customer) return <Typography>Loading...</Typography>;

  return (
    <Container>
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

                <TableCell>
                  {formatCurrency(buyer.price, buyer.currency)}
                </TableCell>
                <TableCell>
                  {formatCurrency(buyer.price * buyer.count, buyer.currency)}
                </TableCell>
                <TableCell>{formatDate(buyer.date)}</TableCell>
                <TableCell>
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

                  <IconButton
                    variant="contained"
                    color="primary"
                    sx={{ padding: "5px", margin: "5px", color: "#44484e" }}
                    onClick={() => handleEditItem("buyers", buyer)}
                  >
                    <EditIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {/* Edit Dialog */}
      <Dialog open={editDialogOpen} onClose={() => setEditDialogOpen(false)}>
        <DialogTitle
          sx={{ textAlign: "center", fontWeight: "bold", fontSize: "30px" }}
        >
          تعديل
        </DialogTitle>
        <DialogContent>
          {editItem && (
            <Box
              sx={{ display: "flex", flexDirection: "column", margin: "5px" }}
            >
              {editItem.type !== "buyers" && (
                <TextField
                  label="المبلغ" //"Amount"
                  value={editItem.item.amount}
                  onChange={(e) =>
                    setEditItem({
                      ...editItem,
                      item: { ...editItem.item, amount: e.target.value },
                    })
                  }
                  fullWidth
                  sx={{
                    marginBottom: "20px",
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
                  sx={{
                    marginBottom: "20px",
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
                  sx={{
                    marginBottom: "20px",
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
                  sx={{
                    marginBottom: "20px",
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
                sx={{
                  marginBottom: "20px",
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

      <PrintDialog
        open={printDialogOpen}
        onClose={handleCloseDialog}
        selectedBuyer={selectedBuyer}
      />
    </Container>
  );
}

export default BuyersTable
