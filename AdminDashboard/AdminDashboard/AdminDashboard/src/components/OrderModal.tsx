import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Order } from '@/data/mockData';

interface OrderModalProps {
  order: Order | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function OrderModal({ order, isOpen, onClose }: OrderModalProps) {
  const [isCompleting, setIsCompleting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  if (!order) return null;
  // Fallback for missing or invalid order data
  const isValidOrder = order && order.items && Array.isArray(order.items) && order.items.length > 0;

  const [isCompleting, setIsCompleting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getStatusColor = (status: string) => {
    switch (status?.toLowerCase()) {
      case 'successful':
        return 'bg-green-100 text-green-800';
      case 'failed':
        return 'bg-red-100 text-red-800';
      case 'cancelled':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-blue-100 text-blue-800';
    }
  };

  // Admin: Complete order handler
  const handleCompleteOrder = async () => {
    setIsCompleting(true);
    setError(null);
    try {
      const response = await fetch(`http://localhost:5000/api/orders/${order.id}/status`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: 'completed', paymentStatus: 'paid' }),
      });
      const data = await response.json();
      if (data.success) {
        onClose(); // Close modal after completion
      } else {
        setError(data.error || 'Failed to complete order');
      }
    } catch {
      setError('Network error: Could not complete order');
    } finally {
      setIsCompleting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        {!isValidOrder ? (
          <div className="p-8 text-center">
            <h2 className="text-xl font-bold text-red-600 mb-4">Order details unavailable</h2>
            <p className="text-gray-700">This order is missing required information or has no items. Please check the backend data.</p>
            <button className="mt-6 px-6 py-2 bg-gradient-to-r from-amber-500 to-orange-600 text-white font-bold rounded-lg shadow-lg" onClick={onClose}>Close</button>
          </div>
        ) : (
          <>
            {/* ...existing code... */}
            <DialogHeader>
              <DialogTitle className="flex items-center justify-between">
                <span className="text-2xl font-bold bg-gradient-to-r from-amber-600 to-amber-700 bg-clip-text text-transparent">
                  Table {order.tableNumber} - Order Details
                </span>
                <Badge className={getStatusColor(order.status)}>
                  {order.status}
                </Badge>
              </DialogTitle>
            </DialogHeader>
            {/* ...existing code... */}
            <div className="space-y-6">
              {/* ...existing code... */}
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}