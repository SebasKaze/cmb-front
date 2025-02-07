import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Importa useNavigate

//Imports de iconos
import { CiEdit } from "react-icons/ci";
import { FaPlus } from "react-icons/fa";
import { FaEye } from "react-icons/fa";

function Productos() {

    const [data, setData] = useState([]);
    const navigate = useNavigate(); // Inicializa useNavigate

    const [editingRowId, setEditingRowId] = useState(null); // ID de la fila en edición
    const [editedData, setEditedData] = useState({}); // Datos editados temporalmente

    useEffect(() => {
    fetch("http://localhost:4000/api/verproductos")
        .then((response) => response.json())
        .then((data) => setData(data))
        .catch((error) => console.error("Error al obtener los datos:", error));
    }, []);

    const handleNuevoMaterial = () => {
        navigate("/productos/nuevoproducto"); // Navega a la ruta /nuevo-material
    }

    const handleEditClick = (row) => {
        setEditingRowId(row.id_producto_interno);
        setEditedData(row); // Cargar los datos actuales de la fila en el estado
    };

    const handleSaveClick = (id) => {
        // Enviar los datos actualizados al backend
        fetch(`http://localhost:4000/api/editarproducto/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(editedData),
        })
            .then((response) => response.json())
            .then((updatedData) => {
                // Actualizar la tabla localmente
                setData((prevData) =>
                    prevData.map((row) =>
                        row.id_producto_interno === id ? updatedData : row
                    )
                );
                setEditingRowId(null); // Salir del modo edición
                // Mostrar mensaje de éxito
                alert("Cambios guardados exitosamente");
            })
            .catch((error) => {
                console.error("Error al actualizar los datos:", error);
                alert("Hubo un error al guardar los cambios. Por favor, inténtalo de nuevo.");
            });
    };
    const handleChange = (e, field) => {
        setEditedData((prevData) => ({
            ...prevData,
            [field]: e.target.value,
        }));
    };

    return (
        <div>
            <div className="w-full">
                <button 
                className="bg-green-500 text-white px-4 py-2 rounded-md flex items-center gap-2 shadow-md transition-all duration-300 hover:bg-green-600 hover:scale-105"
                onClick={handleNuevoMaterial}
                >
                Nuevo Producto <FaPlus />
                </button>
            </div>
            <div className="w-full max-w-5xl p-4">
                <table className="w-full border border-gray-300 shadow-lg bg-white">
                <thead className="bg-gray-200">
                    <tr>
                    <th className="border p-2">ID</th>
                    <th className="border p-2">Nombre</th>
                    <th className="border p-2">Fraccion</th>
                    <th className="border p-2">Descripcion</th>
                    <th className="border p-2">Unidad de medida</th>
                    <th className="border p-2"> </th>
                    </tr>
                </thead>
                <tbody>
                {data.map((row) => (
                            <tr key={row.id_producto_interno} className="text-center">
                                <td className="border p-2">{row.id_producto_interno}</td>
                                <td className="border p-2">
                                    {editingRowId === row.id_producto_interno ? (
                                        <input
                                            type="text"
                                            value={editedData.nombre_interno || ""}
                                            onChange={(e) => handleChange(e, "nombre_interno")}
                                            className="border p-1"
                                        />
                                    ) : (
                                        row.nombre_interno
                                    )}
                                </td>
                                <td className="border p-2">
                                    {editingRowId === row.id_producto_interno ? (
                                        <input
                                            type="text"
                                            value={editedData.fraccion_arancelaria || ""}
                                            onChange={(e) => handleChange(e, "fraccion_arancelaria")}
                                            className="border p-1"
                                        />
                                    ) : (
                                        row.fraccion_arancelaria
                                    )}
                                </td>
                                <td className="border p-2">
                                    {editingRowId === row.id_producto_interno ? (
                                        <input
                                            type="text"
                                            value={editedData.descripcion_fraccion || ""}
                                            onChange={(e) => handleChange(e, "descripcion_fraccion")}
                                            className="border p-1"
                                        />
                                    ) : (
                                        row.descripcion_fraccion
                                    )}
                                </td>
                                <td className="border p-2">
                                    {editingRowId === row.id_producto_interno ? (
                                        <input
                                            type="text"
                                            value={editedData.unidad_medida || ""}
                                            onChange={(e) => handleChange(e, "unidad_medida")}
                                            className="border p-1"
                                        />
                                    ) : (
                                        row.unidad_medida
                                    )}
                                </td>
                                <td className="border p-2 flex justify-center gap-2">
                                    {editingRowId === row.id_producto_interno ? (
                                        <button
                                            className="text-green-500 hover:text-green-800"
                                            onClick={() => handleSaveClick(row.id_producto_interno)}
                                        >
                                            Guardar
                                        </button>
                                    ) : (
                                        <button
                                            className="text-blue-500 hover:text-blue-800"
                                            onClick={() => handleEditClick(row)}
                                        >
                                            <CiEdit />
                                        </button>
                                    )}
                                </td>
                            </tr>
                        ))}
                </tbody>
                </table>
            </div>


        </div>
    )
}
export default Productos;