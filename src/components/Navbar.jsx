import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function NavBar({ userData }) {
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
    fetch("http://localhost:4000/api/infoempre")
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
    fetch(`http://localhost:4000/api/verDomicilios?id_empresa=${idEmpresa}`)
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
    <div className="navbar bg-base-100 fixed top-0 left-0 w-full z-10 shadow-md" style={{ backgroundColor: "#ffffff", boxShadow: "0 4px 2px -2px gray" }}>
      <div className="navbar-start">
        <div className="btn btn-ghost rounded-2xl">
          <img className="w-14" src="/src/assets/CMB.png" alt="Logo" />
          <a className="text-4xl">CMB Asociados <span className="text-sm">Anexo 24</span></a>
        </div>
      </div>

      <div className="navbar-end flex items-center p-2">
        {(userData.tipo_de_cuenta === 1 || userData.tipo_de_cuenta === 4) && companies.length > 0 && (
          <select className="select select-bordered mr-2" value={selectedCompany} onChange={handleCompanyChange}>
            {companies.map((company) => (
              <option key={company.id_empresa} value={company.id_empresa}>{company.nombre}</option>
            ))}
          </select>
        )}
        {(userData.tipo_de_cuenta !== 3) && (
          addresses.length > 0 ? (
            <select
              className="select select-bordered mr-2"
              value={selectedAddress}
              onChange={handleAddressChange}
            >
              {addresses.map((addr) => (
                <option key={addr.id_domicilio} value={addr.id_domicilio}>{addr.domicilio}</option>
              ))}
            </select>
          ) : (
            <span className="text-gray-500">No hay domicilios disponibles</span>
          )
        )}

        <div>
          <h2 className="font-bold">{userData?.nombre_empresa || "Empresa no disponible"}</h2>
          <h3>{userData?.nombre_usuario || "Usuario no disponible"}</h3>
        </div>

        <div className="dropdown dropdown-left">
          <div tabIndex="0" role="button" className="avatar px-2 btn btn-ghost btn-circle">
            <div className="w-14 rounded">
              <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" alt="Usuario" />
            </div>
          </div>
          <ul tabIndex="0" className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow translate-y-8">
            <li><a onClick={() => navigate("/datosgenerales")} >Datos generales</a></li>
            <li><a onClick={() => navigate("/domicilios")} >Domicilios</a></li>
            <li><a onClick={() => navigate("/registro")} >Registros</a></li>
            <li>
              <button onClick={handleLogout} className="mt-2 bg-red-500 py-1 px-2 rounded hover:bg-red-700">Cerrar Sesión</button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}