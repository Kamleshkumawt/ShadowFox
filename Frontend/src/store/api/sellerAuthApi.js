import { baseApi } from './baseApi';

export const sellerAuthApi = baseApi.injectEndpoints({

  endpoints: (builder) => ({
    createSellerAccount: builder.mutation({
      query: (data) => ({
        url: '/users/seller/register',
        method: 'POST',
        body: data,
      }),
    }),
    sellerLogin: builder.mutation({
      query: (data) => ({
        url: '/users/seller/login',
        method: 'POST',
        body: data,
      }),
    }),
    updateSeller: builder.mutation({
      query: (data) => ({
        url: '/users/seller/update',
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['User'],
    }),
    changeSellerPassword: builder.mutation({
      query: (data) => ({
        url: '/users/seller/update-pass',
        method: 'PUT',
        body: data,
      }),
    }),
    getProfileSeller: builder.mutation({
      query: () => ({
        url: '/users/seller/me',
        method: 'GET',
      }),
    }),
    sellerLogout: builder.mutation({
      query: () => ({
        url: '/users/seller/logout',
        method: 'GET',
      }),
    }),
  }),
});

export const {
  useCreateSellerAccountMutation,
  useSellerLoginMutation,
  useUpdateSellerMutation,
  useGetProfileSellerMutation,
  useChangeSellerPasswordMutation,
  useSellerLogoutMutation,
} = sellerAuthApi;