import React, { useEffect, useState } from "react";
import {
  Button,
  FormControl,
  Grid,
  Paper,
  TextField,
  Typography,
  CircularProgress,
} from "@mui/material";
import axios from "axios";
import dayjs from "dayjs";
import { useParams } from "react-router-dom";

const apiUrl = process.env.REACT_APP_SERVER_URL;

const AddDebt = ({ onClose }) => {
  const { id } = useParams();
  const [employee, setEmployee] = useState(null);
  const [loading, setLoading] = useState(false);

  const [debts, setDebt] = useState({
    amount: "0",
    date: dayjs().format("YYYY-MM-DD"),
  });

  useEffect(() => {
    setLoading(true);
    axios
      .get(`${apiUrl}/employee/${id}`)
      .then((response) => {
        const employeeData = response.data;


        if (!Array.isArray(employeeData.debts)) {
          employeeData.debts = [];
          
        }

        setEmployee(employeeData);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching employee details:", error);
        setLoading(false);
      });
  }, [id]);

  const handleAddDebt = () => {
    
  };

  

  if (loading) {
    return <CircularProgress />;
  }

  return (
    <Grid item xs={12} md={4}>
      <Paper sx={{ padding: "16px", textAlign: "center" }}>
        <Typography variant="h5" gutterBottom fontWeight={"bold"}>
          اضافة دين
        </Typography>
        <FormControl fullWidth margin="normal">
          <TextField
            label="الدين"
            value={debts.amount}
            onChange={(e) =>
              setDebt({
                ...debts,
                amount: e.target.value,
              })
            }
            variant="standard"
            InputProps={{
              style: { textAlign: "right" },
              inputMode: "numeric",
              pattern: "[0-9]*",
            }}
            InputLabelProps={{ style: { right: 30, left: "auto" } }}
            sx={{
              "& .MuiInput-underline": {
                "&:before": {
                  borderBottomColor: "#44484e",
                },
                "&:hover:not(.Mui-disabled):before": {
                  borderBottomColor: "#44484e",
                },
                "&:after": {
                  borderBottomColor: "#44484e",
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
        <FormControl fullWidth margin="normal">
          <TextField
            type="date"
            value={debts.date}
            onChange={(e) => setDebt({ ...debts, date: e.target.value })}
            variant="standard"
            InputProps={{ style: { textAlign: "right" } }}
            InputLabelProps={{
              style: { right: 30, left: "auto" },
              shrink: true,
            }}
            sx={{
              "& .MuiInput-underline": {
                "&:before": {
                  borderBottomColor: "#44484e",
                },
                "&:hover:not(.Mui-disabled):before": {
                  borderBottomColor: "#44484e",
                },
                "&:after": {
                  borderBottomColor: "#44484e",
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
          اضافة دين
        </Button>
      </Paper>
    </Grid>
  );
};

export default AddDebt;
