import CuaLi from "./Seccion1_cua_li";
import React, { useState } from "react";


function Section1({ formData, setFormData,  sections , setSections, sections2, setSections2 }) {
    {/*Seccion para las contribuciones */}
    
    const handleAddSection = () => {
        setSections([...sections, { id: Date.now(), contribucion: "", clave: "", tasa: "" }]);
    };;
    const handleRemoveSection = (id) => {
        setSections(sections.filter((section) => section.id !== id));
    };
    const handleSectionChange = (id, field, value) => {
        setSections(
            sections.map((section) =>
                section.id === id ? { ...section, [field]: value } : section
            )
        );
    };


    {/*Seccion para el cuadro de liquidacion */}
    

    const handleAddSection2 = () => {
        setSections2([...sections2, { id: Date.now(), concepto: "", formaPago: "", importe: "" }]);
    };

    const handleRemoveSection2 = (id) => {
        setSections2(sections2.filter((section) => section.id !== id));
    };
    const handleSection2Change = (id, field, value) => {
        setSections2(
            sections2.map((section) =>
                section.id === id ? { ...section, [field]: value } : section
            )
        );
    };
    
    //Cosa para guardar y concatenar los valores de los inputs
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            seccion1: {
                ...prev.seccion1,
                [name]: value,
            },
        }));
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
                    <label className="mb-2">Número de pedimento</label>
                    <input 
                    type="text" 
                    className="w-full border border-gray-300 rounded p-2"
                    name="noPedimento"
                    value={formData.seccion1?.noPedimento || ""}
                    onChange={handleChange}
                    pattern="[0-9]{15}"
                    minLength={15}
                    maxLength={15}
                    required
                    onInvalid={(e) =>
                        e.target.setCustomValidity("Este campo es obligatorio y debe contener exactamente 15 dígitos numéricos.")
                    }
                    onInput={(e) => e.target.setCustomValidity("")}
                    />
                </div>

                <div className="flex flex-col items-center text-center">
                <label className="mb-2">Tipo de operación</label>
                <select 
                    className="w-full border border-gray-300 rounded p-2 bg-white"
                    name="tipoOperacion"
                    onChange={handleChange}
                    required
                >
                    <option value="" disabled selected>Seleccione una opción</option>
                    <option value="IMP">IMP (Importación)</option>
                    <option value="EXP">EXP (Exportación)</option>
                    <option value="TRA">TRA (Tránsito)</option>
                </select>
            </div>

            <div className="flex flex-col items-center text-center">
                <label className="mb-2">Clave de pedimento</label>
                <select 
                    className="w-full border border-gray-300 rounded p-2 bg-white"
                    name="clavePedi"
                    onChange={handleChange}
                    required
                >
                    <option value="" disabled selected>Seleccione una opción</option>
                    <option disabled>RÉGIMEN DEFINITIVO</option>
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
                    <option disabled>OPERACIONES VIRTUALES</option>
                    <option value="G9">G9</option>
                    <option value="V1">V1</option>
                    <option value="V2">V2</option>
                    <option value="V5">V5</option>
                    <option value="V6">V6</option>
                    <option value="V7">V7</option>
                    <option value="V9">V9</option>
                    <option value="VD">VD</option>
                    <option disabled>TEMPORALES</option>
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
                    <option disabled>IMMEX</option>
                    <option value="IN">IN</option>
                    <option value="AF">AF</option>
                    <option value="RT">RT</option>
                    <option disabled>AGD</option>
                    <option value="A4">A4</option>
                    <option value="E1">E1</option>
                    <option value="E2">E2</option>
                    <option value="G1">G1</option>
                    <option value="C3">C3</option>
                    <option value="K2">K2</option>
                    <option disabled>LOCALES AUTORIZADOS</option>
                    <option value="A5">A5</option>
                    <option value="E3">E3</option>
                    <option value="E4">E4</option>
                    <option value="G2">G2</option>
                    <option value="K3">K3</option>
                    <option disabled>IA</option>
                    <option value="F2">F2</option>
                    <option value="F3">F3</option>
                    <option value="V3">V3</option>
                    <option value="V4">V4</option>
                    <option disabled>DUTY FREE</option>
                    <option value="F8">F8</option>
                    <option value="F9">F9</option>
                    <option value="G6">G6</option>
                    <option value="G7">G7</option>
                    <option value="V8">V8</option>
                    <option disabled>TRANSFORMACIÓN EN RECINTO FISCALIZADO</option>
                    <option value="M1">M1</option>
                    <option value="M2">M2</option>
                    <option value="J3">J3</option>
                    <option disabled>RFE</option>
                    <option value="G8">G8</option>
                    <option value="M3">M3</option>
                    <option value="M4">M4</option>
                    <option value="M5">M5</option>
                    <option value="J4">J4</option>
                    <option disabled>TRÁNSITOS</option>
                    <option value="T3">T3</option>
                    <option value="T6">T6</option>
                    <option value="T7">T7</option>
                    <option value="T9">T9</option>
                    <option disabled>OTROS</option>
                    <option value="R1">R1</option>
                    <option value="CT">CT</option>
                </select>
            </div>

                    <div className="flex flex-col items-center text-center">
                        <label className="mb-2">Regimen</label>
                        <select className="w-full border border-gray-300 rounded p-2 bg-white"
                        name="regimen"
                        onChange={handleChange}
                        >
                            <option value="" disabled selected>Seleccione una opción</option>
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
                        <select  className="w-full border border-gray-300 rounded p-2 bg-white" 
                        name="dest_ori"
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
                        <input type="number" step="0.000001" className="w-full border border-gray-300 rounded p-2"
                        name="tipoCambio"
                        value={formData.seccion1?.tipoCambio || ""}
                        onChange={handleChange}
                        />
                    </div>
                    <div className="flex flex-col items-center text-center">
                        <label className="mb-2" for="peso_br">Peso bruto (kg)</label>
                        <input type="number" className="w-full border border-gray-300 rounded p-2"
                        name="pesoBruto"
                        value={formData.seccion1?.pesoBruto || ""}
                        onChange={handleChange}
                        />
                    </div>
                    <div className="flex flex-col items-center text-center">
                        <label className="mb-2" for="aduana_es">Aduana E/S</label>
                        <input type="text" pattern="\d*"  className="w-full border border-gray-300 rounded p-2"
                        name="aduanaES"
                        value={formData.seccion1?.aduanaES || ""}
                        onChange={handleChange}
                        />
                    </div>
                    <div className="flex flex-col items-center text-center">
                        <label className="mb-2" for="m_trans">Medio de transporte</label>
                        <select className="w-full border border-gray-300 rounded p-2 bg-white"
                        name="m_trans"
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
                        <select className="w-full border border-gray-300 rounded p-2 bg-white"
                        name="m_trans_arr"
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
                        <select className="w-full border border-gray-300 rounded p-2 bg-white"
                        name="m_trans_sa"
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
                        <input type="number" className="w-full border border-gray-300 rounded p-2"
                        name="valorDolares"
                        value={formData.seccion1?.valorDolares || ""}
                        onChange={handleChange}
                        />
                    </div>
                    <div className="flex flex-col items-center text-center">
                        <label className="mb-2" for="v_adu">Valor aduana</label>
                        <input type="number" className="w-full border border-gray-300 rounded p-2"
                        name="valorAduana"
                        value={formData.seccion1?.valorAduana || ""}
                        onChange={handleChange}
                        />
                    </div>
                    <div className="flex flex-col items-center text-center">
                        <label className="mb-2" for="p_pag_valor">Precio pagado/valor comercial</label>
                        <input type="number" className="w-full border border-gray-300 rounded p-2"
                        name="precioPagado"
                        value={formData.seccion1?.precioPagado || ""}
                        onChange={handleChange}
                        />
                    </div>
                    <div className="flex flex-col items-center text-center">
                        <label className="mb-2" for="RFC_im_ex">RFC del importador/exportador</label>
                        <input type="text" className="w-full border border-gray-300 rounded p-2"
                        name="rfc_impo_expo"
                        value={formData.seccion1?.rfc_impo_expo || ""}
                        onChange={handleChange}
                        />
                    </div>
                    <div className="flex flex-col items-center text-center">
                        <label className="mb-2" for="CURP_im_ex">CURP del importador/exportador</label>
                        <input type="text" className="w-full border border-gray-300 rounded p-2"
                        name="curp_impo_expo"
                        value={formData.seccion1?.curp_impo_expo || ""}
                        onChange={handleChange}
                        />
                    </div>
                    {/*Text area estilo */}
                    <div className="col-span-3 flex flex-col items-center text-center">
                            <label className="mb-2">Nombre, denominación o razón social del importador/exportador.</label>
                            <textarea
                            className="w-full border border-gray-300 rounded p-2 resize-none"
                            rows="4"
                            name="razonSocial" // Nombre para identificar este campo en el estado
                            onChange={handleChange} // Maneja los cambios en el valor
                            >
                            </textarea>
                    </div>
                    <div className="col-span-3 flex flex-col items-center text-center">
                            <label className="mb-2">Domicilio importador/exportador</label>
                            <textarea 
                            className="w-full border border-gray-300 rounded p-2 resize-none"
                            rows="4"
                            name="domImpoExpo"
                            onChange={handleChange} 
                            >
                            </textarea>
                    </div>
                    <div className="flex flex-col items-center text-center">
                        <label className="mb-2" for="val_seguros">Val seguros</label>
                        <input type="number" className="w-full border border-gray-300 rounded p-2"
                        name="valSeguros"
                        value={formData.seccion1?.valSeguros || ""}
                        onChange={handleChange}
                        />
                    </div>
                    <div className="flex flex-col items-center text-center">
                        <label className="mb-2" for="seguros">Seguros</label>
                        <input type="number" className="w-full border border-gray-300 rounded p-2"
                        name="seguros"
                        value={formData.seccion1?.seguros || ""}
                        onChange={handleChange}
                        />
                    </div>
                    <div className="flex flex-col items-center text-center">
                        <label className="mb-2" for="fletes">Fletes</label>
                        <input type="number" className="w-full border border-gray-300 rounded p-2"
                        name="fletes"
                        value={formData.seccion1?.fletes || ""}
                        onChange={handleChange}
                        />
                    </div>
                    <div className="flex flex-col items-center text-center">
                        <label className="mb-2" for="embalajes">Embalajes</label>
                        <input type="number" className="w-full border border-gray-300 rounded p-2"
                        name="embalajes"
                        value={formData.seccion1?.embalajes || ""}
                        onChange={handleChange}
                        />
                    </div>
                    <div className="flex flex-col items-center text-center">
                        <label className="mb-2" for="o_inc">Otros Incrementales</label>
                        <input type="number" className="w-full border border-gray-300 rounded p-2"
                        name="otrosInc"
                        value={formData.seccion1?.otrosInc || ""}
                        onChange={handleChange}
                        />
                    </div>
                    <div className="flex flex-col items-center text-center">
                        <label className="mb-2" for="t_dec">Transporte decrementales</label>
                        <input type="number"  className="w-full border border-gray-300 rounded p-2"
                        name="transDecre"
                        value={formData.seccion1?.transDecre || ""}
                        onChange={handleChange}
                        />
                    </div>
                    <div className="flex flex-col items-center text-center">
                        <label className="mb-2" for="s_dec">Seguros decrementales</label>
                        <input type="number"  className="w-full border border-gray-300 rounded p-2"
                        name="segurosDecre"
                        value={formData.seccion1?.segurosDecre || ""}
                        onChange={handleChange}
                        />
                    </div>
                    <div className="flex flex-col items-center text-center">
                        <label className="mb-2" for="c_dec">Carga decrementales</label>
                        <input type="number" className="w-full border border-gray-300 rounded p-2"
                        name="cargaDecre"
                        value={formData.seccion1?.cargaDecre || ""}
                        onChange={handleChange}/>
                    </div>
                    <div className="flex flex-col items-center text-center">
                        <label className="mb-2" for="d_dec">Descarga decrementales</label>
                        <input type="number" className="w-full border border-gray-300 rounded p-2"
                        name="descargaDecre"
                        value={formData.seccion1?.descargaDecre || ""}
                        onChange={handleChange}
                        />
                    </div>
                    <div className="flex flex-col items-center text-center">
                        <label className="mb-2" for="o_dec">Otros decrementales</label>
                        <input type="number" className="w-full border border-gray-300 rounded p-2"
                        name="otrosDecre"
                        value={formData.seccion1?.otrosDecre || ""}
                        onChange={handleChange}
                        />
                    </div>
                    <div className="flex flex-col items-center text-center">
                        <label className="mb-2" for="acu_ele">Acuse electrónico de validación/Codigo de aceptacion.</label>
                        <input type="text"  className="w-full border border-gray-300 rounded p-2"
                        name="acuseEle"
                        value={formData.seccion1?.acuseEle || ""}
                        onChange={handleChange}
                        />
                    </div>
                    <div className="flex flex-col items-center text-center">
                        <label className="mb-2" for="c_barras">Codigo de barras</label>
                        <input type="text" className="w-full border border-gray-300 rounded p-2"
                        name="codigoBarras"
                        value={formData.seccion1?.codigoBarras || ""}
                        onChange={handleChange}
                        />
                    </div>
                    <div className="flex flex-col items-center text-center">
                        <label className="mb-2" for="c_adua_des">Clave de la sección aduanera de despacho.</label>
                        <input type="text" className="w-full border border-gray-300 rounded p-2"
                        name="claveSecAdu"
                        value={formData.seccion1?.claveSecAdu || ""}
                        onChange={handleChange}
                        />
                    </div>
                    <div className="flex flex-col items-center text-center">
                        <label className="mb-2" for="ma_nu_t">Marcas, números y total de bultos.</label>
                        <input type="text" className="w-full border border-gray-300 rounded p-2"
                        name="marcas"
                        value={formData.seccion1?.marcas || ""}
                        onChange={handleChange}
                        />
                    </div>
        
                    <div className="flex flex-col items-center text-center">
                        <h3 class="fechas_letra">Fechas</h3>
                        <label className="mb-2" for="fec_entr">Entrada</label>
                        <input type="date"  className="w-60 border border-gray-300 rounded p-2"
                        name="fechaEntrada"
                        value={formData.seccion1?.fechaEntrada || ""}
                        onChange={handleChange}
                        required
                        />
                        <label className="mb-2" for="fec_sal">Pago/Salida</label>
                        <input type="date" className="w-60 border border-gray-300 rounded p-2"
                        name="fechaSalida"
                        value={formData.seccion1?.fechaSalida || ""}
                        onChange={handleChange}
                        required
                        />
                    </div>
                </div>
            </section>   
            <h3 className="text-lg mb-4 text-center">Tasas a nivel de pedimento</h3>
                <div >
                    {sections.map((section) => (
                        <div key={section.id} className="grid grid-cols-3 gap-4 bg-gray-200 p-4 rounded mb-4">
                            <div>
                                <label className="mb-2 block">Contribución</label>
                                <select
                                    className="w-full border border-gray-300 rounded p-2 bg-white"
                                    value={section.contribucion}
                                    onChange={(e) => handleSectionChange(section.id, "contribucion", e.target.value)}
                                >
                                    <option value="" disabled>
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
                                    className="w-full border border-gray-300 rounded p-2 bg-white"
                                    value={section.clave}
                                    onChange={(e) => handleSectionChange(section.id, "clave", e.target.value)}
                                >
                                    <option value="" disabled>
                                        Seleccione una opción
                                    </option>
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
                                    value={section.tasa}
                                    onChange={(e) => handleSectionChange(section.id, "tasa", e.target.value)}
                                />
                            </div>
                            <div className="col-span-3 text-right">
                                <button
                                    className="btn-eliminar"
                                    onClick={() => handleRemoveSection(section.id)}
                                >
                                    Eliminar Contribución
                                </button>
                            </div>
                        </div>
                    ))}
                    <div className="mb-4 text-center">
                        <button
                            className="btn-agregar"
                            onClick={handleAddSection}
                        >
                            Agregar Contribución
                        </button>
                    </div>
                </div>


            <h3 className="text-lg mb-4 text-center">Cuadro de liquidacion</h3>
                <div>
                    {sections2.map((section2) => (
                    <CuaLi
                        key={section2.id}
                        onRemove={() => handleRemoveSection2(section2.id)}
                        section2={section2}
                        onChange={handleSection2Change}
                    />))}
                    {/*Boton para agregar contribuciones*/}
                    <div className="mb-4 text-center">
                        <button
                        className="btn-agregar"
                        onClick={handleAddSection2}>
                            Agregar CuaLi
                        </button>
                    </div>
                </div>
                <div className="grid grid-cols-3 gap-4">
                    <div className="flex flex-col items-center text-center">
                        <label className="mb-2" for="efec">Efectivo</label>
                        <input className="w-full border border-gray-300 rounded p-2" type="number" 
                        name="efec"
                        value={formData.seccion1?.efec || ""}
                        onChange={handleChange}
                        />
                    </div>
                    <div className="flex flex-col items-center text-center">
                        <label className="mb-2" for="otro_efec">Otros</label>
                        <input className="w-full border border-gray-300 rounded p-2" type="number" 
                        name="otros"
                        value={formData.seccion1?.otros || ""}
                        onChange={handleChange} />
                    </div>
                    <div className="flex flex-col items-center text-center">
                        <label className="mb-2" for="total">Total</label>
                        <input className="w-full border border-gray-300 rounded p-2" type="number" 
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
