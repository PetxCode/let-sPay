import { Request, Response } from "express";
import bcrypt from "bcrypt";
import userModel from "../model/userModel";
import jwt from "jsonwebtoken";

export const createUser = async (req: Request, res: Response) => {
  try {
    const { email, name, password } = req.body;

    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash(password, salt);

    const user = await userModel.create({
      email,
      name,
      password: hashed,
    });

    return res.status(201).json({
      message: "creating user",
      status: 201,
      data: user,
    });
  } catch (error) {
    return res.status(404).json({
      message: "Error creating User",
      status: 404,
    });
  }
};

export const loginUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const user = await userModel.findOne({ email });

    if (user) {
      const passed = await bcrypt.compare(password, user?.password);

      if (passed) {
        const token = jwt.sign({ id: user?._id }, "mySecret");

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
        message: "Error finding User",
        status: 404,
      });
    }
  } catch (error) {
    return res.status(404).json({
      message: "Error creating User",
      status: 404,
    });
  }
};

export const getAllUser = async (req: Request, res: Response) => {
  try {
    const user = await userModel.find();

    return res.status(200).json({
      message: "get users",
      status: 200,
      data: user,
    });
  } catch (error) {
    return res.status(404).json({
      message: "Error creating User",
      status: 404,
    });
  }
};

export const getOneUser = async (req: Request, res: Response) => {
  try {
    const { userID } = req.params;
    const user = await userModel.findById(userID);

    return res.status(200).json({
      message: "get users",
      status: 200,
      data: user,
    });
  } catch (error) {
    return res.status(404).json({
      message: "Error creating User",
      status: 404,
    });
  }
};

export const getOneUserHistory = async (req: Request, res: Response) => {
  try {
    const { userID } = req.params;
    const user = await userModel.findById(userID).populate({
      path: "history",
      options: {
        sort: {
          createdAt: -1,
        },
      },
    });

    return res.status(200).json({
      message: "get users",
      status: 200,
      data: user?.history,
    });
  } catch (error) {
    return res.status(404).json({
      message: "Error creating User",
      status: 404,
    });
  }
};
