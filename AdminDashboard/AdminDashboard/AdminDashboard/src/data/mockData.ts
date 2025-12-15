export interface Order {
  id: string;
  tableNumber: number;
  customerName: string;
  customerContact: string;
  items: OrderItem[];
  paymentType: 'UPI' | 'Cash';
  status: 'Successful' | 'Failed' | 'Cancelled' | 'Pending';
  rating: number;
  timestamp: string;
  totalAmount: number;
}

export interface OrderItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

export interface MenuItem {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
}

// Updated menu items with the 11 specified dishes
export const menuItems: MenuItem[] = [
  { id: '1', name: 'Cheese Pizza', price: 320, image: '/api/placeholder/100/100', category: 'Pizza' },
  { id: '2', name: 'Fruit Cake', price: 250, image: '/api/placeholder/100/100', category: 'Dessert' },
  { id: '3', name: 'Croissant', price: 120, image: '/api/placeholder/100/100', category: 'Bakery' },
  { id: '4', name: 'White Chocolate Donut', price: 80, image: '/api/placeholder/100/100', category: 'Dessert' },
  { id: '5', name: 'Dark Chocolate Cake', price: 280, image: '/api/placeholder/100/100', category: 'Dessert' },
  { id: '6', name: 'Burger', price: 350, image: '/api/placeholder/100/100', category: 'Food' },
  { id: '7', name: 'Margherita Pizza', price: 380, image: '/api/placeholder/100/100', category: 'Pizza' },
  { id: '8', name: 'Pasta', price: 300, image: '/api/placeholder/100/100', category: 'Food' },
  { id: '9', name: 'Sandwich', price: 180, image: '/api/placeholder/100/100', category: 'Food' },
  { id: '10', name: 'Iced Latte', price: 150, image: '/api/placeholder/100/100', category: 'Beverage' },
  { id: '11', name: 'Rainbow Cake', price: 320, image: '/api/placeholder/100/100', category: 'Dessert' }
];

