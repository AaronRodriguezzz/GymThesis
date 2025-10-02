import Admin from "../models/Admin.js";

export const createNewAdmin = async (req, res) => {
    try{
        const adminExists = await Admin.findOne({ email: req.body.email })

        if(adminExists){
            return res.status(409).json({ success: false, message: 'Email already exists.'})
        }

        const admin = new Admin(req.body);
        await admin.save();

        res.status(201).json({ success: true, admin });

    }catch(err){
        console.log(err);
        res.status(500).json({ success: false, message: err.message });
    }
}

export const getAdmins = async (req, res) => {
    try{
        const admins = await Admin.find().select('-password'); // exclude password field
        res.status(200).json({ success: true, admins });
    }catch(err){
        res.status(500).json({ success: false, message: err.message });
    }  
}

export const updateAdmin = async (req, res) => {

    const adminId = req.params.id;
    const updateData = req.body;

    if(!adminId || !updateData){
        return res.status(400).json({ success: false, message: 'Invalid request.' });
    }

    try{
        
        const updatedAdmin = await Admin.findByIdAndUpdate(adminId, updateData, { new: true }).select('-password');

        if(!updatedAdmin){
            return res.status(404).json({ success: false, message: 'Admin not found.' });
        }

        res.status(200).json({ success: true, admin: updatedAdmin });
    }catch(err){
        res.status(500).json({ success: false, message: err.message });
    }
}