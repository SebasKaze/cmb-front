export default function Footer() {
    return (
        <footer className="bg-indigo-300 text-indigo-800 p-6 mt-auto">
            <div className="container mx-auto max-w-7xl">
                <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                    {/* Nombre y año */}
                    <div className="text-center md:text-left">
                        <span className="font-semibold text-lg">SM Controller</span>
                        <p className="text-sm">© 2025 Todos los derechos reservados.</p>
                    </div>

                    {/* Enlaces opcionales */}
                    <div className="flex gap-4 text-sm">
                        <a href="/privacidad" className="hover:underline">
                            Política de privacidad
                        </a>
                        <a href="/contacto" className="hover:underline">
                            Contacto
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
