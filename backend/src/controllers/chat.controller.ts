import express from "express";
import prisma from "../libs/prismadb";

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
    const { message, roomId, userId } = req.body;
    console.log(req.body);

    const createmessage = await prisma.message.create({
      data: {
        message,
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
