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
            $project: {
            _id: 0,
            month: "$_id.month",
            year: "$_id.year",
            totalSales: 1,
            count: 1
            }
        },
        {
            $sort: { month: 1 }
        }
        ]);
        const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];

        const salesArray = monthNames.map(name => ({ month: name, total: 0 }));

        monthlySales.forEach(sale => {
            salesArray[sale.month - 1].total = sale.totalSales;
        });

        const formattedSales = monthlySales.map(item => ({
            month: new Date(item.year, item.month - 1).toLocaleString('default', { month: 'long' }),
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
        
        const membershipPerCategory = await Members.aggregate([
            {
                $match: {
                status: 'Paid'
                }
            },
            {
                $group: {
                _id: "$plan",
                total: { $sum: 1 },
                },
            },
            {
                $addFields: {
                order: {
                    $indexOfArray: [["Basic", "Elite", "Pro"], "$_id"]
                }
                }
            },
            {
                $sort: { order: 1 } // sort by the custom order
            },
            {
                $project: {
                _id: 0,
                sub: "$_id",
                total: 1
                }
            }
        ]);

        const equipment = await BorrowHistory.aggregate([
            {
                $match: {
                    status: 'Borrowed' 
                }
            },
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
            membershipPerCategory,
            equipment,
            monthlySales: salesArray
        })

    }catch(err){
        console.log(err)
        return res.status(500).json({ message: err.message})
    }
}

