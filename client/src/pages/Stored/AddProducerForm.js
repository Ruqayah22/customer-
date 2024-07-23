import React, { useState } from "react";

import {
  FormGroup,
  FormControl,
  InputLabel,
  // Input,
  styled,
  Button,
  Typography,
  TextField,
  Grid,
  MenuItem,
  Select,
} from "@mui/material";

import { useNavigate } from "react-router-dom";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";

import rtlPlugin from "stylis-plugin-rtl";
import { prefixer } from "stylis";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";
import { createProducer } from "../../api/StoredApi";

import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { MobileDatePicker } from "@mui/x-date-pickers/MobileDatePicker";
import dayjs from "dayjs";

const Container = styled(FormGroup)`
  width: 50%;
  margin: 1% auto 0 auto;
  & > div {
    margin-top: 20px;
  }
`;

const cacheRtl = createCache({
  key: "muirtl",
  stylisPlugins: [prefixer, rtlPlugin],
});

const initialValue = {
  type: "",
  thickness: "",
  size: "",
  quantity: "",
  buyPrice: "",
  buyCurrency: "",
  salePrice: "",
  saleCurrency: "",
  date: dayjs(),
};

function AddProducerForm() {
  const [producer, setProducer] = useState(initialValue);

  const navigate = useNavigate();

  const onValueChange = (e) => {
    setProducer({ ...producer, [e.target.name]: e.target.value });
  };

  const addProducerDetails = async () => {
    await createProducer(producer);
    navigate("/stored");
  };

  const handleDate = (nweValue) => {
    setProducer({ ...producer, date: nweValue });
  };

  return (
    <Container>
      <Typography
        variant="h4"
        component="h4"
        sx={{ textAlign: "center", mt: 3, mb: 4, flexGrow: 1 }}
      >
        إضافة منتج
        <PersonAddAltIcon sx={{ marginLeft: "10px" }} fontSize="large" />
      </Typography>
      <CacheProvider value={cacheRtl}>
        <FormControl dir="rtl">
          {/* <InputLabel htmlFor="my-input">النوع</InputLabel>
          <Input
            onChange={(e) => onValueChange(e)}
            name="type"
            value={producer.type}
            id="my-input"
          /> */}
          <TextField
            label="الاسم"
            fullWidth
            value={producer.type}
            name="type"
            onChange={(e) => onValueChange(e)}
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
        </FormControl>
        <FormControl dir="rtl">
          {/* <InputLabel htmlFor="my-input">السمك</InputLabel>
          <Input
            onChange={(e) => onValueChange(e)}
            name="thickness"
            value={producer.thickness}
            id="my-input"
          /> */}
          <TextField
            label="السمك"
            fullWidth
            value={producer.thickness}
            name="thickness"
            onChange={(e) => onValueChange(e)}
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
        </FormControl>
        <FormControl dir="rtl">
          {/* <InputLabel htmlFor="my-input">الابعاد</InputLabel>
          <Input
            onChange={(e) => onValueChange(e)}
            name="size"
            value={producer.size}
            id="my-input"
          /> */}
          <TextField
            label="الابعاد"
            fullWidth
            value={producer.size}
            name="size"
            onChange={(e) => onValueChange(e)}
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
        </FormControl>
        <FormControl dir="rtl">
          {/* <InputLabel htmlFor="my-input">العدد</InputLabel>
          <Input
            onChange={(e) => onValueChange(e)}
            name="quantity"
            value={producer.quantity}
            id="my-input"
          /> */}
          <TextField
            label="العدد"
            fullWidth
            value={producer.quantity}
            name="quantity"
            onChange={(e) => onValueChange(e)}
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
        </FormControl>
        {/* <FormControl dir="rtl"> */}
        {/* <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}> */}
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Grid container spacing={2}>
              <Grid item xs={6} md={4}>
                <Select
                  label="العملة"
                  value={producer.buyCurrency}
                  onChange={(e) => onValueChange(e)}
                  variant="standard"
                  name="buyCurrency"
                  sx={{
                    width: "100px",
                    right: 20,

                    "& .MuiSelect-select": {
                      // textAlign: "right", // Align text to the right
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
              <Grid item xs={6} md={4}>
                <InputLabel
                  // style={{ right: 30, left: "auto", margin: "10px" }}
                  sx={{
                    color: "#44484e",
                    "&.Mui-focused": {
                      color: "#44484e",
                    },
                    top: 15,
                    right: 50,
                    left: "auto",
                  }}
                >
                  العملة
                </InputLabel>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={6}>
            <Grid container spacing={2}>
              <Grid item xs={6} md={4}>
                <TextField
                  onChange={(e) => onValueChange(e)}
                  value={producer.buyPrice}
                  variant="standard"
                  name="buyPrice"
                  InputProps={{
                    style: {
                      // textAlign: "right"
                    },
                    inputMode: "numeric",
                    pattern: "[0-9]*",
                  }}
                  InputLabelProps={{ style: { right: 30, left: "auto" } }}
                  sx={{
                    width: "160px",
                    right: 1,
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
              <Grid item xs={6} md={4} marginTop={"15px"}>
                <InputLabel
                  htmlFor="my-input"
                  sx={{
                    color: "#44484e",
                    "&.Mui-focused": {
                      color: "#44484e",
                    },
                    right: 90,
                    left: "auto",
                  }}
                >
                  سعر الشراء
                </InputLabel>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        {/* </Grid> */}
        {/* </FormControl> */}

        {/* <FormControl dir="rtl"> */}
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Grid container spacing={2}>
              <Grid item xs={6} md={4}>
                <Select
                  label="العملة"
                  value={producer.saleCurrency}
                  name="saleCurrency"
                  onChange={(e) => onValueChange(e)}
                  variant="standard"
                  sx={{
                    width: "100px",
                    right: 20,

                    "& .MuiSelect-select": {
                      // textAlign: "right", // Align text to the right
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
              <Grid item xs={6} md={4}>
                <InputLabel
                  // style={{ right: 30, left: "auto", margin: "10px" }}
                  sx={{
                    color: "#44484e",
                    "&.Mui-focused": {
                      color: "#44484e",
                    },
                    top: 15,
                    right: 50,
                    left: "auto",
                  }}
                >
                  العملة
                </InputLabel>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={6}>
            <Grid container spacing={2}>
              <Grid item xs={6} md={4}>
                <TextField
                  onChange={(e) => onValueChange(e)}
                  value={producer.salePrice}
                  name="salePrice"
                  variant="standard"
                  InputProps={{
                    style: {
                      // textAlign: "right"
                    },
                    inputMode: "numeric",
                    pattern: "[0-9]*",
                  }}
                  InputLabelProps={{ style: { right: 30, left: "auto" } }}
                  sx={{
                    width: "160px",
                    right: 1,
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
              <Grid item xs={6} md={4} marginTop={"15px"}>
                <InputLabel
                  htmlFor="my-input"
                  sx={{
                    color: "#44484e",
                    "&.Mui-focused": {
                      color: "#44484e",
                    },
                    right: 100,
                    left: "auto",
                  }}
                >
                  سعر البيع
                </InputLabel>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        {/* <InputLabel htmlFor="my-input">سعر البيع</InputLabel>
          <Input
            name="salePrice"
            onChange={(e) => onValueChange(e)}
            value={producer.salePrice}
            id="my-input"
          /> */}
        {/* </FormControl> */}
        <FormControl dir="rtl">
          {/* <LocalizationProvider dateAdapter={AdapterDayjs}>
            <MobileDatePicker
              label="التاريخ"
              inputFormat="MM/DD/YYYY"
              value={producer.date}
              onChange={handleDate}
              renderInput={(params) => (
                <TextField variant="standard" {...params} />
              )}
            />
          </LocalizationProvider> */}
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <MobileDatePicker
              label="التاريخ"
              inputFormat="MM/DD/YYYY"
              value={producer.date}
              onChange={handleDate}
              slots={{ textField: TextField }}
            />
          </LocalizationProvider>
        </FormControl>
      </CacheProvider>

      <FormControl>
        <Button
          variant="success"
          title="Save Producer"
          onClick={() => addProducerDetails()}
          sx={{
            background: "#44484e",
            color: "#fff",
            borderRadius: "10px",
          }}
        >
          إضافة
        </Button>
      </FormControl>
    </Container>
  );
}

export default AddProducerForm;
