import React, { createContext, useState, ReactNode, useContext } from 'react';

// 1. Definimos los tipos de datos que manejará nuestro contexto
interface AuthContextType {
  isLoggedIn: boolean;
  userName: string;
  loginUser: (name: string) => void;
  logoutUser: () => void;
}

// 2. Creamos el contexto con un valor inicial (puede ser undefined al principio)
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// 3. Creamos el componente Proveedor
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [userName, setUserName] = useState<string>('');

  // Función para iniciar sesión
  const loginUser = (name: string) => {
    setUserName(name);
    setIsLoggedIn(true);
  };

  // Función para cerrar sesión
  const logoutUser = () => {
    setIsLoggedIn(false);
    setUserName('');
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, userName, loginUser, logoutUser }}>
      {children}
    </AuthContext.Provider>
  );
};

// 4. Hook personalizado para facilitar el uso del contexto (Opcional pero recomendado)
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe ser usado dentro de un AuthProvider');
  }
  return context;
};