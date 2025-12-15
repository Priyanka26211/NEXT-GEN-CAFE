import React, { useRef, useState } from 'react';
import { ShoppingCart, Plus, Minus, Trash2, X, Sparkles } from 'lucide-react';

const MenuPage = ({ cart, addToCart, updateCartItem, onPlaceOrder, userInfo }) => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [addedItem, setAddedItem] = useState(null);
  // Track video errors per item to gracefully fall back to images if a video fails to load
  const [videoError, setVideoError] = useState({});
  // Store refs to each video's DOM node so we can control play/pause on hover
  const videoRefs = useRef({});
  const setVideoRef = (id) => (el) => {
    if (el) {
      videoRefs.current[id] = el;
    } else {
      delete videoRefs.current[id];
    }
  };
  const handleHoverStart = (item) => {
    if (!item.video || videoError[item.id]) return;
    const el = videoRefs.current[item.id];
    if (el) {
      el.muted = true;
      const playPromise = el.play();
      if (playPromise && typeof playPromise.catch === 'function') {
        playPromise.catch(() => {
          // If autoplay blocked for some reason, we silently ignore
        });
      }
    }
  };
  const handleHoverEnd = (item) => {
    const el = videoRefs.current[item.id];
    if (el) {
      el.pause();
      try { el.currentTime = 0; } catch { }
    }
  };

  // Menu items organized by category
  const menuItems = [
    // Pizza
    { id: 1, name: 'Cheese Pizza', price: 320, image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=600&h=400&fit=crop', video: '/assets/videos/pizza-selection.webm', category: 'Pizza', description: 'Classic margherita with mozzarella' },
    { id: 7, name: 'Margherita Pizza', price: 380, image: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=600&h=400&fit=crop', video: '/assets/videos/pizza-selection.webm', category: 'Pizza', description: 'Traditional Italian style' },
    { id: 12, name: 'Pepperoni Pizza', price: 420, image: 'https://images.unsplash.com/photo-1628840042765-356cda07504e?w=600&h=400&fit=crop', video: '/assets/videos/pizza-selection.webm', category: 'Pizza', description: 'Spicy pepperoni with cheese' },

    // Food
    { id: 6, name: 'Burger', price: 350, image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600&h=400&fit=crop', video: 'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4', category: 'Food', description: 'Juicy beef patty with cheese' },
    { id: 8, name: 'Pasta', price: 300, image: 'https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=600&h=400&fit=crop', category: 'Food', description: 'Creamy Alfredo sauce' },
    { id: 9, name: 'Sandwich', price: 180, image: 'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?w=600&h=400&fit=crop', category: 'Food', description: 'Club sandwich deluxe' },
    { id: 13, name: 'French Fries', price: 120, image: 'https://images.unsplash.com/photo-1630384060421-cb20d0e0649d?w=600&h=400&fit=crop', category: 'Food', description: 'Crispy golden fries' },
    { id: 14, name: 'Caesar Salad', price: 220, image: 'https://images.unsplash.com/photo-1546793665-c74683f339c1?w=600&h=400&fit=crop', category: 'Food', description: 'Fresh romaine with dressing' },

    // Dessert
    { id: 2, name: 'Fruit Cake', price: 250, image: 'https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?w=600&h=400&fit=crop', category: 'Dessert', description: 'Fresh seasonal fruits with cream' },
    { id: 4, name: 'White Chocolate Donut', price: 80, image: 'https://images.unsplash.com/photo-1551024506-0bccd828d307?w=600&h=400&fit=crop', category: 'Dessert', description: 'Glazed with white chocolate' },
    { id: 5, name: 'Dark Chocolate Cake', price: 280, image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=600&h=400&fit=crop', category: 'Dessert', description: 'Rich dark chocolate layers' },
    { id: 11, name: 'Rainbow Cake', price: 320, image: 'https://images.unsplash.com/photo-1588195538326-c5b1e5b80013?w=600&h=400&fit=crop', category: 'Dessert', description: 'Colorful layered cake' },
    { id: 15, name: 'Ice Cream Sundae', price: 180, image: 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=600&h=400&fit=crop', category: 'Dessert', description: 'Vanilla ice cream with toppings' },
    { id: 16, name: 'Cheesecake', price: 290, image: 'https://images.unsplash.com/photo-1524351199678-941a58a3df50?w=600&h=400&fit=crop', category: 'Dessert', description: 'Creamy New York style' },

    // Beverage
    { id: 10, name: 'Iced Latte', price: 150, image: 'https://images.unsplash.com/photo-1517487881594-2787fef5ebf7?w=600&h=400&fit=crop', video: 'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4', category: 'Beverage', description: 'Cold brew with milk' },
    { id: 17, name: 'Cappuccino', price: 140, image: 'https://images.unsplash.com/photo-1572442388796-11668a67e53d?w=600&h=400&fit=crop', category: 'Beverage', description: 'Espresso with foamed milk' },
    { id: 18, name: 'Fresh Orange Juice', price: 120, image: 'https://images.unsplash.com/photo-1600271886742-f049cd451bba?w=600&h=400&fit=crop', video: 'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4', category: 'Beverage', description: 'Freshly squeezed oranges' },
    { id: 19, name: 'Smoothie Bowl', price: 200, image: 'https://images.unsplash.com/photo-1590301157890-4810ed352733?w=600&h=400&fit=crop', category: 'Beverage', description: 'Mixed berry smoothie' },

    // Bakery
    { id: 3, name: 'Croissant', price: 120, image: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=600&h=400&fit=crop', category: 'Bakery', description: 'Buttery flaky pastry' },
    { id: 20, name: 'Chocolate Muffin', price: 90, image: 'https://images.unsplash.com/photo-1607958996333-41aef7caefaa?w=600&h=400&fit=crop', category: 'Bakery', description: 'Double chocolate chip' },
    { id: 21, name: 'Bagel with Cream Cheese', price: 150, image: 'https://images.unsplash.com/photo-1586444248902-2f64eddc13df?w=600&h=400&fit=crop', category: 'Bakery', description: 'Toasted with cream cheese' },
  ];

  const categories = ['All', 'Pizza', 'Food', 'Dessert', 'Beverage', 'Bakery'];

  const filteredItems = selectedCategory === 'All'
    ? menuItems
    : menuItems.filter(item => item.category === selectedCategory);

  const cartTotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const handleAddToCart = (item) => {
    addToCart(item);
    setAddedItem(item.id);
    setTimeout(() => setAddedItem(null), 600);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50 pb-24 relative overflow-hidden">
      {/* Animated Background Elements - Light Theme */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-200/40 rounded-full blur-3xl animate-blob"></div>
        <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-pink-200/40 rounded-full blur-3xl animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-0 left-1/2 w-96 h-96 bg-orange-200/40 rounded-full blur-3xl animate-blob animation-delay-4000"></div>
      </div>

      {/* Floating Cart Button */}
      {cartCount > 0 && (
        <button
          onClick={() => setIsCartOpen(true)}
          className="fixed bottom-24 right-6 z-50 bg-gradient-to-r from-purple-600 via-pink-500 to-orange-500 text-white p-5 rounded-full shadow-2xl hover:shadow-purple-400/60 transition-all duration-300 transform hover:scale-110 animate-bounce-in group"
        >
          <div className="relative">
            <ShoppingCart className="w-7 h-7" />
            <span className="absolute -top-3 -right-3 w-8 h-8 bg-red-500 text-white rounded-full text-xs font-bold flex items-center justify-center animate-pulse shadow-lg">
              {cartCount}
            </span>
          </div>
          {/* Pulse ring effect */}
          <span className="absolute inset-0 rounded-full bg-purple-400 opacity-75 animate-ping"></span>
        </button>
      )}

      <div className="relative z-10">
        {/* Hero Header - Light Theme */}
        <div className="text-center pt-12 pb-8 px-4">
          <div className="inline-block mb-4 animate-float">
            <Sparkles className="w-16 h-16 text-orange-500 mx-auto animate-pulse drop-shadow-lg" />
          </div>
          <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-purple-600 via-pink-500 to-orange-500 bg-clip-text text-transparent mb-4 animate-fade-in-up">
            Delicious Menu
          </h1>
          <p className="text-xl text-gray-700 font-semibold animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            Crafted with love, served with passion ✨
          </p>
          {userInfo && (
            <div className="mt-4 text-sm text-gray-600 font-medium animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
              <span className="px-3 py-1 bg-white/80 border border-purple-200 rounded-full shadow-sm">
                {userInfo.name || 'Guest'} • Table {userInfo.tableId}
              </span>
            </div>
          )}
        </div>

        {/* Category Pills - Light Theme */}
        <div className="px-4 mb-8">
          <div className="flex flex-wrap justify-center gap-3 max-w-4xl mx-auto">
            {categories.map((category, index) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-3 rounded-full font-bold text-sm uppercase tracking-wide transition-all duration-500 transform hover:scale-105 animate-scale-in shadow-lg ${selectedCategory === category
                  ? 'bg-gradient-to-r from-purple-600 via-pink-500 to-orange-500 text-white shadow-2xl shadow-purple-400/50 scale-110'
                  : 'bg-white text-gray-700 border-2 border-purple-200 hover:border-purple-400 hover:bg-purple-50 hover:text-purple-600'
                  }`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Menu Items Grid */}
        <div className="px-4 pb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 max-w-7xl mx-auto">
            {filteredItems.map((item, index) => (
              <div
                key={item.id}
                className="group relative bg-white rounded-3xl overflow-hidden border-2 border-gray-200 hover:border-purple-400 transition-all duration-500 transform hover:-translate-y-2 animate-scale-in hover:shadow-[0_20px_40px_rgba(0,0,0,0.35)]"
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                {/* Media Container (image by default, video plays on hover) */}
                <div
                  className="relative h-56 overflow-hidden bg-gray-100"
                  onMouseEnter={() => handleHoverStart(item)}
                  onMouseLeave={() => handleHoverEnd(item)}
                >
                  {/* Base image (visible by default) */}
                  <img
                    src={item.image}
                    alt={item.name}
                    className="absolute inset-0 w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                  />
                  {/* Hover video (visible only when hovering) */}
                  {item.video && !videoError[item.id] && (
                    <video
                      ref={setVideoRef(item.id)}
                      className="absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-200 transform group-hover:scale-110"
                      src={item.video}
                      poster={item.image}
                      muted
                      loop
                      playsInline
                      preload="metadata"
                      onError={() => setVideoError(prev => ({ ...prev, [item.id]: true }))}
                    />
                  )}
                  {/* Removed color overlay on hover */}
                  {/* Previously a gradient overlay added color on hover; removed per request */}

                  {/* Category Badge */}
                  <div className="absolute top-3 right-3 px-3 py-1.5 bg-white/95 backdrop-blur-md rounded-full text-xs font-bold text-purple-700 border border-purple-200 shadow-lg">
                    {item.category}
                  </div>

                  {/* In Cart Badge */}
                  {cart.find(cartItem => cartItem.id === item.id) && (
                    <div className="absolute top-3 left-3 px-3 py-1.5 bg-green-500 backdrop-blur-md rounded-full text-xs font-bold text-white shadow-lg animate-bounce-in">
                      ✓ In Cart
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-5 bg-white">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {item.name}
                  </h3>
                  <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                    {item.description}
                  </p>

                  {/* Price and Action */}
                  <div className="flex items-center justify-between">
                    <div className="text-3xl font-black bg-gradient-to-r from-purple-600 via-pink-500 to-orange-500 bg-clip-text text-transparent">
                      ₹{item.price}
                    </div>

                    {cart.find(cartItem => cartItem.id === item.id) ? (
                      <div className="flex items-center space-x-2 bg-purple-100 border-2 border-purple-300 rounded-2xl px-3 py-2 shadow-md">
                        <button
                          onClick={() => updateCartItem(item.id, cart.find(i => i.id === item.id).quantity - 1)}
                          className="w-8 h-8 bg-gradient-to-r from-red-500 to-pink-500 rounded-full flex items-center justify-center text-white hover:scale-110 transition-transform duration-300 shadow-lg"
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <span className="font-bold text-purple-900 min-w-[28px] text-center text-lg">
                          {cart.find(i => i.id === item.id).quantity}
                        </span>
                        <button
                          onClick={() => updateCartItem(item.id, cart.find(i => i.id === item.id).quantity + 1)}
                          className="w-8 h-8 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center text-white hover:scale-110 transition-transform duration-300 shadow-lg"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => handleAddToCart(item)}
                        className={`relative px-5 py-2.5 bg-gradient-to-r from-purple-600 via-pink-500 to-orange-500 text-white rounded-2xl font-bold hover:shadow-2xl hover:shadow-purple-400/50 transition-all duration-300 transform hover:scale-110 flex items-center space-x-2 overflow-hidden group shadow-lg ${addedItem === item.id ? 'animate-success-pulse' : ''}`}
                      >
                        {/* Shimmer Effect */}
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
                        <Plus className="w-5 h-5 relative z-10" />
                        <span className="relative z-10">Add</span>
                      </button>
                    )}
                  </div>
                </div>

                {/* Removed hover glow color overlay to avoid tinting the card */}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Cart Sidebar Overlay */}
      {isCartOpen && (
        <div className="fixed inset-0 z-50 animate-fade-in">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setIsCartOpen(false)}
          ></div>

          {/* Cart Sidebar - Light Theme */}
          <div className="absolute right-0 top-0 h-full w-full max-w-md bg-gradient-to-br from-white via-purple-50 to-pink-50 shadow-2xl animate-slide-in-right flex flex-col border-l-4 border-purple-300">
            {/* Cart Header */}
            <div className="relative p-6 bg-gradient-to-r from-purple-600 via-pink-500 to-orange-500 text-white overflow-hidden">
              {/* Animated Background Pattern */}
              <div className="absolute inset-0 opacity-20">
                <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.2),transparent)]"></div>
              </div>

              <div className="relative z-10 flex items-center justify-between mb-2">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-white/30 backdrop-blur-md rounded-2xl flex items-center justify-center shadow-lg">
                    <ShoppingCart className="w-6 h-6" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold">Your Cart</h2>
                    <p className="text-white/90 text-sm">{cartCount} items selected</p>
                  </div>
                </div>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="w-10 h-10 bg-white/30 hover:bg-white/40 rounded-full flex items-center justify-center transition-all duration-300 hover:rotate-90 shadow-lg"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>

            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4 scrollbar-thin scrollbar-thumb-purple-400 scrollbar-track-transparent">
              {cart.length === 0 ? (
                <div className="text-center py-20">
                  <div className="w-24 h-24 mx-auto mb-6 bg-purple-100 rounded-full flex items-center justify-center">
                    <ShoppingCart className="w-12 h-12 text-purple-500" />
                  </div>
                  <p className="text-gray-800 text-xl font-semibold mb-2">Your cart is empty</p>
                  <p className="text-gray-600">Add some delicious items!</p>
                </div>
              ) : (
                cart.map((item, index) => (
                  <div
                    key={item.id}
                    className="group relative bg-white border-2 border-purple-200 rounded-2xl p-4 hover:border-purple-400 transition-all duration-300 animate-slide-in-left overflow-hidden shadow-md hover:shadow-lg"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    {/* Glow effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-100/0 via-pink-100/0 to-purple-100/0 group-hover:from-purple-100/50 group-hover:via-pink-100/50 group-hover:to-purple-100/50 transition-all duration-500"></div>

                    <div className="relative flex items-center space-x-4">
                      <div className="w-20 h-20 bg-gradient-to-br from-purple-100 to-pink-100 rounded-xl overflow-hidden flex-shrink-0 border-2 border-purple-200">
                        <img
                          src={menuItems.find(i => i.id === item.id)?.image}
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      <div className="flex-1 min-w-0">
                        <h3 className="font-bold text-gray-900 truncate text-lg">{item.name}</h3>
                        <p className="text-purple-600 font-semibold text-sm">₹{item.price} each</p>
                      </div>

                      <div className="flex flex-col items-end space-y-2">
                        <div className="text-xl font-black bg-gradient-to-r from-purple-600 via-pink-500 to-orange-500 bg-clip-text text-transparent">
                          ₹{item.price * item.quantity}
                        </div>
                        <div className="flex items-center space-x-2 bg-purple-100 rounded-full px-2 py-1 border border-purple-300">
                          <button
                            onClick={() => updateCartItem(item.id, item.quantity - 1)}
                            className="w-7 h-7 bg-gradient-to-r from-red-500 to-pink-500 rounded-full flex items-center justify-center text-white hover:scale-110 transition-transform duration-300 shadow-lg"
                          >
                            {item.quantity === 1 ? <Trash2 className="w-4 h-4" /> : <Minus className="w-4 h-4" />}
                          </button>
                          <span className="font-bold text-purple-900 w-6 text-center">{item.quantity}</span>
                          <button
                            onClick={() => updateCartItem(item.id, item.quantity + 1)}
                            className="w-7 h-7 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center text-white hover:scale-110 transition-transform duration-300 shadow-lg"
                          >
                            <Plus className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Cart Footer */}
            {cart.length > 0 && (
              <div className="p-6 bg-gradient-to-r from-purple-100 via-pink-100 to-orange-100 border-t-2 border-purple-300">
                <div className="flex items-center justify-between mb-6">
                  <span className="text-gray-700 font-semibold text-lg">Total Amount</span>
                  <span className="text-4xl font-black bg-gradient-to-r from-purple-600 via-pink-500 to-orange-500 bg-clip-text text-transparent">
                    ₹{cartTotal}
                  </span>
                </div>
                <button
                  onClick={() => {
                    setIsCartOpen(false);
                    onPlaceOrder();
                  }}
                  className="w-full py-5 bg-gradient-to-r from-purple-600 via-pink-500 to-orange-500 text-white rounded-2xl font-bold text-lg hover:shadow-2xl hover:shadow-purple-400/60 transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-3 group relative overflow-hidden shadow-xl"
                >
                  {/* Shimmer effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
                  <span className="relative z-10">Place Order</span>
                  <Sparkles className="w-6 h-6 relative z-10 group-hover:rotate-180 transition-transform duration-500" />
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default MenuPage;
