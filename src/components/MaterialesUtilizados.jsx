import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { CiEdit } from 'react-icons/ci';
import { FaPlus, FaEye } from 'react-icons/fa';

function MaterialesUtilizados() {
    const navigate = useNavigate();
    const [data, setData] = useState([]);
    const userData = JSON.parse(localStorage.getItem("userData")) || {};
    const { id_empresa, id_domicilio } = userData; 

    useEffect(() => {
        if (id_empresa && id_domicilio) {
            fetch(`http://localhost:4000/api/procesos/mateutili?id_empresa=${id_empresa}&id_domicilio=${id_domicilio}`)
                .then((response) => response.json())
                .then((data) => {
                    const formattedData = data.map(row => ({
                        ...row,
                        fecha_transformacion: new Date(row.fecha_transformacion).toISOString().split('T')[0]
                    }));
                    setData(formattedData);
                })
                .catch((error) => console.error("Error al obtener los datos:", error));
        }
    }, [id_empresa, id_domicilio]);

    const handleNuevoMaterial = () => {
        navigate("/materiales-utilizados/cargaproducto");
    };

    const handleEdit = (id) => {
        navigate(`/materiales-utilizados/editar/${id}`);
    };

    return (
        <div className="main-container">
            <div className="w-full mb-4">
                <button 
                    className="btn-crud" 
                    onClick={handleNuevoMaterial}>
                    Carga de Productos <FaPlus />
                </button>
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-6 p-6">Materiales Utilizados</h2>
            <table className="w-full border border-gray-300 shadow-lg bg-white">
                <thead className="bg-gray-200">
                    <tr>
                        <th className="border p-2">Producto</th>
                        <th className="border p-2">Cantidad creada</th>
                        <th className="border p-2">Fecha</th>
                        <th className="border p-2">Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((row, index) => (
                        <tr key={index} className="text-center">
                            <td className="border p-2">{row.nombre}</td>
                            <td className="border p-2">{row.cantidad}</td>
                            <td className="border p-2">{row.fecha_transformacion}</td>
                            <td className="border p-2 flex justify-center gap-2">
                                <button className="text-blue-500 hover:text-blue-800">
                                    <FaEye />
                                </button>
                                <button className="text-yellow-500 hover:text-yellow-800" onClick={() => handleEdit(row.id)}>
                                    <CiEdit />
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default MaterialesUtilizados;
