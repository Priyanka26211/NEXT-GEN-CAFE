import React, { useState, useEffect } from 'react';
import { CreditCard, Smartphone, Banknote, Check, Sparkles, ArrowRight, Loader2 } from 'lucide-react';
import jsPDF from 'jspdf';

// Success Popup Modal Component
const SuccessPopup = ({ total, onClose, onDownloadReceipt }) => {
  const [confetti, setConfetti] = useState([]);
  const [countdown, setCountdown] = useState(15);

  useEffect(() => {
    // Generate confetti pieces with dark theme colors
    const pieces = [];
    for (let i = 0; i < 50; i++) {
      pieces.push({
        id: i,
        left: Math.random() * 100,
        delay: Math.random() * 2,
        duration: 2 + Math.random() * 2,
        color: ['text-purple-400', 'text-pink-400', 'text-indigo-400', 'text-yellow-400', 'text-fuchsia-400'][Math.floor(Math.random() * 5)]
      });
    }
    setConfetti(pieces);

    // Countdown timer
    const timer = setInterval(() => {
      setCountdown(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fade-in">
      {/* Backdrop - Light Theme */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-md"></div>

      {/* Confetti */}
      {confetti.map(piece => (
        <div
          key={piece.id}
          className={`absolute top-0 w-3 h-3 ${piece.color} animate-confetti-fall`}
          style={{
            left: `${piece.left}%`,
            animationDelay: `${piece.delay}s`,
            animationDuration: `${piece.duration}s`
          }}
        >
          ✦
        </div>
      ))}

      {/* Modal - Light Theme */}
      <div className="relative bg-white rounded-3xl shadow-2xl max-w-md w-full p-8 animate-scale-in overflow-hidden border-2 border-purple-200">
        {/* Background glow */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-100/50 via-pink-100/50 to-orange-100/50 blur-xl"></div>

        {/* Content */}
        <div className="relative z-10">
          {/* Success Icon */}
          <div className="text-center mb-6">
            <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full mb-4 shadow-2xl shadow-green-400/50 animate-success-checkmark">
              <Check className="w-14 h-14 text-white" strokeWidth={3} />
            </div>

            <h2 className="text-4xl font-bold bg-gradient-to-r from-green-500 to-emerald-500 bg-clip-text text-transparent mb-2">
              Payment Successful!
            </h2>
            <p className="text-gray-700 text-lg">
              Amount Paid: <span className="font-bold text-green-600">₹{total}</span>
            </p>
          </div>

          {/* Order Status Card */}
          <div className="bg-gradient-to-r from-purple-100 via-pink-100 to-orange-100 rounded-2xl p-6 mb-6 border-2 border-purple-300 shadow-lg">
            <div className="flex items-center space-x-3 mb-3">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center animate-pulse shadow-lg shadow-purple-400/50">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="font-bold text-gray-900 text-lg">Your order is being prepared</p>
                <p className="text-sm text-gray-700">Our chefs are working on it</p>
              </div>
            </div>

            {/* Progress Bar - Light Theme */}
            <div className="w-full bg-white rounded-full h-2 overflow-hidden border border-purple-200">
              <div className="bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 h-full rounded-full animate-progress-bar"></div>
            </div>

            {/* Countdown */}
            <div className="text-center mt-4">
              <p className="text-sm text-gray-700">Estimated preparation time</p>
              <p className="text-3xl font-bold text-transparent bg-gradient-to-r from-purple-600 via-pink-500 to-orange-500 bg-clip-text animate-pulse">
                {countdown} minutes
              </p>
            </div>
          </div>

          {/* Order Tracking Steps */}
          <div className="space-y-3 mb-6">
            <div className="flex items-center space-x-3 text-sm">
              <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center animate-scale-in shadow-lg shadow-green-400/50">
                <Check className="w-4 h-4 text-white" />
              </div>
              <span className="text-green-600 font-semibold">Payment Confirmed</span>
            </div>
            <div className="flex items-center space-x-3 text-sm">
              <div className="w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center animate-pulse shadow-lg shadow-orange-400/50">
                <Loader2 className="w-4 h-4 text-white animate-spin" />
              </div>
              <span className="text-orange-600 font-semibold">Preparing Your Order</span>
            </div>
            <div className="flex items-center space-x-3 text-sm opacity-50">
              <div className="w-6 h-6 bg-gray-300 rounded-full flex items-center justify-center">
                <span className="text-xs text-white">3</span>
              </div>
              <span className="text-gray-500">Ready to Serve</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3">
            <button
              onClick={onDownloadReceipt}
              className="w-full py-4 bg-gradient-to-r from-purple-600 via-pink-500 to-orange-500 text-white rounded-2xl font-semibold hover:scale-105 transition-all duration-300 shadow-lg shadow-purple-400/50 flex items-center justify-center space-x-2 border-2 border-purple-400"
            >
              <span>📄</span>
              <span>Download Receipt</span>
            </button>

            <button
              onClick={onClose}
              className="w-full py-4 bg-purple-100 text-purple-700 border-2 border-purple-300 rounded-2xl font-semibold hover:bg-purple-200 transition-all duration-300"
            >
              Close
            </button>
          </div>

          {/* Thank You Message */}
          <p className="text-center text-sm text-gray-700 mt-4 font-medium">
            Thank you for dining with us! 🙏
          </p>
        </div>
      </div>
    </div>
  );
};

const PayBillPage = ({ orders, userInfo }) => {
  const [paymentMethod, setPaymentMethod] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [animateCards, setAnimateCards] = useState(false);

  useEffect(() => {
    setTimeout(() => setAnimateCards(true), 300);
  }, []);

  // Calculate total from all confirmed orders
  const confirmedOrders = orders.filter(order => order.userId === userInfo.userId);

  // Calculate subtotal - handle both order.total and order.items
  const subtotal = confirmedOrders.reduce((sum, order) => {
    if (order.total) {
      return sum + order.total;
    } else if (order.items) {
      // Calculate from items if total is not available
      return sum + order.items.reduce((itemSum, item) => itemSum + (item.price * item.quantity), 0);
    }
    return sum;
  }, 0);

  const gst = (subtotal * 0.05); // 5% GST
  const total = (subtotal + gst).toFixed(2);

  console.log('💰 PayBillPage Debug:', { confirmedOrders, subtotal, gst, total });

  const paymentMethods = [
    {
      id: 'upi',
      name: 'UPI Payment',
      icon: Smartphone,
      color: 'from-purple-500 to-indigo-500',
      hoverColor: 'from-purple-600 to-indigo-600',
      available: true,
      emoji: '📱'
    },
    {
      id: 'cash',
      name: 'Cash Payment',
      icon: Banknote,
      color: 'from-green-500 to-emerald-500',
      hoverColor: 'from-green-600 to-emerald-600',
      available: true,
      emoji: '💵'
    },
    {
      id: 'card',
      name: 'Card Payment',
      icon: CreditCard,
      color: 'from-blue-500 to-cyan-500',
      hoverColor: 'from-blue-600 to-cyan-600',
      available: false,
      emoji: '💳'
    }
  ];

  const handlePayment = async () => {
    if (!paymentMethod) return;

    setIsProcessing(true);

    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 2500));

    // Update orders in backend
    for (const order of confirmedOrders) {
      if (order._id) {
        try {
          const response = await fetch(`http://localhost:5000/api/orders/${order._id}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              paymentStatus: 'paid',
              status: 'confirmed',
              paymentType: paymentMethod === 'cash' ? 'Cash' : 'UPI'
            })
          });

          const data = await response.json();
          if (data.success) {
            console.log('✅ Payment confirmed:', data.order);
          }
        } catch (error) {
          console.error('❌ Error updating payment:', error);
        }
      }
    }

    setIsProcessing(false);
    setShowSuccess(true);
  };

  const generatePDF = () => {
    const doc = new jsPDF();
    const margin = 20;
    const pageWidth = doc.internal.pageSize.getWidth();
    let y = margin;

    // Header
    doc.setFontSize(24);
    doc.setTextColor(210, 120, 30);
    doc.text('NextGen Café', pageWidth / 2, y + 10, { align: 'center' });

    doc.setFontSize(12);
    doc.setTextColor(100, 100, 100);
    doc.text('Payment Receipt', pageWidth / 2, y + 20, { align: 'center' });

    // Bill Details
    y += 35;
    doc.setFontSize(10);
    doc.setTextColor(60, 60, 60);
    doc.text(`Bill ID: bill_${Date.now()}`, margin, y);
    doc.text(`Date: ${new Date().toLocaleDateString()}`, pageWidth - margin - 40, y);

    y += 7;
    doc.text(`Table: ${userInfo.tableId}`, margin, y);
    doc.text(`Time: ${new Date().toLocaleTimeString()}`, pageWidth - margin - 40, y);

    // Items
    y += 15;
    doc.setFontSize(12);
    doc.setTextColor(0, 0, 0);
    doc.text('ORDER SUMMARY', margin, y);

    y += 10;
    doc.setFontSize(10);
    confirmedOrders.forEach(order => {
      order.items.forEach(item => {
        doc.text(item.name, margin, y);
        doc.text(`${item.quantity} x ₹${item.price}`, pageWidth - margin - 60, y);
        doc.text(`₹${(item.price * item.quantity).toFixed(2)}`, pageWidth - margin, y, { align: 'right' });
        y += 7;
      });
    });

    // Totals
    y += 10;
    doc.line(margin, y, pageWidth - margin, y);
    y += 10;

    doc.text('Subtotal:', pageWidth - margin - 60, y);
    doc.text(`₹${subtotal.toFixed(2)}`, pageWidth - margin, y, { align: 'right' });

    y += 7;
    doc.text('GST (5%):', pageWidth - margin - 60, y);
    doc.text(`₹${gst.toFixed(2)}`, pageWidth - margin, y, { align: 'right' });

    y += 10;
    doc.setFontSize(12);
    doc.setTextColor(210, 120, 30);
    doc.text('TOTAL:', pageWidth - margin - 60, y);
    doc.text(`₹${total}`, pageWidth - margin, y, { align: 'right' });

    // Footer
    y += 20;
    doc.setFontSize(11);
    doc.setTextColor(210, 120, 30);
    doc.text('Thank you for choosing NextGen Café!', pageWidth / 2, y, { align: 'center' });

    doc.save(`NextGen_Cafe_Receipt_${Date.now()}.pdf`);
  };

  if (showSuccess) {
    return <SuccessPopup total={total} onClose={() => setShowSuccess(false)} onDownloadReceipt={generatePDF} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50 pb-24 relative overflow-hidden">
      {/* Animated Background Blobs - Light Theme */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-20 left-10 w-96 h-96 bg-purple-200/40 rounded-full blur-3xl animate-blob"></div>
        <div className="absolute top-40 right-20 w-96 h-96 bg-pink-200/40 rounded-full blur-3xl animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-20 left-1/3 w-96 h-96 bg-orange-200/40 rounded-full blur-3xl animate-blob animation-delay-4000"></div>
      </div>

      <div className="relative z-10 px-4 py-8 max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8 animate-fade-in-up">
          <div className="inline-block mb-4 animate-float">
            <Sparkles className="w-16 h-16 text-orange-500 mx-auto animate-pulse drop-shadow-lg" />
          </div>
          <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-purple-600 via-pink-500 to-orange-500 bg-clip-text text-transparent mb-4">
            Complete Payment
          </h1>
          <p className="text-xl text-gray-700 font-semibold">Choose your preferred payment method</p>
        </div>

        {/* Bill Summary Card */}
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden mb-8 border-2 border-purple-200 animate-scale-in">
          <div className="relative p-6 bg-gradient-to-r from-purple-600 via-pink-500 to-orange-500 text-white overflow-hidden">
            {/* Animated Background Pattern */}
            <div className="absolute inset-0 opacity-20">
              <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.2),transparent)]"></div>
            </div>

            <div className="relative z-10">
              <h2 className="text-3xl font-bold mb-2 flex items-center space-x-2">
                <Sparkles className="w-8 h-8 animate-pulse" />
                <span>Bill Summary</span>
              </h2>
              <p className="text-white/90 text-lg">Table #{userInfo.tableId}</p>
            </div>
          </div>

          <div className="p-6 bg-gradient-to-b from-white to-purple-50/30">
            {confirmedOrders.map(order =>
              order.items.map((item, index) => (
                <div
                  key={`${order.id}-${item.id}`}
                  className="group relative bg-white border-2 border-purple-200 rounded-2xl p-4 mb-3 hover:border-purple-400 transition-all duration-300 animate-slide-in-left overflow-hidden shadow-md hover:shadow-lg"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  {/* Hover glow effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-100/0 via-pink-100/0 to-purple-100/0 group-hover:from-purple-100/50 group-hover:via-pink-100/50 group-hover:to-purple-100/50 transition-all duration-500"></div>

                  <div className="relative flex justify-between items-center">
                    <div>
                      <p className="font-bold text-gray-900 text-lg">{item.name}</p>
                      <p className="text-sm text-purple-600">Qty: {item.quantity}</p>
                    </div>
                    <p className="font-black text-2xl bg-gradient-to-r from-purple-600 via-pink-500 to-orange-500 bg-clip-text text-transparent">
                      ₹{(item.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                </div>
              ))
            )}

            <div className="mt-6 pt-4 border-t-2 border-purple-200 space-y-3">
              <div className="flex justify-between text-gray-700">
                <span className="text-lg">Subtotal</span>
                <span className="font-semibold text-gray-900 text-lg">₹{subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-gray-700">
                <span className="text-lg">GST (5%)</span>
                <span className="font-semibold text-gray-900 text-lg">₹{gst.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-3xl font-bold pt-3">
                <span className="text-gray-900">Total</span>
                <span className="text-4xl font-black bg-gradient-to-r from-purple-600 via-pink-500 to-orange-500 bg-clip-text text-transparent">
                  ₹{total}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Payment Method Selection */}
        <div className="mb-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-5 animate-fade-in-up flex items-center space-x-2">
            <Sparkles className="w-7 h-7 text-purple-500" />
            <span>Select Payment Method</span>
          </h3>

          <div className="grid gap-4">
            {paymentMethods.map((method, index) => (
              <button
                key={method.id}
                onClick={() => method.available && setPaymentMethod(method.id)}
                onMouseEnter={() => setSelectedCard(method.id)}
                onMouseLeave={() => setSelectedCard(null)}
                disabled={!method.available}
                className={`relative p-6 rounded-2xl shadow-lg transition-all duration-500 transform overflow-hidden ${animateCards ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'
                  } ${method.available
                    ? `bg-white border-2 ${paymentMethod === method.id
                      ? `border-purple-500 scale-105 shadow-2xl shadow-purple-400/50`
                      : 'border-purple-200 hover:border-purple-400 hover:scale-102'
                    }`
                    : 'bg-gray-100 border-2 border-gray-300 cursor-not-allowed opacity-50'
                  }`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {/* Background glow effect */}
                {paymentMethod === method.id && (
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-100/50 via-pink-100/50 to-purple-100/50"></div>
                )}

                <div className="relative flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className={`text-5xl transition-transform duration-300 ${selectedCard === method.id ? 'scale-110 rotate-12' : ''}`}>
                      {method.emoji}
                    </div>
                    <div className="text-left">
                      <h4 className={`text-xl font-bold ${paymentMethod === method.id ? 'text-purple-600' : 'text-gray-900'}`}>
                        {method.name}
                      </h4>
                      <p className={`text-sm font-semibold ${paymentMethod === method.id
                        ? 'text-purple-500'
                        : method.available
                          ? 'text-green-600'
                          : 'text-orange-600'
                        }`}>
                        {method.available ? '✓ Available' : 'Coming Soon'}
                      </p>
                    </div>
                  </div>

                  {paymentMethod === method.id && (
                    <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center animate-scale-in shadow-lg shadow-purple-500/50">
                      <Check className="w-6 h-6 text-white" strokeWidth={3} />
                    </div>
                  )}
                </div>

                {/* Shimmer effect on hover */}
                {selectedCard === method.id && method.available && (
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-purple-200/30 to-transparent translate-x-[-100%] animate-shimmer"></div>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Proceed Button */}
        <button
          onClick={handlePayment}
          disabled={!paymentMethod || isProcessing}
          className={`relative w-full py-5 rounded-2xl font-bold text-xl transition-all duration-500 overflow-hidden shadow-2xl ${!paymentMethod || isProcessing
            ? 'bg-gray-300 text-gray-500 cursor-not-allowed border-2 border-gray-400'
            : 'bg-gradient-to-r from-purple-600 via-pink-500 to-orange-500 text-white hover:scale-105 hover:shadow-purple-400/60 border-2 border-purple-400'
            } animate-bounce-in`}
        >
          {isProcessing ? (
            <div className="flex items-center justify-center space-x-3">
              <Loader2 className="w-6 h-6 animate-spin" />
              <span>Processing Payment...</span>
            </div>
          ) : (
            <div className="relative z-10 flex items-center justify-center space-x-3 group">
              <Sparkles className="w-6 h-6 group-hover:rotate-180 transition-transform duration-500" />
              <span>Pay ₹{total}</span>
              <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform duration-300" />
            </div>
          )}

          {/* Shimmer effect */}
          {!isProcessing && paymentMethod && (
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent translate-x-[-100%] animate-shimmer"></div>
          )}
        </button>

        {/* Security Badge */}
        <div className="text-center mt-6 animate-fade-in-up" style={{ animationDelay: '0.8s' }}>
          <p className="text-gray-700 font-semibold text-sm flex items-center justify-center space-x-2">
            <span>🔒</span>
            <span>100% Secure Payment</span>
            <span>•</span>
            <span>💎</span>
            <span>Premium Service</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default PayBillPage;
