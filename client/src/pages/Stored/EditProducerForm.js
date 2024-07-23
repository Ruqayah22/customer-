import React, { useState, useEffect } from "react";

import {
  FormGroup,
  FormControl,
  InputLabel,
  Input,
  styled,
  Button,
  Typography,
  TextField,
} from "@mui/material";

import { useNavigate, useParams } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";

import rtlPlugin from "stylis-plugin-rtl";
import { prefixer } from "stylis";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";
import { editProducer, getProducer } from "../../api/StoredApi";

import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { MobileDatePicker } from "@mui/x-date-pickers/MobileDatePicker";

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
  salePrice: "",
  date: "",
};

function EditProducerForm() {
  const [producer, setProducer] = useState(initialValue);

  const { id } = useParams();

  let navigate = useNavigate();

  useEffect(() => {
    loadCustomerDetails();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const loadCustomerDetails = async () => {
    const response = await getProducer(id);
    setProducer(response.data);
  };

  const editProducerDetails = async () => {
    await editProducer(id, producer);
    navigate("/stored");
  };

  const onValueChange = (e) => {
    setProducer({ ...producer, [e.target.name]: e.target.value });
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
        تعديل
        <EditIcon sx={{ marginLeft: "10px" }} fontSize="large" />
      </Typography>
      <CacheProvider value={cacheRtl}>
        <FormControl dir="rtl">
          <InputLabel htmlFor="my-input">النوع</InputLabel>
          <Input
            onChange={(e) => onValueChange(e)}
            name="type"
            value={producer.type}
            id="my-input"
          />
        </FormControl>
        <FormControl dir="rtl">
          <InputLabel htmlFor="my-input">السمك</InputLabel>
          <Input
            onChange={(e) => onValueChange(e)}
            name="thickness"
            value={producer.thickness}
            id="my-input"
          />
        </FormControl>
        <FormControl dir="rtl">
          <InputLabel htmlFor="my-input">الابعاد</InputLabel>
          <Input
            onChange={(e) => onValueChange(e)}
            name="size"
            value={producer.size}
            id="my-input"
          />
        </FormControl>
        <FormControl dir="rtl">
          <InputLabel htmlFor="my-input">العدد</InputLabel>
          <Input
            onChange={(e) => onValueChange(e)}
            name="quantity"
            value={producer.quantity}
            id="my-input"
          />
        </FormControl>
        <FormControl dir="rtl">
          <InputLabel htmlFor="my-input">سعر الشراء</InputLabel>
          <Input
            onChange={(e) => onValueChange(e)}
            name="buyPrice"
            value={producer.buyPrice}
            id="my-input"
          />
        </FormControl>
        <FormControl dir="rtl">
          <InputLabel htmlFor="my-input">سعر البيع</InputLabel>
          <Input
            onChange={(e) => onValueChange(e)}
            name="salePrice"
            value={producer.salePrice}
            id="my-input"
          />
        </FormControl>
        <FormControl dir="rtl">
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <MobileDatePicker
              label="التاريخ"
              inputFormat="MM/DD/YYYY"
              value={producer.date}
              onChange={handleDate}
              renderInput={(params) => (
                <TextField variant="standard" {...params} />
              )}
            />
          </LocalizationProvider>
        </FormControl>
      </CacheProvider>

      <FormControl>
        <Button
          variant="success"
          title="Save Producer"
          onClick={() => editProducerDetails()}
          sx={{
            background: "#44484e",
            color: "#fff",
            borderRadius: "10px",
          }}
        >
          تعديل
        </Button>
      </FormControl>
    </Container>
  );
}

export default EditProducerForm;
