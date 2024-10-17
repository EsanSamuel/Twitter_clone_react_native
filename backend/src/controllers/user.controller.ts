import express from "express";
import prisma from "../libs/prismadb";
import {
  createUserType,
  validateUser,
  validateUpdate,
  updateUserType,
} from "../libs/validation";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: "dirm0bwdw",
  api_key: "244737511899697",
  api_secret: "LBf0Bay00WC4w1bonkdeapChUO4",
});

export const createUser = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const validate = validateUser.parse(req.body);
    const { username, email, clerkId }: createUserType = validate;
    console.log("RequestBody:", req.body);
    const user = await prisma.user.create({
      data: {
        username,
        email,
        clerkId,
      },
    });
    console.log(user);
    res.status(201).json(user);
  } catch (error) {
    console.log(error);
    res.status(500).send("Something went wrong!");
  }
};

export const getUser = async (req: express.Request, res: express.Response) => {
  try {
    const id = req.params.id;
    console.log(id);
    const user = await prisma.user.findUnique({
      where: {
        clerkId: id,
      },
    });
    console.log(user.id);
    res.status(200).json(user);
  } catch (error) {
    console.log(error);
    res.status(500).send("Something went wrong!");
  }
};

export const updateUser = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const id = req.params.id;
    const validate = validateUpdate.parse(req.body);
    const { username, bio, profileImage }: updateUserType = validate;
    console.log("RequestBody:", req.body);
    const ImageUrl = await cloudinary.uploader.upload(profileImage);
    const userUpdate = await prisma.user.update({
      where: {
        clerkId: id,
      },
      data: {
        username,
        profileImage: ImageUrl.url,
        bio,
      },
    });
    res.status(200).json(userUpdate);
  } catch (error) {
    console.log(error);
    res.status(500).send("Something went wrong!");
  }
};
