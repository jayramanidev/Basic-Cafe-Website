"use client";

import { useState } from "react";
import { updateOrderStatus } from "@/actions/order";
import { CheckCircle, Clock, ChefHat, XCircle } from "lucide-react";

const STATUS_COLORS: Record<string, string> = {
  PENDING: "bg-yellow-100 text-yellow-800 border-yellow-200",
  PREPARING: "bg-blue-100 text-blue-800 border-blue-200",
  COMPLETED: "bg-green-100 text-green-800 border-green-200",
  CANCELLED: "bg-red-100 text-red-800 border-red-200",
};

export default function OrdersClient({ initialOrders }: { initialOrders: any[] }) {
  const [orders, setOrders] = useState(initialOrders);

  const handleStatusChange = async (orderId: string, newStatus: string) => {
    // Optimistic UI update
    setOrders(orders.map(o => o.id === orderId ? { ...o, status: newStatus } : o));
    
    const res = await updateOrderStatus(orderId, newStatus);
    if (!res.success) {
      alert("Failed to update status");
      window.location.reload();
    }
  };

  return (
    <div className="p-8 min-h-screen">
      <h1 className="text-3xl font-display font-bold text-[#4a3f35] mb-8">Manage Orders</h1>
      
      {orders.length === 0 ? (
        <div className="text-center py-20 text-[#6b6255]">
          <p className="text-xl">No orders yet.</p>
        </div>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => (
            <div key={order.id} className="bg-white p-6 rounded-2xl shadow-sm border border-[#d4a373]/20 flex flex-col md:flex-row gap-6 justify-between">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <h2 className="text-xl font-bold text-[#4a3f35]">{order.customerName}</h2>
                  <span className={`px-3 py-1 rounded-full text-xs font-bold border ${STATUS_COLORS[order.status]}`}>
                    {order.status}
                  </span>
                </div>
                <p className="text-[#6b6255] font-semibold mb-4">Table: {order.tableNumber}</p>
                
                <div className="space-y-2">
                  {order.items.map((item: any) => (
                    <div key={item.id} className="flex gap-2 text-sm text-[#4a3f35]">
                      <span className="font-bold">{item.quantity}x</span>
                      <span>{item.menuItem.name}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex flex-col justify-between items-end min-w-[200px]">
                <div className="text-right mb-4">
                  <p className="text-sm text-[#6b6255]">Total</p>
                  <p className="text-2xl font-bold text-[#d4a373]">₹{order.totalAmount.toFixed(2)}</p>
                </div>
                
                <div className="flex gap-2 flex-wrap justify-end">
                  {order.status === "PENDING" && (
                    <button 
                      onClick={() => handleStatusChange(order.id, "PREPARING")}
                      className="px-4 py-2 bg-blue-50 text-blue-600 rounded-lg text-sm font-semibold hover:bg-blue-100 transition-colors flex items-center gap-2"
                    >
                      <ChefHat size={16} /> Prepare
                    </button>
                  )}
                  {(order.status === "PENDING" || order.status === "PREPARING") && (
                    <button 
                      onClick={() => handleStatusChange(order.id, "COMPLETED")}
                      className="px-4 py-2 bg-green-50 text-green-600 rounded-lg text-sm font-semibold hover:bg-green-100 transition-colors flex items-center gap-2"
                    >
                      <CheckCircle size={16} /> Complete
                    </button>
                  )}
                  {order.status !== "COMPLETED" && order.status !== "CANCELLED" && (
                    <button 
                      onClick={() => handleStatusChange(order.id, "CANCELLED")}
                      className="px-4 py-2 bg-red-50 text-red-600 rounded-lg text-sm font-semibold hover:bg-red-100 transition-colors flex items-center gap-2"
                    >
                      <XCircle size={16} /> Cancel
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
