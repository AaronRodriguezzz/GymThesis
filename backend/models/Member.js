import mongoose, { Schema } from "mongoose";

const MemberSchema = new Schema({
    email: {
        type: String,
        required: true,
    },
    fullName: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true,
    },
    plan: {
        type: String,
        enum: ['Basic', 'Pro', 'Elite'],
        required: true,
    },
    expirationDate: {
        type: Date,
        required: true,
    },
    fitnessGoal: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ['Pending', 'Paid', 'Expired'],
        default: 'Pending'
    }
}, { timestamps: true })

const Member= mongoose.model('Member', MemberSchema);
export default Member