import { Request, Response } from "express";
import storeModel from "../model/storeModel";
import vendorModel from "../model/vendorModel";
import { Types } from "mongoose";
import { stream } from "../util/stream";

export const createStroe = async (req: any, res: Response) => {
  try {
    const { vendorID } = req.params;
    const { title, cost, description } = req.body;

    const vendor = await vendorModel.findById(vendorID);

    if (vendor) {
      const { secure_url, public_id }: any = await stream(req);

      console.log(secure_url);

      const store = await storeModel.create({
        title,
        cost,
        description,
        picture: secure_url,
        pictureID: public_id,
        vendor,
      });

      vendor?.store?.push(new Types.ObjectId(store?._id));
      vendor?.save();

      return res.status(201).json({
        message: "creating store",
        status: 201,
        data: store,
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

export const getAllStore = async (req: Request, res: Response) => {
  try {
    const store = await storeModel.find();

    return res.status(200).json({
      message: "get all store's Product",
      status: 200,
      data: store,
    });
  } catch (error) {
    return res.status(404).json({
      message: "Error creating Vendor",
      status: 404,
    });
  }
};

export const getOneStore = async (req: Request, res: Response) => {
  try {
    const { storeID } = req.params;
    const store = await storeModel.findById(storeID);

    return res.status(200).json({
      message: "get store's Product",
      status: 200,
      data: store,
    });
  } catch (error) {
    return res.status(404).json({
      message: "Error creating Vendor",
      status: 404,
    });
  }
};
