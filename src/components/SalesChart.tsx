"use client";
import React, { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface Sale {
  createdAt: number;
  totalQuantity: number;
}

export default function SalesChart() {
  const [salesData, setSalesData] = useState<Sale[]>([]);

  useEffect(() => {
    async function fetchSalesData() {
      try {
        const response = await fetch("/api/payment");
        const data = await response.json(); // Todos los pagos

        // 1️⃣ Filtrar solo los pagos con statusId = 2 (pagados)
        const paidData = data.filter((item: any) => item.statusId === 2);

        // 2️⃣ Agrupar pagos pagados por día
        const salesByDay: Record<string, Sale> = {};

        paidData.forEach((item: any) => {
          const dateKey = new Date(item.createdAt).toLocaleDateString("en-CA"); // YYYY-MM-DD
          const quantity = parseFloat(item.quantity);

          if (salesByDay[dateKey]) {
            salesByDay[dateKey].totalQuantity += quantity;
          } else {
            salesByDay[dateKey] = {
              createdAt: new Date(dateKey).getTime(),
              totalQuantity: quantity,
            };
          }
        });

        // 3️⃣ Pasar los datos agregados al estado
        setSalesData(Object.values(salesByDay));
      } catch (error) {
        console.error("Error fetching and processing data:", error);
      }
    }

    fetchSalesData();
  }, []);

  // El SVG de carga que quieres usar (por simplicidad, usaremos un spinner de texto)
  const loadingValue = (
    <svg
      fill="currentColor"
      viewBox="0 0 24 24"
      className="w-6 h-6 animate-spin text-gray-600 mx-auto"
    >
      <path d="M10.14,1.16a11,11,0,0,0-9,8.92A1.59,1.59,0,0,0,2.46,12,1.52,1.52,0,0,0,4.11,10.7a8,8,0,0,1,6.66-6.61A1.42,1.42,0,0,0,12,2.69h0A1.57,1.57,0,0,0,10.14,1.16Z">
        <animateTransform
          attributeName="transform"
          type="rotate"
          dur="0.75s"
          values="0 12 12;360 12 12"
          repeatCount="indefinite"
        />
      </path>
    </svg>
  );
  console.log(salesData);
  return (
    <div className="bg-[#1e1e1e] backdrop-blur-md overflow-hidden shadow-lg rounded-xl border border-[#1f1f1f] p-4">
      <h2 className="text-white text-lg font-semibold mb-4">Sales Chart</h2>
      {salesData.length === 0 ? (
        loadingValue
      ) : (
        <div className="h-64 md:h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={salesData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="createdAt"
                tick={{ fontSize: 12 }}
                tickFormatter={(timestamp: number) =>
                  // Convierte el timestamp a una fecha, usando 'es-ES' para el formato DD/MM/YYYY
                  new Date(timestamp).toLocaleDateString("es-ES")
                }
              />
              <YAxis />
              <Tooltip
                formatter={(value: number) => `${value.toLocaleString()} €`}
                labelFormatter={(label) =>
                  `Fecha: ${new Date(label).toLocaleDateString("es-ES")}`
                }
              />
              <Bar
                dataKey="totalQuantity"
                fill="#8884d8"
                radius={[6, 6, 0, 0]} // esquinas redondeadas arriba
                width={2}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
}
