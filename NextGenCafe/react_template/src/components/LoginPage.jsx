import React, { useState, useRef, useEffect } from 'react';
import { Html5QrcodeScanner } from 'html5-qrcode';

const LoginPage = ({ onLogin }) => {
  const [tableId, setTableId] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isScanning, setIsScanning] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const scannerRef = useRef(null);

  // Fade-in animation on mount
  useEffect(() => {
    setTimeout(() => setIsVisible(true), 100);
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!name.trim()) {
      alert('Please enter your name.');
      return;
    }
    const phoneDigits = phone.replace(/\D/g, '');
    if (phoneDigits.length < 10) {
      alert('Please enter a valid phone number (10+ digits).');
      return;
    }
    if (!tableId || tableId < 1 || tableId > 8) {
      alert('Please enter a valid table number (1-8).');
      return;
    }

    setIsLoading(true);

    try {
      const payload = {
        name: name.trim(),
        phone: phoneDigits,
        tableNumber: parseInt(tableId),
        userId: `user${tableId}`,
        loginTime: new Date().toISOString()
      };

      const res = await fetch("/api/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      const data = await res.json();

      const userData = {
        tableId: payload.tableNumber,
        userId: data?.user?._id || payload.userId,
        loginTime: payload.loginTime,
        name: payload.name,
        phone: payload.phone
      };

      // Small delay to preserve the existing animation feel
      setTimeout(() => onLogin(userData), 500);
    } catch (err) {
      console.error("Failed to store user", err);
      // Fallback to local login only
      const userData = {
        tableId: parseInt(tableId),
        userId: `user${tableId}`,
        loginTime: new Date().toISOString(),
        name: name.trim(),
        phone: phoneDigits
      };
      setTimeout(() => onLogin(userData), 500);
    }
  };

  const handleQRScan = () => {
    setIsScanning(true);
  };

  const stopScanning = () => {
    if (scannerRef.current) {
      scannerRef.current.clear();
      scannerRef.current = null;
    }
    setIsScanning(false);
  };

  const onScanSuccess = (decodedText) => {
    try {
      // Extract table ID from URL
      const url = new URL(decodedText);
      const scannedTableId = url.searchParams.get('table');

      if (scannedTableId && scannedTableId >= 1 && scannedTableId <= 12) {
        stopScanning();
        setIsLoading(true);

        setTimeout(() => {
          const userData = {
            tableId: parseInt(scannedTableId),
            userId: `user${scannedTableId}`,
            loginTime: new Date().toISOString()
          };
          onLogin(userData);
        }, 1000);
      } else {
        alert('Invalid QR code. Please scan a valid table QR code.');
      }
    } catch (error) {
      alert('Invalid QR code format. Please scan a valid URL.');
    }
  };

  const onScanError = (errorMessage) => {
    // Handle scan error silently - most errors are just "no QR code found"
    console.log('QR scan error:', errorMessage);
  };

  useEffect(() => {
    if (isScanning) {
      const config = {
        fps: 10,
        qrbox: { width: 250, height: 250 },
        aspectRatio: 1.0
      };

      scannerRef.current = new Html5QrcodeScanner(
        'qr-reader',
        config,
        false
      );

      scannerRef.current.render(onScanSuccess, onScanError);
    }

    return () => {
      if (scannerRef.current) {
        scannerRef.current.clear();
      }
    };
  }, [isScanning]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 via-orange-100 to-teal-50 p-6 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-10 w-32 h-32 bg-orange-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
        <div className="absolute top-20 right-20 w-32 h-32 bg-teal-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-20 left-32 w-32 h-32 bg-orange-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
      </div>

      <div className={`max-w-md w-full space-y-8 bg-white/90 backdrop-blur-lg rounded-3xl shadow-2xl p-8 transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
        {/* Header */}
        <div className="text-center">
          <div className="relative inline-block">
            <div className="w-24 h-24 mx-auto bg-gradient-to-br from-orange-400 via-orange-500 to-teal-500 rounded-3xl flex items-center justify-center shadow-2xl transform hover:scale-110 hover:rotate-6 transition-all duration-300 animate-float">
              <img src="coffee-cup.png" alt="Cafe Logo" className="w-14 h-14" />
            </div>
            <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-teal-400 rounded-full animate-ping"></div>
          </div>
          <h2 className="mt-8 text-4xl font-bold text-gray-900 animate-fade-in-up">Welcome to</h2>
          <h1 className="mt-2 text-3xl font-extrabold bg-gradient-to-r from-orange-600 via-orange-500 to-teal-600 bg-clip-text text-transparent animate-fade-in-up animation-delay-200">
            NextGen Café
          </h1>
          <p className="mt-4 text-sm text-gray-600 animate-fade-in-up animation-delay-400">
            🌟 Experience premium dining with a digital touch
          </p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleLogin} className="space-y-6">
          {/* Name */}
          <div className="transform transition-all duration-500 hover:scale-105">
            <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-3">
              👤 Your Name
            </label>
            <input
              id="name"
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-6 py-4 border-2 border-gray-200 rounded-2xl focus:ring-4 focus:ring-orange-300 focus:border-orange-500 text-lg transition-all duration-300 hover:border-orange-300 hover:shadow-lg"
              placeholder="John Doe"
              disabled={isLoading}
            />
          </div>

          {/* Phone */}
          <div className="transform transition-all duration-500 hover:scale-105">
            <label htmlFor="phone" className="block text-sm font-semibold text-gray-700 mb-3">
              📞 Phone Number
            </label>
            <input
              id="phone"
              type="tel"
              required
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full px-6 py-4 border-2 border-gray-200 rounded-2xl focus:ring-4 focus:ring-orange-300 focus:border-orange-500 text-lg transition-all duration-300 hover:border-orange-300 hover:shadow-lg"
              placeholder="98765 43210"
              disabled={isLoading}
            />
          </div>
          <div className="transform transition-all duration-500 hover:scale-105">
            <label htmlFor="tableId" className="block text-sm font-semibold text-gray-700 mb-3 flex items-center">
              <span className="mr-2">🪑</span>
              Table Number
            </label>
            <input
              id="tableId"
              type="number"
              required
              min="1"
              max="8"
              value={tableId}
              onChange={(e) => setTableId(e.target.value)}
              className="w-full px-6 py-4 border-2 border-gray-200 rounded-2xl focus:ring-4 focus:ring-orange-300 focus:border-orange-500 text-xl text-center font-bold transition-all duration-300 hover:border-orange-300 hover:shadow-lg"
              placeholder="1 - 8"
              disabled={isLoading}
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-gradient-to-r from-orange-500 via-orange-600 to-teal-500 text-white py-4 px-6 rounded-2xl font-bold text-lg hover:from-orange-600 hover:via-orange-700 hover:to-teal-600 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl disabled:opacity-50 disabled:scale-100 disabled:cursor-not-allowed relative overflow-hidden group"
          >
            <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-white/0 via-white/20 to-white/0 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></span>
            {isLoading ? (
              <div className="flex items-center justify-center space-x-3">
                <div className="w-6 h-6 border-3 border-white border-t-transparent rounded-full animate-spin"></div>
                <span className="animate-pulse">Preparing your table...</span>
              </div>
            ) : (
              <span className="flex items-center justify-center space-x-2">
                <span>Enter Café</span>
                <span className="text-xl transform group-hover:translate-x-1 transition-transform duration-300">→</span>
              </span>
            )}
          </button>
        </form>

        {/* QR Code Option */}
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t-2 border-gray-200"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-4 bg-white text-gray-500 font-medium">or scan to enter</span>
          </div>
        </div>

        {!isScanning ? (
          <button
            onClick={handleQRScan}
            className="w-full bg-gradient-to-r from-white to-orange-50 border-2 border-orange-300 text-orange-600 py-4 px-6 rounded-2xl font-bold text-lg hover:border-orange-400 hover:shadow-xl transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-3 group"
          >
            <span className="text-2xl transform group-hover:rotate-12 transition-transform duration-300">📱</span>
            <span>Scan Table QR Code</span>
          </button>
        ) : (
          <div className="space-y-4 animate-fade-in">
            <div className="text-center">
              <p className="text-sm text-gray-600 mb-4 font-medium animate-pulse">📸 Position the QR code within the frame</p>
              <div id="qr-reader" className="w-full rounded-2xl overflow-hidden shadow-xl"></div>
            </div>
            <button
              onClick={stopScanning}
              className="w-full bg-gradient-to-r from-red-100 to-red-200 text-red-700 py-4 px-6 rounded-2xl font-bold text-lg hover:from-red-200 hover:to-red-300 transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
            >
              ✕ Cancel Scanning
            </button>
          </div>
        )}

        <div className="flex items-center justify-center space-x-2 pt-4">
          <div className="w-2 h-2 bg-orange-400 rounded-full animate-pulse"></div>
          <p className="text-xs text-gray-500 text-center">
            Secure session • Auto-saved progress
          </p>
          <div className="w-2 h-2 bg-teal-400 rounded-full animate-pulse animation-delay-1000"></div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;