import mongoose, { Schema } from "mongoose";

const ProductSalesSchema = new Schema({
    products: [{
        product: {
            type: mongoose.Schema.Types.ObjectId, 
            ref: 'Products',
            required: true,
        },
        quantity: {
            type: Number,
            required: true
        },
    }],
    totalPrice: {
        type: Number,
        required: true
    },
    modeOfPayment: {
        type: String,
        required: true
    },
    paymentAmount: {
        type: Number,
        required: true
    }, 
    change: {
        type: Number,
        required: true
    }
}, { timestamps: true })


const ProductSales = mongoose.model('ProductSales', ProductSalesSchema);
export default ProductSales