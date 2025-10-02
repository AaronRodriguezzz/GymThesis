import mongoose, { Schema } from "mongoose";
import { hashPassword } from "../utils/authHelpers.js";

const AdminSchema = new Schema({
    email: {
        type: String,
        required: true,
    },
    fullname: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true,
        enum: ['Admin', 'Staff']
    },
    status: {
        type: String,
        required: true,
        enum: ['Active', 'Disabled'],
        default: 'Active'
    }
}, { timestamps: true })

// Hash password before saving if modified or new
AdminSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next();
  }
  this.password = await hashPassword(this.password);
  next();
});

const Admin= mongoose.model('Admin', AdminSchema);
export default Admin