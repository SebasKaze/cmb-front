import { useState, useEffect, useRef } from 'react';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const sidebarRef = useRef(null);
  const triggerRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        isOpen &&
        !sidebarRef.current?.contains(event.target) &&
        !triggerRef.current?.contains(event.target)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div>
      {/* Botón para abrir el menú */}
      <button
        ref={triggerRef}
        onClick={() => setIsOpen(!isOpen)}
        className="fixed p-4 text-gray-600 hover:text-gray-800 z-20"
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
      </button>

      {/* Sidebar */}
      <aside
        ref={sidebarRef}
        className={`fixed left-0 top-0 h-full bg-white shadow-lg w-64 transform transition-transform duration-300 z-30 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Encabezado del menú */}
        <div className="p-4 border-b">
          <h2 className="text-xl font-semibold">Menú</h2>
        </div>

        {/* Submenús */}
        <div className="p-4">
          {/* Submenú 1 */}
          <div className="mb-4">
            <h3 className="font-medium mb-2">Productos</h3>
            <ul className="space-y-1">
              <li>
                <a href="#" className="block p-2 hover:bg-gray-100 rounded">
                  Todos los productos
                </a>
              </li>
              <li>
                <a href="#" className="block p-2 hover:bg-gray-100 rounded">
                  Categorías
                </a>
              </li>
            </ul>
          </div>

          {/* Submenú 2 */}
          <div className="mb-4">
            <h3 className="font-medium mb-2">Configuración</h3>
            <ul className="space-y-1">
              <li>
                <a href="#" className="block p-2 hover:bg-gray-100 rounded">
                  Perfil
                </a>
              </li>
              <li>
                <a href="#" className="block p-2 hover:bg-gray-100 rounded">
                  Seguridad
                </a>
              </li>
            </ul>
          </div>
        </div>
      </aside>

      {/* Overlay para móviles */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/30 z-20 lg:hidden"></div>
      )}
    </div>
  );
};

export default Sidebar;