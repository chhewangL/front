import React from 'react'
import { useGetProductByIdQuery } from '../../features/productApi'
import { useParams } from 'react-router'
import { useSelector } from 'react-redux';
import EditForm from '../../components/EditForm';

const EditProduct = () => {
  const { id: userId } = useParams();
  const { user } = useSelector((store) => store.user)
  const { isLoading, isError, data, error } = useGetProductByIdQuery({
    id: userId,
    token: user.token
  })
  console.log(data)
  if (isLoading) {
    return <h1>wait its loading</h1>

  }
  if (isError) {
    return <h1>{error}</h1>
  }
  return (
    <>
      <EditForm pdata={data} />
    </>
  )
}

export default EditProduct