import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

//Imports de iconos
import { CiEdit } from "react-icons/ci";
import { FaPlus } from "react-icons/fa";
import { FaTrash } from "react-icons/fa";

function Materiales() {

    const userData = JSON.parse(localStorage.getItem("userData")) || {};
    const { id_empresa, id_domicilio } = userData;

    const [data, setData] = useState([]);
    const navigate = useNavigate();
    const [editingRowId, setEditingRowId] = useState(null);
    const [editedData, setEditedData] = useState({});

    useEffect(() => {
        if (id_empresa && id_domicilio) {
            fetch(`http://localhost:4000/api/verMateriales?id_empresa=${id_empresa}&id_domicilio=${id_domicilio}`)
                .then((response) => response.json())
                .then((data) => setData(data))
                .catch((error) => console.error("Error al obtener los datos:", error));
        }
    }, [id_empresa, id_domicilio]);

    const handleNuevoMaterial = () => {
        navigate("/materiales/nuevomaterial");
    }

    const handleEditClick = (row) => {
        setEditingRowId(row.id_material_interno);
        setEditedData(row);
    };

    const handleSaveClick = (id) => {
        const { id_domicilio } = userData;
    
        const updatedData = { ...editedData, id_domicilio };
    
        fetch(`http://localhost:4000/api/editarMaterial/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(updatedData),
        })
            .then((response) => {
                if (!response.ok) {
                    return response.json().then((errorData) => {
                        throw new Error(errorData.message || "Error al actualizar el material.");
                    });
                }
                return response.json();  
            })
            .then((updatedData) => {
                setData((prevData) =>
                    prevData.map((row) =>
                        row.id_material_interno === id ? updatedData : row
                    )
                );
                setEditingRowId(null); 
                alert("Cambios guardados exitosamente");
            })
            .catch((error) => {
                console.error("Error al actualizar los datos:", error);
                alert(error.message);
            });
    };

    const handleCancelClick = () => {
        setEditingRowId(null);
        setEditedData({});
    };
    
    
    const handleChange = (e, field) => {
        setEditedData((prevData) => ({
            ...prevData,
            [field]: e.target.value,
        }));
    };

    const handleDeleteClick = (id) => {
        const { id_domicilio } = userData; 
        const deleteData = { id_material_interno: id, id_domicilio };

        if (window.confirm("¿Seguro que deseas eliminar este material?")) {
            fetch(`http://localhost:4000/api/eliminarmaterial/${id}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(deleteData),
            })
                .then(async (response) => {
                    if (!response.ok) {
                        const errorData = await response.json();
                        throw new Error(errorData.message || "Error desconocido al eliminar el material.");
                    }
                    return response.json();
                })
                .then(() => {
                    setData((prevData) => prevData.filter((row) => row.id_material_interno !== id));
                    alert("Material eliminado exitosamente.");
                })
                .then((data) => {
                    alert(data.message);
                    setData((prevData) => prevData.filter((row) => row.id_material_interno !== id));
                })
                .catch((error) => {
                    console.error("Error al eliminar el material:", error);

                    if (error.message.includes("No se encontró el Material")) {
                        alert("Error: No se encontró el material en la base de datos.");
                    } else if (error.message.includes("No es posible eliminar")) {
                        alert("⚠️ No es posible eliminar este material, ya está registrado en Productos.");
                    } else if (error.message.includes("Error interno del servidor")) {
                        alert("Error interno del servidor. Intenta más tarde.");
                    } 
                });
        }
    };

    return (
        <div className="main-container">
            <div className="w-full">
                <button 
                className="btn-crud"
                onClick={handleNuevoMaterial}
                >
                Nuevo material <FaPlus />
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
                            <tr key={row.id_material_interno} className="text-center">
                                <td className="border p-2">{row.id_material_interno}</td>
                                <td className="border p-2">
                                    {editingRowId === row.id_material_interno ? (
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
                                    {editingRowId === row.id_material_interno ? (
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
                                    {editingRowId === row.id_material_interno ? (
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
                                    {editingRowId === row.id_material_interno ? (
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
                                    {editingRowId === row.id_material_interno ? (
                                        <>
                                            <button
                                                className="text-green-500 hover:text-green-800"
                                                onClick={() => handleSaveClick(row.id_material_interno)}
                                            >
                                                ✔️
                                            </button>
                                            <button className="text-red-500 hover:text-red-800" onClick={handleCancelClick}>
                                                ❌
                                            </button>
                                        </>
                                        
                                        
                                    ) : (
                                        <>
                                            <button className="text-blue-500 hover:text-blue-800" onClick={() => handleEditClick(row)}>
                                                <CiEdit />
                                            </button>
                                            <button className="text-red-500 hover:text-red-800" onClick={() => handleDeleteClick(row.id_material_interno)}>
                                                <FaTrash />
                                            </button>
                                        </>
                                        
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
export default Materiales;