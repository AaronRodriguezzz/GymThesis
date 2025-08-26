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
        res.status(500).json({ success: false, message: err.message });
    }
}