import { View, Text } from "react-native";
import React from "react";

interface TabIconProps {
  icon: React.ReactNode;
  name: string;
  focused: boolean;
  color: string;
}

const TabIcon = ({ icon, name, focused, color }: TabIconProps) => {
  return (
    <View className="flex justify-center items-center gap-2"> 
      {icon}
    </View>
  );
};

export default TabIcon;
