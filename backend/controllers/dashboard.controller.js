import Members from "../models/Member.js"
import Equipment from "../models/Equipments.js";
import ProductSales from "../models/Sales.js";
import BorrowHistory from "../models/BorrowHistory.js";

export const getDashboardCardsData = async (req, res) => {
    try{

        const members = await Members.find();
        const equipments = await Equipment.find();
        const productSales = await ProductSales.find();

        const paidMembers = members.filter(member => member.status === 'Paid')
        const availableEquipments = equipments.filter(equipment => equipment.stock !== 0);
        const productSalesRevenue = productSales.reduce((acc, sales) => acc + sales.totalPrice, 0);

        let membershipRevenue = 0;
        members.map(member => {
            if(member.plan === 'Basic') membershipRevenue + 1500;
            if(member.plan === 'Pro') membershipRevenue + 2000;
            if(member.plan === 'Elite') membershipRevenue + 3000;

            return membershipRevenue
        })

        const overallRevenue = productSalesRevenue + membershipRevenue

        return res.status(200).json({ 
            overallRevenue, 
            productSalesRevenue, 
            paidMembers: paidMembers.length, 
            availableEquipments: availableEquipments.length 
        })

    }catch(err){
        console.log(err)
        return res.status(500).json({ message: err})
    }
}

export const getDashboardGraphData = async (req,res) => {
    try{    
        const currentYear = new Date().getFullYear();

        const monthlySales = await ProductSales.aggregate([
            {
                $match: {
                    $expr: {
                        $eq: [{ $year: { $toDate: "$createdAt" } }, currentYear]
                    }
                }
            },
            {
                $group: {
                _id: { 
                    year: { $year: { $toDate: "$createdAt" } },
                    month: { $month: { $toDate: "$createdAt" } }
                },
                totalSales: { $sum: "$totalPrice" },
                count: { $sum: 1 }
                }
            },
            {
                $sort: { "_id.year": 1, "_id.month": 1 }
            }
        ]);

        const formattedSales = monthlySales.map(item => ({
            month: new Date(item._id.year, item._id.month - 1).toLocaleString('default', { month: 'long' }),
            sales: item.totalSales
        }));

        const membersStatus = await Members.aggregate([
            {
                $group: {
                    _id: "$status",   
                    total: { $sum: 1 }
                }
            },
            {
                $project: {
                    _id: 0,           
                    status: "$_id",   
                    total: 1
                }
            }
        ])
        
        const membershipRevenue = await Members.find();
        const paidMembers = membershipRevenue.filter(member => member.status === 'Paid')

        let paidMembersFormat = [
            {sub: 'Basic', total: 0},
            {sub: 'Pro', total: 0},
            {sub: 'Elite', total: 0},
        ]

        paidMembers.map(member => {
            if(member.plan === 'Basic') paidMembersFormat[0].total += 1;
            if(member.plan === 'Pro') paidMembersFormat[1].total += 1;
            if(member.plan === 'Elite') paidMembersFormat[2].total += 1;

            return paidMembersFormat
        })


        const equipment = await BorrowHistory.aggregate([
            {
                $group: {
                    _id: "$equipment_id",
                    total: { $sum: 1 }     
                }
            },
            {
                $lookup: {
                    from: "equipment",        
                    localField: "_id",
                    foreignField: "_id",        
                    as: "equipmentDetails"
                }
            },
            {
                $unwind: "$equipmentDetails" 
            },
            {
                $project: {
                    _id: 0,
                    equipment: "$equipmentDetails.name", 
                    total: 1
                }
            }
        ]);


        return res.status(200).json({ 
            formattedSales,
            membersStatus,
            paidMembersFormat,
            equipment
        })



    }catch(err){
        console.log(err)
        return res.status(500).json({ message: err.message})
    }
}

