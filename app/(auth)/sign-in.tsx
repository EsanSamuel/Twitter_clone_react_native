import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import AntDesign from "@expo/vector-icons/AntDesign";
import FormField from "@/components/FormField";
import { router } from "expo-router";
import { useSignIn } from "@clerk/clerk-expo";

const SignIn = () => {
  const { signIn, setActive, isLoaded } = useSignIn();
  const [isLoading, setIsLoading] = useState<Boolean>(false);
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const onSignInPress = React.useCallback(async () => {
    if (!isLoaded) {
      return;
    }
    try {
      setIsLoading(true);
      const signInAttempt = await signIn.create({
        identifier: form.email,
        password: form.password,
      });

      if (signInAttempt.status === "complete") {
        await setActive({ session: signInAttempt.createdSessionId });
        router.replace("/home");
      } else {
        console.error(JSON.stringify(signInAttempt, null, 2));
      }
    } catch (err: any) {
      console.error(JSON.stringify(err, null, 2));
    }
  }, [isLoaded, form]);

  return (
    <SafeAreaView className="bg-white h-full ">
      <ScrollView contentContainerStyle={{ height: "auto" }}>
        <View className="justify-center px-7 gap-4 min-h-[85vh] pt-10 pb-10">
          <AntDesign name="twitter" size={70} color="#1DA1F2" />
          <Text className="text-2xl font-pbold max-w-[70%] text-gray-600">
            See what's happening in the world right now.
          </Text>

          <View className="pt-10 gap-2">
            <Text className="text-[20px] font-pbold max-w-[70%] text-gray-600">
              Log In to Twitter
            </Text>
            <View className="items-center gap-3 flex flex-col pt-1 pb-5">
              <FormField
                title="Enter email"
                otherStyles=""
                value={form.email}
                handleChangeText={(e: any) => setForm({ ...form, email: e })}
              />
              <FormField
                title="Enter password"
                otherStyles="mt-5"
                value={form.password}
                handleChangeText={(e: any) => setForm({ ...form, password: e })}
              />
            </View>
            <TouchableOpacity
              className="w-full text-center  bg-blue rounded-full p-3 text-white"
              activeOpacity={0.7}
              onPress={onSignInPress}
            >
              <Text className="text-white text-center font-psemibold">
                {isLoading ? "Logging in..." : "Log In"}
              </Text>
            </TouchableOpacity>

            <View className="pt-5">
              <Text className="text-gray-500 pb-2 text-center font-pmedium text-[13px]">
                Don't have an account?
              </Text>
              <TouchableOpacity
                className="w-full text-center  bg-white border-blue border-[2px]  rounded-full p-3 text-blue"
                activeOpacity={0.7}
                onPress={() => router.push("/sign-up")}
              >
                <Text className="text-blue text-center font-psemibold">
                  Sign In
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignIn;
