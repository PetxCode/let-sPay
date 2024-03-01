import { Types } from "mongoose";
import storeModel from "../model/storeModel";
import vendorModel from "../model/vendorModel";
import { Request, Response } from "express";
import userModel from "../model/userModel";
import purchasedModel from "../model/purchasedModel";

export const createPurchased = async (req: Request, res: Response) => {
  try {
    const { userID } = req.params;
    const { cart } = req.body;

    const user = await userModel.findById(userID);
    if (user) {
      for (let i of cart) {
        const ven = await vendorModel.findById(i.vendor);

        const purchased = await purchasedModel.create({
          purchasedBy: user?.name,
          whatPurchased: i.title,
          cost: i.cost,
          itemOwner: i.vendor,
        });

        user?.history?.push(new Types.ObjectId(purchased?._id));
        user?.save();

        ven?.history?.push(new Types.ObjectId(purchased?._id));
        ven?.save();
      }

      return res.status(201).json({
        message: "creating store",
        status: 201,
        data: cart,
      });
    } else {
      return res.status(404).json({
        message: "Error finding Vendor",
        status: 404,
      });
    }
  } catch (error) {
    return res.status(404).json({
      message: "Error creating Vendor",
      status: 404,
    });
  }
};
