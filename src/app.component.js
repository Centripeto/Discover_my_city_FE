import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

import { BrowserRouter } from "react-router-dom";
import AppRouter from "./app.router";
import AuthProvider from "./providers/AuthProvider";
import ThemeModeProvider from "./providers/ThemeModeProvider";
import ToastProvider from "./providers/ToastProvider";

const App = () => (
  <ThemeModeProvider>
    <ToastProvider>
      <AuthProvider>
        <BrowserRouter>
          <AppRouter />
        </BrowserRouter>
      </AuthProvider>
    </ToastProvider>
  </ThemeModeProvider>
);

export default App;
