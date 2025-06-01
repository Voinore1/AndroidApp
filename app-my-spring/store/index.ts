import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { accountApi } from '@/services/accountService'
import authReducer from '@/store/slices/userSlice'
import {categoriesApi} from "@/services/categoriesService";

export const store = configureStore({
    reducer: {
        user: authReducer,
        [accountApi.reducerPath]: accountApi.reducer,
        [categoriesApi.reducerPath]: categoriesApi.reducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware()
            .concat(accountApi.middleware, categoriesApi.middleware), // Додаємо API middleware
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector