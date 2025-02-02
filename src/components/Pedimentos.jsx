import { useState, useEffect } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import { FaEye } from "react-icons/fa6";

export default function Pedimento() {
    const [data, setData] = useState([]);
    useEffect(() => {
    fetch("http://localhost:4000/api/verpedimento")
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
                <th className="border p-2">Numero de pedimento</th>
                <th className="border p-2">Patente</th>
                <th className="border p-2">Fecha de entrada</th>
                <th className="border p-2">Documentos</th>
                <th className="border p-2">Estatus</th>
                <th className="border p-2"> </th>
                </tr>
            </thead>
            <tbody>
                {data.map((row) => {
                    const fechaEnDate = new Date(row.fecha_en); // Convertir la fecha en objeto Date
                    const hoy = new Date(); // Obtener la fecha actual
                    const fechaLimite = new Date(fechaEnDate); // Clonar fecha_en
                    fechaLimite.setDate(fechaEnDate.getDate() + 180); // Sumar 180 días
                
                    // Calcular la diferencia en días
                    const diferenciaDias = Math.ceil((fechaLimite - hoy) / (1000 * 60 * 60 * 24));
                
                    // Determinar el estatus
                    let estatus;
                    if (diferenciaDias > 0) {
                        estatus = `Faltan ${diferenciaDias} días`;
                    } else {
                        estatus = `Han pasado ${Math.abs(diferenciaDias)} días`;
                    }
                    let bgColor;
                    if (Math.abs(diferenciaDias) <= 30) {
                      bgColor = "bg-red-500 text-white"; // Rojo
                    } else if (Math.abs(diferenciaDias) <= 90) {
                      bgColor = "bg-yellow-500 text-black"; // Amarillo
                    } else {
                      bgColor = "bg-green-500 text-white"; // Verde
                    }
                    return(
                        <tr key={row.no_pedimento} className="text-center">
                            <td className="border p-2">{row.no_pedimento}</td>
                            <td className="border p-2">{row.tipo_oper}</td>
                            <td className="border p-2">{row.fecha_en}</td>
                            <td className="border p-2">Sin documentos</td>
                            <td className={`border p-2 ${bgColor} font-bold`}>{estatus}</td> {/* Casilla con color */}
                            <td className="border p-2 flex justify-center gap-2">
                            <button className="text-blue-500 hover:text-blue-800">
                                <FaEdit />
                            </button>
                            <button className="text-green-500 hover:text-green-800">
                                <FaEye />
                            </button>
                            </td>
                        </tr>
                    )
            })}
            </tbody>
            </table>
        </div>
    </div>
);
}
