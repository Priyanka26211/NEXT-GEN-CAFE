import User from "../models/User.js";

export const upsertUser = async (req, res) => {
    try {
        const { name, phone, tableNumber, userId, loginTime } = req.body;

        if (!name || !phone || !tableNumber) {
            return res.status(400).json({ success: false, error: "name, phone and tableNumber are required" });
        }

        const doc = await User.findOneAndUpdate(
            { phone, tableNumber },
            { name, phone, tableNumber, userId, loginTime: loginTime ? new Date(loginTime) : new Date(), updatedAt: new Date() },
            { new: true, upsert: true, setDefaultsOnInsert: true }
        );

        res.status(200).json({ success: true, user: doc });
    } catch (err) {
        console.error("Failed to upsert user", err);
        res.status(500).json({ success: false, error: "Internal server error" });
    }
};

export const listUsers = async (_req, res) => {
    try {
        const users = await User.find().sort({ updatedAt: -1 }).limit(100);
        res.status(200).json({ success: true, users });
    } catch (err) {
        console.error("Failed to list users", err);
        res.status(500).json({ success: false, error: "Internal server error" });
    }
};
