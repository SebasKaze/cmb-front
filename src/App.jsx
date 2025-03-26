import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import NavBar from "./components/Navbar";
import Login from "./components/Login";
import Home from "./components/Home";

function App() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [userData, setUserData] = useState(null);

    //  Obtiene el token almacenado en localStorage
    const getStoredToken = () => localStorage.getItem("token");

    //  Decodifica el token y extrae la información del usuario
    const decodeToken = (token) => {
        try {
            const decoded = jwtDecode(token);
            const now = Date.now() / 1000;
            console.log(" Token sin decodificar:", token);
            console.log(" Token decodificado:", decoded)
            if (decoded.exp < now) {
                localStorage.removeItem("token");
                localStorage.removeItem("userData");
                return null;
            }

            return {
                id_usuario: decoded.id_usuario,
                id_empresa: decoded.id_empresa,
                nombre_usuario: decoded.nombre_usuario,
                nombre_empresa: decoded.nombre_empresa,
            };
        } catch (error) {
            console.error("Error al decodificar el token:", error);
            return null;
        }
    };

    //  Carga los datos del usuario si hay un token válido en localStorage
    useEffect(() => {
        const token = getStoredToken();
        if (token) {
            const user = decodeToken(token);
            if (user) {
                setIsAuthenticated(true);
                setUserData(user);
                localStorage.setItem("userData", JSON.stringify(user)); // Guarda en localStorage
            }
        }
    }, []);

    //  Maneja el inicio de sesión
    const handleLogin = async (credentials) => {
        try {
            const response = await axios.post("http://localhost:4000/login", credentials);

            if (response.status === 200 && response.data.token) {
                localStorage.setItem("token", response.data.token);
                const user = decodeToken(response.data.token);
                if (user) {
                    setIsAuthenticated(true);
                    setUserData(user);
                    localStorage.setItem("userData", JSON.stringify(user)); // Guarda en localStorage
                    
                }
            }
        } catch (error) {
            console.error("Error en la autenticación:", error);
            alert("Error en la autenticación.");
        }
    };

    // Maneja el cierre de sesión
    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("userData");
        setIsAuthenticated(false);
        setUserData(null);
    };

    return (
        <Router>
            {isAuthenticated && <NavBar userData={userData} onLogout={handleLogout} />}
            <div style={{ paddingTop: "60px" }}>
                <Routes>
                    <Route path="/login" element={!isAuthenticated ? <Login onLogin={handleLogin} /> : <Navigate to="/" />} />
                    <Route path="/*" element={isAuthenticated ? <Home /> : <Navigate to="/login" />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;