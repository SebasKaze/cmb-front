import React, { useState , useEffect } from "react";

function Section3({ formData, setFormData }) {

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
                    <label className="mb-2">ID Fiscal</label>
                    <input className="w-full border border-gray-300 rounded p-2" type="text"
                    name="id_fiscal"
                    value={formData.seccion3?.id_fiscal || ""}  // Usamos value, no defaultValue
                    onChange={handleChange}
                    />
                </div>
                <div className="col-span-2 flex flex-col items-center text-center">
                    <label className="mb-2">Nombre, denominación o razón social del importador/exportador.</label>
                    <textarea
                    className="w-full border border-gray-300 rounded p-2 resize-none"
                    rows="2"
                    name="nom_razon_social" 
                    value={formData.seccion3?.nom_razon_social || ""}  // Usamos value, no defaultValue
                    onChange={handleChange}
                    />
                </div>
                <div className="col-span-3 flex flex-col items-center text-center">
                    <label className="mb-2">Domicilio</label>
                    <textarea
                    className="w-full border border-gray-300 rounded p-2 resize-none"
                    rows="4"
                    name="domicilio"
                    value={formData.seccion3?.domicilio || ""}  // Usamos value, no defaultValue
                    onChange={handleChange}
                    />
                </div>
                <div className="flex flex-col items-center text-center">
                    <label className="mb-2">Vinculación</label>
                    <select
                    className="w-full border border-gray-300 rounded p-2 bg-white"
                    name="vinculacion"
                    value={formData.seccion3?.vinculacion || ""}  // Asegura que tome el valor del estado
                    onChange={handleChange}
                    >
                        <option value="" disabled>Seleccione una opción</option>
                        <option value="si">SI</option>
                        <option value="no">NO</option>
                    </select>
                </div>
                <div className="flex flex-col items-center text-center">
                    <label className="mb-2">Num. CDFI</label>
                    <input className="w-full border border-gray-300 rounded p-2" type="text"
                    name="no_cfdi"
                    value={formData.seccion3?.no_cfdi || ""}
                    onChange={handleChange}
                    />
                </div>
                <div className="flex flex-col items-center text-center">
                    <label className="mb-2">Fecha</label>
                    <input className="w-full border border-gray-300 rounded p-2" type="date"
                    name="fecha_factu"
                    value={formData.seccion3?.fecha_factu ? formData.seccion3.fecha_factu.split('T')[0] : ""}
                    onChange={handleChange}
                    />
                </div>
                <div className="flex flex-col items-center text-center">
                    <label className="mb-2">INCOTERM</label>
                    <input className="w-full border border-gray-300 rounded p-2" type="text"
                    name="incoterm"
                    value={formData.seccion3?.incoterm || ""}
                    onChange={handleChange}
                    />
                </div>
                <div className="flex flex-col items-center text-center">
                    <label className="mb-2">Moneda Fact.</label>
                    <input className="w-full border border-gray-300 rounded p-2" type="text"
                    name="moneda_fact"
                    value={formData.seccion3?.moneda_fact || ""}
                    onChange={handleChange}
                    />
                </div>
                <div className="flex flex-col items-center text-center">
                    <label className="mb-2">Val. Mon. Fact.</label>
                    <input className="w-full border border-gray-300 rounded p-2" type="number"
                    name="val_mon_fact"
                    value={formData.seccion3?.val_mon_fact || ""}
                    onChange={handleChange}
                    />
                </div>
                <div className="flex flex-col items-center text-center">
                    <label className="mb-2">Factor Mon. Fact.</label>
                    <input className="w-full border border-gray-300 rounded p-2" type="number"
                    name="factor_mon_fact"
                    value={formData.seccion3?.factor_mon_fact || ""}
                    onChange={handleChange}
                    />
                </div>
                <div className="flex flex-col items-center text-center">
                    <label className="mb-2">Val. Dolares</label>
                    <input className="w-full border border-gray-300 rounded p-2" type="number"
                    name="val_dolares"
                    value={formData.seccion3?.val_dolares || ""}
                    onChange={handleChange}
                    />
                </div>
            </div>
        </div>
    );
}

export default Section3;