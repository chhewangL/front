import {
  Card,
  Input,
  Checkbox,
  Button,
  Typography,
} from "@material-tailwind/react";
import { useFormik } from "formik";
import { nanoid } from "nanoid";
import React, { useState } from 'react';
import * as Yup from 'yup'
import { useUserLoginMutation } from "../features/authApi";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { addUser } from "../features/userSlice";


const LoginForm = () => {
  const dispatch = useDispatch();
  const nav = useNavigate();
  const [userLogin, { isLoading, isError, data }] = useUserLoginMutation();
  let user = null;

  const validation = Yup.object().shape({

    email: Yup.string().email().required(),
    password: Yup.string().min(5).max(20).required(),


  })

  const formik = useFormik({
    initialValues: {

      email: '',
      password: '',


    },
    validationSchema: validation,
    onSubmit: async (val) => {
      try {
        const res = await userLogin(val).unwrap();
        dispatch(addUser(res));

        nav('/');
        toast.success('login successful');


      } catch (err) {
        toast.error(err.data.message)

      }



    }



  })

  return (
    <div className="max-w-lg mx-auto mt-5">
      <Card color="white" shadow={true} className="px-4 space-y-5">
        <Typography variant="h4" color="blue-gray">
          Login
        </Typography>
        <Typography color="gray" className="mt-1 font-normal">
          Enter your credential.
        </Typography>
        <form className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96" onSubmit={formik.handleSubmit} >
          <div className="mb-4 flex flex-col gap-6">

            <Input size="lg" label="Email" name="email" onChange={formik.handleChange} />
            {formik.errors.email && formik.touched.email && <h1 className="text-sm text-red-500 italic">{formik.errors.email}</h1>}
            <Input type="password" size="lg" label="Password" name="password" onChange={formik.handleChange} />
            {formik.errors.password && formik.touched.password && <h1 className="text-sm text-red-500 italic">{formik.errors.password}</h1>}
          </div>
          {isLoading ? <Button className="mt-6 " fullWidth type="submit">
            <div className="h-7 w-7 border-2 border-t-blue-gray-100 animate-spin mx-auto"></div>
          </Button> :
            <Button className="mt-6" fullWidth type="submit">
              Register
            </Button>
          }


          <Typography color="gray" className="mt-4 text-center font-normal">
            don't have an account?{" "}
            <a href="#" className="font-medium text-gray-900">
              Sign up
            </a>
          </Typography>
        </form>
      </Card>

    </div>
  )
}

export default LoginForm