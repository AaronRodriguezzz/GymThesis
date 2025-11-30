import Equipment from "../models/Equipments.js";
import { uploadImage, deleteImage } from "../services/cloudinary.service.js";
import BorrowHistory from "../models/BorrowHistory.js";

export const createEquipment = async (req, res) => {

    try{
        const equipmentExists = await Equipment.findOne({ name: req.body.name });

        if(equipmentExists){
            return res.status(409).json({ success: false, message: 'Equipment already exists'});
        }

        const image = await uploadImage(req.body.image)
        const equipment = new Equipment({ ...req.body, image });
        await equipment.save();


        res.status(201).json({ success: true, equipment });
    }catch(err){
        console.log(err);
        res.status(500).json({ success: false, message: err.message });
    }
}

export const updateEquipment = async (req, res) => {
    try{
        const equipment = await Equipment.findById(req.params.id);

        if(!equipment){
            return res.status(404).json({ success: false, message: 'Equipment not found' })
        }

        let image;
        if(req.body.image !== '' && ("image" in req.body)){
            await deleteImage(equipment.image.imagePublicId);
            image = await uploadImage(req.body.image)
            equipment.set({ ...req.body, image })
        }else {
            delete req.body.image
            equipment.set({ ...req.body })
        }
        
        await equipment.save();

        res.status(200).json({ success: true, message: 'Equipment successfully updated' })

    }catch(err){
        console.log(err);
        res.status(500).json({ success: false, message: err.message });
    }
}

export const getEquipmentById = async (req, res) => {
    try{
        const equipment = await Equipment.findById(req.params.id).populate('equipment');
        if(!equipment){
            return res.status(404).json({ success: false, message: 'Equipment not found' })
        }

        res.status(200).json({ success: true, equipment })

    }catch(err){
        res.status(500).json({ success: false, message: err.message });
    }
}

export const getEquipments = async (req, res) => {
    try{
        const page = req.query.page || 1;
        const limit = req.query.limit || 20;
        const skip = (page - 1) * limit;
        const searchTerm = req.query.searchTerm || '';

        let query = {};

        if(searchTerm){
            query.$or = [
                { name: { $regex: searchTerm, $options: "i" } },
                { sku: { $regex: searchTerm, $options: "i" } },
                { category: { $regex: searchTerm, $options: "i" } },
            ]
        }

        const equipments = await Equipment.find(query).skip(skip).limit(limit)

        const equipmentsWithBorrowed = await Promise.all(equipments.map(async (equipment) => {
            const borrowed = await equipment.getBorrowed();
            return { ...equipment.toJSON(), borrowed, available: equipment.stock - borrowed}
        }))
        
        const totalEquipments = await Equipment.countDocuments(query);

        res.status(200).json({
            success: true,
            totalPages: Math.ceil(totalEquipments / limit),
            page,
            equipments: equipmentsWithBorrowed,
            totalEquipments
        })
        
    }catch(err){
        console.log(err);
        res.status(500).json({ success: false, message: err.message });
    }
}

export const getTopBorrowedEquipment = async (req, res) => {
    try{
        const limit = req.query.limit || 10;
        const topBorrowed = await BorrowHistory.aggregate([
            { $match: { status: 'Borrowed' } },

            {
                $group: {
                _id: '$equipment_id',
                totalBorrowed: { $sum: '$quantity' }
                }
            },

            { $sort: { totalBorrowed: -1 } },

            { $limit: limit },

            {
                $lookup: {
                from: 'equipment',
                localField: '_id',
                foreignField: '_id',
                as: 'equipment'
                }
            },

            { $unwind: '$equipment' },

            {
                $project: {
                _id: 0,
                equipmentId: '$_id',
                name: '$equipment.name',
                sku: '$equipment.sku',
                totalBorrowed: 1
                }
            }
            ]);

        res.status(200).json({ success: true, topBorrowed});

    }catch(err){
        console.log(err);
        res.status(500).json({ success: false, message: err.message });
    }
}