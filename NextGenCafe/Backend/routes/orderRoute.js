import express from "express";
import {
    createOrder,
    getAllOrders,
    getOrdersByTable,
    updateOrderStatus,
    deleteOrder
} from "../controllers/orderController.js";

const router = express.Router();

// Create a new order
router.post("/", createOrder);

// Get all orders
router.get("/", getAllOrders);

// Get orders by table number
router.get("/table/:tableNumber", getOrdersByTable);

// Update order status
router.put("/:orderId", updateOrderStatus);

// Delete order
router.delete("/:orderId", deleteOrder);

export default router;
