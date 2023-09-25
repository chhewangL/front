import React from 'react';
import {
  Card,
  Input,
  Checkbox,
  Button,
  Typography,
  Textarea,
} from "@material-tailwind/react";
import { useFormik } from 'formik';
import * as Yup from 'yup'
import { useAddProductsMutation } from '../../features/productApi';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router';

const AddProduct = () => {
  const [addProduct, { isLoading, isError, error }] = useAddProductsMutation();
  const { user } = useSelector((store) => store.user);
  const nav = useNavigate();

  const validation = Yup.object().shape({
    productName: Yup.string().required(),
    productDiscription: Yup.string().required().max(300),
    productImage: Yup.string().required(),
    price: Yup.number().required()
  })

  const formik = useFormik({
    initialValues: {
      productName: '',
      productDiscription: '',
      productImage: '',
      price: '',
      preview: null
    },
    onSubmit: async (val) => {
      let formData = new FormData();
      formData.append('productName', val.productName);
      formData.append('productDiscription', val.productDiscription);
      formData.append('product_image', val.productImage);
      formData.append('price', Number(val.price));
      // console.log(formData.get("product_image"))
      try {
        await addProduct({
          body: formData,
          token: user?.token
        }).unwrap();
        toast.success('product added');
        nav(-1);


      } catch (err) {
        console.log(err)
        toast.error(`${err.data.msg}`)
      }



    },
    validationSchema: validation
  })
  return (
    <div className='w-[400px] mx-auto my-3'>
      <Card color="transparent" shadow={false}>
        <Typography variant="h4" color="blue-gray">
          Add Product
        </Typography>
        <Typography color="gray" className="mt-1 font-normal">
          Enter product details.
        </Typography>
        <form className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96" onSubmit={formik.handleSubmit}>
          <div className="mb-4 flex flex-col gap-6">
            <div>
              <Input size="lg" label="Product Name" onChange={formik.handleChange} name='productName' />
              {formik.errors.productName && formik.touched.productName && <h1 className='text-red-900'>{formik.errors.productName}</h1>}
            </div>
            <Input size="lg" label="Price" type='number' onChange={formik.handleChange} name='price' />
            {formik.errors.price && formik.touched.price && <h1 className='text-red-900'>{formik.errors.price}</h1>}
            <Textarea label='Discription' onChange={formik.handleChange} name='productDiscription' />
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
            {formik.values.preview !== null && <div className='border border-gray-600 h-[150px] my-1 w-full'><img src={formik.values.preview} alt="" className='object-cover h-full w-full' /></div>}

          </div>

          <Button className="mt-6" fullWidth type='submit'>
            Register
          </Button>
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

export default AddProduct