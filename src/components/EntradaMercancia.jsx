import { useState, useEffect } from "react";
import { FaEye } from "react-icons/fa6";

export default function Pedimento() {
    const [data, setData] = useState([]);
    useEffect(() => {
    fetch("http://localhost:4000/api/entradamercancia")
        .then((response) => response.json())
        .then((data) => setData(data))
        .catch((error) => console.error("Error al obtener los datos:", error));
    }, []);

return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <div className="w-full max-w-5xl p-4">
            <table className="w-full border border-gray-300 shadow-lg bg-white">
            <thead className="bg-gray-200">
                <tr>
                <th className="border p-2">Fecha</th>
                <th className="border p-2">Pedimento</th>
                <th className="border p-2">Clave de pedimento</th>
                <th className="border p-2"> </th>
                </tr>
            </thead>
            <tbody>
            {data.map((row) => (
                <tr key={row.no_pedimento} className="text-center">
                <td className="border p-2">{row.fecha_en}</td>
                <td className="border p-2">{row.no_pedimento}</td>
                <td className="border p-2">{row.clave_ped}</td>
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
