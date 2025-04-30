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
    const [activeTab, setActiveTab] = useState("section1");
    const userData = JSON.parse(localStorage.getItem("userData"));
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
    
    const handleTabClick = (tab) => {
        if (["section1", "section2", "section3", "section4", "section5", "section6", "section7"].includes(tab)) {
            setActiveTab(tab);
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
        <div className="main-container">
            <div className="tabs flex justify-center space-x-4 border-b-2 pb-2 ">
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
export default CargaManual;