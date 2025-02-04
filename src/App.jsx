import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import NavBar from "./components/NavBar";
import Login from "./components/Login";
import Home from "./components/Home";

function App() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [userData, setUserData] = useState(null); // Guarda datos del usuario y empresa

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

    const handleLogin = async (credentials) => {
        try {
            const response = await axios.post("http://localhost:4000/login", credentials, {
                headers: { "Content-Type": "application/json" },
            });

            if (response.status === 200 && response.data.token) {
                console.log("Token recibido del backend:", response.data.token);

                localStorage.setItem("token", response.data.token);
                setIsAuthenticated(true);

                // Decodificamos el token y guardamos los datos del usuario
                const decodedToken = jwtDecode(response.data.token);
                console.log("Token decodificado:", decodedToken);
                setUserData({
                    nombre_usuario: decodedToken.nombre_usuario,
                    nombre_empresa: decodedToken.nombre_empresa,
                });
                return;
            } else {
                alert("Credenciales inválidas. Intenta de nuevo.");
            }
        } catch (error) {
            console.error("Error en la autenticación:", error);
            alert("Error en la autenticación. Intenta más tarde.");
        }
    };

    const handleLogout = () => {
        localStorage.removeItem("token");
        setIsAuthenticated(false);
        setUserData(null);
    };

    return (
        <Router>
            {isAuthenticated && <NavBar userData={userData} onLogout={handleLogout} />}
            <Routes>
                <Route path="/login" element={!isAuthenticated ? <Login onLogin={handleLogin} /> : <Navigate to="/" />} />
                <Route path="/*" element={isAuthenticated ? <Home /> : <Navigate to="/login" />} />
            </Routes>
        </Router>
    );
}

export default App;