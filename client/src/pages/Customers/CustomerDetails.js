/* eslint-disable react-hooks/exhaustive-deps */
// import React from "react";
// import {
//   Box,
//   Container,
//   Grid,
//   Paper,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Typography,
//   TextField,
//   Button,
//   FormControl,
// } from "@mui/material";

// const CustomerDetails = () => {
//   return (
//     <Container>
//       <Box sx={{ width: "100%", margin: "20px" }}>
//         <Box
//           sx={{
//             width: "100%",
//             margin: "20px",
//             display: "flex",
//             justifyContent: "space-between",
//           }}
//         >
//           {/* Box with customer information */}
//           <Box
//             sx={{
//               display: "flex",
//               flexDirection: "column",
//               alignItems: "flex-start",
//               marginRight: "20px",
//             }}
//           >
//             <Typography variant="h5" gutterBottom>
//               Customer Information
//             </Typography>
//             <Box sx={{ marginBottom: "20px" }}>
//               <Typography
//                 variant="h5"
//                 gutterBottom
//                 sx={{ padding: "5px", margin: "5px" }}
//               >
//                 Name: name
//               </Typography>
//               <Typography
//                 variant="h5"
//                 gutterBottom
//                 sx={{ padding: "5px", margin: "5px" }}
//               >
//                 Phone: phone
//               </Typography>
//             </Box>
//           </Box>

//           {/* Box with name, phone, and actions */}
//           <Box
//             sx={{
//               display: "flex",
//               flexDirection: "column",
//               alignItems: "flex-end",
//               margin: "20px",
//               padding: "10px",
//             }}
//           >
//             <Box>
//               <Button
//                 variant="contained"
//                 color="primary"
//                 sx={{ padding: "5px", margin: "5px" }}
//               >
//                 Delete
//               </Button>
//               <Button
//                 variant="contained"
//                 color="primary"
//                 sx={{ padding: "5px", margin: "5px" }}
//               >
//                 Edit
//               </Button>
//             </Box>
//             <Typography
//               variant="h5"
//               gutterBottom
//               sx={{ padding: "5px", margin: "5px" }}
//             >
//               Total Debt:
//               {/* {totalDebt} */}
//             </Typography>
//             <Typography
//               variant="h5"
//               gutterBottom
//               sx={{ padding: "5px", margin: "5px" }}
//             >
//               Total Payment:
//               {/* {totalPayment} */}
//             </Typography>
//           </Box>
//         </Box>

//         <Grid container spacing={3}>
//           {/* Form and debt block */}
//           <Grid item xs={12} md={6}>
//             <Box sx={{ marginBottom: "20px" }}>
//               <Typography variant="h5" gutterBottom>
//                 Add Debt
//               </Typography>
//               <Box sx={{ display: "flex", alignItems: "center" }}>
//                 <FormControl fullWidth sx={{ marginRight: "10px" }}>
//                   <TextField name="debt" label="Debt" variant="outlined" />
//                 </FormControl>
//                 <FormControl fullWidth>
//                   <TextField
//                     name="date"
//                     label="Date"
//                     variant="outlined"
//                     type="date"
//                     InputLabelProps={{
//                       shrink: true,
//                     }}
//                   />
//                 </FormControl>
//                 <Button
//                   variant="contained"
//                   color="primary"
//                   //   size="small"
//                   sx={{
//                     marginLeft: "10px",
//                     fontSize: "12px",
//                     padding: "10px",
//                     fontWeight: "bold",
//                   }}
//                 >
//                   Add Debt
//                 </Button>
//               </Box>
//               {/* Debt block */}
//               <Typography variant="h6" gutterBottom sx={{ marginTop: "20px" }}>
//                 Debt
//               </Typography>
//               <TableContainer component={Paper}>
//                 <Table aria-label="debt table">
//                   <TableHead>
//                     <TableRow>
//                       <TableCell>Debt</TableCell>
//                       <TableCell align="right">Date</TableCell>
//                       <TableCell align="right">Actions</TableCell>
//                     </TableRow>
//                   </TableHead>
//                   <TableBody>
//                     {/* Map over customer debt data */}
//                     {/* {customers.map((customer) => ( */}
//                     <TableRow
//                     // key={customer.id}
//                     >
//                       <TableCell component="th" scope="row">
//                         {/* {customer.debt} */}
//                       </TableCell>
//                       <TableCell align="right">
//                         {/* {customer.date} */}
//                       </TableCell>
//                       <TableCell align="right">
//                         <button>Delete</button>
//                         <button>Edit</button>
//                       </TableCell>
//                     </TableRow>
//                     {/* ))} */}
//                   </TableBody>
//                 </Table>
//               </TableContainer>
//             </Box>
//           </Grid>

