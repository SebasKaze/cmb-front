// AuthContext.js
import { createContext, useContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";

const AuthContext = createContext();

export const useAuth = () => {
    return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            setIsAuthenticated(true);
            const decodedToken = jwtDecode(token); // Decodificamos el token
            // Extraemos la información del token y la guardamos en el estado
            setUserData({
                nombre_usuario: decodedToken.nombre_usuario,
                nombre_empresa: decodedToken.nombre_empresa,
            });
        }
    }, []);

    const login = (token) => {
        localStorage.setItem("token", token);
        setIsAuthenticated(true);
        const decodedToken = jwtDecode(token);
        setUserData({
            nombre_usuario: decodedToken.nombre_usuario,
            nombre_empresa: decodedToken.nombre_empresa,
        });
    };

    const logout = () => {
        localStorage.removeItem("token");
        setIsAuthenticated(false);
        setUserData(null);
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, userData}}>
            {children}
        </AuthContext.Provider>
    );
};