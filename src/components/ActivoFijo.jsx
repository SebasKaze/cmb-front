import { useState, useEffect } from "react";
import axios from "axios";

function ActivoFijo() {
    const userData = JSON.parse(localStorage.getItem("userData")); // Obtener datos de usuario desde localStorage
    const [activos, setActivos] = useState([]);

    useEffect(() => {
        if (!userData?.id_empresa) {
            console.error("Faltan datos de la empresa en localStorage");
            return;
        }

        axios.post("http://localhost:4000/api/activofijo", {
            id_empresa: userData.id_empresa,
        })
        .then((response) => {
            setActivos(response.data);
        })
        .catch((error) => console.error("Error al obtener los datos:", error));
    }, []);

    return (
        <div>
            <h2 className="text-2xl font-bold mb-4">Activo Fijo</h2>

            {/* Verifica si hay activos antes de mostrar la tabla */}
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
