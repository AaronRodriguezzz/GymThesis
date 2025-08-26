import mongoose, { Schema } from "mongoose";

const MemberSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    fullname: {
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
    expiration: {
        type: Date,
        required: true,
    },
    goal: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ['Pending', 'Paid', 'Expired'],
        defaultValue: 'Pending'
    }
}, { timestamps: true })

const Member= mongoose.model('Member', MemberSchema);
export default Member