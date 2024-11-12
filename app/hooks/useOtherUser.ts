import { View, Text } from "react-native";
import React, { useContext, useMemo } from "react";
import { UserContext } from "@/context/UserProvider";

const useOtherUser = (room: { users: any[] }) => {
  const { user } = useContext(UserContext);

  const otherUser = useMemo(() => {
    const userEmail = user.email;
    const otherUser = room?.users.filter(
      (user: any) => user.email !== userEmail
    );
    console.log(otherUser[0])
    return otherUser[0];
  }, [user.email, room.users]);

  return otherUser;
};

export default useOtherUser;
