import React, { useState , useEffect} from "react";

function Section5({ formData, setFormData }) {
    
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            seccion5: {
                ...prev.seccion5,
                [name]: value,
            },
        }));
    };

    return (
        <div className="p-6">
            <h2 className="text-xl font-bold mb-4 text-center">Datos del transporte y transportista</h2>
            <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col items-center text-center">
                    <label className="mb-2">Identificación</label>
                    <input disabled 
                        className="w-full border border-gray-300 rounded p-2" 
                        type="text" 
                        name="identificacion" 
                        value={formData.seccion5?.identificacion || ''}
                        onChange={handleChange} 
                    />
                    
                </div>
                <div className="flex flex-col items-center text-center">
                    <label className="mb-2">País</label>
                    <input disabled 
                        className="w-full border border-gray-300 rounded p-2" 
                        type="text" 
                        maxLength="3" 
                        name="pais" 
                        value={formData?.seccion5.pais || ""} // Valor predeterminado
                        onChange={handleChange} 
                    />
                </div>
                <div className="col-span-2 flex flex-col items-center text-center">
                    <label className="mb-2">Transportista</label>
                    <textarea disabled
                        className="w-full border border-gray-300 rounded p-2 resize-none"
                        rows="4"
                        name="transportista"
                        value={formData?.seccion5.transportista || ""} // Valor predeterminado
                        onChange={handleChange}
                    />
                </div>
                <div className="flex flex-col items-center text-center">
                    <label className="mb-2">RFC</label>
                    <input disabled 
                        className="w-full border border-gray-300 rounded p-2" 
                        type="text" 
                        name="rfc_transportista" 
                        value={formData?.seccion5.rfc_transportista} // Valor predeterminado
                        onChange={handleChange}
                    />
                </div>
                <div className="flex flex-col items-center text-center">
                    <label className="mb-2">CRUP</label>
                    <input disabled 
                        className="w-full border border-gray-300 rounded p-2" 
                        type="text" 
                        name="curp_transportista" 
                        value={formData?.seccion5.curp_transportista || " "} // Valor predeterminado
                        onChange={handleChange}
                    />
                </div>
                <div className="col-span-2 flex flex-col items-center text-center">
                    <label className="mb-2">Domicilio/Ciudad/Estado</label>
                    <textarea disabled
                        className="w-full border border-gray-300 rounded p-2 resize-none"
                        rows="4"
                        name="domicilio_transportista"
                        value={formData?.seccion5.domicilio_transportista || ""} // Valor predeterminado
                        onChange={handleChange}
                    />
                </div>
            </div>
        </div>
    );
}

export default Section5;