// import React, { useState, useEffect } from "react";
// import { Box, Container, Grid, Typography, IconButton, Card, CardContent, Button } from "@mui/material";
// import { useNavigate, useParams } from "react-router-dom";
// import axios from "axios";

// import ClearIcon from "@mui/icons-material/Clear";
// import EditIcon from "@mui/icons-material/Edit";

// import AddDebt from "./CustomerDetails/AddDebt";
// import AddPayment from "./CustomerDetails/AddPayment";
// import AddBuyer from "./CustomerDetails/AddBuyer";
// import AddStore from "./CustomerDetails/AddStore";
// import DebtTable from "./CustomerDetails/DebtTable";
// import PaymentTable from "./CustomerDetails/PaymentTable";
// import BuyersTable from "./CustomerDetails/BuyersTable";
// import StoreTable from "./CustomerDetails/StoreTable";

// const apiUrl = process.env.REACT_APP_SERVER_URL;

// const CustomerDetails = () => {
//   const { id } = useParams();
//   const [customer, setCustomer] = useState(null);

//   const navigate = useNavigate();

//   useEffect(() => {
//     axios
//       .get(`${apiUrl}/customers/${id}`)
//       .then((response) => {
//         const customerData = response.data;

//         if (!Array.isArray(customerData.buyers)) {
//           customerData.buyers = [];
//         }

//         setCustomer(customerData);
//       })
//       .catch((error) => {
//         console.error(
//           "There was an error fetching the customer details!",
//           error
//         );
//       });
//   }, [id]);

//   const formatAmount = (amount) => {
//     const parsedAmount = parseFloat(amount);
//     return isNaN(parsedAmount)
//       ? "0.00"
//       : parsedAmount.toLocaleString("en-US", {
//           minimumFractionDigits: 3,
//           maximumFractionDigits: 3,
//         });
//   };

//   const calculateTotalDebt = () => {
//     let totalDebt = 0;
//     if (customer && Array.isArray(customer.debts)) {
//       totalDebt = customer.debts.reduce(
//         (acc, debt) => acc + parseFloat(debt.amount),
//         0
//       );
//     }
//     return formatAmount(totalDebt);
//   };

//   const calculateTotalPayment = () => {
//     let totalPayment = 0;
//     if (customer && Array.isArray(customer.payments)) {
//       totalPayment = customer.payments.reduce(
//         (acc, payment) => acc + parseFloat(payment.amount),
//         0
//       );
//     }
//     return formatAmount(totalPayment);
//   };

//   const handleDeleteCustomer = async () => {
//     try {
//       await axios.delete(`${apiUrl}/customers/${id}`);
//       console.log("Customer deleted successfully");

//       navigate("/customers");
//     } catch (error) {
//       console.error("Error deleting customer:", error);
//     }
//   };

//   const handleEditCustomer = () => {
//     navigate(`/customers/${id}/edit`);
//   };

//   const calculateRestAmount = () => {
//     const restAmount =
//       calculateTotalDebt().replace(/,/g, "") -
//       calculateTotalPayment().replace(/,/g, "");
//     return formatAmount(restAmount);
//   };

//   if (!customer) return <Typography>Loading...</Typography>;

//   return (
//     <Container>
//       <Typography
//         variant="h4"
//         component="h1"
//         gutterBottom
//         style={{
//           textAlign: "center",
//           fontWeight: "bold",
//           margin: "30px 0 10px 0",
//         }}
//       >
//         {/* Customer Information */}
//         معلومات الزبون
//       </Typography>
//       <Box sx={{ width: "100%", margin: "20px", direction: "rtl" }}>
//         <Box
//           sx={{
//             width: "100%",
//             margin: "20px",
//             display: "flex",
//             justifyContent: "space-between",
//           }}
//         >
//           <Box
//             sx={{
//               display: "flex",
//               flexDirection: "column",
//               alignItems: "flex-start",
//               marginRight: "20px",
//             }}
//           >
//             <Box sx={{ marginBottom: "20px" }}>
//               <Typography
//                 variant="h5"
//                 gutterBottom
//                 sx={{ padding: "5px", margin: "5px", fontWeight: "bold" }}
//               >
//                 {/* Name: {customer.name} */}
//                 الاسم: {customer.name}
//               </Typography>
//               <Typography
//                 variant="h5"
//                 gutterBottom
//                 sx={{ padding: "5px", margin: "5px", fontWeight: "bold" }}
//               >
//                 {/* Phone: {customer.phoneNumber} */}
//                 رقم الهاتف: {customer.phoneNumber}
//               </Typography>
//               <Box>
//                 <IconButton
//                   variant="contained"
//                   color="primary"
//                   sx={{ padding: "5px", margin: "5px", color: "#44484e" }}
//                   onClick={handleDeleteCustomer}
//                 >
//                   <ClearIcon />
//                 </IconButton>