// Generate 50 sample orders with realistic data
export const mockOrders: Order[] = [
  { id: '1', tableNumber: 1, customerName: 'John Doe', customerContact: '+91 9876543210', items: [{ id: '7', name: 'Margherita Pizza', price: 380, quantity: 1, image: '/api/placeholder/100/100' }], paymentType: 'UPI', status: 'Successful', rating: 4.5, timestamp: '2024-01-15T10:30:00Z', totalAmount: 380 },
  { id: '2', tableNumber: 3, customerName: 'Sarah Wilson', customerContact: '+91 9876543211', items: [{ id: '1', name: 'Cheese Pizza', price: 320, quantity: 1, image: '/api/placeholder/100/100' }], paymentType: 'Cash', status: 'Successful', rating: 5.0, timestamp: '2024-01-15T11:45:00Z', totalAmount: 320 },
  { id: '3', tableNumber: 5, customerName: 'Mike Johnson', customerContact: '+91 9876543212', items: [{ id: '6', name: 'Burger', price: 350, quantity: 1, image: '/api/placeholder/100/100' }], paymentType: 'UPI', status: 'Failed', rating: 2.0, timestamp: '2024-01-15T12:15:00Z', totalAmount: 350 },
  { id: '4', tableNumber: 2, customerName: 'Emily Davis', customerContact: '+91 9876543213', items: [{ id: '9', name: 'Sandwich', price: 180, quantity: 2, image: '/api/placeholder/100/100' }], paymentType: 'UPI', status: 'Successful', rating: 4.2, timestamp: '2024-01-15T13:20:00Z', totalAmount: 360 },
  { id: '5', tableNumber: 4, customerName: 'David Brown', customerContact: '+91 9876543214', items: [{ id: '8', name: 'Pasta', price: 300, quantity: 1, image: '/api/placeholder/100/100' }], paymentType: 'Cash', status: 'Successful', rating: 4.8, timestamp: '2024-01-15T14:10:00Z', totalAmount: 300 },
  { id: '6', tableNumber: 6, customerName: 'Lisa Anderson', customerContact: '+91 9876543215', items: [{ id: '11', name: 'Rainbow Cake', price: 320, quantity: 1, image: '/api/placeholder/100/100' }], paymentType: 'UPI', status: 'Cancelled', rating: 1.0, timestamp: '2024-01-15T15:30:00Z', totalAmount: 320 },
  { id: '7', tableNumber: 7, customerName: 'Alex Thompson', customerContact: '+91 9876543216', items: [{ id: '4', name: 'White Chocolate Donut', price: 80, quantity: 3, image: '/api/placeholder/100/100' }], paymentType: 'UPI', status: 'Successful', rating: 4.0, timestamp: '2024-01-16T09:15:00Z', totalAmount: 240 },
  { id: '8', tableNumber: 8, customerName: 'Maria Garcia', customerContact: '+91 9876543217', items: [{ id: '7', name: 'Margherita Pizza', price: 380, quantity: 1, image: '/api/placeholder/100/100' }], paymentType: 'Cash', status: 'Successful', rating: 4.7, timestamp: '2024-01-16T10:30:00Z', totalAmount: 380 },
  { id: '9', tableNumber: 1, customerName: 'Robert Lee', customerContact: '+91 9876543218', items: [{ id: '6', name: 'Burger', price: 350, quantity: 2, image: '/api/placeholder/100/100' }], paymentType: 'UPI', status: 'Successful', rating: 3.8, timestamp: '2024-01-16T11:45:00Z', totalAmount: 700 },
  { id: '10', tableNumber: 3, customerName: 'Jennifer White', customerContact: '+91 9876543219', items: [{ id: '3', name: 'Croissant', price: 120, quantity: 2, image: '/api/placeholder/100/100' }], paymentType: 'Cash', status: 'Failed', rating: 2.5, timestamp: '2024-01-16T12:20:00Z', totalAmount: 240 },
  { id: '11', tableNumber: 5, customerName: 'Kevin Martinez', customerContact: '+91 9876543220', items: [{ id: '8', name: 'Pasta', price: 300, quantity: 1, image: '/api/placeholder/100/100' }], paymentType: 'UPI', status: 'Successful', rating: 4.3, timestamp: '2024-01-16T13:15:00Z', totalAmount: 300 },
  { id: '12', tableNumber: 2, customerName: 'Amanda Taylor', customerContact: '+91 9876543221', items: [{ id: '1', name: 'Cheese Pizza', price: 320, quantity: 1, image: '/api/placeholder/100/100' }], paymentType: 'UPI', status: 'Successful', rating: 4.6, timestamp: '2024-01-16T14:30:00Z', totalAmount: 320 },
  { id: '13', tableNumber: 4, customerName: 'Daniel Wilson', customerContact: '+91 9876543222', items: [{ id: '5', name: 'Dark Chocolate Cake', price: 280, quantity: 1, image: '/api/placeholder/100/100' }], paymentType: 'Cash', status: 'Successful', rating: 4.9, timestamp: '2024-01-16T15:45:00Z', totalAmount: 280 },
  { id: '14', tableNumber: 6, customerName: 'Rachel Green', customerContact: '+91 9876543223', items: [{ id: '7', name: 'Margherita Pizza', price: 380, quantity: 1, image: '/api/placeholder/100/100' }], paymentType: 'UPI', status: 'Cancelled', rating: 1.5, timestamp: '2024-01-16T16:20:00Z', totalAmount: 380 },
  { id: '15', tableNumber: 7, customerName: 'Chris Evans', customerContact: '+91 9876543224', items: [{ id: '6', name: 'Burger', price: 350, quantity: 1, image: '/api/placeholder/100/100' }], paymentType: 'UPI', status: 'Successful', rating: 4.4, timestamp: '2024-01-17T09:30:00Z', totalAmount: 350 },
  { id: '16', tableNumber: 8, customerName: 'Natalie Portman', customerContact: '+91 9876543225', items: [{ id: '9', name: 'Sandwich', price: 180, quantity: 3, image: '/api/placeholder/100/100' }], paymentType: 'Cash', status: 'Successful', rating: 3.9, timestamp: '2024-01-17T10:15:00Z', totalAmount: 540 },
  { id: '17', tableNumber: 1, customerName: 'Tom Hardy', customerContact: '+91 9876543226', items: [{ id: '8', name: 'Pasta', price: 300, quantity: 2, image: '/api/placeholder/100/100' }], paymentType: 'UPI', status: 'Successful', rating: 4.1, timestamp: '2024-01-17T11:45:00Z', totalAmount: 600 },
  { id: '18', tableNumber: 3, customerName: 'Emma Stone', customerContact: '+91 9876543227', items: [{ id: '3', name: 'Croissant', price: 120, quantity: 1, image: '/api/placeholder/100/100' }], paymentType: 'UPI', status: 'Failed', rating: 2.8, timestamp: '2024-01-17T12:30:00Z', totalAmount: 120 },
  { id: '19', tableNumber: 5, customerName: 'Ryan Gosling', customerContact: '+91 9876543228', items: [{ id: '1', name: 'Cheese Pizza', price: 320, quantity: 1, image: '/api/placeholder/100/100' }], paymentType: 'Cash', status: 'Successful', rating: 4.7, timestamp: '2024-01-17T13:20:00Z', totalAmount: 320 },
  { id: '20', tableNumber: 2, customerName: 'Scarlett Johansson', customerContact: '+91 9876543229', items: [{ id: '4', name: 'White Chocolate Donut', price: 80, quantity: 4, image: '/api/placeholder/100/100' }], paymentType: 'UPI', status: 'Successful', rating: 4.2, timestamp: '2024-01-17T14:45:00Z', totalAmount: 320 },
  { id: '21', tableNumber: 4, customerName: 'Leonardo DiCaprio', customerContact: '+91 9876543230', items: [{ id: '7', name: 'Margherita Pizza', price: 380, quantity: 2, image: '/api/placeholder/100/100' }], paymentType: 'Cash', status: 'Successful', rating: 4.8, timestamp: '2024-01-17T15:30:00Z', totalAmount: 760 },
  { id: '22', tableNumber: 6, customerName: 'Anne Hathaway', customerContact: '+91 9876543231', items: [{ id: '11', name: 'Rainbow Cake', price: 320, quantity: 1, image: '/api/placeholder/100/100' }], paymentType: 'UPI', status: 'Successful', rating: 4.5, timestamp: '2024-01-17T16:15:00Z', totalAmount: 320 },
  { id: '23', tableNumber: 7, customerName: 'Bradley Cooper', customerContact: '+91 9876543232', items: [{ id: '6', name: 'Burger', price: 350, quantity: 1, image: '/api/placeholder/100/100' }], paymentType: 'UPI', status: 'Failed', rating: 3.0, timestamp: '2024-01-18T09:20:00Z', totalAmount: 350 },
  { id: '24', tableNumber: 8, customerName: 'Jennifer Lawrence', customerContact: '+91 9876543233', items: [{ id: '8', name: 'Pasta', price: 300, quantity: 1, image: '/api/placeholder/100/100' }], paymentType: 'Cash', status: 'Successful', rating: 4.3, timestamp: '2024-01-18T10:45:00Z', totalAmount: 300 },
  { id: '25', tableNumber: 1, customerName: 'Matt Damon', customerContact: '+91 9876543234', items: [{ id: '1', name: 'Cheese Pizza', price: 320, quantity: 1, image: '/api/placeholder/100/100' }], paymentType: 'UPI', status: 'Successful', rating: 4.6, timestamp: '2024-01-18T11:30:00Z', totalAmount: 320 },
  { id: '26', tableNumber: 3, customerName: 'Margot Robbie', customerContact: '+91 9876543235', items: [{ id: '5', name: 'Dark Chocolate Cake', price: 280, quantity: 2, image: '/api/placeholder/100/100' }], paymentType: 'UPI', status: 'Successful', rating: 4.9, timestamp: '2024-01-18T12:15:00Z', totalAmount: 560 },
  { id: '27', tableNumber: 5, customerName: 'Will Smith', customerContact: '+91 9876543236', items: [{ id: '4', name: 'White Chocolate Donut', price: 80, quantity: 2, image: '/api/placeholder/100/100' }], paymentType: 'Cash', status: 'Cancelled', rating: 2.0, timestamp: '2024-01-18T13:45:00Z', totalAmount: 160 },
  { id: '28', tableNumber: 2, customerName: 'Angelina Jolie', customerContact: '+91 9876543237', items: [{ id: '7', name: 'Margherita Pizza', price: 380, quantity: 1, image: '/api/placeholder/100/100' }], paymentType: 'UPI', status: 'Successful', rating: 4.4, timestamp: '2024-01-18T14:20:00Z', totalAmount: 380 },
  { id: '29', tableNumber: 4, customerName: 'Brad Pitt', customerContact: '+91 9876543238', items: [{ id: '6', name: 'Burger', price: 350, quantity: 2, image: '/api/placeholder/100/100' }], paymentType: 'Cash', status: 'Successful', rating: 4.1, timestamp: '2024-01-18T15:10:00Z', totalAmount: 700 },
  { id: '30', tableNumber: 6, customerName: 'Meryl Streep', customerContact: '+91 9876543239', items: [{ id: '9', name: 'Sandwich', price: 180, quantity: 1, image: '/api/placeholder/100/100' }], paymentType: 'UPI', status: 'Successful', rating: 4.7, timestamp: '2024-01-18T16:30:00Z', totalAmount: 180 },
  { id: '31', tableNumber: 7, customerName: 'George Clooney', customerContact: '+91 9876543240', items: [{ id: '2', name: 'Fruit Cake', price: 250, quantity: 2, image: '/api/placeholder/100/100' }], paymentType: 'UPI', status: 'Successful', rating: 4.3, timestamp: '2024-01-19T09:15:00Z', totalAmount: 500 },
  { id: '32', tableNumber: 8, customerName: 'Julia Roberts', customerContact: '+91 9876543241', items: [{ id: '1', name: 'Cheese Pizza', price: 320, quantity: 1, image: '/api/placeholder/100/100' }], paymentType: 'Cash', status: 'Failed', rating: 2.5, timestamp: '2024-01-19T10:30:00Z', totalAmount: 320 },
  { id: '33', tableNumber: 1, customerName: 'Denzel Washington', customerContact: '+91 9876543242', items: [{ id: '7', name: 'Margherita Pizza', price: 380, quantity: 1, image: '/api/placeholder/100/100' }], paymentType: 'UPI', status: 'Successful', rating: 4.8, timestamp: '2024-01-19T11:45:00Z', totalAmount: 380 },
  { id: '34', tableNumber: 3, customerName: 'Sandra Bullock', customerContact: '+91 9876543243', items: [{ id: '3', name: 'Croissant', price: 120, quantity: 4, image: '/api/placeholder/100/100' }], paymentType: 'UPI', status: 'Successful', rating: 4.2, timestamp: '2024-01-19T12:20:00Z', totalAmount: 480 },
  { id: '35', tableNumber: 5, customerName: 'Morgan Freeman', customerContact: '+91 9876543244', items: [{ id: '6', name: 'Burger', price: 350, quantity: 1, image: '/api/placeholder/100/100' }], paymentType: 'Cash', status: 'Successful', rating: 4.5, timestamp: '2024-01-19T13:15:00Z', totalAmount: 350 },
  { id: '36', tableNumber: 2, customerName: 'Charlize Theron', customerContact: '+91 9876543245', items: [{ id: '11', name: 'Rainbow Cake', price: 320, quantity: 1, image: '/api/placeholder/100/100' }], paymentType: 'UPI', status: 'Cancelled', rating: 1.8, timestamp: '2024-01-19T14:30:00Z', totalAmount: 320 },
  { id: '37', tableNumber: 4, customerName: 'Hugh Jackman', customerContact: '+91 9876543246', items: [{ id: '8', name: 'Pasta', price: 300, quantity: 2, image: '/api/placeholder/100/100' }], paymentType: 'UPI', status: 'Successful', rating: 4.6, timestamp: '2024-01-19T15:45:00Z', totalAmount: 600 },
  { id: '38', tableNumber: 6, customerName: 'Nicole Kidman', customerContact: '+91 9876543247', items: [{ id: '1', name: 'Cheese Pizza', price: 320, quantity: 2, image: '/api/placeholder/100/100' }], paymentType: 'Cash', status: 'Successful', rating: 4.4, timestamp: '2024-01-19T16:20:00Z', totalAmount: 640 },
  { id: '39', tableNumber: 7, customerName: 'Russell Crowe', customerContact: '+91 9876543248', items: [{ id: '4', name: 'White Chocolate Donut', price: 80, quantity: 5, image: '/api/placeholder/100/100' }], paymentType: 'UPI', status: 'Successful', rating: 3.9, timestamp: '2024-01-20T09:30:00Z', totalAmount: 400 },
  { id: '40', tableNumber: 8, customerName: 'Cate Blanchett', customerContact: '+91 9876543249', items: [{ id: '5', name: 'Dark Chocolate Cake', price: 280, quantity: 1, image: '/api/placeholder/100/100' }], paymentType: 'UPI', status: 'Failed', rating: 2.2, timestamp: '2024-01-20T10:15:00Z', totalAmount: 280 },
  { id: '41', tableNumber: 1, customerName: 'Robert Downey Jr', customerContact: '+91 9876543250', items: [{ id: '6', name: 'Burger', price: 350, quantity: 3, image: '/api/placeholder/100/100' }], paymentType: 'Cash', status: 'Successful', rating: 4.7, timestamp: '2024-01-20T11:45:00Z', totalAmount: 1050 },
  { id: '42', tableNumber: 3, customerName: 'Gwyneth Paltrow', customerContact: '+91 9876543251', items: [{ id: '9', name: 'Sandwich', price: 180, quantity: 2, image: '/api/placeholder/100/100' }], paymentType: 'UPI', status: 'Successful', rating: 4.0, timestamp: '2024-01-20T12:30:00Z', totalAmount: 360 },
  { id: '43', tableNumber: 5, customerName: 'Mark Wahlberg', customerContact: '+91 9876543252', items: [{ id: '1', name: 'Cheese Pizza', price: 320, quantity: 1, image: '/api/placeholder/100/100' }], paymentType: 'Cash', status: 'Successful', rating: 4.3, timestamp: '2024-01-20T13:45:00Z', totalAmount: 320 },
  { id: '44', tableNumber: 2, customerName: 'Reese Witherspoon', customerContact: '+91 9876543253', items: [{ id: '8', name: 'Pasta', price: 300, quantity: 1, image: '/api/placeholder/100/100' }], paymentType: 'UPI', status: 'Failed', rating: 2.7, timestamp: '2024-01-20T14:20:00Z', totalAmount: 300 },
  { id: '45', tableNumber: 4, customerName: 'Matthew McConaughey', customerContact: '+91 9876543254', items: [{ id: '7', name: 'Margherita Pizza', price: 380, quantity: 1, image: '/api/placeholder/100/100' }], paymentType: 'UPI', status: 'Successful', rating: 4.6, timestamp: '2024-01-20T15:10:00Z', totalAmount: 380 },
  { id: '46', tableNumber: 6, customerName: 'Amy Adams', customerContact: '+91 9876543255', items: [{ id: '3', name: 'Croissant', price: 120, quantity: 3, image: '/api/placeholder/100/100' }], paymentType: 'Cash', status: 'Successful', rating: 4.1, timestamp: '2024-01-20T16:30:00Z', totalAmount: 360 },
  { id: '47', tableNumber: 7, customerName: 'Jake Gyllenhaal', customerContact: '+91 9876543256', items: [{ id: '6', name: 'Burger', price: 350, quantity: 1, image: '/api/placeholder/100/100' }], paymentType: 'UPI', status: 'Successful', rating: 4.4, timestamp: '2024-01-21T09:15:00Z', totalAmount: 350 },
  { id: '48', tableNumber: 8, customerName: 'Jessica Chastain', customerContact: '+91 9876543257', items: [{ id: '9', name: 'Sandwich', price: 180, quantity: 1, image: '/api/placeholder/100/100' }], paymentType: 'Cash', status: 'Cancelled', rating: 1.5, timestamp: '2024-01-21T10:45:00Z', totalAmount: 180 },
  { id: '49', tableNumber: 1, customerName: 'Ryan Reynolds', customerContact: '+91 9876543258', items: [{ id: '1', name: 'Cheese Pizza', price: 320, quantity: 2, image: '/api/placeholder/100/100' }], paymentType: 'UPI', status: 'Successful', rating: 4.5, timestamp: '2024-01-21T11:30:00Z', totalAmount: 640 },
  { id: '50', tableNumber: 3, customerName: 'Blake Lively', customerContact: '+91 9876543259', items: [{ id: '10', name: 'Iced Latte', price: 150, quantity: 2, image: '/api/placeholder/100/100' }], paymentType: 'Cash', status: 'Successful', rating: 4.2, timestamp: '2024-01-21T12:15:00Z', totalAmount: 300 }
];

