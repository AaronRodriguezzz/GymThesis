import mongoose, { Schema } from "mongoose";

const AdminNotificationSchema = new Schema({
    admin: {
        type: Schema.Types.ObjectId,
        ref: "Admin", 
        required: true
    },
    title: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    },
    isRead: {
        type: Boolean,
        default: false
    },
    equipment_id: {
        type: Schema.Types.ObjectId,
        ref: 'Equipment'
    },
    member_id: {
        type: Schema.Types.ObjectId,
        ref: 'Member'
    }
}, { timestamps: true }); 

const AdminNotification = mongoose.model("AdminNotification", AdminNotificationSchema);
export default AdminNotification;
