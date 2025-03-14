import { useState } from "react";

function Login({ onLogin }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const validateEmail = (email) => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        if (!validateEmail(email)) {
            setError("Por favor, ingresa un correo electrónico válido.");
            return;
        }

        setIsLoading(true);

        try {
            await onLogin({ email, password });
        } catch (err) {
            setError("Error al iniciar sesión. Por favor, verifica tus credenciales.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex items-center justify-center h-screen bg-gradient-to-br from-blue-100 to-orange-100">
            <form
                onSubmit={handleSubmit}
                className="p-8 bg-white rounded-2xl shadow-lg w-96 border border-gray-200"
            >
                <h1 className="text-3xl font-bold mb-6 text-center text-blue-600">Iniciar Sesión</h1>

                {error && (
                    <div className="mb-4 text-red-600 text-sm text-center bg-red-100 p-2 rounded-md">
                        {error}
                    </div>
                )}

                <div className="mb-4">
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                        Correo Electrónico
                    </label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400 focus:outline-none"
                        required
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                        Contraseña
                    </label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-400 focus:outline-none"
                        required
                    />
                </div>

                <button
                    type="submit"
                    className={`w-full py-2 px-4 rounded-lg text-white font-semibold transition-all duration-300 ease-in-out ${
                        isLoading ? "bg-gray-400" : "bg-blue-500 hover:bg-orange-500"
                    }`}
                    disabled={isLoading}
                >
                    {isLoading ? "Cargando..." : "Iniciar Sesión"}
                </button>
            </form>
        </div>
    );
}

export default Login;
