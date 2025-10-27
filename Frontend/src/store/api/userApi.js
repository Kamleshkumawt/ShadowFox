import { baseApi } from './baseApi';

export const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    addToCartProduct: builder.mutation({
      query: (data) => ({
        url: '/users/cart/create',
        method: 'POST',
        body: data,
      }),
    }),
    getToCartProduct: builder.mutation({
      query: () => ({
        url: '/users/cart/getCart',
        method: 'Get',
      }),
    }),
    updateToCartProduct: builder.mutation({
      query: (data) => ({
        url: '/users/cart/update',
        method: 'PUT',
        body: data,
      }),
    }),
    removeToCartProduct: builder.mutation({
      query: (data) => ({
        url: '/users/cart/delete',
        method: 'PUT',
        body: data,
      }),
    }),
    addToWishlistProduct: builder.mutation({
      query: (data) => ({
        url: '/users/wishlist/create',
        method: 'POST',
        body: data,
      }),
    }),
    getToWishlistProduct: builder.mutation({
      query: () => ({
        url: '/users/wishlist/get',
        method: 'GET',
      }),
    }),
    updateToWishlistProduct: builder.mutation({
      query: (data) => ({
        url: '/users/wishlist/update',
        method: 'PUT',
        body: data,
      }),
    }),
    removeToWishlistProduct: builder.mutation({
      query: (data) => ({
        url: '/users/wishlist/delete',
        method: 'DELETE',
        body: data,
      }),
      invalidatesTags: ['User'],
    }),
    reviewToProduct: builder.mutation({
      query: (data) => ({
        url: '/users/review/create',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['User'],
    }),
    returnsCreateProduct: builder.mutation({
      query: (data) => ({
        url: '/users/returns/products',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['User'],
    }),
    returnsGetProduct: builder.mutation({
      query: () => ({
        url: '/users/returns/getAllProducts',
        method: 'GET',
      }),
      invalidatesTags: ['User'],
    }),
    returnsGetAllProduct: builder.mutation({
      query: () => ({
        url: '/users/returns/getAllReturns',
        method: 'GET',
      }),
      invalidatesTags: ['User'],
    }),
    createOrder: builder.mutation({
      query: (data) => ({
        url: '/users/order/create',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['User'],
    }),
    getOrder: builder.mutation({
      query: () => ({
        url: '/users/order/getUser',
        method: 'GET',
      }),
      invalidatesTags: ['User'],
    }),
    getProductByStatus: builder.mutation({
      query: () => ({
        url: `/users/order/getAll`,
        method: 'GET',
      }),
    }),
    getIncomeBySellerId: builder.mutation({
      query: () => ({
        url: `/users/order/getAllIncome`,
        method: 'GET',
      }),
    }),
    getOrderBySellerId: builder.query({
      query: (id) => ({
        url: `/users/order/getSeller/${id}`,
        method: 'GET',
      }),
      invalidatesTags: ['User'],
    }),
    createOrderPayment: builder.mutation({
      query: (data) => ({
        url: '/users/payment',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['User'],
    }),
    getAllCategories: builder.mutation({
      query: () => ({
        url: '/users/category/getAllCategories',
        method: 'GET',
      }),
      invalidatesTags: ['User'],
    }),
    getCategories: builder.mutation({
      query: () => ({
        url: '/users/category/getCategories',
        method: 'GET',
      }),
      invalidatesTags: ['User'],
    }),
    getAllCategoriesByParentId: builder.query({
      query: (id) => ({
        url: `/users/category/getCategoryById/${id}`,
        method: 'GET',
      }),
      invalidatesTags: ['User'],
    }),
    getAllCategoriesBySlug: builder.query({
      query: (slug) => ({
        url: `/users/category/getCategory/${slug}`,
        method: 'GET',
      }),
      invalidatesTags: ['User'],
    }),
    getAllCategoriesById: builder.query({
      query: (id) => ({
        url: `/users/category/getCategorySelfById/${id}`,
        method: 'GET',
      }),
      invalidatesTags: ['User'],
    }),
    updateAddress: builder.mutation({
      query: (data) => ({
        url: `/users/updatedAddressById`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['User'],
    }),
    addNewAddress: builder.mutation({
      query: (data) => ({
        url: `/users/addNewAddress`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['User'],
    }),
  }),
});

export const {
  useAddToCartProductMutation,
  useGetToCartProductMutation,
  useUpdateToCartProductMutation,
  useRemoveToCartProductMutation,
  useAddToWishlistProductMutation,
  useGetToWishlistProductMutation,
  useUpdateToWishlistProductMutation,
  useRemoveToWishlistProductMutation,
  useReviewToProductMutation,
  useReturnsCreateProductMutation,
  useReturnsGetProductMutation,
  useReturnsGetAllProductMutation,
  useCreateOrderPaymentMutation,
  useCreateOrderMutation,
  useGetOrderMutation,
  useGetOrderBySellerIdQuery,
  useGetAllCategoriesMutation,
  useGetAllCategoriesByParentIdQuery,
  useGetAllCategoriesByIdQuery,
  useGetCategoriesMutation,
  useAddNewAddressMutation,
  useUpdateAddressMutation,
  useGetAllCategoriesBySlugQuery,
  useGetProductByStatusMutation,
  useGetIncomeBySellerIdMutation,
} = userApi;