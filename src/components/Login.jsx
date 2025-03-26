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
        <div className="flex items-center justify-center h-screen bg-gradient-to-br from-purple-50 to-pink-50">
            <form
                onSubmit={handleSubmit}
                className="p-8 bg-white rounded-3xl shadow-2xl w-96 border border-gray-100 transform transition-all duration-300 hover:scale-105"
            >
                <h1 className="text-4xl font-bold mb-8 text-center text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
                    Iniciar Sesión
                </h1>

                {error && (
                    <div className="mb-6 text-red-600 text-sm text-center bg-red-50 p-3 rounded-lg border border-red-100">
                        {error}
                    </div>
                )}

                <div className="mb-6">
                    <label htmlFor="email" className="block text-sm font-medium text-gray-600 mb-2">
                        Correo Electrónico
                    </label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="mt-1 block w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-400 focus:outline-none transition-all duration-300"
                        required
                    />
                </div>

                <div className="mb-6">
                    <label htmlFor="password" className="block text-sm font-medium text-gray-600 mb-2">
                        Contraseña
                    </label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="mt-1 block w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-pink-400 focus:outline-none transition-all duration-300"
                        required
                    />
                </div>

                <button
                    type="submit"
                    className={`w-full py-3 px-4 rounded-xl text-white font-semibold transition-all duration-300 ease-in-out ${
                        isLoading ? "bg-gray-400" : "bg-gradient-to-r from-purple-400 to-pink-600 hover:from-purple-500 hover:to-pink-700"
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