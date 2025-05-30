import CuaLi from "./Seccion1_cua_li";
import React, { useState } from "react";


function Section1({ formData, setFormData,  sections , setSections, sections2, setSections2 }) {
    {/*Seccion para las contribuciones */}
    
    // Agregar una nueva tasa
    const handleAddSection = () => {
        setSections((prevSections) => [
            ...prevSections,
            { id_tasa: Date.now(), contribucion: "", clave: "", tasa: "" },
        ]);
    };

    // Eliminar una tasa específica
    const handleRemoveSection = (id_tasa) => {
        console.log("Antes de eliminar:", sections);
        setSections((prevSections) => {
            const newSections = prevSections.filter((section) => section.id_tasa !== id_tasa);
            console.log("Después de eliminar:", newSections);
            return newSections;
        });
    };

    // Manejar cambios en los valores de cada tasa
    const handleSectionChange = (id_tasa, field, value) => {
        setSections((prevSections) =>
            prevSections.map((section) =>
                section.id_tasa === id_tasa ? { ...section, [field]: value } : section
            )
        );
    };

    


    {/*Seccion para el cuadro de liquidacion */}
    

    const handleAddSection2 = () => {
        setSections2([...sections2, { id_cua: Date.now(), concepto: "", formaPago: "", importe: "" }]);
    };
    
    const handleRemoveSection2 = (id_cua) => {
        console.log("Eliminando sección con id:", id_cua); // Corregido: usé id_cua aquí
        setSections2(sections2.filter((section) => section.id_cua !== id_cua)); // Usamos id_cua para la comparación
    };
    
    const handleSection2Change = (id_cua, field, value) => {
        setSections2(
            sections2.map((section) =>
                section.id_cua === id_cua ? { ...section, [field]: value } : section
            )
        );
    };
    
    const handleChange = (e) => {
        const { name, value } = e.target;
    
        setFormData((prev) => {
            // Detectar si el campo pertenece a seccion1 o seccion1_2
            const sectionKey = prev.seccion1_2?.hasOwnProperty(name) ? "seccion1_2" : "seccion1";
    
            return {
                ...prev,
                [sectionKey]: {
                    ...prev[sectionKey],
                    [name]: value,
                },
            };
        });
    };
    
    return (
        <div className="p-6">
            <h2 className="text-xl font-bold mb-4 text-center">
                Encabezado Principal del Pedimento
            </h2>
            <section>
                <div className="grid grid-cols-3 gap-4">
                    {/* Numero de pedimento */}
                    <div className="flex flex-col items-center text-center">
                        <label className="mb-2" >Número de pedimento</label>
                        <input disabled type="text" className="w-full border border-gray-300 rounded p-2"
                        name="no_pedimento"
                        value={formData.seccion1?.no_pedimento || ""}
                        onChange={handleChange}
                        />
                    </div>
                    <div className="flex flex-col items-center text-center">
                        <label className="mb-2" >Tipo de operacion</label>
                        <select disabled
                        className="w-full border border-gray-300 rounded p-2 bg-white"
                        name="tipo_oper" // Nombre que se usará para identificar en el estado
                        value={formData.seccion1?.tipo_oper || ""} // El valor debe ser el estado de tipo_oper
                        onChange={handleChange} // Llama a handleChange cuando se selecciona una opción
                    >
                            <option value="" disabled selected>Seleccione una opción</option>
                            <option value="IMP">IMP (Importación)</option>
                            <option value="EXP">EXP (Exportacion)</option>
                            <option value="TRA">TRA (Transito)</option>
                        </select>
                    </div>
                    <div className="flex flex-col items-center text-center">
                        <label className="mb-2">Clave de pedimento</label>
                        <select disabled className="w-full border border-gray-300 rounded p-2 bg-white"
                        name="clave_ped"
                        value={formData.seccion1?.clave_ped || ""}
                        onChange={handleChange} 
                        >
                            <option disabled  selected>Seleccione una opción</option>
                            <option disabled  >RÉGIMEN DEFINITIVO</option>
                                <option value="A1">A1</option>
                                <option value="A3">A3</option>
                                <option value="C1">C1</option>
                                <option value="D1">D1</option>
                                <option value="GC">GC</option>
                                <option value="K1">K1</option>
                                <option value="L1">L1</option>
                                <option value="P1">P1</option>
                                <option value="S2">S2</option>
                                <option value="T1">T1</option>
                                <option value="VF">VF</option>
                                <option value="VU">VU</option>
                            <option disabled >OPERACIONES VIRUTALES</option>
                                <option value="G9">G9</option>
                                <option value="V1">V1</option>
                                <option value="V2">V2</option>
                                <option value="V5">V5</option>
                                <option value="V6">V6</option>
                                <option value="V7">V7</option>
                                <option value="V9">V9</option>
                                <option value="VD">VD</option>
                            <option disabled >TEMPORALES</option>
                                <option value="AD">AD</option>
                                <option value="AJ">AJ</option>
                                <option value="BA">BA</option>
                                <option value="BB">BB</option>
                                <option value="BC">BC</option>
                                <option value="BD">BD</option>
                                <option value="BE">BE</option>
                                <option value="BF">BF</option>
                                <option value="BH">BH</option>
                                <option value="BI">BI</option>
                                <option value="BM">BM</option>
                                <option value="BP">BP</option>
                                <option value="BR">BR</option>
                                <option value="H1">H1</option>
                                <option value="H8">H8</option>
                                <option value="I1">I1</option>
                                <option value="F4">F4</option>
                                <option value="F5">F5</option>
                            <option disabled >IMMEX</option>
                                <option value="IN">IN</option>
                                <option value="AF">AF</option>
                                <option value="RT">RT</option>
                            <option disabled >AGD</option>
                                <option value="A4">A4</option>
                                <option value="E1">E1</option>
                                <option value="E2">E2</option>
                                <option value="G1">G1</option>
                                <option value="C3">C3</option>
                                <option value="K2">K2</option>
                            <option disabled >LOCALES AUTORIZADOS</option>
                                <option value="A5">A5</option>
                                <option value="E3">E3</option>
                                <option value="E4">E4</option>
                                <option value="G2">G2</option>
                                <option value="K3">K3</option>
                            <option disabled >IA</option>
                                <option value="F2">F2</option>
                                <option value="F3">F3</option>
                                <option value="V3">V3</option>
                                <option value="V4">V4</option>
                            <option disabled >DUTY FREE</option>
                                <option value="F8">F8</option>
                                <option value="F9">F9</option>
                                <option value="G6">G6</option>
                                <option value="G7">G7</option>
                                <option value="V8">V8</option>
                            <option disabled >TRANSFORMACIÓN EN RECINTO FISCALIZADO</option>
                                <option value="">M1</option>
                                <option value="">M2</option>
                                <option value="">J3</option>
                            <option disabled >RFE</option>
                                <option value="">G8</option>
                                <option value="">M3</option>
                                <option value="">M4</option>
                                <option value="">M5</option>
                                <option value="">J4</option>
                            <option disabled >TRÁNSITOS</option>
                                <option value="">T3</option>
                                <option value="">T6</option>
                                <option value="">T7</option>
                                <option value="">T9</option>
                            <option disabled >OTROS</option>
                                <option value="">R1</option>
                                <option value="">CT</option>
                        </select>
                    </div>
                    <div className="flex flex-col items-center text-center">
                        <label className="mb-2">Regimen</label>
                        <select disabled className="w-full border border-gray-300 rounded p-2 bg-white"
                        name="regimen"
                        value={formData.seccion1_2?.regimen || ""}
                        onChange={handleChange}
                        >
                            <option value="" disabled >Seleccione una opción</option>
                            <option value="IMD">IMD</option>
                            <option value="EXD">EXD</option>
                            <option value="ITR">ITR</option>
                            <option value="ITE">ITE</option>
                            <option value="ETR">ETR</option>
                            <option value="ETE">ETE</option>
                            <option value="DFI">DFI</option>
                            <option value="RFE">RFE</option>
                            <option value="TRA">TRA</option>
                            <option value="RFS">RFS</option>
                        </select>
                    </div>
                    <div className="flex flex-col items-center text-center">
                        <label className="mb-2" for="dest_ori">Destino/Origen</label>
                        <select disabled  className="w-full border border-gray-300 rounded p-2 bg-white" 
                        name="dest_ori"
                        value={formData.seccion1_2?.des_ori || ""}
                        onChange={handleChange}
                        >
                            <option value="" disabled selected>Seleccione una opción</option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                            <option value="6">6</option>
                            <option value="7">7</option>
                            <option value="8">8</option>
                            <option value="9">9</option>
                            <option value="10">10</option>
                            <option value="11">11</option>
                        </select>
                    </div>
                    <div className="flex flex-col items-center text-center">
                        <label className="mb-2" for="t_cambio">Tipo de cambio</label>
                        <input disabled type="number" step="0.000001" className="w-full border border-gray-300 rounded p-2"
                        name="tipo_cambio"
                        value={formData.seccion1_2?.tipo_cambio || ""}
                        onChange={handleChange}
                        />
                    </div>
                    <div className="flex flex-col items-center text-center">
                        <label className="mb-2" for="peso_br">Peso bruto (kg)</label>
                        <input disabled type="number" className="w-full border border-gray-300 rounded p-2"
                        name="peso_bruto"
                        value={formData.seccion1_2?.peso_bruto || ""}
                        onChange={handleChange}
                        />
                    </div>
                    <div className="flex flex-col items-center text-center">
                        <label className="mb-2" for="aduana_es">Aduana E/S</label>
                        <input disabled type="text" pattern="\d*"  className="w-full border border-gray-300 rounded p-2"
                        name="aduana_e_s"
                        value={formData.seccion1_2?.aduana_e_s || ""}
                        onChange={handleChange}
                        />
                    </div>
                    <div className="flex flex-col items-center text-center">
                        <label className="mb-2" for="m_trans">Medio de transporte</label>
                        <select disabled className="w-full border border-gray-300 rounded p-2 bg-white"
                        name="medio_transpo"
                        value={formData.seccion1_2?.aduana_e_s || ""}
                        onChange={handleChange} 
                        >
                            <option value="" disabled selected>Seleccione una opción</option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                            <option value="6">6</option>
                            <option value="7">7</option>
                            <option value="8">8</option>
                            <option value="10">10</option>
                            <option value="11">11</option>
                            <option value="12">12</option>
                            <option value="98">98</option>
                            <option value="99">99</option>
                        </select>
                    </div>
                    <div className="flex flex-col items-center text-center">
                        <label className="mb-2" for="m_trans_arr">Medio de transporte arribo</label>
                        <select disabled className="w-full border border-gray-300 rounded p-2 bg-white"
                        name="medio_transpo_arri"
                        value={formData.seccion1_2?.medio_transpo_arri || ""}
                        onChange={handleChange} 
                        >
                            <option value="" disabled selected>Seleccione una opción</option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                            <option value="6">6</option>
                            <option value="7">7</option>
                            <option value="8">8</option>
                            <option value="10">10</option>
                            <option value="11">11</option>
                            <option value="12">12</option>
                            <option value="98">98</option>
                            <option value="99">99</option>
                        </select>
                    </div>
                    <div className="flex flex-col items-center text-center">
                        <label className="mb-2" for="m_trans_sa">Medio de transporte salida</label>
                        <select disabled className="w-full border border-gray-300 rounded p-2 bg-white"
                        name="medio_transpo_sali"
                        value={formData.seccion1_2?.medio_transpo_sali || ""}
                        onChange={handleChange} 
                        >
                            <option value="" disabled selected>Seleccione una opción</option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                            <option value="6">6</option>
                            <option value="7">7</option>
                            <option value="8">8</option>
                            <option value="10">10</option>
                            <option value="11">11</option>
                            <option value="12">12</option>
                            <option value="98">98</option>
                            <option value="99">99</option>
                        </select>
                    </div>
                    <div className="flex flex-col items-center text-center">
                        <label className="mb-2" for="v_dol">Valor en dolares</label>
                        <input disabled type="number" className="w-full border border-gray-300 rounded p-2"
                        name="valor_dolares"
                        value={formData.seccion1_2?.valor_dolares || ""}
                        onChange={handleChange}
                        />
                    </div>
                    <div className="flex flex-col items-center text-center">
                        <label className="mb-2" for="v_adu">Valor aduana</label>
                        <input disabled type="number" className="w-full border border-gray-300 rounded p-2"
                        name="valor_aduana"
                        value={formData.seccion1_2?.valor_aduana || ""}
                        onChange={handleChange}
                        />
                    </div>
                    <div className="flex flex-col items-center text-center">
                        <label className="mb-2" for="p_pag_valor">Precio pagado/valor comercial</label>
                        <input disabled type="number" className="w-full border border-gray-300 rounded p-2"
                        name="precio_pagado"
                        value={formData.seccion1_2?.precio_pagado || ""}
                        onChange={handleChange}
                        />
                    </div>
                    <div className="flex flex-col items-center text-center">
                        <label className="mb-2" for="RFC_im_ex">RFC del importador/exportador</label>
                        <input disabled type="text" className="w-full border border-gray-300 rounded p-2"
                        name="rfc_import_export"
                        value={formData.seccion1_2?.rfc_import_export || ""}
                        onChange={handleChange}
                        />
                    </div>
                    <div className="flex flex-col items-center text-center">
                        <label className="mb-2" for="CURP_im_ex">CURP del importador/exportador</label>
                        <input disabled type="text" className="w-full border border-gray-300 rounded p-2"
                        name="curp_import_export"
                        value={formData.seccion1_2.curp_import_export || " "}
                        onChange={handleChange}
                        />
                    </div>
                    {/*Text area estilo */}
                    <div className="col-span-3 flex flex-col items-center text-center">
                            <label className="mb-2">Nombre, denominación o razón social del importador/exportador.</label>
                            <textarea disabled
                            className="w-full border border-gray-300 rounded p-2 resize-none"
                            rows="4"
                            name="razon_so_im_ex" // Nombre para identificar este campo en el estado
                            value={formData.seccion1_2?.razon_so_im_ex || ""}
                            onChange={handleChange} // Maneja los cambios en el valor
                            >
                            </textarea>
                    </div>
                    <div className="col-span-3 flex flex-col items-center text-center">
                            <label className="mb-2">Domicilio importador/exportador</label>
                            <textarea disabled 
                            className="w-full border border-gray-300 rounded p-2 resize-none"
                            rows="4"
                            name="domicilio_im_ex"
                            value={formData.seccion1_2?.domicilio_im_ex || ""}
                            onChange={handleChange} 
                            >
                            </textarea>
                    </div>
                    <div className="flex flex-col items-center text-center">
                        <label className="mb-2" for="val_seguros">Val seguros</label>
                        <input disabled type="number" className="w-full border border-gray-300 rounded p-2"
                        name="val_seguros"
                        value={formData.seccion1_2?.val_seguros || ""}
                        onChange={handleChange}
                        />
                    </div>
                    <div className="flex flex-col items-center text-center">
                        <label className="mb-2" for="seguros">Seguros</label>
                        <input disabled type="number" className="w-full border border-gray-300 rounded p-2"
                        name="seguros"
                        value={formData.seccion1_2?.seguros || ""}
                        onChange={handleChange}
                        />
                    </div>
                    <div className="flex flex-col items-center text-center">
                        <label className="mb-2" for="fletes">Fletes</label>
                        <input disabled type="number" className="w-full border border-gray-300 rounded p-2"
                        name="fletes"
                        value={formData.seccion1_2?.fletes || ""}
                        onChange={handleChange}
                        />
                    </div>
                    <div className="flex flex-col items-center text-center">
                        <label className="mb-2" for="embalajes">Embalajes</label>
                        <input disabled type="number" className="w-full border border-gray-300 rounded p-2"
                        name="embalajes"
                        value={formData.seccion1_2?.embalajes || ""}
                        onChange={handleChange}
                        />
                    </div>
                    <div className="flex flex-col items-center text-center">
                        <label className="mb-2" for="o_inc">Otros Incrementales</label>
                        <input disabled type="number" className="w-full border border-gray-300 rounded p-2"
                        name="otros_incremen"
                        value={formData.seccion1_?.otros_incremen || ""}
                        onChange={handleChange}
                        />
                    </div>
                    <div className="flex flex-col items-center text-center">
                        <label className="mb-2" for="t_dec">Transporte decrementales</label>
                        <input disabled type="number"  className="w-full border border-gray-300 rounded p-2"
                        name="transpo_decremen"
                        value={formData.seccion1_2?.transpo_decremen || ""}
                        onChange={handleChange}
                        />
                    </div>
                    <div className="flex flex-col items-center text-center">
                        <label className="mb-2" for="s_dec">Seguros decrementales</label>
                        <input disabled type="number"  className="w-full border border-gray-300 rounded p-2"
                        name="seguro_decremen"
                        value={formData.seccion1_2?.seguro_decremen || ""}
                        onChange={handleChange}
                        />
                    </div>
                    <div className="flex flex-col items-center text-center">
                        <label className="mb-2" for="c_dec">Carga decrementales</label>
                        <input disabled type="number" className="w-full border border-gray-300 rounded p-2"
                        name="carga_decremen"
                        value={formData.seccion1_2?.carga_decremen || ""}
                        onChange={handleChange}/>
                    </div>
                    <div className="flex flex-col items-center text-center">
                        <label className="mb-2" for="d_dec">Descarga decrementales</label>
                        <input disabled type="number" className="w-full border border-gray-300 rounded p-2"
                        name="descarga_decremen"
                        value={formData.seccion1_2?.desc_decremen || ""}
                        onChange={handleChange}
                        />
                    </div>
                    <div className="flex flex-col items-center text-center">
                        <label className="mb-2" for="o_dec">Otros decrementales</label>
                        <input disabled type="number" className="w-full border border-gray-300 rounded p-2"
                        name="otros_decremen"
                        value={formData.seccion1_2?.otros_decremen || ""}
                        onChange={handleChange}
                        />
                    </div>
                    <div className="flex flex-col items-center text-center">
                        <label className="mb-2" for="acu_ele">Acuse electrónico de validación/Codigo de aceptacion.</label>
                        <input disabled type="text"  className="w-full border border-gray-300 rounded p-2"
                        name="acuseEle"
                        value={formData.seccion1_2?.acuse_electroni_val || ""}
                        onChange={handleChange}
                        />
                    </div>
                    <div className="flex flex-col items-center text-center">
                        <label className="mb-2" for="c_barras">Codigo de barras</label>
                        <input disabled type="text" className="w-full border border-gray-300 rounded p-2"
                        name="codigo_barra"
                        value={formData.seccion1_2?.codigo_barra || ""}
                        onChange={handleChange}
                        />
                    </div>
                    <div className="flex flex-col items-center text-center">
                        <label className="mb-2" for="c_adua_des">Clave de la sección aduanera de despacho.</label>
                        <input disabled type="text" className="w-full border border-gray-300 rounded p-2"
                        name="clv_sec_edu_despacho"
                        value={formData.seccion1_2?.clv_sec_edu_despacho|| ""}
                        onChange={handleChange}
                        />
                    </div>
                    <div className="flex flex-col items-center text-center">
                        <label className="mb-2" for="ma_nu_t">Marcas, números y total de bultos.</label>
                        <input disabled type="text" className="w-full border border-gray-300 rounded p-2"
                        name="total_bultos"
                        value={formData.seccion1_2?.total_bultos || ""}
                        onChange={handleChange}
                        />
                    </div>
        
                    <div className="flex flex-col items-center text-center">
                        <h3 className="fechas_letra">Fechas</h3>
                        <label className="mb-2" for="fec_entr">Entrada</label>
                        <input disabled type="date"  className="w-60 border border-gray-300 rounded p-2"
                        name="fecha_en"
                        value={formData.seccion1_2?.fecha_en ? formData.seccion1_2.fecha_en.split('T')[0] : ""}
                        onChange={handleChange}
                        />
                        <label className="mb-2" for="fec_sal">Pago/Salida</label>
                        <input disabled type="date" className="w-60 border border-gray-300 rounded p-2"
                        name="feca_sal"
                        value={formData.seccion1_2?.feca_sal ? formData.seccion1_2.feca_sal.split('T')[0] : ""}
                        onChange={handleChange}
                        />
                    </div>
                </div>
            </section>   
            <h3 className="text-lg mb-4 text-center">Tasas a nivel de pedimento</h3>
                <div >
                {sections.map((section) => (
    <div key={section.id_tasa} className="grid grid-cols-3 gap-4 bg-gray-200 p-4 rounded mb-4">
        <div>
            <label className="mb-2 block">Contribución</label>
            <select disabled
                className="w-full border border-gray-300 rounded p-2 bg-white"
                value={section.contribucion}
                onChange={(e) => handleSectionChange(section.id_tasa, "contribucion", e.target.value)}
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
            </select>
        </div>
        <div>
            <label className="mb-2 block">Clave del tipo de tasa</label>
            <select disabled
                className="w-full border border-gray-300 rounded p-2 bg-white"
                value={section.clave}  // CORREGIDO: antes tenía `cv_t_tasa`
                onChange={(e) => handleSectionChange(section.id_tasa, "clave", e.target.value)}
            >
                <option value="" disabled>Seleccione una opción</option>
                {[...Array(10)].map((_, i) => (
                    <option key={i + 1} value={i + 1}>{i + 1}</option>
                ))}
            </select>
        </div>
        <div>
            <label className="mb-2 block">Tasa</label>
            <input disabled
                type="number"
                className="w-full border border-gray-300 rounded p-2"
                value={section.tasa}
                onChange={(e) => handleSectionChange(section.id_tasa, "tasa", e.target.value)}
            />
        </div>

    </div>
))}
                </div>


            <h3 className="text-lg mb-4 text-center">Cuadro de liquidacion</h3>
                <div>
                {sections2.map((section2) => (
                    <CuaLi
                    key={section2.id}
                    section2={section2}
                    onChange={handleSection2Change}
                    onRemove={handleRemoveSection2}
                    />
                    ))}
                </div>
                <div className="grid grid-cols-3 gap-4">
                    <div className="flex flex-col items-center text-center">
                        <label className="mb-2" for="efec">Efectivo</label>
                        <input disabled className="w-full border border-gray-300 rounded p-2" type="number" 
                        name="efec"
                        value={formData.seccion1?.efec || ""}
                        onChange={handleChange}
                        />
                    </div>
                    <div className="flex flex-col items-center text-center">
                        <label className="mb-2" for="otro_efec">Otros</label>
                        <input disabled className="w-full border border-gray-300 rounded p-2" type="number" 
                        name="otros"
                        value={formData.seccion1?.otros || ""}
                        onChange={handleChange} />
                    </div>
                    <div className="flex flex-col items-center text-center">
                        <label className="mb-2" for="total">Total</label>
                        <input disabled className="w-full border border-gray-300 rounded p-2" type="number" 
                        name="total"
                        value={formData.seccion1?.total || ""}
                        onChange={handleChange} 
                        />
                    </div>
                </div>
        </div>
    );
}

export default Section1;