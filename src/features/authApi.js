import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { baseUrl } from '../components/constants'

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({ baseUrl: baseUrl }),
  endpoints: (builder) => ({

    userLogin: builder.mutation({
      query: (query) => ({
        url: '/api/userLogin',
        method: 'POST',
        body: query
      })
    }),
    userSignup: builder.mutation({
      query: (query) => ({
        url: '/api/userRegister',
        method: 'POST',
        body: query
      })
    })

  })
})

export const { useUserLoginMutation, useUserSignupMutation } = authApi;