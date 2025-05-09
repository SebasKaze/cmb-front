export default function Footer() {
    return (
        <footer className="bg-neutral text-neutral-content p-10 mt-auto">
            <div className="container mx-auto max-w-7xl">
                <div className="flex flex-col md:flex-row justify-between gap-8">
                    {/* Sección de la empresa */}
                    <div className="flex flex-col items-start md:max-w-xs">
                        <div className="flex items-center gap-2 mb-4">
                            <svg
                                width="50"
                                height="50"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                                fillRule="evenodd"
                                clipRule="evenodd"
                                className="fill-current"
                            >
                                <path d="M22.672 15.226l-2.432.811..."></path>
                            </svg>
                            <span className="text-xl font-bold">ACME Industries</span>
                        </div>
                        <p className="text-sm opacity-80">
                            Providing reliable tech since 1992
                            <br />
                            © 2024 Todos los derechos reservados
                        </p>
                    </div>

                    {/* Sección de redes sociales */}
                    <div className="flex flex-col gap-2">
                        <h6 className="footer-title text-lg">Síguenos</h6>
                        <div className="grid grid-flow-col gap-4">
                            <a className="hover:opacity-80 transition-opacity">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" className="fill-current">
                                    <path d="M24 4.557c-.883.392-1.832.656-2.828.775..."></path>
                                </svg>
                            </a>
                            <a className="hover:opacity-80 transition-opacity">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" className="fill-current">
                                    <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0..."></path>
                                </svg>
                            </a>
                            <a className="hover:opacity-80 transition-opacity">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" className="fill-current">
                                    <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4..."></path>
                                </svg>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}