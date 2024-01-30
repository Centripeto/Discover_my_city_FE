import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";


import { BrowserRouter } from "react-router-dom";
import AppRouter from "./app.router";
import AuthProvider from "./providers/AuthProvider";
import ThemeModeProvider from "./providers/ThemeModeProvider";

const App = () => (
  <ThemeModeProvider>
    <AuthProvider>
      <BrowserRouter>
        <AppRouter />
      </BrowserRouter>
    </AuthProvider>
  </ThemeModeProvider>
);

export default App;
