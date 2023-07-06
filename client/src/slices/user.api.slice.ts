import { apiSlice } from './api.slice'

const USER_URL = '/api'

export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    register: builder.mutation({
      query: data => ({
        url: `${USER_URL}/register`,
        method: 'POST',
        body: data
      })
    }),

    login: builder.mutation({
      query: data => ({
        url: `${USER_URL}/login`,
        method: 'POST',
        body: data
      })
    }),

    logout: builder.mutation({
      query: () => ({
        url: `${USER_URL}/logout`,
        method: 'POST'
      })
    }),

    refresh: builder.mutation({
      query: () => ({
        url: `${USER_URL}/refresh`,
        method: 'GET'
      })
    }),

    getUserInfo: builder.mutation({
      query: data => ({
        url: `${USER_URL}/userinfo`,
        method: 'GET',
        body: data
      })
    }),

    updateUserInfo: builder.mutation({
      query: data => ({
        url: `${USER_URL}/userinfo`,
        method: 'PUT',
        body: data
      })
    })
  })
})

export const {
  useLoginMutation,
  useLogoutMutation,
  useRegisterMutation,
  useGetUserInfoMutation,
  useUpdateUserInfoMutation
} = userApiSlice