// Generate revenue data for time hierarchy chart
export const revenueByTime = [
  { period: 'Jan 2024', revenue: 45000, year: 2024, quarter: 'Q1', month: 'Jan' },
  { period: 'Feb 2024', revenue: 52000, year: 2024, quarter: 'Q1', month: 'Feb' },
  { period: 'Mar 2024', revenue: 48000, year: 2024, quarter: 'Q1', month: 'Mar' },
  { period: 'Apr 2024', revenue: 55000, year: 2024, quarter: 'Q2', month: 'Apr' },
  { period: 'May 2024', revenue: 61000, year: 2024, quarter: 'Q2', month: 'May' },
  { period: 'Jun 2024', revenue: 58000, year: 2024, quarter: 'Q2', month: 'Jun' },
];

// Helper functions
export const calculateTotalQuantity = (orders: Order[]) => {
  return orders.reduce((total, order) => {
    return total + order.items.reduce((itemTotal, item) => itemTotal + item.quantity, 0);
  }, 0);
};

export const calculateTotalRevenue = (orders: Order[]) => {
  return orders.filter(order => order.status === 'Successful').reduce((total, order) => total + order.totalAmount, 0);
};

export const calculateAverageRating = (orders: Order[]) => {
  const successfulOrders = orders.filter(order => order.status === 'Successful');
  if (successfulOrders.length === 0) return 0;
  const totalRating = successfulOrders.reduce((total, order) => total + order.rating, 0);
  return totalRating / successfulOrders.length;
};

