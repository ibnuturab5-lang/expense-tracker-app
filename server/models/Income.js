import mongoose from "mongoose";

const incomeSchema = new mongoose.Schema({
    user : {type: mongoose.Schema.Types.ObjectId, required:true,},
    source : {type: String, required:true,},
    description : {type: String,},
    amount : {type: Number, required:true,},
    date : {type: Date,  required:true,},
},{timestamps:true});
const Income = mongoose.model('Income', incomeSchema);
export default Income
