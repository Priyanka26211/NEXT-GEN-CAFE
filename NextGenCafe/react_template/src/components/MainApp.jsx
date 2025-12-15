import React, { useState } from 'react';
import HomePage from './HomePage';
import MenuPage from './MenuPage';
import OrderPage from './OrderPage';
import PayBillPage from './PayBillPage';
import BottomNavigation from './BottomNavigation';

// Page transition wrapper component
const PageTransition = ({ children, pageKey }) => {
  return (
    <div
      key={pageKey}
      className="animate-fade-in-up"
      style={{ animationDuration: '0.5s' }}
    >
      {children}
    </div>
  );
};

// Updated: Fixed paymentType validation issue
const MainApp = ({ userInfo, onLogout, onUpdateUser }) => {
  const [currentPage, setCurrentPage] = useState('home');
  const [cart, setCart] = useState([]);
  const [orders, setOrders] = useState([]);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editName, setEditName] = useState(userInfo?.name || '');
  const [editPhone, setEditPhone] = useState(userInfo?.phone || '');

  const addToCart = (item, quantity = 1) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(cartItem => cartItem.id === item.id);
      if (existingItem) {
        return prevCart.map(cartItem =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + quantity }
            : cartItem
        );
      }
      return [...prevCart, { ...item, quantity }];
    });
  };

  const updateCartItem = (itemId, quantity) => {
    if (quantity <= 0) {
      setCart(prevCart => prevCart.filter(item => item.id !== itemId));
    } else {
      setCart(prevCart =>
        prevCart.map(item =>
          item.id === itemId ? { ...item, quantity } : item
        )
      );
    }
  };

  const placeOrder = async () => {
    if (cart.length === 0) return;

    const newOrder = {
      id: Date.now(),
      userId: userInfo.userId,
      tableNumber: userInfo.tableId,
      items: [...cart],
      status: 'pending',
      timestamp: new Date().toISOString(),
      total: cart.reduce((sum, item) => sum + (item.price * item.quantity), 0),
      customerName: userInfo?.name || `Guest - Table ${userInfo.tableId}`,
      customerContact: userInfo?.phone || 'N/A'
    };

    // Add order to state immediately
    setOrders(prevOrders => [newOrder, ...prevOrders]);

    // Navigate to order page immediately with current cart
    setCurrentPage('order');

    // Send order to backend API
    try {
      const response = await fetch('http://localhost:5000/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: userInfo.userId,
          tableNumber: userInfo.tableId,
          customerName: userInfo?.name || `Guest - Table ${userInfo.tableId}`,
          customerContact: userInfo?.phone || 'N/A',
          items: cart,
          status: 'pending',
          totalAmount: newOrder.total,
          // paymentType will default to 'Cash' in the backend
          paymentStatus: 'pending'
        })
      });

      const data = await response.json();

      if (data.success) {
        console.log('✅ Order saved to database:', data.order);
        console.log('🆔 Order ID from backend:', data.order._id);

        // Update local order with database ID
        setOrders(prevOrders =>
          prevOrders.map(order =>
            order.id === newOrder.id
              ? { ...order, _id: data.order._id, status: 'confirmed' }
              : order
          )
        );
      } else {
        console.error('❌ Failed to save order:', data.error);
      }
    } catch (error) {
      console.error('❌ Error saving order to backend:', error);
      // Order still exists in local state, so user can proceed
    }
  };

  const proceedToPayment = () => {
    // Move to payment page without clearing cart yet (in case they go back)
    console.log('📝 Proceeding to payment with orders:', orders);
    console.log('🛒 Current cart:', cart);
    setCurrentPage('pay');
  };

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'home':
        return (
          <PageTransition pageKey="home">
            <HomePage userInfo={userInfo} onNavigateToMenu={() => setCurrentPage('menu')} />
          </PageTransition>
        );
      case 'menu':
        return (
          <PageTransition pageKey="menu">
            <MenuPage
              cart={cart}
              addToCart={addToCart}
              updateCartItem={updateCartItem}
              onPlaceOrder={placeOrder}
              userInfo={userInfo}
            />
          </PageTransition>
        );
      case 'order':
        return (
          <PageTransition pageKey="order">
            <OrderPage
              cart={cart}
              tableNumber={userInfo.tableId}
              customerName={userInfo?.name || `Guest - Table ${userInfo.tableId}`}
              onProceedToPayment={proceedToPayment}
            />
          </PageTransition>
        );
      case 'pay':
        return (
          <PageTransition pageKey="pay">
            <PayBillPage orders={orders} userInfo={userInfo} />
          </PageTransition>
        );
      default:
        return (
          <PageTransition pageKey="home">
            <HomePage userInfo={userInfo} onNavigateToMenu={() => setCurrentPage('menu')} />
          </PageTransition>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50">
      {/* Header */}
      <div className="bg-white/95 backdrop-blur-xl shadow-lg border-b-2 border-purple-200 px-4 py-4 flex justify-between items-center sticky top-0 z-20">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 bg-gradient-to-br from-purple-600 via-pink-500 to-orange-500 rounded-2xl flex items-center justify-center shadow-lg transform hover:scale-105 transition-transform duration-300">
            <span className="text-xl"><img src="coffee-cup.png" alt="NextGen Café" /></span>
          </div>
          <div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-purple-600 via-pink-500 to-orange-500 bg-clip-text text-transparent">
              NextGen Café
            </h1>
            <p className="text-sm text-gray-600 font-medium">
              Table {userInfo.tableId} • {userInfo.userId}
            </p>
          </div>
        </div>

        <div className="relative flex items-center space-x-3">
          {/* User button */}
          <button
            onClick={() => setShowUserMenu(v => !v)}
            className="flex items-center space-x-2 px-3 py-2 bg-white border border-purple-200 rounded-xl shadow-sm hover:shadow-md transition"
          >
            <span className="w-6 h-6 rounded-full bg-gradient-to-r from-purple-600 via-pink-500 to-orange-500 flex items-center justify-center text-white text-xs">👤</span>
            <span className="text-sm font-semibold text-gray-700 max-w-[160px] truncate">{userInfo?.name || 'Guest'}</span>
            <svg className={`w-4 h-4 text-gray-500 transition-transform ${showUserMenu ? 'rotate-180' : ''}`} viewBox="0 0 20 20" fill="currentColor"><path d="M5.23 7.21a.75.75 0 011.06.02L10 10.585l3.71-3.355a.75.75 0 111.02 1.1l-4.22 3.818a.75.75 0 01-1.02 0L5.21 8.33a.75.75 0 01.02-1.12z" /></svg>
          </button>

          {/* Dropdown menu */}
          {showUserMenu && (
            <div className="absolute right-0 top-12 w-56 bg-white border border-purple-200 rounded-xl shadow-xl overflow-hidden z-30 animate-fade-in">
              <button
                onClick={() => { setShowEditModal(true); setShowUserMenu(false); }}
                className="w-full text-left px-4 py-3 hover:bg-purple-50 text-gray-700 font-medium"
              >
                ✏️ Change account details
              </button>
              <button
                onClick={onLogout}
                className="w-full text-left px-4 py-3 hover:bg-red-50 text-red-600 font-semibold border-t"
              >
                ⎋ Logout
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Main Content with smooth transitions */}
      <div className="pb-24 overflow-hidden">{renderCurrentPage()}</div>

      {/* Bottom Navigation */}
      <BottomNavigation
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        cartCount={cart.reduce((sum, item) => sum + item.quantity, 0)}
      />

      {/* Edit Account Modal */}
      {showEditModal && (
        <div className="fixed inset-0 z-40">
          <div className="absolute inset-0 bg-black/40" onClick={() => setShowEditModal(false)}></div>
          <div className="absolute inset-0 flex items-center justify-center p-4">
            <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl border-2 border-purple-200 overflow-hidden animate-scale-in">
              <div className="px-6 py-4 bg-gradient-to-r from-purple-600 via-pink-500 to-orange-500 text-white font-bold">Edit account</div>
              <div className="p-6 space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Name</label>
                  <input value={editName} onChange={e => setEditName(e.target.value)} className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-purple-200 focus:border-purple-400" placeholder="Your name" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Phone</label>
                  <input value={editPhone} onChange={e => setEditPhone(e.target.value)} className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-purple-200 focus:border-purple-400" placeholder="Phone number" />
                </div>
                <div className="flex justify-end space-x-3 pt-2">
                  <button onClick={() => setShowEditModal(false)} className="px-4 py-2 rounded-xl border-2 border-gray-200 text-gray-700 hover:bg-gray-50">Cancel</button>
                  <button
                    onClick={() => {
                      const phoneDigits = (editPhone || '').replace(/\D/g, '');
                      if (!editName.trim()) { alert('Please enter your name'); return; }
                      if (phoneDigits.length < 10) { alert('Please enter a valid phone number'); return; }
                      onUpdateUser && onUpdateUser({ name: editName.trim(), phone: phoneDigits });
                      setShowEditModal(false);
                    }}
                    className="px-5 py-2 rounded-xl text-white font-semibold bg-gradient-to-r from-purple-600 via-pink-500 to-orange-500 hover:opacity-90"
                  >
                    Save
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MainApp;