import { useState, useEffect } from "react";

function Saldos() {
    const [data, setData] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;
    const userData = JSON.parse(localStorage.getItem("userData")) || {};
    const { id_empresa, id_domicilio } = userData;

    useEffect(() => {
        if (id_empresa && id_domicilio) {
            fetch(`http://localhost:4000/api/procesos/saldoMuestra?id_empresa=${id_empresa}&id_domicilio=${id_domicilio}`)
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

    return (
        <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-6 p-6">Saldo</h2>
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
        </div>
    );
}

export default Saldos;