//           {/* Form and payment block */}
//           <Grid item xs={12} md={6}>
//             <Box sx={{ marginBottom: "20px" }}>
//               <Typography variant="h5" gutterBottom>
//                 Add Payment
//               </Typography>
//               <Box sx={{ display: "flex", alignItems: "center" }}>
//                 <FormControl fullWidth sx={{ marginRight: "10px" }}>
//                   <TextField
//                     name="payment"
//                     label="Payment"
//                     variant="outlined"
//                   />
//                 </FormControl>
//                 <FormControl fullWidth>
//                   <TextField
//                     name="date"
//                     label="Date"
//                     variant="outlined"
//                     type="date"
//                     InputLabelProps={{
//                       shrink: true,
//                     }}
//                   />
//                 </FormControl>
//                 <Button
//                   variant="contained"
//                   color="primary"
//                   //   size="small"
//                   sx={{
//                     marginLeft: "10px",
//                     fontSize: "11px",
//                     padding: "10px",
//                     fontWeight: "bold",
//                   }}
//                 >
//                   Add Payment
//                 </Button>
//               </Box>
//               {/* Payment block */}
//               <Typography variant="h6" gutterBottom sx={{ marginTop: "20px" }}>
//                 Payment
//               </Typography>
//               <TableContainer component={Paper}>
//                 <Table aria-label="payment table">
//                   <TableHead>
//                     <TableRow>
//                       <TableCell>Payments</TableCell>
//                       <TableCell align="right">Date</TableCell>
//                       <TableCell align="right">Actions</TableCell>
//                     </TableRow>
//                   </TableHead>
//                   <TableBody>
//                     {/* Map over customer payment data */}
//                     {/* {customers.map((customer) => ( */}
//                     <TableRow
//                     // key={customer.id}
//                     >
//                       <TableCell component="th" scope="row">
//                         {/* {customer.payment} */}
//                       </TableCell>
//                       <TableCell align="right">
//                         {/* {customer.date} */}
//                       </TableCell>
//                       <TableCell align="right">
//                         <button>Delete</button>
//                         <button>Edit</button>
//                       </TableCell>
//                     </TableRow>
//                     {/* ))} */}
//                   </TableBody>
//                 </Table>
//               </TableContainer>
//             </Box>
//           </Grid>

//           {/* Form and product block */}
//           <Grid item xs={12}>
//             <Box sx={{ marginBottom: "20px" }}>
//               <Typography variant="h5" gutterBottom>
//                 Add Product
//               </Typography>
//               <Box sx={{ display: "flex", alignItems: "center" }}>
//                 <FormControl fullWidth sx={{ marginRight: "10px" }}>
//                   <TextField
//                     name="product"
//                     label="Product"
//                     variant="outlined"
//                     // Add value and onChange handlers
//                   />
//                 </FormControl>
//                 <FormControl fullWidth>
//                   <TextField
//                     name="date"
//                     label="Date"
//                     variant="outlined"
//                     type="date"
//                     InputLabelProps={{
//                       shrink: true,
//                     }}
//                     // Add value and onChange handlers
//                   />
//                 </FormControl>
//                 <Button
//                   variant="contained"
//                   color="primary"
//                   // Add onClick handler
//                   sx={{
//                     marginLeft: "10px",
//                     fontSize: "11px",
//                     padding: "10px",
//                     fontWeight: "bold",
//                   }}
//                 >
//                   Add Product
//                 </Button>
//               </Box>
//               {/* Product block */}
//               <Typography variant="h6" gutterBottom sx={{ marginTop: "20px" }}>
//                 Product
//               </Typography>
//               <TableContainer component={Paper}>
//                 <Table aria-label="product table">
//                   <TableHead>
//                     <TableRow>
//                       <TableCell>Product</TableCell>
//                       <TableCell align="right">Date</TableCell>
//                       <TableCell align="right">Actions</TableCell>
//                     </TableRow>
//                   </TableHead>
//                   <TableBody>
//                     {/* Map over customer product data */}
//                     {/* {customers.map((customer) => {
//                       // Check if customer has products
//                       if (customer.products && customer.products.length > 0) {
//                         return customer.products.map((product, index) => ( */}
//                     <TableRow
//                     //  key={index}
//                     >
//                       <TableCell component="th" scope="row">
//                         {/* {product.name} //Assuming product name */}
//                       </TableCell>
//                       <TableCell align="right">
//                         {/* {product.date} */}
//                       </TableCell>{" "}
//                       {/* Assuming product date */}
//                       <TableCell align="right">
//                         <button>Delete</button>
//                         <button>Edit</button>
//                       </TableCell>
//                     </TableRow>
//                     {/* ));}
//                       // Return null if no products found for the customer
//                       return null;
//                     })} */}
//                   </TableBody>
//                 </Table>
//               </TableContainer>
//             </Box>
//           </Grid>
//         </Grid>
//       </Box>
//     </Container>
//   );
// };

