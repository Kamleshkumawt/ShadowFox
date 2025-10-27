import { baseApi } from "./baseApi";

export const productApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createProduct: builder.mutation({
      query: (formData) => ({
        url: "/products/create",
        method: "POST",
        body: formData,
      }),
    }),
    getAllProduct: builder.mutation({
      query: () => ({
        url: "/products/getAll",
        method: "Get",
      }),
    }),
    getProductById: builder.query({
      query: (id) => ({
        url: `/products/${id}`,
        method: "GET",
      }),
    }),
    getProductByCategory: builder.query({
      query: (id) => ({
        url: `/products/category/${id}`,
        method: "GET",
      }),
    }),
    getProductBySellerId: builder.query({
      query: (id) => ({
        url: `/products/seller/${id}`,
        method: "GET",
      }),
    }),
    getProductBySearch: builder.query({
      query: (id) => ({
        url: `/products/seller/search/${id}`,
        method: "GET",
      }),
    }),
    updateProduct: builder.mutation({
      query: (data) => ({
        url: '/products/update',
        method: "PUT",
        body:data
      }),
    }),
    deleteProductById: builder.mutation({
      query: (id) => ({
        url: `/products/delete/${id}`,
        method: "POST",
      }),
    }),
  }),
});

export const {
  useCreateProductMutation,
  useGetAllProductMutation,
  useGetProductByIdQuery,
  useGetProductByCategoryQuery,
  useGetProductBySellerIdQuery,
  useUpdateProductMutation,
  useDeleteProductByIdMutation,
  useGetProductBySearchQuery,
} = productApi;
