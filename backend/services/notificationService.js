import Admin from "../models/Admin.js"
import AdminNotification from "../models/AdminNotification.js";
import { emitNotification } from "../sockets/notification.js";

export const sendAdminNotifications = async ({title, message, member_id, equipment_id, product_id }) => {
    try{
        const admins = await Admin.find();

        for(const admin of admins){
            const notification = await AdminNotification.create({ title, message, admin: admin._id, member_id, equipment_id, product_id })
            emitNotification(notification, admin._id.toString());
        }

    }catch(err){
        throw new Error(err.message || 'Server Error.')
    }
}