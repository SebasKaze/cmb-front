import { useState } from "react";
import axios from "axios";

import { useNavigate } from "react-router-dom"; //Necesario Para regresar

//Import iconos
import { IoMdArrowRoundBack } from "react-icons/io";


export default function CargaMateriales() {
    const [query, setQuery] = useState("");
    const [resultados, setResultados] = useState([]);
    const [mostrarBusqueda, setMostrarBusqueda] = useState(false); // Estado para controlar la visibilidad
    const navigate = useNavigate();//Navegar
    const [mensaje, setMensaje] = useState(""); // Estado para el mensaje

    const [formData, setFormData] = useState({
        idInterno: "",
        nombreFracc: "",
        fraccion: "",
        descripcionFraccion: "",
        unidadMedida: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

  // Función para realizar la búsqueda
    const buscar = async () => {
        if (!query) return;
        try {
        const { data } = await axios.get(
            `http://localhost:4000/api/cargamateriales/fracciones?query=${query}`
        );
        setResultados(data);
        } catch (error) {
        console.error("Error en la búsqueda:", error);
        }
    };
    // Función para alternar la visibilidad del div de búsqueda
    const toggleBusqueda = () => {
        setMostrarBusqueda((prev) => !prev); // Alterna entre true y false
    };


// Función para enviar los datos al backend
    const handleSubmit = async (e) => {
        e.preventDefault(); // Evita el comportamiento predeterminado del formulario

    try {
        const dataToSend = {
            ...formData,
        }
        const response = await fetch("http://localhost:4000/api/cargamateriales", {
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
            idInterno: "",
            nombreFracc: "",
            fraccion: "",
            descripcionFraccion: "",
            unidadMedida: "",
        });
    } catch (error) {
        console.error("Error al enviar los datos:", error);
        setMensaje("Ocurrió un error al enviar los datos");
        setTimeout(() => setMensaje(""), 3000); // Ocultar el mensaje después de 3 segundos
    }
    };

    //Regresar
    const Regresar = () => {
        navigate("/materiales"); // Navega a la ruta /nuevo-material
    }
    return (
        <div>
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

        <div className="w-full">
            <button 
            className="bg-green-500 text-white px-4 py-2 rounded-md flex items-center gap-2 shadow-md transition-all duration-300 hover:bg-green-600 hover:scale-105"
            onClick={Regresar}
            >
            <IoMdArrowRoundBack />Regresar
            </button>
        </div>

        {/* Formulario para agregar nuevo material */}
            <div className="p-6">
                <h2 className="text-lg font-bold mb-4">Nuevo Material</h2>
                <form className="grid grid-cols-5 gap-4">
                    <div className="flex flex-col items-center text-center">
                        <label className="mb-2">ID</label>
                        <input
                        type="text"
                        name="idInterno"
                        value={formData.idInterno}
                        onChange={handleChange}
                        className="w-full border rounded-md p-2 focus:outline-none focus:ring focus:ring-green-300"
                        />
                    </div>
                    <div className="flex flex-col items-center text-center">
                        <label className="mb-2">Nombre</label>
                        <input
                        type="text"
                        name="nombreFracc"
                        value={formData.nombreFracc}
                        onChange={handleChange}
                        className="w-full border rounded-md p-2 focus:outline-none focus:ring focus:ring-green-300"
                        />
                    </div>
                    <div className="flex flex-col items-center text-center">
                        <label className="mb-2">Fracción</label>
                        <input
                        type="text"
                        name="fraccion"
                        value={formData.fraccion}
                        onChange={handleChange}
                        className="w-full border rounded-md p-2 focus:outline-none focus:ring focus:ring-green-300"
                        />
                    </div>
                    <div className="flex flex-col items-center text-center">
                        <label className="mb-2">Descripción</label>
                        <input
                        type="text"
                        name="descripcionFraccion"
                        value={formData.descripcionFraccion}
                        onChange={handleChange}
                        className="w-full border rounded-md p-2 focus:outline-none focus:ring focus:ring-green-300"
                        />
                    </div>
                    <div className="flex flex-col items-center text-center">
                        <label className="mb-2">Unidad Medida</label>
                        <input
                        type="text"
                        name="unidadMedida"
                        value={formData.unidadMedida}
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
                    {/* Botón para mostrar/ocultar el div de búsqueda */}
        <div className="text-center mt-4">
            <button
            onClick={toggleBusqueda}
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
            >
            {mostrarBusqueda ? "Ocultar Búsqueda" : "Buscar Fracción"}
            </button>
        </div>

        {/* Div de búsqueda (se muestra/oculta según el estado) */}
        {mostrarBusqueda && (
            <div className="p-4 max-w-xl mx-auto">
                <h2 className="text-xl font-bold mb-2">Buscar Fracción TIGIE</h2>
                <div className="flex">
                    <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Buscar Código o Descripción..."
                    className="border p-2 flex-grow"
                    />
                    <button
                    onClick={buscar}
                    className="bg-blue-500 text-white px-4 py-2 ml-2"
                    >
                    Buscar
                    </button>
                </div>
                <ul
                    className="mt-4 border rounded max-h-48 overflow-y-auto" // Limita el tamaño y agrega scroll vertical
                >
                    {resultados.length > 0 ? (
                    resultados.map((item, index) => (
                        <li key={index} className="p-2 border-b">
                        <strong>{item.codigo}</strong> - {item.descripcion}
                        </li>
                    ))
                    ) : (
                    <li className="p-2 text-gray-500">No hay resultados</li>
                    )}
                </ul>
            </div>
        )}

        </div>
    );
}