import { createApi } from '@reduxjs/toolkit/query/react'
import { createBaseQuery } from '@/utils/createBaseQuery'
import {ILogin, ILoginResponse, IRegister, IUserInfo} from '@/interfaces/account'
import {serialize} from "object-to-formdata";

export const accountApi = createApi({
    reducerPath: 'accountApi',
    baseQuery: createBaseQuery('Account'),
    tagTypes: ['Account'],

    endpoints: (builder) => ({
        login: builder.mutation<ILoginResponse, ILogin>({
            query: (data : ILogin) => {
                return {
                    url: 'Login',
                    method: 'POST',
                    body: data
                }
            },
        }),

        register: builder.mutation<void, IRegister>({
            query: (data : IRegister) => {
                const formData = serialize(data);
                return {
                    url: 'Register',
                    method: 'POST',
                    body: formData
                }
            }
        }),

        getUserInfo: builder.query<IUserInfo, string | null>({
            query: (token)=> {
                return {
                    url: 'GetUserInfo',
                    method: 'GET',
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            },
        }),
    })
})

export const { useLoginMutation, useRegisterMutation, useGetUserInfoQuery } = accountApi;