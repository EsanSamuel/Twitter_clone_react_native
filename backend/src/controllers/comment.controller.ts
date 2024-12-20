import express from "express";
import prisma from "../libs/prismadb";
import { createCommentType, validateComment } from "../libs/validation";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: "dirm0bwdw",
  api_key: "244737511899697",
  api_secret: "LBf0Bay00WC4w1bonkdeapChUO4",
});

export const createComment = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const validate = validateComment.parse(req.body);
    const { post_id, comment, image, user_id }: createCommentType = validate;
    console.log("RequestBody:", req.body);

    let ImageUrl = null;
    if (image && image !== "") {
      const uploadResult = await cloudinary.uploader.upload(image);
      ImageUrl = uploadResult.url;
    }
    const createComment = await prisma.comment.create({
      data: {
        Post: {
          connect: {
            id: post_id,
          },
        },
        comment,
        image: ImageUrl,
        user: {
          connect: {
            id: user_id,
          },
        },
      },
    });
    console.log(createComment);
    res.status(201).json(createComment);
  } catch (error) {
    console.log(error);
    res.status(500).send("Error creating comment!");
  }
};

export const getComments = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const id = req.params.id;
    const comments = await prisma.comment.findMany({
      where: {
        postId: id,
      },
      include: {
        Post: true,
        user: true,
      },
    });
    console.log(comments);
    res.status(200).json(comments);
  } catch (error) {
    console.log(error);
    res.status(500).send("Error fetching Posts");
  }
};
