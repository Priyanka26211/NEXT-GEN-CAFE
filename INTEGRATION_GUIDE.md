# 🎯 NextGen Café - Complete Integration Guide

## 📋 Overview

This guide documents the complete integration between three projects:
- **NextGenCafe Frontend** - Customer ordering app
- **NextGenCafe Backend** - API server with MongoDB
- **AdminDashboard** - Real-time order management dashboard

---

## 🏗️ Architecture

```
┌─────────────────────┐
│  NextGenCafe        │
│  Frontend           │
│  (Port 5174)        │
│  - Customer orders  │
│  - Menu browsing    │
│  - Payment          │
└──────────┬──────────┘
           │
           │ POST /api/orders
           │ (Create Order)
           ▼
┌─────────────────────┐
│  NextGenCafe        │
│  Backend API        │
│  (Port 5000)        │
│  - Express Server   │
│  - MongoDB          │
│  - Order API        │
│  - Payment API      │
└──────────┬──────────┘
           │
           │ GET /api/orders
           │ (Fetch Orders)
           ▼
┌─────────────────────┐
│  AdminDashboard     │
│  (Port 5173)        │
│  - Order tracking   │
│  - Analytics        │
│  - Real-time updates│
└─────────────────────┘
```

---

## 🚀 Running All Projects

### 1. Start Backend Server
```powershell
cd 'd:\port\NextGenCafe\NextGenCafe\Backend'
npm run dev
```
**Expected Output:**
```
🚀 Server running on port 5000
✅ MongoDB connected
```

### 2. Start NextGenCafe Frontend (Customer App)
```powershell
cd 'd:\port\NextGenCafe\NextGenCafe\react_template'
npm run dev
```
**URL:** http://localhost:5174/

### 3. Start AdminDashboard
```powershell
cd 'd:\port\AdminDashboard\AdminDashboard\AdminDashboard'
npm run dev
```
**URL:** http://localhost:5173/

---

## 🔄 Complete Order Flow

### Step 1: Customer Places Order
1. Open **NextGenCafe Frontend** at http://localhost:5174/
2. Login with a table number (e.g., Table 5)
3. Browse menu and add items to cart
4. Click "Place Order"
5. **What happens:**
   - Order is saved to local state (immediate feedback)
   - Order is sent to backend via `POST /api/orders`
   - Backend saves order to MongoDB
   - Order is auto-confirmed after 3 seconds

### Step 2: Order Appears in Admin Dashboard
1. Open **AdminDashboard** at http://localhost:5173/
2. Dashboard auto-refreshes every 5 seconds
3. **You will see:**
   - New order appears in the cafe layout
   - Table status updates
   - Revenue statistics update
   - Order details in analytics charts

### Step 3: Real-time Updates
- AdminDashboard polls backend every 5 seconds
- New orders appear automatically without manual refresh
- Click "Refresh" button for immediate update

---

## 📡 API Endpoints

### Backend API (http://localhost:5000)

#### 1. Create Order
```http
POST /api/orders
Content-Type: application/json

{
  "userId": "user5",
  "tableNumber": 5,
  "items": [
    {
      "id": "1",
      "name": "Cheese Pizza",
      "price": 320,
      "quantity": 2,
      "image": "/api/placeholder/100/100"
    }
  ],
  "status": "pending",
  "totalAmount": 640,
  "paymentType": "Cash",
  "paymentStatus": "pending"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Order created successfully",
  "order": {
    "_id": "68efc0944126d96e842eb859",
    "tableNumber": 5,
    "userId": "user5",
    "items": [...],
    "status": "pending",
    "totalAmount": 640,
    "createdAt": "2025-10-15T15:41:08.731Z",
    ...
  }
}
```

#### 2. Get All Orders
```http
GET /api/orders
```

**Response:**
```json
{
  "success": true,
  "count": 10,
  "orders": [...]
}
```

#### 3. Get Orders by Table
```http
GET /api/orders/table/:tableNumber
```

#### 4. Update Order Status
```http
PUT /api/orders/:orderId
Content-Type: application/json

{
  "status": "completed",
  "paymentStatus": "paid",
  "rating": 5,
  "feedback": "Great service!"
}
```

#### 5. Delete Order
```http
DELETE /api/orders/:orderId
```

---

## 🗄️ Database Schema

### Order Model (MongoDB)
```javascript
{
  tableNumber: Number,        // Table number in cafe
  userId: String,             // Customer user ID
  customerName: String,       // Optional customer name
  customerContact: String,    // Optional contact
  items: [                    // Array of ordered items
    {
      id: String,
      name: String,
      price: Number,
      quantity: Number,
      image: String
    }
  ],
  status: String,             // pending, confirmed, preparing, ready, completed, cancelled
  paymentType: String,        // UPI, Cash, Card
  paymentStatus: String,      // pending, paid, failed
  totalAmount: Number,        // Total order amount
  rating: Number,             // 0-5 star rating
  feedback: String,           // Customer feedback
  createdAt: Date,           // Auto-generated
  updatedAt: Date            // Auto-updated
}
```

---

## 🧪 Testing the Integration

