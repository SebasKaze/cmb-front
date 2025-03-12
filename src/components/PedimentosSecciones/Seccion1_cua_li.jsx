import React from "react";

function CuadroLiquidacion({ section2, onChange, onRemove }) {
    return (
        <div className="grid grid-cols-3 gap-4 bg-gray-200 p-4 rounded mb-4">
            {/* Concepto */}
            <div>
                <label className="mb-2 block">Concepto</label>
                <select
                    className="w-full border border-gray-300 rounded p-2 bg-white"
                    value={section2.concepto || ""}
                    onChange={(e) => onChange(section2.id_cua, "concepto", e.target.value)}
                >
                    <option value="" disabled>Seleccione una opción</option>
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

            {/* Forma de pago */}
            <div>
                <label className="mb-2 block">Forma de pago</label>
                <select
                    className="w-full border border-gray-300 rounded p-2 bg-white"
                    value={section2.forma_pago || ""}
                    onChange={(e) => onChange(section2.id_cua, "forma_pago", e.target.value)}
                >
                    <option value="" disabled>Seleccione una opción</option>
                    <option value="0">0</option>
                    <option value="2">2</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                    <option value="7">7</option>
                    <option value="8">8</option>
                    <option value="9">9</option>
                    <option value="12">12</option>
                    <option value="13">13</option>
                    <option value="14">14</option>
                    <option value="15">15</option>
                    <option value="16">16</option>
                    <option value="18">18</option>
                    <option value="19">19</option>
                    <option value="21">21</option>
                    <option value="22">22</option>
                </select>
            </div>

            {/* Importe */}
            <div>
                <label className="mb-2 block">Importe</label>
                <input
                    type="number"
                    className="w-full border border-gray-300 rounded p-2"
                    value={section2.importe || ""}
                    onChange={(e) => onChange(section2.id_cua, "importe", e.target.value)}
                />
            </div>

            {/* Botón de eliminar */}
            <div className="col-span-3 text-right">
                <button
                    className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                    onClick={() => onRemove(section2.id_cua)}
                >
                    Eliminar CuaLi
                </button>
            </div>
        </div>
    );
}

export default CuadroLiquidacion;