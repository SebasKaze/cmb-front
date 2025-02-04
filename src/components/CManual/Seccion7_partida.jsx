import React from "react";
import PartidaContri from "./Seccion7_partida_con";

function Partidas({ onRemove }) {
    return (
        <div>
            <div className="grid grid-cols-4 gap-4 bg-emerald-100 w-9/12 mx-auto p-4 rounded">
                <div className="flex flex-col items-center text-center">
                    <label className="mb-2">Sec</label>
                    <input className="w-full border border-gray-300 rounded p-2" type="text" id="" name="sec_par0"></input>
                </div>
                <div className="flex flex-col items-center text-center">
                    <label className="mb-2">Fraccion</label>
                    <input className="w-full border border-gray-300 rounded p-2" type="text" name="frac_par0"></input>
                </div>
                <div className="flex flex-col items-center text-center">
                    <label className="mb-2">SUBD</label>
                    <input className="w-full border border-gray-300 rounded p-2" type="text" name="sebd_par0"></input>
                </div>
                <div className="flex flex-col items-center text-center">
                    <label className="mb-2">Vinc.</label>
                    <input className="w-full border border-gray-300 rounded p-2" type="text" name="vinc_par0"></input>
                </div>
                <div className="flex flex-col items-center text-center">
                    <label className="mb-2">Met. Val.</label>
                    <input className="w-full border border-gray-300 rounded p-2" type="text" name="met_val_par0"></input>
                </div>
                <div className="flex flex-col items-center text-center">
                    <label className="mb-2">UMC</label>
                    <input className="w-full border border-gray-300 rounded p-2" type="number" name="umc_par0" ></input>
                </div>
                <div className="flex flex-col items-center text-center">
                    <label className="mb-2">Cantidad UMC</label>
                    <input className="w-full border border-gray-300 rounded p-2" type="number" step="0.000001" name="canti_umc_par0"></input>
                </div>
                <div className="flex flex-col items-center text-center">
                    <label className="mb-2">UMT</label>
                    <input className="w-full border border-gray-300 rounded p-2" type="number" name="umt_par0"></input>
                </div>
                <div className="flex flex-col items-center text-center">
                    <label className="mb-2">Cantidad UMT</label>
                    <input className="w-full border border-gray-300 rounded p-2" type="number" step="0.000001" name="canti_umt_par0"></input>
                </div>
                <div className="flex flex-col items-center text-center">
                    <label className="mb-2">P. V/C</label>
                    <input className="w-full border border-gray-300 rounded p-2" type="text" name="pvc_par0" oninput="validarInput(this)" maxlength="3"></input>
                </div>
                <div className="flex flex-col items-center text-center">
                    <label className="mb-2">P. O/D</label>
                    <input className="w-full border border-gray-300 rounded p-2" type="text" name="pod_par0" oninput="validarInput(this)" maxlength="3"></input>
                </div>
                <div className="col-span-1 flex flex-col items-center text-center">
                    <label className="mb-2">Descripcion</label>
                    <textarea
                    className="w-full border border-gray-300 rounded p-2"
                    rows="2">
                    </textarea>
                </div>
                <div className="flex flex-col items-center text-center">
                    <label className="mb-2">VAL. ADU/VAL. USD.</label>
                    <input className="w-full border border-gray-300 rounded p-2" type="number" step="0.00001"></input>
                </div>
                <div className="flex flex-col items-center text-center">
                    <label className="mb-2">IMP. PRECIO PAG./VALOR COMERCIAL.</label>
                    <input className="w-full border border-gray-300 rounded p-2" type="number" name="imp_par0"></input>
                </div>
                <div className="flex flex-col items-center text-center">
                    <label className="mb-2">PRECIO UNIT.</label>
                    <input className="w-full border border-gray-300 rounded p-2" type="number" step="0.00001" name="pre_par0"></input>
                </div>
                <div className="flex flex-col items-center text-center">
                    <label className="mb-2">VAL. AGREG.</label>
                    <input className="w-full border border-gray-300 rounded p-2" type="number" step="0.00001" name="val_agre_par0"></input>
                </div>
                <div className="flex flex-col items-center text-center">
                    <label className="mb-2">MARCA.</label>
                    <input className="w-full border border-gray-300 rounded p-2" type="text" name="marca_per0"></input>
                </div>
                <div className="flex flex-col items-center text-center">
                    <label className="mb-2">MODELO.</label>
                    <input className="w-full border border-gray-300 rounded p-2" type="text" name="mod_par0"></input>
                </div>
                <div className="flex flex-col items-center text-center">
                    <label className="mb-2">CÓDIGO PRODUCTO.</label>
                    <input className="w-full border border-gray-300 rounded p-2" type="text" name="cp_par0"></input>
                </div>
                <div className="col-span-1 flex flex-col items-center text-center">
                    <label className="mb-2">Observacion a nivel partida</label>
                    <textarea
                    className="w-full border border-gray-300 rounded p-2"
                    rows="2">
                    </textarea>
                </div>
            </div>
            {/*CONTRIBUCIONES*/}
            <PartidaContri/>
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