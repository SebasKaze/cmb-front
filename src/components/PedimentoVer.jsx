import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Section1 from "./PedimentosSeccionesVer/Seccion1";
import Section2 from "./PedimentosSeccionesVer/Seccion2";
import Section3 from "./PedimentosSeccionesVer/Seccion3";
import Section4 from "./PedimentosSeccionesVer/Seccion4";
import Section5 from "./PedimentosSeccionesVer/Seccion5";
import Section6 from "./PedimentosSeccionesVer/Seccion6";
import Section7 from "./PedimentosSeccionesVer/Seccion7";
import { useNavigate } from "react-router-dom";

function PedimentoVer() {
    const backConection = import.meta.env.VITE_BACK_URL;
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
                const response = await fetch(`${backConection}/api/consultaPedimento/${no_pedimento}`);
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

    return (
        <div className="pestanas">
            <div className="tabs flex justify-center space-x-4 border-b-2 pb-2 pt-8">
                {[
                    { key: "section1", label: "Encabezado P.P" },
                    { key: "section2", label: "Encabezado S.P" },
                    { key: "section3", label: "Datos P. o C." },
                    { key: "section4", label: "Datos D." },
                    { key: "section5", label: "Datos T. y T." },
                    { key: "section6", label: "Candados" },
                    { key: "section7", label: "Partidas" }
                ].map((section) => (
                    <div
                        key={section.key}
                        className={`tab cursor-pointer px-4 py-2 ${activeTab === section.key ? "text-blue-500 border-b-2 border-blue-500" : "text-gray-500"}`}
                        onClick={() => handleTabClick(section.key)}
                    >
                        {section.label}  {/* Nombre personalizado */}
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
                {activeTab === "section2" && <Section2 formData={formData} setFormData={setFormData} />}
                {activeTab === "section3" && <Section3 formData={formData} setFormData={setFormData} />}
                {activeTab === "section4" && <Section4 formData={formData} setFormData={setFormData} />}
                {activeTab === "section5" && <Section5 formData={formData} setFormData={setFormData} />}
                {activeTab === "section6" && <Section6 formData={formData} setFormData={setFormData} />}
                {activeTab === "section7" && <Section7 formData={formData} setFormData={setFormData} />}
            </div>
        </div>
    );
    
}

export default PedimentoVer;