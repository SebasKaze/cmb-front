import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function NavBar({ userData }) {
  const navigate = useNavigate();
  const [addresses, setAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    let idEmpresa;

    try {
      if (token) {
        const payload = JSON.parse(atob(token.split(".")[1])); // Decodifica el payload del JWT
        idEmpresa = payload.id_empresa;
      }
    } catch (error) {
      console.error("Error al decodificar el token:", error);
    }

    if (idEmpresa) {
        let url = "http://localhost:4000/api/verDomicilios";
        url += `?id_empresa=${idEmpresa}`;
      fetch(url)
        .then((response) => response.json())
        .then((data) => {
          console.log("Listado de domicilios:", data.map((addr) => addr.domicilio)); // Muestra los domicilios en consola
          setAddresses(data);
          if (data.length > 0) {
            setSelectedAddress(data[0].domicilio); // Selecciona el primer domicilio por defecto
          }
        })
        .catch((error) => console.error("Error al cargar domicilios:", error));
    }
  }, []);

  const handleAddressChange = (event) => {
    const selectedDomicilio = event.target.value;
    setSelectedAddress(selectedDomicilio);
    console.log("Domicilio seleccionado:", selectedDomicilio);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    console.log("Token después de logout:", localStorage.getItem("token"));
    window.location.href = "/login";
  };

  return (
    <div className="navbar bg-base-100">
      <div className="navbar-start">
        <div className="btn btn-ghost rounded-2xl">
          <img className="w-14" src="/src/assets/CMB.png" alt="Logo" />
          <a className="text-4xl">
            CMB Asociados <span className="text-sm">Anexo 24</span>
          </a>
        </div>
      </div>

      <div className="navbar-end">
        <div className="p-2 flex items-center">
          <select
            className="select select-bordered mr-2"
            value={selectedAddress}
            onChange={handleAddressChange}
          >
            {addresses.map((addr) => (
              <option key={addr.id_domicilio} value={addr.domicilio}>
                {addr.domicilio}
              </option>
            ))}
          </select>
          <div>
            <h2 className="font-bold">
              {userData?.nombre_empresa || "Empresa no disponible"}
            </h2>
            <h3>{userData?.nombre_usuario || "Usuario no disponible"}</h3>
          </div>
        </div>

        <div className="dropdown dropdown-left">
          <div
            tabIndex="0"
            role="button"
            className="avatar px-2 btn btn-ghost btn-circle"
          >
            <div className="w-14 rounded">
              <img
                src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                alt="Usuario"
              />
            </div>
          </div>
          <ul
            tabIndex="0"
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow translate-y-8"
          >
            <li><a>Datos generales</a></li>
            <li><a>Domicilios</a></li>
            <li>
              <button
                onClick={handleLogout}
                className="mt-2 bg-red-500 py-1 px-2 rounded hover:bg-red-700"
              >
                Cerrar Sesión
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
