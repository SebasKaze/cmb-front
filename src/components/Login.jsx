import { useState } from "react";

function Login({ onLogin }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    
    // Estado para el formulario de contacto
    const [contactForm, setContactForm] = useState({
        name: "",
        company: "",
        email: "",
        phone: "",
        message: ""
    });
    const [contactSuccess, setContactSuccess] = useState(false);

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

    const handleContactChange = (e) => {
        const { name, value } = e.target;
        setContactForm(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleContactSubmit = (e) => {
        e.preventDefault();
        // Aquí iría la lógica para enviar el formulario de contacto
        console.log("Formulario de contacto enviado:", contactForm);
        setContactSuccess(true);
        setTimeout(() => setContactSuccess(false), 3000);
        setContactForm({
            name: "",
            company: "",
            email: "",
            phone: "",
            message: ""
        });
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-indigo-50 to-blue-50">
            <div className="flex flex-col md:flex-row w-full max-w-6xl mx-4 rounded-3xl overflow-hidden shadow-2xl bg-white">
                {/* Sección de Login */}
                <div className="w-full md:w-1/2 p-10 bg-gradient-to-br from-orange-700 to-amber-600 text-white">
                    <form onSubmit={handleSubmit} className="h-full flex flex-col justify-center">
                        <h1 className="text-4xl font-bold mb-8 text-center">
                            Iniciar Sesión
                        </h1>

                        {error && (
                            <div className="mb-6 text-red-100 text-sm text-center bg-red-900/20 p-3 rounded-lg border border-red-300/50">
                                {error}
                            </div>
                        )}

                        <div className="mb-6">
                            <label htmlFor="email" className="block text-sm font-medium text-indigo-100 mb-2">
                                Correo Electrónico
                            </label>
                            <input
                                type="email"
                                id="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="mt-1 block w-full p-3 bg-indigo-400/10 border border-indigo-300/50 rounded-xl focus:ring-2 focus:ring-white focus:outline-none transition-all duration-300 placeholder-indigo-200/70 text-white"
                                required
                                placeholder="tu@email.com"
                            />
                        </div>

                        <div className="mb-8">
                            <label htmlFor="password" className="block text-sm font-medium text-indigo-100 mb-2">
                                Contraseña
                            </label>
                            <input
                                type="password"
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="mt-1 block w-full p-3 bg-indigo-400/10 border border-indigo-300/50 rounded-xl focus:ring-2 focus:ring-white focus:outline-none transition-all duration-300 placeholder-indigo-200/70 text-white"
                                required
                                placeholder="••••••••"
                            />
                        </div>

                        <button
                            type="submit"
                            className={`w-full py-3 px-4 rounded-xl font-semibold transition-all duration-300 ease-in-out ${
                                isLoading 
                                    ? "bg-gray-400" 
                                    : "bg-white text-amber-800 hover:bg-indigo-50 hover:shadow-lg"
                            }`}
                            disabled={isLoading}
                        >
                            {isLoading ? "Cargando..." : "Iniciar Sesión"}
                        </button>
                    </form>
                </div>

                {/* Sección de Contacto */}
                <div className="w-full md:w-1/2 p-10 bg-white">
                    <div className="h-full flex flex-col justify-center">
                        <h2 className="text-4xl font-bold mb-6 text-center text-transparent bg-clip-text bg-gradient-to-r from-orange-700 to-amber-600">
                            Contáctanos
                        </h2>
                        <p className="text-gray-600 mb-8 text-center">
                            ¿Quieres una cuenta?. Contacta con nosotros
                        </p>

                        {contactSuccess && (
                            <div className="mb-6 text-green-600 text-sm text-center bg-green-50 p-3 rounded-lg border border-green-100">
                                ¡Gracias por contactarnos! Nos pondremos en contacto pronto.
                            </div>
                        )}

                        <form onSubmit={handleContactSubmit} className="space-y-4">
                            <div>
                                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                                    Nombre Completo
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={contactForm.name}
                                    onChange={handleContactChange}
                                    className="mt-1 block w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-400 focus:outline-none transition-all duration-300"
                                    required
                                />
                            </div>

                            <div>
                                <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-1">
                                    Empresa
                                </label>
                                <input
                                    type="text"
                                    id="company"
                                    name="company"
                                    value={contactForm.company}
                                    onChange={handleContactChange}
                                    className="mt-1 block w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-400 focus:outline-none transition-all duration-300"
                                />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label htmlFor="contact-email" className="block text-sm font-medium text-gray-700 mb-1">
                                        Correo Electrónico
                                    </label>
                                    <input
                                        type="email"
                                        id="contact-email"
                                        name="email"
                                        value={contactForm.email}
                                        onChange={handleContactChange}
                                        className="mt-1 block w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-400 focus:outline-none transition-all duration-300"
                                        required
                                    />
                                </div>

                                <div>
                                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                                        Teléfono
                                    </label>
                                    <input
                                        type="tel"
                                        id="phone"
                                        name="phone"
                                        value={contactForm.phone}
                                        onChange={handleContactChange}
                                        className="mt-1 block w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-400 focus:outline-none transition-all duration-300"
                                    />
                                </div>
                            </div>

                            <div>
                                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                                    Mensaje
                                </label>
                                <textarea
                                    id="message"
                                    name="message"
                                    rows="3"
                                    value={contactForm.message}
                                    onChange={handleContactChange}
                                    className="mt-1 block w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-400 focus:outline-none transition-all duration-300"
                                    required
                                ></textarea>
                            </div>

                            <button
                                type="submit"
                                className="w-full py-3 px-4 bg-gradient-to-r from-amber-500 to-orange-500 rounded-xl text-white font-semibold transition-all duration-300 hover:from-amber-600 hover:to-orange-600 hover:shadow-lg mt-4"
                            >
                                Enviar Solicitud
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;