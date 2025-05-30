import React, { useState } from "react";
import {
    SafeAreaView,
    ScrollView,
    View,
    Text,
    KeyboardAvoidingView,
    Platform,
    Dimensions,
    TouchableOpacity,
} from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import FormField from "@/components/FormField";
import { useRouter } from "expo-router";
import {useLoginMutation} from "@/services/accountService";
import LoadingOverlay from "@/components/LoadingOverlay"; // Використовуємо для навігації
import {useDispatch} from "react-redux";
import {saveToSecureStore} from "@/utils/secureStore";
import {setCredentials} from "@/store/slices/userSlice";
import {jwtParse} from "@/utils/jwtParser";
import {IUser} from "@/interfaces/account";

const SignInScreen = () => {
    const router = useRouter(); // Ініціалізуємо роутер
    const [form, setForm] = useState({ email: "", password: "" });
    const [login, { isLoading, error } ] = useLoginMutation();
    const dispatch = useDispatch();

    const handleChange = (field: string, value: string) => {
        setForm({ ...form, [field]: value });
    };

    const handleSubmitLogin = async () => {
        console.log("Вхід:", form);
        try {
            const result = await login(form).unwrap();
            const {token} = result;
            await saveToSecureStore('authToken', token);
            dispatch(setCredentials({user: jwtParse(token) as IUser, token}))
            router.replace("/profile");
        }
        catch (err) {
            console.log("Login has problem:", err);
        }
    };

    return (
        <SafeAreaProvider>
            <SafeAreaView className="flex-1">
                <KeyboardAvoidingView
                    behavior={Platform.OS === "ios" ? "padding" : "height"}
                    className="flex-1"
                >
                    <ScrollView
                        contentContainerStyle={{ flexGrow: 1, paddingHorizontal: 20 }}
                        keyboardShouldPersistTaps="handled"
                    >
                        <LoadingOverlay visible={isLoading}/>
                        <View
                            className="w-full flex justify-center items-center my-6"
                            style={{
                                minHeight: Dimensions.get("window").height - 100,
                            }}
                        >
                            <Text className="text-3xl font-bold mb-6 text-black">
                                Вхід
                            </Text>

                            {error ? (
                                <View className="p-4 mb-4 text-sm text-red-800 bg-red-50 border border-red-300 rounded-lg" role="alert">
                                    <Text className="font-semibold">
                                        {'data' in error && error.data && typeof error.data === 'object' && 'error' in error.data
                                            ? (error.data as any).error
                                            : 'Something went wrong'}
                                    </Text>
                                </View>
                                ) : null}

                            <FormField
                                title={"Пошта"}
                                value={form.email}
                                handleChangeText={(value: string) => handleChange("email", value)}
                                placeholder={"Вкажіть пошту"}
                                keyboardType="email-address"
                            />

                            <FormField
                                title={"Пароль"}
                                value={form.password}
                                handleChangeText={(value: string) => handleChange("password", value)}
                                placeholder={"Вкажіть пароль"}
                                secureTextEntry={true}
                            />

                            {/* Кнопка "Реєстрація" */}
                            <TouchableOpacity
                                onPress={handleSubmitLogin}
                                className="w-full bg-blue-500 p-4 rounded-lg mt-4"
                            >
                                <Text className="text-white text-center text-lg font-bold">
                                    Вхід
                                </Text>
                            </TouchableOpacity>

                            {/* Кнопка "Реєстрація" */}
                            <TouchableOpacity
                                onPress={() => router.replace("/register")}
                                className="w-full bg-gray-300 p-4 rounded-lg mt-2"
                            >
                                <Text className="text-black text-center text-lg font-medium">
                                    Немає акаунту? Реєстрація
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </ScrollView>
                </KeyboardAvoidingView>
            </SafeAreaView>
        </SafeAreaProvider>
    );
};

export default SignInScreen;