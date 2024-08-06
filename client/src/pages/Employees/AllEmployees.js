import React, { useEffect, useState } from "react";
import {
  alpha,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  IconButton,
  InputBase,
  styled,
  TextField,
  Typography,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
// import CloseIcon from "@mui/icons-material/Close";
import NoteAltIcon from "@mui/icons-material/NoteAlt";
// import DeleteIcon from "@mui/icons-material/Delete";
// import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
// import AddToQueueIcon from "@mui/icons-material/AddToQueue";
import LayersClearIcon from "@mui/icons-material/LayersClear";
// import image1 from "../../images/employees1.jpg";
import axios from "axios";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
import SearchIcon from "@mui/icons-material/Search";
import dayjs from "dayjs";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  fontSize: "22px",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingRight: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "55ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));
const apiUrl = process.env.REACT_APP_SERVER_URL;

const AllEmployees = () => {
  const [employee, setEmployee] = useState([]);

  const [searchQuery, setSearchQuery] = useState("");

  const navigate = useNavigate();

  const navigateToAdd = () => {
    navigate("/createEmployees");
  };

  //get all products
  const getAllEmployees = async () => {
    try {
      const { data } = await axios.get(`${apiUrl}/employee/getEmployees`);
      setEmployee(data.employees);
      // console.log(data);
    } catch (error) {
      console.error("Error fetching Employee:", error);
    }
  };

  //lifecycle method
  useEffect(() => {
    getAllEmployees();
  }, []);

  const formatDate = (date) => {
    return dayjs(date).format("YYYY-MM-DD");
  };

  const filteredEmployees = employee.filter((employee) => {
    const searchLower = searchQuery.toLowerCase();
    return employee.name.toLowerCase().includes(searchLower);
  });

  return (
    <>
      <Box
        sx={{
          textAlign: "center",
          marginTop: "10px",
          marginBottom: "30px",
          // marginRight: "200px",
          marginRight: { xs: "0", md: "200px" },
        }}
      >
        <Grid container spacing={2}>
          <Grid item xs={12} sm={4}>
            <Button
              title="Go to Add Customer Page"
              onClick={navigateToAdd}
              sx={{
                background: "#000000",
                color: "#fff",
                position: "relative",
                left: "20%",
                top: "10px",
                borderRadius: "10px",
                paddingBottom: "10px",
                width: { xs: "80%", sm: "auto" },
                margin: { xs: "0 auto", sm: "0" },
              }}
            >
              <PersonAddAltIcon />
            </Button>
          </Grid>
          <Grid item xs={12} sm={8}>
            <Search sx={{ margin: "5px 20px 30px 10px" }} dir="rtl">
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="بحث ..."
                inputProps={{ "aria-label": "search" }}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </Search>
          </Grid>
        </Grid>
      </Box>
      {/* Search input */}
      {/* <Box
        sx={{ textAlign: "center", marginTop: "10px", marginBottom: "30px" }}
      >
        <TextField
          variant="outlined"
          placeholder="بحث ..."
          // label="Search by name"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          fullWidth
          sx={{
            backgroundColor: "white",
            color: "black",
            width: "60%",
            marginTop: "25px",
            marginLeft: "50px",
            "& .MuiOutlinedInput-root": {
              "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                borderColor: "#91C7B1",
              },
            },
          }}
          dir="rtl"
        />
      </Box> */}
      <Grid container spacing={2}>
        {/* all employee */}

        <Grid item xs={12}>
          <Grid
            container
            spacing={2}
            direction="row"
            // marginLeft="20%"
            // alignItems="flex-start"
            // justify="flex-end"
            // style={{ justifyContent: "flex-end" }}
          >
            {filteredEmployees.length > 0 ? (
              filteredEmployees?.map((e) => (
                <Grid item xs={12} sm={8} md={6} key={e._id}>
                  <Card
                    sx={{
                      width: "100%",
                      padding: 2,
                      margin: 1,
                      display: "flex",
                      flexDirection: "column",
                      boxShadow: "1px 1px 5px #ccc",
                    }}
                    key={e._id}
                  >
                    <Box sx={{ display: "flex", flexDirection: "row" }}>
                      <CardMedia
                        component="img"
                        height="200"
                        alt="Employee Image"
                        // sx={{
                        //   height: 200,
                        //   width: "auto",
                        //   margin: "20px",
                        //   boxShadow: "1px 1px 5px #ccc",
                        // }}
                        image={`${apiUrl}/employee/employeePhoto/${e._id}`}
                        title="Employee Image"
                        sx={{ flex: "1" }}
                      />
                      <CardContent sx={{ flex: "2" }}>
                        <Grid
                          container
                          rowSpacing={1}
                          alignItems="center"
                          // columnSpacing={{ xs: 1, sm: 2, md: 2 }}
                        >
                          {/* line one  */}
                          <Grid item xs={8}>
                            <TextField
                              fullWidth
                              name="name"
                              variant="standard"
                              value={e.name}
                              InputProps={{
                                readOnly: true,
                              }}
                              autoComplete="off"
                              dir="rtl"
                              style={{
                                marginLeft: "30px",
                              }}
                            />
                          </Grid>
                          <Grid item xs={4}>
                            <Typography
                              gutterBottom
                              variant="h6"
                              component="div"
                              style={{
                                margin: "10px 0 0 80px",
                                fontWeight: "bold",
                              }}
                            >
                              :الاسم
                            </Typography>
                          </Grid>
                          {/* line two */}
                          <Grid item xs={8}>
                            <TextField
                              name="phoneNumber"
                              fullWidth
                              variant="standard"
                              InputProps={{
                                readOnly: true,
                              }}
                              value={e.phoneNumber}
                              autoComplete="off"
                              style={{
                                marginLeft: "30px",
                              }}
                            />
                          </Grid>
                          <Grid item xs={4}>
                            <Typography
                              gutterBottom
                              variant="h6"
                              component="div"
                              style={{
                                margin: "10px 0 0 0",
                                fontWeight: "bold",
                                textAlign: "right",
                              }}
                            >
                              :رقم الهاتف
                            </Typography>
                          </Grid>
                          {/* line tree */}
                          <Grid item xs={8}>
                            <TextField
                              fullWidth
                              name="birth"
                              variant="standard"
                              InputProps={{
                                readOnly: true,
                              }}
                              value={formatDate(e.birth)}
                              autoComplete="off"
                              style={{
                                marginLeft: "30px",
                              }}
                            />
                          </Grid>
                          <Grid item xs={4}>
                            <Typography
                              gutterBottom
                              variant="h6"
                              component="div"
                              style={{
                                margin: "10px 0 0 80px",
                                fontWeight: "bold",
                              }}
                            >
                              :المواليد
                            </Typography>
                          </Grid>
                          {/* line four */}
                          <Grid item xs={8}>
                            <TextField
                              fullWidth
                              name="job"
                              variant="standard"
                              InputProps={{
                                readOnly: true,
                              }}
                              value={e.job}
                              autoComplete="off"
                              style={{
                                marginLeft: "30px",
                              }}
                            />
                          </Grid>
                          <Grid item xs={4}>
                            <Typography
                              gutterBottom
                              variant="h6"
                              component="div"
                              style={{
                                margin: "10px 0 0 80px",
                                fontWeight: "bold",
                              }}
                            >
                              :الوظيفة
                            </Typography>
                          </Grid>
                          {/* line five */}
                          <Grid item xs={8}>
                            <TextField
                              fullWidth
                              name="salary"
                              variant="standard"
                              InputProps={{
                                readOnly: true,
                              }}
                              value={e.salary}
                              autoComplete="off"
                              style={{
                                marginLeft: "30px",
                              }}
                            />
                          </Grid>
                          <Grid item xs={4}>
                            <Typography
                              gutterBottom
                              variant="h6"
                              component="div"
                              style={{
                                margin: "10px 0 0 80px",
                                fontWeight: "bold",
                              }}
                            >
                              :الراتب
                            </Typography>
                          </Grid>
                          {/* line six */}
                          <Grid item xs={8}>
                            <TextField
                              fullWidth
                              name="address"
                              variant="standard"
                              InputProps={{
                                readOnly: true,
                              }}
                              value={e.address}
                              autoComplete="off"
                              style={{
                                marginLeft: "30px",
                              }}
                            />
                          </Grid>
                          <Grid item xs={4}>
                            <Typography
                              gutterBottom
                              variant="h6"
                              component="div"
                              style={{
                                margin: "10px 0 0 80px",
                                fontWeight: "bold",
                              }}
                            >
                              :العنوان
                            </Typography>
                          </Grid>
                          {/* line seven */}
                          <Grid item xs={8}>
                            <TextField
                              fullWidth
                              name="date"
                              variant="standard"
                              InputProps={{
                                readOnly: true,
                              }}
                              value={formatDate(e.date)}
                              autoComplete="off"
                              style={{
                                marginLeft: "20px",
                              }}
                            />
                          </Grid>
                          <Grid item xs={4}>
                            <Typography
                              gutterBottom
                              variant="h6"
                              component="div"
                              style={{
                                margin: "10px 0 0 0",
                                fontWeight: "bold",
                                textAlign: "right",
                              }}
                            >
                              :تاريخ التوظيف
                            </Typography>
                          </Grid>
                        </Grid>
                      </CardContent>
                    </Box>
                    {/* </Grid> */}

                    <CardActions sx={{ justifyContent: "flex-start" }}>
                      <IconButton
                        // onClick={() => handleDelete(p._id)}
                        aria-label="Delete"
                        title="خذف منتج"
                      >
                        <LayersClearIcon />
                      </IconButton>
                      <Link
                        // key={p._id}
                        // to={`/product/${p.slug}`}
                        className="product-link"
                      >
                        <IconButton
                          aria-label="Edit Product"
                          title="تعديل المنتج"
                        >
                          <NoteAltIcon />
                        </IconButton>
                      </Link>
                      {/* <Link
                      // to={`/createCustomer/${p.slug}`}
                      className="product-link"
                    >
                      <IconButton aria-label="Add Customer" title="اضافة زبون">
                        <PersonAddAlt1Icon />
                      </IconButton>
                    </Link> */}
                    </CardActions>
                  </Card>
                </Grid>
              ))
            ) : (
              <Grid
                container
                sx={{
                  height: "50vh",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Typography
                  sx={{
                    fontSize: "50px",
                    fontWeight: "bold",
                    textAlign: "center",
                  }}
                >
                  No employees found
                </Typography>
              </Grid>
            )}
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default AllEmployees;
