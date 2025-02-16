import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { CiEdit } from "react-icons/ci";
import { FaPlus, FaEye } from "react-icons/fa";

function Productos() {
    const [data, setData] = useState([]);
    const [popupData, setPopupData] = useState(null);
    const [showPopup, setShowPopup] = useState(false);
    const navigate = useNavigate();
    const [editingRowId, setEditingRowId] = useState(null);
    const [editedData, setEditedData] = useState({});

    useEffect(() => {
        fetch("http://localhost:4000/api/verproductos")
            .then((response) => response.json())
            .then((data) => setData(data))
            .catch((error) => console.error("Error al obtener los datos:", error));
    }, []);

    const handleNuevoMaterial = () => {
        navigate("/productos/nuevoproducto");
    };

    const handleEditClick = (row) => {
        setEditingRowId(row.id_producto_interno);
        setEditedData(row);
    };

    const handleSaveClick = (id) => {
        fetch(`http://localhost:4000/api/editarproducto/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(editedData),
        })
            .then((response) => response.json())
            .then((updatedData) => {
                setData((prevData) => prevData.map((row) => (row.id_producto_interno === id ? updatedData : row)));
                setEditingRowId(null);
                alert("Cambios guardados exitosamente");
            })
            .catch((error) => {
                console.error("Error al actualizar los datos:", error);
                alert("Hubo un error al guardar los cambios.");
            });
    };

    const handleChange = (e, field) => {
        setEditedData((prevData) => ({ ...prevData, [field]: e.target.value }));
    };

    const handleViewClick = (id) => {
        fetch(`http://localhost:4000/api/billete/${id}`)
            .then((response) => response.json())
            .then((data) => {
                setPopupData(data);
                setShowPopup(true);
            })
            .catch((error) => console.error("Error al obtener los detalles del producto:", error));
    };

    return (
        <div>
            <div className="w-full">
                <button className="bg-green-500 text-white px-4 py-2 rounded-md flex items-center gap-2 shadow-md transition-all duration-300 hover:bg-green-600 hover:scale-105" onClick={handleNuevoMaterial}>
                    Nuevo Producto <FaPlus />
                </button>
            </div>
            <div className="w-full max-w-5xl p-4">
                <table className="w-full border border-gray-300 shadow-lg bg-white">
                    <thead className="bg-gray-200">
                        <tr>
                            <th className="border p-2">ID</th>
                            <th className="border p-2">Nombre</th>
                            <th className="border p-2">Fracción</th>
                            <th className="border p-2">Descripción</th>
                            <th className="border p-2">Unidad de medida</th>
                            <th className="border p-2">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((row) => (
                            <tr key={row.id_producto_interno} className="text-center">
                                <td className="border p-2">{row.id_producto_interno}</td>
                                <td className="border p-2">{editingRowId === row.id_producto_interno ? <input type="text" value={editedData.nombre_interno || ""} onChange={(e) => handleChange(e, "nombre_interno")} className="border p-1" /> : row.nombre_interno}</td>
                                <td className="border p-2">{editingRowId === row.id_producto_interno ? <input type="text" value={editedData.fraccion_arancelaria || ""} onChange={(e) => handleChange(e, "fraccion_arancelaria")} className="border p-1" /> : row.fraccion_arancelaria}</td>
                                <td className="border p-2">{editingRowId === row.id_producto_interno ? <input type="text" value={editedData.descripcion_fraccion || ""} onChange={(e) => handleChange(e, "descripcion_fraccion")} className="border p-1" /> : row.descripcion_fraccion}</td>
                                <td className="border p-2">{editingRowId === row.id_producto_interno ? <input type="text" value={editedData.unidad_medida || ""} onChange={(e) => handleChange(e, "unidad_medida")} className="border p-1" /> : row.unidad_medida}</td>
                                <td className="border p-2 flex justify-center gap-2">
                                    {editingRowId === row.id_producto_interno ? (
                                        <button className="text-green-500 hover:text-green-800" onClick={() => handleSaveClick(row.id_producto_interno)}>Guardar</button>
                                    ) : (
                                        <>
                                            <button className="text-blue-500 hover:text-blue-800" onClick={() => handleEditClick(row)}>
                                                <CiEdit />
                                            </button>
                                            <button className="text-gray-500 hover:text-gray-800" onClick={() => handleViewClick(row.id_producto_interno)}>
                                                <FaEye />
                                            </button>
                                        </>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {showPopup && popupData && (
                <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
                    <div className="bg-white p-5 rounded-md shadow-lg w-1/3">
                        <h2 className="text-xl font-bold mb-3">Detalles del Producto</h2>
                        <table className="w-full border border-gray-300">
                            <thead>
                                <tr className="bg-gray-200">
                                    <th className="border p-2">Campo</th>
                                    <th className="border p-2">Valor</th>
                                </tr>
                            </thead>
                            <tbody>
                                {Object.entries(popupData).map(([key, value]) => (
                                    <tr key={key}>
                                        <td className="border p-2 font-bold">{key}</td>
                                        <td className="border p-2">{value}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <button className="mt-3 bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600" onClick={() => setShowPopup(false)}>Cerrar</button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Productos;