// export default CustomerDetails;

///////////////////////////////////////////////

// src/components/CustomerDetails.js
// import React, { useState, useEffect } from "react";
// import {
//   Box,
//   Container,
//   Grid,
//   Paper,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Typography,
//   TextField,
//   Button,
//   FormControl,
// } from "@mui/material";
// import { useParams } from "react-router-dom";
// import { getCustomers, addDebt, addPayment, addProduct } from "../../api/CustApi";

// const CustomerDetails = () => {
//   const { id } = useParams();
//   const [customer, setCustomer] = useState(null);
//   const [debt, setDebt] = useState("");
//   const [payment, setPayment] = useState("");
//   const [product, setProduct] = useState("");
//   const [date, setDate] = useState("");

//   useEffect(() => {
//     fetchCustomerDetails();
//   }, []);

//   const fetchCustomerDetails = async () => {
//     try {
//       const response = await getCustomers();
//       const foundCustomer = response.data.find(c => c._id === id);
//       setCustomer(foundCustomer);
//     } catch (error) {
//       console.error("Error fetching customer details:", error);
//     }
//   };

//   const handleAddDebt = async () => {
//     try {
//       await addDebt(id, { debt, date });
//       fetchCustomerDetails();
//     } catch (error) {
//       console.error("Error adding debt:", error);
//     }
//   };

//   const handleAddPayment = async () => {
//     try {
//       await addPayment(id, { payment, date });
//       fetchCustomerDetails();
//     } catch (error) {
//       console.error("Error adding payment:", error);
//     }
//   };

//   const handleAddProduct = async () => {
//     try {
//       await addProduct(id, { product, date });
//       fetchCustomerDetails();
//     } catch (error) {
//       console.error("Error adding product:", error);
//     }
//   };

//   if (!customer) {
//     return <Typography variant="h5">Loading...</Typography>;
//   }

//   return (
//     <Container>
//       <Box sx={{ width: "100%", margin: "20px" }}>
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
//             <Typography variant="h5" gutterBottom>
//               Customer Information
//             </Typography>
//             <Box sx={{ marginBottom: "20px" }}>
//               <Typography
//                 variant="h5"
//                 gutterBottom
//                 sx={{ padding: "5px", margin: "5px" }}
//               >
//                 Name: {customer.name}
//               </Typography>
//               <Typography
//                 variant="h5"
//                 gutterBottom
//                 sx={{ padding: "5px", margin: "5px" }}
//               >
//                 Phone: {customer.phoneNumber}
//               </Typography>
//             </Box>
//           </Box>

//           <Box
//             sx={{
//               display: "flex",
//               flexDirection: "column",
//               alignItems: "flex-end",
//               margin: "20px",
//               padding: "10px",
//             }}
//           >
//             <Box>
//               <Button
//                 variant="contained"
//                 color="primary"
//                 sx={{ padding: "5px", margin: "5px" }}
//               >
//                 Delete
//               </Button>
//               <Button
//                 variant="contained"
//                 color="primary"
//                 sx={{ padding: "5px", margin: "5px" }}
//               >
//                 Edit
//               </Button>
//             </Box>
//             <Typography
//               variant="h5"
//               gutterBottom
//               sx={{ padding: "5px", margin: "5px" }}
//             >
//               Total Debt: {/* {customer.totalDebt} */}
//             </Typography>
//             <Typography
//               variant="h5"
//               gutterBottom
//               sx={{ padding: "5px", margin: "5px" }}
//             >
//               Total Payment: {/* {customer.totalPayment} */}
//             </Typography>
//           </Box>
//         </Box>

