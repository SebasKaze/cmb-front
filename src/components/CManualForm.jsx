import React, { useState } from "react";
import Section1 from "./CManual/Seccion1";
import Section2 from "./CManual/Seccion2";
import Section3 from "./CManual/Seccion3";
import Section4 from "./CManual/Seccion4";
import Section5 from "./CManual/Seccion5";
import Section6 from "./CManual/Seccion6";
import Section7 from "./CManual/Seccion7";


function CargaManual() {
    const [activeTab, setActiveTab] = useState("section1");

    const [formData, setFormData] = useState({
        seccion1: {},
        seccion2: {},
        seccion3: {},
        seccion4: {},
        seccion5: {},
        seccion6: {},
        seccion7: {},
    });
    
    const handleTabClick = (tab) => {
        setActiveTab(tab);
    };

    // Estado para las contribuciones dinámicas
    const [sections, setSections] = useState([]);
    //Estado para cuadro liquidaciones
    const [sections2, setSections2] = useState([]);

    const handleSubmit = async () => {
        try {
            // Combinar formData con las contribuciones dinámicas
            const payload = {
                ...formData, // Datos existentes del formulario
                contribuciones: sections, // Agregar contribuciones dinámicas
                CuadroLiquidacion: sections2,
            };
            const response = await fetch("http://localhost:4000/api/cmpedimento", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(payload),
            });
            if (!response.ok) {
                throw new Error("Error al enviar los datos");
            }
            alert("Datos enviados exitosamente");
        } catch (error) {
            console.error("Error:", error);
        }
    };

    return (
        <div className="pestanas">
        {/* Navegación de pestañas */}
        <div className="tabs flex space-x-4 border-b-2 pb-2">
                {/* Renderizado de pestañas */}
                {["section1", "section2", "section3", "section4", "section5", "section6", "section7"].map((section) => (
                    <div
                        key={section}
                        className={`tab cursor-pointer px-4 py-2 ${
                            activeTab === section ? "text-blue-500 border-b-2 border-blue-500" : "text-gray-500"
                        }`}
                        onClick={() => handleTabClick(section)}>
                        {section.toUpperCase()}
                    </div>
                ))}
            </div>

        {/* Contenido de las pestañas */}
        <div className="tab-content mt-4" style={{ display: "block" }}>
            {activeTab === "section1" && (
                        <Section1 
                        formData={formData}
                        setFormData={setFormData} 
                        sections={sections} 
                        setSections={setSections} 
                        sections2={sections2} // Pasar como prop
                        setSections2={setSections2} // Pasar como prop
                        />
                    )}
            {activeTab === "section2" && < Section2 formData={formData} setFormData={setFormData}/>}
            {activeTab === "section3" && < Section3 formData={formData} setFormData={setFormData}/>}
            {activeTab === "section4" && < Section4 formData={formData} setFormData={setFormData}/>}
            {activeTab === "section5" && < Section5 formData={formData} setFormData={setFormData}/>}
            {activeTab === "section6" && < Section6 formData={formData} setFormData={setFormData}/>}
            {activeTab === "section7" && < Section7 />}
        </div>
        <button
            onClick={handleSubmit}
            className="mt-4 px-6 py-2 bg-blue-500 text-white rounded">
            Enviar Datos
        </button>
    </div>
    );
}

export default CargaManual;
