import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";


import { BrowserRouter } from "react-router-dom";
import AppRouter from "./app.router";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import AuthProvider from "./providers/AuthProvider";

const darkTheme = createTheme({ palette: { mode: 'dark' } });
// const lightTheme = createTheme({ palette: { mode: 'light' } });

const App = () => (
  <ThemeProvider theme={darkTheme}>
    <AuthProvider>
      <BrowserRouter>
        <AppRouter />
      </BrowserRouter>
    </AuthProvider>
  </ThemeProvider>
);

export default App;
