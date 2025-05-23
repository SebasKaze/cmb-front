import { useState, useEffect } from "react";
import { FaEye } from "react-icons/fa6";

function SalidaMercancia() {
    const backConection = import.meta.env.VITE_BACK_URL;
    const [data, setActivos] = useState([]);
    const [modalData, setModalData] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isModalOpen2, setIsModalOpen2] = useState(false);
    const userData = JSON.parse(localStorage.getItem("userData")) || {};
    const { id_empresa, id_domicilio } = userData;

    const [fechaInicio, setFechaInicio] = useState("");
    const [fechaFin, setFechaFin] = useState("");

    useEffect(() => {
        if (id_empresa && id_domicilio) {
            fetch(`${backConection}/api/procesos/smercancias?id_empresa=${id_empresa}&id_domicilio=${id_domicilio}`)
                .then((response) => response.json())
                .then((data) => setActivos(data))
                .catch((error) => console.error("Error al obtener los datos:", error));
        }
    }, [id_empresa, id_domicilio]);

    const fetchFracciones = async (pedimento) => {
        try {
            const response = await fetch(`${backConection}/api/procesos/smercancias/fracciones?no_pedimento=${pedimento}`);
            const data = await response.json();
            setModalData(data);
            setIsModalOpen(true);
        } catch (error) {
            console.error("Error al obtener las fracciones:", error);
        }
    };

    const descargarExcel = () => {
        if (!fechaInicio || !fechaFin) {
            alert("Por favor, selecciona un rango de fechas.");
            return;
        }
        window.open(`${backConection}/api/procesos/reporte/smercanciasE?id_empresa=${id_empresa}&id_domicilio=${id_domicilio}&fechaInicio=${fechaInicio}&fechaFin=${fechaFin}`, "_blank");
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <div className="w-full max-w-5xl p-4">
                <h2 className="text-3xl font-bold text-gray-900 mb-6 p-6">Salida de Mercancías</h2>

                {/* Botón para abrir el modal */}
                <div className="flex gap-4 mb-4">
                    <button 
                        onClick={() => setIsModalOpen2(true)} 
                        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 transition"
                    >
                        Generar Reporte
                    </button>
                </div>

                <table className="w-full border border-gray-300 shadow-lg bg-white">
                    <thead className="bg-gray-200">
                        <tr>
                            <th className="border p-2">Pedimento</th>
                            <th className="border p-2">Clave de pedimento</th>
                            <th className="border p-2">Fecha</th>
                            <th className="border p-2">Descargo</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((row) => (
                            <tr key={row.no_pedimento} className="text-center">
                                <td className="border p-2">{row.no_pedimento}</td>
                                <td className="border p-2">{row.clave_ped}</td>
                                <td className="border p-2">{row.fecha_en}</td>
                                <td className="border p-2 flex justify-center gap-2">
                                    <button 
                                        className="text-blue-500 hover:text-blue-800"
                                        onClick={() => fetchFracciones(row.no_pedimento)}
                                    >
                                        <FaEye />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {isModalOpen && <Modal data={modalData} onClose={() => setIsModalOpen(false)} />}
            </div>

            {/* MODAL */}
            {isModalOpen2 && (
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
                            onClick={() => setIsModalOpen2(false)} 
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

function Modal({ data, onClose }) {
    return (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                <h2 className="text-xl font-bold mb-4">Fracciones del Pedimento</h2>
                <table className="w-full border border-gray-300">
                    <thead className="bg-gray-200">
                        <tr>
                            <th className="border p-2">Fracción</th>
                            <th className="border p-2">Cantidad</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.length > 0 ? (
                            data.map((item, index) => (
                                <tr key={index} className="text-center">
                                    <td className="border p-2">{item.fraccion}</td>
                                    <td className="border p-2">{item.cantidad_umt}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="2" className="border p-2 text-center">No hay partidas para este pedimento</td>
                            </tr>
                        )}
                    </tbody>
                </table>
                <button 
                    className="btn-crud"
                    onClick={onClose}
                >
                    Cerrar
                </button>
            </div>
        </div>
    );
}

export default SalidaMercancia;