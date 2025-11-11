import Admin from "../models/Admin.js";
import jwt from "jsonwebtoken";
import { verifyPassword } from "../utils/authHelpers.js";

export const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const admin = await Admin.findOne({ email: email });

        if (!admin) {
            return res.status(404).json({ message: "Account does not exist" });
        }

        if (!verifyPassword(password, admin.password)) {
            return res.status(401).json({ message: "Invalid password" });
        }

        const { password: _, ...adminData } = admin.toObject();

        const token = jwt.sign(
            adminData,
            process.env.JWT_SECRET,
            { expiresIn: "1d" }
        );

        res.cookie("admin", token, {
            httpOnly: true,
            maxAge: 24 * 60 * 60 * 1000, // 1 day
            sameSite: "lax",
            secure: process.env.NODE_ENV === "production",
        });

        res.status(201).json({
            success: true,
            message: "Login successful",
            admin: adminData,
        });

    } catch (err) {
        console.error("Login error:", err);
        res.status(500).json({ success: false, message: err.message });
    }
};


export const logout = async (req, res) => {
    res.clearCookie("admin", {
        httpOnly: true,
        sameSite: "lax",
        secure: process.env.NODE_ENV === "production",
    });

    res.status(200).json({ message: "Logged out successfully" });
}

export const verifyToken = async (req, res) => {
    const token = req.cookies.admin; 
    
    if (!token) {
      return res.status(401).json({ message: 'No token found' });
    }
    
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        res.json({ success: true, message: 'Access granted', admin: decoded });
    } catch (err) {
        res.status(403).json({ message: err.message });
    }
}