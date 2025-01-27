import Partidas from "./Seccion7_partida";
import React, { useState } from "react";

function Seccion7() {

    {/*Seccion para las Partidas */}
    const [section7, setSections] = useState([]);

    const handleAddSection = () => {
        setSections([...section7, { id: Date.now() }]);
    };

    const handleRemoveSection = (id) => {
        setSections(section7.filter((section) => section.id !== id));
    };
    return (
        <div className="p-6">
            <h2 className="text-xl font-bold mb-4 text-center">Partidas</h2>
            <section>
                <div className="grid grid-cols-3 gap-4" >
                    <div className="flex flex-col items-center text-center" >
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
                {/*PARTIDAS */}
                <div >
                    {section7.map((section) => (
                        <Partidas
                            key={section.id}
                            onRemove={() => handleRemoveSection(section.id)}
                        />
                    ))}
                    {/*Boton para agregar contribuciones*/}
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
    )
}
export default Seccion7;