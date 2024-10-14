import { View, Text } from "react-native";
import React from "react";
import { Tabs } from "expo-router";
import TabIcon from "@/components/TabIcon";
import Feather from "@expo/vector-icons/Feather";
import { AntDesign } from "@expo/vector-icons";

const TabLayout = () => {
  return (
    <Tabs
      screenOptions={{
        tabBarShowLabel: false,
        tabBarInactiveTintColor:"#9CA3AF",
        tabBarActiveTintColor:"#1DA1F2",
        tabBarStyle: {
          borderTopWidth: 1,
          height: 60,
        },
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: "home",
          headerShown: false,
          tabBarIcon: ({ color, focused, size }) => (
            <TabIcon
              icon={<Feather name="home" size={24} color={color} />}
              focused={focused}
              color={color}
              name="Home"
            />
          ),
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          title: "Search",
          headerShown: false,
          tabBarIcon: ({ color, focused, size }) => (
            <TabIcon
              icon={<Feather name="search" size={24} color={color} />}
              focused={focused}
              color={color}
              name="Home"
            />
          ),
        }}
      />
       <Tabs.Screen
        name="create-post"
        options={{
          title: "Create",
          headerShown: false,
          tabBarIcon: ({ color, focused, size }) => (
            <TabIcon
              icon={<AntDesign name="pluscircleo" size={30} color={color} />}
              focused={focused}
              color={color}
              name="Home"
            />
          ),
        }}
      />
      <Tabs.Screen
        name="notification"
        options={{
          title: "home",
          headerShown: false,
          tabBarIcon: ({ color, focused, size }) => (
            <TabIcon
              icon={<Feather name="bell" size={24} color={color}/>}
              focused={focused}
              color={color}
              name="Home"
            />
          ),
        }}
      />
      <Tabs.Screen
        name="chat"
        options={{
          title: "home",
          headerShown: false,
          tabBarIcon: ({ color, focused, size }) => (
            <TabIcon
              icon={<Feather name="mail" size={24} color={color} />}
              focused={focused}
              color={color}
              name="Home"
            />
          ),
        }}
      />
    </Tabs>
  );
};

export default TabLayout;
