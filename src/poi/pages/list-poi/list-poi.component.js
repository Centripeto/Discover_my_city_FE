import { useEffect, useState } from "react";
import { useAuth } from "../../../providers/AuthProvider";
import {
  Box,
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
import Map from "../../components/map.component";
import { getPois } from "../../../api/poi";
import FirstPageIcon from '@mui/icons-material/FirstPage';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import LastPageIcon from '@mui/icons-material/LastPage';
import { useTheme } from "@emotion/react";

const mapPoi = (poi) => ({
  longitude: poi.coordinate?.longitude,
  latitude: poi.coordinate?.latitude,
  id: poi.id,
  name: poi.name,
  description: poi.description,
  displayName: poi.name,
  status: poi.status
});

const PoiList = () => {
  const [pagination, setPagination] = useState({
    pageNumber: 0,
    pageSize: 10,
    totalPages: 0,
    totalSize: 0,
  });
  const [pois, setPois] = useState([]);
  const { accessToken } = useAuth();

  useEffect(() => {
    getPois(accessToken, {
      pageSize: pagination.pageSize,
      pageNumber: pagination.pageNumber,
    }).then((response) => {
      setPois(response.list.map(mapPoi));
      setPagination({
        pageNumber: response.pageNumber,
        pageSize: response.pageSize,
        totalPages: response.totalPages,
        totalSize: response.totalSize
      });
    });
  }, [accessToken, pagination.pageSize, pagination.pageNumber]);
  

  const handleChangePage = (event, newPage) => {
    setPagination(old => ({
      ...old,
      pageNumber: newPage
    }));
  };

  const handleChangeRowsPerPage = (event) => {
    setPagination(old => ({
      ...old,
      pageNumber: 0,
      pageSize: parseInt(event.target.value, 10)
    }));
  };

  return (
    <Grid container item xs={12} spacing={3}>
      <Grid item xs={12}>
        <Map markers={pois} zoom={2} />
      </Grid>
      <Grid item xs={12}>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 500 }} aria-label="poi table">
          <TableHead>
          <TableRow>
            <TableCell>Nome</TableCell>
            <TableCell>Descrizione</TableCell>
            <TableCell>Stato</TableCell>
            <TableCell>Longitudine</TableCell>
            <TableCell>Latitudine</TableCell>
          </TableRow>
        </TableHead>
            <TableBody>
              {pois.map((row) => (
                <TableRow key={row.id}>
                  <TableCell component="th" scope="row">
                    {row.name}
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {row.description}
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {row.status}
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {row.longitude}
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {row.latitude}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TablePagination
                  rowsPerPageOptions={[5, 10, 25, { label: "All", value: -1 }]}
                  colSpan={3}
                  count={pagination.totalSize}
                  rowsPerPage={pagination.pageSize}
                  page={pagination.pageNumber}
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
        {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </Box>
  );
}

export default PoiList;
