import { Text, TextInput, TextInputProps, View } from "react-native";
import React from "react";

interface FormFieldProps extends TextInputProps {
    title: string;
    value: string;
    placeholder: string;
    handleChangeText: (value: string) => void;
    otherStyles?: string;
}

const FormField: React.FC<FormFieldProps> = ({
                                                 title,
                                                 value,
                                                 placeholder,
                                                 handleChangeText,
                                                 otherStyles = "",
                                                 ...props
                                             }) => {
    return (
        <View className={`w-full mb-4 ${otherStyles}`}>
            <Text className="ml-2 mb-1 text-base text-gray-700 font-medium">
                {title}
            </Text>
            <View className="w-full h-14 px-4 bg-gray-100 rounded-xl border border-gray-300 focus-within:border-blue-500 shadow-sm flex flex-row items-center">
                <TextInput
                    placeholder={placeholder}
                    value={value}
                    onChangeText={handleChangeText}
                    className="flex-1 text-black font-medium text-base"
                    {...props}
                />
            </View>
        </View>
    );
};

export default FormField;