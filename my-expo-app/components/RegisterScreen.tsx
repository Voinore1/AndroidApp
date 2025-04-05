import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { useState } from 'react';
import { RootStackParamList } from '../navigation';
import {NavigationProp, useNavigation} from "@react-navigation/native";
import axios from "axios";
import {Controller, useForm} from "react-hook-form";
import { BASE_API_URL } from "../api";

type FormData = {
    username: string;
    email: string;
    password: string;
};

export default function RegisterScreen() {
    const navigation = useNavigation<NavigationProp<RootStackParamList>>();
    const { control, handleSubmit, formState: { errors } } = useForm<FormData>();
    const [error, setError] = useState('');

    const handleRegister = async (data: FormData) => {
        setError('');
        try {
            const response = await axios.post(
                `${BASE_API_URL}Auth/register`,
                {
                    username: data.username,
                    email: data.email,
                    password: data.password
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }
            );
            // Якщо реєстрація пройшла успішно, переходимо на головну сторінку
            navigation.navigate('Home');
        } catch (err: any) {
            setError(err.response?.data?.message || 'Помилка при реєстрації');
        }
    };

    return (
        <View className="flex-1 justify-center items-center bg-gradient-to-r from-green-400 to-teal-500 p-6">
            <View className="w-full max-w-sm bg-white p-6 rounded-2xl shadow-lg">
                <Text className="text-3xl font-bold text-center text-gray-800 mb-6">Реєстрація</Text>

                <Controller
                    control={control}
                    name="username"
                    rules={{ required: `${BASE_API_URL}Auth/register`}}
                    render={({ field: { onChange, value } }) => (
                        <TextInput
                            className="w-full p-4 border border-gray-300 rounded-lg bg-gray-100 text-gray-900 mb-4"
                            placeholder="Ім'я"
                            value={value}
                            onChangeText={onChange}
                        />
                    )}
                />
                {errors.username && <Text className="text-red-500 text-sm">{errors.username.message}</Text>}

                <Controller
                    control={control}
                    name="email"
                    rules={{
                        required: 'Email є обов\'язковим',
                        pattern: {
                            value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                            message: 'Невірний формат Email'
                        }
                    }}
                    render={({ field: { onChange, value } }) => (
                        <TextInput
                            className="w-full p-4 border border-gray-300 rounded-lg bg-gray-100 text-gray-900 mb-4"
                            placeholder="Email"
                            keyboardType="email-address"
                            value={value}
                            onChangeText={onChange}
                        />
                    )}
                />
                {errors.email && <Text className="text-red-500 text-sm">{errors.email.message}</Text>}

                <Controller
                    control={control}
                    name="password"
                    rules={{
                        required: 'Пароль є обов\'язковим',
                        minLength: { value: 6, message: 'Пароль повинен містити не менше 6 символів' }
                    }}
                    render={({ field: { onChange, value } }) => (
                        <TextInput
                            className="w-full p-4 border border-gray-300 rounded-lg bg-gray-100 text-gray-900 mb-2"
                            placeholder="Пароль"
                            secureTextEntry
                            value={value}
                            onChangeText={onChange}
                        />
                    )}
                />
                {errors.password && <Text className="text-red-500 text-sm">{errors.password.message}</Text>}

                {error !== '' && (
                    <Text className="text-red-500 text-center mb-4">{error}</Text>
                )}

                <TouchableOpacity
                    className="w-full bg-blue-600 p-4 rounded-lg shadow-md"
                    onPress={handleSubmit(handleRegister)}
                >
                    <Text className="text-white text-center font-bold text-lg">Зареєструватися</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                    <Text className="text-blue-600 text-center mt-4">Уже маєте акаунт? Увійти</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}