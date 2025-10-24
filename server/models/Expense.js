import mongoose from "mongoose";

const expenseSchema = new mongoose.Schema({
    user : {type: mongoose.Schema.Types.ObjectId, required:true,},
    category : {type: String, required:true,},
    description : {type: String,},
    amount : {type: Number, required:true,},
    date : {type: Date,  required:true,},
},{timestamps:true});
const Expense = mongoose.model('Expense', expenseSchema);
export default Expense
