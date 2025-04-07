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
    const [selectedCompany, setSelectedCompany] = useState(localStorage.getItem("selectedEmpresa") || "");
    const [selectedAddress, setSelectedAddress] = useState(localStorage.getItem("selectedDomicilio") || "");
    const getStoredToken = () => localStorage.getItem("token");
    const decodeToken = (token) => {
        try {
            const decoded = jwtDecode(token);
            const now = Date.now() / 1000;
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
                tipo_de_cuenta: decoded.tipo_de_cuenta
            };
        } catch (error) {
            console.error("Error al decodificar el token:", error);
            return null;
        }
    };

    useEffect(() => {
        const token = getStoredToken();
        if (token) {
            const user = decodeToken(token);
            if (user) {
                setIsAuthenticated(true);
                setUserData(user);
                localStorage.setItem("userData", JSON.stringify(user));
                setSelectedCompany(user.id_empresa);
                setSelectedAddress(localStorage.getItem("selectedDomicilio") || "");
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
                    localStorage.setItem("userData", JSON.stringify(user));
                    setSelectedCompany(user.id_empresa);
                    setSelectedAddress(localStorage.getItem("selectedDomicilio") || "");
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
        localStorage.removeItem("selectedEmpresa");
        localStorage.removeItem("selectedDomicilio");
        setIsAuthenticated(false);
        setUserData(null);
        setSelectedCompany("");
        setSelectedAddress("");
    };
    const handleCompanyChange = (newCompanyId) => {
        setSelectedCompany(newCompanyId);
        localStorage.setItem("selectedEmpresa", newCompanyId);
    };
    const handleAddressChange = (newAddressId) => {
        setSelectedAddress(newAddressId);
        localStorage.setItem("selectedDomicilio", newAddressId);
    };

    return (
        <Router>
            {isAuthenticated && <NavBar 
                userData={userData} 
                onLogout={handleLogout} 
                selectedCompany={selectedCompany}
                onCompanyChange={handleCompanyChange} 
                selectedAddress={selectedAddress} 
                onAddressChange={handleAddressChange} 
            />}
            <div style={{ paddingTop: "60px" }}>
                <Routes>
                    <Route path="/login" element={!isAuthenticated ? <Login onLogin={handleLogin} /> : <Navigate to="/" />} />
                    <Route 
                        path="/*" 
                        element={
                            isAuthenticated ? (
                                <Home 
                                    userData={userData} 
                                    selectedCompany={selectedCompany} 
                                    selectedAddress={selectedAddress}
                                    key={selectedCompany}
                                />
                            ) : <Navigate to="/login" />
                        } 
                    />
                </Routes>
            </div>
        </Router>
    );
}

export default App;