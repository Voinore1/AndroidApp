import * as SecureStore from 'expo-secure-store';

export const saveToSecureStore = async (key: string, value: string) => {
    await SecureStore.setItemAsync(key, value);
}

export const getValueForSecureStore = async (key: string) => {
    return await SecureStore.getItemAsync(key);
}

export const removeFromSecureStore = async (key: string) => {
    await SecureStore.deleteItemAsync(key);
}