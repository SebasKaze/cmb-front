import { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Usamos useNavigate en lugar de history
import { ExclamationCircleIcon } from '@heroicons/react/24/outline';

// Datos ficticios para las notificaciones (en días restantes)
const notifications = [
    { pedimento: '12345', tiempoRestante: 15 }, // 15 días
    { pedimento: '67890', tiempoRestante: 45 }, // 45 días (1.5 meses)
    { pedimento: '54321', tiempoRestante: 5 },  // 5 días
];

// Estadísticas
const stats = [
    { title: 'Porcentaje de Retorno', value: '0%', icon: ExclamationCircleIcon, color: 'bg-purple-300' },
];

export default function Dashboard() {
    const [selectedNotification, setSelectedNotification] = useState(null);
    const navigate = useNavigate();

    // Función para calcular el color según el tiempo restante
    const getNotificationColor = (tiempoRestante) => {
        if (tiempoRestante < 30) {
            return 'bg-red-300'; // Rojo
        } else if (tiempoRestante >= 30 && tiempoRestante <= 90) {
            return 'bg-orange-300'; // Naranja
        }
    };

    const handleNotificationClick = (pedimento) => {
        setSelectedNotification(pedimento);
        // navigate(`/Pedimento`); // Redirigir a la página de Pedimento (comentado por ahora)
    };

    // Ordenar las notificaciones por tiempo restante (de menor a mayor)
    const sortedNotifications = [...notifications].sort((a, b) => a.tiempoRestante - b.tiempoRestante);

    return (
        <div className="main-container">
            {/* Contenido principal */}
            <div className="p-7">
                <h1 className="text-3xl font-bold text-gray-900 mb-6">Dashboard</h1>

                {/* Estadística: Porcentaje de Retorno */}
                <div className="flex justify-end mb-6">
                    {stats.map((stat, index) => (
                        <div key={index} className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow max-w-xs">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-gray-500">{stat.title}</p>
                                    <p className="text-2xl font-bold mt-2">{stat.value}</p>
                                </div>
                                <div className={`${stat.color} p-4 rounded-lg`}>
                                    <stat.icon className="w-6 h-6 text-gray-700" />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Listado de notificaciones */}
                <div className="bg-white p-6 rounded-xl shadow-sm">
                    <h2 className="text-xl font-semibold mb-4">Pedimentos proximos a vencer</h2>
                    <div>
                        {sortedNotifications.map((notification, index) => (
                            <div
                                key={index}
                                onClick={() => handleNotificationClick(notification.pedimento)} // No redirige por ahora
                                className={`flex items-center justify-between p-4 mb-4 rounded-lg cursor-pointer ${getNotificationColor(notification.tiempoRestante)}`}
                            >
                                <div className="flex items-center">
                                    {/* Solo agregar el ícono si es rojo (tiempoRestante < 30) */}
                                    {notification.tiempoRestante < 30 && (
                                        <ExclamationCircleIcon className="w-6 h-6 text-gray-700 mr-3" />
                                    )}
                                    <div>
                                        <p className="text-lg font-semibold">Pedimento: {notification.pedimento}</p>
                                        <p className="text-sm text-gray-500">Tiempo restante: {notification.tiempoRestante} días</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}