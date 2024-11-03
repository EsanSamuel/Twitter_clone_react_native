import { useAuth } from "@clerk/clerk-expo";
import axios from "axios";
import React, { useEffect, useState } from "react";

export interface UserProps {
  user: {
    username: string;
    profileImage: string;
    email: string;
    bio: string;
  };
  firstName: string;
  lastName: string;
}

export const UserContext = React.createContext<UserProps | any>(null);

const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const { userId } = useAuth();
  const [user, setUser] = useState<any>("");
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");

  useEffect(() => {
    const getUserId = async () => {
      const response = await axios.get(
        `http://192.168.43.200:3000/user/${userId}`
      );
      setUser(response.data);
      const username = response.data.username;
      if (username.includes(" ")) {
        const [firstname, lastname] = username.split(" ");
        setFirstName(firstname);
        setLastName(lastname);
      } else {
        setFirstName(username);
        setLastName("");
      }
    };
    getUserId();
  }, [userId]);
  return (
    <UserContext.Provider value={{ user, firstName, lastName }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
