import { useState, useEffect } from "react";

const token = localStorage.getItem("token");

function Registro() {   
    const backConection = import.meta.env.VITE_BACK_URL;
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
            };
    
            const response = await fetch(`${backConection}/api/registros`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                },
                body: JSON.stringify(dataToSend),
            });
    
            const result = await response.json();
    
            if (!response.ok) {
                alert(result.message || "Ocurrió un error al enviar los datos");
            } else {
                alert(result.message || "Datos enviados correctamente");

                setFormData({
                    nombre: "",
                    razonSocial: "",
                    no_immex: "",
                    rfc: "",
                });
            }
            // Limpiar mensaje después de 3 segundos
            setTimeout(() => setMensaje(""), 3000);
        } catch (error) {
            console.error("Error al enviar los datos:", error);
            setMensaje("Error de conexión con el servidor");
            setTimeout(() => setMensaje(""), 3000);
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
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                },
                body: JSON.stringify(datosEnviar),
            });
    
            const result = await response.json();
    
            if (response.ok) {
                alert(result.message || "Domicilio registrado correctamente.");
                // Opcional: limpia el formulario
                setFormDataDomi({ domi: "", tipo_domi: "" });
            } else {
                alert(result.message || "Error al registrar el domicilio.");
            }
        } catch (error) {
            console.error("Error al enviar los datos:", error);
            alert("Ocurrió un error en la conexión con el servidor.");
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
        const { name, value } = e.target;
        setFormDataUsuario((prevData) => ({
            ...prevData,
            [name]: value,
        }));
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
                headers: { "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`, },
                body: JSON.stringify(datosEnviar),
            });
    
            const result = await response.json();
    
            if (response.ok) {
                alert("Usuario registrado exitosamente");
                setFormDataUsuario({
                    nombre: "",
                    correo: "",
                    telefono: "",
                    contraseña: "",
                    rol: "",
                });
                setTimeout(() => setMensaje(""), 3000);
            } else {
                alert(result.error || "Error al registrar usuario");
                setTimeout(() => setMensaje(""), 3000);
            }
        } catch (error) {
            console.error("Error al registrar usuario:", error);
            alert("Error de conexión con el servidor");
            setTimeout(() => setMensaje(""), 3000);
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
                <form onSubmit={handleSubmit} className="grid grid-cols-5 gap-4">
                    <div className="flex flex-col items-center text-center">
                        <label className="mb-2">Nombre</label>
                        <input
                        type="text"
                        name="nombre"
                        value={formData.nombre}
                        onChange={handleChange}
                        required
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
                        required
                        className="w-full border rounded-md p-2 focus:outline-none focus:ring focus:ring-green-300"
                        />
                    </div>
                    <div className="flex flex-col items-center text-center">
                        <label className="mb-2">Numero IMMEX</label>
                        <input
                        type="text"
                        name="no_immex"
                        value={formData.no_immex}
                        pattern="^\d{4}\d{4,5}$"
                        required
                        onChange={handleChange}
                        className="w-full border rounded-md p-2 focus:outline-none focus:ring focus:ring-green-300"
                        />
                    </div>
                    <div className="flex flex-col items-center text-center">
                        <label className="mb-2">RFC</label>
                        <input
                        type="text"
                        name="rfc"
                        pattern="^[A-ZÑ&]{3,4}\d{6}[A-Z0-9]{3}$"
                        required
                        placeholder="Ej: ABCD000000ABC"
                        minLength={12}
                        maxLength={13}
                        value={formData.rfc}
                        onChange={handleChange}
                        className="w-full border rounded-md p-2 focus:outline-none focus:ring focus:ring-green-300"
                        />
                    </div>
                    <div className="flex flex-col items-center text-center p-8">
                        <button
                        type="submit"
                        className="btn-agregar"
                        >
                        Agregar
                        </button>
                    </div>
                </form>
            </div>
            <div className="w-full h-screen p-0 m-0 flex flex-col">
                <h1 className="text-2xl font-bold mb-4 text-center">Domicilios</h1>
                <form onSubmit={handleSubmitDomi} className="flex flex-col flex-grow gap-4 px-4">
                    {/* Selección de empresa */}
                    <div className="flex flex-col items-center text-center w-full">
                    <label className="mb-2 text-lg">Selecciona una empresa</label>
                    <select
                        value={empresaSeleccionada}
                        onChange={handleEmpresaChange}
                        required
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
                        required
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
                        required
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
                        required
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
                    <label className="mb-2">Nombre completo</label>
                    <input
                        type="text"
                        name="nombre"
                        required
                        value={formDataUsuario.nombre}
                        onChange={handleChangeUsuario}
                        className="w-full border rounded-md p-2"
                        disabled={!domicilioSeleccionado}
                    />
                    </div>

                    <div className="flex flex-col items-center text-center">
                    <label className="mb-2">Correo</label>
                    <input
                        required
                        pattern="^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$"
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
                        required
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
                        required
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
                        required
                    >
                        <option disabled value="">Seleccione un rol</option>
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