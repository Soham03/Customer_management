import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/authContext'
import { doSignOut } from '../../firebase/auth'

const Header = () => {
    const navigate = useNavigate()
    const { userLoggedIn } = useAuth()
    return (
        <nav className='flex flex-row gap-x-2 w-full z-20 fixed top-0 left-0 py-4 border-b place-content-center items-center bg-gray-200 flex justify-end px-5 '>
            {
                userLoggedIn
                    ?
                    <>
                        <button onClick={() => { doSignOut().then(() => { navigate('/login') }) }} className='hover:border-indigo-600 hover:bg-indigo-600  hover:text-white   border rounded-lg  border-gray-600 font-bold border-1  w-20 justify-center flex py-2 text-sm text-gray-600 font-bold shadow-sm'>Logout</button>
                    </>
                    :
                    <>
                        <Link className='hover:border-indigo-600 hover:bg-indigo-600  hover:text-white   border rounded-lg  border-gray-600 font-bold border-1  w-20 justify-center flex py-2 text-sm text-gray-600 font-bold shadow-sm' to={'/login'}>Login</Link>
                        <Link className='hover:border-indigo-600 hover:bg-indigo-600  hover:text-white   border rounded-lg  border-gray-600 font-bold border-1 text-sm w-20 justify-center flex  py-2 text-gray-600 font-bold shadow-sm' to={'/register'}>Register</Link>
                    </>
            }

        </nav>
    )
}

export default Header;