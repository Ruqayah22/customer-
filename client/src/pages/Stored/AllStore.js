/* eslint-disable no-useless-concat */
import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import {
  Table,
  TableRow,
  TableBody,
  TableCell,
  TableHead,
  Button,
  Paper,
  IconButton,
  Grid,
  Typography,
  TableContainer,
} from "@mui/material";

import TablePagination from "@mui/material/TablePagination";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
import SearchIcon from "@mui/icons-material/Search";
import { alpha, InputBase, styled } from "@mui/material";
import { deleteProducer, getProducer } from "../../api/StoredApi";
import dayjs from "dayjs";

import { DownloadTableExcel } from "react-export-table-to-excel";
// import { getCustomers } from "../../api/CustApi";

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
  fontSize: "20px",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingRight: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "70ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));

function AllStore() {
  const [producers, setProducers] = useState([]);
  // const [customers, setCustomers] = useState([]);

  const navigate = useNavigate();

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);



  useEffect(() => {
    getAllProducer();
  }, []);

  const getAllProducer = async () => {
    let response = await getProducer();
    setProducers(response.data);
  };
  const deleteProducerData = async (id) => {
    if (!window.confirm("هل انت متاكد؟")) return;
    const res = await deleteProducer(id);
    if (!res.ok) {
      getAllProducer();
      window.alert("تم الحذف بنجاح");
    }
  };

  const navigateToAdd = () => {
    navigate("/createProducer");
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleSearch = (event) => {
    const {
      target: { value },
    } = event;
    if (!!value) {
      const searchResult = producers.filter((item) =>
        item.name.toLowerCase().includes(event.target.value.toLowerCase())
      );
      setProducers(searchResult);
    } else {
      getAllProducer();
    }
  };

  const formatDate = (date) => {
    return dayjs(date).format("MM/DD/YYYY");
  };

  const tableRef = useRef(null);

  var today = new Date();


  const formatAmount = (amount) => {
    const parsedAmount = parseFloat(amount);
    return isNaN(parsedAmount)
      ? "0.00"
      : parsedAmount.toLocaleString("en-US", {
          minimumFractionDigits: 3,
          maximumFractionDigits: 3,
        });
  };

 function formatCurrency(amount, currency) {
   switch (currency) {
     case "$":
       return `$${amount}`;
     case "IQD":
       return `${formatAmount(amount)} IQD`;
     default:
       return `${amount.toFixed(2)}`;
   }
 }

  return (
    <>
      <Typography
        variant="h3"
        component="h3"
        sx={{ textAlign: "center", mt: 3, mb: 4 }}
      >
        المخزن
      </Typography>

      <Paper
        sx={{
          padding: "30px",
          margin: "100px 50px",
        }}
      >
        <Grid container spacing={2}>
          <Grid item xs={4}>
            <Button
              title="Go to Add Store Page"
              onClick={() => navigateToAdd()}
              sx={{
                background: "#000000",
                color: "#fff",
                position: "relative",
                left: "20%",
                top: "10px",
                borderRadius: "10px",
                paddingBottom: "10px",
              }}
            >
              <PersonAddAltIcon />
            </Button>
            <DownloadTableExcel
              filename={"المخزن " + "(" + formatDate(today.toString()) + ")"}
              sheet="Store"
              currentTableRef={tableRef.current}
            >
              <Button
                title="Download As Excel(xls)"
                sx={{
                  background: "#000000",
                  position: "relative",
                  color: "#ffff",
                  left: "22%",
                  top: "10px",
                  borderRadius: "10px",
                  paddingBottom: "10px",
                }}
              >
                Excel
              </Button>
            </DownloadTableExcel>
          </Grid>
          <Grid item xs={8}>
            <Search sx={{ margin: "5px 0 30px 10px" }} dir="rtl">
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                name="search"
                placeholder="بحث ..."
                inputProps={{ "aria-label": "search" }}
                onChange={handleSearch}
              />
            </Search>
          </Grid>
        </Grid>
        <TableContainer component={Paper} sx={{ maxHeight: 600 }}>
          <Table
            stickyHeader
            aria-label="sticky table"
            id="StoreTable"
            ref={tableRef}
          >
            <TableHead
              sx={{
                "& .MuiTableCell-head": {
                  background: "#000000",
                  color: "#ffff",
                  fontSize: "20px",
                  textAlign: "center",
                },
              }}
            >
              <TableRow>
                <TableCell>Actions</TableCell>
                <TableCell>التاريخ</TableCell>
                <TableCell>سعر البيع</TableCell>
                <TableCell>سعر الشراء</TableCell>
                {/* <TableCell>الباقي </TableCell> */}
                <TableCell>العدد</TableCell>
                <TableCell>الابعاد</TableCell>
                <TableCell>السمك</TableCell>
                <TableCell>النوع</TableCell>
              </TableRow>
            </TableHead>
            <TableBody
              sx={{
                "& .MuiTableCell-body": {
                  fontSize: "20px",
                  textAlign: "center",
                },
              }}
            >
              {producers.length > 0 ? (
                producers
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((producer) => (
                    <TableRow key={producer._id}>
                      <TableCell>
                        <IconButton
                          aria-label="delete"
                          title="Delete Store"
                          onClick={() => deleteProducerData(producer._id)}
                        >
                          <DeleteIcon />
                        </IconButton>
                        <IconButton
                          aria-label="edit"
                          title="Edit Store"
                          component={Link}
                          to={`/editProducer/${producer._id}`}
                        >
                          <EditIcon />
                        </IconButton>
                      </TableCell>

                      <TableCell>{formatDate(producer.date)}</TableCell>

                      {/* <TableCell>{formatAmount(producer.salePrice)}</TableCell> */}
                      <TableCell>
                        {formatCurrency(
                          producer.salePrice,
                          producer.saleCurrency
                        )}
                      </TableCell>
                      {/* <TableCell>{formatAmount(producer.buyPrice)}</TableCell> */}
                      <TableCell>
                        {formatCurrency(
                          producer.buyPrice,
                          producer.buyCurrency
                        )}
                      </TableCell>
                      <TableCell>{producer.quantity}</TableCell>
                      <TableCell>{producer.size}</TableCell>
                      <TableCell>{producer.thickness}</TableCell>
                      <TableCell>{producer.name}</TableCell>
                    </TableRow>
                  ))
              ) : (
                <TableRow>
                  <TableCell>
                    <Typography
                      variant="h4"
                      component="h4"
                      sx={{
                        textAlign: "center",
                        mt: 3,
                        mb: 4,
                      }}
                    >
                      لا يوجد بيانات
                    </Typography>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          id="pagination-storeTable"
          name="pagination-storeTable"
          rowsPerPageOptions={[10, 20, 30]}
          component="div"
          count={producers.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </>
  );
}

export default AllStore;
