import { Document, Schema, Types, model } from "mongoose";

interface iVendor {
  accountNumber: string;
  name: string;
  email: string;
  password: string;
  store: Array<{}>;
  history: Array<{}>;
}

interface iVendorData extends iVendor, Document {}

const vendorModel = new Schema(
  {
    accountNumber: {
      type: String,
    },
    name: {
      type: String,
    },
    email: {
      type: String,
    },
    password: {
      type: String,
    },

    store: [
      {
        type: Types.ObjectId,
        ref: "stores",
      },
    ],

    history: [
      {
        type: Types.ObjectId,
        ref: "purchases",
      },
    ],
  },
  { timestamps: true }
);

export default model<iVendorData>("vendors", vendorModel);
