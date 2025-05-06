import { useState, useEffect } from "react";

function Saldos() {
    const backConection = import.meta.env.back_url;
    const [data, setData] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;
    const userData = JSON.parse(localStorage.getItem("userData")) || {};
    const { id_empresa, id_domicilio } = userData;

    const [modalReporte, setIsModalReporte] = useState(false);
    const [fechaInicio, setFechaInicio] = useState("");
    const [fechaFin, setFechaFin] = useState("");

    useEffect(() => {
        if (id_empresa && id_domicilio) {
            fetch(`${backConection}/api/procesos/saldoMuestra?id_empresa=${id_empresa}&id_domicilio=${id_domicilio}`)
                .then((response) => response.json())
                .then((data) => setData(data))
                .catch((error) => console.error("Error al obtener los datos:", error));
        }
    }, [id_empresa, id_domicilio]);

    // Filtrar por fracción
    const filteredData = data.filter(row => 
        row.fraccion.toString().toLowerCase().includes(searchTerm.toLowerCase())
    );

    const totalPages = Math.ceil(filteredData.length / itemsPerPage);
    const paginatedData = filteredData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    const descargarExcel = () => {
        if (!fechaInicio || !fechaFin) {
            alert("Por favor, selecciona un rango de fechas.");
            return;
        }
        window.open(`${backConection}/api/procesos/reporte/saldoE?id_empresa=${id_empresa}&id_domicilio=${id_domicilio}&fechaInicio=${fechaInicio}&fechaFin=${fechaFin}`, "_blank");
    };

    return (
        <div className="main-container">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 p-6">Saldo</h2>
            {/* Botón para abrir el modal */}
            <div className="flex gap-4 mb-4">
                <button 
                    onClick={() => setIsModalReporte(true)} 
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 transition"
                >
                    Generar Reporte
                </button>
            </div>
            <input 
                type="text" 
                placeholder="Buscar por fracción..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="border  p-2 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <div className="border border-gray-300 shadow-lg bg-white">
                
                <table className="w-full">
                    <thead className="bg-gray-200">
                        <tr>
                            <th className="border p-2">No. Pedimento</th>
                            <th className="border p-2">Fracción</th>
                            <th className="border p-2">Resta más antigua</th>
                        </tr>
                    </thead>
                    <tbody>
                        {paginatedData.map((row, index) => (
                            <tr key={index} className="text-center">
                                <td className="border p-2">{row.no_pedimento}</td>
                                <td className="border p-2">{row.fraccion}</td>
                                <td className="border p-2">{row.resta}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="flex justify-center mt-4 gap-2">
                {Array.from({ length: totalPages }, (_, index) => (
                    <button
                        key={index + 1}
                        className={`px-4 py-2 rounded-md shadow-md transition-all duration-300 ${currentPage === index + 1 ? 'bg-blue-500 text-white' : 'bg-gray-200 hover:bg-gray-300'}`}
                        onClick={() => setCurrentPage(index + 1)}
                    >
                        {index + 1}
                    </button>
                ))}
            </div>

            {/* MODAL */}
            {modalReporte && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                        <h2 className="text-xl font-semibold mb-4">Generar Reporte</h2>

                        {/* Filtro de rango de fechas */}
                        <label className="block text-gray-700">Fecha Inicio:</label>
                        <input 
                            type="date" 
                            className="border p-2 w-full mt-2 rounded" 
                            value={fechaInicio}
                            onChange={(e) => setFechaInicio(e.target.value)}
                        />

                        <label className="block text-gray-700 mt-3">Fecha Fin:</label>
                        <input 
                            type="date" 
                            className="border p-2 w-full mt-2 rounded" 
                            value={fechaFin}
                            onChange={(e) => setFechaFin(e.target.value)}
                        />

                        {/* Botones de exportación */}
                        <div className="flex gap-4 mt-4">
                            <button 
                                onClick={descargarExcel} 
                                className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-700 transition">
                                Exportar Excel
                            </button>
                        </div>

                        {/* Botón para cerrar */}
                        <button 
                            onClick={() => setIsModalReporte(false)} 
                            className="mt-4 px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-700 transition w-full"
                        >
                            Cerrar
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Saldos;
