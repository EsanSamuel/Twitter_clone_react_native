import express from "express";
import prisma from "../libs/prismadb";
import { v2 as cloudinary } from "cloudinary";
import { validateMessage } from "../libs/validation";

cloudinary.config({
  cloud_name: "dirm0bwdw",
  api_key: "244737511899697",
  api_secret: "LBf0Bay00WC4w1bonkdeapChUO4",
});

export const createRoom = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { userId, otherUserId } = req.body;
    console.log(req.body);

    const existingRoom = await prisma.room.findMany({
      where: {
        OR: [
          {
            userIds: {
              equals: [userId, otherUserId],
            },
          },
          {
            userIds: {
              equals: [otherUserId, userId],
            },
          },
        ],
      },
    });

    const singleRoom = existingRoom[0];
    if (singleRoom) {
      res.json(singleRoom);
    }

    const room = await prisma.room.create({
      data: {
        users: {
          connect: [
            {
              id: userId,
            },
            {
              id: otherUserId,
            },
          ],
        },
      },
      include: {
        users: true,
      },
    });
    console.log(room);
    res.status(201).json(room);
  } catch (error) {
    console.log(error);
  }
};

export const getRooms = async (req: express.Request, res: express.Response) => {
  try {
    const userId = req.params.id;
    console.log("User ID:", userId);

    if (!userId) {
      res.status(404).json([]);
    }

    const rooms = await prisma.room.findMany({
      where: {
        userIds: {
          has: userId,
        },
      },
      include: {
        users: true,
        messages: {
          include: {
            sender: true,
            seen: true,
          },
        },
      },
      orderBy: {
        lastMessagesAt: "desc",
      },
    });
    console.log(rooms);
    res.status(200).json(rooms);
  } catch (error) {
    console.log(error);
    res.status(500).send("Error fetching all user's chat!");
  }
};

export const getRoomById = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const roomId = req.params.id;
    const getRoom = await prisma.room.findUnique({
      where: {
        id: roomId,
      },
      include: {
        users: true,
      },
    });
    console.log(getRoom);
    res.status(200).json(getRoom);
  } catch (error) {
    console.log(error);
    res.status(500).send("Error fetching all user's chat!");
  }
};

export const createMessage = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const validate = validateMessage.parse(req.body);
    const { message, roomId, userId, image } = validate;
    console.log(req.body);

    let ImageUrl = null;
    if (image && image !== "") {
      const uploadResult = await cloudinary.uploader.upload(image);
      ImageUrl = uploadResult.url;
    }

    const createmessage = await prisma.message.create({
      data: {
        message,
        image: ImageUrl,
        room: {
          connect: {
            id: roomId,
          },
        },
        sender: {
          connect: {
            id: userId,
          },
        },
        seen: {
          connect: {
            id: userId,
          },
        },
      },
    });
    console.log(createmessage);
    res.status(201).json(createmessage);
  } catch (error) {
    console.log(error);
    res.status(500).send("Error fetching all user's chat!");
  }
};

export const getMessages = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const roomId = req.params.id;
    const getMessage = await prisma.message.findMany({
      where: {
        roomId,
      },
      include: {
        sender: true,
        seen: true,
      },
    });
    res.status(200).json(getMessage);
  } catch (error) {
    console.log(error);
    res.status(500).send("Error fetching all user's chat!");
  }
};
