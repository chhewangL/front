import {
  Card,
  Input,
  Checkbox,
  Button,
  Typography,
  button,
} from "@material-tailwind/react";
import { useFormik } from "formik";
import { nanoid } from "nanoid";
import React, { useState } from 'react';
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import * as Yup from 'yup'
import { useUserSignupMutation } from "../features/authApi";

const SignUpForm = () => {
  const nav = useNavigate();

  const [userSignup, { isLoading, isError, data }] = useUserSignupMutation();

  const validation = Yup.object().shape({
    fullname: Yup.string().required('enter ur fullname').min(4).max(20),
    email: Yup.string().email().required(),
    password: Yup.string().min(5).max(20).required(),
    term: Yup.boolean(true)

  })

  const formik = useFormik({
    initialValues: {
      fullname: '',
      email: '',
      password: '',
      term: false

    },
    validationSchema: validation,
    onSubmit: async (val) => {
      try {
        const res = await userSignup(val);
        if (res.data.status === "sucess") {
          toast.success(res.data.msg);
          nav('/login');
        }
      } catch (err) {
        toast.error(err.data.msg)

      }

    }


  })
  return (
    <div className="max-w-lg mx-auto mt-5">
      <Card color="white" shadow={true} className="px-4 space-y-5">
        <Typography variant="h4" color="blue-gray">
          Sign Up
        </Typography>
        <Typography color="gray" className="mt-1 font-normal">
          Enter your details to register.
        </Typography>
        <form className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96" onSubmit={formik.handleSubmit} >
          <div className="mb-4 flex flex-col gap-6">
            <Input size="lg" label="FullName" name="fullname" onChange={formik.handleChange} />
            {formik.errors.fullname && formik.touched.fullname && <h1 className="text-sm text-red-500 italic">{formik.errors.fullname}</h1>}
            <Input size="lg" label="Email" name="email" onChange={formik.handleChange} />
            {formik.errors.email && formik.touched.email && <h1 className="text-sm text-red-500 italic">{formik.errors.email}</h1>}
            <Input type="password" size="lg" label="Password" name="password" onChange={formik.handleChange} />
            {formik.errors.password && formik.touched.password && <h1 className="text-sm text-red-500 italic">{formik.errors.password}</h1>}
          </div>
          <Checkbox
            label={
              <Typography
                variant="small"
                color="gray"
                className="flex items-center font-normal"
              >
                I agree the
                <a
                  href="#"
                  className="font-medium transition-colors hover:text-gray-900"
                >
                  &nbsp;Terms and Conditions
                </a>
              </Typography>
            }
            containerProps={{ className: "-ml-2.5" }}
            name="term"
            value={true}
            onChange={formik.handleChange}

          />
          {isLoading ? <Button className="mt-6" fullWidth type="submit"><div className="h-7 w-7 border-2 border-t-blue-gray-100 animate-spin mx-auto rounded-full"></div>

          </Button> :
            <Button className="mt-6" fullWidth type="submit" disabled={formik.values.term === false}>

              Register
            </Button>
          }

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

export default SignUpForm