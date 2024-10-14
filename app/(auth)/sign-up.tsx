import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import AntDesign from "@expo/vector-icons/AntDesign";
import FormField from "@/components/FormField";
import { router } from "expo-router";
import { useSignUp } from "@clerk/clerk-expo";
import { useRouter } from "expo-router";
import ReactNativeModal from "react-native-modal";

const SignUp = () => {
  const { isLoaded, signUp, setActive } = useSignUp();
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [pendingVerification, setPendingVerification] = useState(false);
  const [isLoading, setIsLoading] = useState<Boolean>(false);
  const [code, setCode] = useState("");

  const onSignUpPress = async () => {
    if (!isLoaded) {
      return;
    }

    try {
      setIsLoading(true);
      await signUp.create({
        emailAddress: form.email,
        password: form.password,
      });

      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });

      setPendingVerification(true);
    } catch (err: any) {
      console.error(JSON.stringify(err, null, 2));
    }
  };

  const onPressVerify = async () => {
    if (!isLoaded) {
      return;
    }

    try {
      const completeSignUp = await signUp.attemptEmailAddressVerification({
        code,
      });

      if (completeSignUp.status === "complete") {
        await setActive({ session: completeSignUp.createdSessionId });
        router.replace("/home");
      } else {
        console.error(JSON.stringify(completeSignUp, null, 2));
      }
    } catch (err: any) {
      console.error(JSON.stringify(err, null, 2));
    }
  };

  return (
    <SafeAreaView className="bg-white h-full ">
      <ScrollView contentContainerStyle={{ height: "auto" }}>
        <View className="justify-center px-7 gap-4 min-h-[80vh] pb-10 pt-10">
          <AntDesign name="twitter" size={70} color="#1DA1F2" />
          <Text className="text-2xl font-pbold max-w-[70%] text-gray-600">
            See what's happening in the world right now.
          </Text>

          <View className="pt-10 gap-2">
            <Text className="text-[20px] font-pbold  text-gray-600">
              Sign Up to Twitter
            </Text>
            <View className="items-center gap-3 flex flex-col pt-1 pb-5">
              <FormField
                title="Enter Username"
                otherStyles=""
                value={form.username}
                handleChangeText={(e: any) => setForm({ ...form, username: e })}
              />
              <FormField
                title="Enter email"
                otherStyles="mt-5"
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
              onPress={onSignUpPress}
            >
              <Text className="text-white text-center font-psemibold">
                {isLoading ? "Signing in..." : "Sign In"}
              </Text>
            </TouchableOpacity>

            <View className="pt-5">
              <Text className="text-gray-500 pb-2 text-center text-[13px] font-pmedium">
                Already have an account?
              </Text>
              <TouchableOpacity
                className="w-full text-center  bg-white border-blue border-[2px]  rounded-full p-3 text-blue"
                activeOpacity={0.7}
                onPress={() => router.push("/sign-in")}
              >
                <Text className="text-blue text-center font-psemibold">
                  Log In
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <ReactNativeModal
          isVisible={pendingVerification}
          //onBackdropPress={() => setPendingVerification(false)} // Close the modal when tapping outside
          //onBackButtonPress={() => setPendingVerification(false)} // Handle Android back button
          animationIn="slideInUp"
          animationOut="slideOutDown"
        >
          <View className="bg-white px-7 py-9 rounded-2xl mb-2">
            <Text className="text-center text-2xl font-pbold mb-2">
              Verification
            </Text>
            <Text className="text-center font-pmedium text-[13px]">
              We've sent a Verification code to {form.email}
            </Text>
            <FormField
              title="Enter Code"
              otherStyles="mt-5"
              value={code}
              handleChangeText={(code) => setCode(code)}
            />
            <TouchableOpacity
              className="w-full text-center  bg-blue rounded-full p-3 text-white mt-5"
              activeOpacity={0.7}
              onPress={onPressVerify}
            >
              <Text className="text-white text-center font-psemibold">
                Verify
              </Text>
            </TouchableOpacity>
          </View>
        </ReactNativeModal>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignUp;
