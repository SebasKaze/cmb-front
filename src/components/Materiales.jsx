import React, { useState } from "react";
import { FaAccessibleIcon } from "react-icons/fa";

function Materiales() {

    const [data, setData] = useState([]);
    useEffect(() => {
    fetch("http://localhost:4000/api/verMateriales")
        .then((response) => response.json())
        .then((data) => setData(data))
        .catch((error) => console.error("Error al obtener los datos:", error));
    }, []);

    return (
        <div>
            <div className="w-full">
            <button className="text-green-500 hover:text-green-800">
                <FaEye />
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
                    <tr key={row.id_material} className="text-center">
                    <td className="border p-2">{row.id_material_interno}</td>
                    <td className="border p-2">Nombre</td>
                    <td className="border p-2">{row.fraccion_arancelaria}</td>
                    <td className="border p-2">Descripcion</td>
                    <td className="border p-2">Unidad de mediad</td>
                    <td className="border p-2 flex justify-center gap-2">
                        <button className="text-blue-500 hover:text-blue-800">
                        <FaAccessibleIcon />
                        </button>
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