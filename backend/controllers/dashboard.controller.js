import Member from "../models/Member.js"
import Equipment from "../models/Equipments.js";
import ProductSales from "../models/Sales.js";

export const getDashboardCardsData = async (req, res) => {
    try{

        const members = await Member.find();
        const equipments = await Equipment.find();
        const productSales = await ProductSales.find();

        const paidMembers = members.filter(member => member.status !== 'Paid')
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
                    $eq: [{ $year: "$createdAt" }, currentYear]
                }
                }
            },
            {
                $group: {
                    _id: { 
                        year: { $year: "createdAt"},
                        month: { $month: "$createdAt" }
                    },
                    totalSales: { $sum: "$totalPrice" },
                    count: { $sum: 1 },

                }
            },
            {
                $sort: { "_id.year": 1, "_id.month": 1 }
            }
        ])

        const formattedSales = monthlySales.map(item => ({
            month: new Date(item._id.year, item._id.month - 1).toLocaleString('default', { month: 'long' }),
            sales: item.totalSales
        }));

        const members = await Members.aggregate([
            {
                $group: {
                    _id: { status: '$status'},
                    total: { $sum: 1 }
                }
            }
        ])


    }catch(err){
        console.log(err)
        return res.status(500).json({ message: err})
    }
}

