import {
  Box,
  Collapse,
  Grid,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TablePagination,
  TableRow,
} from "@mui/material";
import FirstPageIcon from "@mui/icons-material/FirstPage";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import LastPageIcon from "@mui/icons-material/LastPage";
import { useTheme } from "@emotion/react";
import usePoiList from "../../hooks/usePoiList";
import { POI_STATUS } from "../../../common/constants";
import { useEffect, useState } from "react";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import Map from "../../components/map.component";

const DEFAULT_PAGE_SIZE = 10;
const DEFAULT_PAGE_NUMBER = 0;

const ApprovePoi = () => {
  const { pois, fetch } = usePoiList({
    pageNumber: DEFAULT_PAGE_NUMBER,
    pageSize: DEFAULT_PAGE_SIZE,
  });

  useEffect(() => {
    fetch({
      status: POI_STATUS.IN_APPROVAL,
      pageNumber: DEFAULT_PAGE_NUMBER,
      pageSize: DEFAULT_PAGE_SIZE,
    });
  }, [fetch]);

  const handleChangePage = (event, newPage) => {
    fetch({
      status: POI_STATUS.IN_APPROVAL,
      pageSize: pois.pageSize,
      pageNumber: newPage,
    });
  };

  const handleChangeRowsPerPage = (event) => {
    fetch({
      status: POI_STATUS.IN_APPROVAL,
      pageSize: parseInt(event.target.value, 10),
      pageNumber: 0,
    });
  };

  return (
    <Grid container item xs={12} spacing={3}>
      <Grid item xs={12}>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 500 }} aria-label="poi table">
            <TableHead>
              <TableRow>
                <TableCell></TableCell>
                <TableCell>Nome</TableCell>
                <TableCell>Stato</TableCell>
                <TableCell>Autore</TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {pois.list.map((poi) => (
                <PoiRow key={poi.id} poi={poi} />
              ))}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TablePagination
                  rowsPerPageOptions={[5, 10, 25, { label: "All", value: -1 }]}
                  colSpan={3}
                  count={pois.totalSize}
                  rowsPerPage={pois.pageSize}
                  page={pois.pageNumber}
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                  ActionsComponent={TablePaginationActions}
                />
              </TableRow>
            </TableFooter>
          </Table>
        </TableContainer>
      </Grid>
    </Grid>
  );
};

function TablePaginationActions(props) {
  const theme = useTheme();
  const { count, page, rowsPerPage, onPageChange } = props;

  const handleFirstPageButtonClick = (event) => {
    onPageChange(event, 0);
  };

  const handleBackButtonClick = (event) => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (event) => {
    onPageChange(event, page + 1);
  };

  const handleLastPageButtonClick = (event) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <Box sx={{ flexShrink: 0, ml: 2.5 }}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === "rtl" ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowRight />
        ) : (
          <KeyboardArrowLeft />
        )}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowLeft />
        ) : (
          <KeyboardArrowRight />
        )}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === "rtl" ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </Box>
  );
}

const PoiRow = ({ poi }) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {poi.name}
        </TableCell>
        <TableCell component="th" scope="row">
          {poi.status}
        </TableCell>
        <TableCell component="th" scope="row">
          {poi.creator.name} {poi.creator.lastname}
        </TableCell>
        <TableCell component="th" scope="row">
          APPROVA RIMUOVI
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Grid container item xs={12} spacing={3}>
              <Grid item xs={12}>
                <Map
                  markers={[poi]}
                  center={{ longitude: poi.longitude, latitude: poi.latitude }}
                  zoom={14}
                />
              </Grid>
              <Grid item xs={12}></Grid>
            </Grid>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
};

export default ApprovePoi;