//         <Grid container spacing={3}>
//           <Grid item xs={12} md={6}>
//             <Box sx={{ marginBottom: "20px" }}>
//               <Typography variant="h5" gutterBottom>
//                 Add Debt
//               </Typography>
//               <Box sx={{ display: "flex", alignItems: "center" }}>
//                 <FormControl fullWidth sx={{ marginRight: "10px" }}>
//                   <TextField
//                     name="debt"
//                     label="Debt"
//                     variant="outlined"
//                     value={debt}
//                     onChange={(e) => setDebt(e.target.value)}
//                   />
//                 </FormControl>
//                 <FormControl fullWidth>
//                   <TextField
//                     name="date"
//                     label="Date"
//                     variant="outlined"
//                     type="date"
//                     InputLabelProps={{
//                       shrink: true,
//                     }}
//                     value={date}
//                     onChange={(e) => setDate(e.target.value)}
//                   />
//                 </FormControl>
//                 <Button
//                   variant="contained"
//                   color="primary"
//                   sx={{
//                     marginLeft: "10px",
//                     fontSize: "12px",
//                     padding: "10px",
//                     fontWeight: "bold",
//                   }}
//                   onClick={handleAddDebt}
//                 >
//                   Add Debt
//                 </Button>
//               </Box>
//               <Typography variant="h6" gutterBottom sx={{ marginTop: "20px" }}>
//                 Debt
//               </Typography>
//               <TableContainer component={Paper}>
//                 <Table aria-label="debt table">
//                   <TableHead>
//                     <TableRow>
//                       <TableCell>Debt</TableCell>
//                       <TableCell align="right">Date</TableCell>
//                       <TableCell align="right">Actions</TableCell>
//                     </TableRow>
//                   </TableHead>
//                   <TableBody>
//                     {customer.debts.map((debt) => (
//                       <TableRow key={debt._id}>
//                         <TableCell>{debt.amount}</TableCell>
//                         <TableCell align="right">{debt.date}</TableCell>
//                         <TableCell align="right">
//                           <button>Delete</button>
//                           <button>Edit</button>
//                         </TableCell>
//                       </TableRow>
//                     ))}
//                   </TableBody>
//                 </Table>
//               </TableContainer>
//             </Box>
//           </Grid>

//           <Grid item xs={12} md={6}>
//             <Box sx={{ marginBottom: "20px" }}>
//               <Typography variant="h5" gutterBottom>
//                 Add Payment
//               </Typography>
//               <Box sx={{ display: "flex", alignItems: "center" }}>
//                 <FormControl fullWidth sx={{ marginRight: "10px" }}>
//                   <TextField
//                     name="payment"
//                     label="Payment"
//                     variant="outlined"
//                     value={payment}
//                     onChange={(e) => setPayment(e.target.value)}
//                   />
//                 </FormControl>
//                 <FormControl fullWidth>
//                   <TextField
//                     name="date"
//                     label="Date"
//                     variant="outlined"
//                     type="date"
//                     InputLabelProps={{
//                       shrink: true,
//                     }}
//                     value={date}
//                     onChange={(e) => setDate(e.target.value)}
//                   />
//                 </FormControl>
//                 <Button
//                   variant="contained"
//                   color="primary"
//                   sx={{
//                     marginLeft: "10px",
//                     fontSize: "11px",
//                     padding: "10px",
//                     fontWeight: "bold",
//                   }}
//                   onClick={handleAddPayment}
//                 >
//                   Add Payment
//                 </Button>
//               </Box>
//               <Typography variant="h6" gutterBottom sx={{ marginTop: "20px" }}>
//                 Payment
//               </Typography>
//               <TableContainer component={Paper}>
//                 <Table aria-label="payment table">
//                   <TableHead>
//                     <TableRow>
//                       <TableCell>Payments</TableCell>
//                       <TableCell align="right">Date</TableCell>
//                       <TableCell align="right">Actions</TableCell>
//                     </TableRow>
//                   </TableHead>
//                   <TableBody>
//                     {customer.payments.map((payment) => (
//                       <TableRow key={payment._id}>
//                         <TableCell>{payment.amount}</TableCell>
//                         <TableCell align="right">{payment.date}</TableCell>
//                         <TableCell align="right">
//                           <button>Delete</button>
//                           <button>Edit</button>
//                         </TableCell>
//                       </TableRow>
//                     ))}
//                   </TableBody>
//                 </Table>
//               </TableContainer>
//             </Box>
//           </Grid>

