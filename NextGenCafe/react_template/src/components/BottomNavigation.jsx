import React from 'react';
import { Home, ShoppingBag, CreditCard } from 'lucide-react';

const BottomNavigation = ({ currentPage, setCurrentPage, cartCount }) => {
  const navItems = [
    { id: 'home', label: 'Home', icon: Home, gradient: 'from-blue-500 to-cyan-500' },
    // Use custom logo for Menu tab and align to brand gradient
    { id: 'menu', label: 'Menu', icon: null, gradient: 'from-purple-600 via-pink-500 to-orange-500', logoSrc: '/assets/images/burger.png' },
    { id: 'order', label: 'Order', icon: ShoppingBag, gradient: 'from-orange-500 to-red-500' },
    { id: 'pay', label: 'Pay Bill', icon: CreditCard, gradient: 'from-green-500 to-emerald-500' }
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-xl border-t border-purple-100 px-2 py-1.5 z-30 shadow-md">
      <div className="flex justify-around items-center max-w-md mx-auto relative">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentPage === item.id;

          return (
            <button
              key={item.id}
              onClick={() => setCurrentPage(item.id)}
              className={`group relative flex flex-col items-center space-y-1 p-2 rounded-xl transition-colors duration-200 ${isActive
                ? 'bg-purple-50 border border-purple-300'
                : 'hover:bg-purple-50'
                }`}
            >
              {/* Icon Container */}
              <div className={`relative z-10 p-2 rounded-xl transition-all duration-200 ${isActive
                ? `bg-gradient-to-r ${item.gradient}`
                : 'bg-purple-50 group-hover:bg-purple-100'
                }`}>
                {item.logoSrc ? (
                  <img
                    src={item.logoSrc}
                    alt={item.label}
                    className={`${isActive ? 'w-6 h-6' : 'w-5 h-5'} transition-all duration-200`}
                  />
                ) : (
                  <Icon
                    className={`transition-all duration-200 ${isActive
                      ? 'w-6 h-6 text-white'
                      : 'w-5 h-5 text-gray-600 group-hover:text-purple-600'
                      }`}
                    strokeWidth={2.2}
                  />
                )}

                {/* Cart Badge */}
                {item.id === 'menu' && cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center font-bold shadow border-2 border-white">
                    {cartCount}
                  </span>
                )}
              </div>

              {/* Label */}
              <span className={`text-[11px] font-medium transition-colors duration-200 relative z-10 ${isActive
                ? 'text-purple-700'
                : 'text-gray-600 group-hover:text-purple-600'
                }`}>
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default BottomNavigation;