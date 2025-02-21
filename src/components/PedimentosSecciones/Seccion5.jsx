import React, { useState } from "react";

function Seccion5({ formData, setFormData }) {
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
                    <label className="mb-2">Identificacion</label>
                    <input className="w-full border border-gray-300 rounded p-2" type="text"
                    name="identifiSec5"
                    value={formData.seccion5?.identifiSec5 || ""}
                    onChange={handleChange}
                    />
                </div>
                <div className="flex flex-col items-center text-center">
                    <label className="mb-2">Pais</label>
                    <input className="w-full border border-gray-300 rounded p-2" type="text" maxlength="3"
                    name="paisSec5"
                    value={formData.seccion5?.paisSec5 || ""}
                    onChange={handleChange}
                    />
                </div>
                <div className="col-span-2 flex flex-col items-center text-center">
                    <label className="mb-2">Transportista</label>
                    <textarea
                    className="w-full border border-gray-300 rounded p-2 resize-none"
                    rows="4"
                    name="transSec5" // Nombre para identificar este campo en el estado
                    onChange={handleChange}
                    >
                    </textarea>
                </div>
                <div className="flex flex-col items-center text-center">
                    <label className="mb-2">RFC</label>
                    <input className="w-full border border-gray-300 rounded p-2" type="text"
                    name="rfcSec5"
                    value={formData.seccion5?.rfcSec5 || ""}
                    onChange={handleChange}
                    />
                </div>
                <div className="flex flex-col items-center text-center">
                    <label className="mb-2">CRUP</label>
                    <input className="w-full border border-gray-300 rounded p-2" type="text"
                    name="curpSec5"
                    value={formData.seccion5?.curpSec5 || ""}
                    onChange={handleChange}
                    />
                </div>
                <div className="col-span-2 flex flex-col items-center text-center">
                    <label className="mb-2">Domicilio/Ciudad/Estado</label>
                    <textarea
                    className="w-full border border-gray-300 rounded p-2 resize-none"
                    rows="4"
                    name="domSec5" // Nombre para identificar este campo en el estado
                    onChange={handleChange}
                    >
                    </textarea>
                </div>
            </div>
        </div>
    )
}
export default Seccion5;