export default function NavBar(){
const handleLogout = () => {
  localStorage.removeItem("isAuthenticated");
  window.location.href = "/login";
};
    return(
        <>
        <div className="navbar bg-base-100">
            <div className="navbar-start">
              <div className="btn btn-ghost rounded-2xl">
                <img  className="w-14"src="/src/assets/CMB.png"/>
                <a className="text-4xl">CMB Asociados <span className="text-sm">Anexo 24</span></a>
              </div>
            </div>

            <div className="navbar-end">
            <button className="btn btn-ghost btn-circle">
                <div className="indicator">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                  </svg>
                  <span className="badge badge-xs badge-primary indicator-item"></span>
                </div>
              </button>
              <div className="p-2">
                <h2>Empresa Prueba</h2>
              </div>
              <div className="dropdown dropdown-left">
                <div
                  tabIndex="0"
                  role="button"
                  className="avatar px-2 btn btn-ghost btn-circle">
                  <div className="w-14 rounded">
                    <img
                      src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                      alt="Usuario"
                    />
                  </div>
                </div>
                <ul
                  tabIndex="0"
                  className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow translate-y-8">
                  <li><a>Datos generales</a></li>
                  <li><a>Domicilios</a></li>
                  <li>
                  <button
                    onClick={handleLogout}
                    className="mt-2 bg-red-500 py-1 px-2 rounded hover:bg-red-700">
                    Cerrar Sesión
                  </button>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </>
    )
}