//                 <IconButton
//                   variant="contained"
//                   color="primary"
//                   sx={{ padding: "5px", margin: "5px", color: "#44484e" }}
//                   onClick={handleEditCustomer}
//                 >
//                   <EditIcon />
//                 </IconButton>
//               </Box>
//             </Box>
//           </Box>
//           <Box
//             sx={{
//               display: "flex",
//               flexDirection: "column",
//               alignItems: "flex-end",
//               marginButton: "20px",
//               padding: "10px",
//             }}
//           >
//             <Typography
//               variant="h5"
//               gutterBottom
//               sx={{ padding: "5px", margin: "5px", fontWeight: "bold" }}
//             >
//               {/* Total Debt: {calculateTotalDebt()} */}
//               مجموع الديون: {calculateTotalDebt()}
//             </Typography>
//             <Typography
//               variant="h5"
//               gutterBottom
//               sx={{ padding: "5px", margin: "5px", fontWeight: "bold" }}
//             >
//               {/* Total Payment: {calculateTotalPayment()} */}
//               مجموع التسديد: {calculateTotalPayment()}
//             </Typography>
//             {/* الباقي */}
//             <Typography
//               variant="h5"
//               gutterBottom
//               sx={{ padding: "5px", margin: "5px", fontWeight: "bold" }}
//             >
//               {/* Rest: {calculateRestAmount()} */}
//               الباقي: {calculateRestAmount()}
//             </Typography>
//           </Box>
//         </Box>

//         <Box sx={{ padding: "20px", direction: "rtl" }}>
//           <Grid container spacing={2}>
//             <Grid item xs={12} sm={6} md={3}>
//               <Card
//                 sx={{
//                   display: "flex",
//                   flexDirection: "column",
//                   alignItems: "center",
//                   padding: "20px",
//                 }}
//               >
//                 <CardContent>
//                   <Typography variant="h6" component="div" gutterBottom>
//                     name1:
//                   </Typography>
//                   <Button variant="contained" color="primary">
//                     Button1
//                   </Button>
//                 </CardContent>
//               </Card>
//             </Grid>
//             <Grid item xs={12} sm={6} md={3}>
//               <Card
//                 sx={{
//                   display: "flex",
//                   flexDirection: "column",
//                   alignItems: "center",
//                   padding: "20px",
//                 }}
//               >
//                 <CardContent>
//                   <Typography variant="h6" component="div" gutterBottom>
//                     name2:
//                   </Typography>
//                   <Button variant="contained" color="primary">
//                     Button2
//                   </Button>
//                 </CardContent>
//               </Card>
//             </Grid>
//             <Grid item xs={12} sm={6} md={3}>
//               <Card
//                 sx={{
//                   display: "flex",
//                   flexDirection: "column",
//                   alignItems: "center",
//                   padding: "20px",
//                 }}
//               >
//                 <CardContent>
//                   <Typography variant="h6" component="div" gutterBottom>
//                     name3:
//                   </Typography>
//                   <Button variant="contained" color="primary">
//                     Button3
//                   </Button>
//                 </CardContent>
//               </Card>
//             </Grid>
//             <Grid item xs={12} sm={6} md={3}>
//               <Card
//                 sx={{
//                   display: "flex",
//                   flexDirection: "column",
//                   alignItems: "center",
//                   padding: "20px",
//                 }}
//               >
//                 <CardContent>
//                   <Typography variant="h6" component="div" gutterBottom>
//                     name4:
//                   </Typography>
//                   <Button variant="contained" color="primary">
//                     Button4
//                   </Button>
//                 </CardContent>
//               </Card>
//             </Grid>
//           </Grid>
//         </Box>
//         <Grid container spacing={2}>
//           {/* add debt */}
//           <AddDebt />
//           {/* add Payment */}
//           <AddPayment />
//           {/* add Buyer */}
//           <AddBuyer />
//           {/* from store form */}
//           <AddStore />
//         </Grid>

//         <Grid container spacing={2} sx={{ marginTop: "20px" }}>
//           {/* debt table */}
//           <DebtTable />
//           {/* payment table */}
//           <PaymentTable />
//         </Grid>
//         {/* Buyers table */}
//         <BuyersTable />
//         {/* store table */}
//         <StoreTable />
//       </Box>
//     </Container>
//   );
// };

// export default CustomerDetails;

