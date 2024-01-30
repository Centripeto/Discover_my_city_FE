import { useContext, createContext, useState, useMemo } from "react";
import { ThemeProvider } from "@emotion/react";
import { createTheme } from "@mui/material";
const ThemeModeContext = createContext();

const ThemeModeProvider = ({ children }) => {
  const [mode, setMode] = useState("light");

  const toggleColorMode = () => {
    setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
  };

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
        },
      }),
    [mode]
  );
  return (
    <ThemeModeContext.Provider value={{ toggleColorMode }}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </ThemeModeContext.Provider>
  );
};

export default ThemeModeProvider;

export const useThemeMode = () => {
  return useContext(ThemeModeContext);
};
