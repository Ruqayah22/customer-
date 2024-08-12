/* eslint-disable react-hooks/exhaustive-deps */
// import React, { useEffect, useState } from "react";
// import { Box, Button, Grid, TextField, Typography } from "@mui/material";
// import { LocalizationProvider, MobileDatePicker } from "@mui/x-date-pickers";
// import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
// import dayjs from "dayjs";

// const apiUrl = process.env.REACT_APP_SERVER_URL;

// const UpdateEmployee = () => {
  

  
  

//   const handleSubmit = async (event) => {
//     event.preventDefault();

   
//   };

  
//   return (
//     <>
//       <Box
//         sx={{
//           display: "flex",
//           justifyContent: "center",
//         }}
//       >
//         <Box
//           sx={{
//             display: "flex",
//             flexDirection: "column",
//             alignItems: "center",
//             width: "600px",
//             padding: "20px",
//             // backgroundImage: `url(${backgroundImage})`,
//             backgroundSize: "cover",
//             backgroundPosition: "center",
//             borderRadius: "10px",
//             boxShadow: "10px 0px 10px rgba(255, 255, 255, 0.3)",
//           }}
//         >
//           <Typography
//             gutterBottom
//             variant="h4"
//             component="div"
//             style={{ textAlign: "center", fontWeight: "bold" }}
//           >
//             تعديل موظف
//           </Typography>

//           <Box
//             sx={{
//               display: "flex",
//               justifyContent: "center",
//             }}
//           >
//             <Box
//               sx={{
//                 display: "flex",
//                 flexDirection: "column",
//                 alignItems: "center",
//                 width: "600px",
//                 padding: "20px",
//               }}
//             >
//               <Grid
//                 container
//                 spacing={2}
//                 sx={{ display: "flex", justifyContent: "center" }}
//               >
//                 <Grid item xs={12} md={6} sx={{ margin: "30px 0 10px 100px" }}>
//                   <input
//                     type="file"
//                     accept="image/*"
//                     id="photo-input"
//                     onChange={}
//                     style={{ display: "none" }}
//                   />
//                   <label htmlFor="photo-input">
//                     <Button variant="outlined" component="span" fullWidth>
//                       {photo ? photo.name : "Upload Photo"}
//                     </Button>
//                   </label>
//                 </Grid>
//                 {photo && (
//                   <Grid item xs={12} md={6}>
//                     <div className="text-center">
//                       <img
//                         src={URL.createObjectURL(photo)}
//                         alt="product_photo"
//                         height={200}
//                         className="img img-responsive"
//                       />
//                     </div>
//                   </Grid>
//                 )}
//               </Grid>
//               <Box sx={{ margin: "10px" }}>
//                 <TextField
//                   type="text"
//                   name="name"
//                   value={formData.name}
//                   placeholder="الاسم"
//                   onChange={handleChange}
//                   variant="outlined"
//                   autoComplete="name"
//                   autoFocus
//                   sx={{
//                     "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
//                       {
//                         borderColor: "#91C7B1",
//                       },
//                     "& .MuiInputLabel-root.Mui-focused": {
//                       color: "#91C7B1",
//                     },

//                     width: "100%",
//                     marginBottom: "10px",
//                   }}
//                 />

//                 <TextField
//                   type="text"
//                   name="phoneNumber"
//                   value={phoneNumber}
//                   placeholder=" رقم الهاتف"
//                   onChange={}
//                   fullWidth
//                   variant="outlined"
//                   autoComplete="phoneNumber"
//                   autoFocus
//                   sx={{
//                     "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
//                       {
//                         borderColor: "#91C7B1",
//                       },
//                     "& .MuiInputLabel-root.Mui-focused": {
//                       color: "#91C7B1",
//                     },

//                     width: "100%",
//                     marginBottom: "10px",
//                   }}
//                 />
//                 <LocalizationProvider dateAdapter={AdapterDayjs}>
//                   <MobileDatePicker
//                     placeholder="المواليد"
//                     inputFormat="MM/DD/YYYY"
//                     value={birth}
//                     onChange={}
//                     slotProps={{
//                       textField: {
//                         fullWidth: true,
//                         sx: {
//                           "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
//                             {
//                               borderColor: "#91C7B1",
//                             },
//                           "& .MuiInputLabel-root.Mui-focused": {
//                             color: "#91C7B1",
//                           },
//                           width: "100%",
//                           marginBottom: "10px",
//                         },
//                       },
//                     }}
//                   />
//                 </LocalizationProvider>

