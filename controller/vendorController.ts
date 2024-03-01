import { Request, Response } from "express";
import bcrypt from "bcrypt";
import vendorModel from "../model/vendorModel";
import jwt from "jsonwebtoken";

export const createVendor = async (req: Request, res: Response) => {
  try {
    const { email, name, password } = req.body;

    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash(password, salt);

    const Vendor = await vendorModel.create({
      email,
      name,
      password: hashed,
    });

    return res.status(201).json({
      message: "creating Vendor",
      status: 201,
      data: Vendor,
    });
  } catch (error) {
    return res.status(404).json({
      message: "Error creating Vendor",
      status: 404,
    });
  }
};

export const loginVendor = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const Vendor = await vendorModel.findOne({ email });

    if (Vendor) {
      const passed = await bcrypt.compare(password, Vendor?.password);

      if (passed) {
        const token = jwt.sign({ id: Vendor?._id }, "mySecret");

        return res.status(201).json({
          message: "Welcome back",
          data: token,
          status: 201,
        });
      } else {
        return res.status(404).json({
          message: "Error with your Password",
          status: 404,
        });
      }
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

export const getAllVendor = async (req: Request, res: Response) => {
  try {
    const Vendor = await vendorModel.find();

    return res.status(200).json({
      message: "get Vendors",
      status: 200,
      data: Vendor,
    });
  } catch (error) {
    return res.status(404).json({
      message: "Error creating Vendor",
      status: 404,
    });
  }
};

export const getOneVendor = async (req: Request, res: Response) => {
  try {
    const { vendorID } = req.params;
    const Vendor = await vendorModel.findById(vendorID);

    return res.status(200).json({
      message: "get vendors",
      status: 200,
      data: Vendor,
    });
  } catch (error) {
    return res.status(404).json({
      message: "Error creating Vendor",
      status: 404,
    });
  }
};

export const getOneVendorHistory = async (req: Request, res: Response) => {
  try {
    const { vendorID } = req.params;
    const vendor = await vendorModel.findById(vendorID).populate({
      path: "history",
      options: {
        sort: {
          createdAt: -1,
        },
      },
    });

    return res.status(200).json({
      message: "get vendors store",
      status: 200,
      data: vendor?.history,
    });
  } catch (error) {
    return res.status(404).json({
      message: "Error creating vendor",
      status: 404,
    });
  }
};

export const getOneVendorStore = async (req: Request, res: Response) => {
  try {
    const { vendorID } = req.params;
    const vendor = await vendorModel.findById(vendorID).populate({
      path: "store",
      options: {
        sort: {
          createdAt: -1,
        },
      },
    });

    return res.status(200).json({
      message: "get vendors store",
      status: 200,
      data: vendor?.store,
    });
  } catch (error) {
    return res.status(404).json({
      message: "Error creating vendor",
      status: 404,
    });
  }
};
