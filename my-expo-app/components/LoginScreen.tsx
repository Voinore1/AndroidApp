import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import { useState } from 'react';
import { RootStackParamList } from '../navigation';
import axios from "axios";
import { BASE_API_URL } from "../api";
import {Controller, useForm} from "react-hook-form";

type FormData = {
    email: string;
    password: string;
};

function LoginScreen(){
    const navigation = useNavigation<NavigationProp<RootStackParamList>>();
    const { control, handleSubmit, formState: { errors } } = useForm<FormData>();
    const [error, setError] = useState('');

    const handleLogin = async (data: FormData) => {
        setError('');
        try {
            const response = await axios.post(
                `${BASE_API_URL}Auth/login`,
                {
                    email: data.email,
                    password: data.password
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }
            );
            // Якщо логін успішний, переходимо на головну сторінку
            navigation.navigate('Home');
        } catch (err: any) {
            setError(err.response?.data?.message || 'Пароль або пошта неправильні');
        }
    };

    return (
        <View className="flex-1 justify-center items-center bg-gradient-to-r from-blue-500 to-indigo-600 p-6">
            <View className="w-full max-w-sm bg-white p-6 rounded-2xl shadow-lg">
                <Text className="text-3xl font-bold text-center text-gray-800 mb-6">Логін</Text>

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
                            className="w-full p-4 border border-gray-300 rounded-lg bg-gray-100 text-gray-900 mb-6"
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
                    onPress={handleSubmit(handleLogin)}
                >
                    <Text className="text-white text-center font-bold text-lg">Увійти</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => navigation.navigate('Register')}>
                    <Text className="text-blue-600 text-center mt-4">Реєстрація</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default LoginScreen;
