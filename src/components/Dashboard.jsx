// App.js
import { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { UserIcon, CurrencyDollarIcon, ChartBarIcon, BanknotesIcon  } from '@heroicons/react/24/outline';

// Datos ficticios
const chartData = [
    { month: 'Ene', usuarios: 4000, ventas: 2400 },
    { month: 'Feb', usuarios: 3000, ventas: 1398 },
    { month: 'Mar', usuarios: 2000, ventas: 9800 },
    { month: 'Abr', usuarios: 2780, ventas: 3908 },
    { month: 'May', usuarios: 1890, ventas: 4800 },
    { month: 'Jun', usuarios: 2390, ventas: 3800 },
];

const stats = [
    { title: 'Entradas totales', value: '12,361', icon: UserIcon, color: 'bg-blue-300' },
    { title: 'Ingresos mensuales', value: '$34,545', icon: CurrencyDollarIcon, color: 'bg-orange-300' },
    { title: 'Retorno', value: '113.8%', icon: ChartBarIcon, color: 'bg-purple-300' },
    { title: 'Salidas', value: '110,120', icon: BanknotesIcon , color: 'bg-green-300' },
    ];

export default function Dashboard() {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <div className="min-h-screen bg-gray-50">
        {/* Contenido principal */}
            <div className="p-6">
                <h1 className="text-3xl font-bold text-gray-900 mb-6">Dashboard</h1>
                
                {/* Gráfico */}
                <div className="bg-white p-6 rounded-xl shadow-sm">
                    <h2 className="text-xl font-semibold mb-4">Rendimiento Mensual</h2>
                    <div className="h-80">
                        <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={chartData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="month" />
                            <YAxis />
                            <Tooltip />
                            <Line 
                            type="monotone" 
                            dataKey="ventas" 
                            stroke="#3B82F6" 
                            strokeWidth={2}
                            name="Ventas"
                            />
                            <Line 
                            type="monotone" 
                            dataKey="usuarios" 
                            stroke="#10B981" 
                            strokeWidth={2}
                            name="Usuarios"
                            />
                        </LineChart>
                        </ResponsiveContainer>
                    </div>
                </div>
                {/* Estadísticas */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8 p-6">
                    {stats.map((stat, index) => (
                        <div key={index} className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
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
            </div>
        </div>
    );
}