import { useContext, createContext, useReducer } from "react";
import { Alert, Snackbar } from "@mui/material";
const ToastContext = createContext();

const toastReducer = (state, action) => {
  switch (action.type) {
    case "open":
      return {
        open: true,
        message: action.payload.message,
        severity: action.payload.severity,
      };
    case "close":
      return {
        open: false,
      };
    default:
      return state;
  }
};
const ToastProvider = ({ children }) => {
  const [toastState, dispatch] = useReducer(toastReducer, { open: false });
  const onClose = () => dispatch({ type: "close" });
  console.log(toastState);

  return (
    <ToastContext.Provider value={{ dispatch }}>
      {children}
      <Snackbar
        open={toastState.open}
        autoHideDuration={6000}
        onClose={onClose}
      >
        <Alert
          onClose={onClose}
          severity={toastState.severity}
          variant="filled"
          sx={{ width: "100%" }}
        >
          {toastState.message}
        </Alert>
      </Snackbar>
    </ToastContext.Provider>
  );
};

export default ToastProvider;

export const useToast = () => {
  return useContext(ToastContext);
};
