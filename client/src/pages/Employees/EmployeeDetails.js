import React, { useState, useEffect } from "react";
import {
  Box,
  Container,
  Grid,
  Typography,
  IconButton,
  Card,
  CardContent,
  Button,
} from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

import ClearIcon from "@mui/icons-material/Clear";
import EditIcon from "@mui/icons-material/Edit";
import AddDebt from "./AddDebt";
import DialogWrapper from "../../components/DialogWrapper";
import AddPayment from "./AddPayment";
import DebtTable from "./DebtTable";
import PaymentTable from "./PaymentTable";


const apiUrl = process.env.REACT_APP_SERVER_URL;

const EmployeeDetails = () => {
const { id } = useParams();
const [employee, setEmployee] = useState(null);
const [openDialog, setOpenDialog] = useState(null);

const navigate = useNavigate();


useEffect(() => {
  axios
    .get(`${apiUrl}/employee/${id}`)
    .then((response) => {
      const employeeData = response.data.employee;

      if (!Array.isArray(employeeData.payment)) {
        employeeData.payment = [];
      }

      setEmployee(employeeData);
    })
    .catch((error) => {
      console.error("There was an error fetching the employee details!", error);
    });
}, [id]);



const handleOpenDialog = (dialogType) => {
  setOpenDialog(dialogType);
};

const handleCloseDialog = () => {
  setOpenDialog(null);
  window.location.reload();
};

const handleDelete = async () => {
  try {
    await axios.delete(`${apiUrl}/employee/${id}`);
    
    navigate("/employees");
  } catch (error) {
    console.error("Error deleting employee:", error);
  }
};

if (!employee) return <Typography>Loading...</Typography>;


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
        معلومات العامل
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
                الاسم: {employee.name}
              </Typography>
              <Typography
                variant="h5"
                gutterBottom
                sx={{ padding: "5px", margin: "5px", fontWeight: "bold" }}
              >
                رقم الهاتف: {employee.phoneNumber}
              </Typography>
              <Box>
                <IconButton
                  variant="contained"
                  color="primary"
                  sx={{ padding: "5px", margin: "5px", color: "#44484e" }}
                  onClick={handleDelete}
                >
                  <ClearIcon />
                </IconButton>

                <IconButton
                  variant="contained"
                  color="primary"
                  sx={{ padding: "5px", margin: "5px", color: "#44484e" }}
                  // onClick={handleEditCustomer}
                >
                  <EditIcon />
                </IconButton>
              </Box>
            </Box>
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-end",
              marginBottom: "20px",
              padding: "10px",
            }}
          >
            <Typography
              variant="h5"
              gutterBottom
              sx={{ padding: "5px", margin: "5px", fontWeight: "bold" }}
            >
              مجموع الديون
              {/* مجموع الديون (IQD): {formatAmount(totalDebtIQD)} */}
            </Typography>

            <Typography
              variant="h5"
              gutterBottom
              sx={{ padding: "5px", margin: "5px", fontWeight: "bold" }}
            >
              مجموع التسديد
              {/* مجموع التسديد (IQD): {formatAmount(totalPaymentIQD)} */}
            </Typography>

            <Typography
              variant="h5"
              gutterBottom
              sx={{ padding: "5px", margin: "5px", fontWeight: "bold" }}
            >
              الباقي
              {/* الباقي (IQD): {formatAmount(restAmountIQD)} */}
            </Typography>
          </Box>
        </Box>

        <Box sx={{ padding: "20px", direction: "rtl" }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6} md={3}>
              <Card
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  padding: "20px",
                }}
              >
                <CardContent>
                  <Typography variant="h6" component="div" gutterBottom>
                    اضافة دين
                  </Typography>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleOpenDialog("debt")}
                    sx={{
                      background: "#44484e",
                      fontWeight: "bold",
                      fontSize: "18px",
                      "&:hover": {
                        backgroundColor: "#5c6169",
                      },
                    }}
                  >
                    دين
                  </Button>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Card
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  padding: "20px",
                }}
              >
                <CardContent>
                  <Typography variant="h6" component="div" gutterBottom>
                    اضافة تسديد
                  </Typography>
                  <Button
                    variant="contained"
                    onClick={() => handleOpenDialog("payment")}
                    sx={{
                      background: "#44484e",
                      fontWeight: "bold",
                      fontSize: "18px",
                      "&:hover": {
                        backgroundColor: "#5c6169",
                      },
                    }}
                  >
                    تسديد
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Box>

        <Grid container spacing={2} sx={{ margin: "20px" }}>
          {/* debt table */}
          <Grid item xs={6}>
            <DebtTable />
          </Grid>
          {/* payment table */}
          <Grid item xs={6}>
            <PaymentTable />
          </Grid>
        </Grid>
      </Box>
      <DialogWrapper
        open={openDialog === "debt"}
        onClose={handleCloseDialog}
        // title="إضافة دين"
        component={<AddDebt />}
      />
      <DialogWrapper
        open={openDialog === "payment"}
        onClose={handleCloseDialog}
        // title="إضافة تسديد"
        component={<AddPayment />}
      />
    </Container>
  );
};

export default EmployeeDetails;
