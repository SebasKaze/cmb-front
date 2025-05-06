import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { IoMdArrowRoundBack } from "react-icons/io";

function MaterialesUtilizadosCP() {
    const backConection = import.meta.env.VITE_BACK_URL;
    const navigate = useNavigate();
    const userData = JSON.parse(localStorage.getItem("userData")) || {};

    const { id_usuario, id_empresa, id_domicilio } = userData; 
    const [productos, setProductos] = useState([]);
    const [productoSeleccionado, setProductoSeleccionado] = useState("");
    const [cantidadProducto, setCantidadProducto] = useState(""); // Nuevo estado
    const [materiales, setMateriales] = useState([]);
    const [cantidades, setCantidades] = useState({});
    const [fechaCreacion, setFechaCreacion] = useState(""); // Nuevo estado

    // Cargar productos disponibles
    useEffect(() => {
        if (id_empresa && id_domicilio) {
            axios.get(`${backConection}/api/procesos/mateutili/cargaproducto?id_empresa=${id_empresa}&id_domicilio=${id_domicilio}`)
                .then(response => setProductos(response.data))
                .catch(error => console.error("Error al obtener productos:", error));
        }
    }, [id_empresa, id_domicilio]);

    // Obtener materiales asociados al producto seleccionado
    const buscarMateriales = async () => {
        if (!productoSeleccionado) return;

        try {
            const response = await axios.get(`${backConection}/api/procesos/mateutili/cargamateriales?producto=${productoSeleccionado}`);
            setMateriales(response.data);
            setCantidades({});
        } catch (error) {
            console.error("Error al obtener materiales:", error);
        }
    };

    // Manejar cambios en las cantidades de los materiales
    const handleCantidadChange = (id, value) => {
        setCantidades(prev => ({ ...prev, [id]: value }));
    };

    // Función para obtener la fecha y hora actual en formato SQL (YYYY-MM-DD HH:mm:ss)
    const obtenerFechaActual = () => {
        const ahora = new Date();
        const año = ahora.getFullYear();
        const mes = String(ahora.getMonth() + 1).padStart(2, '0');
        const dia = String(ahora.getDate()).padStart(2, '0');
        const horas = String(ahora.getHours()).padStart(2, '0');
        const minutos = String(ahora.getMinutes()).padStart(2, '0');
        const segundos = String(ahora.getSeconds()).padStart(2, '0');
        return `${año}-${mes}-${dia} ${horas}:${minutos}:${segundos}`;
    };
    // Enviar datos al backend con id_usuario, id_producto, cantidad_producto y fecha_creacion
    const enviarInformacion = async () => {
        const fechaRegistro = obtenerFechaActual(); // Generamos la fecha al momento de enviar
        try {
            const datos = {
                id_usuario, 
                id_domicilio,
                id_empresa,
                id_producto: productoSeleccionado,
                cantidad_producto: cantidadProducto, // Se añade cantidad de producto
                fecha_creacion: fechaCreacion,
                fecha_reg: fechaRegistro,
                materiales: materiales.map(mat => ({
                    id_material: mat.id_material,
                    cantidad: cantidades[mat.id_material] || 0
                }))
            };

            await axios.post(`${backConection}/api/procesos/mateutili/guardar`, datos);
            alert("Información enviada correctamente");
            // Restablecer los estados después de enviar la información
            setProductoSeleccionado("");
            setCantidadProducto("");
            setFechaCreacion("");
            setMateriales([]);
            setCantidades({});
        } catch (error) {
            console.error("Error al enviar datos:", error);
        }
    };

    return (
        <div className="main-container">
            <button 
                className="btn-crud"
                onClick={() => navigate("/materiales-utilizados")}
            >
                <IoMdArrowRoundBack /> Regresar
            </button>

            <div className="flex flex-col md:flex-row gap-4 mt-6">   
                {/* Sección de selección de producto */}
                <div className="w-full md:w-1/2 p-6 border rounded-md shadow-md">
                    <h2 className="text-lg font-bold mb-4">Cargar Producto</h2>
                    <select 
                        className="w-full border p-2 rounded-md"
                        value={productoSeleccionado}
                        onChange={(e) => setProductoSeleccionado(e.target.value)}
                    >
                        <option value="">Selecciona un producto</option>
                        {productos.map(prod => (
                            <option key={prod.id_producto} value={prod.id_producto}>
                                {prod.nombre_interno}
                            </option>
                        ))}
                    </select>

                    {/* Nuevo campo de Cantidad de Producto */}
                    <label className="block mt-4 text-sm font-medium text-gray-700">Cantidad de Producto:</label>
                    <input 
                        type="number" 
                        className="w-full border p-2 rounded-md" 
                        value={cantidadProducto} 
                        onChange={(e) => setCantidadProducto(e.target.value)} 
                    />

                    {/* Nuevo campo de Fecha de Creación */}
                    <label className="block mt-4 text-sm font-medium text-gray-700">Fecha de Creación:</label>
                    <input 
                        type="date" 
                        className="w-full border p-2 rounded-md" 
                        value={fechaCreacion} 
                        onChange={(e) => setFechaCreacion(e.target.value)} 
                    />

                    <button 
                        className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 w-full"
                        onClick={buscarMateriales}
                    >
                        Buscar
                    </button>
                </div>
                
                {/* Tabla de materiales */}
                <div className="w-full md:w-1/2 border p-4 rounded-md shadow-md">
                    <h2 className="text-lg font-bold mb-4">Lista de Materiales</h2>
                    {materiales.length > 0 ? (
                        <table className="w-full border-collapse border">
                            <thead>
                                <tr className="bg-gray-200">
                                    <th className="border p-2">Material</th>
                                    <th className="border p-2">Cantidad</th>
                                </tr>
                            </thead>
                            <tbody>
                                {materiales.map(mat => (
                                    <tr key={mat.id_material} className="text-center">
                                        <td className="border p-2">{mat.nombre_interno}</td>
                                        <td className="border p-2">
                                            <input 
                                                type="number" 
                                                className="w-full p-1 border rounded-md"
                                                value={cantidades[mat.id_material] || ""}
                                                onChange={(e) => handleCantidadChange(mat.id_material, e.target.value)}
                                            />
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    ) : (
                        <p className="text-gray-500">No hay materiales cargados</p>
                    )}
                </div>
            </div>

            {/* Botón de enviar información */}
            {materiales.length > 0 && (
                <button
                    className="mt-4 bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 w-full"
                    onClick={enviarInformacion}
                >
                    Enviar Información
                </button>
            )}
        </div>
    );
}

export default MaterialesUtilizadosCP;
