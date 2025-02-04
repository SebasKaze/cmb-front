import React, { useState } from "react";

function Contribuciones() {
    const [contributions, setContributions] = useState([]);

    const handleAddContribution = () => {
        setContributions([...contributions, { id: Date.now() }]);
    };

    const handleRemoveContribution = (id) => {
        setContributions(contributions.filter((contribution) => contribution.id !== id));
    };

    return (
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
                            <option value="ISAN">ISAN</option>
                            <option value="IGI/IGE">IGI/IGE</option>
                            <option value="REC.">REC.</option>
                            <option value="OTROS">OTROS</option>
                            <option value="MULT.">MULT.</option>
                            <option value="2.5">2.5</option>
                            <option value="RT">RT</option>
                            <option value="PRV">PRV</option>
                            <option value="EUR">EUR</option>
                            <option value="REU">REU</option>
                            <option value="MT">MT</option>
                            <option value="IEPS">IEPS</option>
                            <option value="IVA/PRV">IVA/PRV</option>
                            <option value="2IB">2IB</option>
                            <option value="2IA2">2IA2</option>
                            <option value="2IA1">2IA1</option>
                            <option value="2IC">2IC</option>
                            <option value="2IF">2IF</option>
                            <option value="2IG">2IG</option>
                            <option value="2IJ">2IJ</option>
                            <option value="2II">2II</option>
                            <option value="ICF">ICF</option>
                            <option value="IEPSDIE">IEPSDIE</option>
                            <option value="ICNF">ICNF</option>
                            <option value="LIEPS">LIEPS</option>
                            <option value="DFC">DFC</option>
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
    );
}

export default Contribuciones;
