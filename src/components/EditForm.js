import React from 'react';
import {
  Card,
  Input,
  Checkbox,
  Button,
  Typography,
  Textarea,
} from "@material-tailwind/react";
import { Formik, useFormik } from 'formik';
import * as Yup from 'yup'

import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { useNavigate, useParams } from 'react-router';
import { baseUrl } from './constants';
import { useUpdateProductByIdMutation } from '../features/productApi';

const EditForm = ({ pdata }) => {
  console.log(pdata)
  const { id } = useParams();
  const nav = useNavigate();
  const { user } = useSelector((store) => store.user);
  const [updateProductById, { isLoading, isError, error }] = useUpdateProductByIdMutation();

  const validation = Yup.object().shape({
    productName: Yup.string().required(),
    productDiscription: Yup.string().required().max(300),
    price: Yup.number().required()
  })

  const formik = useFormik({
    initialValues: {
      productName: pdata?.productName,
      productDiscription: pdata?.productDiscription,
      productImage: null,
      price: pdata?.price,
      preview: pdata?.productImage,
      oldImage: pdata?.productImage
    },

    onSubmit: async (val) => {
      let formData = new FormData();
      formData.append('productName', "hello");
      formData.append('productDiscription', val.productDiscription);
      formData.append('product_image', val.productImage);
      formData.append('price', Number(val.price));
      formData.append('oldImage', val.oldImage)
      // console.log(formData.get("product_image"))
      try {
        const res = await updateProductById({
          body: formData,
          token: user?.token,
          id
        }).unwrap();
        toast.success('product updated');
        nav(-1);


      } catch (err) {
        console.log(err)
        toast.error(`${err.data.msg}`)
      }



    },
    validationSchema: validation
  })

  return (<div className='w-[400px] mx-auto my-3'>
    <Card color="transparent" shadow={false}>
      <Typography variant="h4" color="blue-gray">
        Edit Product
      </Typography>
      <Typography color="gray" className="mt-1 font-normal">
        Enter product details.
      </Typography>
      <form className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96" onSubmit={formik.handleSubmit}>
        <div className="mb-4 flex flex-col gap-6">
          <div>
            <Input size="lg" label="Product Name" onChange={formik.handleChange} name='productName' value={formik.values.productName} />
            {formik.errors.productName && formik.touched.productName && <h1 className='text-red-900'>{formik.errors.productName}</h1>}
          </div>
          <Input size="lg" label="Price" type='number' onChange={formik.handleChange} name='price' value={formik.values.price} />
          {formik.errors.price && formik.touched.price && <h1 className='text-red-900'>{formik.errors.price}</h1>}
          <Textarea label='Discription' onChange={formik.handleChange} name='productDiscription' value={formik.values.productDiscription} />
          {formik.errors.productDiscription && formik.touched.productDiscription && <h1 className='text-red-900'>{formik.errors.productDiscription}</h1>}
          <Input type="file" size="lg" label="Image" name='productImage' onChange={(e) => {
            const file = e.currentTarget.files[0];
            formik.setFieldValue('productImage', file);
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.addEventListener('load', () => {
              formik.setFieldValue('preview', reader.result);

            })

          }} />

          {formik.errors.productImage && formik.touched.productImage && <h1 className='text-red-900'>{formik.errors.productImage}</h1>}

          {formik.values.preview !== null && <div className='border border-gray-600 h-[150px] my-1 w-full'>{formik.values.oldImage === formik.values.preview ? <img src={`${baseUrl}${formik.values.oldImage}`} className='object-cover h-full w-full' /> : <img src={formik.values.preview} alt="" className='object-cover h-full w-full' />}</div>}

        </div>
        {isLoading ? <div className='border-2 border-deep-orange-100 border-t-4 animate-spin'></div> : <Button className="mt-6" fullWidth type='submit'>
          update
        </Button>}

        <Typography color="gray" className="mt-4 text-center font-normal">
          Already have an account?{" "}
          <a href="#" className="font-medium text-gray-900">
            Sign In
          </a>
        </Typography>
      </form>
    </Card>
  </div>
  )
}

export default EditForm