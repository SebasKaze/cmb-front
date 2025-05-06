import { useState, useEffect } from "react";
import axios from "axios";

function Registro() {
    const backConection = import.meta.env.VITE_BACK_URL;
    const userData = JSON.parse(localStorage.getItem("userData"));
    const [mensaje, setMensaje] = useState("");
    const [domicilioSeleccionado, setDomicilioSeleccionado] = useState("");
    const [domicilios, setDomicilios] = useState([]);
    const [formData, setFormData] = useState({
        nombre: "",
        razonSocial: "",
        no_immex: "",
        rfc: "",
    });

    const [empresas, setEmpresas] = useState([]);
    const [empresaSeleccionada, setEmpresaSeleccionada] = useState("");
    const [formDataDomi, setFormDataDomi] = useState({
        domi: "",
        tipo_domi: "",
    });

    const [formDataUsuario, setFormDataUsuario] = useState({
        nombre: "",
        correo: "",
        telefono: "",
        contraseña: "",
        rol: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    // Función para enviar los datos al backend
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const dataToSend = {
                ...formData,
                id_usuario: userData.id_usuario,
                id_empresa: userData.id_empresa,
            }
            const response = await fetch(`${backConection}/api/registros`, {
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
            setTimeout(() => setMensaje(""), 3000); // Ocultar el mensaje después de 3 segundos

            // Limpiar el formulario después de enviar los datos
            setFormData({
                nombre: "",
                razonSocial: "",
                no_immex: "",
                rfc: "",
            });
        } catch (error) {
            console.error("Error al enviar los datos:", error);
            setMensaje("Ocurrió un error al enviar los datos");
            setTimeout(() => setMensaje(""), 3000); // Ocultar el mensaje después de 3 segundos
        }
    };




    // Obtener visualizacion de las empresas 
    useEffect(() => {
        fetch(`${backConection}/api/infoempre`)
        .then((response) => response.json())
        .then((data) => setEmpresas(data))
        .catch((error) => console.error("Error al obtener empresas:", error));
    }, []);

    const handleEmpresaChange = (e) => {
        setEmpresaSeleccionada(e.target.value);
        setDomicilioSeleccionado(""); // Reiniciar domicilio al cambiar de empresa
    };

    const handleChangeDomi = (e) => {
        setFormDataDomi({ ...formDataDomi, [e.target.name]: e.target.value });
    };

    const handleSubmitDomi = async (e) => {
        e.preventDefault();

        const datosEnviar = {
            empresaId: empresaSeleccionada,
            domicilio: formDataDomi.domi,
            tipo_domi: formDataDomi.tipo_domi,
        };

        try {
        const response = await fetch(`${backConection}/api/registrosdomi`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(datosEnviar),
        });

        const result = await response.json();
        } catch (error) {
            console.error("Error al enviar los datos:", error);
        }
    };



      // Cargar domicilios cuando cambia la empresa seleccionada
    useEffect(() => {
        if (empresaSeleccionada) {
        fetch(`${backConection}/api/infodomi/${empresaSeleccionada}`)
            .then((res) => res.json())
            .then((data) => setDomicilios(data))
            .catch((error) =>
            console.error("Error al obtener domicilios:", error)
            );
        } else {
        setDomicilios([]);
        }
    }, [empresaSeleccionada]);

    const handleDomicilioChange = (e) => {
        setDomicilioSeleccionado(e.target.value);
    };

    // Manejar cambios en los inputs de usuario
    const handleChangeUsuario = (e) => {
        setFormDataUsuario({ ...formDataUsuario, [e.target.name]: e.target.value });
    };

    const handleSubmitUsuario = async (e) => {
        e.preventDefault();
        
        if (!empresaSeleccionada || !domicilioSeleccionado) {
            alert("Debe seleccionar una empresa y un domicilio.");
            return;
        }
    
        const datosEnviar = {
            empresaId: empresaSeleccionada,
            domicilioId: domicilioSeleccionado,
            ...formDataUsuario,
        };
    
        try {
        const response = await fetch(`${backConection}/api/registrousuario`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(datosEnviar),
        });
    
        const result = await response.json();
        } catch (error) {
            console.error("Error al registrar usuario:", error);
        }
    };

    return (
        <div className="main-container">
            <h1 className="text-3xl font-bold mb-4 text-center">Registros</h1>
                
            <div className="p-6"> {/*Carga de empresa */}
                {mensaje && (
                <div
                className={`fixed top-4 right-4 p-4 rounded-md shadow-md ${
                    mensaje.includes("correctamente")
                    ? "bg-green-500 text-white"
                    : "bg-red-500 text-white"
                }`}
                >
                {mensaje}
                </div>
                )}
                <h2 className="text-lg font-bold mb-4">Nueva Empresa</h2>
                <form className="grid grid-cols-5 gap-4">
                    <div className="flex flex-col items-center text-center">
                        <label className="mb-2">Nombre</label>
                        <input
                        type="text"
                        name="nombre"
                        value={formData.nombre}
                        onChange={handleChange}
                        className="w-full border rounded-md p-2 focus:outline-none focus:ring focus:ring-green-300"
                        />
                    </div>
                    <div className="flex flex-col items-center text-center">
                        <label className="mb-2">Razon social</label>
                        <input
                        type="text"
                        name="razonSocial"
                        value={formData.razonSocial}
                        onChange={handleChange}
                        className="w-full border rounded-md p-2 focus:outline-none focus:ring focus:ring-green-300"
                        />
                    </div>
                    <div className="flex flex-col items-center text-center">
                        <label className="mb-2">Numero IMMEX</label>
                        <input
                        type="text"
                        name="no_immex"
                        value={formData.no_immex}
                        onChange={handleChange}
                        className="w-full border rounded-md p-2 focus:outline-none focus:ring focus:ring-green-300"
                        />
                    </div>
                    <div className="flex flex-col items-center text-center">
                        <label className="mb-2">RFC</label>
                        <input
                        type="text"
                        name="rfc"
                        value={formData.rfc}
                        onChange={handleChange}
                        className="w-full border rounded-md p-2 focus:outline-none focus:ring focus:ring-green-300"
                        />
                    </div>
                    <div className="flex flex-col items-center text-center p-8">
                        <button
                        type="submit"
                        onClick={handleSubmit}
                        className="btn-agregar"
                        >
                        Agregar
                        </button>
                    </div>
                </form>
            </div>
            <div className="w-full h-screen p-0 m-0 flex flex-col">
                <h1 className="text-2xl font-bold mb-4 text-center">Domicilios</h1>
                <form className="flex flex-col flex-grow gap-4 px-4">
                    {/* Selección de empresa */}
                    <div className="flex flex-col items-center text-center w-full">
                    <label className="mb-2 text-lg">Selecciona una empresa</label>
                    <select
                        value={empresaSeleccionada}
                        onChange={handleEmpresaChange}
                        className="w-full border rounded-md p-3 focus:outline-none focus:ring focus:ring-green-300"
                    >
                        <option value="">-- Seleccionar Empresa --</option>
                        {empresas.map((empresa) => (
                        <option key={empresa.id_empresa} value={empresa.id_empresa}>
                            {empresa.nombre}
                        </option>
                        ))}
                    </select>
                    </div>

                    {/* Domicilio */}
                    <div className="flex flex-col flex-grow">
                    <label className="mb-2 text-lg text-center">Domicilio</label>
                    <textarea
                        name="domi"
                        value={formDataDomi.domi}
                        onChange={handleChangeDomi}
                        className="w-full flex-grow border rounded-md p-4 focus:outline-none focus:ring focus:ring-green-300 resize-none"
                        disabled={!empresaSeleccionada}
                    />
                    </div>

                    {/* Tipo de Domicilio */}
                    <div className="flex flex-col items-center text-center w-full">
                    <label className="mb-2 text-lg">Tipo de Domicilio</label>
                    <div className="flex gap-6">
                        <label className="flex items-center">
                        <input
                            type="radio"
                            name="tipo_domi"
                            value="1"
                            checked={formDataDomi.tipo_domi === "1"}
                            onChange={handleChangeDomi}
                            className="mr-2"
                        />
                        Fiscal
                        </label>
                        <label className="flex items-center">
                        <input
                            type="radio"
                            name="tipo_domi"
                            value="2"
                            checked={formDataDomi.tipo_domi === "2"}
                            onChange={handleChangeDomi}
                            className="mr-2"
                        />
                        Normal
                        </label>
                    </div>
                    </div>

                    {/* Botón de envío */}
                    <div className="flex justify-center p-4">
                    <button
                        type="submit"
                        onClick={handleSubmitDomi}
                        className="btn-agregar"
                        disabled={!empresaSeleccionada}
                    >
                        Agregar
                    </button>
                    </div>
                </form>
            </div>
            <div className="w-full h-screen p-0 m-0 flex flex-col">
                <h1 className="text-lg font-bold mb-4">Registro de Usuarios</h1>
                <form className="grid grid-cols-5 gap-4" onSubmit={handleSubmitUsuario}>
                    {/* Selección de empresa */}
                    <div className="flex flex-col items-center text-center col-span-5">
                    <label className="mb-2">Selecciona una empresa</label>
                    <select
                        value={empresaSeleccionada}
                        onChange={handleEmpresaChange}
                        className="w-full border rounded-md p-2"
                    >
                        <option value="">-- Seleccionar Empresa --</option>
                        {empresas.map((empresa) => (
                        <option key={empresa.id_empresa} value={empresa.id_empresa}>
                            {empresa.nombre}
                        </option>
                        ))}
                    </select>
                    </div>

                    {/* Selección de domicilio */}
                    <div className="flex flex-col items-center text-center col-span-5">
                    <label className="mb-2">Selecciona un domicilio</label>
                    <select
                        value={domicilioSeleccionado}
                        onChange={handleDomicilioChange}
                        className="w-full border rounded-md p-2"
                        disabled={!empresaSeleccionada}
                    >
                        <option value="">-- Seleccionar Domicilio --</option>
                        {domicilios.map((domicilio) => (
                        <option key={domicilio.id_domicilio} value={domicilio.id_domicilio}>
                            {domicilio.domicilio}
                        </option>
                        ))}
                    </select>
                    </div>

                    {/* Campos del usuario */}
                    <div className="flex flex-col items-center text-center">
                    <label className="mb-2">Nombre</label>
                    <input
                        type="text"
                        name="nombre"
                        value={formDataUsuario.nombre}
                        onChange={handleChangeUsuario}
                        className="w-full border rounded-md p-2"
                        disabled={!domicilioSeleccionado}
                    />
                    </div>

                    <div className="flex flex-col items-center text-center">
                    <label className="mb-2">Correo</label>
                    <input
                        type="email"
                        name="correo"
                        value={formDataUsuario.correo}
                        onChange={handleChangeUsuario}
                        className="w-full border rounded-md p-2"
                        disabled={!domicilioSeleccionado}
                    />
                    </div>

                    <div className="flex flex-col items-center text-center">
                    <label className="mb-2">Teléfono</label>
                    <input
                        type="text"
                        name="telefono"
                        value={formDataUsuario.telefono}
                        onChange={handleChangeUsuario}
                        className="w-full border rounded-md p-2"
                        disabled={!domicilioSeleccionado}
                    />
                    </div>

                    <div className="flex flex-col items-center text-center">
                    <label className="mb-2">Contraseña</label>
                    <input
                        type="password"
                        name="contraseña"
                        value={formDataUsuario.contraseña}
                        onChange={handleChangeUsuario}
                        className="w-full border rounded-md p-2"
                        disabled={!domicilioSeleccionado}
                    />
                    </div>

                    <div className="flex flex-col items-center text-center">
                    <label className="mb-2">Rol</label>
                    <select
                        name="rol"
                        value={formDataUsuario.rol}
                        onChange={handleChangeUsuario}
                        className="w-full border rounded-md p-2"
                        disabled={!domicilioSeleccionado}
                    >
                        <option value="1">Administrador CMB</option>
                        <option value="2">Administrador Empresa</option>
                        <option value="3">Usuario Empresa</option>
                        <option value="4">SAT</option>
                    </select>
                    </div>

                    {/* Botón de envío */}
                    <div className="flex justify-center p-4">
                    <button type="submit" className="btn-agregar" disabled={!domicilioSeleccionado}>
                        Agregar
                    </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
export default Registro;