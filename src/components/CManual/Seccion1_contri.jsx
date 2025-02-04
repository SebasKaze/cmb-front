import React from "react";

function ContribucionSection({ onRemove }) {
    return (
        <div className="grid grid-cols-3 gap-4 bg-gray-200 p-4 rounded mb-4">
            <div>
                <label className="mb-2 block">Contribución</label>
                <select className="w-full border border-gray-300 rounded p-2 bg-white">
                    <option value="" disabled selected>
                        Seleccione una opción
                    </option>
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
            <div>
                <label className="mb-2 block">Clave del tipo de tasa</label>
                <select
                    className="w-full border border-gray-300 rounded p-2 bg-white">
                    <option value="" disabled selected>
                        Seleccione una opción
                    </option>
                    {/*Array para agregar maximo 10 opciones, no se si funcione para backend */}
                    {[...Array(10)].map((_, i) => (
                        <option key={i + 1} value={i + 1}>
                            {i + 1}
                        </option>
                    ))}
                </select>
            </div>
            <div>
                <label className="mb-2 block">Tasa</label>
                <input
                    type="number"
                    className="w-full border border-gray-300 rounded p-2"
                />
            </div>
            <div className="col-span-3 text-right">
                <button
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                onClick={onRemove}>
                    Eliminar Contribucion
                </button>
            </div>
        </div>
    );
}

export default ContribucionSection;