//           <Grid item xs={12} md={6}>
//             <Box sx={{ marginBottom: "20px" }}>
//               <Typography variant="h5" gutterBottom>
//                 Add Product
//               </Typography>
//               <Box sx={{ display: "flex", alignItems: "center" }}>
//                 <FormControl fullWidth sx={{ marginRight: "10px" }}>
//                   <TextField
//                     name="product"
//                     label="Product"
//                     variant="outlined"
//                     value={product}
//                     onChange={(e) => setProduct(e.target.value)}
//                   />
//                 </FormControl>
//                 <FormControl fullWidth>
//                   <TextField
//                     name="date"
//                     label="Date"
//                     variant="outlined"
//                     type="date"
//                     InputLabelProps={{
//                       shrink: true,
//                     }}
//                     value={date}
//                     onChange={(e) => setDate(e.target.value)}
//                   />
//                 </FormControl>
//                 <Button
//                   variant="contained"
//                   color="primary"
//                   sx={{
//                     marginLeft: "10px",
//                     fontSize: "11px",
//                     padding: "10px",
//                     fontWeight: "bold",
//                   }}
//                   onClick={handleAddProduct}
//                 >
//                   Add Product
//                 </Button>
//               </Box>
//               <Typography variant="h6" gutterBottom sx={{ marginTop: "20px" }}>
//                 Product
//               </Typography>
//               <TableContainer component={Paper}>
//                 <Table aria-label="product table">
//                   <TableHead>
//                     <TableRow>
//                       <TableCell>Product</TableCell>
//                       <TableCell align="right">Date</TableCell>
//                       <TableCell align="right">Actions</TableCell>
//                     </TableRow>
//                   </TableHead>
//                   <TableBody>
//                     {customer.products.map((product) => (
//                       <TableRow key={product._id}>
//                         <TableCell>{product.name}</TableCell>
//                         <TableCell align="right">{product.date}</TableCell>
//                         <TableCell align="right">
//                           <button>Delete</button>
//                           <button>Edit</button>
//                         </TableCell>
//                       </TableRow>
//                     ))}
//                   </TableBody>
//                 </Table>
//               </TableContainer>
//             </Box>
//           </Grid>
//         </Grid>
//       </Box>
//     </Container>
//   );
// };

// export default CustomerDetails;

