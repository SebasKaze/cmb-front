import React, { useState } from "react";


function Seccion3({ formData, setFormData }) {
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            seccion3: {
                ...prev.seccion3,
                [name]: value,
            },
        }));
    };

    return (
        <div className="p-6">
            <h2 className="text-xl font-bold mb-4 text-center">Datos del proveedor o comprador</h2>
            <div className="grid grid-cols-3 gap-4">
                <div className="flex flex-col items-center text-center">
                    <label className="mb-2" for="">ID Fiscal</label>
                    <input className="w-full border border-gray-300 rounded p-2" type="text"                
                    name="idFiscalSec3"
                    value={formData.seccion3?.idFiscalSec3 || ""}
                    onChange={handleChange}
                    />
                </div>
                <div className="col-span-2 flex flex-col items-center text-center">
                    <label className="mb-2">Nombre, denominación o razón social del importador/exportador.</label>
                    <textarea
                    className="w-full border border-gray-300 rounded p-2 resize-none"
                    rows="2"
                    name="razonSocialImpoExpo" // Nombre para identificar este campo en el estado
                    onChange={handleChange} // Maneja los cambios en el valor
                    >
                    </textarea>
                </div>
                <div className="col-span-3 flex flex-col items-center text-center">
                    <label className="mb-2" for="">Domicilio</label>
                    <textarea
                    className="w-full border border-gray-300 rounded p-2 resize-none"
                    rows="4"
                    name="DomSec3" // Nombre para identificar este campo en el estado
                    onChange={handleChange} // Maneja los cambios en el valor
                    >
                    </textarea>
                </div>
                <div className="flex flex-col items-center text-center">
                    <label className="mb-2" for="">Vinculacion</label>
                    <select className="w-full border border-gray-300 rounded p-2 bg-white"
                    name="Vinculacion" 
                    onChange={handleChange} 
                    >
                        <option value="" disabled selected> </option>
                        <option value="si">SI</option>
                        <option value="no">NO</option>
                    </select>
                </div>
                <div className="flex flex-col items-center text-center">
                    <label className="mb-2" for="">Num. CDFI</label>
                    <input className="w-full border border-gray-300 rounded p-2" type="number"
                    name="numCDFI"
                    value={formData.seccion3?.numCDFI || ""}
                    onChange={handleChange}
                    />
                </div>
                <div className="flex flex-col items-center text-center">
                    <label className="mb-2" for="">Fecha</label>
                    <input className="w-full border border-gray-300 rounded p-2" type="date"
                    name="fechaSec3"
                    value={formData.seccion3?.fechaSec3 || ""}
                    onChange={handleChange}
                    />
                </div>
                <div className="flex flex-col items-center text-center">
                    <label className="mb-2" for="">INCOTERM</label>
                    <input className="w-full border border-gray-300 rounded p-2" type="text"
                    name="INCOTERM"
                    value={formData.seccion3?.INCOTERM || ""}
                    onChange={handleChange}
                    />
                </div>
                <div className="flex flex-col items-center text-center">
                    <label className="mb-2" for="">Moneda Fact.</label>
                    <input className="w-full border border-gray-300 rounded p-2" type="text"
                    name="moneadaFact"
                    value={formData.seccion3?.moneadaFact || ""}
                    onChange={handleChange}
                    />
                </div>
                <div className="flex flex-col items-center text-center">
                    <label className="mb-2" for="">Val. Mon. Fact.</label>
                    <input className="w-full border border-gray-300 rounded p-2" type="number"
                    name="valMonFact"
                    value={formData.seccion3?.valMonFact || ""}
                    onChange={handleChange}
                    />
                </div>
                <div className="flex flex-col items-center text-center">
                    <label className="mb-2" for="">Factor Mon. Fact.</label>
                    <input className="w-full border border-gray-300 rounded p-2" type="number"
                    name="factorMonFact"
                    value={formData.seccion3?.factorMonFact || ""}
                    onChange={handleChange}
                    />
                </div>
                <div className="flex flex-col items-center text-center">
                    <label className="mb-2" for="">Val. Dolares</label>
                    <input className="w-full border border-gray-300 rounded p-2" type="number"
                    name="valDolares"
                    value={formData.seccion3?.valDolares || ""}
                    onChange={handleChange}
                    />
                </div>
            </div>
        </div>
    )
};
export default Seccion3;