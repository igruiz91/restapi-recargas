import mongoose from "mongoose";
import mongoosePaginate from 'mongoose-paginate-v2'

const taskSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, trim: true },
    done: { type: Boolean, default: false },
  },
  { versionKey: false, timestamps: true } 
);

taskSchema.plugin(mongoosePaginate);

export default mongoose.model("Task", taskSchema);
