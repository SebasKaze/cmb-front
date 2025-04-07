function CargaMasiva() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-center p-4">
            <img 
                src="https://cdn-icons-png.flaticon.com/512/7486/7486690.png" 
                alt="Página en mantenimiento" 
                className="w-64 h-64 mb-6 animate-bounce" 
            />
            <h1 className="text-4xl font-bold text-gray-800 mb-2">¡Estamos en mantenimiento!</h1>
            <p className="text-gray-600 text-lg">
                Estamos trabajando para mejorar tu experiencia. Vuelve pronto.
            </p>
        </div>
    );
}

export default CargaMasiva;
