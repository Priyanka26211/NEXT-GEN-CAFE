import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: { type: String, required: true, trim: true },
    phone: { type: String, required: true, index: true },
    tableNumber: { type: Number, required: true, index: true },
    // Optional app-level id; we can use _id as canonical id
    userId: { type: String },
    loginTime: { type: Date, default: Date.now },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

userSchema.pre("save", function (next) {
    this.updatedAt = Date.now();
    next();
});

// Keep the latest login per phone+table by upserting
userSchema.index({ phone: 1, tableNumber: 1 }, { unique: false });

export default mongoose.model("User", userSchema);
