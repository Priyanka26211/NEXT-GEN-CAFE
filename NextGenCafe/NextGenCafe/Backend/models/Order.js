import mongoose from "mongoose";

const orderItemSchema = new mongoose.Schema({
    id: String,
    name: String,
    price: Number,
    quantity: Number,
    image: String
});

const orderSchema = new mongoose.Schema({
    tableNumber: {
        type: Number,
        required: true
    },
    userId: {
        type: String,
        required: true
    },
    customerName: String,
    customerContact: String,
    items: [orderItemSchema],
    status: {
        type: String,
        enum: ['pending', 'confirmed', 'preparing', 'ready', 'completed', 'cancelled'],
        default: 'pending'
    },
    paymentType: {
        type: String,
        enum: ['UPI', 'Cash', 'Card'],
        default: 'Cash'
    },
    paymentStatus: {
        type: String,
        enum: ['pending', 'paid', 'failed'],
        default: 'pending'
    },
    totalAmount: {
        type: Number,
        required: true
    },
    rating: {
        type: Number,
        min: 0,
        max: 5,
        default: 0
    },
    feedback: String,
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

// Update the updatedAt timestamp before saving
orderSchema.pre('save', function (next) {
    this.updatedAt = Date.now();
    next();
});

export default mongoose.model("Order", orderSchema);
