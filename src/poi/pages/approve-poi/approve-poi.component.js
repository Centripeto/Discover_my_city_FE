import {
  Box,
  Button,
  Collapse,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  IconButton,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TablePagination,
  TableRow,
  useMediaQuery,
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
import DoneIcon from "@mui/icons-material/Done";
import BlockIcon from "@mui/icons-material/Block";
import { approvePoi, rejectPoi } from "../../../api/poi";
import { useAuth } from "../../../providers/AuthProvider";

const DEFAULT_PAGE_SIZE = 10;
const DEFAULT_PAGE_NUMBER = 0;

const ApprovePoi = () => {
  const { accessToken } = useAuth();
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

  const onReject = (id, clbk) => {
    rejectPoi(accessToken, id).then(() => {
      clbk && clbk();
      fetch({
        status: POI_STATUS.IN_APPROVAL,
        pageNumber: DEFAULT_PAGE_NUMBER,
        pageSize: DEFAULT_PAGE_SIZE,
      });
    });
  };

  const onApprove = (id, clbk) => {
    approvePoi(accessToken, id).then(() => {
      clbk && clbk();
      fetch({
        status: POI_STATUS.IN_APPROVAL,
        pageNumber: DEFAULT_PAGE_NUMBER,
        pageSize: DEFAULT_PAGE_SIZE,
      });
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
                <PoiRow
                  key={poi.id}
                  poi={poi}
                  onReject={onReject}
                  onApprove={onApprove}
                />
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

const PoiRow = ({ poi, onApprove, onReject }) => {
  const [open, setOpen] = useState(false);
  const [openRejectDialog, setOpenRejectDialog] = useState(false);
  const [openApproveDialog, setOpenApproveDialog] = useState(false);

  const handleOpenRejectDialog = () => setOpenRejectDialog(true);
  const handleCloseRejectDialog = () => setOpenRejectDialog(false);
  const handleOpenApproveDialog = () => setOpenApproveDialog(true);
  const handleCloseApproveDialog = () => setOpenApproveDialog(false);

  const handleApprove = () => {
    onApprove(poi.id, handleCloseApproveDialog);
  };

  const handleReject = () => {
    onReject(poi.id, handleCloseRejectDialog);
  };

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
          <Stack direction="row" spacing={2}>
            <Button
              variant="outlined"
              startIcon={<BlockIcon />}
              color="error"
              onClick={handleOpenRejectDialog}
            >
              Rifiuta
            </Button>
            <Button
              variant="contained"
              onClick={handleOpenApproveDialog}
              startIcon={<DoneIcon />}
              color="success"
            >
              Approva
            </Button>
          </Stack>
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
      {openApproveDialog ? (
        <ConfirmDialog
          key={poi.id + "approve-dialog"}
          open={openApproveDialog}
          handleClose={handleCloseApproveDialog}
          callback={handleApprove}
          title="Approva"
          content="Sei sicuro di voler approvare?"
        />
      ) : null}
      {openRejectDialog ? (
        <ConfirmDialog
          key={poi.id + "reject-dialog"}
          open={openRejectDialog}
          handleClose={handleCloseRejectDialog}
          callback={handleReject}
          title="Rifiuta"
          content="Sei sicuro di voler rifiutare?"
        />
      ) : null}
    </>
  );
};

const ConfirmDialog = ({ open, handleClose, callback, title, content }) => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <Dialog
      fullScreen={fullScreen}
      open={open}
      onClose={handleClose}
      aria-labelledby="logout-dialog"
    >
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <DialogContentText>{content}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} autoFocus>
          No
        </Button>
        <Button onClick={callback}>Si</Button>
      </DialogActions>
    </Dialog>
  );
};

export default ApprovePoi;
