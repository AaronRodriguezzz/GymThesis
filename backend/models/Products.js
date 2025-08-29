import mongoose, { Schema, Types } from "mongoose";

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

const ProductSchema = new Schema({
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
    price: {
        type: Number,
        required: true
    },
    image: {
        type: Image,
        required: true
    }
}, { timestamps: true });


const Products = mongoose.model("Products", ProductSchema);
export default Products;