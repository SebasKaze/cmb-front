import { useState, useEffect } from "react";
import axios from "axios";

function CargarDocumentos() {
    const userData = JSON.parse(localStorage.getItem("userData")) || {};
    const { id_empresa, id_domicilio } = userData;

    const [pedimentos, setPedimentos] = useState([]);
    const [selectedPedimento, setSelectedPedimento] = useState("");
    const [documentos, setDocumentos] = useState([]);

    useEffect(() => {
        if (id_empresa && id_domicilio) {
            axios.get(`http://localhost:4000/api/pedimento/verpedi?id_empresa=${id_empresa}&id_domicilio=${id_domicilio}`)
                .then((response) => {
                    setPedimentos(response.data);
                })
                .catch((error) => console.error("Error al obtener los datos:", error));
        }
    }, [id_empresa, id_domicilio]);

    const handleFileUpload = (event) => {
        const files = event.target.files;
        const fileList = [];
        
        for (let i = 0; i < files.length; i++) {
            const file = files[i];
            const reader = new FileReader();
            
            reader.onload = (e) => {
                fileList.push({ nombre: file.name, contenido: e.target.result });
                if (fileList.length === files.length) {
                    setDocumentos(fileList);
                }
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async () => {
        if (!selectedPedimento) {
            alert("Seleccione un pedimento primero");
            return;
        }
    
        const formData = new FormData();
        formData.append("pedimento", selectedPedimento);
        formData.append("id_domicilio", id_domicilio);
        formData.append("id_empresa", id_empresa);
    
        documentos.forEach((doc, index) => {
            formData.append("documentos", doc.file);
        });
    
        try {
            await axios.post("http://localhost:4000/api/pedimentos/subirarc", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            alert("Documentos enviados correctamente");
        } catch (error) {
            console.error("Error al enviar documentos:", error);
            alert("Error al enviar documentos");
        }
    };
    

    return (
        <div className="main-container">
            <h1 className="text-2xl font-bold text-gray-800 mb-4">Carga de documentos</h1>
            
            {/* Select de Pedimentos */}
            <div className="mb-4">
                <h2 className="text-lg font-semibold text-gray-700">Seleccione un pedimento</h2>
                <select
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={selectedPedimento}
                    onChange={(e) => {
                        setSelectedPedimento(e.target.value);
                    }}
                >
                    <option value="">Seleccione...</option>
                    {pedimentos.length > 0 &&
                        pedimentos.map((ped, index) => (
                            <option key={index} value={ped.no_pedimento}>
                                {ped.no_pedimento}
                            </option>
                        ))}
                </select>
            </div>

            {/* Subir documentos */}
            <div className="mb-4">
                <h2 className="text-lg font-semibold text-gray-700">Subir documentos</h2>
                <input 
                    type="file" 
                    multiple 
                    className="w-full p-2 border border-gray-300 rounded-md cursor-pointer" 
                    onChange={handleFileUpload} 
                />
            </div>

            {/* Lista de documentos */}
            <div className="mb-4">
                <h2 className="text-lg font-semibold text-gray-700">Documentos a subir</h2>
                <ul className="list-disc pl-5">
                    {documentos.map((doc, index) => (
                        <li key={index} className="text-gray-600">{doc.nombre}</li>
                    ))}
                </ul>
            </div>

            {/* Botón de envío */}
            <button 
                className="btn-crud"
                onClick={handleSubmit}
            >
                Enviar documentos
            </button>
        </div>
    );
}

export default CargarDocumentos;
