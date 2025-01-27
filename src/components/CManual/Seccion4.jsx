import React, { useState } from "react";

function Seccion4({ formData, setFormData }) {
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            seccion4: {
                ...prev.seccion4,
                [name]: value,
            },
        }));
    };

    return (
        <div className="p-6">
            <h2 className="text-xl font-bold mb-4 text-center">Datos destinatario</h2>
            <div className="grid grid-cols-3 gap-4">
                <div className="flex flex-col items-center text-center">
                    <label className="mb-2">ID Fiscal</label>
                    <input className="w-full border border-gray-300 rounded p-2" type="number" 
                    name="idFiscalSec4"
                    value={formData.seccion4?.idFiscalSec4 || ""}
                    onChange={handleChange}
                    />
                </div>
                <div className="col-span-2 flex flex-col items-center text-center">
                    <label className="mb-2">Nombre, denominación o razón social del importador/exportador.</label>
                    <textarea 
                    className="w-full border border-gray-300 rounded p-2 resize-none"
                    rows="2"
                    name="razonSocialImpoExpoSec4" // Nombre para identificar este campo en el estado
                    onChange={handleChange}
                    >
                    </textarea>
                </div>
                <div className="col-span-3 flex flex-col items-center text-center">
                    <label className="mb-2">Domicilio</label>
                    <textarea  
                    className="w-full border border-gray-300 rounded p-2 resize-none"
                    rows="4"
                    name="DomSec4" // Nombre para identificar este campo en el estado
                    onChange={handleChange} // Maneja los cambios en el valor
                    >
                    </textarea>
                </div>
            </div>
        </div>
    )
}
export default Seccion4;