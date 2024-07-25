import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  Button,
} from "@mui/material";
import dayjs from "dayjs";

const PrintDialog = ({ open, onClose, selectedBuyer }) => {
  if (!selectedBuyer) {
    return null;
  }

  const formatDate = (date) => {
    return dayjs(date).format("YYYY-MM-DD");
  };

  const formatAmount = (amount) => {
    const parsedAmount = parseFloat(amount);
    return isNaN(parsedAmount)
      ? "0.00"
      : parsedAmount.toLocaleString("en-US", {
          minimumFractionDigits: 3,
          maximumFractionDigits: 3,
        });
  };

  const formatCurrency = (amount, currency) => {
    switch (currency) {
      case "$":
        return `$${amount}`;
      case "IQD":
        return `${formatAmount(amount)} IQD`;
      default:
        return `${amount.toFixed(2)}`;
    }
  };

  const { name, count, price, currency, date } = selectedBuyer;

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>Print Buyer Information</DialogTitle>
      <DialogContent dividers>
        <Typography variant="h6">Buyer Details:</Typography>
        <Typography>Name: {name}</Typography>
        <Typography>Count: {count}</Typography>
        <Typography>Price: {formatCurrency(price, currency)}</Typography>
        <Typography>
          Total Price: {formatCurrency(price * count, currency)}{" "}
        </Typography>
        <Typography>Date: {formatDate(date)}</Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default PrintDialog;