//                 <TextField
//                   type="text"
//                   name="job"
//                   value={job}
//                   placeholder="الوظيفة"
//                   onChange={}
//                   fullWidth
//                   variant="outlined"
//                   autoComplete="job"
//                   autoFocus
//                   sx={{
//                     "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
//                       {
//                         borderColor: "#91C7B1",
//                       },
//                     "& .MuiInputLabel-root.Mui-focused": {
//                       color: "#91C7B1",
//                     },

//                     width: "100%",
//                     marginBottom: "10px",
//                   }}
//                 />

//                 <TextField
//                   type="text"
//                   name="salary"
//                   value={salary}
//                   placeholder="الراتب"
//                   onChange={}
//                   fullWidth
//                   variant="outlined"
//                   autoComplete="salary"
//                   autoFocus
//                   sx={{
//                     "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
//                       {
//                         borderColor: "#91C7B1",
//                       },
//                     "& .MuiInputLabel-root.Mui-focused": {
//                       color: "#91C7B1",
//                     },

//                     width: "100%",
//                     marginBottom: "10px",
//                   }}
//                 />
//                 <TextField
//                   type="text"
//                   name="address"
//                   value={address}
//                   placeholder="العنوان"
//                   onChange={}
//                   fullWidth
//                   variant="outlined"
//                   autoComplete="address"
//                   autoFocus
//                   sx={{
//                     "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
//                       {
//                         borderColor: "#91C7B1",
//                       },
//                     "& .MuiInputLabel-root.Mui-focused": {
//                       color: "#91C7B1",
//                     },

//                     width: "100%",
//                     marginBottom: "10px",
//                   }}
//                 />
//                 <LocalizationProvider dateAdapter={AdapterDayjs}>
//                   <MobileDatePicker
//                     placeholder="تاريخ التوظيف"
//                     inputFormat="MM/DD/YYYY"
//                     value={date}
//                     onChange={}
//                     slotProps={{
//                       textField: {
//                         fullWidth: true,
//                         sx: {
//                           "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
//                             {
//                               borderColor: "#91C7B1",
//                             },
//                           "& .MuiInputLabel-root.Mui-focused": {
//                             color: "#91C7B1",
//                           },
//                           width: "100%",
//                           marginBottom: "10px",
//                         },
//                       },
//                     }}
//                   />
//                 </LocalizationProvider>
//               </Box>
//               <Button
//                 type="submit"
//                 variant="contained"
//                 sx={{
//                   mt: 3,
//                   mb: 2,
//                   fontSize: "25px",
//                   bgcolor: "#44484e",
//                   "&:hover": {
//                     bgcolor: "#80868e",
//                   },
//                   width: "50%",
//                 }}
//                 onClick={handleSubmit}
//               >
//                 تعديل موظف
//               </Button>
//             </Box>
//           </Box>
//         </Box>
//       </Box>
//     </>
//   );
// };

// export default UpdateEmployee;

// import React, { useEffect, useState } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import { Box, Button, Grid, TextField, Typography } from "@mui/material";
// import { LocalizationProvider, MobileDatePicker } from "@mui/x-date-pickers";
// import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
// import axios from "axios";
// import dayjs from "dayjs";

// const apiUrl = process.env.REACT_APP_SERVER_URL;

// const UpdateEmployee = () => {
//   const [name, setName] = useState("");
//   const [phoneNumber, setPhoneNumber] = useState("");
//   const [birth, setBirth] = useState(dayjs());
  
//   const [job, setJob] = useState("");
//   const [salary, setSalary] = useState("");
//   const [address, setAddress] = useState("");
//   const [photo, setPhoto] = useState("");
//   const [date, setDate] = useState(dayjs());
//   const [id, setId] = useState("");

//   const navigate = useNavigate();
//   const params = useParams();

//   const handleFileChange = (e) => {
//     setPhoto(e.target.files[0]);
//   };