/////////////////////////////////////////////////////////

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

  // const handleAddDebt = () => {
  //   const updatedCustomer = {
  //     ...customer,
  //     debts: [...customer.debts, newDebt],
  //   };

  //   axios
  //     .put(`http://localhost:8000/customers/${id}`, updatedCustomer)
  //     .then((response) => {
  //       setCustomer(response.data);
  //       setNewDebt({ amount: "", date: "" });
  //     })
  //     .catch((error) => {
  //       console.error("Error updating customer:", error);
  //     });
  // };
  // Example update for handleAddDebt
  const handleAddDebt = () => {
    const updatedCustomer = {
      ...customer,
      debts: [...customer.debts, { ...newDebt, date: newDebt.date }], 
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
      payments: [...customer.payments, {...newPayment, date: newPayment.date}],
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
      buyers: [...customer.buyers, {...newBuyer, date: newBuyer.date}],
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
    return totalDebt;
  };

  const calculateTotalPayment = () => {
    let totalPayment = 0;
    if (customer && Array.isArray(customer.payments)) {
      totalPayment = customer.payments.reduce(
        (acc, payment) => acc + parseFloat(payment.amount),
        0
      );
    }
    return totalPayment;
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
          </Box>
        </Box>

        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Box sx={{ marginBottom: "20px" }}>
              <Typography variant="h5" gutterBottom>
                Add Debt
              </Typography>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <FormControl fullWidth sx={{ marginRight: "10px" }}>
                  <TextField
                    name="debt"
                    label="Debt"
                    variant="outlined"
                    value={newDebt.amount}
                    onChange={(e) =>
                      setNewDebt({ ...newDebt, amount: e.target.value })
                    }
                  />
                </FormControl>
                <FormControl fullWidth>
                  <TextField
                    name="date"
                    label="Date"
                    variant="outlined"
                    type="date"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    value={formatDate(newDebt.date)}
                    onChange={(e) =>
                      setNewDebt({ ...newDebt, date: e.target.value })
                    }
                  />
                </FormControl>
                <Button
                  variant="contained"
                  color="primary"
                  sx={{ height: "50px", marginLeft: "10px" }}
                  onClick={handleAddDebt}
                >
                  Add
                </Button>
              </Box>
            </Box>
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
                      <TableCell>{debt.amount}</TableCell>
                      <TableCell>{formatDate(debt.date)}</TableCell>
                      <TableCell>
                        <Button
                          onClick={() => handleEditItem("debts", debt)}
                          color="primary"
                        >
                          Edit
                        </Button>
                        <Button
                          onClick={() => handleDeleteItem("debts", debt._id)}
                          color="secondary"
                        >
                          Delete
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>

          <Grid item xs={12} md={6}>
            <Box sx={{ marginBottom: "20px" }}>
              <Typography variant="h5" gutterBottom>
                Add Payment
              </Typography>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <FormControl fullWidth sx={{ marginRight: "10px" }}>
                  <TextField
                    name="payment"
                    label="Payment"
                    variant="outlined"
                    value={newPayment.amount}
                    onChange={(e) =>
                      setNewPayment({ ...newPayment, amount: e.target.value })
                    }
                  />
                </FormControl>
                <FormControl fullWidth>
                  <TextField
                    name="date"
                    label="Date"
                    variant="outlined"
                    type="date"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    value={formatDate(newPayment.date)}
                    onChange={(e) =>
                      setNewPayment({ ...newPayment, date: e.target.value })
                    }
                  />
                </FormControl>
                <Button
                  variant="contained"
                  color="primary"
                  sx={{ height: "50px", marginLeft: "10px" }}
                  onClick={handleAddPayment}
                >
                  Add
                </Button>
              </Box>
            </Box>
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
                      <TableCell>{payment.amount}</TableCell>
                      <TableCell>{formatDate(payment.date)}</TableCell>
                      <TableCell>
                        <Button
                          onClick={() => handleEditItem("payments", payment)}
                          color="primary"
                        >
                          Edit
                        </Button>
                        <Button
                          onClick={() =>
                            handleDeleteItem("payments", payment._id)
                          }
                          color="secondary"
                        >
                          Delete
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>

          <Grid item xs={12}>
            <Box sx={{ marginBottom: "20px" }}>
              <Typography variant="h5" gutterBottom>
                Add Buyer
              </Typography>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <FormControl fullWidth sx={{ marginRight: "10px" }}>
                  <TextField
                    name="name"
                    label="Buyer Name"
                    variant="outlined"
                    value={newBuyer.name}
                    onChange={(e) =>
                      setNewBuyer({ ...newBuyer, name: e.target.value })
                    }
                  />
                </FormControl>
                <FormControl fullWidth sx={{ marginRight: "10px" }}>
                  <TextField
                    name="count"
                    label="Count"
                    variant="outlined"
                    value={newBuyer.count}
                    onChange={(e) =>
                      setNewBuyer({ ...newBuyer, count: e.target.value })
                    }
                  />
                </FormControl>
                <FormControl fullWidth>
                  <TextField
                    name="date"
                    label="Date"
                    variant="outlined"
                    type="date"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    value={formatDate(newBuyer.date)}
                    onChange={(e) =>
                      setNewBuyer({ ...newBuyer, date: e.target.value })
                    }
                  />
                </FormControl>
                <Button
                  variant="contained"
                  color="primary"
                  sx={{ height: "50px", marginLeft: "10px" }}
                  onClick={handleAddBuyer}
                >
                  Add
                </Button>
              </Box>
            </Box>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Buyer Name</TableCell>
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
                          onClick={() => handleEditItem("buyers", buyer)}
                          color="primary"
                        >
                          Edit
                        </Button>
                        <Button
                          onClick={() => handleDeleteItem("buyers", buyer._id)}
                          color="secondary"
                        >
                          Delete
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
        </Grid>
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