export const calculateSuccessRate = (orders: Order[]) => {
  const successfulOrders = orders.filter(order => order.status === 'Successful').length;
  return orders.length > 0 ? (successfulOrders / orders.length) * 100 : 0;
};

export const getRevenueByProduct = (orders: Order[]) => {
  const productRevenue: { [key: string]: number } = {};

  orders.filter(order => order.status === 'Successful').forEach(order => {
    order.items.forEach(item => {
      if (productRevenue[item.name]) {
        productRevenue[item.name] += item.price * item.quantity;
      } else {
        productRevenue[item.name] = item.price * item.quantity;
      }
    });
  });

  return Object.entries(productRevenue).map(([name, revenue]) => ({ name, revenue }));
};

export const getTopDishes = (orders: Order[]) => {
  const dishStats: { [key: string]: { revenue: number, quantity: number, image: string } } = {};

  orders.filter(order => order.status === 'Successful').forEach(order => {
    order.items.forEach(item => {
      if (dishStats[item.name]) {
        dishStats[item.name].revenue += item.price * item.quantity;
        dishStats[item.name].quantity += item.quantity;
      } else {
        dishStats[item.name] = {
          revenue: item.price * item.quantity,
          quantity: item.quantity,
          image: item.image
        };
      }
    });
  });

  return Object.entries(dishStats)
    .map(([name, stats]) => ({ name, ...stats }))
    .sort((a, b) => b.revenue - a.revenue)
    .slice(0, 3);
};