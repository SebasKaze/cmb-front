import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaEdit, FaTrash, FaEye } from "react-icons/fa";

export default function Pedimento() {
  const backConection = import.meta.env.back_url;
  const [data, setData] = useState([]);
  const navigate = useNavigate(); // Inicializa navigate
  const userData = JSON.parse(localStorage.getItem("userData"));

  useEffect(() => {
    let idEmpresa = userData?.id_empresa;
    let idDomicilio = userData?.id_domicilio;

    let url = `${backConection}/api/verpedimento`;
    if (idEmpresa && idDomicilio) {
      url += `?id_empresa=${idEmpresa}&id_domicilio=${idDomicilio}`;
    }

    fetch(url)
      .then((response) => response.json())
      .then((data) => setData(data))
      .catch((error) => console.error("Error al obtener los datos:", error));
  }, []);

  const handleEdit = (no_pedimento) => {
    navigate(`/pedimentos/editar/${no_pedimento}`); // Redirige con el parámetro en la URL
  };

  const handleView = (no_pedimento) => {
    navigate(`/pedimentos/ver/${no_pedimento}`); // Redirige con el parámetro en la URL
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-5xl p-4">
        <table className="w-full border border-gray-300 shadow-lg bg-white">
          <thead className="bg-gray-200">
            <tr>
              <th className="border p-2">Número de pedimento</th>
              <th className="border p-2">Patente</th>
              <th className="border p-2">Fecha de entrada</th>
              <th className="border p-2">Documentos</th>
              <th className="border p-2">Estatus</th>
              <th className="border p-2"></th>
            </tr>
          </thead>
          <tbody>
            {data.map((row) => {
              const fechaEnDate = new Date(row.fecha_en);
              const hoy = new Date();
              const fechaLimite = new Date(fechaEnDate);
              fechaLimite.setDate(fechaEnDate.getDate() + 180);
              const diferenciaDias = Math.ceil((fechaLimite - hoy) / (1000 * 60 * 60 * 24));

              let estatus = diferenciaDias > 0 
                ? `Faltan ${diferenciaDias} días` 
                : `Han pasado ${Math.abs(diferenciaDias)} días`;

              let bgColor = Math.abs(diferenciaDias) <= 30 
                ? "bg-red-500 text-white" 
                : Math.abs(diferenciaDias) <= 90 
                ? "bg-yellow-500 text-black" 
                : "bg-green-500 text-white";

              return (
                <tr key={row.no_pedimento} className="text-center">
                  <td className="border p-2">{row.no_pedimento}</td>
                  <td className="border p-2">{row.tipo_oper}</td>
                  <td className="border p-2">{row.fecha_en}</td>
                  <td className="border p-2">Sin documentos</td>
                  <td className={`border p-2 ${bgColor} font-bold`}>{estatus}</td>
                  <td className="border p-2 flex justify-center gap-2">
                  {(userData.tipo_de_cuenta !== 3 && userData.tipo_de_cuenta !== 4) && (
                    <button 
                    className="text-blue-500 hover:text-blue-800"
                    onClick={() => handleEdit(row.no_pedimento)}
                    >
                      <FaEdit />
                    </button>
                  )}
                    <button 
                      className="text-green-500 hover:text-green-800"
                      onClick={() => handleView(row.no_pedimento)} // Redirige al ver el pedimento
                    >
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