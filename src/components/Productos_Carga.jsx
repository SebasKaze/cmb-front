import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { IoMdArrowRoundBack } from "react-icons/io";
import { FaPlus, FaTrash } from 'react-icons/fa'; 

function ProductosCarga() {
    const navigate = useNavigate();

    const [materiales, setMateriales] = useState([]); 
    const [seleccionados, setSeleccionados] = useState([]); // Ahora es un array
    const userData = JSON.parse(localStorage.getItem("userData")) || {};//Informacion del token

    const { id_empresa, id_domicilio } = userData; // Extraer los IDs necesarios

    
    const [formData, setFormData] = useState({
        id: "",
        nombre: "",
        fraccion: "",
        descripcion: "",
        unidadMedida: "",
        cantidad: "",
    });

    useEffect(() => {
        if (id_empresa && id_domicilio) {
            fetch(`http://localhost:4000/api/verMateriales?id_empresa=${id_empresa}&id_domicilio=${id_domicilio}`)
                .then((response) => response.json())
                .then((data) => setMateriales(data)) // Corrección aquí
                .catch((error) => console.error("Error al obtener los datos:", error));
        }
    }, [id_empresa, id_domicilio]);

    const agregarMaterial = (material) => {
        if (!seleccionados.some((m) => m.id_material_interno === material.id_material_interno)) {
            setSeleccionados([...seleccionados, { ...material, cantidad: 1 }]);
        }
    };

    const cambiarCantidad = (id, cantidad) => {
        setSeleccionados(seleccionados.map((m) => 
            m.id_material_interno === id ? { ...m, cantidad: parseInt(cantidad) || 1 } : m
        ));
    };

    const eliminarMaterial = (id) => {
        setSeleccionados(seleccionados.filter((m) => m.id_material_interno !== id));
    };

    const enviarProductos = () => {
        const dataEnviar = {
            ...formData,
            materiales: seleccionados,
            id_usuario: userData.id_usuario,
            id_empresa: userData.id_empresa,
            id_domicilio: userData.id_domicilio,
        };
        axios.post("http://localhost:4000/api/cargaproducto", dataEnviar)
            .then(response => console.log("Enviado con éxito:", response.data))
            .catch(error => console.error("Error al enviar:", error));
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const [filtro, setFiltro] = useState("");
    const materialesFiltrados = materiales.filter((material) =>
        (material.nombre_interno.toLowerCase() || "").includes(filtro.toLowerCase()) || 
        (material.descripcion_fraccion.toLowerCase() || "").includes(filtro.toLowerCase())
    );

    return (
        <div className="main-container">
            <div className="w-full">
                <button 
                    className="btn-crud"
                    onClick={() => navigate("/productos")}
                >
                    <IoMdArrowRoundBack /> Regresar
                </button>
            </div>
            <div className="flex flex-col md:flex-row gap-4 p-6">   
                <div className="w-full md:w-1/2 p-6">
                    <h2 className="text-lg font-bold mb-4">Datos del Producto</h2>
                    <form>
                        {[
                            { label: "ID", name: "id" },
                            { label: "Nombre", name: "nombre" },
                            { label: "Fracción", name: "fraccion" },
                            { label: "Descripción", name: "descripcion" },
                            { label: "Unidad Medida", name: "unidadMedida" },
                            { label: "Cantidad", name: "cantidad" }
                        ].map((campo, index) => (
                            <div key={index} className="flex flex-col mb-4">
                                <label className="mb-1">{campo.label}</label>
                                <input
                                    type="text"
                                    name={campo.name}
                                    value={formData[campo.name]}
                                    onChange={handleChange}
                                    className="w-full border rounded-md p-2 focus:outline-none focus:ring focus:ring-green-300"
                                />
                            </div>
                        ))}
                    </form>
                </div>
                
                <div className="w-full md:w-1/2 border p-4 rounded-md shadow-md">
                    <h2 className="text-lg font-bold mb-4">Lista de Materiales</h2>
                    <input
                        type="text"
                        placeholder="Buscar material..."
                        value={filtro}
                        onChange={(e) => setFiltro(e.target.value)}
                        className="w-full border rounded-md p-2 mb-2 focus:outline-none focus:ring focus:ring-blue-300"
                    />
                    <div className="max-h-60 overflow-auto border rounded-md p-2">
                    {materialesFiltrados.length > 0 ? (
                        materialesFiltrados.map((material) => (
                            <div key={material.id_material_interno} className="flex justify-between items-center p-2 border-b">
                                <span>{material.nombre_interno} | {material.descripcion_fraccion}</span>
                                <button
                                    onClick={() => agregarMaterial(material)}
                                    className="btn-agregar"
                                >
                                    <FaPlus />
                                </button>
                            </div>
                        ))
                    ) : (
                        <p className="text-gray-500 text-center">No se encontraron materiales</p>
                    )}
                    </div>

                    {seleccionados.length > 0 && (
                        <>
                            <h3 className="text-md font-bold mt-4">Materiales Seleccionados</h3>
                            <table className="w-full border-collapse border border-gray-300 mt-2">
                                <thead>
                                    <tr className="bg-gray-200">
                                        <th className="border p-2">Nombre</th>
                                        <th className="border p-2">Cantidad</th>
                                        <th className="border p-2">Acción</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {seleccionados.map((material) => (
                                        <tr key={material.id_material_interno} className="text-center">
                                            <td className="border p-2">{material.nombre_interno}</td>
                                            <td className="border p-2">
                                                <input
                                                    type="number"
                                                    value={material.cantidad}
                                                    onChange={(e) => cambiarCantidad(material.id_material_interno, e.target.value)}
                                                    className="w-16 border rounded-md p-1 text-center"
                                                />
                                            </td>
                                            <td className="border p-2">
                                                <button
                                                    onClick={() => eliminarMaterial(material.id_material_interno)}
                                                    className="btn-eliminar"
                                                >
                                                    <FaTrash />
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </>
                    )}

                    <button
                        className="btn-crud"
                        onClick={enviarProductos}
                    >
                        Enviar Productos
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ProductosCarga;
