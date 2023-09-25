import React from 'react'
import { useDeleteProductByIdMutation, useGetAllProductQuery } from '../../features/productApi';
import { Card, Typography } from "@material-tailwind/react";
import { baseUrl } from '../../components/constants';
import { PencilIcon } from "@heroicons/react/24/solid";
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { replace } from 'formik';

const ProductList = () => {
  const { user } = useSelector((store) => store.user);
  const nav = useNavigate();
  console.log(user)
  const table_head = [
    'S.No',
    'product_Name',
    'Discription',
    'price',
    'Image',
    'Edit',
    'Delete'
  ]
  const { isLoading, isError, error, data } = useGetAllProductQuery();
  // console.log(data)
  const [deleteProductById] = useDeleteProductByIdMutation();
  const showConfirm = () => {
    return window.confirm('you want to delete');
  }
  return (
    <div>

      <div className="m-4">
        <Card className="h-full w-full">
          <div className='p-3 flex justify-between items-center'>
            <h1 className='font-bold italic'>PRODUCT LIST</h1>
            {user?.isAdmin && <button className='mx-3 p-1 bg-green-900 border rounded hover:scale-110 text-white' onClick={() => { nav('/addProduct') }}>Add Product</button>}
          </div>
          <table className="w-full min-w-max table-auto text-left">
            <thead>
              <tr>
                {table_head.map((head) => {
                  return <td className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal leading-none opacity-70"
                    >
                      {head}
                    </Typography>
                  </td>
                })}


              </tr>
            </thead>
            <tbody>
              {data && data.map((product, index) => {
                const isLast = index === data.length - 1;
                const classes = isLast ? "p-4" : "p-4 border-b border-blue-gray-50";
                return <tr key={product._id}>
                  <td className={classes}>
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {index + 1}
                    </Typography>
                  </td>
                  <td className={classes}>
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >{product.productName} </Typography></td>
                  <td className={classes}>  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal"
                  >{product.productDiscription} </Typography></td>
                  <td className={classes}> <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal"
                  >{product.price}</Typography></td>

                  <td className={classes}> <img src={`${baseUrl}${product.productImage}`} alt="" className='h-[150px] w-[150px]' /></td>
                  <td><button className='hover:scale-110' onClick={() => {
                    nav(`/editProduct/${product._id}`)
                  }}><PencilIcon className="h-4 w-4 text-green-800" /></button>

                  </td>
                  <td><button className='hover:scale-110' onClick={(e) => {

                    // if (showConfirm() === true) {
                    deleteProductById({
                      token: user.token,
                      body: {
                        productImage: product.productImage
                      },
                      id: product._id

                    })


                    // }
                  }}><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="red" class="w-6 h-6">
                      <path fill-rule="evenodd" d="M16.5 4.478v.227a48.816 48.816 0 013.878.512.75.75 0 11-.256 1.478l-.209-.035-1.005 13.07a3 3 0 01-2.991 2.77H8.084a3 3 0 01-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 01-.256-1.478A48.567 48.567 0 017.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 013.369 0c1.603.051 2.815 1.387 2.815 2.951zm-6.136-1.452a51.196 51.196 0 013.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 00-6 0v-.113c0-.794.609-1.428 1.364-1.452zm-.355 5.945a.75.75 0 10-1.5.058l.347 9a.75.75 0 101.499-.058l-.346-9zm5.48.058a.75.75 0 10-1.498-.058l-.347 9a.75.75 0 001.5.058l.345-9z" clip-rule="evenodd" />
                    </svg></button>
                  </td>


                </tr>


              })}

            </tbody>
          </table>
        </Card>
      </div>

    </div>
  )
}

export default ProductList