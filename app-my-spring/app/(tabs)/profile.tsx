import React from "react";
import {
    SafeAreaView,
    StyleSheet,
    ScrollView,
    View,
    Text,
    Image,
    KeyboardAvoidingView,
    Platform,
    Dimensions, TouchableOpacity
} from "react-native";
import {SafeAreaProvider} from "react-native-safe-area-context";
import {IMAGE_URL} from "@/constants/Urls";
import {useAppDispatch, useAppSelector} from "@/store";
import {useRouter} from "expo-router";
import {removeFromSecureStore} from "@/utils/secureStore";
import {logOut} from "@/store/slices/userSlice";
import {useGetUserInfoQuery} from "@/services/accountService";

const ProfileScreen = () => {

    const dispatch = useAppDispatch();
    const router = useRouter();
    const token = useAppSelector((state) => state.user.token);
    const { data: user, isLoading, error } = useGetUserInfoQuery(token);

    const handleLogout = async () => {
        await removeFromSecureStore('authToken');
        dispatch(logOut());
        router.replace("/login");
    };

    const windowWidth = Dimensions.get('window').width;

    return (
        <SafeAreaProvider>
            <SafeAreaView className="flex-1">
                <KeyboardAvoidingView
                    behavior={Platform.OS === "ios" ? "padding" : "height"}
                    className="flex-1"
                >
                    <ScrollView
                        contentContainerStyle={{flexGrow: 1, paddingHorizontal: 20}}
                        keyboardShouldPersistTaps="handled"
                    >
                        <View
                            className="w-full flex justify-center items-start my-6"
                            style={{
                                minHeight: Dimensions.get("window").height - 100,
                            }}
                        >
                            {user ? (
                                    <>
                                        <Image
                                            source={{ uri: `${IMAGE_URL}${user.image}` }}
                                            style={{
                                                width: windowWidth - 40, // наприклад, відступи по 20 з кожного боку
                                                height: windowWidth - 40, // або іншу висоту для правильного співвідношення
                                                borderRadius: 10, // за бажанням
                                            }}
                                            resizeMode="cover" // або "contain", залежно від того, що хочеш
                                        />

                                        <Text className="text-3xl font-bold my-6 text-white">
                                            {user?.userName}
                                        </Text>

                                        <Text className="text-2xl font-bold mb-6 text-white">
                                            Пошта: {user?.email}
                                        </Text>

                                        <TouchableOpacity
                                            onPress={handleLogout}
                                            style={styles.logoutButton}
                                        >
                                            <Text style={styles.logoutText}>Вийти</Text>
                                        </TouchableOpacity>
                                    </>
                                )
                                : (
                                    <Text>Завантаження даних...</Text>
                                )}
                        </View>
                    </ScrollView>
                </KeyboardAvoidingView>
            </SafeAreaView>
        </SafeAreaProvider>
    );
};

const styles = StyleSheet.create({
    container: {flex: 1, justifyContent: "center", padding: 20},
    title: {fontSize: 20, marginBottom: 15, fontWeight: "bold"},
    logoutButton: {
        marginTop: 30,
        padding: 12,
        backgroundColor: "#ff4d4d",
        borderRadius: 8,
        alignItems: "center",
    },
    logoutText: {color: "white", fontWeight: "bold"},
});

export default ProfileScreen;