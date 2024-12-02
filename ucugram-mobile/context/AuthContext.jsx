import React, { createContext, useState, useEffect } from "react";
import { toast } from "react-toastify";
import AsyncStorage from '@react-native-async-storage/async-storage';  // Importa AsyncStorage
import useAuthService from "@/services/AuthService";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const { login: authLogin, register: authRegister } = useAuthService();

  // Cargar el usuario desde AsyncStorage cuando el componente se monta
  useEffect(() => {
    const loadUser = async () => {
      try {
        const storedUser = await AsyncStorage.getItem("user");
        if (storedUser) {
          setUser(JSON.parse(storedUser));
        }
      } catch (error) {
        console.error("Error loading user from AsyncStorage", error);
      }
    };

    loadUser();
  }, []);

  const register = async (username, email, password) => {
    try {
      const response = await authRegister(username, email, password);
      setUser(response.data);
      await AsyncStorage.setItem("user", JSON.stringify(response.data));  // Guarda el usuario en AsyncStorage
    } catch (error) {
      toast.error(JSON.parse(error.request.response).message);
    }
  };

  const login = async (email, password) => {
    try {
      const response = await authLogin(email, password);
      setUser(response.data);
      await AsyncStorage.setItem("user", JSON.stringify(response.data));  // Guarda el usuario en AsyncStorage
    } catch (error) {
      toast.error(JSON.parse(error.request.response).message);
    }
  };

  const logout = async () => {
    setUser(null);
    await AsyncStorage.removeItem("user");  // Elimina el usuario de AsyncStorage
  };

  return (
    <AuthContext.Provider value={{ user, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
