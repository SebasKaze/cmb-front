import React, { useState } from "react";

function Seccion2({ formData, setFormData }) {
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            seccion2: {
                ...prev.seccion2,
                [name]: value,
            },
        }));
    };

    return (
        <div className="p-6">
            <h2 className="text-xl font-bold mb-4 text-center">
                Encabezado para páginas secundarias del pedimento
            </h2>
            <div className="grid grid-cols-3 gap-4">
                {/* Número de pedimento */}
                <div className="flex flex-col items-center text-center">
                    <label className="mb-2">Número de pedimento</label>
                    <span className="block w-full border border-gray-300 rounded p-2">
                    {formData.seccion1?.no_pedimento || "Sin número"}
                    </span>
                </div>
                {/* Tipo de operación */}
                <div className="flex flex-col items-center text-center">
                    <label className="mb-2">Tipo de operación</label>
                    <span className="block w-full border border-gray-300 rounded p-2">
                    {formData.seccion1?.tipo_oper || "Sin número"}
                    </span>
                </div>
                {/* Clave de pedimento */}
                <div className="flex flex-col items-center text-center">
                    <label className="mb-2">Clave de pedimento</label>
                    <span className="block w-full border border-gray-300 rounded p-2">
                    {formData.seccion1?.clave_ped || "Sin número"}    
                    </span>
                </div>
                <div className="flex flex-col items-center text-center">
                    <label className="mb-2">RFC del importador/exportador</label>
                    <input
                        type="text"
                        name="rfc_import_export"
                        value={formData.seccion2?.rfc_import_export || ""}
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded p-2"
                    />
                </div>
                <div className="flex flex-col items-center text-center">
                    <label className="mb-2">CURP del importador/exportador</label>
                    <input
                        type="text"
                        name="curp_import_export"
                        value={formData.seccion2?.curp_import_export || ""}
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded p-2"
                    />
                </div>
            </div>
        </div>
    );
}

export default Seccion2;
