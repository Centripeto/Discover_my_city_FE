import { useContext, createContext, useState } from "react";
import { login as loginApi, logout as logoutApi } from "../api/authentication";
const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [accessToken, setAccesToken] = useState(
    localStorage.getItem("accessToken") || ""
  );
  const [refreshToken, setRefreshToken] = useState(
    localStorage.getItem("refreshToken") || ""
  );

  const login = async ({ username, password }) => {
      const response = await loginApi({ password, username });
      if (response) {
        setAccesToken(response.accessToken);
        setRefreshToken(response.refreshToken);
        localStorage.setItem("accessToken", response.accessToken);
      }
  };

  const logout = async () => {
    await logoutApi();
    setAccesToken(null);
    setRefreshToken(null);
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
  };

  return (
    <AuthContext.Provider value={{ refreshToken, accessToken, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

export const useAuth = () => {
  return useContext(AuthContext);
};
