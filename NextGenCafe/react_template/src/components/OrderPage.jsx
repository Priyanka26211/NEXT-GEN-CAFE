import React, { useState, useEffect } from 'react';
import { Check, Clock, ChefHat, Bell, ArrowRight, Sparkles } from 'lucide-react';

const OrderPage = ({ cart, tableNumber, customerName, onProceedToPayment }) => {
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [showItems, setShowItems] = useState(false);

  useEffect(() => {
    // Trigger success animation
    const timer1 = setTimeout(() => setShowConfirmation(true), 300);
    const timer2 = setTimeout(() => setShowItems(true), 800);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, []);

  const orderTotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50 pb-24 relative overflow-hidden">
      {/* Animated Background Blobs - Light Theme */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-20 left-10 w-96 h-96 bg-purple-200/40 rounded-full blur-3xl animate-blob"></div>
        <div className="absolute top-40 right-20 w-96 h-96 bg-pink-200/40 rounded-full blur-3xl animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-20 left-1/3 w-96 h-96 bg-orange-200/40 rounded-full blur-3xl animate-blob animation-delay-4000"></div>
      </div>

      <div className="relative z-10 px-4 py-8 max-w-3xl mx-auto">
        {/* Success Checkmark Animation */}
        <div className={`text-center mb-8 transition-all duration-700 ${showConfirmation ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-10'}`}>
          <div className="inline-flex items-center justify-center w-28 h-28 bg-gradient-to-br from-green-400 via-emerald-500 to-teal-500 rounded-full mb-6 shadow-2xl shadow-green-400/50 animate-success-checkmark">
            <Check className="w-16 h-16 text-white" strokeWidth={3} />
          </div>

          <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-purple-600 via-pink-500 to-orange-500 bg-clip-text text-transparent mb-3 animate-fade-in-up">
            Order Confirmed!
          </h1>
          <p className="text-xl text-gray-700 font-semibold animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            Your delicious meal is being prepared ✨
          </p>
        </div>

        {/* Order Summary Card */}
        <div className={`bg-white rounded-3xl shadow-2xl overflow-hidden mb-6 border-2 border-purple-200 transition-all duration-700 ${showItems ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          {/* Card Header */}
          <div className="relative p-6 bg-gradient-to-r from-purple-600 via-pink-500 to-orange-500 text-white overflow-hidden">
            {/* Animated Background Pattern */}
            <div className="absolute inset-0 opacity-20">
              <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.2),transparent)]"></div>
            </div>

            <div className="relative z-10 flex items-center justify-between">
              <div>
                <h2 className="text-3xl font-bold mb-2 flex items-center space-x-2">
                  <Sparkles className="w-8 h-8 animate-pulse" />
                  <span>Order Summary</span>
                </h2>
                <p className="text-white/90 text-lg">Table #{tableNumber}{customerName ? ` • ${customerName}` : ''}</p>
              </div>
              <div className="text-right">
                <div className="text-4xl font-black text-white drop-shadow-lg">
                  ₹{orderTotal}
                </div>
                <p className="text-white/90 text-sm">{itemCount} items</p>
              </div>
            </div>
          </div>

          {/* Order Items List */}
          <div className="p-6 space-y-4 max-h-96 overflow-y-auto scrollbar-thin scrollbar-thumb-purple-400 scrollbar-track-transparent bg-gradient-to-b from-white to-purple-50/30">
            {cart.map((item, index) => (
              <div
                key={item.id}
                className="group relative bg-white border-2 border-purple-200 rounded-2xl p-4 hover:border-purple-400 transition-all duration-300 animate-slide-in-left overflow-hidden shadow-md hover:shadow-lg"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {/* Hover glow effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-purple-100/0 via-pink-100/0 to-purple-100/0 group-hover:from-purple-100/50 group-hover:via-pink-100/50 group-hover:to-purple-100/50 transition-all duration-500"></div>

                <div className="relative flex items-center space-x-4">
                  <div className="w-24 h-24 bg-gradient-to-br from-purple-100 to-pink-100 rounded-xl overflow-hidden flex-shrink-0 border-2 border-purple-200">
                    <img
                      src={item.image || '/api/placeholder/96/96'}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-gray-900 truncate text-lg">{item.name}</h3>
                    <p className="text-purple-600 text-sm">Quantity: {item.quantity}</p>
                    <p className="text-pink-500 font-semibold">₹{item.price} each</p>
                  </div>

                  <div className="text-right flex-shrink-0">
                    <div className="text-2xl font-black bg-gradient-to-r from-purple-600 via-pink-500 to-orange-500 bg-clip-text text-transparent">
                      ₹{item.price * item.quantity}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Order Timeline */}
          <div className="px-6 py-5 bg-gradient-to-r from-purple-50 via-pink-50 to-orange-50 border-t-2 border-purple-200">
            <h3 className="font-bold text-gray-900 mb-5 flex items-center space-x-2 text-lg">
              <Sparkles className="w-6 h-6 text-purple-500 animate-pulse" />
              <span>Order Status</span>
            </h3>

            <div className="space-y-4">
              {/* Step 1 - Confirmed */}
              <div className="flex items-center space-x-3 animate-fade-in-up">
                <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-green-500 rounded-full flex items-center justify-center shadow-lg shadow-green-400/50 animate-success-pulse">
                  <Check className="w-7 h-7 text-white" strokeWidth={3} />
                </div>
                <div className="flex-1">
                  <p className="font-bold text-gray-900 text-lg">Order Confirmed</p>
                  <p className="text-sm text-gray-600">Your order has been received</p>
                </div>
                <span className="text-sm text-green-600 font-bold px-3 py-1 bg-green-100 rounded-full border border-green-300">Just now</span>
              </div>

              {/* Step 2 - Preparing */}
              <div className="flex items-center space-x-3 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                <div className="w-12 h-12 bg-gradient-to-br from-orange-400 to-orange-500 rounded-full flex items-center justify-center shadow-lg shadow-orange-400/50 animate-pulse">
                  <ChefHat className="w-7 h-7 text-white" />
                </div>
                <div className="flex-1">
                  <p className="font-bold text-gray-900 text-lg">Preparing Your Order</p>
                  <p className="text-sm text-gray-600">Our chefs are working on it</p>
                </div>
                <span className="text-sm text-orange-600 font-bold px-3 py-1 bg-orange-100 rounded-full animate-pulse border border-orange-300">In Progress</span>
              </div>

              {/* Step 3 - Ready */}
              <div className="flex items-center space-x-3 opacity-50 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
                <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
                  <Bell className="w-7 h-7 text-gray-500" />
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-gray-700 text-lg">Ready to Serve</p>
                  <p className="text-sm text-gray-500">Estimated in 15-20 mins</p>
                </div>
              </div>
            </div>
          </div>

          {/* Total Section */}
          <div className="px-6 py-5 bg-gradient-to-r from-purple-100 via-pink-100 to-orange-100 border-t-2 border-purple-300">
            <div className="flex items-center justify-between mb-2 text-gray-700">
              <span>Subtotal</span>
              <span className="font-semibold text-gray-900">₹{orderTotal}</span>
            </div>
            <div className="flex items-center justify-between mb-2 text-gray-700">
              <span>GST (5%)</span>
              <span className="font-semibold text-gray-900">₹{(orderTotal * 0.05).toFixed(2)}</span>
            </div>
            <div className="h-px bg-purple-300 my-3"></div>
            <div className="flex items-center justify-between">
              <span className="text-2xl font-bold text-gray-900">Total Amount</span>
              <span className="text-4xl font-black bg-gradient-to-r from-purple-600 via-pink-500 to-orange-500 bg-clip-text text-transparent">
                ₹{(orderTotal * 1.05).toFixed(2)}
              </span>
            </div>
          </div>
        </div>

        {/* Important Note */}
        <div className="bg-blue-50 border-2 border-blue-300 rounded-2xl p-5 mb-6 animate-fade-in-up shadow-lg" style={{ animationDelay: '0.6s' }}>
          <div className="flex items-start space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-blue-500 rounded-full flex items-center justify-center flex-shrink-0 shadow-lg shadow-blue-400/50">
              <Clock className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="font-bold text-gray-900 mb-1 text-lg">Please Note</p>
              <p className="text-gray-700">
                Complete payment to confirm your order. Your table will be reserved for the next 15 minutes.
              </p>
            </div>
          </div>
        </div>

        {/* Proceed to Payment Button */}
        <button
          onClick={onProceedToPayment}
          className="w-full py-6 bg-gradient-to-r from-purple-600 via-pink-500 to-orange-500 text-white rounded-2xl font-bold text-xl hover:scale-105 transition-all duration-300 transform shadow-2xl hover:shadow-purple-400/60 flex items-center justify-center space-x-3 group animate-fade-in-up relative overflow-hidden"
          style={{ animationDelay: '0.8s' }}
        >
          {/* Shimmer effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
          <span className="relative z-10">Proceed to Payment</span>
          <ArrowRight className="w-7 h-7 relative z-10 group-hover:translate-x-2 transition-transform duration-300" />
          <Sparkles className="w-6 h-6 relative z-10 group-hover:rotate-180 transition-transform duration-500" />
        </button>

        {/* Satisfaction Guarantee */}
        <div className="text-center mt-6 animate-fade-in-up" style={{ animationDelay: '1s' }}>
          <p className="text-gray-700 font-semibold text-sm flex items-center justify-center space-x-2">
            <span>🔒</span>
            <span>100% Secure Payment</span>
            <span>•</span>
            <span>❤️</span>
            <span>Made with Love</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default OrderPage;
