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
  TablePagination,
  InputBase,
  alpha,
  styled,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
import PrintIcon from "@mui/icons-material/Print";
import SearchIcon from "@mui/icons-material/Search";
import ArticleOutlinedIcon from "@mui/icons-material/ArticleOutlined";
import dayjs from "dayjs";
import { saveAs } from "file-saver";
import { DownloadTableExcel } from "react-export-table-to-excel";
import {
  Document,
  Packer,
  Paragraph,
  Table as DocxTable,
  TableRow as DocxTableRow,
  TableCell as DocxTableCell,
  HeadingLevel,
  AlignmentType,
} from "docx";
import { deleteCustomer, getCustomers } from "../../api/CustApi";

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

const formatAmount = (amount) => {
  const parsedAmount = parseFloat(amount);
  return isNaN(parsedAmount)
    ? "0.000"
    : parsedAmount.toLocaleString("en-US", {
        minimumFractionDigits: 3,
        maximumFractionDigits: 3,
      });
};

// Helper Function to Calculate Remaining Debt
const calculateRestAmount = (debts, payments) => {
  const totalDebts = debts.reduce((total, debt) => total + debt.amount, 0);
  const totalPayments = payments.reduce(
    (total, payment) => total + payment.amount,
    0
  );
  const restAmount = totalDebts - totalPayments;
  return formatAmount(restAmount);
};

const AllCustomers = () => {
  const [customers, setCustomers] = useState([]);
  const navigate = useNavigate();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const tableRef = useRef(null);

  useEffect(() => {
    getAllCustomers();
  }, []);

  const getAllCustomers = async () => {
    try {
      const response = await getCustomers();
      setCustomers(response.data);
    } catch (error) {
      console.error("Error fetching customers:", error);
    }
  };

  const deleteCustomerData = async (id) => {
    if (!window.confirm("هل انت متأكد؟")) return;
    try {
      await deleteCustomer(id);
      getAllCustomers(); // Refresh the list after deletion
      window.alert("تم الحذف بنجاح");
    } catch (error) {
      console.error("Error deleting customer:", error);
    }
  };

  const navigateToAdd = () => {
    navigate("/add");
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleSearch = (event) => {
    const value = event.target.value.toLowerCase();
    if (value) {
      const filtered = customers.filter((customer) =>
        customer.name.toLowerCase().includes(value)
      );
      setCustomers(filtered);
    } else {
      getAllCustomers();
    }
  };

  const formatDate = (date) => {
    return dayjs(date).format("MM/DD/YYYY");
  };

  const exportToWord = () => {
    const doc = new Document({
      sections: [
        {
          children: [
            new Paragraph({
              text: "Customer Data",
              heading: HeadingLevel.HEADING_1,
              alignment: AlignmentType.CENTER,
            }),
            new DocxTable({
              rows: [
                new DocxTableRow({
                  children: [
                    new DocxTableCell({ children: [new Paragraph("No")] }),
                    new DocxTableCell({ children: [new Paragraph("الاسم")] }),
                    new DocxTableCell({
                      children: [new Paragraph("رقم الهاتف")],
                    }),
                    new DocxTableCell({ children: [new Paragraph("الدين")] }),
                    new DocxTableCell({
                      children: [new Paragraph("تاريخ الدين")],
                    }),
                  ],
                }),
                ...customers.map(
                  (customer, index) =>
                    new DocxTableRow({
                      children: [
                        new DocxTableCell({
                          children: [new Paragraph((index + 1).toString())],
                        }),
                        new DocxTableCell({
                          children: [new Paragraph(customer.name || "N/A")],
                        }),
                        new DocxTableCell({
                          children: [
                            new Paragraph(
                              customer.phoneNumber
                                ? customer.phoneNumber.toString()
                                : "N/A"
                            ),
                          ],
                        }),
                        new DocxTableCell({
                          children: [
                            new Paragraph(
                              customer.debt !== null &&
                              customer.debt !== undefined
                                ? customer.debt.toLocaleString("en-US") + ",000"
                                : "N/A"
                            ),
                          ],
                        }),
                        new DocxTableCell({
                          children: [
                            new Paragraph(
                              customer.debtDate
                                ? dayjs(customer.debtDate).format("YYYY-MM-DD")
                                : "N/A"
                            ),
                          ],
                        }),
                      ],
                    })
                ),
              ],
            }),
          ],
        },
      ],
    });

    Packer.toBlob(doc).then((blob) => {
      saveAs(blob, "customer_data.docx");
    });
  };

  return (
    <>
      <Typography
        variant="h3"
        component="h3"
        sx={{ textAlign: "center", mt: 3, mb: 4 }}
      >
        الزبائن
      </Typography>

      <Paper sx={{ padding: "30px", margin: "100px 50px" }}>
        <Grid container spacing={2}>
          <Grid item xs={4}>
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
              }}
            >
              <PersonAddAltIcon />
            </Button>
            <DownloadTableExcel
              // eslint-disable-next-line no-useless-concat
              filename={"الزبائن " + "(" + formatDate(new Date()) + ")"}
              sheet="Customer"
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
            <Button
              onClick={exportToWord}
              sx={{
                background: "#000000",
                color: "#fff",
                position: "relative",
                left: "25%",
                top: "10px",
                borderRadius: "10px",
                paddingBottom: "10px",
              }}
            >
              <ArticleOutlinedIcon />
            </Button>
          </Grid>
          <Grid item xs={8}>
            <Search sx={{ margin: "5px 0 30px 10px" }} dir="rtl">
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
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
            sx={{ tableLayout: "auto" }}
            id="CustomerTable"
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
                <TableCell>المتبقي</TableCell>
                <TableCell>الاسم</TableCell>
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
              {customers.length > 0 ? (
                customers
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((customer) => (
                    <TableRow key={customer._id}>
                      <TableCell>
                        <IconButton
                          aria-label="print"
                          title="Print Customer"
                          component={Link}
                          to={`/printCustomer/${customer._id}`}
                        >
                          <PrintIcon />
                        </IconButton>
                        <IconButton
                          aria-label="delete"
                          title="Delete Customer"
                          onClick={() => deleteCustomerData(customer._id)}
                        >
                          <DeleteIcon />
                        </IconButton>
                        <IconButton
                          aria-label="edit"
                          title="Edit Customer"
                          component={Link}
                          to={`/customers/${customer._id}/edit`}
                        >
                          <EditIcon />
                        </IconButton>
                      </TableCell>
                      <TableCell>
                        {calculateRestAmount(
                          customer.debts || [],
                          customer.payments || []
                        ).toLocaleString("en-US")}{" "}
                        IQD
                      </TableCell>
                      <TableCell>
                        <Link
                          to={`/customers/${customer._id}`}
                          style={{ textDecoration: "none", color: "inherit" }}
                        >
                          {customer.name}
                        </Link>
                      </TableCell>
                    </TableRow>
                  ))
              ) : (
                <TableRow>
                  <TableCell colSpan={3}>
                    <Typography
                      variant="h4"
                      component="h4"
                      sx={{ textAlign: "center", mt: 3, mb: 4 }}
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
          id="pagination-customerTable"
          rowsPerPageOptions={[10, 20, 30]}
          component="div"
          count={customers.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </>
  );
};

export default AllCustomers;
