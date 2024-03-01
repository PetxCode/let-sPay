import { Document, Schema, Types, model } from "mongoose";

interface iVendorStore {
  purchasedBy: string;
  whatPurchased: string;
  itemOwner: string;
  cost: number;
  vendor: {};
  user: {};
}

interface iVendorStoreData extends iVendorStore, Document {}

const purchaseModel = new Schema(
  {
    purchasedBy: {
      type: String,
    },
    whatPurchased: {
      type: String,
    },

    itemOwner: {
      type: String,
    },

    cost: {
      type: Number,
    },

    vendor: {
      type: Types.ObjectId,
      ref: "vendors",
    },

    user: {
      type: Types.ObjectId,
      ref: "users",
    },
  },
  { timestamps: true }
);

export default model<iVendorStoreData>("purchases", purchaseModel);
