import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import { baseUrl } from "../components/constants";





export const productApi = createApi({
  reducerPath: 'productApi',
  baseQuery: fetchBaseQuery({ baseUrl: baseUrl }),
  tagTypes: ['product'],
  endpoints: (builder) => ({
    getAllProduct: builder.query({
      query: (query) => ({
        url: '/api/get-product'
      }),
      providesTags: ['product']
    }),


    addProducts: builder.mutation({
      query: (query) => ({
        url: '/api/create-product',
        method: 'POST',
        body: query.body,
        headers: {
          'Authorization': query.token
        }
      }),
      invalidatesTags: ['product']
    }),

    getProductById: builder.query({
      query: (query) => ({
        url: `/api/getProductById/${query.id}`,
        headers: {
          'Authorization': query.token
        }
      }),
      providesTags: ['product']
    }),

    updateProductById: builder.mutation({
      query: (query) => ({
        url: `/api/updateProduct/${query.id}`,
        method: 'PATCH',
        headers: {
          'Authorization': query.token
        },
        body: query.body
      }),
      invalidatesTags: ['product']
    }),

    deleteProductById: builder.mutation({
      query: (query) => ({
        url: `/api/deleteProduct/${query.id}`,
        method: 'DELETE',
        headers: {
          'Authorization': query.token
        },
        body: query.body
      }),
      invalidatesTags: ['product']
    })
  }),


});

export const { useGetAllProductQuery, useAddProductsMutation, useGetProductByIdQuery, useUpdateProductByIdMutation, useDeleteProductByIdMutation } = productApi;