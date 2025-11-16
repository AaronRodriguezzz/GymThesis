import AdminNotification from "../models/AdminNotification.js";

export const getAllNotifications = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;      
        const limit = parseInt(req.query.limit) || 10;    
        const skip = (page - 1) * limit;

        const totalNotifications = await AdminNotification.countDocuments({ admin: req.user_id });

        // Get unread count
        const unreadCount = await AdminNotification.countDocuments({ admin: req.user_id, isRead: false });

        const notifications = await AdminNotification.find({ admin: req.user_id })
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit);

        const totalPages = Math.ceil(totalNotifications / limit);

        res.status(200).json({
            success: true,
            notifications,
            unreadCount,
            totalPages,
            currentPage: page,
            totalNotifications,
        });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message || "Server Error." });
    }
};

export const readNotification = async (req, res) => {
    try{

        const notification = await AdminNotification.findById(req.params.id);

        if(!notification){
            return res.status(404).json({ success: false, message: 'Notification not found.'})
        }

        notification.isRead = true;

        await notification.save();

        res.status(200).json({ success: true, message: 'Notification successfully updated.'})

    } catch (err) {
        res.status(500).json({ success: false, message: err.message || "Server Error." });
    }
}