import { useState, useEffect } from 'react';
import { RefreshCw, User, Coffee, Crown, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { mockOrders, Order } from '@/data/mockData';
import SummaryCards from '@/components/SummaryCards';
import CafeLayout from '@/components/CafeLayout';
import OrderModal from '@/components/OrderModal';
import ChartsSection from '@/components/ChartsSection';
import TopDishes from '@/components/TopDishes';

export default function Index() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [selectedDish, setSelectedDish] = useState<string | null>(null);
  const [ratingFilter, setRatingFilter] = useState([1, 5]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch orders from backend
  const fetchOrders = async () => {
    try {
      setError(null);
      const response = await fetch('http://localhost:5000/api/orders');
      const data = await response.json();

      console.log('📥 Fetched data from backend:', data);

      if (data.success && data.orders) {
        console.log(`📦 Raw orders from database (${data.orders.length}):`, data.orders);

        // Transform backend orders to match frontend Order interface
        const transformedOrders: Order[] = data.orders.map((order: any) => {
          console.log('🔄 Transforming order:', {
            _id: order._id,
            tableNumber: order.tableNumber,
            paymentStatus: order.paymentStatus,
            status: order.status,
            paymentType: order.paymentType
          });

          return {
            id: order._id,
            tableNumber: order.tableNumber,
            customerName: order.customerName || `Table ${order.tableNumber}`,
            customerContact: order.customerContact || 'N/A',
            items: order.items.map((item: any) => ({
              id: item.id || item._id,
              name: item.name,
              price: item.price,
              quantity: item.quantity,
              image: item.image || '/api/placeholder/100/100'
            })),
            paymentType: order.paymentType as 'UPI' | 'Cash',
            status: order.paymentStatus === 'paid' ? 'Successful' :
              order.status === 'cancelled' ? 'Cancelled' :
                order.paymentStatus === 'pending' && order.status === 'pending' ? 'Pending' :
                  order.status === 'confirmed' ? 'Pending' : 'Failed',
            rating: order.rating || 0,
            timestamp: order.createdAt,
            totalAmount: order.totalAmount
          };
        });

        console.log('✨ Transformed orders:', transformedOrders);
        setOrders(transformedOrders);
        console.log(`✅ Loaded ${transformedOrders.length} orders from database`);
      } else {
        console.warn('⚠️ No orders found, using mock data');
        setOrders(mockOrders);
      }
    } catch (err) {
      console.error('❌ Error fetching orders:', err);
      setError('Failed to load orders from server. Using mock data.');
      setOrders(mockOrders);
    } finally {
      setIsLoading(false);
    }
  };

  // Initial load
  useEffect(() => {
    fetchOrders();

    // Auto-refresh every 5 seconds to get new orders
    const interval = setInterval(fetchOrders, 5000);

    return () => clearInterval(interval);
  }, []);

  // Filter orders based on selected dish and rating
  const filteredOrders = orders.filter(order => {
    const matchesRating = order.rating >= ratingFilter[0] && order.rating <= ratingFilter[1];

    if (!selectedDish) return matchesRating;

    const hasDish = order.items.some(item => item.name === selectedDish);
    return hasDish && matchesRating;
  });

  const handleTableClick = (order: Order | null) => {
    setSelectedOrder(order);
    setIsModalOpen(true);
  };

  const handleDishSelect = (dishName: string) => {
    setSelectedDish(selectedDish === dishName ? null : dishName);
  };

  const handleRefresh = async () => {
    setIsRefreshing(true);

    // Reset all filters
    setSelectedDish(null);
    setRatingFilter([1, 5]);

    // Fetch fresh data from API
    await fetchOrders();

    setIsRefreshing(false);
  };

  const handleRatingFilterChange = (newRatingFilter: number[]) => {
    setRatingFilter(newRatingFilter);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-red-50 relative overflow-hidden">
      {/* Royal Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-full h-full"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23d97706' fill-opacity='0.3'%3E%3Cpath d='M30 30c0-16.569 13.431-30 30-30v60c-16.569 0-30-13.431-30-30zM0 30c0 16.569 13.431 30 30 30V0C13.431 0 0 13.431 0 30z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            backgroundSize: '60px 60px'
          }}
        />
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-10 left-10 w-20 h-20 border-4 border-amber-300 rounded-full opacity-20 animate-pulse"></div>
      <div className="absolute top-32 right-20 w-16 h-16 border-4 border-orange-300 rounded-full opacity-20 animate-pulse delay-1000"></div>
      <div className="absolute bottom-20 left-32 w-12 h-12 border-4 border-red-300 rounded-full opacity-20 animate-pulse delay-2000"></div>

      {/* Header */}
      <header className="bg-gradient-to-r from-amber-900 via-orange-800 to-red-900 shadow-2xl border-b-4 border-amber-400 relative">
        {/* Royal Pattern Overlay */}
        <div className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23fbbf24' fill-opacity='0.4'%3E%3Cpath d='M20 20c0-11.046 8.954-20 20-20v40c-11.046 0-20-8.954-20-20zM0 20c0 11.046 8.954 20 20 20V0C8.954 0 0 8.954 0 20z'/%3E%3C/g%3E%3C/svg%3E")`,
            backgroundSize: '40px 40px'
          }}
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col sm:flex-row justify-between items-center py-4 sm:py-6 space-y-4 sm:space-y-0">
            {/* Logo */}
            <div className="flex items-center space-x-3">
              <div className="relative">
                <div className="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-amber-400 via-orange-500 to-red-500 rounded-xl flex items-center justify-center shadow-xl border-2 border-amber-300">
                  <Crown className="w-6 h-6 sm:w-8 sm:h-8 text-white drop-shadow-lg" />
                </div>
                <Sparkles className="absolute -top-1 -right-1 w-4 h-4 text-amber-300 animate-pulse" />
              </div>
              <div className="text-center sm:text-left">
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-amber-200 via-orange-200 to-red-200 bg-clip-text text-transparent font-serif tracking-wide">
                  NextGen Café
                </h1>
                <p className="text-amber-200 text-xs sm:text-sm font-medium opacity-90">Premium Admin Dashboard</p>
              </div>
            </div>

            {/* Admin Profile & Refresh */}
            <div className="flex items-center space-x-3 sm:space-x-4">
              <Button
                onClick={handleRefresh}
                disabled={isRefreshing}
                className="bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 hover:from-amber-600 hover:via-orange-600 hover:to-red-600 text-white shadow-xl hover:shadow-2xl transition-all duration-300 border-2 border-amber-300 px-3 py-2 sm:px-4 sm:py-2 text-sm sm:text-base"
              >
                <RefreshCw className={`w-4 h-4 mr-2 ${isRefreshing ? 'animate-spin' : ''}`} />
                <span className="hidden sm:inline">{isRefreshing ? 'Refreshing...' : 'Refresh'}</span>
                <span className="sm:hidden">↻</span>
              </Button>
              <div className="flex items-center space-x-2 bg-black/20 rounded-full px-3 py-2 backdrop-blur-sm border border-amber-300/30">
                <div className="w-8 h-8 bg-gradient-to-r from-amber-400 to-orange-500 rounded-full flex items-center justify-center border-2 border-amber-300">
                  <User className="w-4 h-4 text-white" />
                </div>
                <span className="text-sm font-medium text-amber-100 hidden sm:inline">Admin</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 relative z-10">
        <div className="space-y-6 sm:space-y-8">
          {/* Welcome Section */}
          <div className="text-center mb-6 sm:mb-8">
            <div className="relative inline-block">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-amber-800 via-orange-700 to-red-800 bg-clip-text text-transparent mb-2 font-serif">
                🏛️ Royal Dashboard Overview 🏛️
              </h2>
              <div className="absolute -top-2 -left-2 w-4 h-4 border-2 border-amber-400 rounded-full opacity-60"></div>
              <div className="absolute -top-2 -right-2 w-4 h-4 border-2 border-orange-400 rounded-full opacity-60"></div>
              <div className="absolute -bottom-2 -left-2 w-4 h-4 border-2 border-red-400 rounded-full opacity-60"></div>
              <div className="absolute -bottom-2 -right-2 w-4 h-4 border-2 border-amber-400 rounded-full opacity-60"></div>
            </div>
            <p className="text-gray-700 text-sm sm:text-base font-medium">
              Monitor your royal cafe's performance with majestic analytics
            </p>
            {isLoading && (
              <div className="mt-4 text-amber-600 font-medium">
                ⏳ Loading orders from database...
              </div>
            )}
            {error && (
              <div className="mt-4 px-4 py-2 bg-red-100 border-2 border-red-300 text-red-700 rounded-lg inline-block">
                ⚠️ {error}
              </div>
            )}
            {!isLoading && !error && orders.length === 0 && (
              <div className="mt-4 px-4 py-2 bg-blue-100 border-2 border-blue-300 text-blue-700 rounded-lg inline-block">
                📋 No orders yet. Orders from customers will appear here in real-time!
              </div>
            )}
            {selectedDish && (
              <div className="mt-4">
                <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-amber-100 to-orange-100 text-amber-900 rounded-full text-sm font-medium border-2 border-amber-300 shadow-lg">
                  <Crown className="w-4 h-4 mr-2" />
                  Royal Filter: {selectedDish}
                  <button
                    onClick={() => setSelectedDish(null)}
                    className="ml-2 text-amber-700 hover:text-amber-900 font-bold"
                  >
                    ✕
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Summary Cards */}
          <SummaryCards orders={filteredOrders} />

          {/* Cafe Layout */}
          <CafeLayout orders={filteredOrders} onTableClick={handleTableClick} />

          {/* Charts Section */}
          <div className="bg-gradient-to-br from-white via-amber-50 to-orange-50 rounded-2xl shadow-2xl p-4 sm:p-6 border-4 border-amber-200 relative overflow-hidden">
            {/* Decorative Corner Elements */}
            <div className="absolute top-0 left-0 w-16 h-16 border-r-4 border-b-4 border-amber-300 opacity-30"></div>
            <div className="absolute top-0 right-0 w-16 h-16 border-l-4 border-b-4 border-orange-300 opacity-30"></div>
            <div className="absolute bottom-0 left-0 w-16 h-16 border-r-4 border-t-4 border-red-300 opacity-30"></div>
            <div className="absolute bottom-0 right-0 w-16 h-16 border-l-4 border-t-4 border-amber-300 opacity-30"></div>

            <div className="relative z-10">
              <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 bg-gradient-to-r from-amber-800 via-orange-700 to-red-800 bg-clip-text text-transparent font-serif text-center">
                📊 Royal Analytics & Majestic Insights 📊
              </h2>
              <ChartsSection
                orders={filteredOrders}
                onDishSelect={handleDishSelect}
                selectedDish={selectedDish}
                ratingFilter={ratingFilter}
                onRatingFilterChange={handleRatingFilterChange}
              />
            </div>
          </div>

          {/* Top Dishes */}
          <TopDishes orders={filteredOrders} />
        </div>
      </main>

      {/* Order Modal */}
      <OrderModal
        order={selectedOrder}
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          fetchOrders(); // Refresh orders after modal closes (in case status changed)
        }}
      />

      {/* Footer */}
      <footer className="bg-gradient-to-r from-amber-900 via-orange-800 to-red-900 border-t-4 border-amber-400 mt-12 sm:mt-16 relative">
        <div className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='30' height='30' viewBox='0 0 30 30' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23fbbf24' fill-opacity='0.4'%3E%3Cpath d='M15 15c0-8.284 6.716-15 15-15v30c-8.284 0-15-6.716-15-15zM0 15c0 8.284 6.716 15 15 15V0C6.716 0 0 6.716 0 15z'/%3E%3C/g%3E%3C/svg%3E")`,
            backgroundSize: '30px 30px'
          }}
        />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 relative z-10">
          <div className="text-center">
            <div className="flex justify-center items-center space-x-2 mb-2">
              <Crown className="w-5 h-5 text-amber-300" />
              <span className="text-amber-200 font-serif text-lg">NextGen Café</span>
              <Crown className="w-5 h-5 text-amber-300" />
            </div>
            <p className="text-amber-300 text-sm">&copy; 2024 Royal Premium Admin Dashboard - Crafted with Excellence</p>
          </div>
        </div>
      </footer>
    </div>
  );
}