import React, { useState } from "react";

function Partidas({ onRemove }) {
    const [contributions, setContributions] = useState([]);

    const handleAddContribution = () => {
        setContributions([...contributions, { id: Date.now() }]);
    };

    const handleRemoveContribution = (id) => {
        setContributions(contributions.filter((contribution) => contribution.id !== id));
    };

    return (
        <div>
            <div className="grid grid-cols-4 gap-4 bg-emerald-100 w-9/12 mx-auto p-4 rounded">
                {/* Campos principales */}
                <div className="flex flex-col items-center text-center">
                    <label className="mb-2">Sec</label>
                    <input className="w-full border border-gray-300 rounded p-2" type="text" name="sec_par0"></input>
                </div>
                <div className="flex flex-col items-center text-center">
                    <label className="mb-2">Fraccion</label>
                    <input className="w-full border border-gray-300 rounded p-2" type="text" name="frac_par0"></input>
                </div>
                {/* Agrega el resto de los campos de manera similar */}

                {/* Otros campos omitidos por brevedad */}

                <div className="col-span-1 flex flex-col items-center text-center">
                    <label className="mb-2">Observacion a nivel partida</label>
                    <textarea className="w-full border border-gray-300 rounded p-2" rows="2"></textarea>
                </div>
            </div>

            {/* Contribuciones */}
            <div>
                {contributions.map((contribution) => (
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
                            <input className="w-full border border-gray-300 rounded p-2" type="text"></input>
                        </div>
                        <div className="flex flex-col items-center text-center">
                            <label className="mb-2">T. T.</label>
                            <input className="w-full border border-gray-300 rounded p-2" type="text"></input>
                        </div>
                        <div className="flex flex-col items-center text-center">
                            <label className="mb-2">F.P.</label>
                            <input className="w-full border border-gray-300 rounded p-2" type="text"></input>
                        </div>
                        <div className="flex flex-col items-center text-center">
                            <label className="mb-2">IMPORTE.</label>
                            <input className="w-full border border-gray-300 rounded p-2" type="text"></input>
                        </div>
                        <div className="col-span-5 text-right">
                            <button
                                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                                onClick={() => handleRemoveContribution(contribution.id)}>
                                Eliminar Contribución
                            </button>
                        </div>
                    </div>
                ))}
                <div className="mb-4 text-center">
                    <button
                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                        onClick={handleAddContribution}>
                        Agregar Contribución
                    </button>
                </div>
            </div>

            <div className="col-span-3 text-right">
                <button
                    className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                    onClick={onRemove}>
                    Eliminar Partida
                </button>
            </div>
        </div>
    );
}

export default Partidas;
