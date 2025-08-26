import mongoose, { Schema, Types } from "mongoose";
import BorrowHistory from "./BorrowHistory.js";

const Image = { 
  imageUrl: {
    type: String,
    required: true,
  },
  imagePublicId: {
    type: String,
    required: true
  }
};

const EquipmentSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  sku: {
    type: String,
    required: true,
    unique: true,
  },
  stock: {
    type: Number,
    required: true,
  },
  category: {
    type: String,
  },
  image: {
    type: Image,
    required: true
  }
}, { timestamps: true });

EquipmentSchema.methods.getBorrowed = async function () {
  const totalBorrowed = await BorrowHistory.aggregate([
    {
      $match: { equipment_id: new Types.ObjectId(this._id) }
    },
    {
      $group: {
        _id: '$equipment_id',
        totalQuantity: { $sum: '$quantity' }
      }
    }
  ]);

  const borrowed = totalBorrowed.length > 0 ? totalBorrowed[0].totalQuantity : 0;
  return borrowed;
};

const Equipment = mongoose.model("Equipment", EquipmentSchema);
export default Equipment;