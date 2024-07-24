import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  Button,
  Grid,
  Paper,
  TextField,
  Typography,
  Box,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import dayjs from "dayjs";
import "dayjs/locale/en";
import { getProducer } from "../../api/StoredApi";


function AddCustomer() {
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [debts, setDebts] = useState([
    { amount: "0", date: dayjs().format("YYYY-MM-DD") },
  ]);
  const [payments, setPayments] = useState([
    { amount: "0", date: dayjs().format("YYYY-MM-DD") },
  ]);
  const [buyers, setBuyers] = useState([
    {
      name: "",
      count: "",
      price: "",
      currency: "",
      date: dayjs().format("YYYY-MM-DD"),
    },
  ]);
  const [fromStore, setFromStore] = useState([
    {
      name: "",
      quantity: "",
      amount: "",
      currency: "",
      date: dayjs().format("YYYY-MM-DD"),
    },
  ]);

  const navigate = useNavigate();
  
  const [producers, setProducers] = useState([]);

  useEffect(() => {
    getAllProducer();
  }, []);

  const getAllProducer = async () => {
    let response = await getProducer();
    //  console.log("Fetched producers:", response.data);
    setProducers(response.data);
  };
  

  const handleDebtChange = (index, field, value) => {
    const newDebts = [...debts];
    if (field === "date") {
      newDebts[index][field] = value === "" ? "-" : value;
    } else if (field === "amount") {
      newDebts[index][field] = value === "" ? "0" : value;
    }
    setDebts(newDebts);
  };

  const handlePaymentChange = (index, field, value) => {
    const newPayments = [...payments];
    if (field === "date") {
      newPayments[index][field] = value === "" ? "-" : value;
    } else if (field === "amount") {
      newPayments[index][field] = value === "" ? "0" : value;
    }
    setPayments(newPayments);
  };


  const handleBuyerChange = (index, field, value) => {
    const newBuyers = [...buyers];
    if (field === "date") {
      newBuyers[index][field] = value === "" ? "-" : value;
    } else if (field === "amount") {
      newBuyers[index][field] = value === "" ? "0" : value;
    } else if (field === "currency") {
      if (value === "$" || value === "IQD") {
        newBuyers[index][field] = value;
      } else {
        newBuyers[index][field] = ""; 
      }
    } else {
      newBuyers[index][field] = value === "" ? "-" : value;
    }
    setBuyers(newBuyers);
  };

  const handleStoreChange = (index, field, value) => {
     const newStore = [...fromStore];
     const selectedProducer = producers.find(
       (producer) => producer._id === newStore[index].name
     );

     console.log(`Handling change for field: ${field}, value: ${value}`);

     if (field === "name") {
       newStore[index][field] = value;
       const producer = producers.find((producer) => producer._id === value);
       console.log("Selected producer:", producer);
       if (producer) {
         const quantity = parseFloat(newStore[index].quantity) || 0;
         newStore[index].amount = (producer.salePrice * quantity).toFixed(2);
         console.log(
           `Producer price: ${producer.salePrice}, Quantity: ${quantity}, Calculated amount: ${newStore[index].amount}
         `);
       } else {
         newStore[index].amount = "0.00";
       }
     } else if (field === "quantity") {
       newStore[index][field] = value;
       const quantity = parseFloat(value) || 0;
       if (selectedProducer) {
         newStore[index].amount = (
           selectedProducer.salePrice * quantity
         ).toFixed(2);
         console.log(
           `Selected producer price: ${selectedProducer.salePrice}, Quantity: ${quantity}, Calculated amount: ${newStore[index].amount}
         `);
       } else {
         newStore[index].amount = "0.00";
       }
     } else {
       newStore[index][field] = value;
     }

     // Ensure amount is not NaN
     if (isNaN(newStore[index].amount)) {
       newStore[index].amount = "0.00";
     }

    //  console.log(Updated store data: , newStore[index]);
     setFromStore(newStore);
   };
   

  const handleSubmit = async (e) => {
    e.preventDefault();
    const customer = { name, phoneNumber, debts, payments, buyers, fromStore };
    try {
      await axios.post("http://localhost:8000/customers", customer);
      navigate("/");
    } catch (error) {
      console.error("There was an error creating the customer!", error);
    }
  };

  
  return (
    <Box display="flex" justifyContent="center" mt={5}>
      <Paper elevation={3} sx={{ padding: 4, maxWidth: 800, width: "100%" }}>
        <Typography
          variant="h4"
          component="h1"
          gutterBottom
          style={{
            textAlign: "right",
            fontWeight: "bold",
            margin: "10px 0 30px 0",
          }}
        >
          اضافة زبون
        </Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={3} style={{ direction: "rtl" }}>
            {/* name */}
            <Grid item xs={12}>
              <TextField
                label="الاسم"
                fullWidth
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                variant="standard"
                InputProps={{ style: { textAlign: "right" } }}
                InputLabelProps={{ style: { right: 30, left: "auto" } }}
                sx={{
                  "& .MuiInput-underline": {
                    "&:before": {
                      borderBottomColor: "#44484e", // Normal underline color
                    },
                    "&:hover:not(.Mui-disabled):before": {
                      borderBottomColor: "#44484e", // Hover underline color
                    },
                    "&:after": {
                      borderBottomColor: "#44484e", // Focused underline color
                    },
                  },
                  "& .MuiInputLabel-root": {
                    color: "#44484e", // Normal label color
                  },
                  "& .MuiInputLabel-root.Mui-focused": {
                    color: "#44484e", // Focused label color
                  },
                }}
              />
            </Grid>
            {/* phoneNumber */}
            <Grid item xs={12}>
              <TextField
                label="رقم الهاتف"
                fullWidth
                variant="standard"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                required
                InputProps={{ style: { textAlign: "right" } }}
                InputLabelProps={{ style: { right: 30, left: "auto" } }}
                sx={{
                  "& .MuiInput-underline": {
                    "&:before": {
                      borderBottomColor: "#44484e", // Normal underline color
                    },
                    "&:hover:not(.Mui-disabled):before": {
                      borderBottomColor: "#44484e", // Hover underline color
                    },
                    "&:after": {
                      borderBottomColor: "#44484e", // Focused underline color
                    },
                  },
                  "& .MuiInputLabel-root": {
                    color: "#44484e", // Normal label color
                  },
                  "& .MuiInputLabel-root.Mui-focused": {
                    color: "#44484e", // Focused label color
                  },
                }}
              />
            </Grid>
            {/* debt */}
            <Grid item xs={12}>
              <Typography variant="h6" component="h2" gutterBottom>
                الديون
              </Typography>
              {debts.map((debt, index) => (
                <Grid container spacing={2} key={index}>
                  <Grid item xs={6}>
                    <TextField
                      label="الدين"
                      type="number"
                      fullWidth
                      variant="standard"
                      value={debt.amount}
                      onChange={(e) =>
                        handleDebtChange(index, "amount", e.target.value)
                      }
                      required
                      InputProps={{ style: { textAlign: "right" } }}
                      InputLabelProps={{ style: { right: 30, left: "auto" } }}
                      sx={{
                        "& .MuiInput-underline": {
                          "&:before": {
                            borderBottomColor: "#44484e", // Normal underline color
                          },
                          "&:hover:not(.Mui-disabled):before": {
                            borderBottomColor: "#44484e", // Hover underline color
                          },
                          "&:after": {
                            borderBottomColor: "#44484e", // Focused underline color
                          },
                        },
                        "& .MuiInputLabel-root": {
                          color: "#44484e", // Normal label color
                        },
                        "& .MuiInputLabel-root.Mui-focused": {
                          color: "#44484e", // Focused label color
                        },
                      }}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    {/* <TextField
                      label="تاريخ الدين"
                      type="date"
                      fullWidth
                      value={debt.date}
                      onChange={(e) =>
                        handleDebtChange(index, "date", e.target.value)
                      }
                      variant="standard"
                      InputLabelProps={{
                        style: { right: 30, left: "auto", textAlign: "right" },
                      }}
                      InputProps={{
                        style: { direction: "rtl", textAlign: "right" },
                      }}
                      sx={{
                        "& .MuiInput-underline": {
                          "&:before": {
                            borderBottomColor: "#44484e", // Normal underline color
                          },
                          "&:hover:not(.Mui-disabled):before": {
                            borderBottomColor: "#44484e", // Hover underline color
                          },
                          "&:after": {
                            borderBottomColor: "#44484e", // Focused underline color
                          },
                        },
                        "& .MuiInputLabel-root": {
                          color: "#44484e", // Normal label color
                        },
                        "& .MuiInputLabel-root.Mui-focused": {
                          color: "#44484e", // Focused label color
                        },
                      }}
                    /> */}
                    <TextField
                      label="تاريخ الدين"
                      type="date"
                      fullWidth
                      value={debt.date}
                      onChange={(e) =>
                        handleDebtChange(index, "date", e.target.value)
                      }
                      variant="standard"
                      InputLabelProps={{
                        style: { right: 30, left: "auto", textAlign: "right" },
                      }}
                      InputProps={{
                        style: { direction: "rtl", textAlign: "right" },
                      }}
                      sx={{
                        "& .MuiInput-underline": {
                          "&:before": {
                            borderBottomColor: "#44484e", // Normal underline color
                          },
                          "&:hover:not(.Mui-disabled):before": {
                            borderBottomColor: "#44484e", // Hover underline color
                          },
                          "&:after": {
                            borderBottomColor: "#44484e", // Focused underline color
                          },
                        },
                        "& .MuiInputLabel-root": {
                          color: "#44484e", // Normal label color
                        },
                        "& .MuiInputLabel-root.Mui-focused": {
                          color: "#44484e", // Focused label color
                        },
                      }}
                    />
                  </Grid>
                </Grid>
              ))}
            </Grid>
            {/* payment */}
            <Grid item xs={12}>
              <Typography variant="h6" component="h2" gutterBottom>
                التسديد
              </Typography>
              {payments.map((payment, index) => (
                <Grid container spacing={2} key={index}>
                  <Grid item xs={6}>
                    <TextField
                      label="التسديد"
                      type="number"
                      fullWidth
                      value={payment.amount}
                      onChange={(e) =>
                        handlePaymentChange(index, "amount", e.target.value)
                      }
                      required
                      variant="standard"
                      InputLabelProps={{
                        style: { right: 30, left: "auto", textAlign: "right" },
                      }}
                      InputProps={{
                        style: { direction: "rtl", textAlign: "right" },
                      }}
                      sx={{
                        "& .MuiInput-underline": {
                          "&:before": {
                            borderBottomColor: "#44484e", // Normal underline color
                          },
                          "&:hover:not(.Mui-disabled):before": {
                            borderBottomColor: "#44484e", // Hover underline color
                          },
                          "&:after": {
                            borderBottomColor: "#44484e", // Focused underline color
                          },
                        },
                        "& .MuiInputLabel-root": {
                          color: "#44484e", // Normal label color
                        },
                        "& .MuiInputLabel-root.Mui-focused": {
                          color: "#44484e", // Focused label color
                        },
                      }}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    {/* <LocalizationProvider
                      dateAdapter={AdapterDayjs}
                      locale={dayjs.locale("en")}
                    >
                      <DatePicker
                        // value={date}
                        // onChange={(newValue) => setDate(newValue)}
                        value={payment.date}
                        onChange={(e) =>
                          handlePaymentChange(index, "date", e.target.value)
                        }
                        slots={{
                          textField: (params) => (
                            <TextField
                              {...params}
                              label="تاريخ التسديد"
                              variant="standard"
                              type="date"
                              InputLabelProps={{
                                shrink: true,
                                style: {
                                  right: 30,
                                  left: "auto",
                                  textAlign: "right",
                                },
                              }}
                              InputProps={{
                                style: { direction: "rtl", textAlign: "right" },
                              }}
                              sx={{
                                "& .MuiInput-underline": {
                                  "&:before": {
                                    borderBottomColor: "#44484e", // Normal underline color
                                  },
                                  "&:hover:not(.Mui-disabled):before": {
                                    borderBottomColor: "#44484e", // Hover underline color
                                  },
                                  "&:after": {
                                    borderBottomColor: "#44484e", // Focused underline color
                                  },
                                },
                                "& .MuiInputLabel-root": {
                                  color: "#44484e", // Normal label color
                                },
                                "& .MuiInputLabel-root.Mui-focused": {
                                  color: "#44484e", // Focused label color
                                },
                              }}
                            />
                          ),
                        }}
                      />
                    </LocalizationProvider> */}
                    <TextField
                      label="تاريخ التسديد"
                      type="date"
                      fullWidth
                      value={payment.date}
                      onChange={(e) =>
                        handlePaymentChange(index, "date", e.target.value)
                      }
                      variant="standard"
                      InputLabelProps={{
                        shrink: true,
                        style: { right: 30, left: "auto", textAlign: "right" },
                      }}
                      InputProps={{
                        style: { direction: "rtl", textAlign: "right" },
                      }}
                      sx={{
                        "& .MuiInput-underline": {
                          "&:before": {
                            borderBottomColor: "#44484e", // Normal underline color
                          },
                          "&:hover:not(.Mui-disabled):before": {
                            borderBottomColor: "#44484e", // Hover underline color
                          },
                          "&:after": {
                            borderBottomColor: "#44484e", // Focused underline color
                          },
                        },
                        "& .MuiInputLabel-root": {
                          color: "#44484e", // Normal label color
                        },
                        "& .MuiInputLabel-root.Mui-focused": {
                          color: "#44484e", // Focused label color
                        },
                      }}
                    />
                  </Grid>
                </Grid>
              ))}
            </Grid>
            {/* buyers */}
            <Grid item xs={12}>
              <Typography variant="h6" component="h2" gutterBottom>
                البضاعة
              </Typography>
              {buyers.map((buyer, index) => (
                <Grid container spacing={2} key={index}>
                  <Grid item xs={4}>
                    <TextField
                      label="البضاعة"
                      fullWidth
                      value={buyer.name}
                      onChange={(e) =>
                        handleBuyerChange(index, "name", e.target.value)
                      }
                      required
                      variant="standard"
                      InputLabelProps={{
                        style: { right: 30, left: "auto", textAlign: "right" },
                      }}
                      InputProps={{
                        style: { direction: "rtl", textAlign: "right" },
                      }}
                      sx={{
                        "& .MuiInput-underline": {
                          "&:before": {
                            borderBottomColor: "#44484e", // Normal underline color
                          },
                          "&:hover:not(.Mui-disabled):before": {
                            borderBottomColor: "#44484e", // Hover underline color
                          },
                          "&:after": {
                            borderBottomColor: "#44484e", // Focused underline color
                          },
                        },
                        "& .MuiInputLabel-root": {
                          color: "#44484e", // Normal label color
                        },
                        "& .MuiInputLabel-root.Mui-focused": {
                          color: "#44484e", // Focused label color
                        },
                      }}
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <TextField
                      label="العدد"
                      type="number"
                      fullWidth
                      value={buyer.count}
                      onChange={(e) =>
                        handleBuyerChange(index, "count", e.target.value)
                      }
                      required
                      variant="standard"
                      InputLabelProps={{
                        style: { right: 30, left: "auto", textAlign: "right" },
                      }}
                      InputProps={{
                        style: { direction: "rtl", textAlign: "right" },
                      }}
                      sx={{
                        "& .MuiInput-underline": {
                          "&:before": {
                            borderBottomColor: "#44484e", // Normal underline color
                          },
                          "&:hover:not(.Mui-disabled):before": {
                            borderBottomColor: "#44484e", // Hover underline color
                          },
                          "&:after": {
                            borderBottomColor: "#44484e", // Focused underline color
                          },
                        },
                        "& .MuiInputLabel-root": {
                          color: "#44484e", // Normal label color
                        },
                        "& .MuiInputLabel-root.Mui-focused": {
                          color: "#44484e", // Focused label color
                        },
                      }}
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <TextField
                      label="السعر"
                      value={buyer.price}
                      onChange={(e) =>
                        handleBuyerChange(index, "price", e.target.value)
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
                            borderBottomColor: "#44484e", // Normal underline color
                          },
                          "&:hover:not(.Mui-disabled):before": {
                            borderBottomColor: "#44484e", // Hover underline color
                          },
                          "&:after": {
                            borderBottomColor: "#44484e", // Focused underline color
                          },
                        },
                        "& .MuiInputLabel-root": {
                          color: "#44484e", // Normal label color
                        },
                        "& .MuiInputLabel-root.Mui-focused": {
                          color: "#44484e", // Focused label color
                        },
                      }}
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <Grid container spacing={2} marginTop={"2px"}>
                      <Grid item xs={6} md={4}>
                        <InputLabel
                          style={{ right: 30, left: "auto", margin: "10px" }}
                          sx={{
                            color: "#44484e",
                            "&.Mui-focused": {
                              color: "#44484e",
                            },
                            right: 30,
                            left: "auto",
                          }}
                        >
                          العملة
                        </InputLabel>
                      </Grid>
                      <Grid item xs={6} md={4}>
                        <Select
                          label="العملة"
                          value={buyer.currency}
                          onChange={(e) =>
                            handleBuyerChange(index, "currency", e.target.value)
                          }
                          variant="standard"
                          // sx={{ textAlign: "right" }}
                          sx={{
                            textAlign: "right",
                            "& .MuiSelect-select": {
                              textAlign: "right", // Align text to the right
                            },
                            "&:before": {
                              borderBottomColor: "#44484e", // Normal underline color
                            },
                            "&:hover:not(.Mui-disabled):before": {
                              borderBottomColor: "#44484e", // Hover underline color
                            },
                            "&:after": {
                              borderBottomColor: "#44484e", // Focused underline color
                            },
                          }}
                        >
                          <MenuItem value="$">$</MenuItem>
                          <MenuItem value="IQD">IQD</MenuItem>
                        </Select>
                      </Grid>
                    </Grid>
                  </Grid>

                  <Grid item xs={4}>
                    <TextField
                      label="التاريخ"
                      type="date"
                      fullWidth
                      value={buyer.date}
                      onChange={(e) =>
                        handleBuyerChange(index, "date", e.target.value)
                      }
                      required
                      variant="standard"
                      InputLabelProps={{
                        shrink: true,
                        style: { right: 30, left: "auto", textAlign: "right" },
                      }}
                      InputProps={{
                        style: { direction: "rtl", textAlign: "right" },
                      }}
                      sx={{
                        "& .MuiInput-underline": {
                          "&:before": {
                            borderBottomColor: "#44484e", // Normal underline color
                          },
                          "&:hover:not(.Mui-disabled):before": {
                            borderBottomColor: "#44484e", // Hover underline color
                          },
                          "&:after": {
                            borderBottomColor: "#44484e", // Focused underline color
                          },
                        },
                        "& .MuiInputLabel-root": {
                          color: "#44484e", // Normal label color
                        },
                        "& .MuiInputLabel-root.Mui-focused": {
                          color: "#44484e", // Focused label color
                        },
                      }}
                    />
                  </Grid>
                </Grid>
              ))}
            </Grid>
            {/* fromStore */}
            <Grid item xs={12}>
              <Typography variant="h6" component="h2" gutterBottom>
                المخزن
              </Typography>
              {fromStore.map((store, index) => (
                <Grid container spacing={2} key={index}>
                  <Grid item xs={4}>
                    <Select
                      labelId="category-label"
                      value={store.name} 
                      onChange={(e) =>
                        handleStoreChange(index, "name", e.target.value)
                      }
                      displayEmpty
                      sx={{ width: "200px" }}
                    >
                      <MenuItem disabled value="">
                        <em>اختر فئة</em>
                      </MenuItem>
                      {producers?.map((p) => (
                        <MenuItem key={p._id} value={p._id}>
                          {p.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </Grid>
                  <Grid item xs={4}>
                    <TextField
                      label="العدد"
                      // type="number"
                      fullWidth
                      value={store.quantity}
                      onChange={(e) =>
                        handleStoreChange(index, "quantity", e.target.value)
                      }
                      required
                      variant="standard"
                      InputLabelProps={{
                        style: { right: 30, left: "auto", textAlign: "right" },
                      }}
                      InputProps={{
                        style: { direction: "rtl", textAlign: "right" },
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
                  </Grid>
                  <Grid item xs={4}>
                    <TextField
                      label="السعر"
                      value={store.amount}
                      onChange={(e) =>
                        handleStoreChange(index, "amount", e.target.value)
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
                  </Grid>
                  <Grid item xs={4}>
                    <Grid container spacing={2} marginTop={"2px"}>
                      <Grid item xs={6} md={4}>
                        <InputLabel
                          style={{ right: 30, left: "auto", margin: "10px" }}
                          sx={{
                            color: "#44484e",
                            "&.Mui-focused": {
                              color: "#44484e",
                            },
                            right: 30,
                            left: "auto",
                          }}
                        >
                          العملة
                        </InputLabel>
                      </Grid>
                      <Grid item xs={6} md={4}>
                        <Select
                          label="العملة"
                          value={store.currency} // Updated value to reflect current state
                          onChange={(e) =>
                            handleStoreChange(index, "currency", e.target.value)
                          }
                          variant="standard"
                          sx={{
                            textAlign: "right",
                            "& .MuiSelect-select": {
                              textAlign: "right",
                            },
                            "&:before": {
                              borderBottomColor: "#44484e",
                            },
                            "&:hover:not(.Mui-disabled):before": {
                              borderBottomColor: "#44484e",
                            },
                            "&:after": {
                              borderBottomColor: "#44484e",
                            },
                          }}
                        >
                          <MenuItem value="$">$</MenuItem>
                          <MenuItem value="IQD">IQD</MenuItem>
                        </Select>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item xs={4}>
                    <TextField
                      label="التاريخ"
                      type="date"
                      fullWidth
                      value={store.date}
                      onChange={(e) =>
                        handleStoreChange(index, "date", e.target.value)
                      }
                      required
                      variant="standard"
                      InputLabelProps={{
                        shrink: true,
                        style: { right: 30, left: "auto", textAlign: "right" },
                      }}
                      InputProps={{
                        style: { direction: "rtl", textAlign: "right" },
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
                  </Grid>
                </Grid>
              ))}
            </Grid>

            {/* button */}
            <Grid item xs={12}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                sx={{
                  background: "#44484e",
                  fontWeight: "bold",
                  fontSize: "22px",
                  "&:hover": {
                    backgroundColor: "#5c6169",
                  },
                }}
              >
                اضافة زبون
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Box>
  );
}

export default AddCustomer;


