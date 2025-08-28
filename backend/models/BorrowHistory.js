import mongoose, { Schema } from "mongoose";

const Borrower = {
    fullName: {
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
    },
    borrowerType: {
        type: String,
        enum: ['Member', 'Non Member'],
        required: true,
    },
    idPresented: {
        type: String,
        required: function () {
            return this.borrowerType === 'Non Member';
        }
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
        enum: ['Borrowed', 'Returned'],
        default: 'Borrowed'
    },
    return_date: {
        type: Date,
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