import { useState, useEffect } from "react";
import { FaEye } from "react-icons/fa6";

export default function Pedimento() {
    const [data, setActivos] = useState([]);
    const userData = JSON.parse(localStorage.getItem("userData")) || {};
    const { id_empresa, id_domicilio } = userData; 
    useEffect(() => {
        if (id_empresa && id_domicilio) {
            fetch(`http://localhost:4000/api/procesos/emercancias?id_empresa=${id_empresa}&id_domicilio=${id_domicilio}`)
                .then((response) => response.json())
                .then((data) => setActivos(data))
                .catch((error) => console.error("Error al obtener los datos:", error));
        }
    }, [id_empresa, id_domicilio]);

return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <div className="w-full max-w-5xl p-4">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 p-6">Entrada de mercancias</h2>
            <table className="w-full border border-gray-300 shadow-lg bg-white">
                <thead className="bg-gray-200">
                    <tr>
                    <th className="border p-2">Pedimento</th>
                    <th className="border p-2">Clave de pedimento</th>
                    <th className="border p-2">Fecha</th>
                    <th className="border p-2"> </th>
                    </tr>
                </thead>
                <tbody>
                {data.map((row) => (
                    <tr key={row.no_pedimento} className="text-center">
                    <td className="border p-2">{row.no_pedimento}</td>
                    <td className="border p-2">{row.clave_ped}</td>
                    <td className="border p-2">{row.fecha_en}</td>
                    <td className="border p-2 flex justify-center gap-2">
                        <button className="text-blue-500 hover:text-blue-800">
                            <FaEye />
                        </button>
                    </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    </div>
);
}