### Test 1: Create Order via API
```powershell
$body = @{
    userId = "testuser1"
    tableNumber = 5
    items = @(
        @{
            id = "1"
            name = "Cheese Pizza"
            price = 320
            quantity = 2
            image = "/api/placeholder/100/100"
        }
    )
    status = "confirmed"
    totalAmount = 640
    paymentType = "UPI"
    paymentStatus = "paid"
} | ConvertTo-Json -Depth 10

Invoke-WebRequest -Uri "http://localhost:5000/api/orders" -Method POST -Body $body -ContentType "application/json"
```

### Test 2: Verify Order in Admin Dashboard
1. Open http://localhost:5173/
2. Check if order appears in cafe layout
3. Verify analytics are updated

### Test 3: Complete User Flow
1. Open NextGenCafe Frontend: http://localhost:5174/
2. Login as Table 5
3. Add items: Burger (₹350) + Pizza (₹320)
4. Place order
5. Open AdminDashboard: http://localhost:5173/
6. Verify order appears with:
   - Table Number: 5
   - Total: ₹670
   - Status: Confirmed
   - Real-time update within 5 seconds

---

## ✅ Integration Checklist

- [x] Backend Order Model created
- [x] Backend Order Controller created
- [x] Backend Order Routes created
- [x] Backend server.js updated with order routes
- [x] Frontend MainApp.jsx sends orders to backend
- [x] AdminDashboard fetches real orders from backend
- [x] Auto-refresh every 5 seconds in AdminDashboard
- [x] Order transformation between frontend/backend formats
- [x] Error handling in all API calls
- [x] Loading states in AdminDashboard

---

## 🎨 Features

### NextGenCafe Frontend
- ✅ Table-based login via QR code or manual entry
- ✅ Browse menu with categories
- ✅ Add items to cart
- ✅ Place orders (saved to backend)
- ✅ Order confirmation screen
- ✅ Payment integration (Razorpay)
- ✅ Feedback system

### Backend API
- ✅ Express server with MongoDB
- ✅ Order CRUD operations
- ✅ Payment processing
- ✅ Real-time order storage
- ✅ CORS enabled for frontend access

### AdminDashboard
- ✅ Real-time order display
- ✅ Cafe layout with table status
- ✅ Revenue analytics
- ✅ Top dishes tracking
- ✅ Order filtering by dish/rating
- ✅ Auto-refresh every 5 seconds
- ✅ Manual refresh button
- ✅ Beautiful UI with charts

---

## 🔧 Configuration

### Backend .env File
```env
MONGO_URI=mongodb+srv://...
PORT=5000
RAZORPAY_KEY_ID=your_key
RAZORPAY_KEY_SECRET=your_secret
```

### Frontend API Configuration
- Backend URL: `http://localhost:5000`
- Auto-configured in code

---

## 📊 Data Flow

1. **Customer places order:**
   ```
   NextGenCafe → POST /api/orders → MongoDB
   ```

2. **Admin views orders:**
   ```
   AdminDashboard → GET /api/orders → MongoDB → Display
   ```

3. **Real-time sync:**
   ```
   AdminDashboard polls every 5s → GET /api/orders → Updates UI
   ```

---

## 🐛 Troubleshooting

### Issue: Orders not appearing in Admin Dashboard
**Solution:**
1. Check backend is running on port 5000
2. Check MongoDB connection is successful
3. Open browser console in AdminDashboard
4. Look for API errors
5. Click "Refresh" button manually

### Issue: Frontend can't connect to backend
**Solution:**
1. Verify backend is running: `http://localhost:5000/api/orders`
2. Check CORS is enabled in backend
3. Check browser console for CORS errors

### Issue: MongoDB connection failed
**Solution:**
1. Check `.env` file has valid `MONGO_URI`
2. Verify MongoDB Atlas IP whitelist
3. Check network connection

---

## 🎉 Success Indicators

When everything is working:
- ✅ Backend shows: `🚀 Server running on port 5000` and `✅ MongoDB connected`
- ✅ Frontend shows: `VITE v5.4.20 ready in XXXXms`
- ✅ AdminDashboard shows: `VITE v5.4.20 ready in XXXXms`
- ✅ Orders placed in NextGenCafe appear in AdminDashboard within 5 seconds
- ✅ No console errors in any browser window

---

## 📝 Notes

- AdminDashboard auto-refreshes every 5 seconds
- Orders are stored permanently in MongoDB
- Mock data is used as fallback if backend is unavailable
- All timestamps are in ISO format
- Prices are in Indian Rupees (₹)

---

## 🚀 Next Steps (Optional Enhancements)

1. **WebSocket Integration** - Real-time updates without polling
2. **Order Status Updates** - Kitchen can mark orders as preparing/ready
3. **Customer Notifications** - SMS/email when order is ready
4. **Menu Management** - Admin can add/edit menu items
5. **Analytics Dashboard** - More detailed charts and reports
6. **Multi-cafe Support** - Support multiple cafe locations
7. **Staff Management** - Assign orders to specific staff

---

## 📞 Support

For issues or questions:
1. Check browser console for errors
2. Check backend terminal for API errors
3. Verify MongoDB connection
4. Review this guide

---

**Created:** October 15, 2025  
**Last Updated:** October 15, 2025  
**Version:** 1.0.0
