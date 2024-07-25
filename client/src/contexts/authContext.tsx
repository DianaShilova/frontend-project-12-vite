import { ReactNode, createContext, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch } from "react-redux";
import React from "react";
import { clearChannels } from "../slices/channelsSlice";

export const AuthContext = createContext({});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(
    !!localStorage.getItem("token"),
  );
  const [username, setUsername] = useState(() =>
    localStorage.getItem("username"),
  );
  const navigate = useNavigate();
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const login = async (values: { username: string; password: string }) => {
    try {
      const result = await axios.post("/api/v1/login", values);
      const { token } = result.data;
      setUsername(result.data.username);

      localStorage.setItem("token", token);
      localStorage.setItem("username", result.data.username);

      setIsAuthenticated(true);
      navigate("/");
    } catch (error) {
      if (error?.response && error.response.status === 401) {
        throw new Error(t("loginForm.validationLogin.error"));
      }
      if (error?.code === "ERR_NETWORK") {
        toast.error(t("loginForm.validationLogin.network"));
      }
    }
  };

  const logout = (): void => {
    setIsAuthenticated(false);
    localStorage.clear();
    dispatch(clearChannels());
    navigate("/login");
  };

  const setToken = (data: { token: string; username: string }) => {
    setUsername(data.username);
    localStorage.setItem("token", data.token);
    localStorage.setItem("username", data.username);

    setIsAuthenticated(true);
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        login,
        logout,
        username,
        setToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
