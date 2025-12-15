import React from 'react';

const CartOverlay = ({ cart, updateCartItem, onClose, onPlaceOrder }) => {
  const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  const handlePlaceOrder = () => {
    onPlaceOrder();
    onClose();
  };

  return (
    <div className="fixed inset-0  z-50 flex items-end pt-24">
      <div className="bg-white w-full max-h-[100vh] rounded-t-3xl overflow-hidden flex flex-col border-4 border-orange-500 shadow-2xl">
        {/* Header */}
        <div className="p-6 border-b border-gray-200 flex justify-between items-center">
          <h2 className="text-2xl font-bold text-gray-900">Your Cart</h2>
          <button
            onClick={onClose}
            className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center text-gray-600 hover:bg-gray-200 transition-colors"
          >
            ✕
          </button>
        </div>
        <div className="overflow-y-auto flex-1 px-6">
          {/* Remove or replace this block, as cart items are rendered below */}
        </div>
        

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {cart.length === 0 ? (
            <div className="text-center py-8">
              <div className="text-6xl mb-4">🛒</div>
              <p className="text-gray-500">Your cart is empty</p>
            </div>
          ) : (
            cart.map(item => (
              <div key={item.id} className="flex items-center space-x-3 bg-gray-50 rounded-xl p-3">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-16 h-16 object-cover rounded-lg"
                />
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900">{item.name}</h3>
                  <p className="text-orange-600 font-bold">₹{item.price}</p>
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => updateCartItem(item.id, item.quantity - 1)}
                    className="w-8 h-8 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center font-bold hover:bg-orange-200 transition-colors"
                  >
                    -
                  </button>
                  <span className="text-lg font-semibold w-8 text-center">
                    {item.quantity}
                  </span>
                  <button
                    onClick={() => updateCartItem(item.id, item.quantity + 1)}
                    className="w-8 h-8 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center font-bold hover:bg-orange-200 transition-colors"
                  >
                    +
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {cart.length > 0 && (
          <div className="p-4 border-t border-gray-200 space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-xl font-bold text-gray-900">Total</span>
              <span className="text-2xl font-bold text-orange-600">₹{total.toFixed(2)}</span>
            </div>
            <button
              onClick={handlePlaceOrder}
              className="w-full bg-gradient-to-r from-orange-500 to-orange-600 text-white py-4 rounded-2xl font-bold text-lg hover:from-orange-600 hover:to-orange-700 transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              Place Order 🍽️
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartOverlay;