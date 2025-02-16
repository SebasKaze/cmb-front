import { useNavigate } from "react-router-dom";


export default function NavBar({ userData }) {
    const navigate = useNavigate();
    const handleLogout = () => {
        localStorage.removeItem("token");    
        console.log("Token después de logout:", localStorage.getItem("token")); // Verifica si se eliminó correctamente
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
            <div className="p-2">
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
                        <li><a onClick={() => navigate("/datosgenerales")}>Datos generales</a></li>
                        <li><a onClick={() => navigate("/domicilios")}>Domicilios</a></li>
                        <li><a onClick={() => navigate("/registro")}>Registros</a></li>
                        <li>
                            <button onClick={handleLogout} className="mt-2 bg-red-500 py-1 px-2 rounded hover:bg-red-700">
                                Cerrar Sesión
                            </button>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
}