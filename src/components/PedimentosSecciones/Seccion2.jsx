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
                    <span className="block w-full border border-gray-300 rounded p-2"></span>
                </div>
                {/* Tipo de operación */}
                <div className="flex flex-col items-center text-center">
                    <label className="mb-2">Tipo de operación</label>
                    <span className="block w-full border border-gray-300 rounded p-2"></span>
                </div>
                {/* Clave de pedimento */}
                <div className="flex flex-col items-center text-center">
                    <label className="mb-2">Clave de pedimento</label>
                    <span className="block w-full border border-gray-300 rounded p-2"></span>
                </div>
                {/* RFC del importador/exportador */}
                <div className="flex flex-col items-center text-center">
                    <label className="mb-2">RFC del importador/exportador</label>
                    <input
                        type="text"
                        name="rfcImportador"
                        value={formData.seccion2?.rfcImportador || ""}
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded p-2"
                    />
                </div>
                {/* CURP del importador/exportador */}
                <div className="flex flex-col items-center text-center">
                    <label className="mb-2">CURP del importador/exportador</label>
                    <input
                        type="text"
                        name="curpImpo"
                        value={formData.seccion2?.curpImpo || ""}
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded p-2"
                    />
                </div>
            </div>
        </div>
    );
}

export default Seccion2;
