import { useEffect, useState } from "react";
import { Routes, Route, Link, Navigate } from "react-router-dom";
import { FaHome, FaBox, FaUpload, FaCogs, FaWarehouse, FaChartLine, FaArrowCircleLeft, FaArrowCircleDown, FaBars } from "react-icons/fa";
// Empresa
import Domicilios from "../components/Domicilios";
import DatosGenerales from "../components/DatosGenerales";
import Registro from "../components/Registro";
// Cargas
import Pedimento from "../components/Pedimentos";
import PedimentoEditar from "../components/PedimentoEditar";
import PedimentoVer from "../components/PedimentoVer";
import CargarManual from "../components/CManualForm";
import CargaDocumentos from '../components/CargaDocumentos';
// Catalogos
import Materiales from "../components/Materiales";
import MaterialesCarga from  "../components/Materiales_Carga";
import Productos from "../components/Productos";
import ProductosCarga from "../components/Productos_Carga";
// Activo Fijo
import ActivoFijo from "../components/ActivoFijo";
import CrearActivo from "../components/CrearActivo";
// Procesos
import SalidaMercancias from '../components/SalidaMercancia';
import EntradaMercancia from "../components/EntradaMercancia";
import MaterialesUtilizados from '../components/MaterialesUtilizados';
import MaterialesUtilizadosCP from '../components/MaterialUtilizadoCP';
import Saldos from '../components/Saldos';
// DashBoard y footer
import Dashboard from "../components/Dashboard";
import Footer from "../components/Footer";

function Home({ userData }) {
  const [open, setOpen] = useState(true);
  const [subMenuOpen, setSubMenuOpen] = useState({});

  const toggleSubMenu = (menu) => {

    setSubMenuOpen((prev) => ({ ...prev, [menu]: !prev[menu] }));
  
  };

  const menus = [
    userData.tipo_de_cuenta !== 4 && { title: "DashBoard", route: "/", icon: <FaHome /> },
    { title: "Pedimentos", route: "/pedimentos", icon: <FaBox /> },
    userData.tipo_de_cuenta !== 4 && {
      title: "Carga de datos",
      icon: <FaUpload />,
      items: [
        { name: "Carga manual", route: "/carga-manual" },
        { name: "Carga masiva", route: "/carga-masiva" },
        { name: "Carga Documentos", route: "/cargadocumentos" },
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
    userData.tipo_de_cuenta !== 3 && {
      title: "Catálogos",
      icon: <FaChartLine />,
      items: [
        { name: "Materiales", route: "/materiales" },
        { name: "Productos", route: "/productos" },
      ],
    },
  ];

  // Filtrar los menús
  const filteredMenus = menus.filter((menu) => menu); 
  // Asegurar que si "Carga de datos" se oculta, su estado en subMenuOpen también se resetea
  useEffect(() => {
    if (userData.tipo_de_cuenta === 1) {
      setSubMenuOpen(prev => {
        const newState = { ...prev };
        delete newState["Carga de datos"];
        return newState;
      });
    }
  }, [userData.tipo_de_cuenta]);

  return (
<div className="flex flex-col h-screen">
  <div className={`flex flex-1`}>
    {/* Barra lateral */}
    <div
      className={`${
        open ? "w-56" : "w-24"
      }  } duration-300 h-full p-5 pt-8 bg-blue-900 fixed top-0 left-0 z-10 shadow-lg mt-20 overflow-y-auto max-h-screen`}
    >
      <FaBars
        className={`absolute cursor-pointer text-white text-2xl right-7 top-9 border-2 border-gray-700 rounded-full p-1 ${
          !open ? "rotate-180" : ""
        }`}
        onClick={() => setOpen(!open)}
      />
      <div className="flex gap-x-4 items-center">
        <h1
          className={`text-white origin-left font-medium text-xl duration-300 ${
            !open ? "hidden" : "block"
          }`}
        >
          Menú
        </h1>
      </div>
      {/* Menú lateral */}
      <ul className="pt-6 overflow-y-auto h-[calc(100vh-130px)]">
        {filteredMenus.map((menu, index) => (
          <li key={index} className="mb-4">
            {menu.route ? (
              <Link
                to={menu.route}
                className="flex items-center justify-between cursor-pointer text-gray-300 p-2 hover:bg-blue-800 rounded-lg transition-all duration-200"
              >
                <div className="flex items-center">
                  <span className={`mr-2 ${!open ? "hidden" : "block"}`}>
                    {menu.icon}
                  </span>
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
                    <span className={`mr-2 ${!open ? "hidden" : "block"}`}>
                      {menu.icon}
                    </span>
                    <span className={`${!open && "hidden"} duration-300`}>
                      {menu.title}
                    </span>
                  </div>
                  <span className={`text-sm ${!open ? "hidden" : "block"}`}>
                    {subMenuOpen[menu.title] ? (
                      <FaArrowCircleDown />
                    ) : (
                      <FaArrowCircleLeft />
                    )}
                  </span>
                </div>
                {menu.items && subMenuOpen[menu.title] && (
                  <ul className={`pl-4 mt-2 ${!open ? "hidden" : "block"}`}>
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
    {/* Contenedor de contenido principal */}
    <div
      className={`flex flex-col flex-1 h-full ${open ? "ml-56" : "ml-24"} overflow-y-auto`}
    >
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/datosgenerales" element={<DatosGenerales />} />
        <Route path="/domicilios" element={<Domicilios />} />
        <Route path="/registro" element={<Registro />} />
        {/* Elementos del pedimento */}
        <Route path="/pedimentos" element={<Pedimento />} />
        <Route path="/pedimentos/editar/:no_pedimento" element={<PedimentoEditar />} />
        <Route path="/pedimentos/ver/:no_pedimento" element={<PedimentoVer />} />
        <Route path="/carga-manual" element={<CargarManual />} />
        <Route path="/cargadocumentos" element={<CargaDocumentos />} />
        <Route path="/activo-fijo" element={<ActivoFijo />} />
        <Route path="/activo-fijo/crearActivo" element={<CrearActivo />} />
        {/* Catalogos */}
        <Route path="/materiales" element={<Materiales />} />
        <Route path="/productos" element={<Productos />} />
        <Route path="/materiales/nuevomaterial" element={<MaterialesCarga />} />
        <Route path="/productos/nuevoproducto" element={<ProductosCarga />} />
        {/* Procesos */}
        <Route path="/entrada-mercancias" element={<EntradaMercancia />} />
        <Route path="/salida-mercancias" element={<SalidaMercancias />} />
        <Route path="/saldos" element={<Saldos />} />
        <Route path="/materiales-utilizados" element={<MaterialesUtilizados />} />
        <Route path="/materiales-utilizados/cargaproducto" element={<MaterialesUtilizadosCP />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
      <Footer />
    </div>
  </div>
</div>

  );
}export default Home;