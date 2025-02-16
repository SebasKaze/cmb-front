import { useState } from "react";
import axios from "axios";

function Registro() {
    const userData = JSON.parse(localStorage.getItem("userData"));//Datos de usuario TOKEN
    
    
    const [mensaje, setMensaje] = useState(""); // Estado para el mensaje

    const [formData, setFormData] = useState({
        nombre: "",
        razonSocial: "",
        no_immex: "",
        rfc: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    // Función para enviar los datos al backend
    const handleSubmit = async (e) => {
        e.preventDefault(); // Evita el comportamiento predeterminado del formulario

    try {
        const dataToSend = {
            ...formData,
            id_usuario: userData.id_usuario,
            id_empresa: userData.id_empresa,
        }
        const response = await fetch("http://localhost:4000/api/registros", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(dataToSend), // Convierte los datos del formulario a JSON
        });

        if (!response.ok) {
            throw new Error(`Error: ${response.status}`);
        }

        const data = await response.json();
        console.log("Respuesta del servidor:", data);
        // Mostrar mensaje de éxito
        setMensaje("Datos enviados correctamente");
        setTimeout(() => setMensaje(""), 3000); // Ocultar el mensaje después de 3 segundos

        // Limpiar el formulario después de enviar los datos
        setFormData({
            nombre: "",
            razonSocial: "",
            no_immex: "",
            rfc: "",
        });
    } catch (error) {
        console.error("Error al enviar los datos:", error);
        setMensaje("Ocurrió un error al enviar los datos");
        setTimeout(() => setMensaje(""), 3000); // Ocultar el mensaje después de 3 segundos
    }
    };



    return (
        <div>
            <h1 className="text-3xl font-bold mb-4 text-center">Registros</h1>
                
            <div className="p-6"> {/*Carga de empresa */}
                {mensaje && (
                <div
                className={`fixed top-4 right-4 p-4 rounded-md shadow-md ${
                    mensaje.includes("correctamente")
                    ? "bg-green-500 text-white"
                    : "bg-red-500 text-white"
                }`}
                >
                {mensaje}
                </div>
                )}
                <h2 className="text-lg font-bold mb-4">Nueva Empresa</h2>
                <form className="grid grid-cols-5 gap-4">
                    <div className="flex flex-col items-center text-center">
                        <label className="mb-2">Nombre</label>
                        <input
                        type="text"
                        name="nombre"
                        value={formData.nombre}
                        onChange={handleChange}
                        className="w-full border rounded-md p-2 focus:outline-none focus:ring focus:ring-green-300"
                        />
                    </div>
                    <div className="flex flex-col items-center text-center">
                        <label className="mb-2">Razon social</label>
                        <input
                        type="text"
                        name="razonSocial"
                        value={formData.razonSocial}
                        onChange={handleChange}
                        className="w-full border rounded-md p-2 focus:outline-none focus:ring focus:ring-green-300"
                        />
                    </div>
                    <div className="flex flex-col items-center text-center">
                        <label className="mb-2">Numero IMMEX</label>
                        <input
                        type="text"
                        name="no_immex"
                        value={formData.no_immex}
                        onChange={handleChange}
                        className="w-full border rounded-md p-2 focus:outline-none focus:ring focus:ring-green-300"
                        />
                    </div>
                    <div className="flex flex-col items-center text-center">
                        <label className="mb-2">RFC</label>
                        <input
                        type="text"
                        name="rfc"
                        value={formData.rfc}
                        onChange={handleChange}
                        className="w-full border rounded-md p-2 focus:outline-none focus:ring focus:ring-green-300"
                        />
                    </div>
                    <div className="flex flex-col items-center text-center p-8">
                        <button
                        type="submit"
                        onClick={handleSubmit}
                        className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
                        >
                        Agregar
                        </button>
                    </div>
                </form>
            </div>
            <div>
                <h1>Domicilios</h1>
            </div>
            <div>
                <h1>Usuarios</h1>
            </div>
            
        </div>
    );
}
export default Registro;