import React, { useState, useEffect } from "react";
import { Box, Container, Grid, Typography, IconButton, Card, CardContent, Button, 
  // Dialog, DialogTitle, DialogContent 
} from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

import ClearIcon from "@mui/icons-material/Clear";
import EditIcon from "@mui/icons-material/Edit";

import AddDebt from "./CustomerDetails/AddDebt";
import AddPayment from "./CustomerDetails/AddPayment";
import AddBuyer from "./CustomerDetails/AddBuyer";
import AddStore from "./CustomerDetails/AddStore";
import DebtTable from "./CustomerDetails/DebtTable";
import PaymentTable from "./CustomerDetails/PaymentTable";
import BuyersTable from "./CustomerDetails/BuyersTable";
import StoreTable from "./CustomerDetails/StoreTable";
import DialogWrapper from "../../components/DialogWrapper"; 

const apiUrl = process.env.REACT_APP_SERVER_URL;

const CustomerDetails = () => {
  const { id } = useParams();
  const [customer, setCustomer] = useState(null);
  const [openDialog, setOpenDialog] = useState(null);

  const navigate = useNavigate();

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
      await axios.delete(`${apiUrl}/customers/${id}`);
      console.log("Customer deleted successfully");

      navigate("/customers");
    } catch (error) {
      console.error("Error deleting customer:", error);
    }
  };

  const handleEditCustomer = () => {
    navigate(`/customers/${id}/edit`);
  };

  const calculateRestAmount = () => {
    const restAmount =
      calculateTotalDebt().replace(/,/g, "") -
      calculateTotalPayment().replace(/,/g, "");
    return formatAmount(restAmount);
  };

  const handleOpenDialog = (dialogType) => {
    setOpenDialog(dialogType);
  };

  const handleCloseDialog = () => {
    setOpenDialog(null);
     window.location.reload();
  };

  if (!customer) return <Typography>Loading...</Typography>;

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

                <IconButton
                  variant="contained"
                  color="primary"
                  sx={{ padding: "5px", margin: "5px", color: "#44484e" }}
                  onClick={handleEditCustomer}
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
                    // color="primary"
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
                    اضافة منتج
                  </Typography>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleOpenDialog("buyer")}
                    sx={{
                      background: "#44484e",
                      fontWeight: "bold",
                      fontSize: "18px",
                      "&:hover": {
                        backgroundColor: "#5c6169",
                      },
                    }}
                  >
                    منتج
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
                    اضافة بضاعة
                  </Typography>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleOpenDialog("store")}
                    sx={{
                      background: "#44484e",
                      fontWeight: "bold",
                      fontSize: "18px",
                      "&:hover": {
                        backgroundColor: "#5c6169",
                      },
                    }}
                  >
                    بضاعة
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
        {/* Buyers table */}
        <BuyersTable />
        {/* store table */}
        <StoreTable />

        {/* Dialogs */}
        {/* <Dialog open={openDialog === "debt"} onClose={handleCloseDialog}>
          <DialogTitle>تسجيل دين</DialogTitle>
          <DialogContent>
            <AddDebt />
          </DialogContent>
        </Dialog>

        <Dialog open={openDialog === "payment"} onClose={handleCloseDialog}>
          <DialogTitle>تسجيل دفع</DialogTitle>
          <DialogContent>
            <AddPayment />
          </DialogContent>
        </Dialog>

        <Dialog open={openDialog === "buyer"} onClose={handleCloseDialog}>
          <DialogTitle>إضافة مشتري</DialogTitle>
          <DialogContent>
            <AddBuyer />
          </DialogContent>
        </Dialog>

        <Dialog open={openDialog === "store"} onClose={handleCloseDialog}>
          <DialogTitle>إضافة متجر</DialogTitle>
          <DialogContent>
            <AddStore />
          </DialogContent>
        </Dialog> */}
      </Box>
      {/* Render DialogWrapper for each dialog type */}
      <DialogWrapper
        open={openDialog === "debt"}
        onClose={handleCloseDialog}
        title="إضافة دين"
        component={<AddDebt />}
      />
      <DialogWrapper
        open={openDialog === "payment"}
        onClose={handleCloseDialog}
        title="إضافة تسديد"
        component={<AddPayment />}
      />
      <DialogWrapper
        open={openDialog === "buyer"}
        onClose={handleCloseDialog}
        title="إضافة منتج"
        component={<AddBuyer />}
      />
      <DialogWrapper
        open={openDialog === "store"}
        onClose={handleCloseDialog}
        title="إضافة متجر"
        component={<AddStore />}
      />
    </Container>
  );
};

export default CustomerDetails;