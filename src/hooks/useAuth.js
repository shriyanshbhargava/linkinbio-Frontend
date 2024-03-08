import { createContext, useContext, useMemo, useState } from "react";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

const login = async (formData) => {
  const url = "http://localhost:8000/api/auth";
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message);
  }

  const token = await response.json();
  localStorage.setItem("token", JSON.stringify(token));
  return token;
};

const signup = async (formData) => {
  const url = "http://localhost:8000/api/users";
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message);
  }

  return response.json();
};

const logout = async () => {
  localStorage.removeItem("token");
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState();
  const navigate = useNavigate();

  const loginMutation = useMutation(login);
  const signupMutation = useMutation(signup);
  const logoutMutation = useMutation(logout);

  const loginUser = async (formData) => {
    try {
      const user = await loginMutation.mutate(formData);
      setUser(user);
      localStorage.setItem("user", JSON.stringify(user));
      navigate("/dashboard");
    } catch (error) {
    }
  };

  const signupUser = async (formData) => {
    try {
      await signupMutation.mutate(formData);
      navigate("/login");
    } catch (error) {}
  };

  const logoutUser = async () => {
    try {
      await logoutMutation.mutate();
      setUser(null);
      navigate("/login", { replace: true });
    } catch (error) {}
  };

  const value = useMemo(
    () => ({
      user,
      loginUser,
      signupUser,
      logoutUser,
      loginError: loginMutation.error?.message,
      signupError: signupMutation.error?.message,
      logoutError: logoutMutation.error,
    }),
    [user, loginMutation, signupMutation, logoutMutation]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};
