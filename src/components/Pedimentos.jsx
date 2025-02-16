import { useState, useEffect } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import { FaEye } from "react-icons/fa6";

function getMonthDifference(startDate, endDate) {
return (
    (endDate.getFullYear() - startDate.getFullYear()) * 12 +
    (endDate.getMonth() - startDate.getMonth())
);
}

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
            <th className="border p-2">Estado</th>
            <th className="border p-2"> </th>
            </tr>
        </thead>
        <tbody>
            {data.map((row) => {
            const fechaEnDate = new Date(row.fecha_en);
            const hoy = new Date();
            const fechaLimite = new Date(fechaEnDate);
            fechaLimite.setMonth(fechaLimite.getMonth() + 18);

            const estaVencido = hoy > fechaLimite;
            const mesesFaltantes = getMonthDifference(hoy, fechaLimite);

            let estatus;
            if (mesesFaltantes > 0) {
                estatus = `Faltan ${mesesFaltantes} meses`;
            } else {
                estatus = `Han pasado ${Math.abs(mesesFaltantes)} meses`;
            }

            let bgColor;
            if (estaVencido) {
                bgColor = "bg-red-500 text-white";
            } else if (mesesFaltantes <= 12) {
                bgColor = "bg-yellow-500 text-black";
            } else {
                bgColor = "bg-green-500 text-white";
            }

            return (
                <tr key={row.no_pedimento} className="text-center">
                <td className="border p-2">{row.no_pedimento}</td>
                <td className="border p-2">{row.tipo_oper}</td>
                <td className="border p-2">{row.fecha_en}</td>
                <td className="border p-2">Sin documentos</td>
                <td className={`border p-2 ${bgColor} font-bold`}>
                    {estatus}
                </td>
                <td className="border p-2">
                    {estaVencido ? "Vencido" : "Vigente"}
                </td>
                <td className="border p-2 flex justify-center gap-2">
                    <button className="text-blue-500 hover:text-blue-800">
                    <FaEdit />
                    </button>
                    <button className="text-green-500 hover:text-green-800">
                    <FaEye />
                    </button>
                </td>
                </tr>
            );
            })}
        </tbody>
        </table>
    </div>
    </div>
);
}