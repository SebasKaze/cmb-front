import React, { useState, useEffect } from "react";

function Seccion7({ formData, setFormData }) {
    const [sections, setSections] = useState(formData.seccion7 || []);

    useEffect(() => {
        if (formData.seccion7 && formData.seccion7 !== sections) {
            setSections(formData.seccion7);
        }
    }, [formData.seccion7]);

    // Sincronizar formData.seccion7 con sections
    useEffect(() => {
        setFormData((prevData) => ({ ...prevData, seccion7: sections }));
    }, [sections]);

    // Agregar nueva sección
    const handleAddSection = () => {
        const newSection = {
            id_partida: Date.now(),  // Cambio de id a id_partida
            sec: "",
            fraccion: "",
            vinc: "",
            Subd: "",
            MetS7P: "",
            UMCS7P: "",
            CantiUMCS7P: "",
            UMTS7P: "",
            CantiUMTS7P: "",
            PVCS7P: "",
            PODS7P: "",
            DescS7P: "",
            VALADUS7P: "",
            IMPOPRES7P: "",
            PRECIOUNITS7P: "",
            VALAGRES7P: "",
            MarcaS7P: "",
            ModeloS7P: "",
            CodigoProS7P: "",
            ObserS7P: "",
            contribuciones: [],
        };
        setSections((prevSections) => {
            const updatedSections = [...prevSections, newSection];
            console.log('Updated Sections:', updatedSections); // Esto imprimirá el array antes de actualizar el estado
            setFormData((prevData) => ({ ...prevData, seccion7: updatedSections }));
            return updatedSections;
        });
    };

    // Agregar una nueva contribución dentro de una sección
    const handleAddContribution = (sectionId_partida) => {  // Cambié sectionId a sectionId_partida
        setSections((prevSections) => {
            const updatedSections = prevSections.map((section) =>
                section.id_partida === sectionId_partida  // Comparando con id_partida
                    ? {
                          ...section,
                          contribuciones: [
                              ...section.contribuciones,
                              {
                                  id_contri: Date.now(),  // Uso de id_contri
                                  con: "",
                                  tasa: "",
                                  tt: "",
                                  fp: "",
                                  importe: "",
                              },
                          ],
                      }
                    : section
            );
            setFormData((prevData) => ({ ...prevData, seccion7: updatedSections }));
            return updatedSections;
        });
    };

// Eliminar una contribución de una sección
const handleRemoveContribution = (sectionId_partida, contributionId_contri) => {
    console.log('Removing contribution:', contributionId_contri, 'from section:', sectionId_partida);
    setSections((prevSections) => {
        const updatedSections = prevSections.map((section) =>
            section.id_partida === sectionId_partida  // Comprobamos si id_partida coincide
                ? {
                      ...section,
                      contribuciones: section.contribuciones.filter(
                          (contribution) => {
                              console.log('Checking contribution id_contri:', contribution.id_contri); // Verifica cada id_contri
                              return contribution.id_contri !== contributionId_contri; // Comparamos con id_contri
                          }
                      ),
                  }
                : section
        );
        setFormData((prevData) => ({ ...prevData, seccion7: updatedSections }));
        return updatedSections;
    });
};

// Eliminar una sección
const handleRemoveSection = (id_partida) => {
    console.log('Removing section with id_partida:', id_partida);
    setSections((prevSections) => {
        const updatedSections = prevSections.filter((section) => {
            console.log('Checking section id_partida:', section.id_partida); // Verifica cada id_partida
            return section.id_partida !== id_partida; // Comparamos con id_partida
        });
        setFormData((prevData) => ({ ...prevData, seccion7: updatedSections }));
        return updatedSections;
    });
};

    return (
        <div className="p-6">
            <h2 className="text-xl font-bold mb-4 text-center">Partidas</h2>
            <section>
                <div>
                    {sections.map((section) => (
                        <div key={section.id_partidas} className="mb-6">
                            <div className="grid grid-cols-4 gap-4 bg-emerald-100 w-9/12 mx-auto p-4 rounded">
                                <div className="flex flex-col items-center text-center">
                                    <label className="mb-2">Sec</label>
                                    <input
                                        className="w-full border border-gray-300 rounded p-2"
                                        type="text"
                                        name="sec"
                                        value={section.sec}
                                        onChange={(e) => handleSectionChange(section.id, "sec", e.target.value)}
                                    />
                                </div>
                                <div className="flex flex-col items-center text-center">
                                    <label className="mb-2">Fraccion</label>
                                    <input
                                        className="w-full border border-gray-300 rounded p-2"
                                        type="text"
                                        value={section.fraccion}
                                        onChange={(e) => handleSectionChange(section.id, "fraccion", e.target.value)}
                                    />
                                </div>
                                <div className="flex flex-col items-center text-center">
                                    <label className="mb-2">Vinc.</label>
                                    <input
                                        className="w-full border border-gray-300 rounded p-2"
                                        type="text"
                                        value={section.vinc}
                                        onChange={(e) => handleSectionChange(section.id, "vinc", e.target.value)}
                                    />
                                </div>
                                <div className="flex flex-col items-center text-center">
                                    <label className="mb-2">Subd.</label>
                                    <input
                                        className="w-full border border-gray-300 rounded p-2"
                                        type="text"
                                        value={section.Subd}
                                        onChange={(e) => handleSectionChange(section.id, "Subd", e.target.value)}
                                    />
                                </div>
                                <div className="flex flex-col items-center text-center">
                                    <label className="mb-2">Met. Val.</label>
                                    <input
                                        className="w-full border border-gray-300 rounded p-2"
                                        type="text"
                                        value={section.MetS7P}
                                        onChange={(e) => handleSectionChange(section.id, "MetS7P", e.target.value)}
                                    />
                                </div>
                                <div className="flex flex-col items-center text-center">
                                    <label className="mb-2">UMC</label>
                                    <input
                                        className="w-full border border-gray-300 rounded p-2"
                                        type="number"
                                        value={section.UMCS7P || 0}
                                        onChange={(e) => handleSectionChange(section.id, "UMCS7P", e.target.value)}
                                    />
                                </div>
                                <div className="flex flex-col items-center text-center">
                                    <label className="mb-2">Cantidad UMC</label>
                                    <input
                                        className="w-full border border-gray-300 rounded p-2"
                                        type="number"
                                        value={section.CantiUMCS7P}
                                        onChange={(e) => handleSectionChange(section.id, "CantiUMCS7P", e.target.value)}
                                    />
                                </div>
                                <div className="flex flex-col items-center text-center">
                                    <label className="mb-2">UMT</label>
                                    <input
                                        className="w-full border border-gray-300 rounded p-2"
                                        type="number"
                                        value={section.UMTS7P}
                                        onChange={(e) => handleSectionChange(section.id, "UMTS7P", e.target.value)}
                                    />
                                </div>
                                <div className="flex flex-col items-center text-center">
                                    <label className="mb-2">Cantidad UMT</label>
                                    <input
                                        className="w-full border border-gray-300 rounded p-2"
                                        type="number"
                                        value={section.CantiUMTS7P}
                                        onChange={(e) => handleSectionChange(section.id, "CantiUMTS7P", e.target.value)}
                                    />
                                </div>
                                <div className="flex flex-col items-center text-center">
                                    <label className="mb-2">P. V/C</label>
                                    <input
                                        className="w-full border border-gray-300 rounded p-2"
                                        type="text"
                                        value={section.PVCS7P}
                                        onChange={(e) => handleSectionChange(section.id, "PVCS7P", e.target.value)}
                                    />
                                </div>
                                <div className="flex flex-col items-center text-center">
                                    <label className="mb-2">P. O/D</label>
                                    <input
                                        className="w-full border border-gray-300 rounded p-2"
                                        type="text"
                                        value={section.PODS7P}
                                        onChange={(e) => handleSectionChange(section.id, "PODS7P", e.target.value)}
                                    />
                                </div>
                                <div className="flex flex-col items-center text-center">
                                    <label className="mb-2">Descripcion</label>
                                    <input
                                        className="w-full border border-gray-300 rounded p-2"
                                        type="text"
                                        value={section.DescS7P}
                                        onChange={(e) => handleSectionChange(section.id, "DescS7P", e.target.value)}
                                    />
                                </div>
                                <div className="flex flex-col items-center text-center">
                                    <label className="mb-2">VAL. ADU/VAL. USD.</label>
                                    <input
                                        className="w-full border border-gray-300 rounded p-2"
                                        type="number"
                                        value={section.VALADUS7P}
                                        onChange={(e) => handleSectionChange(section.id, "VALADUS7P", e.target.value)}
                                    />
                                </div>
                                <div className="flex flex-col items-center text-center">
                                    <label className="mb-2">IMP. PRECIO PAG./VALOR COMERCIAL.</label>
                                    <input
                                        className="w-full border border-gray-300 rounded p-2"
                                        type="number"
                                        value={section.IMPOPRES7P}
                                        onChange={(e) => handleSectionChange(section.id, "IMPOPRES7P", e.target.value)}
                                    />
                                </div>
                                <div className="flex flex-col items-center text-center">
                                    <label className="mb-2">PRECIO UNIT.</label>
                                    <input
                                        className="w-full border border-gray-300 rounded p-2"
                                        type="number"
                                        value={section.PRECIOUNITS7P}
                                        onChange={(e) => handleSectionChange(section.id, "PRECIOUNITS7P", e.target.value)}
                                    />
                                </div>
                                <div className="flex flex-col items-center text-center">
                                    <label className="mb-2">VAL. AGREG.</label>
                                    <input
                                        className="w-full border border-gray-300 rounded p-2"
                                        type="number"
                                        value={section.VALAGRES7P}
                                        onChange={(e) => handleSectionChange(section.id, "VALAGRES7P", e.target.value)}
                                    />
                                </div>
                                <div className="flex flex-col items-center text-center">
                                    <label className="mb-2">MARCA.</label>
                                    <input
                                        className="w-full border border-gray-300 rounded p-2"
                                        type="text"
                                        value={section.MarcaS7P}
                                        onChange={(e) => handleSectionChange(section.id, "MarcaS7P", e.target.value)}
                                    />
                                </div>
                                <div className="flex flex-col items-center text-center">
                                    <label className="mb-2">MODELO.</label>
                                    <input
                                        className="w-full border border-gray-300 rounded p-2"
                                        type="text"
                                        value={section.ModeloS7P}
                                        onChange={(e) => handleSectionChange(section.id, "ModeloS7P", e.target.value)}
                                    />
                                </div>
                                <div className="flex flex-col items-center text-center">
                                    <label className="mb-2">CÓDIGO PRODUCTO.</label>
                                    <input
                                        className="w-full border border-gray-300 rounded p-2"
                                        type="text"
                                        value={section.CodigoProS7P}
                                        onChange={(e) => handleSectionChange(section.id, "CodigoProS7P", e.target.value)}
                                    />
                                </div>
                                <div className="flex flex-col items-center text-center">
                                    <label className="mb-2">Observacion a nivel partida</label>
                                    <input
                                        className="w-full border border-gray-300 rounded p-2"
                                        type="text"
                                        value={section.ObserS7P}
                                        onChange={(e) => handleSectionChange(section.id, "ObserS7P", e.target.value)}
                                    />
                                </div>
                            </div>
                            <h4 className="text-lg font-bold mt-4 text-center">Contribuciones</h4>
                            {section.contribuciones.map((contribution) => (
                                <div key={contribution.id} className="grid grid-cols-5 gap-4 bg-emerald-200 w-7/12 mx-auto p-4 rounded mb-4">
                                    <div className="flex flex-col items-center text-center">
                                        <label className="mb-2">CON</label>
                                        <select
                                            className="w-full border border-gray-300 rounded p-2 bg-white"
                                            value={contribution.con}
                                            onChange={(e) => handleContributionChange(section.id, contribution.id, "con", e.target.value)}>
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
                                    <div className="flex flex-col items-center text-center">
                                        <label className="mb-2">TASA</label>
                                        <input
                                            className="w-full border border-gray-300 rounded p-2"
                                            type="text"
                                            value={contribution.tasa}
                                            onChange={(e) => handleContributionChange(section.id, contribution.id, "tasa", e.target.value)}
                                        />
                                    </div>
                                    <div className="flex flex-col items-center text-center">
                                        <label className="mb-2">T.T.</label>
                                        <input
                                            className="w-full border border-gray-300 rounded p-2"
                                            type="text"
                                            value={contribution.tt}
                                            onChange={(e) => handleContributionChange(section.id, contribution.id, "tt", e.target.value)}
                                        />
                                    </div>
                                    <div className="flex flex-col items-center text-center">
                                        <label className="mb-2">F.P.</label>
                                        <input
                                            className="w-full border border-gray-300 rounded p-2"
                                            type="text"
                                            value={contribution.fp}
                                            onChange={(e) => handleContributionChange(section.id, contribution.id, "fp", e.target.value)}
                                        />
                                    </div>
                                    <div className="flex flex-col items-center text-center">
                                        <label className="mb-2">IMPORTE</label>
                                        <input
                                            className="w-full border border-gray-300 rounded p-2"
                                            type="text"
                                            value={contribution.importe}
                                            onChange={(e) => handleContributionChange(section.id, contribution.id, "importe", e.target.value)}
                                        />
                                    </div>
                                    <div className="col-span-5 text-right">
                                        <button
                                            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                                            onClick={() => handleRemoveContribution(section.id_partida, contribution.id_contri)}>
                                            Eliminar Contribución
                                        </button>
                                    </div>
                                </div>
                            ))}
                            <div className="mb-4 text-center">
                                <button
                                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                                    onClick={() => handleAddContribution(section.id_partida)}>
                                    Agregar Contribución
                                </button>
                            </div>
                            <div className="text-right">
                                <button
                                    className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                                    onClick={() => handleRemoveSection(section.id_partida)}>
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