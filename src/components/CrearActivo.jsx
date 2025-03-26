import { useState } from "react";
import axios from "axios";

import { useNavigate } from "react-router-dom"; //Necesario Para regresar

//Import iconos
import { IoMdArrowRoundBack } from "react-icons/io";
function cambioCrearActivo() {
    const navigate = useNavigate();//Navegar
        //Regresar
        const Regresar = () => {
            navigate("/activo-fijo"); // Navega a la ruta /nuevo-material
        }
    return (
        <div>
            <button className="btn-crud" onClick={Regresar}>
            <IoMdArrowRoundBack />Regresar
            </button>
            <h1>Crear Activo FIjo</h1>
        </div>
    )
}
export default cambioCrearActivo;