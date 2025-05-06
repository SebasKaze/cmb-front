import { useState, useEffect } from "react";


function DatosGe() {
    const backConection = import.meta.env.back_url;
    const userData = JSON.parse(localStorage.getItem("userData")); // Obtener datos de usuario desde localStorage
    const [userInfo, setUserInfo] = useState(null);
    const [empresaInfo, setEmpresaInfo] = useState(null);

    useEffect(() => {
        if (!userData || !userData.id_usuario || !userData.id_empresa) {
            console.error("Faltan datos del usuario en localStorage");
            return;
        }

        fetch(`${backConection}/api/datosGenerales`, {
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
                    const usuario = {
                        nombre: data[0].nombre,
                        correo: data[0].corrreo,
                        telefono: data[0].telefono,
                    };
                    const empresa = {
                        rfc: data[0].rfc_empresa,
                        razon_social: data[0].razon_social,
                        no_immex: data[0].no_immex,
                    };

                    setUserInfo(usuario);
                    setEmpresaInfo(empresa);
                }
            })
            .catch((error) => console.error("Error al obtener los datos:", error));
    }, []);

    return (
        <div className="main-container">
            <h2 className="text-2xl font-bold mb-4">Datos Generales</h2>

            {/* Tabla de Usuario */}
            {userInfo && (
                <div className="mb-6">
                    <h3 className="text-lg font-semibold mb-2">Información del Usuario</h3>
                    <table className="table-auto border-collapse border border-gray-400 w-full">
                        <thead>
                            <tr className="bg-gray-200">
                                <th className="border px-4 py-2">Nombre</th>
                                <th className="border px-4 py-2">Correo</th>
                                <th className="border px-4 py-2">Teléfono</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td className="border px-4 py-2">{userInfo.nombre}</td>
                                <td className="border px-4 py-2">{userInfo.correo}</td>
                                <td className="border px-4 py-2">{userInfo.telefono}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            )}

            {/* Tabla de Empresa */}
            {empresaInfo && (
                <div>
                    <h3 className="text-lg font-semibold mb-2">Información de la Empresa</h3>
                    <table className="table-auto border-collapse border border-gray-400 w-full">
                        <thead>
                            <tr className="bg-gray-200">
                                <th className="border px-4 py-2">RFC</th>
                                <th className="border px-4 py-2">Razón Social</th>
                                <th className="border px-4 py-2">No. IMMEX</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td className="border px-4 py-2">{empresaInfo.rfc}</td>
                                <td className="border px-4 py-2">{empresaInfo.razon_social}</td>
                                <td className="border px-4 py-2">{empresaInfo.no_immex}</td>
                                
                            </tr>
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}
export default DatosGe;