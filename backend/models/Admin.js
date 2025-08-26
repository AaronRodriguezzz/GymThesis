import mongoose, { Schema } from "mongoose";
import { hashPassword } from "../utils/authHelpers.js";

const AdminSchema = new Schema({
    email: {
        type: Schema.Types.ObjectId,
        ref: 'Equipment',
        required: true,
    },
    firstname: {
        type: String,
        required: true,
    },
    lastname: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
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