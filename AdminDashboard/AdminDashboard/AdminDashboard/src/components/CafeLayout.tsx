import { useState } from 'react';
import { Order } from '@/data/mockData';
import { Badge } from '@/components/ui/badge';
import { Armchair, Crown, Sparkles } from 'lucide-react';

interface CafeLayoutProps {
  orders: Order[];
  onTableClick: (order: Order | null) => void;
}

export default function CafeLayout({ orders, onTableClick }: CafeLayoutProps) {
  const [selectedTable, setSelectedTable] = useState<number | null>(null);

  // Create a map of table numbers to orders (prioritize: Successful > Pending > Failed/Cancelled)
  const tableOrders = orders.reduce((acc, order) => {
    const existingOrder = acc[order.tableNumber];

    if (!existingOrder) {
      // No order for this table yet, add it
      acc[order.tableNumber] = order;
    } else {
      // Priority: Successful > Pending > Failed/Cancelled
      const statusPriority = { 'Successful': 3, 'Pending': 2, 'Failed': 1, 'Cancelled': 0 };
      const currentPriority = statusPriority[order.status] || 0;
      const existingPriority = statusPriority[existingOrder.status] || 0;

      if (currentPriority > existingPriority) {
        // Current order has higher priority, replace it
        acc[order.tableNumber] = order;
      } else if (currentPriority === existingPriority) {
        // Both have same priority, use the latest by timestamp
        if (new Date(order.timestamp) > new Date(existingOrder.timestamp)) {
          acc[order.tableNumber] = order;
        }
      }
      // If existing has higher priority, keep existing
    }

    return acc;
  }, {} as { [key: number]: Order });  // Generate 8 tables in a 2x4 layout
  const tables = Array.from({ length: 8 }, (_, i) => i + 1);

  const getTableStatus = (tableNumber: number) => {
    const order = tableOrders[tableNumber];
    if (!order) return 'available';
    return order.status.toLowerCase();
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'successful':
        return 'bg-gradient-to-br from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 shadow-emerald-300';
      case 'pending':
        return 'bg-gradient-to-br from-blue-500 to-cyan-600 hover:from-blue-600 hover:to-cyan-700 shadow-blue-300';
      case 'failed':
        return 'bg-gradient-to-br from-red-500 to-rose-600 hover:from-red-600 hover:to-rose-700 shadow-red-300';
      case 'cancelled':
        return 'bg-gradient-to-br from-gray-500 to-slate-600 hover:from-gray-600 hover:to-slate-700 shadow-gray-300';
      default:
        return 'bg-gradient-to-br from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 shadow-amber-300';
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'successful':
        return <Badge className="bg-gradient-to-r from-emerald-100 to-green-100 text-emerald-800 text-xs animate-pulse border border-emerald-300">🟢 Royal Service</Badge>;
      case 'pending':
        return <Badge className="bg-gradient-to-r from-blue-100 to-cyan-100 text-blue-800 text-xs animate-pulse border border-blue-300">🔵 Order Placed</Badge>;
      case 'failed':
        return <Badge className="bg-gradient-to-r from-red-100 to-rose-100 text-red-800 text-xs border border-red-300">🔴 Service Issue</Badge>;
      case 'cancelled':
        return <Badge className="bg-gradient-to-r from-gray-100 to-slate-100 text-gray-800 text-xs border border-gray-300">⚫ Cancelled</Badge>;
      default:
        return <Badge className="bg-gradient-to-r from-amber-100 to-orange-100 text-amber-800 text-xs border border-amber-300">🟡 Available</Badge>;
    }
  };

  const getHoverEffect = (status: string) => {
    switch (status) {
      case 'successful':
        return 'hover:shadow-emerald-400 hover:scale-110';
      case 'pending':
        return 'hover:shadow-blue-400 hover:scale-110';
      case 'failed':
        return 'hover:shadow-red-400 hover:scale-105';
      case 'cancelled':
        return 'hover:shadow-gray-400 hover:scale-105';
      default:
        return 'hover:shadow-amber-400 hover:scale-110';
    }
  };

  const handleTableClick = (tableNumber: number) => {
    setSelectedTable(tableNumber);
    const order = tableOrders[tableNumber] || null;
    onTableClick(order);
  };

  return (
    <div className="bg-gradient-to-br from-white via-amber-50 to-orange-50 rounded-2xl shadow-2xl p-4 sm:p-6 mb-6 sm:mb-8 border-4 border-amber-200 relative overflow-hidden">
      {/* Royal Background Pattern */}
      <div className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23d97706' fill-opacity='0.3'%3E%3Cpath d='M20 20c0-11.046 8.954-20 20-20v40c-11.046 0-20-8.954-20-20zM0 20c0 11.046 8.954 20 20 20V0C8.954 0 0 8.954 0 20z'/%3E%3C/g%3E%3C/svg%3E")`,
          backgroundSize: '40px 40px'
        }}
      />

      {/* Decorative Corner Elements */}
      <div className="absolute top-0 left-0 w-12 h-12 border-r-3 border-b-3 border-amber-300 opacity-40"></div>
      <div className="absolute top-0 right-0 w-12 h-12 border-l-3 border-b-3 border-orange-300 opacity-40"></div>
      <div className="absolute bottom-0 left-0 w-12 h-12 border-r-3 border-t-3 border-red-300 opacity-40"></div>
      <div className="absolute bottom-0 right-0 w-12 h-12 border-l-3 border-t-3 border-amber-300 opacity-40"></div>

      <div className="relative z-10">
        <div className="text-center mb-6">
          <h2 className="text-xl sm:text-2xl font-bold mb-2 bg-gradient-to-r from-amber-800 via-orange-700 to-red-800 bg-clip-text text-transparent font-serif flex items-center justify-center space-x-2">
            <Crown className="w-6 h-6 text-amber-600" />
            <span>🪑 Royal Cafe Layout - Majestic Tables 🪑</span>
            <Crown className="w-6 h-6 text-amber-600" />
          </h2>
          <p className="text-gray-600 text-sm">Click on any royal table to view detailed order information</p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-6 max-w-6xl mx-auto">
          {tables.map((tableNumber) => {
            const status = getTableStatus(tableNumber);
            const order = tableOrders[tableNumber];
            const isSelected = selectedTable === tableNumber;

            return (
              <div
                key={tableNumber}
                className={`relative p-3 sm:p-4 rounded-2xl cursor-pointer transition-all duration-300 transform ${getHoverEffect(status)} ${isSelected ? 'ring-4 ring-amber-400 ring-opacity-60 scale-105' : ''
                  } bg-gradient-to-br from-white/80 to-amber-50/80 backdrop-blur-sm border-2 border-amber-200`}
                onClick={() => handleTableClick(tableNumber)}
              >
                {/* Table representation */}
                <div className="flex flex-col items-center space-y-2 sm:space-y-3">
                  {/* Table surface with royal styling */}
                  <div className={`w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-amber-200 via-orange-200 to-red-200 rounded-full border-4 ${status === 'successful' ? 'border-emerald-400 shadow-emerald-200' :
                      status === 'pending' ? 'border-blue-400 shadow-blue-200' :
                        status === 'failed' ? 'border-red-400 shadow-red-200' :
                          status === 'cancelled' ? 'border-gray-400 shadow-gray-200' : 'border-amber-400 shadow-amber-200'
                    } flex items-center justify-center shadow-xl transition-all duration-300 relative`}>
                    <span className="font-bold text-amber-900 text-sm sm:text-base">{tableNumber}</span>
                    {status === 'successful' && (
                      <Sparkles className="absolute -top-1 -right-1 w-3 h-3 sm:w-4 sm:h-4 text-emerald-500 animate-pulse" />
                    )}
                    {status === 'pending' && (
                      <Sparkles className="absolute -top-1 -right-1 w-3 h-3 sm:w-4 sm:h-4 text-blue-500 animate-pulse" />
                    )}
                  </div>

                  {/* Chairs around table with royal styling */}
                  <div className="grid grid-cols-2 gap-1 sm:gap-2">
                    {Array.from({ length: 4 }).map((_, chairIndex) => (
                      <div
                        key={chairIndex}
                        className={`w-6 h-6 sm:w-8 sm:h-8 rounded-lg flex items-center justify-center transition-all duration-300 shadow-lg border-2 border-white/50 ${getStatusColor(status)} ${status === 'successful' ? 'animate-bounce' : ''
                          }`}
                        style={{
                          animationDelay: `${chairIndex * 0.1}s`,
                          animationDuration: '2s'
                        }}
                      >
                        <Armchair className="w-3 h-3 sm:w-4 sm:h-4 text-white drop-shadow-md" />
                      </div>
                    ))}
                  </div>

                  {/* Status badge with royal styling */}
                  <div className="mt-1 sm:mt-2">
                    {getStatusBadge(status)}
                  </div>

                  {/* Order info preview with enhanced styling */}
                  {order && (
                    <div className="text-center text-xs text-gray-700 mt-1 bg-gradient-to-r from-white/90 to-amber-50/90 rounded-lg p-2 w-full border border-amber-200 shadow-md">
                      <div className="font-semibold text-gray-800 truncate">{order.customerName}</div>
                      <div className="text-emerald-600 font-bold">₹{order.totalAmount}</div>
                      <div className="flex items-center justify-center mt-1">
                        <span className="text-yellow-500">★</span>
                        <span className="ml-1 font-medium">{order.rating}</span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Enhanced hover effect overlay with royal glow */}
                <div className={`absolute inset-0 bg-gradient-to-br ${status === 'successful' ? 'from-emerald-400/20 to-green-600/20' :
                    status === 'pending' ? 'from-blue-400/20 to-cyan-600/20' :
                      status === 'failed' ? 'from-red-400/20 to-rose-600/20' :
                        status === 'cancelled' ? 'from-gray-400/20 to-slate-600/20' : 'from-amber-400/20 to-orange-600/20'
                  } rounded-2xl opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none`} />

                {/* Click indicator with royal styling */}
                {isSelected && (
                  <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full flex items-center justify-center shadow-xl animate-ping border-2 border-white">
                    <Crown className="w-3 h-3 text-white" />
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Enhanced Legend with royal styling */}
        <div className="flex flex-wrap justify-center mt-6 sm:mt-8 gap-3 sm:gap-6 bg-gradient-to-r from-amber-50 via-orange-50 to-red-50 rounded-xl p-4 border-2 border-amber-200">
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-gradient-to-r from-amber-500 to-orange-600 rounded animate-pulse border border-white"></div>
            <span className="text-sm text-gray-700 font-medium">🟡 Available</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-gradient-to-r from-blue-500 to-cyan-600 rounded animate-pulse border border-white"></div>
            <span className="text-sm text-gray-700 font-medium">🔵 Order Placed</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-gradient-to-r from-emerald-500 to-green-600 rounded animate-pulse border border-white"></div>
            <span className="text-sm text-gray-700 font-medium">🟢 Royal Service</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-gradient-to-r from-red-500 to-rose-600 rounded border border-white"></div>
            <span className="text-sm text-gray-700 font-medium">🔴 Service Issue</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-gradient-to-r from-gray-500 to-slate-600 rounded border border-white"></div>
            <span className="text-sm text-gray-700 font-medium">⚫ Cancelled</span>
          </div>
        </div>

        <p className="text-center text-xs text-gray-500 mt-4 font-medium">
          💡 Experience royal hospitality - Click on any majestic table for detailed insights
        </p>
      </div>
    </div>
  );
}