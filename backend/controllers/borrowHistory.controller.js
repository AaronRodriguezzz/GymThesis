import BorrowHistory from "../models/BorrowHistory.js";
import Equipment from "../models/Equipments.js";
import { sendAdminNotifications } from "../services/notificationService.js";

export const createBorrowHistory = async (req, res) => {
    
    const { 
        equipment_id, 
        fullName, 
        phone, 
        email, 
        borrowerType, 
        idPresented, 
        quantity 
    } = req.body;

    try{
        const equipment = await Equipment.findById(equipment_id);

        if(!equipment){
            return res.status(404).json({ success: false, message: 'Equipment not found.'})
        }

        const borrowHistory = new BorrowHistory({
            borrower: {
                fullName, 
                phone, 
                email, 
                borrowerType,
                ...(idPresented && { idPresented })
            },
            equipment_id,
            quantity,
        });

        await borrowHistory.save();
        
        const availableStock = equipment.stock - await equipment.getBorrowed();
        const threshold = equipment.stock * (30 / 100);

        if (availableStock <= threshold) {
            await sendAdminNotifications({
                title: 'Low Equipment Stock Alert',
                message: `The equipment "${equipment.name}" has reached a critical stock level. Only ${availableStock} remaining out of ${equipment.stock}.`,
                equipment_id: equipment._id,
            });
        }    
        res.status(201).json({ success: true, borrowHistory });
        
    }catch(err){
        console.log(err);
        res.status(500).json({ success: false, message: err.message });
    }
}

export const updateBorrowHistory = async (req, res) => {
    try{
        const borrowHistory = await BorrowHistory.findById(req.params.id);

        if(!borrowHistory){
            return res.status(404).json({ success: false, message: 'Borrow history not found'});
        }

        console.log(req.body.status)
        if(req.body.status === 'Returned' || req.body.status === 'Damaged'){
            borrowHistory.return_date = new Date();
        }
        borrowHistory.status = req.body.status;

        await borrowHistory.save();

        res.status(200).json({ success: true, message: 'Update successful'})

    }catch(err){
        res.status(500).json({ success: false, message: err.message });
    }
}

export const getBorrowHistoryById = async (req, res) => {
    try{
        const borrowHistory = await BorrowHistory.find({ equipment_id: req.params.id, status: 'Borrowed'});

        if(!borrowHistory){
            return res.status(404).json({ success: false, message: 'Borrow history not found'});
        }

        res.status(200).json({ success: true, borrowHistory })

    }catch(err){
        res.status(500).json({ success: false, message: err.message });
    }
}

export const getBorrowHistory = async (req, res) => {
    try{
        const page = req.query.page || 1;
        const limit = req.query.limit || 20;
        const skip = (page - 1) * limit;
        const searchTerm = req.query.searchTerm || '';
        const status = req.query.status || '';

        let query = {};

        if(searchTerm){
            query.$or = [
                { 'borrower.fullname': { $regex: searchTerm, $options: "i" } },
                { 'borrower.email': { $regex: searchTerm, $options: "i" } },
                { 'borrower.phone': { $regex: searchTerm, $options: "i" } },
            ]
        }

        if(status && status !== 'All'){
            query.status = status
        }

        const histories = await BorrowHistory
            .find(query)
            .populate('equipment_id')
            .skip(skip)
            .sort({ createdAt: -1 })
            .limit(limit)
        
        const totalHistories = await BorrowHistory.countDocuments(query);

        res.status(200).json({
            success: true,
            totalPages: Math.ceil(totalHistories / limit),
            page,
            histories,
            totalHistories
        })
        
    }catch(err){
        console.log(err);
        res.status(500).json({ success: false, message: err.message });
    }
}