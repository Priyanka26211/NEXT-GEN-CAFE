import React from 'react';

// Simple QR Code generator component for demonstration
// In production, you'd use a proper QR code library like qrcode
const QRCodeGenerator = ({ tableId }) => {
  const qrData = `${window.location.origin}?table=${tableId}`;
  
  // Using a free QR code API for demonstration
  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(qrData)}`;

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 text-center">
      <h3 className="text-lg font-bold text-gray-900 mb-4">Table {tableId} QR Code</h3>
      <img
        src={qrCodeUrl}
        alt={`QR Code for Table ${tableId}`}
        className="mx-auto mb-4 border rounded-lg"
      />
      <p className="text-sm text-gray-600 mb-2">Scan to access this table</p>
      <p className="text-xs text-gray-500 font-mono bg-gray-100 p-2 rounded break-all">
        {qrData}
      </p>
    </div>
  );
};

export default QRCodeGenerator;