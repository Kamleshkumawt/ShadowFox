import { baseApi } from './baseApi';

export const adminApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createCategoryByAdmin: builder.mutation({
      query: (data) => ({
        url: '/admin/category/create',
        method: 'POST',
        body: data,
      }),
    }),
    getAllCategoriesByAdmin: builder.mutation({
      query: () => ({
        url: '/admin/category/getCategories',
        method: 'GET',
      }),
    }),
    updateCategoryByAdmin: builder.mutation({
      query: (data) => ({
        url: '/admin/category/update/:id',
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['User'],
    }),
    deleteCategoryByAdmin: builder.mutation({
      query: (id) => ({
        url: `/admin/category/delete/${id}`,
        method: 'DELETE',
      }),
    }),
    getAllUsersByAdmin: builder.mutation({
      query: () => ({
        url: '/admin/user/getAll',
        method: 'GET',
      }),
    }),
    getAllSellerByAdmin: builder.mutation({
      query: () => ({
        url: '/admin/seller/getAll',
        method: 'GET',
      }),
    }),
    getAllOrdersByAdmin: builder.mutation({
      query: () => ({
        url: '/admin/orders/getAll',
        method: 'GET',
      }),
    }),
    getOrdersById: builder.query({
      query: (id) => ({
        url: `/admin/orders/getById/${id}`,
        method: 'GET',
      }),
    }),
    getUserById: builder.query({
      query: (id) => ({
        url: `/admin/user/getUserById/${id}`,
        method: 'GET',
      }),
    }),
    getSellerById: builder.query({
      query: (id) => ({
        url: `/admin/seller/getSellerById/${id}`,
        method: 'GET',
      }),
    }),
    updateOrdersByAdmin: builder.mutation({
      query: (data) => ({
        url: `/admin/orders/update`,
        method: 'PUT',
        body: data,
      }),
    }),
    getAllProductsByAdmin: builder.mutation({
      query: () => ({
        url: '/admin/products/getAll',
        method: 'GET',
      }),
    }),
    deleteProductByAdmin: builder.mutation({
      query: (id) => ({
        url: `/admin/products/delete/${id}`,
        method: "DELETE",
      }),
    }),
    blockedUserByAdmin: builder.mutation({
      query: (id) => ({
        url: `/admin/user/blocked/${id}`,
        method: "PUT",
      }),
    }),
    blockedSellerByAdmin: builder.mutation({
      query: (id) => ({
        url: `/admin/seller/blocked/${id}`,
        method: "PUT",
      }),
    }),
    updateUserProfileByAdmin: builder.mutation({
      query: (data) => ({
        url: '/admin/user/update-profile',
        method: 'PUT',
        body: data,
      }),
    }),
    updateSellerProfileByAdmin: builder.mutation({
      query: (data) => ({
        url: '/admin/seller/update-profile',
        method: 'PUT',
        body: data,
      }),
    }),
    updateUserPassByAdmin: builder.mutation({
      query: (data) => ({
        url: '/admin/user/update-pass',
        method: 'PUT',
        body: data,
      }),
    }),
     updateSellerPassByAdmin: builder.mutation({
      query: (data) => ({
        url: '/admin/seller/update-pass',
        method: 'PUT',
        body: data,
      }),
    }),
  }),
});

export const {
  useCreateCategoryByAdminMutation,
  useGetAllCategoriesByAdminMutation,
  useUpdateCategoryByAdminMutation,
  useDeleteCategoryByAdminMutation,
  useGetAllUsersByAdminMutation,
  useGetAllSellerByAdminMutation,
  useGetAllOrdersByAdminMutation,
  useUpdateOrdersByAdminMutation,
  useGetAllProductsByAdminMutation,
  useDeleteProductByAdminMutation,
  useGetOrdersByIdQuery,
  useBlockedUserByAdminMutation,
  useBlockedSellerByAdminMutation,
  useGetUserByIdQuery,
  useGetSellerByIdQuery,
  useUpdateUserProfileByAdminMutation,
  useUpdateSellerProfileByAdminMutation,
  useUpdateUserPassByAdminMutation,
  useUpdateSellerPassByAdminMutation
} = adminApi;