//   //get single product
//   const getSingleEmployee = async () => {
//     try {
//       const { data } = await axios.get(`${apiUrl}/employee/${params.id}`);
//       setName(data.employee.name);
//       setId(data.employee._id);
//       setPhoneNumber(data.employee.phoneNumber);
//       setBirth(data.employee.birth ? dayjs(data.employee.birth) : null); 
//       setJob(data.employee.job);
//       setSalary(data.employee.salary);
//       setAddress(data.employee.address);
//       setDate(data.employee.date ? dayjs(data.employee.date) : null); 
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   useEffect(() => {
//     getSingleEmployee();
//     //eslint-disable-next-line
//   }, []);

//   const handleSubmit = async (event) => {
//     event.preventDefault();
//     try {
//       const EmployeeData = new FormData();
//       EmployeeData.append("name", name);
//       EmployeeData.append("phoneNumber", phoneNumber);
//       EmployeeData.append("birth", birth.format("YYYY-MM-DD")); 
//       EmployeeData.append("job", job);
//       EmployeeData.append("salary", salary);
//       photo && EmployeeData.append("photo", photo);
//       EmployeeData.append("address", address);
//       EmployeeData.append("date", date.format("YYYY-MM-DD")); 

//       const { data } = await axios.put(
//         `${apiUrl}/employee/${id}`, 
//         EmployeeData
//       );
//       if (data?.success) {
//         window.alert("Employee updated successfully");
//         navigate("/employees");
//       } else {
//         console.error(data?.message);
//       }
//     } catch (error) {
//       console.error("Something went wrong", error);
//     }
//   };

//   const handleBirthChange = (newValue) => {
//     setBirth(newValue || dayjs());
//   };

//   const handleDateChange = (newValue) => {
//     setDate(newValue || dayjs());
//   };


//   return (
//     <>
//       <Box
//         sx={{
//           display: "flex",
//           justifyContent: "center",
//         }}
//       >
//         <Box
//           sx={{
//             display: "flex",
//             flexDirection: "column",
//             alignItems: "center",
//             width: "600px",
//             padding: "20px",
//             backgroundSize: "cover",
//             backgroundPosition: "center",
//             borderRadius: "10px",
//             boxShadow: "10px 0px 10px rgba(255, 255, 255, 0.3)",
//           }}
//         >
//           <Typography
//             gutterBottom
//             variant="h4"
//             component="div"
//             style={{ textAlign: "center", fontWeight: "bold" }}
//           >
//             تعديل موظف
//           </Typography>

//           <Box
//             sx={{
//               display: "flex",
//               justifyContent: "center",
//             }}
//           >
//             <Box
//               sx={{
//                 display: "flex",
//                 flexDirection: "column",
//                 alignItems: "center",
//                 width: "600px",
//                 padding: "20px",
//               }}
//             >
//               <Grid
//                 container
//                 spacing={2}
//                 sx={{ display: "flex", justifyContent: "center" }}
//               >
//                 <Grid item xs={12} md={6} sx={{ margin: "30px 0 10px 100px" }}>
//                   <input
//                     type="file"
//                     accept="image/*"
//                     id="photo-input"
//                     onChange={handleFileChange}
//                     style={{ display: "none" }}
//                   />
//                   <label htmlFor="photo-input">
//                     <Button variant="outlined" component="span" fullWidth>
//                       {photo ? photo.name : "Upload Photo"}
//                     </Button>
//                   </label>
//                 </Grid>
//                 {photo && (
//                   <Grid item xs={12} md={6}>
//                     <div className="text-center">
//                       <img
//                         src={URL.createObjectURL(photo)}
//                         alt="employee_photo"
//                         height={200}
//                         className="img img-responsive"
//                       />
//                     </div>
//                   </Grid>
//                 )}
//               </Grid>
//               <Box sx={{ margin: "10px" }}>
//                 <TextField
//                   type="text"
//                   name="name"
//                   value={name}
//                   placeholder="الاسم"
//                   onChange={(e) => setName(e.target.value)}
//                   variant="outlined"
//                   autoComplete="name"
//                   autoFocus
//                   sx={{
//                     "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
//                       {
//                         borderColor: "#91C7B1",
//                       },
//                     "& .MuiInputLabel-root.Mui-focused": {
//                       color: "#91C7B1",
//                     },
//                     width: "100%",
//                     marginBottom: "10px",
//                   }}
//                 />

//                 <TextField
//                   type="text"
//                   name="phoneNumber"
//                   value={phoneNumber}
//                   placeholder="رقم الهاتف"
//                   onChange={(e) => setPhoneNumber(e.target.value)}
//                   fullWidth
//                   variant="outlined"
//                   autoComplete="phoneNumber"
//                   autoFocus
//                   sx={{
//                     "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
//                       {
//                         borderColor: "#91C7B1",
//                       },
//                     "& .MuiInputLabel-root.Mui-focused": {
//                       color: "#91C7B1",
//                     },
//                     width: "100%",
//                     marginBottom: "10px",
//                   }}
//                 />
//                 {/* <LocalizationProvider dateAdapter={AdapterDayjs}>
//                   <MobileDatePicker
//                     placeholder="المواليد"
//                     inputFormat="MM/DD/YYYY"
//                     value={birth}
//                     // onChange={(e) => setBirth(e.target.value)}
//                     onChange={handleBirthChange}
//                     slotProps={{
//                       textField: {
//                         fullWidth: true,
//                         sx: {
//                           "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
//                             {
//                               borderColor: "#91C7B1",
//                             },
//                           "& .MuiInputLabel-root.Mui-focused": {
//                             color: "#91C7B1",
//                           },
//                           width: "100%",
//                           marginBottom: "10px",
//                         },
//                       },
//                     }}
//                   />
//                 </LocalizationProvider> */}
//                 <LocalizationProvider dateAdapter={AdapterDayjs}>
//                   <MobileDatePicker
//                     placeholder="المواليد"
//                     inputFormat="MM/DD/YYYY"
//                     value={birth}
//                     onChange={handleBirthChange}
//                     renderInput={(params) => (
//                       <TextField
//                         {...params}
//                         fullWidth
//                         sx={{
//                           "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
//                             {
//                               borderColor: "#91C7B1",
//                             },
//                           "& .MuiInputLabel-root.Mui-focused": {
//                             color: "#91C7B1",
//                           },
//                           width: "100%",
//                           marginBottom: "10px",
//                         }}
//                       />
//                     )}
//                   />
//                 </LocalizationProvider>

//                 <TextField
//                   type="text"
//                   name="job"
//                   value={job}
//                   placeholder="الوظيفة"
//                   onChange={(e) => setJob(e.target.value)}
//                   fullWidth
//                   variant="outlined"
//                   autoComplete="job"
//                   autoFocus
//                   sx={{
//                     "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
//                       {
//                         borderColor: "#91C7B1",
//                       },
//                     "& .MuiInputLabel-root.Mui-focused": {
//                       color: "#91C7B1",
//                     },
//                     width: "100%",
//                     marginBottom: "10px",
//                   }}
//                 />

//                 <TextField
//                   type="text"
//                   name="salary"
//                   value={salary}
//                   placeholder="الراتب"
//                   onChange={(e) => setSalary(e.target.value)}
//                   fullWidth
//                   variant="outlined"
//                   autoComplete="salary"
//                   autoFocus
//                   sx={{
//                     "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
//                       {
//                         borderColor: "#91C7B1",
//                       },
//                     "& .MuiInputLabel-root.Mui-focused": {
//                       color: "#91C7B1",
//                     },
//                     width: "100%",
//                     marginBottom: "10px",
//                   }}
//                 />
//                 <TextField
//                   type="text"
//                   name="address"
//                   value={address}
//                   placeholder="العنوان"
//                   onChange={(e) => setAddress(e.target.value)}
//                   fullWidth
//                   variant="outlined"
//                   autoComplete="address"
//                   autoFocus
//                   sx={{
//                     "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
//                       {
//                         borderColor: "#91C7B1",
//                       },
//                     "& .MuiInputLabel-root.Mui-focused": {
//                       color: "#91C7B1",
//                     },
//                     width: "100%",
//                     marginBottom: "10px",
//                   }}
//                 />
//                 <LocalizationProvider dateAdapter={AdapterDayjs}>
//                   <MobileDatePicker
//                     placeholder="تاريخ التوظيف"
//                     inputFormat="MM/DD/YYYY"
//                     value={date}
//                     // onChange={(e) => setDate(e.target.value)}
//                     onChange={handleDateChange}
//                     slotProps={{
//                       textField: {
//                         fullWidth: true,
//                         sx: {
//                           "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
//                             {
//                               borderColor: "#91C7B1",
//                             },
//                           "& .MuiInputLabel-root.Mui-focused": {
//                             color: "#91C7B1",
//                           },
//                           width: "100%",
//                           marginBottom: "10px",
//                         },
//                       },
//                     }}
//                   />
//                 </LocalizationProvider>
//               </Box>

//               <Button
//                 onClick={handleSubmit}
//                 type="submit"
//                 variant="contained"
//                 sx={{
//                   backgroundColor: "#91C7B1",
//                   color: "#fff",
//                   fontWeight: "bold",
//                   "&:hover": {
//                     backgroundColor: "#81B9A8",
//                   },
//                 }}
//                 fullWidth
//               >
//                 تعديل موظف
//               </Button>
//             </Box>
//           </Box>
//         </Box>
//       </Box>
//     </>
//   );
// };

// export default UpdateEmployee;

import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import { LocalizationProvider, MobileDatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import axios from "axios";
import dayjs from "dayjs";

const apiUrl = process.env.REACT_APP_SERVER_URL;

const UpdateEmployee = () => {
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [birth, setBirth] = useState(dayjs());
  const [job, setJob] = useState("");
  const [salary, setSalary] = useState("");
  const [address, setAddress] = useState("");
  const [photo, setPhoto] = useState("");
  const [date, setDate] = useState(dayjs());
  const [id, setId] = useState("");

  const navigate = useNavigate();
  const params = useParams();

  const handleFileChange = (e) => {
    setPhoto(e.target.files[0]);
  };

  const getSingleEmployee = async () => {
    try {
      const { data } = await axios.get(`${apiUrl}/employee/${params.id}`);
      setName(data.employee.name);
      setId(data.employee._id);
      setPhoneNumber(data.employee.phoneNumber);
      setBirth(data.employee.birth ? dayjs(data.employee.birth) : null);
      setJob(data.employee.job);
      setSalary(data.employee.salary);
      setAddress(data.employee.address);
      setDate(data.employee.date ? dayjs(data.employee.date) : null);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getSingleEmployee();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const EmployeeData = new FormData();
      EmployeeData.append("name", name);
      EmployeeData.append("phoneNumber", phoneNumber);
      EmployeeData.append("birth", birth.format("YYYY-MM-DD"));
      EmployeeData.append("job", job);
      EmployeeData.append("salary", salary);
      EmployeeData.append("address", address);
      EmployeeData.append("date", date.format("YYYY-MM-DD"));
      photo && EmployeeData.append("photo", photo);

      // If your employee schema contains debts and payments,
      // you need to serialize them into a format that can be appended to FormData.
      // For example, you can use JSON.stringify:
      // if (debts) EmployeeData.append("debts", JSON.stringify(debts));
      // if (payments) EmployeeData.append("payments", JSON.stringify(payments));

      const { data } = await axios.put(
        `${apiUrl}/employee/${id}`,
        EmployeeData
      );
      if (data?.success) {
        window.alert("Employee updated successfully");
        navigate("/employees");
      } else {
        console.error(data?.message);
      }
    } catch (error) {
      console.error("Something went wrong", error);
    }
  };

  const handleBirthChange = (newValue) => {
    setBirth(newValue || dayjs());
  };

  const handleDateChange = (newValue) => {
    setDate(newValue || dayjs());
  };

  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            width: "600px",
            padding: "20px",
            backgroundSize: "cover",
            backgroundPosition: "center",
            borderRadius: "10px",
            boxShadow: "10px 0px 10px rgba(255, 255, 255, 0.3)",
          }}
        >
          <Typography
            gutterBottom
            variant="h4"
            component="div"
            style={{ textAlign: "center", fontWeight: "bold" }}
          >
            تعديل موظف
          </Typography>

          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                width: "600px",
                padding: "20px",
              }}
            >
              <Grid
                container
                spacing={2}
                sx={{ display: "flex", justifyContent: "center" }}
              >
                <Grid item xs={12} md={6} sx={{ margin: "30px 0 10px 100px" }}>
                  <input
                    type="file"
                    accept="image/*"
                    id="photo-input"
                    onChange={handleFileChange}
                    style={{ display: "none" }}
                  />
                  <label htmlFor="photo-input">
                    <Button variant="outlined" component="span" fullWidth>
                      {photo ? photo.name : "تحميل الصورة"}
                    </Button>
                  </label>
                </Grid>
                {photo && (
                  <Grid item xs={12} md={6}>
                    <div className="text-center">
                      <img
                        src={URL.createObjectURL(photo)}
                        alt="employee_photo"
                        height={200}
                        className="img img-responsive"
                      />
                    </div>
                  </Grid>
                )}
              </Grid>
              <Box sx={{ margin: "10px" }}>
                <TextField
                  type="text"
                  name="name"
                  value={name}
                  label="الاسم"
                  onChange={(e) => setName(e.target.value)}
                  variant="outlined"
                  autoComplete="name"
                  autoFocus
                  sx={{
                    "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
                      {
                        borderColor: "#91C7B1",
                      },
                    "& .MuiInputLabel-root.Mui-focused": {
                      color: "#91C7B1",
                    },
                    width: "100%",
                    marginBottom: "10px",
                  }}
                />

                <TextField
                  type="text"
                  name="phoneNumber"
                  value={phoneNumber}
                  label="رقم الهاتف"
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  fullWidth
                  variant="outlined"
                  autoComplete="phoneNumber"
                  autoFocus
                  sx={{
                    "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
                      {
                        borderColor: "#91C7B1",
                      },
                    "& .MuiInputLabel-root.Mui-focused": {
                      color: "#91C7B1",
                    },
                    width: "100%",
                    marginBottom: "10px",
                  }}
                />

                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <MobileDatePicker
                    label="المواليد"
                    inputFormat="MM/DD/YYYY"
                    value={dayjs(birth)}
                    onChange={handleBirthChange}
                    // renderInput={(params) => (
                    //   <TextField
                    //     {...params}
                    //     fullWidth
                    //     sx={{
                    //       "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
                    //         {
                    //           borderColor: "#91C7B1",
                    //         },
                    //       "& .MuiInputLabel-root.Mui-focused": {
                    //         color: "#91C7B1",
                    //       },
                    //       width: "100%",
                    //       marginBottom: "10px",
                    //     }}
                    //   />
                    // )}
                    slotProps={{
                      textField: {
                        fullWidth: true,
                        sx: {
                          "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
                            {
                              borderColor: "#91C7B1",
                            },
                          "& .MuiInputLabel-root.Mui-focused": {
                            color: "#91C7B1",
                          },
                          width: "100%",
                          marginBottom: "10px",
                        },
                      },
                    }}
                  />
                </LocalizationProvider>

                <TextField
                  type="text"
                  name="job"
                  value={job}
                  label="الوظيفة"
                  onChange={(e) => setJob(e.target.value)}
                  fullWidth
                  variant="outlined"
                  autoComplete="job"
                  autoFocus
                  sx={{
                    "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
                      {
                        borderColor: "#91C7B1",
                      },
                    "& .MuiInputLabel-root.Mui-focused": {
                      color: "#91C7B1",
                    },
                    width: "100%",
                    marginBottom: "10px",
                  }}
                />

                <TextField
                  type="text"
                  name="salary"
                  value={salary}
                  label="الراتب"
                  onChange={(e) => setSalary(e.target.value)}
                  fullWidth
                  variant="outlined"
                  autoComplete="salary"
                  autoFocus
                  sx={{
                    "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
                      {
                        borderColor: "#91C7B1",
                      },
                    "& .MuiInputLabel-root.Mui-focused": {
                      color: "#91C7B1",
                    },
                    width: "100%",
                    marginBottom: "10px",
                  }}
                />
                <TextField
                  type="text"
                  name="address"
                  value={address}
                  label="العنوان"
                  onChange={(e) => setAddress(e.target.value)}
                  fullWidth
                  variant="outlined"
                  autoComplete="address"
                  autoFocus
                  sx={{
                    "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
                      {
                        borderColor: "#91C7B1",
                      },
                    "& .MuiInputLabel-root.Mui-focused": {
                      color: "#91C7B1",
                    },
                    width: "100%",
                    marginBottom: "10px",
                  }}
                />
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <MobileDatePicker
                    label="تاريخ التوظيف"
                    inputFormat="MM/DD/YYYY"
                    value={dayjs(date)}
                    onChange={handleDateChange}
                    // renderInput={(params) => (
                    //   <TextField
                    //     {...params}
                    //     fullWidth
                    //     sx={{
                    //       "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
                    //         {
                    //           borderColor: "#91C7B1",
                    //         },
                    //       "& .MuiInputLabel-root.Mui-focused": {
                    //         color: "#91C7B1",
                    //       },
                    //       width: "100%",
                    //       marginBottom: "10px",
                    //     }}
                    //   />
                    // )}
                    slotProps={{
                      textField: {
                        fullWidth: true,
                        sx: {
                          "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
                            {
                              borderColor: "#91C7B1",
                            },
                          "& .MuiInputLabel-root.Mui-focused": {
                            color: "#91C7B1",
                          },
                          width: "100%",
                          marginBottom: "10px",
                        },
                      },
                    }}
                  />
                </LocalizationProvider>
              </Box>

              <Button
                variant="contained"
                color="primary"
                onClick={handleSubmit}
                sx={{
                  backgroundColor: "#91C7B1",
                  "&:hover": {
                    backgroundColor: "#5A9F83",
                  },
                  width: "100%",
                }}
              >
                 تعديل موظف
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default UpdateEmployee;
