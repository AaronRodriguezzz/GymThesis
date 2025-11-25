import Members from "../models/Member.js"
import Equipment from "../models/Equipments.js";
import ProductSales from "../models/Sales.js";
import BorrowHistory from "../models/BorrowHistory.js";
import Products from '../models/Products.js';
import Member from "../models/Member.js";
import Admin from "../models/Admin.js";

export const getDashboardCardsData = async (req, res) => {
  try {
    const now = new Date();
    const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const startOfWeek = new Date(now);
    startOfWeek.setDate(now.getDate() - now.getDay());
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const startOfYear = new Date(now.getFullYear(), 0, 1);

    // Helper to calculate membership revenue for a period
    const calculateMembershipRevenue = async (startDate) => {
      const data = await Members.aggregate([
        { $match: { status: "Paid", datePaid: { $gte: startDate } } },
        {
          $group: {
            _id: null,
            totalRevenue: {
              $sum: {
                $switch: {
                  branches: [
                    { case: { $eq: ["$plan", "Basic"] }, then: 1500 },
                    { case: { $eq: ["$plan", "Pro"] }, then: 2000 },
                    { case: { $eq: ["$plan", "Elite"] }, then: 3000 },
                  ],
                  default: 0,
                },
              },
            },
          },
        },
      ]);
      return data[0]?.totalRevenue || 0;
    };

    // Helper to calculate product sales revenue for a period
    const calculateProductRevenue = async (startDate) => {
      const data = await ProductSales.aggregate([
        { $match: { createdAt: { $gte: startDate } } },
        {
          $group: {
            _id: null,
            totalRevenue: { $sum: "$totalPrice" },
          },
        },
      ]);
      return data[0]?.totalRevenue || 0;
    };

    const membershipRevenue = {
      today: await calculateMembershipRevenue(startOfToday),
      week: await calculateMembershipRevenue(startOfWeek),
      month: await calculateMembershipRevenue(startOfMonth),
      year: await calculateMembershipRevenue(startOfYear),
    };

    const productSalesRevenue = {
      today: await calculateProductRevenue(startOfToday),
      week: await calculateProductRevenue(startOfWeek),
      month: await calculateProductRevenue(startOfMonth),
      year: await calculateProductRevenue(startOfYear),
    };
    const totalStaffs = await Admin.countDocuments({ role: 'Staff' });
    const totalMembers = await Member.countDocuments({ status: 'Paid' });
    const totalEquipmentsData = await Equipment.aggregate([
      { $match: { stock: { $gt: 0 } } },
      { $count: "availableEquipments" },
    ]);
    const totalEquipments = totalEquipmentsData[0]?.availableEquipments || 0;
    const totalProducts = await Products.countDocuments();

    return res.status(200).json({
        success: true,
        membershipRevenue,
        productSalesRevenue,
        totalMembers,
        totalEquipments,
        totalProducts,
        totalStaffs
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: err.message || "Server error" });
  }
};

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

        // Fetch all members with status Paid or Expired for the current year
        const members = await Members.find({
            status: { $in: ["Paid", "Expired"] },
            createdAt: {
            $gte: new Date(`${currentYear}-01-01`),
            $lte: new Date(`${currentYear}-12-31`)
            }
        });

        // Initialize revenue array for all 12 months
        const revenueByMonth = Array.from({ length: 12 }, (_, i) => ({
            month: i + 1,
            total: 0
        }));

        members.forEach((member) => {
            const month = member.createdAt.getMonth(); 
            let planRevenue = 0;

            if (member.plan === "Basic") planRevenue = 1500;
            if (member.plan === "Pro") planRevenue = 2000;
            if (member.plan === "Elite") planRevenue = 3000;

            revenueByMonth[month].total += planRevenue;
        });
        const membershipSalesArray = monthNames.map(name => ({ month: name, total: 0 }));

        revenueByMonth.forEach(sale => {
            membershipSalesArray[sale.month - 1].total = sale.total;
        });

        return res.status(200).json({ 
            success: true,
            formattedSales,
            membersStatus,
            membershipPerCategory,
            equipment,
            monthlySales: salesArray,
            membershipRevenues:  membershipSalesArray,
        })

    }catch(err){
        console.log(err)
        return res.status(500).json({ message: err.message})
    }
}

