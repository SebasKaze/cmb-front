import { useState, useEffect } from "react";
import axios from "axios";

function CargarDocumentos() {
    const backConection = import.meta.env.back_url;
    const userData = JSON.parse(localStorage.getItem("userData")) || {};
    const { id_empresa, id_domicilio } = userData;

    const [pedimentos, setPedimentos] = useState([]);
    const [selectedPedimento, setSelectedPedimento] = useState("");
    const [documentos, setDocumentos] = useState([]);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    useEffect(() => {
        if (id_empresa && id_domicilio) {
            axios.get(`${backConection}/api/pedimento/verpedi?id_empresa=${id_empresa}&id_domicilio=${id_domicilio}`)
                .then((response) => {
                    setPedimentos(response.data);
                })
                .catch((error) => console.error("Error al obtener los datos:", error));
        }
    }, [id_empresa, id_domicilio]);

    const handleFileUpload = (event) => {
        const files = Array.from(event.target.files);
        
        // Verificar si se excede el límite de 3 archivos
        if (files.length > 3) {
            setErrorMessage("Solo puedes subir un máximo de 3 archivos");
            return;
        }
        
        // Verificar si al agregar estos archivos superaríamos el límite
        if (documentos.length + files.length > 3) {
            setErrorMessage(`Ya tienes ${documentos.length} archivo(s) seleccionado(s). Puedes agregar máximo ${3 - documentos.length} más.`);
            return;
        }
        
        setErrorMessage(""); // Limpiar mensaje de error si todo está bien
        setDocumentos(prevDocs => [...prevDocs, ...files]);
    };

    const removeFile = (indexToRemove) => {
        setDocumentos(prevDocs => prevDocs.filter((_, index) => index !== indexToRemove));
    };

    const handleSubmit = async () => {
        if (!selectedPedimento) {
            alert("Seleccione un pedimento primero");
            return;
        }
        
        if (documentos.length === 0) {
            alert("Seleccione al menos un documento");
            return;
        }

        setIsSubmitting(true);
        
        try {
            const formData = new FormData();
            formData.append("pedimento", selectedPedimento);
            formData.append("domicilio", id_domicilio);
            formData.append("id_empresa", id_empresa);
            
            // Agregar cada archivo al FormData
            documentos.forEach((file) => {
                formData.append("documentos", file);
            });

            const response = await axios.post(
                `${backConection}/api/pedimentos/subirarc/subir`, 
                formData, 
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            );

            alert(response.data.message || "Documentos enviados correctamente");
            setDocumentos([]); // Limpiar los archivos después del envío exitoso
        } catch (error) {
            console.error("Error al enviar documentos:", error);
            alert(error.response?.data?.error || "Error al enviar documentos");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="max-w-3xl mx-auto p-20 bg-white shadow-md rounded-lg ">
            <h1 className="text-2xl font-bold text-gray-800 mb-4">Carga de documentos</h1>
            
            {/* Select de Pedimentos */}
            <div className="mb-4">
                <h2 className="text-lg font-semibold text-gray-700">Seleccione un pedimento</h2>
                <select
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={selectedPedimento}
                    onChange={(e) => setSelectedPedimento(e.target.value)}
                >
                    <option value="">Seleccione...</option>
                    {pedimentos.map((ped, index) => (
                        <option key={index} value={ped.no_pedimento}>
                            {ped.no_pedimento}
                        </option>
                    ))}
                </select>
            </div>

            {/* Subir documentos */}
            <div className="mb-4">
                <h2 className="text-lg font-semibold text-gray-700">Subir documentos (Máximo 3)</h2>
                <input 
                    type="file" 
                    multiple 
                    className="w-full p-2 border border-gray-300 rounded-md cursor-pointer" 
                    onChange={handleFileUpload} 
                    accept=".pdf,.jpg,.jpeg,.png"
                    disabled={documentos.length >= 3}
                />
                <p className="text-sm text-gray-500 mt-1">
                    Formatos aceptados: PDF, JPG, JPEG, PNG (Máx. 10MB por archivo)
                </p>
                {errorMessage && (
                    <p className="text-red-500 text-sm mt-1">{errorMessage}</p>
                )}
            </div>

            {/* Lista de documentos */}
            {documentos.length > 0 && (
                <div className="mb-4">
                    <h2 className="text-lg font-semibold text-gray-700">
                        Documentos a subir ({documentos.length}/3)
                    </h2>
                    <ul className="list-disc pl-5">
                        {documentos.map((doc, index) => (
                            <li key={index} className="text-gray-600 flex items-center justify-between">
                                <span>
                                    {doc.name} - {(doc.size / 1024 / 1024).toFixed(2)} MB
                                </span>
                                <button 
                                    onClick={() => removeFile(index)}
                                    className="text-red-500 hover:text-red-700 ml-2"
                                >
                                    ×
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
            )}

            {/* Botón de envío */}
            <button 
                className={`btn-crud ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
                onClick={handleSubmit}
                disabled={isSubmitting}
            >
                {isSubmitting ? 'Enviando...' : 'Enviar documentos'}
            </button>
        </div>
    );
}

export default CargarDocumentos;