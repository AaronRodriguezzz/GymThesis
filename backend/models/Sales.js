import mongoose, { Schema } from "mongoose";

const ProductSalesSchema = new Schema({
    products: {
        productId: {
            type: mongoose.Schema.Types.ObjectId, 
            ref: 'Product',
            required: true,
        },
        quantity: [{
            type: Number,
            required: true
        }]
    },
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
})


const ProductSales = mongoose.model('ProductSales', ProductSalesSchema);
export default ProductSales