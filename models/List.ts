import mongoose from "mongoose";

const ItemSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      default: 0,
    },
    quantity: {
      type: Number,
      default: 1,
    },
  },
  { _id: false } // cleaner subdocuments
);

const ListSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    items: {
      type: [ItemSchema],
      default: [],
    },
    total: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

export default mongoose.models.List ||
  mongoose.model("List", ListSchema);
