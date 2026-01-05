import { Schema, model, models } from "mongoose";

const ListSchema = new Schema(
  {
    userId: { type: String, required: true },
    title: { type: String, required: true },
    category: String, // shopping, travel, tasks, inventory, etc
    items: [
      {
        name: String,
        price: Number,
        quantity: Number,
        notes: String,
      },
    ],
  },
  { timestamps: true }
);

export default models.List || model("List", ListSchema);
