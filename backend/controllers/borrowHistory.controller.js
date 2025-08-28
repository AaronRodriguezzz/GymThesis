import BorrowHistory from "../models/BorrowHistory.js";
import Equipment from "../models/Equipments.js";

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

        if(!equipment) {
            return res.status(404).json({ success: false, message: "Equipment not found" });
        }

        if(equipment.stock < quantity) {
            return res.status(400).json({ success: false, message: "Not enough stock available" });
        }

        // 3. Deduct stock
        equipment.stock -= quantity;
        await equipment.save(); 

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

        res.status(201).json({ success: true, borrowHistory });
        
    }catch(err){
        console.log(err);
        res.status(500).json({ success: false, message: err.message });
    }
}

export const updateBorrowHistory = async (req, res) => {
    console.log(req.body);
    try{
        const borrowHistory = await BorrowHistory.findById(req.params.id);

        if(!borrowHistory){
            return res.status(404).json({ success: false, message: 'Borrow history not found'});
        }

        const equipment = await Equipment.findById(req.body.equipment_id._id);

        if(!equipment) {
            return res.status(404).json({ success: false, message: "Equipment not found" });
        }

        equipment.stock += req.body.quantity;
        borrowHistory.status = req.body.status;

        await equipment.save();
        await borrowHistory.save();

        res.status(200).json({ success: true, message: 'Update successful'})

    }catch(err){
        res.status(500).json({ success: false, message: err.message });
    }
}

export const getBorrowHistoryById = async (req, res) => {
    try{
        const borrowHistory = await BorrowHistory.findById(req.params.id);
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
                { 'equipment.name': { $regex: searchTerm, $options: "i" } },
            ]
        }

        // if(status && status !== 'All'){
        //     query.status = status
        // }

        // if(plan){
        //     query.plan = plan
        // }

        const histories = await BorrowHistory
            .find()
            .populate('equipment_id')
            .skip(skip)
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