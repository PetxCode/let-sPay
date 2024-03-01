import { Document, Schema, Types, model } from "mongoose";

interface iUser {
  name: string;
  email: string;
  password: string;
  history: Array<{}>;
}

interface iUserData extends iUser, Document {}

const userModel = new Schema(
  {
    name: {
      type: String,
    },
    email: {
      type: String,
    },
    password: {
      type: String,
    },

    history: [
      {
        type: Types.ObjectId,
        ref: "purchases",
      },
    ],
  },
  { timestamps: true }
);

export default model<iUserData>("users", userModel);
