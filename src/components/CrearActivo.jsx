import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { IoMdArrowRoundBack } from "react-icons/io";

function CambioCrearActivo() {
    const navigate = useNavigate();

    const Regresar = () => {
        navigate("/activo-fijo");
    };

    const userData = JSON.parse(localStorage.getItem("userData")) || {};
    const { id_empresa, id_domicilio } = userData;

    const [mensaje, setMensaje] = useState("");

    const [formData, setFormData] = useState({
        idInterno: "",
        nombre_activofijo: "",
        fraccion: "",
        ubicacion_interna: "",
        descripcion: "",
        pedimentosSeleccionados: [],
    });

    const [pedimentos, setPedimentos] = useState([]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };


    const togglePedimentoSeleccionado = (id) => {
        setFormData((prevData) => {
            const nuevosSeleccionados = prevData.pedimentosSeleccionados.includes(id)
                ? prevData.pedimentosSeleccionados.filter((item) => item !== id)
                : [...prevData.pedimentosSeleccionados, id];
    
            return {
                ...prevData,
                pedimentosSeleccionados: nuevosSeleccionados,
            };
        });
    };
    
    

    // Cargar pedimentos desde el backend
    useEffect(() => {
        const fetchPedimentos = async () => {
            try {
                const response = await axios.get(`http://localhost:4000/api/pedimentos/activofijo?id_empresa=${id_empresa}&id_domicilio=${id_domicilio}`);
                setPedimentos(response.data);
            } catch (error) {
                console.error("Error al obtener pedimentos:", error);
            }
        };

        fetchPedimentos();
    }, [id_empresa, id_domicilio]);

    // Enviar datos al backend
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const dataToSend = {
                ...formData,
                id_usuario: userData.id_usuario,
                id_empresa: userData.id_empresa,
                id_domicilio: userData.id_domicilio,
            };

            const response = await fetch("http://localhost:4000/api/crearaf", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(dataToSend),
            });

            if (!response.ok) {
                throw new Error(`Error: ${response.status}`);
            }

            const data = await response.json();
            setMensaje("Datos enviados correctamente");
            setTimeout(() => setMensaje(""), 3000);

            setFormData({
                idInterno: "",
                fraccion: "",
                nombre_activofijo: "",
                ubicacion_interna: "",
                descripcion: "",
                pedimentosSeleccionados: [],
            });
        } catch (error) {
            console.error("Error al enviar los datos:", error);
            setMensaje("Ocurrió un error al enviar los datos");
            setTimeout(() => setMensaje(""), 3000);
        }
    };

    return (
        <div className="main-container">
            <div>
                <button className="btn-crud" onClick={Regresar}>
                    <IoMdArrowRoundBack /> Regresar
                </button>
            </div>
            <h1 className="text-2xl font-bold text-gray-800 mb-4 pt-6">Crear un Activo Fijo</h1>
            <div>
                {mensaje && <p className="text-green-600 font-bold">{mensaje}</p>}
                <form className="grid grid-cols-5 gap-4" onSubmit={handleSubmit}>
                    <div className="flex flex-col items-center text-center">
                        <label className="mb-2">ID</label>
                        <input
                            type="text"
                            name="idInterno"
                            value={formData.idInterno}
                            onChange={handleChange}
                            className="w-full border rounded-md p-2 focus:outline-none focus:ring focus:ring-green-300"
                        />
                    </div>
                    <div className="flex flex-col items-center text-center">
                        <label className="mb-2">Fracción</label>
                        <input
                            type="text"
                            name="fraccion"
                            value={formData.fraccion}
                            onChange={handleChange}
                            className="w-full border rounded-md p-2 focus:outline-none focus:ring focus:ring-green-300"
                        />
                    </div>
                    <div className="flex flex-col items-center text-center">
                        <label className="mb-2">Nombre</label>
                        <input
                            type="text"
                            name="nombre_activofijo"
                            value={formData.nombre_activofijo}
                            onChange={handleChange}
                            className="w-full border rounded-md p-2 focus:outline-none focus:ring focus:ring-green-300"
                        />
                    </div>
                    <div className="flex flex-col items-center text-center">
                        <label className="mb-2">Ubicación</label>
                        <input
                            type="text"
                            name="ubicacion_interna"
                            value={formData.ubicacion_interna}
                            onChange={handleChange}
                            className="w-full border rounded-md p-2 focus:outline-none focus:ring focus:ring-green-300"
                        />
                    </div>
                    <div className="flex flex-col items-center text-center">
                        <label className="mb-2">Descripción</label>
                        <input
                            type="text"
                            name="descripcion"
                            value={formData.descripcion}
                            onChange={handleChange}
                            className="w-full border rounded-md p-2 focus:outline-none focus:ring focus:ring-green-300"
                        />
                    </div>
                    <div className="flex flex-col items-center text-left col-span-2">
                        <label className="mb-2 text-center w-full">Pedimentos</label>
                        <div className="w-full h-40 overflow-y-auto border rounded-md p-2">
                            {pedimentos.map((pedimento) => (
                                <label key={pedimento.id} className="flex items-center space-x-2 mb-1">
                                <input
                                type="checkbox"
                                value={pedimento.no_pedimento}
                                checked={formData.pedimentosSeleccionados.includes(pedimento.no_pedimento)}
                                onChange={(e) => togglePedimentoSeleccionado(e.target.value)}
                                

                                />
                                    <span>{pedimento.no_pedimento}</span>
                                </label>
                            ))}
                        </div>
                        <small className="text-gray-500 mt-1">Selecciona uno o más pedimentos</small>
                    </div>

                    <div className="flex flex-col items-center text-center p-8 col-span-1">
                        <button
                            type="submit"
                            className="btn-agregar"
                        >
                            Agregar
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default CambioCrearActivo;
