import Admin from "../models/Admin.js";
import { verifyPassword } from "../utils/authHelpers.js";
import { hashPassword } from "../utils/authHelpers.js";

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
        const admins = await Admin.find({ _id: { $ne: req.user_id }}).select('-password'); // exclude password field
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

export const getAdmin = async (req, res) => {
    try{
        const admin = await Admin.findById(req.user_id);

        res.status(200).json({ success: true, admin });

    }catch(err){
        res.status(500).json({ success: false, message: err.message });
    }
}

export const changePassword = async (req, res) => {
    const adminId = req.user_id;

    if(!adminId){
        return res.status(400).json({ success: false, message: 'Invalid request.' });
    }

    const { oldPassword, newPassword } = req.body;

    try {
        const admin = await Admin.findById(adminId);

        if(!admin){
            return res.status(404).json({ success: false, message: 'Admin not found.' });
        }

        const passwordMatched = await verifyPassword(oldPassword, admin.password)
                
        if (!passwordMatched) {
            return res.status(400).json({ success: false, message: 'Current password is incorrect' });
        }
        
        admin.password = newPassword;

        await admin.save();

        res.status(200).json({ success: true, message: 'Password updated successfully.' });

    } catch(err) {
        console.log(err);
        res.status(500).json({ success: false, message: err.message });
    }
}

export const disableAdmin = async (req, res) => {

    const adminId = req.params.id;

    if(!adminId){
        return res.status(400).json({ success: false, message: 'Invalid request.' });
    }

    try{
        const updatedAdmin = await Admin.findByIdAndUpdate(adminId, { status: 'Disabled' }, { new: true }).select('-password');

        if(!updatedAdmin){
            return res.status(404).json({ success: false, message: 'Admin not found.' });
        }

        res.status(200).json({ success: true, admin: updatedAdmin });
    }catch(err){
        res.status(500).json({ success: false, message: err.message });
    }
}