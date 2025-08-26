import mongoose, { Schema } from "mongoose";

const Image = { 
    imageUrl: {
        type: String,
        required: true,
    },
    imagePublicId: {
        type: String,
        required: true
    }
}

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
}, { timestamps: true })

const Equipment= mongoose.model('Equipment', EquipmentSchema);
export default Equipment