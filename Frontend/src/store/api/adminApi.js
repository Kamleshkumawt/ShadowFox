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
    updateOrdersByAdmin: builder.query({
      query: (id) => ({
        url: `/admin/orders/update/${id}`,
        method: 'PUT',
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
        url: `/products/delete/${id}`,
        method: "POST",
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
  useUpdateOrdersByAdminQuery,
  useGetAllProductsByAdminMutation,
  useDeleteProductByAdminMutation
} = adminApi;