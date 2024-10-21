import express from "express";
import prisma from "../libs/prismadb";
import {
  createReplyType,
  validateReply,
} from "../libs/validation";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: "dirm0bwdw",
  api_key: "244737511899697",
  api_secret: "LBf0Bay00WC4w1bonkdeapChUO4",
});

export const createReply = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const validate = validateReply.parse(req.body);
    const { comment_id, reply, image, user_id }: createReplyType = validate;
    console.log("RequestBody:", req.body);

    let ImageUrl = null;
    if (image && image !== "") {
      const uploadResult = await cloudinary.uploader.upload(image);
      ImageUrl = uploadResult.url;
    }
    const createreply = await prisma.reply.create({
      data: {
        commentId: comment_id,
        reply,
        image: ImageUrl,
        userId: user_id,
      },
    });
    console.log(createreply);
    res.status(201).json(createreply);
  } catch (error) {
    console.log(error);
    res.status(500).send("Error creating comment!");
  }
};

export const getReply = async (req: express.Request, res: express.Response) => {
  try {
    const id = req.params.id;
    const replies = await prisma.reply.findMany({
      where: {
        commentId: id,
      },
      include: {
        comment: true,
        user: true,
      },
    });
    console.log(replies);
    res.status(200).json(replies);
  } catch (error) {
    console.log(error);
    res.status(500).send("Error fetching Posts");
  }
};
