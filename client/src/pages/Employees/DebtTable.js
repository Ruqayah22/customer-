import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";
import EditIcon from "@mui/icons-material/Edit";
import { useParams } from "react-router-dom";
import axios from "axios";
import dayjs from "dayjs";

const apiUrl = process.env.REACT_APP_SERVER_URL;

const DebtTable = () => {
    const { id } = useParams();
    const [employee, setEmployee] = useState(null);

    const [editItem, setEditItem] = useState(null);
    const [editDialogOpen, setEditDialogOpen] = useState(false);

   useEffect(() => {
     axios
       .get(`${apiUrl}/employee/${id}`)
       .then((response) => {
         const employeeData = response.data;

         if (!Array.isArray(employeeData.debts)) {
           employeeData.debts = [];
         }

         setEmployee(employeeData);
       })
       .catch((error) => {
         console.error(
           "There was an error fetching the employee details!",
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

    const formatDate = (date) => {
      return dayjs(date).format("YYYY-MM-DD");
    };

    // Delete functions for Debt, Payment, and Buyer
    const handleDeleteItem = (type, itemId) => {
      const updatedEmployee = {
        ...employee,
        [type]: employee[type].filter((item) => item._id !== itemId),
      };

      axios
        .put(`${apiUrl}/employee/${id}`, updatedEmployee)
        .then((response) => {
          setEmployee(response.data);
        })
        .catch((error) => {
          console.error("Error updating employee:", error);
        });
    };

    const handleEditItem = (type, item) => {
      if (item.date) {
        item.date = formatDate(item.date);
      }
      setEditItem({ type, item });
      setEditDialogOpen(true);
    };

    const handleSaveEdit = () => {
      const { type, item } = editItem;
      const updatedEmployee = {
        ...employee,
        [type]: employee[type].map((i) => (i._id === item._id ? item : i)),
      };

      axios
        .put(`${apiUrl}/employee/${id}`, updatedEmployee)
        .then((response) => {
          setEmployee(response.data);
          setEditDialogOpen(false);
          setEditItem(null);
        })
        .catch((error) => {
          console.error("Error updating employee:", error);
        });
    };

    if (!employee) return <Typography>Loading...</Typography>;

   return (
     <Container>
       <Typography
         variant="h5"
         gutterBottom
         fontWeight={"bold"}
         marginRight={5}
       >
         الديون
       </Typography>
       <TableContainer component={Paper}>
         <Table>
           <TableHead>
             <TableRow>
               <TableCell>المبلغ </TableCell>
               <TableCell>التاريخ </TableCell>
               <TableCell>{/*Actions*/}</TableCell>
             </TableRow>
           </TableHead>
           <TableBody>
             {employee.debts.map((debt) => (
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
                 </TableCell>
               </TableRow>
             ))}
           </TableBody>
         </Table>
       </TableContainer>
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
               
                 <TextField
                   label="المبلغ"
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

               <TextField
                 label="التاريخ"
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
             الالغاء
           </Button>
           <Button
             onClick={handleSaveEdit}
             sx={{ color: "#44484e", fontWeight: "bold" }}
           >
             حفظ
           </Button>
         </DialogActions>
       </Dialog>
     </Container>
   );
};

export default DebtTable;
