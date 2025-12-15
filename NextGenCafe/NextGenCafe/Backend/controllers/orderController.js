import Order from "../models/Order.js";

// Create a new order
export const createOrder = async (req, res) => {
    try {
        const orderData = req.body;

        // Create new order
        const order = new Order({
            tableNumber: orderData.tableNumber || orderData.userInfo?.tableId,
            userId: orderData.userId || orderData.userInfo?.userId,
            customerName: orderData.customerName,
            customerContact: orderData.customerContact,
            items: orderData.items,
            status: orderData.status || 'pending',
            paymentType: orderData.paymentType || 'Cash',
            paymentStatus: orderData.paymentStatus || 'pending',
            totalAmount: orderData.total || orderData.totalAmount,
            rating: orderData.rating || 0,
            feedback: orderData.feedback || ''
        });

        await order.save();

        res.status(201).json({
            success: true,
            message: "Order created successfully",
            order: order
        });
    } catch (error) {
        console.error("Error creating order:", error);
        res.status(500).json({
            success: false,
            error: "Failed to create order",
            details: error.message
        });
    }
};

// Get all orders
export const getAllOrders = async (req, res) => {
    try {
        const orders = await Order.find().sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            count: orders.length,
            orders: orders
        });
    } catch (error) {
        console.error("Error fetching orders:", error);
        res.status(500).json({
            success: false,
            error: "Failed to fetch orders",
            details: error.message
        });
    }
};

// Get orders by table number
export const getOrdersByTable = async (req, res) => {
    try {
        const { tableNumber } = req.params;
        const orders = await Order.find({ tableNumber }).sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            count: orders.length,
            orders: orders
        });
    } catch (error) {
        console.error("Error fetching orders by table:", error);
        res.status(500).json({
            success: false,
            error: "Failed to fetch orders",
            details: error.message
        });
    }
};

// Update order status
export const updateOrderStatus = async (req, res) => {
    try {
        const { orderId } = req.params;
        const { status, paymentStatus, paymentType, rating, feedback } = req.body;

        const updateData = {};
        if (status) updateData.status = status;
        if (paymentStatus) updateData.paymentStatus = paymentStatus;
        if (paymentType) updateData.paymentType = paymentType;
        if (rating) updateData.rating = rating;
        if (feedback) updateData.feedback = feedback;

        const order = await Order.findByIdAndUpdate(
            orderId,
            updateData,
            { new: true }
        );

        if (!order) {
            return res.status(404).json({
                success: false,
                error: "Order not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Order updated successfully",
            order: order
        });
    } catch (error) {
        console.error("Error updating order:", error);
        res.status(500).json({
            success: false,
            error: "Failed to update order",
            details: error.message
        });
    }
};

// Delete order
export const deleteOrder = async (req, res) => {
    try {
        const { orderId } = req.params;

        const order = await Order.findByIdAndDelete(orderId);

        if (!order) {
            return res.status(404).json({
                success: false,
                error: "Order not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Order deleted successfully"
        });
    } catch (error) {
        console.error("Error deleting order:", error);
        res.status(500).json({
            success: false,
            error: "Failed to delete order",
            details: error.message
        });
    }
};
