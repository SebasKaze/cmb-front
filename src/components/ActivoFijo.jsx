import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Importa useNavigate

import { FaPlus } from "react-icons/fa";
function ActivoFijo() {
    const [activos, setActivos] = useState([]);


    const navigate = useNavigate(); // Inicializa useNavigate
    const cambioCrearActivo = () => {
        navigate("/activo-fijo/crearActivo"); // Navega a la ruta /nuevo-material
    }
    const userData = JSON.parse(localStorage.getItem("userData")) || {};
    const { id_empresa, id_domicilio } = userData; 

    useEffect(() => {
        if (id_empresa && id_domicilio) {
            fetch(`http://localhost:4000/api/activofijo?id_empresa=${id_empresa}&id_domicilio=${id_domicilio}`)
                .then((response) => response.json())
                .then((data) => setActivos(data)) // Aquí estaba el error, ahora se usa setActivos correctamente
                .catch((error) => console.error("Error al obtener los datos:", error));
        }
    }, [id_empresa, id_domicilio]);

    return (
        <div>

            <h2 className="text-2xl font-bold mb-4">Activo Fijo</h2>
                <div className="w-full p-6">
                    <button 
                    className="bg-green-500 text-white px-4 py-2 rounded-md flex items-center gap-2 shadow-md transition-all duration-300 hover:bg-green-600 hover:scale-105"
                    onClick={cambioCrearActivo}
                    >
                    Agregar Activo Fijo <FaPlus />
                    </button>
                </div>
            {activos.length > 0 ? (
                <table className="table-auto border-collapse border border-gray-400 w-full">
                    <thead>
                        <tr className="bg-gray-200">
                            <th className="border px-4 py-2">ID Activo Fijo</th>
                            <th className="border px-4 py-2">Fracción Arancelaria</th>
                            <th className="border px-4 py-2">Nombre</th>
                            <th className="border px-4 py-2">Ubicación</th>
                            <th className="border px-4 py-2">Descripción</th>
                        </tr>
                    </thead>
                    <tbody>
                        {activos.map((activo) => (
                            <tr key={activo.id_activo_fijo_interno}>
                                <td className="border px-4 py-2">{activo.id_activo_fijo_interno}</td>
                                <td className="border px-4 py-2">{activo.fraccion_arancelaria}</td>
                                <td className="border px-4 py-2">{activo.nombre_activofijo}</td>
                                <td className="border px-4 py-2">{activo.ubicacion_interna}</td>
                                <td className="border px-4 py-2">{activo.descripcion}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p className="text-gray-500">No hay activos fijos registrados para esta empresa.</p>
            )}
        </div>
    );
}

export default ActivoFijo;
