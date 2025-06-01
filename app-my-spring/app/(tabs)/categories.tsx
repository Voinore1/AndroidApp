import React from "react";
import {
    SafeAreaView,
    StyleSheet,
    ScrollView,
    View,
    Text,
    KeyboardAvoidingView,
    Platform,
    Dimensions
} from "react-native";
import {SafeAreaProvider} from "react-native-safe-area-context";
import {useAppSelector} from "@/store";
import {useGetCategoriesQuery} from "@/services/categoriesService";
import {isLoading} from "expo-font";

const CategoriesScreen = () => {
    const windowWidth = Dimensions.get('window').width;
    const token = useAppSelector((state) => state.user.token);
    const {data, isLoading, error} = useGetCategoriesQuery(token);
    console.log(data, isLoading, error);

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
                            <Text>Завантаження даних...</Text>
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

export default CategoriesScreen;