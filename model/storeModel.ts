import { Document, Schema, Types, model } from "mongoose";

interface iVendorStore {
  title: string;
  pictureID: string;
  picture: string;
  description: string;
  cost: number;
  vendor: {};
}

interface iVendorStoreData extends iVendorStore, Document {}

const storeModel = new Schema(
  {
    picture: {
      type: String,
    },
    pictureID: {
      type: String,
    },

    title: {
      type: String,
    },

    description: {
      type: String,
    },

    cost: {
      type: Number,
    },

    vendor: {
      type: Types.ObjectId,
      ref: "vendors",
    },
  },
  { timestamps: true }
);

export default model<iVendorStoreData>("stores", storeModel);
