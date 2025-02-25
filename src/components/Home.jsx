import { useState, useEffect } from "react";
import { Routes, Route, Link, Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

//Rutas a componentes
import Footer from "../components/Footer";
import Dashboard from "../components/Dashboard";
import CargarManual from "../components/CManualForm";
import Pedimento from "../components/Pedimentos";
import EntradaMercancia from "../components/EntradaMercancia";
import Materiales from "../components/Materiales";
import MaterialesCarga from  "../components/Materiales_Carga";
import Productos from "../components/Productos";
import ProductosCarga from "../components/Productos_Carga";
import Domicilios from "../components/Domicilios";
import DatosGenerales from "../components/DatosGenerales";
import ActivoFijo from "../components/ActivoFijo";
import Registro from "../components/Registro";

import Sidebar from "./DashBoard2";

// Importar iconos (puedes usar react-icons o cualquier otra librería de iconos)
import { FaHome, FaBox, FaUpload, FaCogs, FaWarehouse, FaChartLine, FaArrowCircleLeft, FaArrowCircleDown } from "react-icons/fa";

function Home({ userData }) {
  const [open, setOpen] = useState(true);
  const [subMenuOpen, setSubMenuOpen] = useState({});

  const toggleSubMenu = (menu) => {
    setSubMenuOpen((prev) => ({ ...prev, [menu]: !prev[menu] }));
  };

  const menus = [
    { title: "DashBoard", route: "/", icon: <FaHome /> },
    { title: "Pedimentos", route: "/pedimentos", icon: <FaBox /> },
    {
      title: "Carga de datos",
      icon: <FaUpload />,
      items: [
        { name: "Carga manual", route: "/carga-manual" },
        { name: "Carga masiva", route: "/carga-masiva" },
      ],
    },
    {
      title: "Procesos",
      icon: <FaCogs />,
      items: [
        { name: "Entrada de Mercancías", route: "/entrada-mercancias" },
        { name: "Salida de Mercancías", route: "/salida-mercancias" },
        { name: "Saldos", route: "/saldos" },
        { name: "Materiales utilizados", route: "/materiales-utilizados" },
      ],
    },
    { title: "Activo Fijo", route: "/activo-fijo", icon: <FaWarehouse /> },
    {
      title: "Catálogos",
      icon: <FaChartLine />,
      items: [
        { name: "Materiales", route: "/materiales" },
        { name: "Productos", route: "/productos" },
      ],
    },
  ];

  return (
    <div className="flex h-screen">
      {/* Barra lateral */}
      <div
        className={`${
          open ? "w-72" : "w-24"
        } duration-300 h-full p-5 pt-8 bg-blue-900 relative shadow-lg`}
      >
        <img
          src="../src/assets/Arrow.png"
          className={`absolute cursor-pointer rounded-full -right-3 top-9 w-9 border-2 border-gray-700 ${
            !open && "rotate-180"
          }`}
          onClick={() => setOpen(!open)}
          alt="Toggle Sidebar"
        />
        <div className="flex gap-x-4 items-center">
          <img
            src="../src/assets/cmb02.png"
            className="cursor-pointer duration-500 w-10"
            alt="Logo"
          />
          <h1
            className={`text-white origin-left font-medium text-xl duration-300 ${
              !open && "scale-0"
            }`}
          >
            Menú
          </h1>
        </div>
        {/* Menú lateral */}
        <ul className="pt-6">
          {menus.map((menu, index) => (
            <li key={index} className="mb-4">
              {menu.route ? (
                <Link
                  to={menu.route}
                  className="flex items-center justify-between cursor-pointer text-gray-300 p-2 hover:bg-blue-800 rounded-lg transition-all duration-200"
                >
                  <div className="flex items-center">
                    <span className="mr-2">{menu.icon}</span>
                    <span className={`${!open && "hidden"} duration-300`}>
                      {menu.title}
                    </span>
                  </div>
                </Link>
              ) : (
                <div>
                  <div
                    className="flex items-center justify-between cursor-pointer text-gray-300 p-2 hover:bg-blue-800 rounded-lg transition-all duration-200"
                    onClick={() => toggleSubMenu(menu.title)}
                  >
                    <div className="flex items-center">
                      <span className="mr-2">{menu.icon}</span>
                      <span className={`${!open && "hidden"} duration-300`}>
                        {menu.title}
                      </span>
                    </div>
                    <span className="text-sm">
                      {subMenuOpen[menu.title] ? (
                        <FaArrowCircleDown />
                      ) : (
                        <FaArrowCircleLeft />
                      )}
                    </span>
                  </div>
                  {menu.items && subMenuOpen[menu.title] && (
                    <ul className="pl-4 mt-2">
                      {menu.items.map((item, idx) => (
                        <li key={idx}>
                          <Link
                            to={item.route}
                            className="text-sm text-gray-300 mb-2 block hover:underline hover:text-white transition-all duration-200"
                          >
                            • {item.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>

      {/* Contenido principal + Footer */}
      <div className="flex flex-col flex-1 h-screen">
        <div className="flex-1 p-7 overflow-auto">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/datosgenerales" element={<DatosGenerales />} />
            <Route path="/domicilios" element={<Domicilios />} />
            <Route path="/registro" element={<Registro />} />
            <Route path="/pedimentos" element={<Pedimento />} />
            <Route path="/carga-manual" element={<CargarManual userData={userData} />} />
            <Route path="/carga-masiva" element={<Sidebar />} />
            <Route path="/entrada-mercancias" element={<EntradaMercancia />} />
            <Route path="/salida-mercancias" element={<h1>Salida de Mercancías</h1>} />
            <Route path="/saldos" element={<h1>Saldos</h1>} />
            <Route path="/materiales-utilizados" element={<h1>Materiales Utilizados</h1>} />
            <Route path="/activo-fijo" element={<ActivoFijo />} />
            <Route path="/materiales" element={<Materiales userData={userData} />} />
            <Route path="/productos" element={<Productos />} />
            <Route path="/materiales/nuevomaterial" element={<MaterialesCarga />} />
            <Route path="/productos/nuevoproducto" element={<ProductosCarga />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </div>
        {/* Footer siempre en la parte inferior */}
        <Footer />
      </div>
    </div>
  );
}

export default Home;