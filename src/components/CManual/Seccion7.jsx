import React, { useState } from "react";

function Seccion7() {

    const [sections, setSections] = useState([]);

    const handleAddSection = () => {
        setSections([...sections, { id: Date.now(), contributions: [] }]);
    };

    const handleRemoveSection = (id) => {
        setSections(sections.filter((section) => section.id !== id));
    };

    const handleAddContribution = (sectionId) => {
        setSections(
            sections.map((section) =>
                section.id === sectionId
                    ? { ...section, contributions: [...section.contributions, { id: Date.now() }] }
                    : section
            )
        );
    };

    const handleRemoveContribution = (sectionId, contributionId) => {
        setSections(
            sections.map((section) =>
                section.id === sectionId
                    ? {
                          ...section,
                          contributions: section.contributions.filter((contribution) => contribution.id !== contributionId),
                      }
                    : section
            )
        );
    };

    return (
        <div className="p-6">
            <h2 className="text-xl font-bold mb-4 text-center">Partidas</h2>
            <section>
                <div className="grid grid-cols-3 gap-4">
                    <div className="flex flex-col items-center text-center">
                        <label className="mb-2">Numero de pedimento</label>
                        <span id="numero_pedi_rep2"></span>
                    </div>
                    <div className="flex flex-col items-center text-center">
                        <label className="mb-2">Tipo de operacion</label>
                        <span id="tipo_oper_rep2"></span>
                    </div>
                    <div className="flex flex-col items-center text-center">
                        <label className="mb-2">Clave de pedimento</label>
                        <span id="clave_ped_rep2"></span>
                    </div>
                    <div className="flex flex-col items-center text-center">
                        <label className="mb-2">RFC</label>
                        <span id="RFC_im_ex_rep"></span>
                    </div>
                    <div className="flex flex-col items-center text-center">
                        <label className="mb-2">CURP</label>
                        <span id="CURP_im_ex_rep"></span>
                    </div>
                </div>
                <h3 className="text-xl font-bold mb-4 text-center">Informacion de partidas</h3>
                <div>
                    {sections.map((section) => (
                        <div key={section.id} className="mb-6">
                            <div className="grid grid-cols-4 gap-4 bg-emerald-100 w-9/12 mx-auto p-4 rounded">
                                <div className="flex flex-col items-center text-center">
                                    <label className="mb-2">Sec</label>
                                    <input className="w-full border border-gray-300 rounded p-2" type="text" name="sec_par0" />
                                </div>
                                <div className="flex flex-col items-center text-center">
                                    <label className="mb-2">Fraccion</label>
                                    <input className="w-full border border-gray-300 rounded p-2" type="text" name="frac_par0" />
                                </div>
                                {/* Agregar el resto de los campos aquí... */}
                            </div>
                            <h4 className="text-lg font-bold mt-4 text-center">Contribuciones</h4>
                            {section.contributions.map((contribution) => (
                                <div key={contribution.id} className="grid grid-cols-5 gap-4 bg-emerald-200 w-7/12 mx-auto p-4 rounded mb-4">
                                    <div className="flex flex-col items-center text-center">
                                        <label className="mb-2">CON</label>
                                        <select className="w-full border border-gray-300 rounded p-2 bg-white">
                                            <option value="" disabled selected>Seleccione una opción</option>
                                            <option value="DTA">DTA</option>
                                            <option value="C.C.">C.C.</option>
                                            <option value="IVA">IVA</option>
                                        </select>
                                    </div>
                                    <div className="flex flex-col items-center text-center">
                                        <label className="mb-2">TASA.</label>
                                        <input className="w-full border border-gray-300 rounded p-2" type="text" />
                                    </div>
                                    <div className="flex flex-col items-center text-center">
                                        <label className="mb-2">T. T.</label>
                                        <input className="w-full border border-gray-300 rounded p-2" type="text" />
                                    </div>
                                    <div className="flex flex-col items-center text-center">
                                        <label className="mb-2">F.P.</label>
                                        <input className="w-full border border-gray-300 rounded p-2" type="text" />
                                    </div>
                                    <div className="flex flex-col items-center text-center">
                                        <label className="mb-2">IMPORTE.</label>
                                        <input className="w-full border border-gray-300 rounded p-2" type="text" />
                                    </div>
                                    <div className="col-span-5 text-right">
                                        <button
                                            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                                            onClick={() => handleRemoveContribution(section.id, contribution.id)}>
                                            Eliminar Contribución
                                        </button>
                                    </div>
                                </div>
                            ))}
                            <div className="mb-4 text-center">
                                <button
                                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                                    onClick={() => handleAddContribution(section.id)}>
                                    Agregar Contribución
                                </button>
                            </div>
                            <div className="text-right">
                                <button
                                    className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                                    onClick={() => handleRemoveSection(section.id)}>
                                    Eliminar Partida
                                </button>
                            </div>
                        </div>
                    ))}
                    <div className="mb-4 text-center">
                        <button
                            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                            onClick={handleAddSection}>
                            Agregar Partida
                        </button>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default Seccion7;
