import { createContext, useContext, useMemo, useState } from "react";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import { loginHandler, signupHandler, logoutHandler } from "../services/auth";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState();
  const navigate = useNavigate();

  const loginMutation = useMutation(loginHandler);
  const signupMutation = useMutation(signupHandler);
  const logoutMutation = useMutation(logoutHandler);

  const loginUser = async (formData) => {
    try {
      const user = await loginHandler(formData);
      localStorage.setItem("token", user.data);
      setUser(user.data);
      localStorage.setItem("user", JSON.stringify(user));
      navigate("/dashboard");
    } catch (error) {
      // Handle login error
    }
  };

  const signupUser = async (formData) => {
    try {
      await signupMutation.mutate(formData);
      navigate("/login");
    } catch (error) {
      // Handle signup error
    }
  };

  const logoutUser = async () => {
    try {
      await logoutMutation.mutate();
      setUser(null);
      navigate("/login", { replace: true });
    } catch (error) {
      // Handle logout error
    }
  };

  const value = useMemo(
    () => ({
      user,
      loginUser,
      signupUser,
      logoutUser,
      loginError: loginMutation.error?.message,
      signupError: signupMutation.error?.message,
      logoutError: logoutMutation.error?.message,
    }),
    [user, loginMutation, signupMutation, logoutMutation]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};
