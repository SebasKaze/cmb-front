import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function NavBar({ userData }) {
  const backConection = import.meta.env.VITE_BACK_URL;
  const navigate = useNavigate();
  const [companies, setCompanies] = useState([]);
  const [selectedCompany, setSelectedCompany] = useState(
    localStorage.getItem("selectedEmpresa") || userData?.id_empresa || ""
  );
  const [addresses, setAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(
    localStorage.getItem("selectedDomicilio") || ""
  );

  useEffect(() => {
    fetch(`${backConection}/api/infoempre`)
      .then((response) => response.json())
      .then((data) => {
        setCompanies(data);
        if (data.length > 0) {
          const initialCompany = selectedCompany || data[0].id_empresa;
          setSelectedCompany(initialCompany);
          fetchAddresses(initialCompany);
        }
      })
      .catch((error) => console.error("Error al cargar empresas:", error));
  }, [selectedCompany]);

  useEffect(() => {
    if (selectedCompany) {
      fetchAddresses(selectedCompany);
    }
  }, [selectedCompany]);

  const fetchAddresses = (idEmpresa) => {
    fetch(`${backConection}/api/verDomicilios?id_empresa=${idEmpresa}`)
      .then((response) => response.json())
      .then((data) => {
        setAddresses(data);
        if (data.length > 0) {
          const initialAddress = selectedAddress || userData?.id_domicilio || data[0].id_domicilio;
          setSelectedAddress(initialAddress);
          updateLocalStorage(idEmpresa, initialAddress);
        }
      })
      .catch((error) => console.error("Error al cargar domicilios:", error));
  };

  const updateLocalStorage = (empresaId, domicilioId) => {
    localStorage.setItem("selectedEmpresa", empresaId);
    localStorage.setItem("selectedDomicilio", domicilioId);
    const storedUserData = JSON.parse(localStorage.getItem("userData")) || {};
    storedUserData.id_empresa = empresaId;
    storedUserData.id_domicilio = domicilioId;
    localStorage.setItem("userData", JSON.stringify(storedUserData));
  };

  const handleCompanyChange = (event) => {
    const selectedId = event.target.value;
    setSelectedCompany(selectedId);
    setSelectedAddress("");
    updateLocalStorage(selectedId, "");
    window.location.reload();
  };
  
  const handleAddressChange = (event) => {
    const selectedId = event.target.value;
    setSelectedAddress(selectedId);
    updateLocalStorage(selectedCompany, selectedId);
    window.location.reload();
  };
  

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("selectedEmpresa");
    localStorage.removeItem("selectedDomicilio");
    localStorage.removeItem("userData");
    window.location.href = "/login";
  };

  return (
    <div className="navbar fixed top-0 left-0 w-full z-10 shadow-md bg-gradient-to-r from-blue-200 to-slate-300">
      <div className="navbar-start">
        <div className="flex items-center gap-2">
          <img className="w-14" src="https://imgur.com/Ir9JUQq.png" alt="Logo" />
          <div className="flex flex-col">
            <span className="text-2xl font-bold text-yellow-800">SMController</span>
            <span className="text-2xs text-yellow-600">Supply Management Controller</span>
          </div>
        </div>
      </div>

      <div className="navbar-end flex items-center p-2 gap-4">
        {(userData.tipo_de_cuenta === 1 || userData.tipo_de_cuenta === 4) && companies.length > 0 && (
          <div className="relative">
            <select 
              className="select-custom bg-yellow-700 text-white"
              value={selectedCompany} 
              onChange={handleCompanyChange}
            >
              {companies.map((company) => (
                <option key={company.id_empresa} value={company.id_empresa}>{company.nombre}</option>
              ))}
            </select>
            <div className="select-arrow">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
        )}
        {(userData.tipo_de_cuenta !== 3) && (
          addresses.length > 0 ? (
            <div className="relative">
              <select
                className="select-custom bg-yellow-700 text-white"
                value={selectedAddress}
                onChange={handleAddressChange}
              >
                {addresses.map((addr) => (
                  <option key={addr.id_domicilio} value={addr.id_domicilio}>{addr.domicilio}</option>
                ))}
              </select>
              <div className="select-arrow">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          ) : (
            <span className="text-gray-500 text-sm">No hay domicilios disponibles</span>
          )
        )}

        <div className="text-right mr-2">
          <h2 className="font-bold text-yellow-900">{userData?.nombre_empresa || "Empresa no disponible"}</h2>
          <h3 className="text-m text-yellow-700">{userData?.nombre_usuario || "Usuario no disponible"}</h3>
        </div>

        <div className="dropdown dropdown-left">
          <div tabIndex="0" role="button" className="avatar px-2 btn btn-ghost btn-circle hover:bg-green-200">
            <div className="w-10 rounded-full ring-2 ring-red-700">
              <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" alt="Usuario" />
            </div>
          </div>
          <ul tabIndex="0" className="menu menu-sm dropdown-content bg-green-50 rounded-box z-[1] mt-3 w-52 p-2 shadow-lg border border-green-200">
            <li>
              <a 
                onClick={() => navigate("/datosgenerales")} 
                className="hover:bg-yellow-600 text-gray-800"
              >
                Datos generales
              </a>
            </li>
            <li>
              <a 
                onClick={() => navigate("/domicilios")} 
                className="hover:bg-yellow-600 text-gray-800"
              >
                Domicilios
              </a>
            </li>
            <li>
            {(userData.tipo_de_cuenta == 1) && (<a 
                onClick={() => navigate("/registro")} 
                className="hover:bg-yellow-600 text-gray-800"
              >
                Registros
              </a>)}
            </li>
            <li className="mt-2">
              <button 
                onClick={handleLogout} 
                className="w-full bg-red-500 py-2 px-4 rounded-lg hover:bg-red-600 text-white font-medium transition-colors"
              >
                Cerrar Sesión
              </button>
            </li>
          </ul>
        </div>
      </div>

      <style jsx>{`
        .select-custom {
          appearance: none;
          padding: 0.5rem 2rem 0.5rem 1rem;
          border-radius: 0.5rem;
          border: none;
          font-size: 0.875rem;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
        }
        
        .select-custom:hover {
          opacity: 0.9;
        }
        
        .select-custom:focus {
          outline: none;
          box-shadow: 0 0 0 2px rgba(72, 187, 120, 0.5);
        }
        
        .select-arrow {
          position: absolute;
          top: 50%;
          right: 0.75rem;
          transform: translateY(-50%);
          pointer-events: none;
          color: white;
        }
      `}</style>
    </div>
  );
}