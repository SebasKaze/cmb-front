import { useState } from "react";

function Login({ onLogin }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const validateEmail = (email) => {
        const regex = /^[^\s@]+@[^\s@]+$/;
        return regex.test(email);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(""); // Limpiar errores anteriores
    
        if (!validateEmail(email)) {
            setError("Por favor, ingresa un correo electrónico válido.");
            return;
        }
    
        setIsLoading(true); // Mostrar estado de carga
    
        try {
            // Asegúrate de que el cuerpo contiene email y contraseña correctamente
            console.log("Enviando datos de login: ", { email, password }); // Verifica que los datos son correctos
            await onLogin({ email, password });
        } catch (err) {
            setError("Error al iniciar sesión. Por favor, verifica tus credenciales.");
        } finally {
            setIsLoading(false); // Ocultar estado de carga
        }
    };
    

    return (
        <div className="flex items-center justify-center h-screen bg-gray-100">
            <form
                onSubmit={handleSubmit}
                className="p-8 bg-white rounded shadow-md w-96"
            >
                <h1 className="text-2xl font-bold mb-6 text-center">Iniciar Sesión</h1>

                {error && (
                    <div className="mb-4 text-red-600 text-sm text-center">{error}</div>
                )}

                <div className="mb-4">
                    <label
                        htmlFor="email"
                        className="block text-sm font-medium text-gray-700"
                    >
                        Correo Electrónico
                    </label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                        required
                    />
                </div>

                <div className="mb-4">
                    <label
                        htmlFor="password"
                        className="block text-sm font-medium text-gray-700"
                    >
                        Contraseña
                    </label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                        required
                    />
                </div>

                <button
                    type="submit"
                    className={`w-full py-2 px-4 rounded ${isLoading ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700"} text-white`}
                    disabled={isLoading}
                >
                    {isLoading ? "Cargando..." : "Iniciar Sesión"}
                </button>
            </form>
        </div>
    );
}

export default Login;
