import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { CiEdit } from 'react-icons/ci';
import { FaPlus, FaEye } from 'react-icons/fa';

function Productos() {
    const [data, setData] = useState([]);
    const [popupData, setPopupData] = useState(null);
    const [showPopup, setShowPopup] = useState(false);
    const navigate = useNavigate();
    const [editingRowId, setEditingRowId] = useState(null);
    const [editedData, setEditedData] = useState({});

    const userData = JSON.parse(localStorage.getItem("userData")) || {};	//puedes cambiar id_domicilio por otro atributo
    const { id_empresa, id_domicilio } = userData; // Extraer los IDs necesarios

    useEffect(() => {
        if (id_empresa && id_domicilio) {
            fetch(`http://localhost:4000/api/verProductos?id_empresa=${id_empresa}&id_domicilio=${id_domicilio}`)
                .then((response) => response.json())
                .then((data) => setData(data))
                .catch((error) => console.error("Error al obtener los datos:", error));
        }
    }, [id_empresa, id_domicilio]);

    const handleNuevoMaterial = () => {
        navigate("/productos/nuevoproducto");
    };

    const handleEditClick = (row) => {
        setEditingRowId(row.id_producto_interno);
        setEditedData(row);
    };

    const handleCancelClick = () => {
        setEditingRowId(null); // Cancela la edición y vuelve a los botones originales
        setEditedData({}); // Limpia los datos editados para evitar cambios no deseados
    };
    
    const handleSaveClick = (id) => {
        const { id_domicilio } = userData;
        const updatedData = { ...editedData, id_domicilio };
    
        fetch(`http://localhost:4000/api/editarproducto/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(updatedData),
        })
            .then((response) => {
                if (!response.ok) {
                    return response.json().then((errorData) => {
                        throw new Error(errorData.message || "Error al actualizar el producto.");
                    });
                }
                return response.json();
            })
            .then((updatedData) => {
                setData((prevData) => prevData.map((row) => (row.id_producto_interno === id ? updatedData : row)));
                setEditingRowId(null); // Desactiva el modo edición solo si la actualización es exitosa
                alert("Cambios guardados exitosamente");
            })
            .catch((error) => {
                console.error("Error al actualizar los datos:", error);
                alert(error.message);
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
                <button className="btn-crud" onClick={handleNuevoMaterial}>
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
                            <th className="border p-2"> </th>
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
                                        <>
                                            <button className="text-green-500 hover:text-green-800" onClick={() => handleSaveClick(row.id_producto_interno)}>
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
                                    <th className="border p-2">ID</th>
                                    <th className="border p-2">Cantidad</th>
                                </tr>
                            </thead>
                            <tbody>
                                {popupData.map((item, index) => (
                                    <tr key={index}>
                                        <td className="border p-2 font-bold">{item.id_material_interno}</td>
                                        <td className="border p-2">{item.cantidad}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <button 
                            className="btn-crud" 
                            onClick={() => setShowPopup(false)}
                        >
                            Cerrar
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Productos;
