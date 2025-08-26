import mongoose, { Schema } from "mongoose";

const Borrower = {
    fullname: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    }
}

const BorrowHistorySchema = new Schema({
    equipment_id: {
        type: Schema.Types.ObjectId,
        ref: 'Equipment',
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
    },
    borrower: {
        type: Borrower,
        required: true
    },
    status: {
        type: String,
        enum: ['Borrowed', 'Returned']
    },
    return_date: {
        type: Date,
        required: false
    }
}, { timestamps: true })

BorrowHistorySchema.virtual("equipment", {
  ref: "Equipment",
  localField: "equipment_id",
  foreignField: "_id",
  justOne: true,
});

const BorrowHistory= mongoose.model('BorrowHistory', BorrowHistorySchema);
export default BorrowHistory