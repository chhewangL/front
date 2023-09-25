import React from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { clearAll, getUser } from '../features/localStorage'
import { useDispatch, useSelector } from 'react-redux'
import { store } from '../features/store'
import { addUser } from '../features/userSlice'



const Header = () => {
  const nav = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((store) => store.user);
  console.log(user)

  return (
    <div className='flex justify-between items-center p-2 bg-black text-white'>
      <div>
        <h1 className='text-[20px] italic font-extrabold'>Sample logo</h1>
      </div>
      <div className='mx-3'>
        <NavLink to={'/'} className='pl-5'>About</NavLink>
        <NavLink to={'/signup'} className='pl-5'>Singup</NavLink>
        {user?.isAdmin && <NavLink to={'/product'} className='pl-5'>Product</NavLink>}

        {user === null ? <NavLink to={'/Login'} className='pl-5' >Log In</NavLink> : <button className='pl-5 cursor-pointer' onClick={() => {
          dispatch(addUser(null));
          clearAll();
          nav('/')

        }}>Log out</button>}

      </div>
    </div>
  )
}

export default Header