import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const rechargeSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, trim: true },
    number: { type: Number, required: true, trim: true },
    amount: { type: Number, required: true, default: false },
  },
  { versionKey: false, timestamps: true }
);

rechargeSchema.plugin(mongoosePaginate);

export default mongoose.model("Recharge", rechargeSchema);
