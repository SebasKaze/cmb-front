import React, { useState } from "react";

function Seccion6({ formData, setFormData }) {
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            seccion6: {
                ...prev.seccion6,
                [name]: value,
            },
        }));
    };
    return (
        <div className="p-6">
            <h2 className="text-xl font-bold mb-4 text-center">Candados</h2>
            <div className="grid grid-cols-1 gap-4">
                <div className="flex flex-col items-center text-center">
                    <label className="mb-2">Numero de candado</label>
                    <input className="w-full border border-gray-300 rounded p-2" type="text"
                    name="numero_candado"
                    value={formData.seccion6?.numero_candado || ""}
                    onChange={handleChange}
                    />
                </div>
                <div className="col-span-1 flex flex-col items-center text-center">
                    <label className="mb-2">1er Revision</label>
                    <textarea
                    className="w-full border border-gray-300 rounded p-2 resize-none"
                    rows="4"
                    name="revision1"
                    value={formData.seccion6?.revision1 || ""}
                    onChange={handleChange}
                    >                        
                    </textarea>
                </div>
                <div className="col-span-1 flex flex-col items-center text-center">
                    <label className="mb-2">2da Revision</label>
                    <textarea
                    className="w-full border border-gray-300 rounded p-2 resize-none"
                    rows="4"
                    name="revision2"
                    value={formData.seccion6?.revision2 || ""}
                    onChange={handleChange}
                    >
                        
                    </textarea>
                </div>
            </div>
        </div>
    )
}
export default Seccion6;