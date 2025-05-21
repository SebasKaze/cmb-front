import React, { useState } from "react";
import "../App.css";
import Section1 from "./CManual/Seccion1";
import Section2 from "./CManual/Seccion2";
import Section3 from "./CManual/Seccion3";
import Section4 from "./CManual/Seccion4";
import Section5 from "./CManual/Seccion5";
import Section6 from "./CManual/Seccion6";
import Section7 from "./CManual/Seccion7";

function CargaManual() {
    const backConection = import.meta.env.VITE_BACK_URL;
    const [activeTab, setActiveTab] = useState("section1");
    const userData = JSON.parse(localStorage.getItem("userData")) || {};
    const [formData, setFormData] = useState({
        seccion1: {},
        seccion2: {},
        seccion3: {},
        seccion4: {},
        seccion5: {},
        seccion6: {},
        seccion7: [],
    });

    const [sections, setSections] = useState([]);
    const [sections2, setSections2] = useState([]);
    
    const tabs = [
        { id: "section1", name: "Encabezado P.P" },
        { id: "section2", name: "Encabezado S.P" },
        { id: "section3", name: "Datos P. o C." },
        { id: "section4", name: "Datos D." },
        { id: "section5", name: "Datos T. y T." },
        { id: "section6", name: "Candados" },
        { id: "section7", name: "Partidas" }
    ];

    const handleTabClick = (tab) => {
        if (tabs.some(t => t.id === tab)) {
            setActiveTab(tab);
        }
    };

    const handleNext = () => {
        const currentIndex = tabs.findIndex(tab => tab.id === activeTab);
        if (currentIndex < tabs.length - 1) {
            setActiveTab(tabs[currentIndex + 1].id);
        }
    };

    const handlePrev = () => {
        const currentIndex = tabs.findIndex(tab => tab.id === activeTab);
        if (currentIndex > 0) {
            setActiveTab(tabs[currentIndex - 1].id);
        }
    };

    const handleSubmit = async () => {
        try {
            const payload = {
                id_usuario: userData.id_usuario,
                id_empresa: userData.id_empresa,
                nombre_usuario: userData.nombre_usuario,
                id_domicilio: userData.id_domicilio,
                ...formData,
                contribuciones: sections,
                CuadroLiquidacion: sections2,
            };
            const response = await fetch(`${backConection}/api/cmpedimento`, {
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
            
            // Opción 1: Resetear todos los estados y volver a la primera sección
            setFormData({
                seccion1: {},
                seccion2: {},
                seccion3: {},
                seccion4: {},
                seccion5: {},
                seccion6: {},
                seccion7: [],
            });
            setSections([]);
            setSections2([]);
            setActiveTab("section1");
            
            // Opción 2: Recargar la página completamente
            // window.location.reload();
            
        } catch (error) {
            console.error("Error:", error);
            alert("Ocurrió un error al enviar los datos");
        }
    };

    const isLastTab = activeTab === tabs[tabs.length - 1].id;
    const isFirstTab = activeTab === tabs[0].id;

    return (
        <div className="main-container">
            <div>
                <h1>Campos obligatorios:<span className="text-red-600">(*)</span></h1>
            </div>
            <div className="tabs flex justify-center space-x-4 border-b-2 pb-2 ">
                {tabs.map(({ id, name }) => (
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

            <div className="flex justify-center mt-8 space-x-4">
                {!isFirstTab && (
                    <button
                        onClick={handlePrev}
                        className="px-6 py-2 bg-gray-300 text-gray-800 rounded-lg font-medium shadow-md hover:bg-gray-400 hover:shadow-lg transform hover:scale-105 transition duration-200">
                        Anterior
                    </button>
                )}

                {!isLastTab ? (
                    <button
                        onClick={handleNext}
                        className="px-6 py-2 bg-blue-500 text-white rounded-lg font-medium shadow-md hover:bg-blue-600 hover:shadow-lg transform hover:scale-105 transition duration-200">
                        Siguiente
                    </button>
                ) : (
                    <button
                        onClick={handleSubmit}
                        className="px-8 py-3 bg-green-500 text-white rounded-lg font-bold text-lg shadow-md hover:bg-teal-600 hover:shadow-lg transform hover:scale-105 transition duration-200">
                        Enviar Datos
                    </button>
                )}
            </div>

        </div>
    );
}

export default CargaManual;