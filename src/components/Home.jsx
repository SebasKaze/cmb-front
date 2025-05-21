
import { useEffect, useState } from "react";
import { 
  FaHome, FaBox, FaUpload, FaCogs, FaWarehouse, 
  FaChartLine, FaChevronDown, FaChevronRight, FaBars 
} from "react-icons/fa";
import { Routes, Route, Link, Navigate, useLocation } from "react-router-dom";

import { motion, AnimatePresence } from "framer-motion";


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
import CargaMasiva from '../components/CargaMasiva';
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
  const location = useLocation();
  const [activeItem, setActiveItem] = useState("");

  useEffect(() => {
    const currentPath = location.pathname;
    setActiveItem(currentPath);
  }, [location]);
  
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
        { name: "Carga masiva", route: "/cargamasiva" },
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
    <div className="flex flex-col h-screen bg-gray-50">
      <div className="flex flex-1">
        {/* Barra lateral */}
        <motion.div 
          className={`${open ? "w-56" : "w-20"} bg-navbar-prin fixed top-0 left-0 z-10 shadow-lg mt-20 flex flex-col`}
          style={{ height: 'calc(100vh - 5rem)' }}
          initial={{ x: 0 }}
          animate={{ x: 0 }}
        >
          {/* Encabezado del menú */}
          <div className="flex justify-between items-center mb-6 p-5 pt-8">
            {open && (
              <motion.h1 className="text-white font-medium text-xl">
                Menú
              </motion.h1>
            )}
            <button
              onClick={() => setOpen(!open)}
              className="text-white text-2xl hover:bg-gray-700 rounded-full p-2 transition-all duration-200"
            >
              <FaBars className={`${!open && "mx-auto"}`} />
            </button>
          </div>
          
          {/* Contenedor del menú con scroll */}
          <div className="flex-1 overflow-y-auto pb-4">
            <ul className="px-3">
              {filteredMenus.map((menu, index) => (
                <li key={index} className="mb-2">
                  {menu.route ? (
                    <Link
                      to={menu.route}
                      className={`flex items-center p-2 rounded-lg transition-all duration-200 ${
                        activeItem === menu.route 
                          ? "bg-green-600 text-white shadow-md"
                          : "text-gray-300 hover:bg-green-700 hover:text-white"
                      }`}
                    >
                      <span className={`${!open ? "mx-auto" : "mr-3"} text-lg`}>
                        {menu.icon}
                      </span>
                      <motion.span 
                        className={`${!open && "hidden"} whitespace-nowrap`}
                        initial={{ opacity: open ? 1 : 0 }}
                        animate={{ opacity: open ? 1 : 0 }}
                      >
                        {menu.title}
                      </motion.span>
                    </Link>
                  ) : (
                    <div>
                      <div
                        className={`flex items-center p-2 rounded-lg transition-all duration-200 ${
                          subMenuOpen[menu.title] 
                            ? "bg-green-700 text-white"
                            : "text-gray-300 hover:bg-green-700 hover:text-white"
                        }`}
                        onClick={() => toggleSubMenu(menu.title)}
                      >
                        {/* Cambio clave aquí: estructura simplificada */}
                        <div className={`${!open ? "mx-auto" : "flex items-center justify-between w-full"}`}>
                          <span className="text-lg">
                            {menu.icon}
                          </span>
                          {open && (
                            <>
                              <motion.span 
                                className="ml-3"
                                initial={{ opacity: open ? 1 : 0 }}
                                animate={{ opacity: open ? 1 : 0 }}
                              >
                                {menu.title}
                              </motion.span>
                              <span className="text-sm ml-auto">
                                {subMenuOpen[menu.title] ? (
                                  <FaChevronDown className="transition-transform duration-200" />
                                ) : (
                                  <FaChevronRight className="transition-transform duration-200" />
                                )}
                              </span>
                            </>
                          )}
                        </div>
                      </div>
                      
                      <AnimatePresence>
                        {menu.items && subMenuOpen[menu.title] && open && (
                          <motion.ul 
                            className="pl-4 mt-1"
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                          >
                            {menu.items.map((item, idx) => (
                              <motion.li 
                                key={idx}
                                className="mb-1"
                                whileHover={{ x: 5 }}
                              >
                                <Link
                                  to={item.route}
                                  className={`text-sm block p-2 rounded transition-all duration-200 ${
                                    activeItem === item.route
                                      ? "text-white font-medium bg-green-600"
                                      : "text-gray-300 hover:text-white hover:bg-green-800"
                                  }`}
                                >
                                  {item.name}
                                </Link>
                              </motion.li>
                            ))}
                          </motion.ul>
                        )}
                      </AnimatePresence>
                    </div>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </motion.div>

        {/* Contenedor de contenido principal */}
        <div
          className={`flex flex-col flex-1 h-full ${
            open ? "ml-56" : "ml-20"
          } transition-all duration-300 ease-in-out overflow-y-auto`}
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
              <Route path="/cargamasiva" element={<CargaMasiva />} />
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
