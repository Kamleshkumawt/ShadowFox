import { baseApi } from './baseApi';

export const adminAuthApi = baseApi.injectEndpoints({

  endpoints: (builder) => ({
    createAdminAccount: builder.mutation({
      query: (data) => ({
        url: '/admin/user/create',
        method: 'POST',
        body: data,
      }),
    }),
    AdminLoginAccount: builder.mutation({
      query: (data) => ({
        url: '/admin/user/login',
        method: 'POST',
        body: data,
      }),
    }),
    updateAdminAccount: builder.mutation({
      query: (data) => ({
        url: '/admin/user/update-details',
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['User'],
    }),
    changeAdminPassword: builder.mutation({
      query: (data) => ({
        url: '/admin/user/change',
        method: 'PUT',
        body: data,
      }),
    }),
    getAdminProfileAccount: builder.mutation({
      query: () => ({
        url: '/admin/user/me',
        method: 'GET',
      }),
    }),
    signOutAdminAccount: builder.mutation({
      query: () => ({
        url: '/admin/user/logout',
        method: 'GET',
      }),
    }),
  }),
});

export const {
  useCreateAdminAccountMutation,
  useAdminLoginAccountMutation,
  useUpdateAdminAccountMutation,
  useChangeAdminPasswordMutation,
  useGetAdminProfileAccountMutation,
  useSignOutAdminAccountMutation
} = adminAuthApi;