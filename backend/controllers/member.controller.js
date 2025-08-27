import Member from "../models/Member.js"

export const createMembership = async (req, res) => {
    try{
        const memberExists = await Member.findOne({ 
            email: req.body.email, 
            status: { $ne: 'Expired' }
        });

        if (memberExists) {
            return res.status(409).json({ success: false, message: 'This email is already registered as a member or has a pending request.' });
        }

        const member = new Member(req.body);

        await member.save();

        res.status(201).json({ success: true, message: 'Membership request successfully created'})

    }catch(err){
        console.log(err);
        res.status(500).json({ success: false, message: err.message });
    }
}


export const updateMembership = async (req, res) => {
    try{
        const member = await Member.findById(req.params.id)

        if(!member){
            return res.status(404).json({ success: false, message: 'Membership not found.'})
        }

        member.status = req.body.status

        await member.save();

        res.status(201).json({ success: true, message: 'Membership successfully updated'})

    }catch(err){
        res.status(500).json({ success: false, message: err.message });
    }
}

export const getMemberships = async (req, res) => {
    try{
        const page = req.query.page || 1;
        const limit = req.query.limit || 20;
        const skip = (page - 1) * limit;
        const searchTerm = req.query.searchTerm || '';
        const status = req.query.status || '';
        const plan = req.query.plan || '';

        let query = {};

        if(searchTerm){
            query.$or = [
                { email: { $regex: searchTerm, $options: "i" } },
                { fullname: { $regex: searchTerm, $options: "i" } },
                { phone: { $regex: searchTerm, $options: "i" } },
            ]
        }

        if(status && status !== 'All'){
            query.status = status
        }

        if(plan){
            query.plan = plan
        }

        const members = await Member.find(query).skip(skip).limit(limit)
        
        const totalMembers = await Member.countDocuments(query);

        res.status(200).json({
            success: true,
            totalPages: Math.ceil(totalMembers / limit),
            page,
            members,
            totalMembers
        })
        
    }catch(err){
        res.status(500).json({ success: false, message: err.message });
    }
}