import { useState, useEffect } from "react";
import { Routes, Route, Link, Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

//Rutas a componentes
import Footer from "../components/Footer";
import Dashboard from "../components/Dashboard";
import CargarManual from "../components/CManualForm";
import Pedimento from "../components/Pedimentos";
import PedimentosVer from "../components/PedimentosVer";
import EntradaMercancia from "../components/EntradaMercancia";
import Materiales from "../components/Materiales";
import MaterialesCarga from  "../components/Materiales_Carga";
import Productos from "../components/Productos";
import ProductosCarga from "../components/Productos_Carga";


import Sidebar from "./DashBoard2"


function Home() {
  const [open, setOpen] = useState(true);
  const [subMenuOpen, setSubMenuOpen] = useState({});

  const toggleSubMenu = (menu) => {
    setSubMenuOpen((prev) => ({ ...prev, [menu]: !prev[menu] }));
  };



  const menus = [
    { title: "DashBoard", route: "/" },
    { title: "Pedimentos", route: "/pedimentos" },
    {
      title: "Carga de datos",
      items: [
        { name: "Carga manual", route: "/carga-manual" },
        { name: "Carga masiva", route: "/carga-masiva" },
      ],
    },
    {
      title: "Procesos",
      items: [
        { name: "Entrada de Mercancías", route: "/entrada-mercancias" },
        { name: "Salida de Mercancías", route: "/salida-mercancias" },
        { name: "Saldos", route: "/saldos" },
        { name: "Materiales utilizados", route: "/materiales-utilizados" },
      ],
    },
    { title: "Activo Fijo", route: "/activo-fijo" },
    {
      title: "Catálogos",
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
        } duration-300 h-full p-5 pt-8 bg-blue-900 relative`}
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
        <ul className="pt-6">
          {menus.map((menu, index) => (
            <li key={index} className="mb-4">
              {menu.route ? (
                <Link
                  to={menu.route}
                  className="flex items-center justify-between cursor-pointer text-gray-300 p-2 hover:bg-light-white"
                >
                  <span className={`${!open && "hidden"} duration-300`}>
                    {menu.title}
                  </span>
                </Link>
              ) : (
                <div>
                  <div
                    className="flex items-center justify-between cursor-pointer text-gray-300 p-2 hover:bg-light-white"
                    onClick={() => toggleSubMenu(menu.title)}
                  >
                    <span className={`${!open && "hidden"} duration-300`}>
                      {menu.title}
                    </span>
                    <span className="text-sm">
                      {subMenuOpen[menu.title] ? "▲" : "▼"}
                    </span>
                  </div>
                  {menu.items && subMenuOpen[menu.title] && (
                    <ul className="pl-4 mt-2">
                      {menu.items.map((item, idx) => (
                        <li key={idx}>
                          <Link
                            to={item.route}
                            className="text-sm text-gray-300 mb-2 block hover:underline"
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

      {/* Contenido principal */}
      <div className="flex-1 p-7 overflow-auto">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/pedimentos" element={<Pedimento/>} />
          <Route path="/pedimentos/ver/:no_pedimento" element={<PedimentosVer />} />
          <Route path="/carga-manual" element={<CargarManual />} />
          <Route path="/carga-masiva" element={<Sidebar/>} />
          <Route path="/entrada-mercancias" element={<EntradaMercancia/>} />
          <Route path="/salida-mercancias" element={<h1>Salida de Mercancías</h1>} />
          <Route path="/saldos" element={<h1>Saldos</h1>} />
          <Route path="/materiales-utilizados" element={<h1>Materiales Utilizados</h1>} />
          <Route path="/activo-fijo" element={<h1>Activo Fijo</h1>} />
          <Route path="/materiales" element={<Materiales />} />
          <Route path="/productos" element={<Productos/>} />
          <Route path="/materiales/nuevomaterial" element={<MaterialesCarga/>} />
          <Route path="/productos/nuevoproducto" element={<ProductosCarga/>} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
        <Footer />
      </div>
    </div>
  );
}

export default Home;
