import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";


import { BrowserRouter } from "react-router-dom";
import AppRouter from "./app.router";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import AuthProvider from "./providers/AuthProvider";

const theme = createTheme();

const App = () => (
  <ThemeProvider theme={theme}>
    <AuthProvider>
      <BrowserRouter>
        <AppRouter />
      </BrowserRouter>
    </AuthProvider>
  </ThemeProvider>
);

export default App;
