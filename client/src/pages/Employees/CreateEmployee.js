import React, { useState } from "react";
import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import dayjs from "dayjs";
// import dayjs from "dayjs";
import { LocalizationProvider, MobileDatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

const apiUrl = process.env.REACT_APP_SERVER_URL;

const CreateEmployee = () => {
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [birth, setBirth] = useState(dayjs().format("YYYY-MM-DD"));
  const [job, setJob] = useState("");
  const [salary, setSalary] = useState("");
  const [address, setAddress] = useState("");
  const [date, setDate] = useState(dayjs().format("YYYY-MM-DD"));
  const [photo, setPhoto] = useState("");
  
  
  const navigate = useNavigate();

  const handleFileChange = (e) => {
    setPhoto(e.target.files[0]);
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      const employeeData = new FormData();
      employeeData.append("name", name);
      employeeData.append("phoneNumber", phoneNumber);
      employeeData.append("birth", dayjs(birth).format("YYYY-MM-DD"));
      employeeData.append("job", job);
      employeeData.append("salary", salary);
      employeeData.append("address", address);
      employeeData.append("date", dayjs(date).format("YYYY-MM-DD"));
      employeeData.append("photo", photo);

      const { data } = await axios.post(
        `${apiUrl}/employee/createEmployee`,
        employeeData
      );
      if (data?.success) {
        toast.success("Employee Created Successfully");
        navigate("/employees");
      } else {
        toast.error(data?.message);
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    }
  };

  const handleDateChange = (newValue) => {
    setBirth(newValue.format("YYYY-MM-DD"));
  };

  const handleDateChange2 = (newValue) => {
    setDate(newValue.format("YYYY-MM-DD"));
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
            // backgroundImage: `url(${backgroundImage})`,
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
            اضافة موظف
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
                      {photo ? photo.name : "Upload Photo"}
                    </Button>
                  </label>
                </Grid>
                {photo && (
                  <Grid item xs={12} md={6}>
                    <div className="text-center">
                      <img
                        src={URL.createObjectURL(photo)}
                        alt="product_photo"
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
                  placeholder="الاسم"
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
                  placeholder=" رقم الهاتف"
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
                    placeholder="المواليد"
                    inputFormat="MM/DD/YYYY"
                    value={dayjs(birth)}
                    onChange={handleDateChange}
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
                {/* <TextField
                  type="data"
                  name="birth"
                  value={birth}
                  placeholder="المواليد"
                  onChange={(e) => setBirth(e.target.value)}
                  fullWidth
                  variant="outlined"
                  autoComplete="birth"
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
                /> */}

                <TextField
                  type="text"
                  name="job"
                  value={job}
                  placeholder="الوظيفة"
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
                  placeholder="الراتب"
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
                  placeholder="العنوان"
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
                    placeholder="تاريخ التوظيف"
                    inputFormat="MM/DD/YYYY"
                    value={dayjs(date)}
                    onChange={handleDateChange2}
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
                {/* <TextField
                  type="text"
                  name="date"
                  value={date}
                  placeholder="تاريخ التوظيف"
                  onChange={(e) => setDate(e.target.value)}
                  fullWidth
                  variant="outlined"
                  autoComplete="date"
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
                /> */}
              </Box>
              <Button
                type="submit"
                variant="contained"
                sx={{
                  mt: 3,
                  mb: 2,
                  fontSize: "25px",
                  bgcolor: "#44484e",
                  "&:hover": {
                    bgcolor: "#80868e",
                  },
                  width: "50%",
                }}
                onClick={handleCreate}
              >
                اضافة موظف
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default CreateEmployee;
