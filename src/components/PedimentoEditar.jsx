import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Section1 from "./PedimentosSecciones/Seccion1";
import Section2 from "./PedimentosSecciones/Seccion2";
import Section3 from "./PedimentosSecciones/Seccion3";
import Section4 from "./PedimentosSecciones/Seccion4";
import Section5 from "./PedimentosSecciones/Seccion5";
import Section6 from "./PedimentosSecciones/Seccion6";
import Section7 from "./PedimentosSecciones/Seccion7";
import { useNavigate } from "react-router-dom";

function PedimentoEditar() {
    const { no_pedimento } = useParams();
    const [activeTab, setActiveTab] = useState("section1");
    const userData = JSON.parse(localStorage.getItem("userData"));
    const [originalData, setOriginalData] = useState(null);
    const [formattedOriginalData, setFormattedOriginalData] = useState(null);
    const [formData, setFormData] = useState({
        seccion1: {},
        seccion1_2: {},
        seccion2: {},
        seccion3: {},
        seccion4: {},
        seccion5: {},
        seccion6: {},
        seccion7: [],
    });

    const [sections, setSections] = useState([]);
    const [sections2, setSections2] = useState([]);

    useEffect(() => {
        const fetchPedimento = async () => {
            try {
                const response = await fetch(`http://localhost:4000/api/consultaPedimento/${no_pedimento}`);
                if (!response.ok) {
                    throw new Error("Error al obtener el pedimento");
                }
                const data = await response.json();
    
                // Agregamos cuadroLiquidacion y contribuciones (tasas) al objeto original
                const completeData = {
                    ...data,
                    cuadroLiquidacion: data.cuadroLiquidacion || [],
                    contribuciones: data.contribuciones || []
                };
    
                setOriginalData(completeData); // Guardamos los datos originales con las tasas y cuadro de liquidación
    
                // Reformateo de los datos incluyendo cuadroLiquidacion y contribuciones
                const formattedData = {
                    seccion1: completeData.pedimento || {},
                    seccion1_2: completeData.encabezado || {},
                    seccion2: completeData.encabezado_sec || {},
                    seccion3: completeData.proveedor || {},
                    seccion4: completeData.destinatarios || {},
                    seccion5: completeData.transportes || {},
                    seccion6: completeData.candados || {},
                    seccion7: completeData.partidas || [],
                    cuadroLiquidacion: completeData.cuadroLiquidacion || [],
                    contribuciones: completeData.contribuciones || []
                };
    
                setSections(completeData.contribuciones);
                setSections2(completeData.cuadroLiquidacion);
                setFormattedOriginalData(formattedData);
                setFormData(formattedData);

            } catch (error) {
                console.error("Error al cargar el pedimento:", error);
            }
        };
    
        if (!originalData) {
            fetchPedimento();
        }
    }, [no_pedimento]); 
    
    
    const handleTabClick = (tab) => {
        setActiveTab(tab);
    };

    //Funcion para obtener 
    const getDifferences = (original, updated) => {
        let changes = {};
    
        Object.keys(updated).forEach((key) => {
            if (Array.isArray(updated[key])) {
                if (key === "seccion7") {
                    const originalArray = original[key] || [];
                    const updatedArray = updated[key] || [];
    
                    const added = updatedArray.filter(
                        (newItem) => !originalArray.some((oldItem) => oldItem.id_partida === newItem.id_partida)
                    );
    
                    const modified = updatedArray.filter((newItem) => {
                        const oldItem = originalArray.find((old) => old.id_partida === newItem.id_partida);
                        return oldItem && JSON.stringify(oldItem) !== JSON.stringify(newItem);
                    });
    
                    const removed = originalArray
                        .filter(
                            (oldItem) => !updatedArray.some((newItem) => newItem.id_partida === oldItem.id_partida)
                        )
                        .map((item) => item.id_partida);
    
                    if (added.length || modified.length || removed.length) {
                        changes[key] = { added, modified, removed };
                    }
                    updatedArray.forEach((updatedPartida) => {
                        const originalPartida = originalArray.find(
                            (partida) => partida.id_partida === updatedPartida.id_partida
                        );
    
                        if (originalPartida) {
                            const originalContribuciones = originalPartida.contribuciones || [];
                            const updatedContribuciones = updatedPartida.contribuciones || [];
    
                            const contribucionesAdded = updatedContribuciones.filter(
                                (newContrib) =>
                                    !originalContribuciones.some((oldContrib) => oldContrib.id_tasa === newContrib.id_tasa)
                            );
    
                            const contribucionesModified = updatedContribuciones.filter((newContrib) => {
                                const oldContrib = originalContribuciones.find(
                                    (old) => old.id_tasa === newContrib.id_tasa
                                );
                                return oldContrib && JSON.stringify(oldContrib) !== JSON.stringify(newContrib);
                            });
    
                            const contribucionesRemoved = originalContribuciones
                                .filter(
                                    (oldContrib) =>
                                        !updatedContribuciones.some((newContrib) => newContrib.id_tasa === oldContrib.id_tasa)
                                )
                                .map((item) => item.id_tasa);
    
                            if (contribucionesAdded.length || contribucionesModified.length || contribucionesRemoved.length) {
                                if (!changes[key]) {
                                    changes[key] = {};
                                }
                                changes[key].contribuciones = changes[key].contribuciones || [];
                                changes[key].contribuciones.push({
                                    id_partida: updatedPartida.id_partida,
                                    added: contribucionesAdded,
                                    modified: contribucionesModified,
                                    removed: contribucionesRemoved
                                });
                            }
                        }
                    });
                }
    
                if (key === "contribuciones") {
                    const originalArray = original[key] || [];
                    const updatedArray = updated[key] || [];
    
                    const added = updatedArray.filter(
                        (newItem) => !originalArray.some((oldItem) => oldItem.id_tasa === newItem.id_tasa)
                    );
    
                    const modified = updatedArray.filter((newItem) => {
                        const oldItem = originalArray.find((old) => old.id_tasa === newItem.id_tasa);
                        return oldItem && JSON.stringify(oldItem) !== JSON.stringify(newItem);
                    });
    
                    const removed = originalArray
                        .filter(
                            (oldItem) => !updatedArray.some((newItem) => newItem.id_tasa === oldItem.id_tasa)
                        )
                        .map((item) => item.id_tasa);
                    if (added.length || modified.length || removed.length) {
                        changes[key] = { added, modified, removed };
                    }
                }
    
                if (key === "cuadroLiquidacion") {
                    const originalArray = original[key] || [];
                    const updatedArray = updated[key] || [];
    
                    const added = updatedArray.filter(
                        (newItem) => !originalArray.some((oldItem) => oldItem.id_cua === newItem.id_cua)
                    );
    
                    const modified = updatedArray.filter((newItem) => {
                        const oldItem = originalArray.find((old) => old.id_cua === newItem.id_cua);
                        return oldItem && JSON.stringify(oldItem) !== JSON.stringify(newItem);
                    });
    
                    const removed = originalArray
                        .filter(
                            (oldItem) => !updatedArray.some((newItem) => newItem.id_cua === oldItem.id_cua)
                        )
                        .map((item) => item.id_cua);
                    if (added.length || modified.length || removed.length) {
                        changes[key] = { added, modified, removed };
                    }
                }
            } else {
                if (!original.hasOwnProperty(key) || JSON.stringify(original[key]) !== JSON.stringify(updated[key])) {
                    changes[key] = updated[key];
                }
                
            }
        });
    
        return changes;
    };        

    const handleSubmit = async () => {
        if (!formattedOriginalData) return;

        const updatedData = {
            seccion1: formData.seccion1,
            seccion1_2: formData.seccion1_2,
            seccion2: formData.seccion2,
            seccion3: formData.seccion3,
            seccion4: formData.seccion4,
            seccion5: formData.seccion5,
            seccion6: formData.seccion6,
            seccion7: formData.seccion7,
            contribuciones: sections,
            cuadroLiquidacion: sections2,
        };

        const changes = getDifferences(formattedOriginalData, updatedData);

        if (Object.keys(changes).length === 0) {
            alert("No hay cambios para guardar.");
            return;
        }

        const payload = {
            id_usuario: userData.id_usuario,
            id_empresa: userData.id_empresa,
            nombre_usuario: userData.nombre_usuario,
            id_domicilio: userData.id_domicilio,
            no_pedimento,
            ...changes,
        };

        try {
            const response = await fetch("http://localhost:4000/api/edicionPedimento", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(payload),
            });
        
            if (!response.ok) {
                throw new Error("Error al enviar los datos");
            }
        
            alert("Pedimento actualizado");
            navigate("/pedimentos");
        
        } catch (error) {
            console.error("Error:", error);
        }

    };

    return (
        <div className="pestanas">
            <div className="tabs flex space-x-4 border-b-2 pb-2">
                {[
                    { id: "section1", name: "Encabezado P.P" },
                    { id: "section2", name: "Encabezado S.P" },
                    { id: "section3", name: "Datos P. o C." },
                    { id: "section4", name: "Datos D." },
                    { id: "section5", name: "Datos T. y T." },
                    { id: "section6", name: "Candados" },
                    { id: "section7", name: "Partidas" }
                ].map(({ id, name }) => (
                    <div
                        key={id}
                        className={`tab cursor-pointer px-4 py-2 ${
                            activeTab === id ? "text-blue-500 border-b-2 border-blue-500" : "text-gray-500"
                        }`}
                        onClick={() => handleTabClick(id)}>
                        {name}
                    </div>
                ))}
            </div>

            <div className="tab-content mt-4" style={{ display: "block" }}>
                {activeTab === "section1" && (
                    <Section1 
                        formData={formData}
                        setFormData={setFormData} 
                        sections={sections} 
                        setSections={setSections} 
                        sections2={sections2}
                        setSections2={setSections2}
                    />
                )}
                {activeTab === "section2" && <Section2 formData={formData} setFormData={setFormData}/>}
                {activeTab === "section3" && <Section3 formData={formData} setFormData={setFormData}/>}
                {activeTab === "section4" && <Section4 formData={formData} setFormData={setFormData}/>}
                {activeTab === "section5" && <Section5 formData={formData} setFormData={setFormData}/>}
                {activeTab === "section6" && <Section6 formData={formData} setFormData={setFormData}/>}
                {activeTab === "section7" && <Section7 formData={formData} setFormData={setFormData}/>}
            </div>
            <button
                onClick={handleSubmit}
                className="btn-crud">
                Enviar Datos
            </button>
        </div>
    );
}

export default PedimentoEditar;