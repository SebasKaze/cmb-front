import { useState, useEffect } from "react";

function Domicilios() {
    const userData = JSON.parse(localStorage.getItem("userData")); // Obtener datos de usuario desde localStorage
    const [domicilios, setDomicilios] = useState([]);

    useEffect(() => {
        if (!userData || !userData.id_usuario || !userData.id_empresa) {
            console.error("Faltan datos del usuario en localStorage");
            return;
        }

        fetch("http://localhost:4000/api/domicilios/verdomi", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                id_usuario: userData.id_usuario,
                id_empresa: userData.id_empresa,
            }),
        })
            .then((response) => response.json())
            .then((data) => {
                if (data.length > 0) {
                    setDomicilios(data); // Guardar todos los domicilios
                }
            })
            .catch((error) => console.error("Error al obtener los datos:", error));
    }, []);

    return (
        <div className="main-container">
            <h2 className="text-2xl font-bold mb-4">Domicilios</h2>

            {/* Tabla de Domicilios */}
            {domicilios.length > 0 && (
                <div>
                    <h3 className="text-lg font-semibold mb-2">Domicilios Registrados</h3>
                    <table className="table-auto border-collapse border border-gray-400 w-full">
                        <thead>
                            <tr className="bg-gray-200">
                                <th className="border px-4 py-2">Numero</th>
                                <th className="border px-4 py-2">Domicilio</th>
                            </tr>
                        </thead>
                        <tbody>
                            {domicilios.map((domicilio, index) => (
                                <tr key={index}>
                                    <td className="border px-4 py-2">{index + 1}</td>
                                    <td className="border px-4 py-2">{domicilio.domicilio}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}

export default Domicilios;
