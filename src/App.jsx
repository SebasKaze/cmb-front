import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import axios from "axios";
import Login from "./components/Login";
import Home from "./components/Home";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Recuperar estado de autenticación al cargar la app
    const authStatus = localStorage.getItem("isAuthenticated") === "true";
    setIsAuthenticated(authStatus);
  }, []);

  const handleLogin = async (credentials) => {
    try {
      const response = await axios.post("http://localhost:4000/login", credentials, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.status === 200) {
        localStorage.setItem("isAuthenticated", "true");
        setIsAuthenticated(true);
      } else {
        alert("Credenciales inválidas. Intenta de nuevo.");
      }
    } catch (error) {
      if (error.response) {
        console.error("Error del servidor:", error.response.data);
        alert(`Error del servidor: ${error.response.data.message || "Error desconocido."}`);
      } else if (error.request) {
        console.error("No se recibió respuesta del servidor:", error.request);
        alert("No se recibió respuesta del servidor. Intenta más tarde.");
      } else {
        console.error("Error durante la solicitud:", error.message);
        alert("Error en el cliente. Intenta más tarde.");
      }
    }
  };

  return (
    <Router>
      <Routes>
        {/* Ruta para Login */}
        <Route
          path="/login"
          element={
            !isAuthenticated ? <Login onLogin={handleLogin} /> : <Navigate to="/" />
          }
        />

        {/* Ruta para Home */}
        <Route
          path="/*"
          element={
            isAuthenticated ? <Home /> : <Navigate to="/login" />
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
